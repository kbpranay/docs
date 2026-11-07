import type { Metadata } from 'next'
import Link from 'next/link'
import { Brush } from '@/components/Brush'
import { CtaBand, PageHero } from '@/components/PageHero'
import { Related } from '@/components/Related'
import { Arrow } from '@/components/Icons'
import { industries } from '@/content/industries'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Industries',
  description: 'Voice AI and quality assessment for insurance, banking, rail and travel, and contact-center providers, with published customer results.',
  path: '/industries',
})

export default function Industries() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Industries', href: '/industries' }]}
        kicker="Industries"
        title={
          <>
            Built for <span className="hl hl--brush">your service lines.<Brush draw /></span>
          </>
        }
        intro="The same platform, configured for the requests, rules and languages of your industry, with published results from customers like you."
      />
      <section className="section section--paper" aria-labelledby="ind-title">
        <div className="container">
          <h2 id="ind-title" className="sr-only">
            Industries
          </h2>
          <div className="stories" data-reveal>
            {industries.map((i) => (
              <Link key={i.slug} href={`/industries/${i.slug}`} className="story story--link">
                <h3>{i.name}</h3>
                <p className="story__metric">
                  <span>{i.navLine}</span>
                </p>
                <p className="story__origin">{i.proofLine}</p>
                <span className="story-link story-link--dark">
                  Explore <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Related route="/industries" extra={['/customers', '/platform/voice-agent', '/platform/conversation-insights', '/integrations']} />
      <CtaBand title={<>See it on <span className="hl">your</span> service line.</>} body="We scope one workload in your industry and show it running against your systems." />
    </>
  )
}
