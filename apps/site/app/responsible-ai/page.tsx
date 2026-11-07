import type { Metadata } from 'next'
import Link from 'next/link'
import { CtaBand, PageHero } from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Responsible AI and control',
  description: 'Guardrails, human oversight, approval flows, testing and model choice for AI in the contact center.',
  alternates: { canonical: '/responsible-ai' },
}

const blocks = [
  { t: 'Grounded answers', b: 'Answers come from the knowledge sources you approve; when no approved source covers a question, the agent is set up to say so and offer a person.' },
  { t: 'Guardrails', b: 'Prompt-injection and prompt-leak detection, blocked terms and topic limits, applied before the model answers.' },
  { t: 'Data protection', b: 'PII masking before data reaches a model, and models and endpoints chosen for your data rules.' },
  { t: 'People decide what matters', b: 'Approval limits, handover rules and draft-for-approval on email, so a person signs off where you need one.' },
  { t: 'Tested before release', b: 'Scenario tests on your own conversations, and model comparisons before a change goes live.' },
  { t: 'Everything on record', b: 'Conversation logs, audit view and quality assessment show what the AI did and why.' },
]

export default function ResponsibleAI() {
  return (
    <>
      <PageHero
        kicker="Responsible AI"
        title={
          <>
            AI you can <span className="hl">explain and control.</span>
          </>
        }
        intro="How Enterprise Bot keeps AI answers grounded, actions within limits and every decision reviewable."
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
      <CtaBand title={<>Review the controls with <span className="hl">your</span> team.</>} body="We walk your risk, compliance and data protection teams through how the AI is governed." />
    </>
  )
}
