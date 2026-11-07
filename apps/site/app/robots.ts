import type { MetadataRoute } from 'next'
import { site } from '@/content/site'

export default function robots(): MetadataRoute.Robots {
  if (process.env.SITE_INDEXABLE !== 'true') {
    return { rules: { userAgent: '*', disallow: '/' } }
  }
  return { rules: { userAgent: '*', allow: '/', disallow: '/api/' }, sitemap: `${site.url}/sitemap.xml` }
}
