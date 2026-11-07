import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import type { ReactNode } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { RevealObserver } from '@/components/RevealObserver'
import { ConsentBanner } from '@/components/ConsentBanner'
import { offices, site } from '@/content/site'
import { JsonLd } from '@/lib/seo'
import './globals.css'

// Self-hosted Poppins (WOFF2, Latin subset) — no third-party font requests.
const poppins = localFont({
  src: [
    { path: '../node_modules/@fontsource/poppins/files/poppins-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../node_modules/@fontsource/poppins/files/poppins-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../node_modules/@fontsource/poppins/files/poppins-latin-600-normal.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-poppins',
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
})

// Preview builds stay out of search indexes until launch is approved.
const indexable = process.env.SITE_INDEXABLE === 'true'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Enterprise Bot: voice AI and QA for contact centers',
    template: '%s · Enterprise Bot',
  },
  description: site.metaDescription,
  openGraph: {
    type: 'website',
    siteName: 'Enterprise Bot',
    title: 'Enterprise Bot: voice AI and QA for contact centers',
    description: site.metaDescription,
  },
  twitter: { card: 'summary_large_image' },
  robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
  icons: { icon: '/icon.svg' },
}

export const viewport: Viewport = {
  themeColor: '#171547',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before first paint, so entrance motion never flashes. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <JsonLd
          data={[
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: site.name,
              url: site.url,
              logo: `${site.url}/eb-logo-on-light.svg`,
              description: site.description,
              address: offices.map((o) => ({ '@type': 'PostalAddress', streetAddress: o.address, addressLocality: o.city, addressCountry: o.country })),
            },
            { '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: site.url },
          ]}
        />
        <main id="main">{children}</main>
        <ConsentBanner />
        <Footer />
        <RevealObserver />
      </body>
    </html>
  )
}
