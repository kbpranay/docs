import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

export const Arrow = (p: P) => (
  <svg className="arrow" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" {...base} {...p}>
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
)
export const Chevron = (p: P) => (
  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" {...base} {...p}>
    <path d="M3 4.5 6 7.5 9 4.5" />
  </svg>
)
export const Check = (p: P) => (
  <svg viewBox="0 0 20 20" aria-hidden="true" {...base} strokeWidth={2} {...p}>
    <path d="m5 10.5 3.2 3L15 6.5" />
  </svg>
)
/** Tick whose path length is normalised to 1 so it can be drawn with dashoffset. */
export const Tick = (p: P) => (
  <svg className="step__tick" viewBox="0 0 16 16" aria-hidden="true" {...base} strokeWidth={2.2} {...p}>
    <path pathLength={1} d="m3.5 8.5 2.8 2.8L12.5 5" />
  </svg>
)
export const Play = (p: P) => (
  <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor" {...p}>
    <path d="M4.5 2.8v10.4c0 .6.6.9 1.1.6l8.2-5.2c.5-.3.5-1 0-1.3L5.6 2.2c-.5-.3-1.1 0-1.1.6Z" />
  </svg>
)
export const Pause = (p: P) => (
  <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor" {...p}>
    <rect x="3.5" y="2.5" width="3" height="11" rx="1" />
    <rect x="9.5" y="2.5" width="3" height="11" rx="1" />
  </svg>
)
export const Replay = (p: P) => (
  <svg viewBox="0 0 16 16" aria-hidden="true" {...base} strokeWidth={2} {...p}>
    <path d="M2.8 8a5.2 5.2 0 1 0 1.6-3.8" />
    <path d="M2.5 2.5v3h3" />
  </svg>
)
export const Phone = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...p}>
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z" />
  </svg>
)
export const Doc = (p: P) => (
  <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true" {...base} strokeWidth={1.6} {...p}>
    <path d="M4 1.8h5.2L12.5 5v9.2H4z" />
    <path d="M9 1.8V5h3.5M6 8h4.5M6 10.8h4.5" />
  </svg>
)
export const StepNext = (p: P) => (
  <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor" {...p}>
    <path d="M3 3.2v9.6c0 .5.6.8 1 .5l6.6-4.8c.4-.3.4-.8 0-1.1L4 2.7c-.4-.3-1 0-1 .5Z" />
    <rect x="11.2" y="2.8" width="2" height="10.4" rx="1" />
  </svg>
)
