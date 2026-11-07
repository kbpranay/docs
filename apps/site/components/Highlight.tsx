import type { Segment } from '@/content/site'
import { Brush } from './Brush'

/** Renders a heading with EB's signature orange highlight on selected words. */
export function Highlight({ segments, brush = false }: { segments: Segment[]; brush?: boolean }) {
  let brushed = false
  return (
    <>
      {segments.map((s, i) => {
        if (typeof s === 'string') return <span key={i}>{s}</span>
        const withBrush = brush && !brushed
        brushed = brushed || withBrush
        return (
          <span key={i} className="hl hl--wrap">
            {s.hl}
            {withBrush && <Brush />}
          </span>
        )
      })}
    </>
  )
}
