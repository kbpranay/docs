import Link from 'next/link'
import type { ReactNode } from 'react'
import { site } from '@/content/site'
import { Arrow } from './Icons'
import { Waves } from './Waves'

/** Shared navy hero for content pages. */
export function PageHero({ kicker, title, intro, aside }: { kicker: string; title: ReactNode; intro: string; aside?: ReactNode }) {
  return (
    <section className="page-hero" aria-labelledby="page-title">
      <Waves />
      <div className={aside ? 'container page-hero__grid' : 'container'}>
        <div>
          <p className="kicker">{kicker}</p>
          <h1 id="page-title">{title}</h1>
          <p className="intro">{intro}</p>
          <div className="hero__ctas">
            <Link className="btn btn--primary" href={site.primaryCta.href}>
              {site.primaryCta.label} <Arrow />
            </Link>
          </div>
        </div>
        {aside}
      </div>
    </section>
  )
}

/** Closing CTA band shared by content pages. */
export function CtaBand({ title, body }: { title: ReactNode; body: string }) {
  return (
    <section className="cta-band" aria-label="Book a demo">
      <Waves />
      <div className="container cta-band__grid">
        <div data-reveal>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
        <div className="cta-band__panel" data-reveal style={{ ['--reveal-delay' as string]: '70ms' }}>
          <Link className="btn btn--primary" href={site.primaryCta.href}>
            {site.primaryCta.label} <Arrow />
          </Link>
        </div>
      </div>
    </section>
  )
}
