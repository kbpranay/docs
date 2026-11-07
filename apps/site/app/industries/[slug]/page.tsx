import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Faq } from '@/components/Faq'
import { FigureCard } from '@/components/FigureCard'
import { Highlight } from '@/components/Highlight'
import { CtaBand, PageHero } from '@/components/PageHero'
import { Related } from '@/components/Related'
import { StoryCard } from '@/components/StoryCard'
import { customerStories } from '@/content/claims'
import { industries, industryBySlug } from '@/content/industries'
import { routeLabels } from '@/content/related'
import { showFeedyou } from '@/content/site'
import { pageMeta } from '@/lib/seo'

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const i = industryBySlug(slug)
  if (!i) return {}
  return pageMeta({ title: i.name, description: i.intro, path: `/industries/${i.slug}` })
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const i = industryBySlug(slug)
  if (!i) notFound()
  const stories = i.stories
    .map((id) => customerStories.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => !!s && (showFeedyou || s.origin === 'eb'))
  const stats = stories.slice(0, 4)
  return (
    <>
      <PageHero
        crumbs={[
          { name: 'Industries', href: '/industries' },
          { name: i.name, href: `/industries/${i.slug}` },
        ]}
        kicker={i.name}
        title={<Highlight segments={i.title} />}
        intro={i.intro}
        aside={
          stories.length > 0 ? (
            <FigureCard
              title="Published results"
              rows={[
                ...stories.slice(0, 3).map((st) => (
                  <>
                    <span className="figure-row__k figure-row__k--name">{st.name}</span>
                    <span>{st.metric ? `${st.metric.value} ${st.metric.label}` : st.outcome}</span>
                  </>
                )),
                <>
                  <a className="story-link story-link--dark" href="#proof-title">
                    Read the case studies ↓
                  </a>
                </>,
              ]}
            />
          ) : undefined
        }
      />
      {stats.length > 0 && (
        <section className="stat-band" aria-label="Published results">
          <div className="container stat-band__grid">
            {stats.map((st, n) => (
              <div key={st.id} data-reveal style={{ ['--reveal-delay' as string]: `${n * 70}ms` }}>
                {st.metric ? (
                  <>
                    <p className="stat__value">{st.metric.value}</p>
                    <div className="stat__rule" />
                    <p className="stat__label">{st.metric.label}</p>
                  </>
                ) : (
                  <>
                    <p className="stat__value stat__value--word">{st.channels[0]}</p>
                    <div className="stat__rule" />
                    <p className="stat__label">{st.outcome}</p>
                  </>
                )}
                <p className="stat__context">{st.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      <section className="section section--paper" aria-labelledby="work-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">Workloads</p>
            <h2 id="work-title" className="h2">
              Requests it handles
            </h2>
          </div>
          <div className="caps caps--four" data-reveal>
            {i.workloads.map((w) => (
              <article key={w.t} className="cap">
                <h3>{w.t}</h3>
                <p>{w.b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      {stories.length > 0 && (
        <section className="section section--white" aria-labelledby="proof-title">
          <div className="container">
            <div className="section-head" data-reveal>
              <p className="kicker">Customer results</p>
              <h2 id="proof-title" className="h2">
                {i.proofTitle ?? 'Published by customers in your industry'}
              </h2>
            </div>
            <div className="stories" data-reveal>
              {stories.map((s) => (
                <StoryCard key={s.id} s={s} />
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="section section--paper" aria-labelledby="matters-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">What matters</p>
            <h2 id="matters-title" className="h2">
              Built for how your industry works
            </h2>
          </div>
          <div className="caps" data-reveal>
            {i.matters.map((m) => (
              <article key={m.t} className="cap">
                <h3>{m.t}</h3>
                <p>{m.b}</p>
              </article>
            ))}
          </div>
          <p className="path-links" data-reveal>
            {i.products.map((h) => (
              <Link key={h} href={h}>
                {routeLabels[h] ?? h} →
              </Link>
            ))}
          </p>
        </div>
      </section>
      <Faq id="ind-faq" title={`${i.name}: questions`} items={i.faq} tone="white" />
      <Related route="industry" extra={['/industries', '/customers', '/security', '/evaluation']} />
      <CtaBand title={<>See it on <span className="hl">your</span> calls.</>} body="We scope one workload with you and show it running against your systems and languages." />
    </>
  )
}
