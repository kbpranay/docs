import type { CustomerStory } from '@/content/claims'

export function StoryCard({ s }: { s: CustomerStory }) {
  return (
    <article className="story">
      <p className="story__meta">
        {s.sector} · {s.country}
      </p>
      <h3>{s.name}</h3>
      {s.metric && (
        <p className="story__metric">
          <b>{s.metric.value}</b>
          <span>{s.metric.label}</span>
        </p>
      )}
      <p className="story__chips">
        {s.channels.map((c) => (
          <span key={c} className="chip">
            {c}
          </span>
        ))}
      </p>
      {s.origin === 'feedyou' && <p className="story__origin">Feedyou, an Enterprise Bot company</p>}
      <a className="story-link story-link--dark" href={s.url}>
        Read the case study ↗
      </a>
    </article>
  )
}
