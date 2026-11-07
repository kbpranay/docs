import { Brush } from '@/components/Brush'
import type { Metadata } from 'next'
import Link from 'next/link'
import { FigureCard } from '@/components/FigureCard'
import { Check } from '@/components/Icons'
import { CtaBand, PageHero } from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Implementation and support',
  description:
    'How Enterprise Bot goes live in your contact center: phased delivery, testing and acceptance, training for admins and agents, support and a clean exit.',
  alternates: { canonical: '/implementation' },
}

const phases = [
  { t: 'Discovery', d: 'Workloads, languages, systems, data rules and success measures agreed with your team.' },
  { t: 'Build and connect', d: 'Telephony and contact-center integration, knowledge sources and business systems, in a test environment.' },
  { t: 'Test and accept', d: 'Scenario tests on your real cases, tracked one by one, and sign-off against criteria you set before go-live.' },
  { t: 'Go live in stages', d: 'Start with a share of traffic or one call type, watch the logs and quality scores, then widen.' },
  { t: 'Improve monthly', d: 'Review of handovers, misunderstandings and QA results, with changes tested before release.' },
]

const enable = [
  { t: 'Admin training', b: 'Your team learns to edit flows, knowledge and prompts, read the logs and roll back a change.' },
  { t: 'Agent practice', b: 'Rehearsing difficult conversations with AI before live calls is not yet generally available. Ask us about its status.' },
  { t: 'Supervisor coaching', b: 'Team leads learn to use quality assessment results for coaching notes and trends.' },
  { t: 'Help center', b: 'Documentation for admins and agents, updated with each release.' },
]

const support = [
  { t: 'Named contacts', b: 'A project lead during delivery and named contacts after go-live who know your setup.' },
  { t: 'Clear escalation', b: 'Severity levels, response commitments and escalation paths written into your contract.' },
  { t: 'Release notes and change control', b: 'You know what changes and when; workflow versions can be compared and rolled back.' },
  { t: 'A clean exit', b: 'Export your conversation logs and workflow configuration at any time; data deleted as the contract sets out.' },
]

function Caps({ items, four }: { items: { t: string; b: string }[]; four?: boolean }) {
  return (
    <div className={four ? 'caps caps--four' : 'caps'} data-reveal>
      {items.map((x) => (
        <article key={x.t} className="cap">
          <h3>{x.t}</h3>
          <p>{x.b}</p>
        </article>
      ))}
    </div>
  )
}

export default function Implementation() {
  return (
    <>
      <PageHero
        kicker="Implementation and support"
        title={
          <>
            From signature <span className="hl hl--brush">to live calls.<Brush draw /></span>
          </>
        }
        intro="A phased rollout with testing and acceptance you sign off, training for the people who run it, and support that stays after go-live."
        aside={
          <FigureCard
            title="Sign-offs"
            rows={phases.map((p) => (
              <>
                <span className="figure-row__tick" aria-hidden="true">
                  <Check />
                </span>
                <span>
                  <b>{p.t}</b> · {p.t === 'Improve monthly' ? 'changes approved by you' : 'signed off by you'}
                </span>
              </>
            ))}
          />
        }
      />
      <section className="section section--paper" aria-labelledby="phases-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">Delivery</p>
            <h2 id="phases-title" className="h2">
              Five phases, each with a sign-off.
            </h2>
          </div>
          <ol className="path path--five">
            {phases.map((s, i) => (
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
          <p className="source-note" data-reveal>
            Not ready to commit? Start with a measured <Link href="/evaluation">pilot on one workload</Link>.
          </p>
        </div>
      </section>
      <section className="section section--white" aria-labelledby="enable-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">Training and enablement</p>
            <h2 id="enable-title" className="h2">
              Your team runs it, <span className="hl">not us.</span>
            </h2>
          </div>
          <Caps items={enable} four />
        </div>
      </section>
      <section className="section section--paper" aria-labelledby="support-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">Support</p>
            <h2 id="support-title" className="h2">
              Support that stays after go-live.
            </h2>
          </div>
          <Caps items={support} four />
        </div>
      </section>
      <CtaBand
        title={
          <>
            Plan <span className="hl">your</span> rollout.
          </>
        }
        body="We map the phases, the acceptance criteria and the team you need in one scoping call."
      />
    </>
  )
}
