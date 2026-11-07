import { NextResponse } from 'next/server'
import { scenarioInstructions } from '@/lib/voiceDemo'
import { MAX_SECONDS, checkRequest, recordSession } from '@/lib/voiceDemoLimits'

/**
 * Starts a live voice-demo session.
 *
 * The browser posts its WebRTC SDP offer here. This server forwards it to the
 * OpenAI Realtime "calls" endpoint with the API key (which never reaches the
 * browser), returns the SDP answer, and schedules a server-side hang-up so a
 * session cannot run past the cap even if the page's own timer is bypassed.
 *
 * Limits are in-memory per server instance (fine for a single Node server;
 * use a shared store such as Redis if the site is scaled out).
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const OPENAI = 'https://api.openai.com/v1/realtime/calls'

const fail = (status: number, message: string) => NextResponse.json({ message }, { status })

export async function POST(req: Request) {
  const key = process.env.OPENAI_API_KEY
  if (process.env.VOICE_DEMO_ENABLED !== 'true' || process.env.VOICE_DEMO_PROVIDER !== 'openai' || !key) {
    return fail(503, 'The live voice demo is not switched on in this environment.')
  }

  const refused = checkRequest(req)
  if (refused) return fail(refused.status, refused.message)

  const offer = await req.text()
  if (!offer.startsWith('v=') || offer.length > 30_000) return fail(400, 'Invalid request.')

  const session = {
    type: 'realtime',
    model: process.env.OPENAI_REALTIME_MODEL ?? 'gpt-realtime',
    instructions: scenarioInstructions,
    audio: { output: { voice: process.env.OPENAI_REALTIME_VOICE ?? 'marin' } },
  }
  const form = new FormData()
  form.set('sdp', offer)
  form.set('session', JSON.stringify(session))

  let res: Response
  try {
    res = await fetch(OPENAI, { method: 'POST', headers: { Authorization: `Bearer ${key}` }, body: form })
  } catch {
    return fail(502, 'Could not reach the voice service. Please try again.')
  }
  if (!res.ok) return fail(502, 'Could not start the voice session. Please try again.')
  const answer = await res.text()
  const callId = (res.headers.get('location') ?? '').split('/').filter(Boolean).pop()

  // Hard server-side cap: hang up shortly after the visible timer ends.
  recordSession(req, () => {
    if (callId) {
      fetch(`${OPENAI}/${callId}/hangup`, { method: 'POST', headers: { Authorization: `Bearer ${key}` } }).catch(() => {})
    }
  })

  return new NextResponse(answer, {
    status: 201,
    headers: { 'content-type': 'application/sdp', 'x-max-seconds': String(MAX_SECONDS), 'cache-control': 'no-store' },
  })
}
