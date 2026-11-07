import { faqLd, JsonLd } from '@/lib/seo'

/** Question-and-answer block with FAQPage structured data: short, direct answers that answer engines can quote. */
export function Faq({ id, kicker = 'Questions', title, items, tone = 'paper' }: { id: string; kicker?: string; title: string; items: { q: string; a: string }[]; tone?: 'paper' | 'white' }) {
  return (
    <section className={`section section--${tone}`} aria-labelledby={id}>
      <JsonLd data={faqLd(items)} />
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="kicker">{kicker}</p>
          <h2 id={id} className="h2">
            {title}
          </h2>
        </div>
        <div className="faq" data-reveal>
          {items.map((f) => (
            <details key={f.q}>
              <summary>
                {f.q}
                <span className="plus" aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
