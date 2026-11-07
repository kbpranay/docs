import type { Metadata } from 'next'
import { Brush } from '@/components/Brush'
import { FigureCard } from '@/components/FigureCard'
import { CtaBand, PageHero } from '@/components/PageHero'
import { LogoMarquee } from '@/components/LogoMarquee'
import { customerStories, feedyouProof, logoWall, type CustomerStory } from '@/content/claims'
import { showFeedyou } from '@/content/site'

export const metadata: Metadata = {
  title: 'Customer stories',
  description: 'Published customer stories: voice AI, call routing, agent assist, chat and email automation in contact centers across Europe.',
  alternates: { canonical: '/customers' },
}

const stories = customerStories.filter((s) => showFeedyou || s.origin === 'eb')
const withMetric = stories.filter((s) => s.metric)
const voice = withMetric.filter((s) => s.voice)
const other = withMetric.filter((s) => !s.voice)
const more = stories.filter((s) => !s.metric)
const countries = Array.from(new Set(stories.map((s) => s.country)))

const shownLogos = logoWall.logos.filter((l) => l.approved && l.file && (showFeedyou || l.origin === 'eb'))
const logoRows = showFeedyou
  ? [shownLogos.filter((l) => l.origin === 'eb'), shownLogos.filter((l) => l.origin === 'feedyou')]
  : [shownLogos]

function Card({ s }: { s: CustomerStory }) {
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

export default function Customers() {
  return (
    <>
      <PageHero
        kicker="Customer stories"
        title={
          <>
            Running in <span className="hl hl--brush">real contact centers.<Brush draw /></span>
          </>
        }
        intro="Published stories from insurers, banks, rail operators and contact-center providers, each with its own case study."
        aside={
          <FigureCard
            title="At a glance"
            rows={[
              <>
                <span className="figure-row__k">Stories</span>
                <span>{stories.length} published case studies</span>
              </>,
              <>
                <span className="figure-row__k">Voice</span>
                <span>{voice.length} with voice in production</span>
              </>,
              <>
                <span className="figure-row__k">Countries</span>
                <span>{countries.join(', ')}</span>
              </>,
            ]}
          />
        }
      />
      <section className="section section--paper" aria-labelledby="voice-stories">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">Voice</p>
            <h2 id="voice-stories" className="h2">
              Voice AI <span className="hl">on the phone line.</span>
            </h2>
          </div>
          <div className="stories" data-reveal>
            {voice.map((s) => (
              <Card key={s.id} s={s} />
            ))}
          </div>
        </div>
      </section>
      <section className="section section--white" aria-labelledby="other-stories">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">Agent assist, chat and email</p>
            <h2 id="other-stories" className="h2">
              Around the call, too.
            </h2>
          </div>
          <div className="stories" data-reveal>
            {other.map((s) => (
              <Card key={s.id} s={s} />
            ))}
          </div>
          {more.length > 0 && (
            <p className="source-note" data-reveal>
              More published stories:{' '}
              {more.map((s, i) => (
                <span key={s.id}>
                  {i > 0 && ' · '}
                  <a href={s.url}>{s.name} ↗</a>
                </span>
              ))}
            </p>
          )}
        </div>
      </section>
      <section className="logos-band" aria-labelledby="names-title">
        <div className="container">
          <div className="logos-band__head">
            <p id="names-title">
              Customers include{showFeedyou ? ` · with Feedyou: ${feedyouProof.headline}` : ''}
            </p>
          </div>
          <LogoMarquee rows={logoRows} />
        </div>
      </section>
      <CtaBand
        title={
          <>
            Add <span className="hl">your</span> contact center.
          </>
        }
        body="We start with one workload and the measures you choose, then show it on your own calls."
      />
    </>
  )
}
