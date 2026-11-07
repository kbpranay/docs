import type { Metadata } from 'next'
import Link from 'next/link'
import { CtaBand, PageHero } from '@/components/PageHero'
import { Arrow } from '@/components/Icons'
import { integrations } from '@/content/integrations'

export const metadata: Metadata = {
  title: 'Integrations',
  description: 'Enterprise Bot adds voice AI, quality assessment and live translation to Genesys, Microsoft Teams, Cisco, VIER and SIP telephony.',
  alternates: { canonical: '/integrations' },
}

export default function IntegrationsHub() {
  return (
    <>
      <PageHero
        kicker="Integrations"
        title={
          <>
            The AI layer for the contact center <span className="hl">you already run.</span>
          </>
        }
        intro="Keep your platform for routing, queues and the agent desktop. Add Enterprise Bot for voice AI, agent assist, quality assessment and live translation."
      />
      <section className="section section--paper" aria-labelledby="hub-title">
        <div className="container">
          <h2 id="hub-title" className="sr-only">
            Platforms
          </h2>
          <div className="hub">
            {integrations.map((i, n) => (
              <Link key={i.slug} href={`/integrations/${i.slug}`} className="hub__card" data-reveal style={{ ['--reveal-delay' as string]: `${(n % 3) * 70}ms` }}>
                <span className="hub__name">
                  {i.name} <Arrow />
                </span>
                <span className="hub__line">{i.navLine}</span>
              </Link>
            ))}
          </div>
          <div className="hub__more" data-reveal>
            <h3>Also connects to</h3>
            <p>
              NICE CXone, Salesforce and other CRMs, ticketing systems and your business APIs. Connectivity, handover and
              supported versions are confirmed for each environment during scoping.
            </p>
          </div>
        </div>
      </section>
      <section className="section section--white" aria-labelledby="how-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">How it fits</p>
            <h2 id="how-title" className="h2">
              Three ways to connect, one way of working.
            </h2>
          </div>
          <div className="caps" data-reveal>
            <article className="cap">
              <h3>Audio streaming</h3>
              <p>Your platform streams the call (for example Genesys AudioHook) and keeps the audio record.</p>
            </article>
            <article className="cap">
              <h3>SIP</h3>
              <p>Calls reach the Voice Agent over SIP and transfer back with context in SIP headers.</p>
            </article>
            <article className="cap">
              <h3>Recording streams</h3>
              <p>SIPREC or media streams on human-handled calls for agent assist and quality assessment.</p>
            </article>
          </div>
        </div>
      </section>
      <CtaBand title={<>See it on <span className="hl">your</span> platform.</>} body="We scope one call type on your platform and show the handover your agents would see." />
    </>
  )
}
