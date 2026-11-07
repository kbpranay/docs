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
    source: 'Internal product evidence (sales training and product records, Sep–Oct 2026); full references in the Notion website masterplan',
    observed: OBSERVED,
    reviewBeforeLaunch:
      'Product sign-off on scope: human vs AI conversations, channels, languages, custom scorecards and weightings, reviewer override, team and topic trends. Do not name any customer as a QA reference without written approval.',
  },
  voiceDemo: {
    id: 'live-voice-demo',
    status: 'positioning',
    source: 'Website live demo (components/VoiceDemo.tsx) on a real-time voice model (Google Gemini by default, or OpenAI), CEO instruction 7 Nov 2026',
    observed: OBSERVED,
    reviewBeforeLaunch:
      'Keep the consent notice naming the voice provider (Gemini by default, or OpenAI). Privacy review of sending visitor audio to OpenAI (privacy notice, DPA). Confirm cost caps and abuse limits.',
  },
  integrationsPublic: {
    id: 'integrations-public',
    status: 'published-public',
    source: 'enterprisebot.ai/technology and /products/voice-bot (Genesys AppFoundry, Luware Nimbus / Microsoft Teams, NICE CXone, VIER, generic SIP/WebRTC)',
    sourceUrl: 'https://www.enterprisebot.ai/technology',
    observed: OBSERVED,
    reviewBeforeLaunch: 'Confirm each listed integration is current and its supported versions.',
  },
  technologyPage: {
    id: 'technology-page',
    status: 'published-public',
    source:
      'enterprisebot.ai/technology and /products/voice-bot: managed hosting in EU, Middle East, North America or Asia; dedicated VPC or on-prem; Kubernetes on EKS, GKE, AKS or own infrastructure; SCIM/SSO and RBAC; immutable audit logs; LLM choice (ChatGPT, Gemini, Bedrock, private models); STT Deepgram/Google/Microsoft; TTS ElevenLabs/Polly/Azure Neural; generic SIP/WebRTC with your own SBC',
    sourceUrl: 'https://www.enterprisebot.ai/technology',
    observed: OBSERVED,
    reviewBeforeLaunch: 'Re-confirm each item is current; help center confirms team-wide 2FA, Audit View and conversation logs.',
  },
  integrationStatus: {
    id: 'integration-status',
    status: 'positioning',
    source:
      'Internal: Genesys AudioHook/AudioConnector live; VIER telephony live at a customer; AudioCodes VoiceAI Connect live; Luware Nimbus in customer UAT; native Teams in development; Cisco UCCX built, UCCE planned (Slack, Fireflies Oct 2026)',
    observed: OBSERVED,
    reviewBeforeLaunch: 'Product to confirm status per platform before the integration pages go live; no customer names.',
  },
  genesysAddOn: {
    id: 'genesys-add-on',
    status: 'positioning',
    source: 'Internal CEO positioning on adding value alongside Genesys (Sep–Oct 2026); full references in Notion',
    observed: OBSERVED,
    reviewBeforeLaunch: 'No cost percentages, WER or customer figures without measurement and approval.',
  },
  voiceModes: {
    id: 'voice-modes',
    status: 'positioning',
    source: 'AIDA help center: Standard (cascaded) and Realtime Voice modes, barge-in, silence timeout (apps/web/content/en)',
    observed: OBSERVED,
    reviewBeforeLaunch: 'Product to confirm tool-calling support in Realtime mode and guardrail/PII status per mode.',
  },
  languageList: {
    id: 'language-list',
    status: 'published-public',
    source: 'enterprisebot.ai blog "The evolution of voice bots… language coverage", 28 Apr 2025 (46 locales)',
    sourceUrl:
      'https://www.enterprisebot.ai/blog/the-evolution-of-voice-bots-advances-in-speech-to-text-and-text-to-speech-technologies-2025-and-language-coverage',
    observed: OBSERVED,
    reviewBeforeLaunch: 'Re-verify each listed locale against the current speech stack; no headline language count.',
  },
  liveTranslation: {
    id: 'live-translation',
    status: 'positioning',
    source: 'Live Translate launch research (Notion, 1 Nov 2026)',
    observed: OBSERVED,
    reviewBeforeLaunch: 'Early access only; confirm language pairs and availability; no latency or price figures.',
  },
  agentTraining: {
    id: 'agent-training',
    status: 'positioning',
    source: 'Internal CEO positioning, Oct 2026: agents practise complex customer scenarios with AI; full references in Notion',
    observed: OBSERVED,
    reviewBeforeLaunch: 'Product to confirm which deployments offer practice scenarios before launch.',
  },
  securityPosture: {
    id: 'security-posture',
    status: 'positioning',
    source:
      'enterprisebot.ai/technology (SaaS/VPC/on-prem, EU hosting, SOC 2, audit logs, SSO/RBAC); internal: ISO 27001:2022 audit in progress (Oct 2026); help center: Audit View, conversation logs, flow change logs',
    observed: OBSERVED,
    reviewBeforeLaunch: 'Confirm SOC 2 report type and date; say "ISO 27001 audit in progress" only until the certificate is issued.',
  },
  genesysLayer: {
    id: 'genesys-layer',
    status: 'positioning',
    source: 'Genesys vs Enterprise Bot battlecard, 18 Oct 2026 (Notion)',
    observed: OBSERVED,
    reviewBeforeLaunch: 'Confirm supported Genesys Cloud integration scope and handover method.',
  },
} satisfies Record<string, Claim>
