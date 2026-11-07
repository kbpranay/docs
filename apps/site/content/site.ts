export type Segment = string | { hl: string }

export const site = {
  name: 'Enterprise Bot',
  tagline: 'Voice AI and quality assessment for contact centers',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.enterprisebot.ai',
  description:
    'AI voice agents for the contact center, plus automated quality assessment of human and AI conversations against your QA scorecard. Connected to your telephony, contact center and business systems, in the languages configured and tested for your deployment.',
  primaryCta: { label: 'Book a tailored demo', href: '/demo' },
  secondaryCta: { label: 'See voice in production', href: '/#voice' },
}

export const nav = [
  { label: 'Integrations', href: '/integrations' },
  { label: 'Technology', href: '/technology' },
  { label: 'Languages', href: '/languages' },
  { label: 'Security', href: '/security' },
  { label: 'Pricing', href: '/pricing' },
]

/** Offices as listed in the current public site footer (observed 7 Nov 2026). */
export const offices = [
  { city: 'Zurich', country: 'Switzerland', address: 'Dufourstrasse 22, 8008 Zurich' },
  { city: 'Barcelona', country: 'Spain', address: 'Carrer de Tuset 3, 08006 Barcelona' },
  { city: 'Warsaw', country: 'Poland', address: 'Villa Metro Business House, 02-715 Warszawa' },
  { city: 'London', country: 'United Kingdom', address: '42-44 Bishopsgate, London EC2N 4AH' },
  { city: 'Bangalore', country: 'India', address: 'HSR Layout Sector 6, Bangalore 560102' },
  { city: 'Dover', country: 'United States', address: '8 The Green, Ste A, Dover, DE 19901' },
]
