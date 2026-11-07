import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import Link from 'next/link'
import { FigureCard } from '@/components/FigureCard'
import { CtaBand, PageHero } from '@/components/PageHero'
import { Related } from '@/components/Related'

export const metadata: Metadata = pageMeta({
  title: 'Responsible AI and control',
  description:
    'Guardrails, human oversight, approval flows, testing and model choice for AI in the contact center.',
  path: '/responsible-ai',
})

const blocks = [
  { t: 'Grounded answers', b: 'Answers come from the knowledge sources you approve; when no approved source covers a question, the agent is set up to say so and offer a person.' },
  { t: 'Guardrails', b: 'Prompt-injection and prompt-leak detection, blocked terms and topic limits, applied before the model answers.' },
  { t: 'Data protection', b: 'PII masking before data reaches a model, and models and endpoints chosen for your data rules.' },
  { t: 'People decide what matters', b: 'Approval limits, handover rules and draft-for-approval on email, so a person signs off where you need one.' },
  { t: 'Tested before release', b: 'Scenario tests on your own conversations, and model comparisons before a change goes live.' },
  { t: 'Everything on record', b: 'Conversation logs, audit view and quality assessment show what the AI did and why.' },
]

const limits = [
  { t: 'It can misunderstand', b: 'Noise, strong accents and rare terms can cause recognition errors. We test with your audio and vocabulary, and set when the agent asks again or hands over.' },
  { t: 'It can be wrong', b: 'A language model can produce a fluent but incorrect answer. Grounding, guardrails and tests reduce this; logs and quality assessment let you find and fix it.' },
  { t: 'It should not decide alone', b: 'Decisions with legal or financial effect stay with people. The AI prepares, a person approves.' },
  { t: 'Callers should know', b: 'The agent is set up to say it is an AI at the start of the call, and callers can ask for a person whenever your team is available.' },
]

export default function ResponsibleAI() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Responsible AI and control', href: '/responsible-ai' }]}
        kicker="Responsible AI"
        title={
          <>
            AI you can <span className="hl">explain and control.</span>
          </>
        }
        intro="How Enterprise Bot keeps AI answers grounded, actions within limits and every decision reviewable."
        aside={
          <FigureCard
            title="Every decision on record"
            label="Illustrative"
            rows={[
              ['10:42:07', 'Rule checked · payout policy §4.2'],
              ['10:42:09', 'Action · refund account updated'],
              ['10:42:12', 'Handover · amount above approval limit'],
            ].map(([t, e]) => (
              <>
                <span className="figure-row__k">{t}</span>
                <span>{e}</span>
              </>
            ))}
          />
        }
      />
      <section className="section section--paper" aria-labelledby="rai-title">
        <div className="container">
          <h2 id="rai-title" className="sr-only">
            Controls
          </h2>
          <div className="caps" data-reveal>
            {blocks.map((x) => (
              <article key={x.t} className="cap">
                <h3>{x.t}</h3>
                <p>{x.b}</p>
              </article>
            ))}
          </div>
          <p className="source-note" data-reveal>
            Controls differ by voice mode: guardrails and PII masking apply fully in cascaded mode.{' '}
            <Link href="/technology">See the voice modes</Link>.
          </p>
        </div>
      </section>
      <section className="section section--white" aria-labelledby="lim-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">Known limits</p>
            <h2 id="lim-title" className="h2">
              What AI gets wrong, <span className="hl">stated up front.</span>
            </h2>
          </div>
          <div className="caps caps--four" data-reveal>
            {limits.map((x) => (
              <article key={x.t} className="cap">
                <h3>{x.t}</h3>
                <p>{x.b}</p>
              </article>
            ))}
          </div>
          <p className="source-note" data-reveal>
            For your risk and EU AI Act assessment we provide a written description of the system, its limits and the
            human oversight in your deployment.
          </p>
        </div>
      </section>
      <Related route="/responsible-ai" />
      <CtaBand title={<>Review the controls with <span className="hl">your</span> team.</>} body="We walk your risk, compliance and data protection teams through how the AI is governed." />
    </>
  )
}
