import type { MetadataRoute } from 'next'
import { products } from '@/content/products'
import { site } from '@/content/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    ...products.map((p) => ({ url: `${site.url}/platform/${p.slug}`, priority: 0.8 })),
    { url: `${site.url}/demo`, priority: 0.6 },
  ]
}
