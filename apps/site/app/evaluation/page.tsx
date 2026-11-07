import { Brush } from '@/components/Brush'
import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import Link from 'next/link'
import { FigureCard } from '@/components/FigureCard'
import { Faq } from '@/components/Faq'
import { CtaBand, PageHero } from '@/components/PageHero'
import { Related } from '@/components/Related'

export const metadata: Metadata = pageMeta({
  title: 'Pilot and evaluation',
  description:
    'How to evaluate Enterprise Bot: one workload, agreed success criteria, your systems and languages, and a clear decision at the end.',
  path: '/evaluation',
})

const steps = [
  { t: 'Agree the workload and the measures', d: 'One high-volume call or email type, your current baseline and written success criteria before anything is built.' },
  { t: 'Connect to a test setup', d: 'Your contact center (or a test line), one knowledge source and one business system, in your languages.' },
  { t: 'Run with real scenarios', d: 'Your scripts, vocabulary and audio conditions, including the hard cases: noise, accents, language switches.' },
  { t: 'Measure and decide', d: 'Resolution, handovers, accuracy and customer effort against the baseline, reviewed together.' },
]

const checklist = [
  'Success criteria and baseline agreed in writing',
  'Languages and dialects to test',
  'Telephony and contact-center integration path',
  'Knowledge sources and the system to act in',
  'Data, hosting and security requirements',
  'Who decides, and when',
]

const faq = [
  { q: 'How long should a pilot take?', a: 'It depends on the workload and integrations. We agree the scope, measures and timeline with you in the first scoping call and write them down before anything is built.' },
  { q: 'What do we need to provide for a pilot?', a: 'Your baseline and success criteria, a test line or contact-center connection, one knowledge source, one business system to act in, and the languages to test.' },
]

export default function Evaluation() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Pilot and evaluation', href: '/evaluation' }]}
        kicker="Pilot and evaluation"
        title={
          <>
            A pilot with <span className="hl hl--brush">measures,<Brush draw /></span> not a demo.
          </>
        }
        intro="Prove it on one workload, against your own baseline, before you commit to a rollout."
        aside={
          <FigureCard
            title="Pilot scorecard"
            label="Illustrative"
            rows={['Resolution rate', 'Handover rate', 'Answer accuracy', 'Customer effort'].map((k) => (
              <>
                <span className="figure-row__k">{k}</span>
                <span>vs your baseline</span>
              </>
            ))}
          />
        }
      />
      <section className="section section--paper" aria-labelledby="steps-title">
        <div className="container">
          <h2 id="steps-title" className="sr-only">
            Evaluation steps
          </h2>
          <ol className="path path--four">
            {steps.map((s, i) => (
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
        </div>
      </section>
      <section className="section section--white" aria-labelledby="check-title">
        <div className="container">
          <div className="narrow narrow--wide" data-reveal>
            <p className="kicker">Before you start</p>
            <h2 id="check-title" className="h2" style={{ marginTop: 16 }}>
              The evaluation checklist.
            </h2>
            <ul className="share-list share-list--cols">
              {checklist.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p className="lede" style={{ marginTop: 20 }}>
              After the pilot: <Link href="/implementation">how rollout, training and support work</Link>.
            </p>
          </div>
        </div>
      </section>
      <Faq id="evaluation-faq" title="Pilot questions" items={faq} tone="white" />
      <Related route="/evaluation" />
      <CtaBand title={<>Plan <span className="hl">your</span> pilot.</>} body="We agree the workload, measures and setup with you in one scoping call." />
    </>
  )
}
