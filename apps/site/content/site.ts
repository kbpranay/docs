export type Segment = string | { hl: string }

export const site = {
  name: 'Enterprise Bot',
  tagline: 'Contact center automation',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.enterprisebot.ai',
  description:
    'AI agents for voice, email and chat that work inside the contact center, languages and deployment model you already have. They resolve routine requests, hand the rest to your agents with context, and log every step for review.',
  primaryCta: { label: 'Book a tailored demo', href: '/demo' },
  secondaryCta: { label: 'See it work', href: '/#journey' },
}

export const nav = [
  { label: 'Integrations', href: '/#integrations' },
  { label: 'Customers', href: '/#customers' },
  { label: 'Enterprise control', href: '/#control' },
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
