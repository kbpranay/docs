'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Doc, Pause, Phone, Play, Replay, StepNext, Tick } from './Icons'

/**
 * Signature scene: a call resolved through an action.
 *
 * Storyboard (Notion website masterplan §08, ~12 s):
 *   0-2 s   request arrives, channel is clear
 *   2-5 s   agent checks the rule in a knowledge source
 *   5-8 s   permitted backend action completes
 *   8-10 s  exception hands over to a person with context
 *   10-12 s summary and outcome are saved
 *
 * Motion rules: opacity/transform only; plays once then rests; pauses when
 * off screen or the tab is hidden; user can pause, replay or inspect any
 * step; prefers-reduced-motion gets the complete still state.
 */

const BEATS = ['Request', 'Knowledge', 'Action', 'Handover', 'Summary'] as const
const START = [0, 2000, 5000, 8000, 10000] // ms, beat start
const TOTAL = 12000
const WORK_MS = 850 // spinner time before a step's tick draws
const SAY_DELAY = [0, 1000, 1000, 1000] // agent speaks after its step's tick has drawn
const SAY_MS = [1900, 1700, 1600, 1000] // waveform active while speaking

type Speaker = 'customer' | 'agent' | 'none'
interface Stage {
  beat: number
  done: number
  said: number
  speaker: Speaker
}

function stageAt(e: number): Stage {
  let beat = 0
  let done = -1
  let said = -1
  let speaker: Speaker = 'none'
  for (let i = 0; i < START.length; i++) {
    if (e >= START[i]) beat = i
    if (e >= START[i] + WORK_MS) done = i
  }
  for (let i = 0; i < SAY_DELAY.length; i++) {
    const at = START[i] + SAY_DELAY[i]
    if (e >= at) said = i
    if (e >= at && e < at + SAY_MS[i]) speaker = i === 0 ? 'customer' : 'agent'
  }
  return { beat, done, said, speaker }
}

const FINAL: Stage = { beat: 4, done: 4, said: 3, speaker: 'none' }
const POSTER: Stage = { beat: 0, done: -1, said: 0, speaker: 'customer' }

const STATUS = ['Inbound call · Voice Agent', 'Transferring to Claims', 'Call handed over · summary saved']
const statusIndex = (beat: number) => (beat >= 4 ? 2 : beat === 3 ? 1 : 0)

export function HeroScene() {
  const rootRef = useRef<HTMLDivElement>(null)
  const elapsed = useRef(0)
  const lastTs = useRef<number | null>(null)
  const raf = useRef<number | null>(null)
  const stageRef = useRef<Stage>(POSTER)
  const userPaused = useRef(false)
  const visible = useRef(true)

  const [ready, setReady] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [stage, setStage] = useState<Stage>(POSTER)
  const [playing, setPlaying] = useState(false)
  const [finished, setFinished] = useState(false)
  const [focus, setFocus] = useState<number | null>(null)

  const apply = useCallback((e: number) => {
    const clamped = Math.min(Math.max(e, 0), TOTAL)
    rootRef.current?.style.setProperty('--progress', String(clamped / TOTAL))
    const next = clamped >= TOTAL ? FINAL : stageAt(clamped)
    const prev = stageRef.current
    if (
      next.beat !== prev.beat ||
      next.done !== prev.done ||
      next.said !== prev.said ||
      next.speaker !== prev.speaker
    ) {
      stageRef.current = next
      setStage(next)
    }
  }, [])

  const stop = useCallback(() => {
    if (raf.current != null) cancelAnimationFrame(raf.current)
    raf.current = null
    lastTs.current = null
  }, [])

  const frame = useCallback(
    (ts: number) => {
      if (lastTs.current == null) lastTs.current = ts
      // Clamp long gaps (e.g. a throttled background frame) to one frame.
      elapsed.current += Math.min(ts - lastTs.current, 64)
      lastTs.current = ts
      apply(elapsed.current)
      if (elapsed.current >= TOTAL) {
        stop()
        setPlaying(false)
        setFinished(true)
        return
      }
      raf.current = requestAnimationFrame(frame)
    },
    [apply, stop],
  )

  const start = useCallback(() => {
    if (raf.current != null) return
    lastTs.current = null
    raf.current = requestAnimationFrame(frame)
    setPlaying(true)
  }, [frame])

  const pause = useCallback(() => {
    stop()
    setPlaying(false)
  }, [stop])

  // Boot: decide between motion and the still state.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const toStill = () => {
      stop()
      elapsed.current = TOTAL
      apply(TOTAL)
      setReduced(true)
      setPlaying(false)
      setFinished(true)
    }
    if (mq.matches) toStill()
    setReady(true)
    if (!mq.matches) start()
    const onChange = (ev: MediaQueryListEvent) => {
      if (ev.matches) toStill()
      else setReduced(false)
    }
    mq.addEventListener('change', onChange)
    return () => {
      mq.removeEventListener('change', onChange)
      stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Pause when off screen or in a background tab; resume only if the
  // visitor did not pause it themselves.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const sync = () => {
      const canRun = visible.current && !document.hidden
      if (!canRun) {
        if (raf.current != null) pause()
      } else if (!userPaused.current && elapsed.current < TOTAL && raf.current == null && !reduced && ready) {
        start()
      }
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting
        sync()
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    document.addEventListener('visibilitychange', sync)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', sync)
    }
  }, [pause, start, reduced, ready])

  const onToggle = () => {
    if (reduced) {
      // Still mode: the button steps through the beats without animation.
      const atEnd = finished && focus == null
      const nb = atEnd ? 0 : (focus ?? -1) + 1
      if (nb > 4) {
        setFocus(null)
        elapsed.current = TOTAL
        apply(TOTAL)
        setFinished(true)
      } else inspect(nb)
      return
    }
    setFocus(null)
    if (playing) {
      userPaused.current = true
      pause()
      return
    }
    userPaused.current = false
    if (finished || elapsed.current >= TOTAL) {
      elapsed.current = 0
      setFinished(false)
      apply(0)
    }
    start()
  }

  const inspect = (b: number) => {
    userPaused.current = true
    pause()
    const e = b >= 4 ? TOTAL : START[b + 1] - 1
    elapsed.current = e
    apply(e)
    setFinished(b >= 4)
    setFocus(b)
  }

  const s = stage
  const current = focus ?? (finished ? -1 : s.beat)
  const on = (b: number) => (s.beat >= b ? ' is-on' : '')
  const isDone = (b: number) => (s.done >= b ? ' is-done' : '')
  const cur = (b: number) => (current === b ? ' is-current' : '')
  const foc = (b: number) => (focus === b ? ' is-focus' : '')
  const bubble = (i: number) => (s.said >= i ? ' is-on' : '') + (s.said === i ? ' is-latest' : '') + foc(i)
  const ended = s.beat >= 4
  const statusIdx = statusIndex(s.beat)

  const label = reduced
    ? finished && focus == null
      ? 'Step through the simulation'
      : 'Next step'
    : playing
      ? 'Pause the simulation'
      : finished
        ? 'Replay the simulation'
        : 'Play the simulation'
  const icon = reduced ? <StepNext /> : playing ? <Pause /> : finished ? <Replay /> : <Play />

  return (
    <div
      ref={rootRef}
      className="scene"
      role="group"
      aria-label="Illustrative simulation: a voice call resolved through an action, then handed to a person"
      data-ready={ready ? 'true' : undefined}
      data-playing={playing ? 'true' : 'false'}
      data-live={ready && !ended ? 'true' : 'false'}
      data-ended={ended ? 'true' : 'false'}
      data-speaking={playing && s.speaker !== 'none' ? 'true' : 'false'}
      data-speaker={s.speaker === 'agent' ? 'agent' : 'customer'}
      data-inspect={focus != null ? 'true' : 'false'}
    >
      <div className="scene__bar">
        <span className="scene__channel">
          <span className="scene__dot" aria-hidden="true">
            <Phone />
          </span>
          <span className="scene__status">
            {STATUS.map((t, i) => (
              <span key={t} aria-hidden={i === statusIdx ? undefined : 'true'}>
                {t}
              </span>
            ))}
          </span>
        </span>
        <span className="wave" aria-hidden="true">
          {Array.from({ length: 14 }, (_, i) => (
            <i key={i} />
          ))}
        </span>
        <span className="scene__label">Illustrative</span>
      </div>

      <div className="scene__body">
        <div className="scene__col">
          <p className="scene__heading">Conversation</p>
          <div className="convo">
            <p className={'bubble bubble--customer' + bubble(0)} data-beat="0">
              <span className="bubble__who">Caller</span>
              I’ve changed banks. Can my claim refund go to my new account?
            </p>
            <p className={'bubble bubble--agent' + bubble(1)} data-beat="1">
              <span className="bubble__who">Voice Agent</span>
              You’re verified, and account changes are allowed on open claims. I’ll do that now.
            </p>
            <p className={'bubble bubble--agent' + bubble(2)} data-beat="2">
              <span className="bubble__who">Voice Agent</span>
              Done. The refund will go to the account ending 4471.
            </p>
            <p className={'bubble bubble--agent' + bubble(3)} data-beat="3">
              <span className="bubble__who">Voice Agent</span>
              Because of the amount, Anna in Claims will approve it. She has everything, so no need to repeat.
            </p>
          </div>
        </div>

        <div className="scene__col">
          <p className="scene__heading">What the agent did</p>
          <ol className="steps">
            <li className={'step' + on(0) + isDone(0) + cur(0) + foc(0)} data-beat="0">
              <span className="step__icon">
                <span className="step__spinner" aria-hidden="true" />
                <Tick />
              </span>
              <div>
                <p className="step__title">Request understood</p>
                <span className="chip chip--ok">Caller verified</span>
              </div>
            </li>
            <li className={'step' + on(1) + isDone(1) + cur(1) + foc(1)} data-beat="1">
              <span className="step__icon">
                <span className="step__spinner" aria-hidden="true" />
                <Tick />
              </span>
              <div>
                <p className="step__title">Policy found</p>
                <span className="chip chip--source">
                  <Doc />
                  Claims payout policy §4.2
                </span>
              </div>
            </li>
            <li className={'step' + on(2) + isDone(2) + cur(2) + foc(2)} data-beat="2">
              <span className="step__icon">
                <span className="step__spinner" aria-hidden="true" />
                <Tick />
              </span>
              <div>
                <p className="step__title">Account updated</p>
                <span className="chip chip--ok">Claims system · IBAN …4471</span>
              </div>
            </li>
            <li className={'step' + on(3) + isDone(3) + cur(3) + foc(3)} data-beat="3">
              <span className="step__icon">
                <span className="step__spinner" aria-hidden="true" />
                <Tick />
              </span>
              <div>
                <p className="step__title">Handed to a person</p>
                <p className="step__detail">Above the CHF 2,000 approval limit</p>
                <span className="handover">
                  <span className="handover__avatar" aria-hidden="true">
                    AR
                  </span>
                  Anna R., Claims · with context
                </span>
              </div>
            </li>
            <li className={'step' + on(4) + isDone(4) + cur(4) + foc(4)} data-beat="4">
              <span className="step__icon">
                <span className="step__spinner" aria-hidden="true" />
                <Tick />
              </span>
              <div>
                <p className="step__title">Summary saved to CRM</p>
                <ul className="summary-card">
                  <li>
                    <span className="chip">AI</span>Refund account changed
                  </li>
                  <li>
                    <span className="chip">Person</span>Approval sent to Claims
                  </li>
                  <li>
                    <span className="chip">QA</span>2 met · 1 partly met
                  </li>
                </ul>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <div className="scene__foot">
        <button type="button" className="scene__play" onClick={onToggle} aria-label={label} title={label}>
          {icon}
        </button>
        <div className="rail">
          <div className="rail__track" aria-hidden="true">
            <div className="rail__fill" />
          </div>
          <div className="rail__beats">
            {BEATS.map((b, i) => {
              const state = current === i ? 'current' : s.beat > i || (s.beat === i && finished) ? 'done' : 'todo'
              return (
                <button
                  key={b}
                  type="button"
                  className="rail__beat"
                  data-state={state}
                  aria-current={current === i ? 'step' : undefined}
                  aria-label={`Show step ${i + 1}: ${b}`}
                  onClick={() => inspect(i)}
                >
                  <span className="rail__num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="rail__name">{b}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
