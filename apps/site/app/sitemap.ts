import type { MetadataRoute } from 'next'
import { integrations } from '@/content/integrations'
import { products } from '@/content/products'
import { site } from '@/content/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    ...products.map((p) => ({ url: `${site.url}/platform/${p.slug}`, priority: 0.8 })),
    { url: `${site.url}/integrations`, priority: 0.8 },
    ...integrations.map((i) => ({ url: `${site.url}/integrations/${i.slug}`, priority: 0.7 })),
    { url: `${site.url}/technology`, priority: 0.7 },
    { url: `${site.url}/languages`, priority: 0.7 },
    { url: `${site.url}/security`, priority: 0.7 },
    { url: `${site.url}/resources`, priority: 0.5 },
    { url: `${site.url}/demo`, priority: 0.6 },
    { url: `${site.url}/privacy`, priority: 0.2 },
  ]
}
