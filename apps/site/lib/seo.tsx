import type { Metadata } from 'next'
import { site } from '@/content/site'

/** Page metadata with matching Open Graph and Twitter cards, so shared links show the page's own title. */
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = path === '/' ? site.url : `${site.url}${path}`
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: 'website', siteName: site.name, title: `${title} · ${site.name}`, description, url },
    twitter: { card: 'summary_large_image', title: `${title} · ${site.name}`, description },
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
