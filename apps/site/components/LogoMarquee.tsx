'use client'

import { useEffect, useRef, useState } from 'react'
import type { Logo } from '@/content/claims'

/**
 * Scrolling logo wall. Rows drift slowly in opposite directions, only while on
 * screen; hover, keyboard focus or the Pause button stops them. Reduced motion
 * shows a still grid.
 */
export function LogoMarquee({ rows }: { rows: Logo[][] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.1 })
    io.observe(el)
    const onVis = () => document.hidden && setInView(false)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="marquee"
      data-inview={inView ? 'true' : 'false'}
      data-paused={paused ? 'true' : 'false'}
    >
      {rows.map((row, r) => (
        <div key={r} className={`marquee__row${r % 2 ? ' marquee__row--rev' : ''}`}>
          <ul className="marquee__track" style={{ ['--count' as string]: row.length }}>
            {[...row, ...row].map((l, i) => (
              <li key={`${l.name}-${i}`} data-origin={l.origin} aria-hidden={i >= row.length ? 'true' : undefined} className={i >= row.length ? 'marquee__dup' : undefined}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/logos/${l.file}`} alt={i >= row.length ? '' : l.name} width={150} height={56} loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button type="button" className="marquee__toggle" onClick={() => setPaused((p) => !p)} aria-pressed={paused}>
        {paused ? 'Play logos' : 'Pause logos'}
      </button>
    </div>
  )
}
