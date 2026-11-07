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
