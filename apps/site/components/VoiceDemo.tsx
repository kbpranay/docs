'use client'

import { useEffect, useRef, useState } from 'react'
import { DEFAULT_MAX_SECONDS, type VoiceProvider } from '@/lib/voiceDemo'
import { Phone } from './Icons'
import { DemoError, type ActiveCall } from './voice/types'

type Phase = 'idle' | 'consent' | 'connecting' | 'live' | 'ended' | 'error'

/**
 * "Talk to the demo voice agent": live speech with a real-time voice model.
 * Mic starts only after explicit consent; the session ends at the cap (also
 * enforced server-side), on hang-up, or when the page is hidden.
 */
export function VoiceDemo({ provider, providerName }: { provider: VoiceProvider; providerName: string }) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [message, setMessage] = useState('')
  const [left, setLeft] = useState(DEFAULT_MAX_SECONDS)
  const [speaking, setSpeaking] = useState<'agent' | 'caller' | null>(null)
  const [caption, setCaption] = useState('')
  const call = useRef<ActiveCall | null>(null)
  const timer = useRef<number | null>(null)

  const cleanup = () => {
    if (timer.current) window.clearInterval(timer.current)
    timer.current = null
    call.current?.close()
    call.current = null
    setSpeaking(null)
  }

  const hangUp = (why: string) => {
    cleanup()
    setPhase('ended')
    setMessage(why)
  }

  useEffect(() => {
    const onHide = () => document.hidden && call.current && hangUp('Call ended because the page was hidden.')
    document.addEventListener('visibilitychange', onHide)
    return () => {
      document.removeEventListener('visibilitychange', onHide)
      cleanup()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function start() {
    setPhase('connecting')
    setMessage('')
    setCaption('')
    const handlers = {
      onSpeaking: setSpeaking,
      onCaption: (d: string, reset?: boolean) => setCaption((c) => (reset ? d : c + d).slice(-240)),
      onEnded: (why: string) => call.current && hangUp(why),
    }
    try {
      const mod = provider === 'openai' ? await import('./voice/openai') : await import('./voice/gemini')
      const active = provider === 'openai' ? await (mod as typeof import('./voice/openai')).connectOpenAI(handlers) : await (mod as typeof import('./voice/gemini')).connectGemini(handlers)
      call.current = active
      setLeft(active.maxSeconds)
      setPhase('live')
      const endAt = Date.now() + active.maxSeconds * 1000
      timer.current = window.setInterval(() => {
        const s = Math.max(0, Math.round((endAt - Date.now()) / 1000))
        setLeft(s)
        if (s <= 0) hangUp('Demo time is up. Book a tailored demo to try your own scenario.')
      }, 250)
    } catch (err) {
      cleanup()
      setPhase('error')
      setMessage(
        err instanceof DemoError
          ? err.message
          : err instanceof DOMException && err.name === 'NotAllowedError'
            ? 'Microphone access was blocked. Allow it in your browser to talk to the demo agent.'
            : 'The demo could not start. Please try again.',
      )
    }
  }

  const mm = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`

  return (
    <div className="voice-demo" data-phase={phase} data-speaking={speaking ?? 'none'} data-reveal>
      <div className="voice-demo__main">
        <span className="voice-demo__orb" aria-hidden="true">
          <Phone />
        </span>
        <div>
          <p className="voice-demo__title">Talk to the demo voice agent</p>
          <p className="voice-demo__sub">
            A sample insurance-claims line. Ask about a claim, change a refund account or report a new claim, in your
            language. Up to {Math.round(DEFAULT_MAX_SECONDS / 60)} minutes.
          </p>
        </div>
        <div className="voice-demo__action">
          {phase === 'idle' || phase === 'ended' || phase === 'error' ? (
            <button type="button" className="btn btn--primary" onClick={() => setPhase('consent')}>
              {phase === 'idle' ? 'Start a call' : 'Call again'}
            </button>
          ) : phase === 'consent' ? null : phase === 'connecting' ? (
            <button type="button" className="btn btn--ghost" disabled>
              Connecting…
            </button>
          ) : (
            <button type="button" className="btn btn--ghost" onClick={() => hangUp('Call ended.')}>
              End call · {mm}
            </button>
          )}
        </div>
      </div>

      {phase === 'consent' && (
        <div className="voice-demo__consent" role="dialog" aria-label="Before you start">
          <p>
            Your browser will ask for microphone access. Your voice is processed by {providerName} to run this demo.
            Please don’t share personal information; this is a fictional scenario.
          </p>
          <div className="voice-demo__consent-actions">
            <button type="button" className="btn btn--primary" onClick={start}>
              Allow microphone and start
            </button>
            <button type="button" className="btn btn--ghost" onClick={() => setPhase('idle')}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {phase === 'live' && (
        <p className="voice-demo__caption" aria-live="polite">
          <b>{speaking === 'caller' ? 'Listening…' : 'Voice Agent'}</b> {caption}
        </p>
      )}
      {message && (
        <p className="voice-demo__msg" role="status">
          {message}
        </p>
      )}
    </div>
  )
}
