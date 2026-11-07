/** One-line "running today" proof list with case-study links. Entries come from claims.ts customerStories. */
import { customerStories } from '@/content/claims'
import { showFeedyou } from '@/content/site'

export function ProofStrip({ label, items }: { label: string; items: { id: string; text: string }[] }) {
  const rows = items
    .map((it) => ({ ...it, s: customerStories.find((c) => c.id === it.id) }))
    .filter((r) => r.s && (showFeedyou || r.s.origin === 'eb'))
  if (!rows.length) return null
  return (
    <div className="proof-strip" data-reveal>
      <p className="proof-strip__label">{label}</p>
      <ul>
        {rows.map((r) => (
          <li key={r.id}>
            <span>
              {r.text}
              {r.s!.origin === 'feedyou' && <em> · Feedyou, an Enterprise Bot company</em>}
            </span>{' '}
            <a href={r.s!.url}>Case study ↗</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
