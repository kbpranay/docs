import type { Metadata } from 'next'
import { Brush } from '@/components/Brush'
import { CtaBand, PageHero } from '@/components/PageHero'
import { Related } from '@/components/Related'
import { postGroups } from '@/content/blog'
import { showFeedyou } from '@/content/site'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Blog',
  description: 'Articles on voice AI, contact-center automation, speech and languages, security and integrations from Enterprise Bot and Feedyou.',
  path: '/blog',
})

const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

export default function Blog() {
  const groups = postGroups
    .map((g) => ({ ...g, posts: g.posts.filter((p) => showFeedyou || p.source === 'eb').sort((a, b) => b.date.localeCompare(a.date)) }))
    .filter((g) => g.posts.length)
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Blog', href: '/blog' }]}
        kicker="Blog"
        title={
          <>
            Notes from <span className="hl hl--brush">the contact center.<Brush draw /></span>
          </>
        }
        intro="What we learn building voice AI, quality assessment and automation for contact centers: speech and languages, accuracy, security and integrations."
      />
      {groups.map((g, gi) => (
        <section key={g.label} className={`section ${gi % 2 ? 'section--white' : 'section--paper'}`} aria-labelledby={`blog-${gi}`}>
          <div className="container">
            <div className="section-head" data-reveal>
              <h2 id={`blog-${gi}`} className="h2">
                {g.label}
              </h2>
            </div>
            <ul className="posts" data-reveal>
              {g.posts.map((p) => (
                <li key={p.url}>
                  <a href={p.url} className="post">
                    <span className="post__meta">
                      <time dateTime={p.date}>{fmt(p.date)}</time>
                      {p.source === 'feedyou' && <span> · Feedyou</span>}
                    </span>
                    <span className="post__title">{p.title} ↗</span>
                    <span className="post__topic">{p.topic}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
      <Related route="/blog" />
      <CtaBand title={<>Talk to the team <span className="hl">behind it.</span></>} body="Bring your questions on voice, languages or quality and we will answer them on your own call types." />
    </>
  )
}
