import { Brush } from '@/components/Brush'
import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import Link from 'next/link'
import { FigureCard } from '@/components/FigureCard'
import { Check } from '@/components/Icons'
import { Faq } from '@/components/Faq'
import { CtaBand, PageHero } from '@/components/PageHero'
import { Related } from '@/components/Related'

export const metadata: Metadata = pageMeta({
  title: 'How pricing works',
  description:
    'Enterprise Bot pricing: a platform fee plus usage charged per minute, per conversation or per successful outcome, modelled on your own volumes.',
  path: '/pricing',
})

const faq = [
  { q: 'How is usage charged?', a: 'You choose the model that fits your business case: per minute of voice, per conversation, or per successful outcome, such as a request resolved without a handover. We model each option on your volumes so you can compare them.' },
  { q: 'Does Enterprise Bot publish a price list?', a: 'No. Pricing is a platform fee for your deployment plus usage based on your volumes, with implementation scoped separately. We model it on your own call and email volumes so you can compare it with what you pay today.' },
  { q: 'What changes the cost?', a: 'Mainly volume and conversation length, the channels and products you use, the deployment model (managed cloud, private cloud or on-premises), the systems to integrate and peak concurrent conversations.' },
  { q: 'Can we see the cost before we commit?', a: 'Yes. We build a cost model with your volumes and growth scenarios, with platform, usage and implementation shown separately and the assumptions written down for your finance team.' },
]

export default function Pricing() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'How pricing works', href: '/pricing' }]}
        kicker="Pricing"
        title={
          <>
            Know the cost <span className="hl hl--brush">before you commit.<Brush draw /></span>
          </>
        }
        intro="A clear pricing model, modelled on your own call and email volumes, so you can compare it with what you run today."
        aside={
          <FigureCard
            title="What you pay for"
            rows={['Platform fee for your deployment', 'Usage: per minute, per conversation or per outcome', 'Languages shown in your cost model', 'Implementation scoped up front'].map((t) => (
              <>
                <span className="figure-row__tick" aria-hidden="true">
                  <Check />
                </span>
                <span>{t}</span>
              </>
            ))}
          />
        }
      />
      <section className="section section--paper" aria-labelledby="drivers-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">What drives cost</p>
            <h2 id="drivers-title" className="h2">
              The few things that move the number.
            </h2>
          </div>
          <div className="caps" data-reveal>
            <article className="cap">
              <h3>Volume</h3>
              <p>How many calls, chats and emails the AI handles, and how long a typical conversation lasts.</p>
            </article>
            <article className="cap">
              <h3>Channels and products</h3>
              <p>Voice, email, chat, agent assist, quality assessment: you pay for what you use.</p>
            </article>
            <article className="cap">
              <h3>Deployment</h3>
              <p>Managed hosting, private cloud or on-premises, and which models run where.</p>
            </article>
            <article className="cap">
              <h3>Integrations</h3>
              <p>The systems the AI acts in, scoped as part of implementation.</p>
            </article>
            <article className="cap">
              <h3>Peak capacity</h3>
              <p>How many conversations must run at the same time during your busiest hours.</p>
            </article>
            <article className="cap">
              <h3>Languages</h3>
              <p>Shown in your cost model, so you see their effect before you commit.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="section section--white" aria-labelledby="units-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">How usage is charged</p>
            <h2 id="units-title" className="h2">
              Pay the way <span className="hl">your business case works.</span>
            </h2>
          </div>
          <div className="caps" data-reveal>
            <article className="cap">
              <h3>Per minute</h3>
              <p>For voice: you pay for the minutes the AI is on the call. Simple to compare with your current cost per call.</p>
            </article>
            <article className="cap">
              <h3>Per conversation</h3>
              <p>One price per handled conversation on voice, chat or email, whatever its length.</p>
            </article>
            <article className="cap">
              <h3>Per successful outcome</h3>
              <p>You pay when a request is resolved as agreed, for example completed without a handover. Outcomes are defined together before go-live.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="section section--paper" aria-labelledby="tco-title">
        <div className="container">
          <div className="qa">
          <div data-reveal>
            <p className="kicker">Total cost of ownership</p>
            <h2 id="tco-title" className="h2" style={{ marginTop: 16 }}>
              Compared on your volumes, not on a list price.
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              We build a cost model with your current volumes, growth scenarios and what you pay today, including AI
              add-ons on your contact-center platform. You see the platform fee, usage and implementation separately.
            </p>
            <ul className="share-list">
              <li>Your volumes today and in growth scenarios you choose</li>
              <li>Platform, usage and implementation shown separately</li>
              <li>Assumptions written down so your finance team can check them</li>
            </ul>
            <p className="lede" style={{ marginTop: 24 }}>
              Ready to compare? <Link href="/evaluation">See how an evaluation works</Link>.
            </p>
          </div>
          <figure className="cost-model" data-reveal style={{ ['--reveal-delay' as string]: '70ms' }}>
            <div className="cost-model__head">
              <span>Cost model</span>
              <span className="scene__label">Illustrative</span>
            </div>
            {[
              { k: 'Today', p: 34, u: 30, i: 22 },
              { k: 'Growth A', p: 34, u: 52, i: 0 },
              { k: 'Growth B', p: 34, u: 64, i: 0 },
            ].map((r, n) => (
              <div key={r.k} className="cost-model__row">
                <span className="cost-model__k">{r.k}</span>
                <span className="cost-model__bar" style={{ ['--n' as string]: n }} aria-hidden="true">
                  <i className="seg seg--platform" style={{ width: `${r.p}%` }} />
                  <i className="seg seg--usage" style={{ width: `${r.u}%` }} />
                  {r.i > 0 && <i className="seg seg--impl" style={{ width: `${r.i}%` }} />}
                </span>
              </div>
            ))}
            <ul className="cost-model__legend">
              <li><i className="seg--platform" /> Platform</li>
              <li><i className="seg--usage" /> Usage</li>
              <li><i className="seg--impl" /> Implementation</li>
            </ul>
            <figcaption>Illustrative. Shape only: not to scale and not a quote. Your model uses your volumes.</figcaption>
          </figure>
          </div>
        </div>
      </section>
      <Faq id="pricing-faq" title="Pricing questions" items={faq} tone="white" />
      <Related route="/pricing" />
      <CtaBand title={<>Get a cost model for <span className="hl">your</span> volumes.</>} body="Share your call and email volumes and we will model platform, usage and implementation costs for you." />
    </>
  )
}
