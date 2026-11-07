import { DEFAULT_MAX_SECONDS } from '@/lib/voiceDemo'
import { DemoError, type ActiveCall, type CallHandlers } from './types'

/** OpenAI Realtime over WebRTC; the SDP offer is exchanged via our server. */
export async function connectOpenAI(h: CallHandlers): Promise<ActiveCall> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  const conn = new RTCPeerConnection()
  const audio = new Audio()
  audio.autoplay = true
  conn.ontrack = (e) => {
    audio.srcObject = e.streams[0]
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
    if (ev.type === 'input_audio_buffer.speech_started') h.onSpeaking('caller')
    else if (ev.type === 'output_audio_buffer.started') {
      h.onSpeaking('agent')
      h.onCaption('', true)
    } else if (ev.type === 'input_audio_buffer.speech_stopped' || ev.type === 'output_audio_buffer.stopped') h.onSpeaking(null)
    else if ((ev.type === 'response.output_audio_transcript.delta' || ev.type === 'response.audio_transcript.delta') && ev.delta)
      h.onCaption(ev.delta)
  }
  const close = () => {
    conn.getSenders().forEach((s) => s.track?.stop())
    stream.getTracks().forEach((t) => t.stop())
    conn.close()
    audio.srcObject = null
  }
  conn.onconnectionstatechange = () => {
    if (conn.connectionState === 'failed' || conn.connectionState === 'disconnected') h.onEnded('The call ended.')
  }
  try {
    const offer = await conn.createOffer()
    await conn.setLocalDescription(offer)
    const res = await fetch('/api/voice-demo/session', {
      method: 'POST',
      headers: { 'content-type': 'application/sdp' },
      body: offer.sdp,
    })
    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { message?: string }
      throw new DemoError(body.message ?? 'The demo could not start. Please try again.')
    }
    const maxSeconds = Number(res.headers.get('x-max-seconds')) || DEFAULT_MAX_SECONDS
    await conn.setRemoteDescription({ type: 'answer', sdp: await res.text() })
    return { maxSeconds, close }
  } catch (e) {
    close()
    throw e
  }
}
