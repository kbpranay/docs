import { NextResponse } from 'next/server'
import { DEFAULT_MAX_SECONDS, scenarioInstructions } from '@/lib/voiceDemo'

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

const MAX_SECONDS = Number(process.env.VOICE_DEMO_MAX_SECONDS ?? DEFAULT_MAX_SECONDS)
const PER_IP_PER_HOUR = Number(process.env.VOICE_DEMO_PER_IP_PER_HOUR ?? 3)
const DAILY_LIMIT = Number(process.env.VOICE_DEMO_DAILY_LIMIT ?? 200)
const MAX_CONCURRENT = Number(process.env.VOICE_DEMO_MAX_CONCURRENT ?? 5)
const OPENAI = 'https://api.openai.com/v1/realtime/calls'

type State = { ip: Map<string, number[]>; day: string; count: number; active: number }
const g = globalThis as unknown as { __ebVoiceDemo?: State }
const state: State = (g.__ebVoiceDemo ??= { ip: new Map(), day: '', count: 0, active: 0 })

const fail = (status: number, message: string) => NextResponse.json({ message }, { status })

export async function POST(req: Request) {
  const key = process.env.OPENAI_API_KEY
  if (process.env.VOICE_DEMO_ENABLED !== 'true' || !key) {
    return fail(503, 'The live voice demo is not switched on in this environment.')
  }

  // Same-origin only.
  const origin = req.headers.get('origin')
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host')
  if (origin && host && new URL(origin).host !== host) return fail(403, 'Forbidden.')

  // Limits: per visitor per hour, per day, concurrent.
  const now = Date.now()
  const today = new Date(now).toISOString().slice(0, 10)
  if (state.day !== today) {
    state.day = today
    state.count = 0
  }
  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown'
  const recent = (state.ip.get(ip) ?? []).filter((t) => now - t < 3_600_000)
  if (recent.length >= PER_IP_PER_HOUR) {
    return fail(429, 'You have reached the demo limit for now. Please try again later, or book a tailored demo.')
  }
  if (state.count >= DAILY_LIMIT) return fail(429, 'Today’s live demo slots are used up. Please book a tailored demo.')
  if (state.active >= MAX_CONCURRENT) return fail(429, 'All demo lines are busy. Please try again in a minute.')

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

  recent.push(now)
  state.ip.set(ip, recent)
  state.count += 1
  state.active += 1

  // Hard server-side cap: hang up shortly after the visible timer ends.
  setTimeout(async () => {
    state.active = Math.max(0, state.active - 1)
    if (callId) {
      await fetch(`${OPENAI}/${callId}/hangup`, { method: 'POST', headers: { Authorization: `Bearer ${key}` } }).catch(
        () => {},
      )
    }
  }, (MAX_SECONDS + 3) * 1000)

  return new NextResponse(answer, {
    status: 201,
    headers: { 'content-type': 'application/sdp', 'x-max-seconds': String(MAX_SECONDS), 'cache-control': 'no-store' },
  })
}
