import Link from 'next/link'
import { Brush } from '@/components/Brush'
import { QaLens } from '@/components/QaLens'
import { HeroScene } from '@/components/HeroScene'
import { Arrow, Check } from '@/components/Icons'
import { InView } from '@/components/InView'
import { Journey } from '@/components/Journey'
import { OutlineIcon } from '@/components/OutlineIcon'
import { SampleCall } from '@/components/SampleCall'
import { VoiceDemo } from '@/components/VoiceDemo'
import { providerLabel, voiceDemoEnabled, voiceDemoProvider } from '@/lib/voiceDemo'
import { Waves } from '@/components/Waves'
import { logoWall, quotes, stats } from '@/content/claims'
import { LogoMarquee } from '@/components/LogoMarquee'
import { products, startingPoints } from '@/content/products'
import { showFeedyou, site } from '@/content/site'

const startCopy: Record<string, { line: string; does: string[] }> = {
  'voice-agent': {
    line: 'Answers inbound calls, completes routine requests and transfers the rest with a summary.',
    does: ['Routing', 'Status checks', 'Account changes'],
  },
  'quality-assessment': {
    line: 'Scores human and AI conversations against your QA scorecard, with evidence and a coaching note.',
    does: ['Your scorecard', 'Evidence per score', 'Coaching notes'],
  },
  'agent-assist': {
    line: 'Suggests answers from your knowledge during the conversation and writes the wrap-up for your agents.',
    does: ['Suggested answers', 'Summaries', 'CRM write-back'],
  },
  'conversation-analytics': {
    line: 'Shows what was asked, what was resolved and why conversations reached a person.',
    does: ['Resolution', 'Handover reasons', 'Topic trends'],
  },
}

const shownLogos = logoWall.logos.filter((l) => l.approved && l.file && (showFeedyou || l.origin === 'eb'))
const logoRows = showFeedyou
  ? [shownLogos.filter((l) => l.origin === 'eb'), shownLogos.filter((l) => l.origin === 'feedyou')]
  : [shownLogos]

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
              <p className="kicker">Voice AI for contact centers</p>
              <h1 id="hero-title">
                <span className="line">Resolve the call.</span>
                <span className="line">
                  Score the{' '}
                  <span className="hl">
                    conversation.
                    <Brush draw />
                  </span>
                </span>
              </h1>
              <p className="hero__sub">
                AI voice agents answer your inbound lines, resolve routine requests in your systems and hand the rest
                to your agents with a summary. Quality assessment then scores human and AI conversations against your
                QA scorecard, with evidence and a coaching note.
              </p>
              <div className="hero__ctas">
                <Link className="btn btn--primary" href={site.primaryCta.href}>
                  {site.primaryCta.label} <Arrow />
                </Link>
                <Link className="btn btn--ghost" href={voiceDemoEnabled ? '/#try' : site.secondaryCta.href}>
                  {voiceDemoEnabled ? 'Try a demo call' : site.secondaryCta.label}
                </Link>
              </div>
              <p className="hero__platforms">
                Added to the platform you already run: Genesys Cloud, Microsoft Teams (via Luware Nimbus), Cisco, VIER and
                SIP telephony. <Link href="/integrations">See integrations →</Link>
              </p>
            </div>
            <div className="hero__scene">
              <HeroScene />
              <p className="scene__note">
                Simulation with synthetic data. Your flows follow your own systems, rules and approval limits.
              </p>
            </div>
          </div>

          <div className="proof-row">
            <p className="proof-row__ratings">Rated 4.7 on G2 · 4.5 on Capterra · 4.5 on GetApp (ratings as published on enterprisebot.ai, November 2026)</p>
          </div>
        </div>
      </section>

      <section className="logos-band" aria-labelledby="logos-title">
        <div className="container">
          <div className="logos-band__head">
            <p id="logos-title">Trusted by insurers, banks, rail operators and contact centers across Europe</p>
            <Link href="/customers">Read customer stories →</Link>
          </div>
          <LogoMarquee rows={logoRows} />
        </div>
      </section>

      {/* 2 — Voice in production */}
      <section id="voice" className="section section--paper" aria-labelledby="voice-title">
        <div className="container">
          <div className="section-head section-head--split" data-reveal>
            <div>
              <p className="kicker">Voice in production</p>
              <h2 id="voice-title" className="h2" style={{ marginTop: 16 }}>
                Voice AI live in <span className="hl">Swiss contact centers.</span>
              </h2>
            </div>
            <p className="lede">
              Leonie answers and routes calls in Generali Switzerland’s customer care. At a Swiss health insurer,
              Enterprise Bot routes calls on Genesys in Swiss German, French and Italian. Both are published case studies.
            </p>
          </div>
          <SampleCall />
          <div className="voice-proof">
          <article className="feature-story feature-story--wide" data-reveal>
            <div>
              <p className="feature-story__customer">{quotes.generali.customer} · Leonie voicebot</p>
              <blockquote>{quotes.generali.quote}</blockquote>
              <p className="cite">
                <strong>{quotes.generali.person}</strong>
                {quotes.generali.role}
              </p>
              <a className="story-link" href="https://www.enterprisebot.ai/case_study/generali_voice-0">
                Read the Generali case study ↗
              </a>
            </div>
            <div className="stats">
              {[stats.generaliComprehension, stats.generaliMisrouted].map((st, i) => (
                <div key={st.id} data-reveal style={{ ['--reveal-delay' as string]: `${60 + i * 70}ms` }}>
                  <p className="stat__value">{st.value}</p>
                  <div className="stat__rule" />
                  <p className="stat__label">{st.label}</p>
                  <p className="stat__context">{st.context}</p>
                </div>
              ))}
            </div>
          </article>
          <article className="proof-card proof-card--side" data-reveal style={{ ['--reveal-delay' as string]: '70ms' }}>
            <p className="proof-card__value">{stats.swissHealthRouting.value}</p>
            <div>
              <p className="proof-card__label">{stats.swissHealthRouting.label}</p>
              <p className="proof-card__context">
                {stats.swissHealthRouting.customer} · {stats.swissHealthRouting.context}. The call stays in Genesys; Enterprise
                Bot classifies it and routes it back to the right team.
              </p>
            </div>
            <a className="story-link story-link--dark" href={stats.swissHealthRouting.sourceUrl}>
              Read the case study ↗
            </a>
          </article>
          </div>
          <p className="path-links" data-reveal>
            <Link href="/customers">See all customer stories →</Link>
          </p>
        </div>
      </section>

      {voiceDemoEnabled && (
        <section id="try" className="section section--paper" aria-label="Try a demo call" style={{ paddingTop: 0 }}>
          <div className="container">
            <p className="lede" style={{ marginBottom: 16 }}>Want to hear the voice experience yourself?</p>
            <VoiceDemo provider={voiceDemoProvider} providerName={providerLabel[voiceDemoProvider]} />
          </div>
        </section>
      )}

      {/* 3 — Quality assessment */}
      <section id="quality" className="section section--white" aria-labelledby="quality-title">
        <div className="container qa">
          <div data-reveal>
            <p className="kicker">Quality assessment</p>
            <h2 id="quality-title" className="h2" style={{ marginTop: 16 }}>
              Score human and AI conversations against <span className="hl">your QA scorecard.</span>
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              Each evaluated conversation gets a result per scorecard criterion, the reasoning behind it, the evidence
              from the transcript and a coaching note. Results are written in the conversation’s language, within the
              languages configured for your deployment. Your quality team reviews and coaches from evidence.
            </p>
            <ul className="qa__points">
              <li>
                <OutlineIcon name="log" size={24} />
                <span>
                  <b>Your scorecard.</b> Use the criteria your quality team already applies.
                </span>
              </li>
              <li>
                <OutlineIcon name="eye" size={24} />
                <span>
                  <b>Evidence for every result.</b> Each score points to the moment in the conversation behind it.
                </span>
              </li>
              <li>
                <OutlineIcon name="cap" size={24} />
                <span>
                  <b>Coaching notes.</b> Specific, written for the agent, ready for the next one-to-one.
                </span>
              </li>
            </ul>
            <Link className="text-link" href="/platform/quality-assessment" style={{ marginTop: 28 }}>
              See Quality Assessment <Arrow />
            </Link>
          </div>
          <div data-reveal style={{ ['--reveal-delay' as string]: '70ms' }}>
            <QaLens />
          </div>
        </div>
      </section>

      {/* 4 — The contact-center loop */}
      <section className="section section--paper" aria-labelledby="start-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">The contact-center loop</p>
            <h2 id="start-title" className="h2 h2--xl">
              Answer, assist, assess, improve.
            </h2>
          </div>
          <div className="starts">
            {starts.map((p, i) => (
              <Link
                key={p.slug}
                href={`/platform/${p.slug}`}
                className="start"
                data-reveal
                style={{ ['--reveal-delay' as string]: `${(i % 2) * 70}ms` }}
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
            <Link className="text-link" href="/platform/email-agent">
              Email Agent for shared mailboxes
            </Link>{' '}
            and{' '}
            <Link className="text-link" href="/platform/chat-agent">
              Chat Agent for web, app and WhatsApp
            </Link>
            , on the same knowledge and rules.
          </p>
          <Link href="/platform/live-translate" className="lt-strip" data-reveal>
            <span className="lt-strip__tag">Early access</span>
            <span className="lt-strip__body">
              <b>Live Translate</b> Customer and agent speak different languages on the same call, translated as they speak.
            </span>
            <span className="lt-strip__go">
              See Live Translate <Arrow />
            </span>
          </Link>
          <div className="quote-row">
            <article className="quote-card" data-reveal>
              <div className="stat-inline">
                <b>{stats.callpointTraining.value}</b>
                <span>
                  {stats.callpointTraining.label} · {stats.callpointTraining.customer},{' '}
                  {stats.callpointTraining.context.toLowerCase()}
                </span>
              </div>
              <blockquote>{quotes.callpoint.quote}</blockquote>
              <p className="cite">
                <strong>{quotes.callpoint.person}</strong>
                {quotes.callpoint.customer} · quote refers to an earlier Enterprise Bot product name
              </p>
              <a className="story-link story-link--dark" href="https://www.enterprisebot.ai/case_study/callpoint">
                Read the Callpoint case study ↗
              </a>
            </article>
            <article className="quote-card" data-reveal style={{ ['--reveal-delay' as string]: '70ms' }}>
              <blockquote>{quotes.swica.quote}</blockquote>
              <p className="cite">
                <strong>{quotes.swica.person}</strong>
                {quotes.swica.customer}
              </p>
              <a className="story-link story-link--dark" href="https://www.enterprisebot.ai/case_study/swica">
                Read the SWICA case study ↗
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* 5 — Works with your contact center */}
      <section id="integrations" className="section section--navy" aria-labelledby="int-title">
        <div className="container">
          <div className="section-head section-head--split" data-reveal>
            <div>
              <p className="kicker">Integrations</p>
              <h2 id="int-title" className="h2" style={{ marginTop: 16 }}>
                Plugs into your telephony and <span className="hl">contact center.</span>
              </h2>
            </div>
            <p className="lede">
              Keep your carriers, routing, queues and agent desktop. Enterprise Bot connects through SIP and AudioCodes,
              answers in front of your queues and transfers back into them with a summary.
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
            <div className="arch__core" data-reveal style={{ ['--reveal-delay' as string]: '70ms' }}>
              <div className="arch__core-title">
                <img src="/eb-logo-on-light.svg" alt="Enterprise Bot" width={150} height={23} loading="lazy" />
                <span>AI layer</span>
              </div>
              <div className="arch__agents arch__agents--voice">
                <div className="arch__voice">Voice Agent</div>
                <div>Email · Chat</div>
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
                  Quality
                  <small>Scorecards, outcomes</small>
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
            <div className="arch__col" data-reveal style={{ ['--reveal-delay' as string]: '140ms' }}>
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

          <ul className="partner-strip" data-reveal>
            {[
              ['Genesys Cloud', '/integrations/genesys'],
              ['Microsoft Teams', '/integrations/microsoft-teams'],
              ['Cisco', '/integrations/cisco'],
              ['VIER', '/integrations/vier'],
              ['SIP and AudioCodes', '/integrations/sip-audiocodes'],
            ].map(([n, h]) => (
              <li key={h}>
                <Link href={h}>{n} →</Link>
              </li>
            ))}
          </ul>
          <div className="integrations-list">
            <article className="integration" data-reveal>
              <h3>Genesys Cloud</h3>
              <p>Keep Genesys Cloud and the platform you already pay for. Enterprise Bot adds the AI layer.</p>
              <ul>
                <li>Voice automation in front of your queues</li>
                <li>Handover into existing queues with a written summary</li>
              </ul>
            </article>
            <article className="integration" data-reveal style={{ ['--reveal-delay' as string]: '70ms' }}>
              <h3>Cisco</h3>
              <p>AI close to your infrastructure, for teams with strict deployment and language requirements.</p>
              <ul>
                <li>Cloud, private cloud and on-premises options</li>
                <li>Multilingual voice for regional contact centers</li>
              </ul>
            </article>
            <article className="integration" data-reveal style={{ ['--reveal-delay' as string]: '140ms' }}>
              <h3>SIP and AudioCodes</h3>
              <p>Connects to your existing telephony and session border controllers.</p>
              <ul>
                <li>Inbound calls answered by the Voice Agent</li>
                <li>Transfers back into your queues with a summary</li>
              </ul>
            </article>
            <article className="integration" data-reveal style={{ ['--reveal-delay' as string]: '210ms' }}>
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

      {/* 6 — Beyond the phone */}
      <section id="journey" className="section section--white" aria-labelledby="journey-title">
        <div className="container">
          <div className="section-head section-head--split" data-reveal>
            <div>
              <p className="kicker">Beyond the phone</p>
              <h2 id="journey-title" className="h2" style={{ marginTop: 16 }}>
                Built for calls. <span className="hl">Ready for email and chat.</span>
              </h2>
            </div>
            <p className="lede">
              Voice comes first. The same knowledge, rules and handover run on email and chat when you need them. Illustrative example with synthetic data.
            </p>
          </div>
          <div data-reveal>
            <Journey />
          </div>
        </div>
      </section>

      {/* 7 — Enterprise control */}
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
              did. <Link href="/security">Security and data</Link> · <Link href="/technology">Technology</Link>
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
            <article className="pillar" data-reveal style={{ ['--reveal-delay' as string]: '70ms' }}>
              <h3>Knowledge</h3>
              <p>
                Answers come from the documents and pages you approve. When no approved source covers the question, it
                is set up to say so and offer a person.
              </p>
              <div className="specimen" aria-hidden="true">
                “Account changes are allowed on open claims.”
                <br />
                <span className="cite-chip">Source: Claims payout policy §4.2</span>
              </div>
            </article>
            <article className="pillar" data-reveal>
              <h3>Language</h3>
              <p>
                Replies in the customer’s language, within the languages configured and tested for your deployment.{' '}
                <Link href="/languages">Languages by market</Link>
              </p>
              <div className="specimen lang-row" aria-hidden="true">
                <span className="chip" style={{ marginTop: 0 }}>Caller: German</span>
                <span className="arrow-sep">→</span>
                <span className="chip" style={{ marginTop: 0 }}>Reply: German</span>
                <span className="arrow-sep">→</span>
                <span className="chip" style={{ marginTop: 0 }}>CRM note: English</span>
              </div>
            </article>
            <article className="pillar" data-reveal style={{ ['--reveal-delay' as string]: '70ms' }}>
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

      {/* 8 — How an evaluation works */}
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
              <li key={s.t} className="path__step" data-reveal style={{ ['--reveal-delay' as string]: `${i * 70}ms` }}>
                <div className="path__head">
                  <span className="path__num">{i + 1}</span>
                  <span className="path__dash" aria-hidden="true" />
                </div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
          <p className="path-links" data-reveal>
            <Link href="/evaluation">See the full pilot plan →</Link>
            <Link href="/pricing">How pricing works →</Link>
          </p>
        </div>
      </section>

      {/* 9 — Final conversion */}
      <section className="cta-band" aria-labelledby="cta-title">
        <Waves />
        <div className="container cta-band__grid">
          <div data-reveal>
            <h2 id="cta-title">
              Hear it on <span className="hl">your</span> call type. See it scored.
            </h2>
            <p>
              Bring one call type. We will show the Voice Agent handling it, the handover to a person and a QA
              scorecard applied to the conversation. Tell us your languages and we will confirm which we can show.
            </p>
          </div>
          <div className="cta-band__panel" data-reveal style={{ ['--reveal-delay' as string]: '70ms' }}>
            <ul>
              {['A session tailored to your stack', 'Your languages and request types', 'A pilot plan and a cost model on your volumes'].map((t) => (
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
