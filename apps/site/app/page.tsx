import Link from 'next/link'
import { Brush } from '@/components/Brush'
import { HeroScene } from '@/components/HeroScene'
import { Arrow, Check } from '@/components/Icons'
import { InView } from '@/components/InView'
import { Journey } from '@/components/Journey'
import { OutlineIcon } from '@/components/OutlineIcon'
import { Waves } from '@/components/Waves'
import { proofRow, quotes, stats } from '@/content/claims'
import { products, startingPoints } from '@/content/products'
import { site } from '@/content/site'

const startCopy: Record<string, { line: string; does: string[] }> = {
  'voice-agent': {
    line: 'Answers inbound calls, completes routine requests and transfers the rest with a summary.',
    does: ['Routing', 'Status checks', 'Account changes'],
  },
  'email-agent': {
    line: 'Reads every email and attachment, resolves routine requests and prepares the exceptions.',
    does: ['Multi-request emails', 'Attachments', 'Drafts for approval'],
  },
  'agent-assist': {
    line: 'Suggests the right answer during the conversation and writes the wrap-up for your agents.',
    does: ['Suggested answers', 'Summaries', 'CRM write-back'],
  },
  'conversation-analytics': {
    line: 'Shows what was asked, what was resolved and why conversations reached a person.',
    does: ['Resolution', 'Handover reasons', 'Topic trends'],
  },
}

export default function Home() {
  const starts = startingPoints.map((slug) => products.find((p) => p.slug === slug)!)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Enterprise Bot',
    url: site.url,
    logo: `${site.url}/eb-logo-on-light.svg`,
    description: site.description,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1 — Hero: category + signature product scene */}
      <section className="hero" aria-labelledby="hero-title">
        <Waves />
        <div className="container">
          <div className="hero__grid">
            <div className="hero__copy">
              <p className="kicker">Contact center automation</p>
              <h1 id="hero-title">
                <span className="line">Automate the conversation.</span>
                <span className="line">
                  <span className="hl">
                    Complete the work.
                    <Brush draw />
                  </span>
                </span>
              </h1>
              <p className="hero__sub">
                AI agents for voice, email and chat, connected to your contact center and business systems. Resolve
                routine requests, support your agents and keep control of how AI operates.
              </p>
              <div className="hero__ctas">
                <Link className="btn btn--primary" href={site.primaryCta.href}>
                  {site.primaryCta.label} <Arrow />
                </Link>
                <Link className="btn btn--ghost" href={site.secondaryCta.href}>
                  {site.secondaryCta.label}
                </Link>
              </div>
            </div>
            <div className="hero__scene">
              <HeroScene />
              <p className="scene__note">
                Simulation with synthetic data. Your flows follow your own systems, rules and approval limits.
              </p>
            </div>
          </div>

          <div className="proof-row">
            <p className="proof-row__label">Customers include</p>
            <ul>
              {proofRow.names.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 2 — Customer outcomes */}
      <section id="customers" className="section section--paper" aria-labelledby="customers-title">
        <div className="container">
          <div className="section-head section-head--split" data-reveal>
            <div>
              <p className="kicker">Customer outcomes</p>
              <h2 id="customers-title" className="h2" style={{ marginTop: 16 }}>
                <span className="hl">Published</span> results from named deployments.
              </h2>
            </div>
            <p className="lede">Each result is tied to a named deployment and the work it automated.</p>
          </div>

          <div className="customers">
            <article className="feature-story" data-reveal>
              <p className="feature-story__customer">{quotes.generali.customer} · Leonie voicebot</p>
              <blockquote>{quotes.generali.quote}</blockquote>
              <p className="cite">
                <strong>{quotes.generali.person}</strong>
                {quotes.generali.role}
              </p>
              <div className="stats">
                {[stats.generaliComprehension, stats.generaliMisrouted].map((st, i) => (
                  <div key={st.id} data-reveal style={{ ['--reveal-delay' as string]: `${120 + i * 120}ms` }}>
                    <p className="stat__value">{st.value}</p>
                    <div className="stat__rule" />
                    <p className="stat__label">{st.label}</p>
                    <p className="stat__context">{st.context}</p>
                  </div>
                ))}
              </div>
            </article>

            <div className="quote-stack">
              <article className="quote-card" data-reveal style={{ ['--reveal-delay' as string]: '120ms' }}>
                <div className="stat-inline">
                  <b>{stats.callpointTraining.value}</b>
                  <span>{stats.callpointTraining.label}</span>
                </div>
                <blockquote>{quotes.callpoint.quote}</blockquote>
                <p className="cite">
                  <strong>{quotes.callpoint.person}</strong>
                  {quotes.callpoint.customer}
                </p>
              </article>
              <article className="quote-card" data-reveal style={{ ['--reveal-delay' as string]: '220ms' }}>
                <blockquote>{quotes.swica.quote}</blockquote>
                <p className="cite">
                  <strong>{quotes.swica.person}</strong>
                  {quotes.swica.customer}
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — One journey across channels */}
      <section id="journey" className="section section--white" aria-labelledby="journey-title">
        <div className="container">
          <div className="section-head section-head--split" data-reveal>
            <div>
              <p className="kicker">One way of working</p>
              <h2 id="journey-title" className="h2" style={{ marginTop: 16 }}>
                Same request. <span className="hl">Any channel.</span>
              </h2>
            </div>
            <p className="lede">
              A customer can call, email or chat. Behind every channel, the same five steps run against the same
              knowledge, systems and rules.
            </p>
          </div>
          <div data-reveal>
            <Journey />
          </div>
        </div>
      </section>

      {/* 4 — Choose your starting point */}
      <section className="section section--paper" aria-labelledby="start-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">Where to start</p>
            <h2 id="start-title" className="h2 h2--xl">
              Start with the workload that costs you most.
            </h2>
          </div>
          <div className="starts">
            {starts.map((p, i) => (
              <Link
                key={p.slug}
                href={`/platform/${p.slug}`}
                className="start"
                data-reveal
                style={{ ['--reveal-delay' as string]: `${(i % 2) * 100}ms` }}
              >
                <span className="start__icon">
                  <OutlineIcon name={p.icon} size={26} />
                </span>
                <span className="start__name">
                  <span className="start__num">0{i + 1}</span>
                  {p.name} <Arrow width={22} height={22} />
                </span>
                <span className="start__line">{startCopy[p.slug].line}</span>
                <ul className="start__does">
                  {startCopy[p.slug].does.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
          <p className="also" data-reveal>
            Also available:{' '}
            <Link className="text-link" href="/platform/chat-agent">
              Chat Agent for web, app and WhatsApp <Arrow />
            </Link>
          </p>
        </div>
      </section>

      {/* 5 — Works with your contact center */}
      <section id="integrations" className="section section--navy" aria-labelledby="int-title">
        <div className="container">
          <div className="section-head section-head--split" data-reveal>
            <div>
              <p className="kicker">Integrations</p>
              <h2 id="int-title" className="h2" style={{ marginTop: 16 }}>
                Works with the contact center you already run.
              </h2>
            </div>
            <p className="lede">
              Keep your routing, queues and agent desktop. Enterprise Bot adds the AI layer between your customers and
              your systems.
            </p>
          </div>

          <InView className="arch">
            <div className="arch__col" data-reveal>
              <p className="arch__title">Your customers</p>
              <div className="arch__box">
                <b>Phone</b>
                <span>SIP and AudioCodes telephony</span>
              </div>
              <div className="arch__box">
                <b>Email</b>
                <span>Shared mailboxes and forms</span>
              </div>
              <div className="arch__box">
                <b>Chat</b>
                <span>Web, app and WhatsApp</span>
              </div>
            </div>
            <div className="arch__link" aria-hidden="true">
              <span className="flow">
                <i />
              </span>
              <span className="flow flow--back">
                <i />
              </span>
            </div>
            <div className="arch__core" data-reveal style={{ ['--reveal-delay' as string]: '120ms' }}>
              <div className="arch__core-title">
                <img src="/eb-logo-on-light.svg" alt="Enterprise Bot" width={150} height={23} loading="lazy" />
                <span>AI layer</span>
              </div>
              <div className="arch__agents">
                <div>Voice</div>
                <div>Email</div>
                <div>Chat</div>
              </div>
              <div className="arch__layers">
                <div>
                  Knowledge
                  <small>Answers with sources</small>
                </div>
                <div>
                  Actions
                  <small>Permitted API calls</small>
                </div>
                <div>
                  Analytics
                  <small>Outcomes, handovers</small>
                </div>
              </div>
            </div>
            <div className="arch__link" aria-hidden="true">
              <span className="flow">
                <i />
              </span>
              <span className="flow flow--back">
                <i />
              </span>
            </div>
            <div className="arch__col" data-reveal style={{ ['--reveal-delay' as string]: '240ms' }}>
              <p className="arch__title">Your systems</p>
              <div className="arch__box">
                <b>Contact center</b>
                <span>Genesys Cloud, Cisco: queues and agent desktop</span>
              </div>
              <div className="arch__box">
                <b>CRM</b>
                <span>Salesforce and others: summaries, case updates</span>
              </div>
              <div className="arch__box">
                <b>Business systems</b>
                <span>Policy, billing, booking via your APIs</span>
              </div>
            </div>
          </InView>

          <div className="integrations-list">
            <article className="integration" data-reveal>
              <h3>Genesys Cloud</h3>
              <p>Keep Genesys for routing, workforce management and the agent desktop. Add Enterprise Bot as the AI layer.</p>
              <ul>
                <li>Voice, email and chat automation in front of your queues</li>
                <li>Handover into existing queues with a written summary</li>
              </ul>
            </article>
            <article className="integration" data-reveal style={{ ['--reveal-delay' as string]: '100ms' }}>
              <h3>Cisco</h3>
              <p>AI close to your infrastructure, for teams with strict deployment and language requirements.</p>
              <ul>
                <li>Cloud, private cloud and on-premises options</li>
                <li>Multilingual voice for regional contact centers</li>
              </ul>
            </article>
            <article className="integration" data-reveal style={{ ['--reveal-delay' as string]: '200ms' }}>
              <h3>Salesforce and CRMs</h3>
              <p>The record stays the source of truth. The AI writes back what it did and why.</p>
              <ul>
                <li>Summaries and outcomes on the case</li>
                <li>Verified actions through your APIs</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* 6 — Enterprise control */}
      <section id="control" className="section section--white" aria-labelledby="control-title">
        <div className="container">
          <div className="section-head section-head--split" data-reveal>
            <div>
              <p className="kicker">Enterprise control</p>
              <h2 id="control-title" className="h2" style={{ marginTop: 16 }}>
                AI that works inside <span className="hl">your rules.</span>
              </h2>
            </div>
            <p className="lede">
              Decide where it runs, what it may read, what it may do and when a person takes over. Then check what it
              did.
            </p>
          </div>
          <div className="pillars">
            <article className="pillar" data-reveal>
              <h3>Deployment</h3>
              <p>Choose where each component runs, so data flows match what your security team approves.</p>
              <div className="specimen" aria-hidden="true">
                <div className="segmented">
                  <span>Cloud</span>
                  <span className="on">Private cloud</span>
                  <span>On-premises</span>
                </div>
              </div>
            </article>
            <article className="pillar" data-reveal style={{ ['--reveal-delay' as string]: '100ms' }}>
              <h3>Knowledge</h3>
              <p>Answers come from the documents and pages you approve. When it does not know, it says so.</p>
              <div className="specimen" aria-hidden="true">
                “Account changes are allowed on open claims.”
                <br />
                <span className="cite-chip">Source: Claims payout policy §4.2</span>
              </div>
            </article>
            <article className="pillar" data-reveal>
              <h3>Language</h3>
              <p>Replies in the customer’s language, within the languages configured and tested for your deployment.</p>
              <div className="specimen lang-row" aria-hidden="true">
                <span className="chip" style={{ marginTop: 0 }}>Caller: German</span>
                <span className="arrow-sep">→</span>
                <span className="chip" style={{ marginTop: 0 }}>Reply: German</span>
                <span className="arrow-sep">→</span>
                <span className="chip" style={{ marginTop: 0 }}>CRM note: English</span>
              </div>
            </article>
            <article className="pillar" data-reveal style={{ ['--reveal-delay' as string]: '100ms' }}>
              <h3>Oversight</h3>
              <p>Every answer, action and handover is logged with the reason, so you can review any conversation.</p>
              <div className="specimen audit" aria-hidden="true">
                <div>
                  <time>10:42:07</time>
                  <span>Rule checked · payout policy §4.2</span>
                </div>
                <div>
                  <time>10:42:09</time>
                  <span>Action · refund account updated</span>
                </div>
                <div>
                  <time>10:42:12</time>
                  <span>Handover · amount above approval limit</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 7 — How an evaluation works */}
      <section className="section section--paper" aria-labelledby="path-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">How to evaluate</p>
            <h2 id="path-title" className="h2">
              Prove it on one workload before you scale.
            </h2>
          </div>
          <ol className="path">
            {[
              { t: 'Pick one workload', d: 'Choose a high-volume request type and agree what “resolved” means, with your baseline.' },
              { t: 'See it in your stack', d: 'We connect to your contact center, knowledge and one business system in a test setup.' },
              { t: 'Measure, then decide', d: 'Compare resolution, handovers and customer effort against the baseline you set.' },
            ].map((s, i) => (
              <li key={s.t} className="path__step" data-reveal style={{ ['--reveal-delay' as string]: `${i * 120}ms` }}>
                <div className="path__head">
                  <span className="path__num">{i + 1}</span>
                  <span className="path__dash" aria-hidden="true" />
                </div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8 — Final conversion */}
      <section className="cta-band" aria-labelledby="cta-title">
        <Waves />
        <div className="container cta-band__grid">
          <div data-reveal>
            <h2 id="cta-title">
              See it resolve requests from <span className="hl">your</span> contact center.
            </h2>
            <p>
              Bring one workload. We will show how the agent handles it with your systems, your languages and your
              approval rules.
            </p>
          </div>
          <div className="cta-band__panel" data-reveal style={{ ['--reveal-delay' as string]: '120ms' }}>
            <ul>
              {['A session tailored to your stack', 'Your languages and request types', 'A clear evaluation plan'].map((t) => (
                <li key={t}>
                  <Check />
                  {t}
                </li>
              ))}
            </ul>
            <Link className="btn btn--primary" href={site.primaryCta.href}>
              {site.primaryCta.label} <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
