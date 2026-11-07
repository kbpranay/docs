import type { Metadata } from 'next'
import Link from 'next/link'
import { Brush } from '@/components/Brush'
import { FigureCard } from '@/components/FigureCard'
import { CtaBand, PageHero } from '@/components/PageHero'
import { Related } from '@/components/Related'
import { offices, showFeedyou } from '@/content/site'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'About Enterprise Bot',
  description: 'Enterprise Bot is a Swiss company building voice AI and quality assessment for contact centers, with offices in Zurich, Barcelona, Warsaw, London, Bangalore and the US.',
  path: '/about',
})

const founders = [
  { name: 'Pranay Jain', role: 'Co-founder and CEO' },
  { name: 'Ravina Mutha', role: 'Co-founder and Chief Growth Officer' },
  { name: 'Sandeep Jayasankar', role: 'Co-founder and CTO' },
]

const principles = [
  { t: 'Added, not replaced', b: 'We add AI to the contact-center platform you already run, so your routing, reporting and agent desktop keep their job.' },
  { t: 'Controlled and on record', b: 'Grounded answers, guardrails and a full record of what the AI did, so your team can explain every decision.' },
  { t: 'Proved on your calls', b: 'We measure results against your own baseline before a rollout, in your languages and on your telephony.' },
]

export default function About() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'About', href: '/about' }]}
        kicker="About us"
        title={
          <>
            A Swiss company for <span className="hl hl--brush">contact-center AI.<Brush draw /></span>
          </>
        }
        intro="Enterprise Bot builds AI voice agents and automated quality assessment for contact centers. Headquartered in Zurich, with offices in Barcelona, Warsaw, London, Bangalore and Dover (US)."
        aside={
          <FigureCard
            title="Enterprise Bot at a glance"
            rows={[
              <>
                <span className="figure-row__k">Headquarters</span>
                <span>Zurich, Switzerland</span>
              </>,
              <>
                <span className="figure-row__k">Offices</span>
                <span>{offices.map((o) => o.city).join(', ')}</span>
              </>,
              <>
                <span className="figure-row__k">Focus</span>
                <span>Voice AI and quality assessment</span>
              </>,
            ]}
          />
        }
      />
      <section className="section section--paper" aria-labelledby="why-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">How we work</p>
            <h2 id="why-title" className="h2">
              Three principles behind <span className="hl">every deployment.</span>
            </h2>
          </div>
          <div className="caps" data-reveal>
            {principles.map((x) => (
              <article key={x.t} className="cap">
                <h3>{x.t}</h3>
                <p>{x.b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      {showFeedyou && (
        <section className="section section--white" aria-labelledby="fy-title">
          <div className="container">
            <div className="narrow" data-reveal>
              <p className="kicker">Feedyou, an Enterprise Bot company</p>
              <h2 id="fy-title" className="h2" style={{ marginTop: 16 }}>
                Stronger in Central and Eastern Europe.
              </h2>
              <p className="lede" style={{ marginTop: 20 }}>
                Feedyou, founded in 2017 in Pardubice, Czech Republic, has delivered voicebots and assistants for more
                than 120 customers in Central and Eastern Europe, including MONETA Money Bank, Toyota and Škoda. Together
                we bring Czech-market delivery experience alongside our Swiss and international work.
              </p>
              <p className="lede" style={{ marginTop: 16 }}>
                <Link href="/customers">See their customer stories</Link>.
              </p>
            </div>
          </div>
        </section>
      )}
      <section className={`section ${showFeedyou ? 'section--paper' : 'section--white'}`} aria-labelledby="team-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">Leadership</p>
            <h2 id="team-title" className="h2">
              Founded by people who build it.
            </h2>
          </div>
          <ul className="people" data-reveal>
            {founders.map((f) => (
              <li key={f.name}>
                <b>{f.name}</b>
                <span>{f.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className={`section ${showFeedyou ? 'section--white' : 'section--paper'}`} aria-labelledby="offices-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">Offices</p>
            <h2 id="offices-title" className="h2">
              Where to find us
            </h2>
          </div>
          <ul className="office-list" data-reveal>
            {offices.map((o) => (
              <li key={o.city}>
                <b>{o.city}</b>
                <span>{o.address}</span>
                <span>{o.country}</span>
              </li>
            ))}
          </ul>
          <p className="path-links" data-reveal>
            <a href="https://join.com/companies/enterprisebot">Careers at Enterprise Bot ↗</a>
            <Link href="/security">Security and certification status →</Link>
          </p>
        </div>
      </section>
      <Related route="/about" />
      <CtaBand title={<>Meet the team on <span className="hl">your</span> use case.</>} body="Tell us your channels, platform and languages and we will show you what we would build first." />
    </>
  )
}
