import type { Metadata } from 'next'
import { faqLd, JsonLd, pageMeta } from '@/lib/seo'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Highlight } from '@/components/Highlight'
import { FigureCard } from '@/components/FigureCard'
import { Phone } from '@/components/Icons'
import { CtaBand, PageHero } from '@/components/PageHero'
import { Related } from '@/components/Related'
import { integrationBySlug, integrations } from '@/content/integrations'
import { stats } from '@/content/claims'

export const dynamicParams = false
export function generateStaticParams() {
  return integrations.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const i = integrationBySlug(slug)
  if (!i) return {}
  return pageMeta({ title: `${i.name} integration`, description: i.intro, path: `/integrations/${i.slug}` })
}

export default async function IntegrationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const i = integrationBySlug(slug)
  if (!i) notFound()
  return (
    <>
      <JsonLd data={faqLd(i.faq)} />
      <PageHero
        crumbs={[
          { name: 'Integrations', href: '/integrations' },
          { name: i.name, href: `/integrations/${i.slug}` },
        ]}
        kicker={`${i.name} integration`}
        title={<Highlight segments={i.title} />}
        intro={i.intro}
        aside={
          <FigureCard
            title="How a call flows"
            label="Illustrative"
            icon={<Phone />}
            rows={[
              <>
                <span className="figure-row__k">{i.name}</span>
                <span className="figure-row__arrow" aria-hidden="true">→</span>
                <span className="figure-row__eb">Voice Agent</span>
                <span className="chip">{i.flow.method}</span>
              </>,
              <>
                <span className="figure-row__k">Action</span>
                <span className="chip chip--ok">{i.flow.action}</span>
              </>,
              <>
                <span className="figure-row__k">Handover</span>
                <span>Back to {i.name} · summary attached</span>
              </>,
            ]}
          />
        }
      />

      <section className="section section--paper" aria-labelledby="keep-title">
        <div className="container problem">
          <div data-reveal>
            <p className="kicker">What stays</p>
            <h2 id="keep-title" className="h2" style={{ marginTop: 16 }}>
              Your platform keeps its job.
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              {i.handover}
            </p>
          </div>
          <ul className="pain" data-reveal>
            {i.keep.map((k, n) => (
              <li key={k}>
                <span>0{n + 1}</span>
                {k}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--white" aria-labelledby="add-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">What you add</p>
            <h2 id="add-title" className="h2">
              What Enterprise Bot adds to {i.name}
            </h2>
          </div>
          <div className={i.add.length % 4 === 0 ? 'caps caps--four' : 'caps'} data-reveal>
            {i.add.map((a) => (
              <article key={a.title} className="cap">
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </article>
            ))}
          </div>
          {i.proof && (
            <article className="proof-card" data-reveal>
              <p className="proof-card__value">{stats[i.proof].value}</p>
              <div>
                <p className="proof-card__label">{stats[i.proof].label}</p>
                <p className="proof-card__context">
                  {stats[i.proof].customer} · {stats[i.proof].context}.
                </p>
              </div>
              <a className="story-link story-link--dark" href={stats[i.proof].sourceUrl}>
                Read the case study ↗
              </a>
            </article>
          )}
        </div>
      </section>

      <section className="section section--navy" aria-labelledby="connect-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">How it connects</p>
            <h2 id="connect-title" className="h2">
              The integration, in plain terms.
            </h2>
          </div>
          <div className="fit">
            <div className="fit__box" data-reveal>
              <h3>Connection</h3>
              <ul>
                {i.connect.map((c) => (
                  <li key={c.title}>
                    <span>
                      <b>{c.title}.</b> {c.body}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="fit__box" data-reveal style={{ ['--reveal-delay' as string]: '70ms' }}>
              <h3>Scope</h3>
              <p>{i.scope}</p>
              <p style={{ marginTop: 16 }}>
                <Link href="/technology" style={{ color: 'var(--white)' }}>
                  How the voice stack works →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--paper" aria-labelledby="ifaq-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">Questions</p>
            <h2 id="ifaq-title" className="h2">
              What {i.name} teams ask us
            </h2>
          </div>
          <div className="faq" data-reveal>
            {i.faq.map((f) => (
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
      <Related route="integration" extra={i.slug === 'genesys' ? ['/customers'] : []} />
      <CtaBand title={<>See it on <span className="hl">your</span> {i.name} setup.</>} body="We scope one call type and show the handover into your platform." />
    </>
  )
}
