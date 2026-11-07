import type { Metadata } from 'next'
import { site } from '@/content/site'

/** Page metadata with matching Open Graph and Twitter cards, so shared links show the page's own title. */
/** Shortens text to whole sentences within ~160 characters, the length search results show. */
export function metaDescription(text: string, max = 160) {
  if (text.length <= max) return text
  const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text]
  let out = ''
  for (const s of sentences) {
    if ((out + s).trim().length > max) break
    out += s
  }
  out = out.trim()
  if (out.length >= 90) return out
  return text.slice(0, max - 1).replace(/\s+\S*$/, '') + '…'
}

export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = path === '/' ? site.url : `${site.url}${path}`
  const desc = metaDescription(description)
  const images = [{ url: '/opengraph-image', width: 1200, height: 630, alt: `${title} · ${site.name}` }]
  return {
    title,
    description: desc,
    alternates: { canonical: path },
    openGraph: { type: 'website', siteName: site.name, title: `${title} · ${site.name}`, description: desc, url, images },
    twitter: { card: 'summary_large_image', title: `${title} · ${site.name}`, description: desc, images: ['/opengraph-image'] },
  }
}

export type Crumb = { name: string; href: string }

export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', href: '/' }, ...crumbs].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.href === '/' ? site.url : `${site.url}${c.href}`,
    })),
  }
}

export function faqLd(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
}

export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data]
  return (
    <>
      {items.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, '\\u003c') }} />
      ))}
    </>
  )
}
