'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Example QA evaluation that plays once when it comes into view:
 * call lines appear, each criterion is checked against the line that proves it,
 * the ring fills, and a coaching note closes it out.
 * Server render and reduced motion show the finished result.
 * Hand-written example on the synthetic claims call; not product output.
 */

type Result = 'Met' | 'Partly met'

const lines = [
  { who: 'Customer', t: '00:04', text: 'I need to change the account for my claim payout.' },
  { who: 'AI agent', t: '00:09', text: 'Of course. First, can you confirm your date of birth?', mark: 'confirm your date of birth' },
  { who: 'AI agent', t: '00:31', text: 'Payout policy 4.2 allows the change once you are verified. Done.', mark: 'Payout policy 4.2' },
  { who: 'AI agent', t: '00:48', text: 'The amount needs approval, so a claims specialist will take over.', mark: 'needs approval' },
]

const criteria: { c: string; r: Result; line: number; why: string }[] = [
  { c: 'Identity verified', r: 'Met', line: 1, why: 'Verified before account details' },
  { c: 'Correct process', r: 'Met', line: 2, why: 'Policy checked before the change' },
  { c: 'Handover explained', r: 'Partly met', line: 3, why: 'Approval named, timing not given' },
]

// step: 1 line0 · 2 line1 · 3 crit0 · 4 line2 · 5 crit1 · 6 line3 · 7 crit2 · 8 coaching note
const FINAL = 8
const lineStep = (i: number) => (i === 0 ? 1 : i * 2)
const critStep = (k: number) => 3 + k * 2

export function QaLens() {
  const ref = useRef<HTMLElement>(null)
  const [step, setStep] = useState(FINAL)
  const [playing, setPlaying] = useState(false)
  const [inView, setInView] = useState(false)
  const played = useRef(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = ref.current
    if (reduce || !el || !('IntersectionObserver' in window)) return
    const r = el.getBoundingClientRect()
    if (r.top > window.innerHeight) setStep(0) // start empty only if it is still below the fold
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    const onVis = () => document.hidden && setInView(false)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  useEffect(() => {
    if (inView && !played.current && step < FINAL) {
      played.current = true
      setPlaying(true)
    }
    if (!inView) setPlaying(false)
  }, [inView, step])

  useEffect(() => {
    if (!playing) return
    if (step >= FINAL) {
      setPlaying(false)
      return
    }
    const id = window.setTimeout(() => setStep((s) => s + 1), step === 0 ? 300 : 760)
    return () => window.clearTimeout(id)
  }, [playing, step])

  const replay = () => {
    setStep(0)
    setPlaying(true)
  }

  const resolved = criteria.filter((_, k) => step >= critStep(k))
  const met = resolved.filter((c) => c.r === 'Met').length
  const C = 2 * Math.PI * 42
  const seg = C / 3

  return (
    <figure ref={ref} className="qalens" data-playing={playing ? 'true' : 'false'} data-inview={inView ? 'true' : 'false'}>
      <div className="qalens__bar">
        <span>
          <b>Claims call · 10:42</b>
          <small>Scored against: Claims QA scorecard</small>
        </span>
        <span className="qalens__pill">Example</span>
      </div>

      <div className="qalens__body">
        <ol className="qalens__call" aria-label="Call transcript">
          {lines.map((l, i) => {
            const shown = step >= lineStep(i)
            const k = criteria.findIndex((c) => c.line === i)
            const evidence = k >= 0 && step >= critStep(k)
            const parts = l.mark ? l.text.split(l.mark) : [l.text]
            return (
              <li key={i} className={`qalens__line${shown ? ' is-on' : ''}`} data-who={l.who === 'Customer' ? 'customer' : 'ai'}>
                <span className="qalens__meta">
                  <span>{l.who}</span>
                  <time>{l.t}</time>
                </span>
                <p>
                  {l.mark ? (
                    <>
                      {parts[0]}
                      <mark className={evidence ? 'is-on' : ''}>{l.mark}</mark>
                      {parts[1]}
                    </>
                  ) : (
                    l.text
                  )}
                  {evidence && <span className="qalens__ref">C{k + 1}</span>}
                </p>
              </li>
            )
          })}
          <span className="qalens__scan" aria-hidden="true" />
        </ol>

        <div className="qalens__score">
          <div className="qalens__ring">
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <circle className="qalens__track" cx="50" cy="50" r="42" />
              {criteria.map((c, k) => (
                <circle
                  key={c.c}
                  className={`qalens__seg qalens__seg--${c.r === 'Met' ? 'ok' : 'warn'}`}
                  cx="50"
                  cy="50"
                  r="42"
                  strokeDasharray={`${seg - 6} ${C}`}
                  strokeDashoffset={step >= critStep(k) ? 0 : seg - 6}
                  transform={`rotate(${-90 + k * 120 + 3} 50 50)`}
                />
              ))}
            </svg>
            <div className="qalens__ringtext" aria-live="polite">
              <b>
                {met}/{criteria.length}
              </b>
              <span>met</span>
            </div>
          </div>
          <ul className="qalens__crit">
            {criteria.map((c, k) => {
              const done = step >= critStep(k)
              const checking = !done && step >= lineStep(c.line)
              return (
                <li key={c.c} className={done ? 'is-done' : checking ? 'is-checking' : ''}>
                  <span className="qalens__dot" aria-hidden="true" />
                  <span className="qalens__ctext">
                    <b>
                      C{k + 1} · {c.c}
                    </b>
                    <small>{done ? c.why : checking ? 'Checking…' : 'Waiting for evidence'}</small>
                  </span>
                  {done && <span className={c.r === 'Met' ? 'chip chip--ok' : 'chip chip--warn'}>{c.r}</span>}
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className={`qalens__coach${step >= FINAL ? ' is-on' : ''}`}>
        <b>Coaching note</b>
        <p>Tell the caller when Claims will confirm the approval.</p>
        <button type="button" className="qalens__replay" onClick={replay} disabled={playing}>
          Replay
        </button>
      </div>
      <figcaption>
        Example: hand-written to show the format, on the synthetic claims call from the top of this page. Not product
        output and not customer data.
      </figcaption>
    </figure>
  )
}
