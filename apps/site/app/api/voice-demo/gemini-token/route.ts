import { GoogleGenAI, Modality } from '@google/genai'
import { NextResponse } from 'next/server'
import { scenarioInstructions } from '@/lib/voiceDemo'
import { MAX_SECONDS, checkRequest, recordSession } from '@/lib/voiceDemoLimits'

/**
 * Issues a single-use Gemini Live token for one demo call.
 *
 * The API key stays on the server. The token is locked to the demo model and
 * scenario prompt (visitors cannot change them), must be used within 30 s, and
 * expires at the cap, after which Gemini rejects the session's messages.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const fail = (status: number, message: string) => NextResponse.json({ message }, { status })

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY
  if (process.env.VOICE_DEMO_ENABLED !== 'true' || process.env.VOICE_DEMO_PROVIDER === 'openai' || !apiKey) {
    return fail(503, 'The live voice demo is not switched on in this environment.')
  }
  const refused = checkRequest(req)
  if (refused) return fail(refused.status, refused.message)

  const model = process.env.GEMINI_LIVE_MODEL ?? 'gemini-2.5-flash-native-audio-preview-09-2025'
  const now = Date.now()
  try {
    const ai = new GoogleGenAI({ apiKey, httpOptions: { apiVersion: 'v1alpha' } })
    const token = await ai.authTokens.create({
      config: {
        uses: 1,
        newSessionExpireTime: new Date(now + 30_000).toISOString(),
        expireTime: new Date(now + (MAX_SECONDS + 2) * 1000).toISOString(),
        liveConnectConstraints: {
          model,
          config: {
            responseModalities: [Modality.AUDIO],
            systemInstruction: scenarioInstructions,
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: process.env.GEMINI_LIVE_VOICE ?? 'Kore' } } },
            inputAudioTranscription: {},
            outputAudioTranscription: {},
          },
        },
        httpOptions: { apiVersion: 'v1alpha' },
      },
    })
    if (!token.name) return fail(502, 'Could not start the voice session. Please try again.')
    recordSession(req)
    return NextResponse.json(
      { token: token.name, model, maxSeconds: MAX_SECONDS },
      { status: 201, headers: { 'cache-control': 'no-store' } },
    )
  } catch {
    return fail(502, 'Could not start the voice session. Please try again.')
  }
}
