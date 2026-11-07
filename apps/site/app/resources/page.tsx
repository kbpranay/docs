import type { Metadata } from 'next'
import Link from 'next/link'
import { pageMeta } from '@/lib/seo'
import { CtaBand, PageHero } from '@/components/PageHero'
import { Related } from '@/components/Related'

export const metadata: Metadata = pageMeta({
  title: 'Resources',
  description:
    'Buyer guides for evaluating voice AI and quality assessment: pilot checklist, pricing model, known limits, security review, rollout and languages.',
  path: '/resources',
})

const guides = [
  { t: 'The evaluation checklist', topic: 'Pilot', href: '/evaluation', line: 'What to agree before a pilot: baseline, measures, systems and languages.' },
  { t: 'How pricing is modelled', topic: 'Commercial', href: '/pricing', line: 'Platform fee plus usage, modelled on your own volumes.' },
  { t: 'Known limits of AI in the contact center', topic: 'Responsible AI', href: '/responsible-ai', line: 'What AI gets wrong and how you stay in control.' },
  { t: 'Security review: what we share', topic: 'Security', href: '/security', line: 'Deployment models, data lifecycle and documentation on request.' },
  { t: 'From signature to live calls', topic: 'Implementation', href: '/implementation', line: 'Five phases, each with a sign-off, plus training and support.' },
  { t: 'Languages by market', topic: 'Languages', href: '/languages', line: 'Switzerland, Poland, Eastern Europe and India, tested on your calls.' },
]

export default function Resources() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Resources', href: '/resources' }]}
        kicker="Resources"
        title={
          <>
            Guides for <span className="hl">evaluating voice AI.</span>
          </>
        }
        intro="Practical reading for contact-center, CX and IT teams evaluating voice AI and quality assessment."
      />
      <section className="section section--paper" aria-labelledby="res-title">
        <div className="container">
          <h2 id="res-title" className="sr-only">
            Buyer guides
          </h2>
          <div className="hub">
            {guides.map((p, i) => (
              <Link key={p.href} href={p.href} className="hub__card" data-reveal style={{ ['--reveal-delay' as string]: `${(i % 3) * 70}ms` }}>
                <span className="hub__topic">{p.topic}</span>
                <span className="hub__name">{p.t}</span>
                <span className="hub__line">{p.line}</span>
              </Link>
            ))}
          </div>
          <p className="path-links" data-reveal>
            <Link href="/blog">Read the blog →</Link>
            <Link href="/customers">Customer stories →</Link>
          </p>
        </div>
      </section>
      <Related route="/resources" />
      <CtaBand title={<>Prefer to see it <span className="hl">working?</span></>} body="Bring one call type and we will show it handled, handed over and scored." />
    </>
  )
}
