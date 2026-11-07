import { Brush } from '@/components/Brush'
import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import Link from 'next/link'
import { InView } from '@/components/InView'
import { CtaBand, PageHero } from '@/components/PageHero'
import { Related } from '@/components/Related'
import { ProofStrip } from '@/components/ProofStrip'
import { Arrow } from '@/components/Icons'
import { integrations } from '@/content/integrations'

export const metadata: Metadata = pageMeta({
  title: 'Integrations',
  description:
    'Enterprise Bot adds voice AI and quality assessment to Genesys, Microsoft Teams, Cisco, VIER and SIP telephony, with live translation in early access.',
  path: '/integrations',
})

export default function IntegrationsHub() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Integrations', href: '/integrations' }]}
        kicker="Integrations"
        title={
          <>
            The AI layer for the contact center <span className="hl hl--brush">you already run.<Brush draw /></span>
          </>
        }
        intro="Keep your platform for routing, queues and the agent desktop. Add Enterprise Bot for voice AI, agent assist and quality assessment, with live translation in early access."
      />
      <section className="section section--paper" aria-labelledby="hub-title">
        <div className="container">
          <h2 id="hub-title" className="sr-only">
            Platforms
          </h2>
          <div className="hub hub--partners">
            {integrations.map((i, n) => (
              <Link key={i.slug} href={`/integrations/${i.slug}`} className="hub__card" data-reveal style={{ ['--reveal-delay' as string]: `${(n % 3) * 70}ms` }}>
                <span className="hub__name">
                  {i.name} <Arrow />
                </span>
                <span className="hub__line">{i.navLine}</span>
                {i.references && <span className="hub__ref">In production: {i.references.map((r) => r.name).join(', ')}</span>}
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
          <ProofStrip
            label="In production on Genesys"
            items={[
              { id: 'swiss-health', text: 'A Swiss health insurer: AI call routing in Swiss German, French and Italian' },
              { id: 'moneta', text: 'MONETA Money Bank: voicebot on Genesys' },
            ]}
          />
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
          <InView className="lanes">
            <div className="lanes__box" data-reveal>
              <b>Your contact center</b>
              <span>Genesys, Teams, Cisco, VIER or any SIP telephony</span>
            </div>
            <div className="lanes__mid" data-reveal style={{ ['--reveal-delay' as string]: '70ms' }}>
              {[
                ['Audio streaming', 'Your platform streams the call and keeps the audio record.'],
                ['SIP', 'Calls reach the Voice Agent and transfer back with context in SIP headers.'],
                ['Media streams', 'Streams on agent calls for assist and QA, where your platform supports them.'],
              ].map(([t, d]) => (
                <div key={t} className="lane">
                  <p className="lane__t">{t}</p>
                  <span className="lane__line" aria-hidden="true">
                    <i />
                  </span>
                  <p className="lane__d">{d}</p>
                </div>
              ))}
            </div>
            <div className="lanes__box lanes__box--eb" data-reveal style={{ ['--reveal-delay' as string]: '140ms' }}>
              <b>Enterprise Bot</b>
              <span>Voice Agent · Agent Assist · Conversation Insights</span>
            </div>
          </InView>
        </div>
      </section>
      <Related route="/integrations" />
      <CtaBand title={<>See it on <span className="hl">your</span> platform.</>} body="We scope one call type on your platform and show the handover your agents would see." />
    </>
  )
}
