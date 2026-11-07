import { DEFAULT_MAX_SECONDS } from './voiceDemo'

/**
 * Abuse and cost limits for the live voice demo, shared by both providers.
 * In-memory per server instance; use a shared store if scaled out.
 */
export const MAX_SECONDS = Number(process.env.VOICE_DEMO_MAX_SECONDS ?? DEFAULT_MAX_SECONDS)
const PER_IP_PER_HOUR = Number(process.env.VOICE_DEMO_PER_IP_PER_HOUR ?? 3)
const DAILY_LIMIT = Number(process.env.VOICE_DEMO_DAILY_LIMIT ?? 200)
const MAX_CONCURRENT = Number(process.env.VOICE_DEMO_MAX_CONCURRENT ?? 5)

type State = { ip: Map<string, number[]>; day: string; count: number; active: number }
const g = globalThis as unknown as { __ebVoiceDemo?: State }
const state: State = (g.__ebVoiceDemo ??= { ip: new Map(), day: '', count: 0, active: 0 })

/** Returns an error message if the request must be refused, otherwise null. */
export function checkRequest(req: Request): { status: number; message: string } | null {
  const origin = req.headers.get('origin')
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host')
  if (origin && host && new URL(origin).host !== host) return { status: 403, message: 'Forbidden.' }

  const now = Date.now()
  const today = new Date(now).toISOString().slice(0, 10)
  if (state.day !== today) {
    state.day = today
    state.count = 0
  }
  const recent = (state.ip.get(clientIp(req)) ?? []).filter((t) => now - t < 3_600_000)
  if (recent.length >= PER_IP_PER_HOUR)
    return { status: 429, message: 'You have reached the demo limit for now. Please try again later, or book a tailored demo.' }
  if (state.count >= DAILY_LIMIT) return { status: 429, message: 'Today’s live demo slots are used up. Please book a tailored demo.' }
  if (state.active >= MAX_CONCURRENT) return { status: 429, message: 'All demo lines are busy. Please try again in a minute.' }
  return null
}

/** Records a started session; releases its concurrency slot after the cap. */
export function recordSession(req: Request, onExpire?: () => void) {
  const now = Date.now()
  const ip = clientIp(req)
  const recent = (state.ip.get(ip) ?? []).filter((t) => now - t < 3_600_000)
  recent.push(now)
  state.ip.set(ip, recent)
  state.count += 1
  state.active += 1
  setTimeout(() => {
    state.active = Math.max(0, state.active - 1)
    onExpire?.()
  }, (MAX_SECONDS + 3) * 1000)
}

function clientIp(req: Request) {
  return (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown'
}
