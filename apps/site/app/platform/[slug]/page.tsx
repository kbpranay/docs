import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { faqLd, JsonLd, pageMeta } from '@/lib/seo'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Highlight } from '@/components/Highlight'
import { Arrow, Phone } from '@/components/Icons'
import { OutlineIcon } from '@/components/OutlineIcon'
import { Waves } from '@/components/Waves'
import { productBySlug, products } from '@/content/products'
import { site } from '@/content/site'
import { industries } from '@/content/industries'
import { Related } from '@/components/Related'

export const dynamicParams = false

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = productBySlug(slug)
  if (!p) return {}
  return pageMeta({ title: p.name, description: p.intro, path: `/platform/${p.slug}` })
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = productBySlug(slug)
  if (!p) notFound()

  const others = products.filter((o) => o.slug !== p.slug)
  const appLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `Enterprise Bot ${p.name}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, cloud or on-premises',
    description: p.intro,
    url: `${site.url}/platform/${p.slug}`,
    publisher: { '@type': 'Organization', name: site.name, url: site.url },
  }

  return (
    <>
      <JsonLd data={[appLd, faqLd(p.faq)]} />

      <section className="page-hero" aria-labelledby="p-title">
        <Waves />
        <div className="container page-hero__grid">
          <div>
            <Breadcrumbs crumbs={[{ name: p.name, href: `/platform/${p.slug}` }]} />
            <p className="kicker">{p.name}</p>
            <h1 id="p-title">
              <Highlight segments={p.title} />
            </h1>
            <p className="intro">{p.intro}</p>
            <div className="hero__ctas">
              <Link className="btn btn--primary" href={site.primaryCta.href}>
                {site.primaryCta.label} <Arrow />
              </Link>
              <Link className="btn btn--ghost" href={p.slug === 'live-translate' ? '#flow-title' : site.secondaryCta.href}>
                {p.slug === 'live-translate' ? 'How it works' : site.secondaryCta.label}
              </Link>
            </div>
          </div>
          <div className="mini-scene" role="group" aria-label={`Illustrative example: ${p.name}`}>
            <div className="scene__bar">
              <span className="scene__channel">
                <span className="scene__dot" aria-hidden="true">
                  {p.slug === 'voice-agent' ? <Phone /> : <OutlineIcon name={p.icon} size={14} />}
                </span>
                {p.visual.channel}
              </span>
              <span className="scene__label">Illustrative</span>
            </div>
            <div className="mini-scene__lines">
              {p.visual.lines.map((l, i) => (
                <p key={i} className={`mini-line mini-line--${l.who}`} style={{ ['--i' as string]: i }}>
                  <span className="mini-line__tag">
                    {l.who === 'customer' ? 'Customer' : l.who === 'agent' ? 'AI agent' : l.who === 'person' ? 'Agent' : 'System'}
                  </span>
                  <span className="mini-line__text">{l.text}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--paper" aria-labelledby="problem-title">
        <div className="container problem">
          <div data-reveal>
            <p className="kicker">The problem</p>
            <h2 id="problem-title" className="h2" style={{ marginTop: 16 }}>
              {p.problem.title}
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              {p.problem.body}
            </p>
          </div>
          <ul className="pain" data-reveal style={{ ['--reveal-delay' as string]: '70ms' }}>
            {p.problem.points.map((pt, i) => (
              <li key={pt}>
                <span>0{i + 1}</span>
                {pt}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--white" aria-labelledby="flow-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">How it works</p>
            <h2 id="flow-title" className="h2">
              {p.flowTitle ? (
                <Highlight segments={p.flowTitle} />
              ) : (
                <>
                  From request to <span className="hl">recorded outcome.</span>
                </>
              )}
            </h2>
          </div>
          <ol className="flow-steps" data-reveal>
            {p.workflow.map((w, i) => (
              <li key={w.title} className="flow-step" style={{ ['--i' as string]: i }}>
                <b>Step {i + 1}</b>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--paper" aria-labelledby="caps-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">Capabilities</p>
            <h2 id="caps-title" className="h2">
              What {p.name} handles
            </h2>
          </div>
          <div className="caps" data-reveal>
            {p.capabilities.map((c) => (
              <article key={c.title} className="cap">
                <OutlineIcon name={c.icon} />
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--navy" aria-labelledby="fit-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">Fit</p>
            <h2 id="fit-title" className="h2">
              Built around <span className="hl">your stack.</span>
            </h2>
          </div>
          <div className="fit">
            <div className="fit__box" data-reveal>
              <h3>Integrations</h3>
              <ul>
                {p.fit.integrations.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div className="fit__box" data-reveal style={{ ['--reveal-delay' as string]: '70ms' }}>
              <h3>Deployment</h3>
              <p>{p.fit.deployment}</p>
              <p style={{ marginTop: 16 }}>
                <Link href="/integrations" style={{ color: 'var(--white)' }}>Integrations</Link> ·{' '}
                <Link href="/technology" style={{ color: 'var(--white)' }}>Technology</Link> ·{' '}
                <Link href="/languages" style={{ color: 'var(--white)' }}>Languages</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {p.proof && (p.proof.stats.length > 0 || p.proof.quote) && (
        <section className="section section--white" aria-labelledby="proof-title">
          <div className="container">
            <div className="section-head" data-reveal>
              <p className="kicker">Proof</p>
              <h2 id="proof-title" className="h2">
                In production
              </h2>
            </div>
            <div className="customers">
              {p.proof.quote && (
                <article className="feature-story" data-reveal>
                  <p className="feature-story__customer">{p.proof.quote.customer}</p>
                  <blockquote>{p.proof.quote.quote}</blockquote>
                  <p className="cite">
                    <strong>{p.proof.quote.person}</strong>
                    {p.proof.quote.role}
                  </p>
                </article>
              )}
              {p.proof.stats.length > 0 && (
                <div className="quote-stack">
                  {p.proof.stats.map((st, i) => (
                    <div
                      key={st.id}
                      className="quote-card light-stat"
                      data-reveal
                      style={{ ['--reveal-delay' as string]: `${70 + i * 70}ms` }}
                    >
                      <div>
                        <p className="stat__value">{st.value}</p>
                        <div className="stat__rule" />
                        <p className="stat__label">{st.label}</p>
                        <p className="stat__context">
                          {st.customer} · {st.context}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="section section--paper" aria-labelledby="faq-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">Questions</p>
            <h2 id="faq-title" className="h2">
              What buyers ask us
            </h2>
          </div>
          <div className="faq" data-reveal>
            {p.faq.map((f) => (
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

      <Related
        route={`/platform/${p.slug}`}
        extra={[
          ...industries.filter((ind) => ind.products.includes(`/platform/${p.slug}`)).map((ind) => `/industries/${ind.slug}`),
          ...(p.slug === 'quality-assessment' ? ['/responsible-ai'] : []),
          '/customers',
          '/integrations',
        ]}
      />
      <section className="cta-band" aria-labelledby="pcta-title">
        <Waves />
        <div className="container cta-band__grid">
          <div data-reveal>
            <h2 id="pcta-title">
              See {p.name} on <span className="hl">your</span> workload.
            </h2>
            <p>We will scope one request type with you and show it running against your systems.</p>
          </div>
          <div className="cta-band__panel" data-reveal style={{ ['--reveal-delay' as string]: '70ms' }}>
            <Link className="btn btn--primary" href={site.primaryCta.href}>
              {site.primaryCta.label} <Arrow />
            </Link>
            <p style={{ margin: 0, fontSize: 15, color: 'var(--on-dark-2)' }}>Or explore:</p>
            <ul>
              {others.slice(0, 3).map((o) => (
                <li key={o.slug}>
                  <Link href={`/platform/${o.slug}`} style={{ color: 'var(--white)', textDecoration: 'none' }}>
                    {o.name} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
