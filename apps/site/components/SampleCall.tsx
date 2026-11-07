import { sampleCall } from '@/content/media'

/**
 * "Hear a sample call": audio player with transcript.
 * Renders nothing until an approved recording is configured in content/media.ts.
 */
export function SampleCall() {
  if (!sampleCall) return null
  return (
    <figure className="sample-call" data-reveal>
      <figcaption>
        <b>{sampleCall.title}</b>
        <span>{sampleCall.caption}</span>
      </figcaption>
      <audio controls preload="none" src={sampleCall.src}>
        Your browser does not support audio playback.
      </audio>
      <details>
        <summary>Read the transcript</summary>
        <ol>
          {sampleCall.transcript.map((t, i) => (
            <li key={i}>
              <b>{t.who}:</b> {t.text}
            </li>
          ))}
        </ol>
      </details>
    </figure>
  )
}
