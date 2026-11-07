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
    context: 'Agent Assist, contact center operations',
    status: 'published-public',
    source: 'enterprisebot.ai homepage',
    sourceUrl: PUBLIC_SITE,
    observed: OBSERVED,
    reviewBeforeLaunch: RECHECK,
  },
  swissHealthRouting: {
    id: 'swiss-health-routing',
    value: '98%',
    label: 'routing accuracy, confirmed by agents after each call',
    customer: 'A Swiss health insurer',
    context: 'AI call routing on Genesys in Swiss German, French and Italian',
    status: 'published-public',
    source: 'enterprisebot.ai case study "Swiss health insurer" (AI voice routing, Genesys, 8 service categories, about 300 test cases before launch)',
    sourceUrl: 'https://www.enterprisebot.ai/swiss-health-insurer-case-study-en-enterprise-bot',
    observed: OBSERVED,
    reviewBeforeLaunch:
      'Published anonymously; keep the customer unnamed unless approved. Confirm the 98% definition (agent confirmation after each call) and period. Source page also carries text from other case studies; ask marketing to fix it.',
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
    role: 'COO, Callpoint AG',
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
    id: 'conversation-insights',
    status: 'positioning',
    source:
      'GenAI Insights datasheets by Leti (Slack, 28 Oct 2026) and #qa-product: scorecards with criteria, weights, targets and versions; custom metrics in plain language shown as columns; plain-language questions answered as charts; intents, escalation reasons, sentiment, compliance flags; dashboards with drill-down; scheduled PDF/CSV reports. Product name proposed in the naming poll (EB Conversation Insights), not final.',
    observed: OBSERVED,
    reviewBeforeLaunch:
      'Product (Sid) to confirm: channel coverage (calls and chat; email?), live call scoring, and the final product name. Do not publish "100%" coverage: some deployments exclude calls.',
  },
  voiceDemo: {
    id: 'live-voice-demo',
    status: 'positioning',
    source: 'Website live demo (components/VoiceDemo.tsx) on a real-time voice model (Google Gemini by default, or OpenAI). CEO instruction 7 Nov 2026 (later the same day): present it as the Voice Agent in Realtime mode.',
    observed: OBSERVED,
    reviewBeforeLaunch:
      'Keep the consent notice naming the voice provider (Gemini by default, or OpenAI). Privacy review of sending visitor audio to OpenAI (privacy notice, DPA). Confirm cost caps and abuse limits.',
  },
  caseStudies: {
    id: 'case-studies',
    status: 'published-public',
    source: 'Published case studies on enterprisebot.ai/case_study (Generali voice, Callpoint, SWICA and others)',
    sourceUrl: 'https://www.enterprisebot.ai/case_study',
    observed: OBSERVED,
    reviewBeforeLaunch: 'Confirm each linked case study is still approved by the customer.',
  },
  reviewRatings: {
    id: 'review-ratings',
    status: 'published-public',
    source: 'Ratings shown on the enterprisebot.ai homepage: G2 4.7, Capterra 4.5, GetApp 4.5',
    sourceUrl: PUBLIC_SITE,
    observed: OBSERVED,
    reviewBeforeLaunch: 'Re-check current ratings on each review platform and link to the profiles.',
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
      'enterprisebot.ai/technology (SaaS/VPC/on-prem, EU hosting, SOC 2, audit logs, SSO/RBAC); CEO confirmation 7 Nov 2026: SOC 2 Type II report and ISO 27001 certificate; help center: Audit View, conversation logs, flow change logs',
    observed: OBSERVED,
    reviewBeforeLaunch: 'Security lead to attach the SOC 2 Type II report period and the ISO 27001 certificate number and scope to the documentation pack.',
  },
  genesysLayer: {
    id: 'genesys-layer',
    status: 'positioning',
    source: 'Genesys vs Enterprise Bot battlecard, 18 Oct 2026 (Notion)',
    observed: OBSERVED,
    reviewBeforeLaunch: 'Confirm supported Genesys Cloud integration scope and handover method.',
  },
  pricingModel: {
    id: 'pricing-model',
    status: 'positioning',
    source: 'Commercial answers in RFP responses and sales proposals (Notion RFP index, Oct–Nov 2026): platform fee plus usage, implementation scoped separately, cost modelled on customer volumes',
    observed: OBSERVED,
    reviewBeforeLaunch:
      'CEO confirmation 7 Nov 2026: usage per minute, per conversation or per successful outcome. Sales to align contract templates. No prices or discounts on the site.',
  },
  namedReferences: {
    id: 'named-references',
    status: 'positioning',
    source:
      'CEO confirmation, 7 Nov 2026: Generali on Microsoft Teams via Luware Nimbus and on AudioCodes; AXA and Callpoint on Genesys; WWZ on VIER; AXA (DialogueMaster) over SIP pending Slack check',
    observed: OBSERVED,
    reviewBeforeLaunch: 'Confirm each customer agrees to be named on the integration pages (Generali, AXA, Callpoint, WWZ).',
  },
  aboutCompany: {
    id: 'about-company',
    status: 'published-public',
    source:
      'enterprisebot.ai/company/about (founders and roles, offices) and feedyou.ai/about-us (founded 2017 in Pardubice, 120+ customers), observed 7 Nov 2026',
    sourceUrl: 'https://www.enterprisebot.ai/company/about',
    observed: OBSERVED,
    reviewBeforeLaunch: 'Confirm leadership titles are current (e.g. Chief Growth Officer) and the Feedyou wording with the announcement.',
  },
  implementation: {
    id: 'implementation-support',
    status: 'positioning',
    source:
      'RFP answer library and bid tracker (Notion RFP index, SharePoint bid tracker, Oct–Nov 2026): phased delivery with test and acceptance, admin and agent training, named contacts and escalation, data export on exit',
    observed: OBSERVED,
    reviewBeforeLaunch:
      'Delivery and support leads to confirm the phases and the support model. No response-time or uptime numbers until the SLA wording is agreed internally.',
  },
  dataLifecycle: {
    id: 'data-lifecycle',
    status: 'positioning',
    source:
      'RFP security and GDPR answers (Notion RFP index, Oct–Nov 2026) and help center: retention per deployment, deletion on request, PII masking, DPA, encryption in transit and at rest documented for review',
    observed: OBSERVED,
    reviewBeforeLaunch: 'Security lead to confirm each statement per deployment model; no SAML claim until confirmed.',
  },
  aiLimits: {
    id: 'ai-limits',
    status: 'positioning',
    source: 'RFP AI-governance answers incl. model-limitations documentation prepared for a public-sector bid (Notion RFP index, Oct 2026)',
    observed: OBSERVED,
    reviewBeforeLaunch: 'Legal to confirm EU AI Act wording; do not say "compliant" or name a risk class.',
  },
} satisfies Record<string, Claim>

/**
 * Customer stories for /customers. Every entry links to a published case study.
 * origin 'feedyou': Feedyou case studies (feedyou.ai), labelled "Feedyou, an
 * Enterprise Bot company". Shown by default (CEO decision, 7 Nov 2026: launch with
 * Feedyou); NEXT_PUBLIC_SHOW_FEEDYOU=false hides them.
 */
export interface CustomerStory {
  id: string
  name: string
  sector: string
  country: string
  channels: string[]
  voice: boolean
  metric?: { value: string; label: string }
  /** One-sentence outcome for stories without a published metric (from the case-study summary). */
  outcome?: string
  url: string
  origin: 'eb' | 'feedyou'
  reviewBeforeLaunch: string
}

const FY_CHECK =
  'Feedyou story: site launches together with the Feedyou announcement (CEO decision, 7 Nov 2026). Confirm customer permission to appear on enterprisebot.ai and re-check the figure on the live case study.'

export const customerStories: CustomerStory[] = [
  {
    id: 'generali',
    name: 'Generali Switzerland',
    sector: 'Insurance',
    country: 'Switzerland',
    channels: ['Voice', 'Call routing'],
    voice: true,
    metric: { value: '97%', label: 'speech comprehension' },
    url: 'https://www.enterprisebot.ai/case_study/generali_voice-0',
    origin: 'eb',
    reviewBeforeLaunch: RECHECK,
  },
  {
    id: 'swiss-health',
    name: 'A Swiss health insurer',
    sector: 'Health insurance',
    country: 'Switzerland',
    channels: ['Voice routing', 'Genesys'],
    voice: true,
    metric: { value: '98%', label: 'routing accuracy, confirmed by agents' },
    url: 'https://www.enterprisebot.ai/swiss-health-insurer-case-study-en-enterprise-bot',
    origin: 'eb',
    reviewBeforeLaunch: 'Keep unnamed unless approved; source page needs cleaning (see stats.swissHealthRouting).',
  },
  {
    id: 'moneta',
    name: 'MONETA Money Bank',
    sector: 'Banking',
    country: 'Czech Republic',
    channels: ['Voice', 'Genesys'],
    voice: true,
    metric: { value: '25%', label: 'of call-center requests handled by the voicebot after six months (up to)' },
    url: 'https://feedyou.ai/success-stories/moneta-money-bank/',
    origin: 'feedyou',
    reviewBeforeLaunch: FY_CHECK,
  },
  {
    id: 'foxconn',
    name: 'Foxconn (Czech plants)',
    sector: 'Manufacturing',
    country: 'Czech Republic',
    channels: ['Voice', '9 languages'],
    voice: true,
    metric: { value: '2 min', label: 'password recovery, down from up to 3 days' },
    url: 'https://feedyou.ai/success-stories/foxconn/',
    origin: 'feedyou',
    reviewBeforeLaunch: FY_CHECK,
  },
  {
    id: 'bezrealitky',
    name: 'Bezrealitky',
    sector: 'Real estate',
    country: 'Czech Republic',
    channels: ['Voice', 'Chat'],
    voice: true,
    metric: { value: '3,300', label: 'calls a month handled by the voicebot' },
    url: 'https://feedyou.ai/success-stories/bezrealitky/',
    origin: 'feedyou',
    reviewBeforeLaunch: FY_CHECK,
  },
  {
    id: 'callpoint',
    name: 'Callpoint AG',
    sector: 'Contact-center services',
    country: 'Switzerland',
    channels: ['Agent assist'],
    voice: false,
    metric: { value: '60%', label: 'less training effort for new agents' },
    url: 'https://www.enterprisebot.ai/case_study/callpoint',
    origin: 'eb',
    reviewBeforeLaunch: RECHECK,
  },
  {
    id: 'comboios',
    name: 'Comboios de Portugal',
    sector: 'Rail',
    country: 'Portugal',
    channels: ['Chat', 'WhatsApp'],
    voice: false,
    metric: { value: '90%', label: 'reduction in agent handling costs' },
    url: 'https://www.enterprisebot.ai/case_study/comboios-de-portugal',
    origin: 'eb',
    reviewBeforeLaunch: RECHECK + ' Source page also carries other customers’ text; ask marketing to clean it.',
  },
  {
    id: 'tpe',
    name: 'TransPennine Express',
    sector: 'Rail',
    country: 'United Kingdom',
    channels: ['Chat'],
    voice: false,
    outcome: 'In its published case study, the chatbot answers delay and journey questions from the Darwin live departure and disruption feed.', url: 'https://www.enterprisebot.ai/case_study/transpennineexpress',
    origin: 'eb',
    reviewBeforeLaunch:
      'Metric removed: the published case study gives conflicting figures (listing card vs key results). Contract ends 18 Nov 2026; decide whether to keep TPE as a past reference.',
  },
  {
    id: 'avenberg',
    name: 'Avenberg',
    sector: 'Retail',
    country: 'Czech Republic',
    channels: ['Email'],
    voice: false,
    metric: { value: '3.85 s', label: 'email response time, down from several minutes' },
    url: 'https://feedyou.ai/success-stories/avenberg/',
    origin: 'feedyou',
    reviewBeforeLaunch: FY_CHECK,
  },
  { id: 'swica', name: 'SWICA', sector: 'Health insurance', country: 'Switzerland', channels: ['Chat'], voice: false, outcome: 'Its first digital employee, delivered with PwC and Enterprise Bot.', url: 'https://www.enterprisebot.ai/case_study/swica', origin: 'eb', reviewBeforeLaunch: RECHECK },
  { id: 'six', name: 'SIX', sector: 'Financial services', country: 'Switzerland', channels: ['Email automation'], voice: false, outcome: 'Email response automation for financial-services enquiries.', url: 'https://www.enterprisebot.ai/case_study/six', origin: 'eb', reviewBeforeLaunch: RECHECK },
  { id: 'ksw', name: 'Kantonsspital Winterthur', sector: 'Healthcare', country: 'Switzerland', channels: ['Chat'], voice: false, outcome: 'An AI chatbot answering patient and visitor questions.', url: 'https://www.enterprisebot.ai/case_study/ksw', origin: 'eb', reviewBeforeLaunch: RECHECK },
  { id: 'rmv', name: 'RMV', sector: 'Public transport', country: 'Germany', channels: ['Chat', 'Email automation'], voice: false, outcome: 'Chatbot and email automation for a large German transport network.', url: 'https://www.enterprisebot.ai/case_study/rmv-0', origin: 'eb', reviewBeforeLaunch: RECHECK },
  { id: 'yuh', name: 'Yuh', sector: 'Fintech', country: 'Switzerland', channels: ['Chat'], voice: false, outcome: 'AI chat support inside a Swiss banking app.', url: 'https://www.enterprisebot.ai/case_study/yuh', origin: 'eb', reviewBeforeLaunch: RECHECK },
  { id: 'bcd', name: 'BCD WTS', sector: 'Travel', country: 'Switzerland', channels: ['Email automation', 'Agent assist'], voice: false, outcome: 'Email response automation and agent assist for travel desks.', url: 'https://www.enterprisebot.ai/case_study/bcd-wts', origin: 'eb', reviewBeforeLaunch: RECHECK },
]

/** Feedyou headline and customer names as published on feedyou.ai (observed 7 Nov 2026). Gated like the stories. */
export const feedyouProof: Claim & { headline: string; names: string[] } = {
  id: 'feedyou-proof',
  headline: '120+ customers and 300+ solutions over nine years in Central and Eastern Europe',
  names: ['MONETA Money Bank', 'Toyota', 'Škoda', 'DHL', 'DB Schenker', 'Tesco Mobile', 'Česká pošta', 'REWE Group', 'Dr.Max', 'Foxconn'],
  status: 'published-public',
  source: 'feedyou.ai homepage: headline numbers and customer logo wall',
  sourceUrl: 'https://feedyou.ai/',
  observed: OBSERVED,
  reviewBeforeLaunch: FY_CHECK,
}

/**
 * Logo wall. Files in public/logos/, copied from the logo strips on
 * enterprisebot.ai and feedyou.ai (observed 7 Nov 2026). Entries with
 * approved: false are customers confirmed in internal records but not yet shown
 * publicly; they stay hidden until marketing confirms permission and supplies a logo file.
 */
export interface Logo {
  name: string
  file?: string
  origin: 'eb' | 'feedyou'
  approved: boolean
}

export const logoWall: Claim & { logos: Logo[] } = {
  id: 'logo-wall',
  status: 'published-public',
  source: 'Logo strips on enterprisebot.ai homepage and feedyou.ai homepage; pending entries from internal account records (Slack, Notion, Oct–Nov 2026)',
  sourceUrl: PUBLIC_SITE,
  observed: OBSERVED,
  reviewBeforeLaunch:
    'Confirm logo permission per customer (including Feedyou customers). Pending: AXA, AXA Direct Assurance, WWZ, badenova, GWR, flydubai (signed 6 Nov 2026, not live) — need written permission and logo files. Avanti West Coast and Dubai Airports logos are already public on enterprisebot.ai (About page and logo row). TransPennine Express contract ends 18 Nov 2026: decide whether to keep it as a past reference.',
  logos: [
    { name: 'Generali', file: 'generali.png', origin: 'eb', approved: true },
    { name: 'Swisscom', file: 'swisscom.png', origin: 'eb', approved: true },
    { name: 'SIX', file: 'six.png', origin: 'eb', approved: true },
    { name: 'SWICA', file: 'swica.png', origin: 'eb', approved: true },
    { name: 'Callpoint', file: 'callpoint.png', origin: 'eb', approved: true },
    { name: 'Kantonsspital Winterthur', file: 'ksw.png', origin: 'eb', approved: true },
    { name: 'TransPennine Express', file: 'transpennine-express.png', origin: 'eb', approved: true },
    { name: 'Comboios de Portugal', file: 'comboios-de-portugal.png', origin: 'eb', approved: true },
    { name: 'RMV', file: 'rmv.png', origin: 'eb', approved: true },
    { name: 'LNER', file: 'lner.svg', origin: 'eb', approved: true },
    { name: 'Avanti West Coast', file: 'avanti-west-coast.svg', origin: 'eb', approved: true },
    { name: 'Dubai Airports', file: 'dubai-airports.png', origin: 'eb', approved: true },
    { name: 'Yuh', file: 'yuh.png', origin: 'eb', approved: true },
    { name: 'BCD Travel WTS', file: 'wts.png', origin: 'eb', approved: true },
    { name: 'AXA', origin: 'eb', approved: false },
    { name: 'AXA Direct Assurance', origin: 'eb', approved: false },
    { name: 'WWZ', origin: 'eb', approved: false },
    { name: 'badenova', origin: 'eb', approved: false },
    { name: 'GWR', origin: 'eb', approved: false },
    { name: 'flydubai', origin: 'eb', approved: false },
    { name: 'MONETA Money Bank', file: 'moneta-money-bank.png', origin: 'feedyou', approved: true },
    { name: 'Toyota', file: 'toyota.png', origin: 'feedyou', approved: true },
    { name: 'Škoda', file: 'skoda.png', origin: 'feedyou', approved: true },
    { name: 'DHL', file: 'dhl.png', origin: 'feedyou', approved: true },
    { name: 'DB Schenker', file: 'db-schenker.png', origin: 'feedyou', approved: true },
    { name: 'Tesco Mobile', file: 'tesco-mobile.png', origin: 'feedyou', approved: true },
    { name: 'Foxconn', file: 'foxconn.png', origin: 'feedyou', approved: true },
    { name: 'REWE Group', file: 'rewe-group.png', origin: 'feedyou', approved: true },
    { name: 'Continental', file: 'continental.png', origin: 'feedyou', approved: true },
    { name: 'Panasonic Automotive', file: 'panasonic-automotive.png', origin: 'feedyou', approved: true },
    { name: 'Česká pošta', file: 'ceska-posta.png', origin: 'feedyou', approved: true },
    { name: 'Skupina ČEZ', file: 'skupina-cez.png', origin: 'feedyou', approved: true },
    { name: 'Dr.Max', file: 'dr-max-group.png', origin: 'feedyou', approved: true },
    { name: 'Alza.cz', file: 'alza-cz.png', origin: 'feedyou', approved: true },
    { name: 'PENNY', file: 'penny.png', origin: 'feedyou', approved: true },
    { name: 'Kantar', file: 'kantar.png', origin: 'feedyou', approved: true },
    { name: 'Pluxee', file: 'pluxee.png', origin: 'feedyou', approved: true },
    { name: 'Metrostav', file: 'metrostav.png', origin: 'feedyou', approved: true },
  ],
}
