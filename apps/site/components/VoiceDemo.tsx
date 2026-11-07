'use client'

import { useEffect, useRef, useState } from 'react'
import { DEFAULT_MAX_SECONDS } from '@/lib/voiceDemo'
import { Phone } from './Icons'

type Phase = 'idle' | 'consent' | 'connecting' | 'live' | 'ended' | 'error'

/**
 * "Talk to the demo voice agent": live speech with a real-time voice model.
 * Mic starts only after explicit consent; the session ends at the cap (also
 * enforced server-side), on hang-up, or when the page is hidden.
 */
export function VoiceDemo() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [message, setMessage] = useState('')
  const [left, setLeft] = useState(DEFAULT_MAX_SECONDS)
  const [speaking, setSpeaking] = useState<'agent' | 'caller' | null>(null)
  const [caption, setCaption] = useState('')
  const pc = useRef<RTCPeerConnection | null>(null)
  const mic = useRef<MediaStream | null>(null)
  const audio = useRef<HTMLAudioElement | null>(null)
  const timer = useRef<number | null>(null)

  const cleanup = () => {
    if (timer.current) window.clearInterval(timer.current)
    timer.current = null
    pc.current?.getSenders().forEach((s) => s.track?.stop())
    pc.current?.close()
    pc.current = null
    mic.current?.getTracks().forEach((t) => t.stop())
    mic.current = null
    if (audio.current) audio.current.srcObject = null
    setSpeaking(null)
  }

  const hangUp = (why: string) => {
    cleanup()
    setPhase('ended')
    setMessage(why)
  }

  useEffect(() => {
    const onHide = () => document.hidden && pc.current && hangUp('Call ended because the page was hidden.')
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
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mic.current = stream
      const conn = new RTCPeerConnection()
      pc.current = conn
      conn.ontrack = (e) => {
        if (audio.current) audio.current.srcObject = e.streams[0]
      }
      conn.addTrack(stream.getAudioTracks()[0], stream)
      const events = conn.createDataChannel('oai-events')
      events.onopen = () => events.send(JSON.stringify({ type: 'response.create' }))
      events.onmessage = (e) => {
        let ev: { type?: string; delta?: string }
        try {
          ev = JSON.parse(e.data)
        } catch {
          return
        }
        switch (ev.type) {
          case 'input_audio_buffer.speech_started':
            setSpeaking('caller')
            break
          case 'output_audio_buffer.started':
            setSpeaking('agent')
            setCaption('')
            break
          case 'input_audio_buffer.speech_stopped':
          case 'output_audio_buffer.stopped':
            setSpeaking(null)
            break
          case 'response.output_audio_transcript.delta':
          case 'response.audio_transcript.delta':
            if (ev.delta) setCaption((c) => (c + ev.delta).slice(-240))
            break
        }
      }
      conn.onconnectionstatechange = () => {
        if (conn.connectionState === 'failed' || conn.connectionState === 'disconnected') {
          if (pc.current) hangUp('The call ended.')
        }
      }

      const offer = await conn.createOffer()
      await conn.setLocalDescription(offer)
      const res = await fetch('/api/voice-demo/session', {
        method: 'POST',
        headers: { 'content-type': 'application/sdp' },
        body: offer.sdp,
      })
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { message?: string }
        cleanup()
        setPhase('error')
        setMessage(body.message ?? 'The demo could not start. Please try again.')
        return
      }
      const max = Number(res.headers.get('x-max-seconds')) || DEFAULT_MAX_SECONDS
      await conn.setRemoteDescription({ type: 'answer', sdp: await res.text() })
      setLeft(max)
      setPhase('live')
      const endAt = Date.now() + max * 1000
      timer.current = window.setInterval(() => {
        const s = Math.max(0, Math.round((endAt - Date.now()) / 1000))
        setLeft(s)
        if (s <= 0) hangUp('Demo time is up. Book a tailored demo to try your own scenario.')
      }, 250)
    } catch (err) {
      cleanup()
      setPhase('error')
      setMessage(
        err instanceof DOMException && err.name === 'NotAllowedError'
          ? 'Microphone access was blocked. Allow it in your browser to talk to the demo agent.'
          : 'The demo could not start. Please try again.',
      )
    }
  }

  const mm = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`

  return (
    <div className="voice-demo" data-phase={phase} data-speaking={speaking ?? 'none'} data-reveal>
      <audio ref={audio} autoPlay />
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
            Your browser will ask for microphone access. Your voice is sent to a third-party real-time voice model
            (OpenAI) to run this demo. Please don’t share personal information; this is a fictional scenario.
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
      {message && <p className="voice-demo__msg" role="status">{message}</p>}
    </div>
  )
}
