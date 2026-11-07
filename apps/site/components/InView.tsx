'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Sets data-inview on its wrapper while it is on screen, so looping CSS
 * animations inside run only when someone can see them.
 */
export function InView({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 })
    io.observe(el)
    const onVis = () => {
      if (document.hidden) setInView(false)
      else {
        const r = el.getBoundingClientRect()
        setInView(r.top < window.innerHeight && r.bottom > 0)
      }
    }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])
  return (
    <div ref={ref} className={className} data-inview={inView ? 'true' : 'false'}>
      {children}
    </div>
  )
}
