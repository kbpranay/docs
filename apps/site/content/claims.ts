/**
 * Claims register.
 *
 * Every customer name, number or quote shown on the site must come from this
 * file so it can be reviewed in one place. Nothing here is a new claim: each
 * entry is copied from material Enterprise Bot already publishes, and records
 * where it came from and what still has to be checked before launch.
 *
 * Status meanings
 * - published-public: already shown on enterprisebot.ai (observed date below).
 *   Re-confirm permission, period and definition before the new site launches.
 * - positioning: an internal positioning decision from the Notion website
 *   masterplan. Needs product sign-off on actual availability.
 */

export type ClaimStatus = 'published-public' | 'positioning'

export interface Claim {
  id: string
  status: ClaimStatus
  source: string
  sourceUrl?: string
  observed: string
  reviewBeforeLaunch: string
}

export interface StatClaim extends Claim {
  value: string
  label: string
  customer: string
  context: string
}

export interface QuoteClaim extends Claim {
  quote: string
  person: string
  role: string
  customer: string
}

const PUBLIC_SITE = 'https://www.enterprisebot.ai/'
const OBSERVED = '2026-11-07'
const RECHECK =
  'Confirm current customer permission, measurement period and metric definition with the account owner.'

export const stats = {
  generaliComprehension: {
    id: 'generali-comprehension',
    value: '97%',
    label: 'speech comprehension',
    customer: 'Generali Switzerland',
    context: 'Leonie voicebot, customer care',
    status: 'published-public',
    source: 'enterprisebot.ai homepage',
    sourceUrl: PUBLIC_SITE,
    observed: OBSERVED,
    reviewBeforeLaunch: RECHECK,
  },
  generaliMisrouted: {
    id: 'generali-misrouted',
    value: '22%',
    label: 'fewer misdirected calls',
    customer: 'Generali Switzerland',
    context: 'Leonie voicebot, AI call routing',
    status: 'published-public',
    source: 'enterprisebot.ai homepage',
    sourceUrl: PUBLIC_SITE,
    observed: OBSERVED,
    reviewBeforeLaunch: RECHECK,
  },
  callpointTraining: {
    id: 'callpoint-training',
    value: '60%',
    label: 'less training effort for new agents',
    customer: 'Callpoint AG',
    context: 'Contact center operations',
    status: 'published-public',
    source: 'enterprisebot.ai homepage',
    sourceUrl: PUBLIC_SITE,
    observed: OBSERVED,
    reviewBeforeLaunch: RECHECK,
  },
} satisfies Record<string, StatClaim>

export const quotes = {
  generali: {
    id: 'generali-quote',
    quote:
      'Leonie has transformed our call-handling process. The seamless AI-powered routing ensures customers reach the right person immediately.',
    person: 'Luis Bosshard',
    role: 'Director Customer Care Center Non-Life',
    customer: 'Generali Switzerland',
    status: 'published-public',
    source: 'enterprisebot.ai homepage',
    sourceUrl: PUBLIC_SITE,
    observed: OBSERVED,
    reviewBeforeLaunch: 'Confirm quote approval is still current.',
  },
  callpoint: {
    id: 'callpoint-quote',
    quote: "With Enterprise Bot's Chatbot IQ, we've successfully integrated AI into the end-customer process.",
    person: 'José Manuel Taboas',
    role: 'Callpoint AG',
    customer: 'Callpoint AG',
    status: 'published-public',
    source: 'enterprisebot.ai homepage',
    sourceUrl: PUBLIC_SITE,
    observed: OBSERVED,
    reviewBeforeLaunch: 'Confirm quote approval; product name in quote is a legacy label.',
  },
  swica: {
    id: 'swica-quote',
    quote: 'Through our partnership with PwC and Enterprise Bot, we successfully hired our first digital employee.',
    person: 'Fabian Ringwald',
    role: 'SWICA',
    customer: 'SWICA',
    status: 'published-public',
    source: 'enterprisebot.ai homepage',
    sourceUrl: PUBLIC_SITE,
    observed: OBSERVED,
    reviewBeforeLaunch: 'Confirm quote approval is still current.',
  },
} satisfies Record<string, QuoteClaim>

/** Customer names shown in the proof row. All appear on the current public site. */
export const proofRow: Claim & { names: string[] } = {
  id: 'proof-row',
  names: [
    'Generali',
    'Swisscom',
    'SIX',
    'SWICA',
    'Callpoint',
    'Kantonsspital Winterthur',
    'TransPennine Express',
    'Comboios de Portugal',
  ],
  status: 'published-public',
  source: 'enterprisebot.ai homepage logo strip',
  sourceUrl: PUBLIC_SITE,
  observed: OBSERVED,
  reviewBeforeLaunch: 'Confirm logo/name permission per customer; replace text with approved logo files.',
}

/** Positioning statements that need product confirmation of availability. */
export const positioning = {
  deployment: {
    id: 'deployment-options',
    status: 'positioning',
    source: 'Notion website masterplan, 7 Nov 2026 (proof table: deployment control)',
    observed: OBSERVED,
    reviewBeforeLaunch: 'Product to confirm which components run in cloud, private cloud and on-premises.',
  },
  ciscoOnPrem: {
    id: 'cisco-on-prem',
    status: 'positioning',
    source: 'Pranay/Leti marketing session, 28 Oct 2026 (via Notion masterplan I1)',
    observed: OBSERVED,
    reviewBeforeLaunch: 'Confirm supported Cisco versions and integration method.',
  },
  qualityAssessment: {
    id: 'quality-assessment',
    status: 'positioning',
    source: 'Internal product ("GenAI Insights"): Slack #generali-genai-insights, #sales GenAI Insights training 14 Oct 2026, NFON demo plan 30 Sep 2026',
    observed: OBSERVED,
    reviewBeforeLaunch:
      'Product sign-off on scope: human vs AI conversations, channels, languages, custom scorecards and weightings, reviewer override. Do not name any customer as a QA reference without written approval.',
  },
  genesysLayer: {
    id: 'genesys-layer',
    status: 'positioning',
    source: 'Genesys vs Enterprise Bot battlecard, 18 Oct 2026 (Notion)',
    observed: OBSERVED,
    reviewBeforeLaunch: 'Confirm supported Genesys Cloud integration scope and handover method.',
  },
} satisfies Record<string, Claim>
