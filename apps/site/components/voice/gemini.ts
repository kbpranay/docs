import { DemoError, type ActiveCall, type CallHandlers } from './types'

/**
 * Gemini Live over WebSocket with a single-use token from our server.
 * Mic audio is sent as 16 kHz PCM16; replies arrive as 24 kHz PCM16 and are
 * scheduled gap-free; playback stops immediately when the caller interrupts.
 * The SDK is loaded only when a call starts.
 */
export async function connectGemini(h: CallHandlers): Promise<ActiveCall> {
  const res = await fetch('/api/voice-demo/gemini-token', { method: 'POST' })
  const body = (await res.json().catch(() => ({}))) as { token?: string; model?: string; maxSeconds?: number; message?: string }
  if (!res.ok || !body.token || !body.model) throw new DemoError(body.message ?? 'The demo could not start. Please try again.')

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true },
  })
  const micCtx = new AudioContext({ sampleRate: 16000 })
  const outCtx = new AudioContext({ sampleRate: 24000 })
  let closed = false
  let playhead = 0
  const playing = new Set<AudioBufferSourceNode>()

  const stopPlayback = () => {
    playing.forEach((s) => {
      try {
        s.stop()
      } catch {}
    })
    playing.clear()
    playhead = 0
  }

  const { GoogleGenAI, Modality } = await import('@google/genai')
  const ai = new GoogleGenAI({ apiKey: body.token, httpOptions: { apiVersion: 'v1alpha' } })

  let captionTurnOpen = false
  const session = await ai.live.connect({
    model: body.model,
    config: { responseModalities: [Modality.AUDIO] },
    callbacks: {
      onmessage: (msg) => {
        const sc = msg.serverContent
        if (!sc) return
        if (sc.interrupted) {
          stopPlayback()
          h.onSpeaking('caller')
        }
        if (sc.inputTranscription?.text) h.onSpeaking('caller')
        if (sc.outputTranscription?.text) {
          h.onCaption(sc.outputTranscription.text, !captionTurnOpen)
          captionTurnOpen = true
        }
        for (const part of sc.modelTurn?.parts ?? []) {
          const data = part.inlineData?.data
          if (!data) continue
          h.onSpeaking('agent')
          const pcm = base64ToInt16(data)
          const buf = outCtx.createBuffer(1, pcm.length, 24000)
          const ch = buf.getChannelData(0)
          for (let i = 0; i < pcm.length; i++) ch[i] = pcm[i] / 32768
          const src = outCtx.createBufferSource()
          src.buffer = buf
          src.connect(outCtx.destination)
          playhead = Math.max(playhead, outCtx.currentTime + 0.02)
          src.start(playhead)
          playhead += buf.duration
          playing.add(src)
          src.onended = () => {
            playing.delete(src)
            if (playing.size === 0) h.onSpeaking(null)
          }
        }
        if (sc.turnComplete) captionTurnOpen = false
      },
      onclose: () => {
        if (!closed) h.onEnded('The call ended.')
      },
      onerror: () => {
        if (!closed) h.onEnded('The call was interrupted. Please try again.')
      },
    },
  })

  // Microphone → 16 kHz PCM16 chunks (~100 ms) → Gemini.
  await micCtx.audioWorklet.addModule('/pcm-capture-worklet.js')
  const source = micCtx.createMediaStreamSource(stream)
  const node = new AudioWorkletNode(micCtx, 'pcm-capture')
  let pending: Float32Array[] = []
  let pendingLen = 0
  node.port.onmessage = (e: MessageEvent<Float32Array>) => {
    if (closed) return
    pending.push(e.data)
    pendingLen += e.data.length
    if (pendingLen < 1600) return
    const pcm = new Int16Array(pendingLen)
    let o = 0
    for (const f of pending) for (let i = 0; i < f.length; i++) pcm[o++] = Math.max(-1, Math.min(1, f[i])) * 0x7fff
    pending = []
    pendingLen = 0
    session.sendRealtimeInput({ audio: { data: int16ToBase64(pcm), mimeType: 'audio/pcm;rate=16000' } })
  }
  source.connect(node)

  // Ask the agent to greet first.
  session.sendClientContent({ turns: [{ role: 'user', parts: [{ text: 'The caller has just connected. Greet them.' }] }], turnComplete: true })

  const close = () => {
    closed = true
    stopPlayback()
    try {
      session.close()
    } catch {}
    node.disconnect()
    source.disconnect()
    stream.getTracks().forEach((t) => t.stop())
    micCtx.close().catch(() => {})
    outCtx.close().catch(() => {})
  }
  return { maxSeconds: body.maxSeconds ?? 120, close }
}

function base64ToInt16(b64: string) {
  const bin = atob(b64)
  const bytes = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
  return new Int16Array(bytes.buffer, 0, Math.floor(bytes.length / 2))
}

function int16ToBase64(pcm: Int16Array) {
  const bytes = new Uint8Array(pcm.buffer)
  let bin = ''
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
  return btoa(bin)
}
