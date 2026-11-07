/**
 * Industry pages. Proof comes only from customerStories in claims.ts (published
 * case studies). Workloads describe the kind of request, not a claim about a
 * named customer's deployment.
 */
import { stats } from './claims'
import type { Segment } from './site'

export interface Industry {
  slug: string
  name: string
  navLine: string
  title: Segment[]
  intro: string
  workloads: { t: string; b: string }[]
  matters: { t: string; b: string }[]
  stories: string[]
  proofTitle?: string
  proofLine: string
  products: string[]
  faq: { q: string; a: string }[]
}

export const industries: Industry[] = [
  {
    slug: 'insurance',
    name: 'Insurance and health insurance',
    navLine: 'Claims, policy and routing calls, in the languages configured for your lines.',
    proofLine: 'Generali Switzerland · a Swiss health insurer on Genesys · SWICA',
    title: ['Voice AI for ', { hl: 'insurance contact centers.' }],
    intro:
      'Answer and route claims, policy and billing calls, act in your core systems within your rules, and score eligible conversations against your QA scorecard.',
    workloads: [
      { t: 'Call routing by intent', b: 'Callers say why they are calling and reach the right team without a menu tree, inside your existing contact-center platform.' },
      { t: 'Claim status and next steps', b: 'Status from your claims system after identity checks, with a handover when a person must decide.' },
      { t: 'Policy and address changes', b: 'Routine changes done in your systems within the limits you set, confirmed back to the caller.' },
      { t: 'Bank-detail changes on open claims', b: 'Verified and done within your approval limits, with a handover when the amount needs sign-off.' },
    ],
    matters: [
      { t: 'Regulated conversations', b: 'Quality assessment checks every eligible call against your scripts and process steps, with evidence.' },
      { t: 'Multilingual markets', b: 'Swiss German, German, French and Italian on the same line, with your insurance terms added to recognition and tested on your call audio.' },
      { t: 'Data stays where you need it', b: 'Managed cloud in your region, private cloud or on-premises, with PII masking before data reaches a model.' },
    ],
    stories: ['generali', 'swiss-health', 'swica'],
    products: ['/platform/voice-agent', '/platform/quality-assessment', '/platform/live-translate', '/integrations/genesys'],
    faq: [
      { q: 'Can the voice agent route calls without replacing our IVR platform?', a: 'Yes. At a Swiss health insurer, calls stay in Genesys; Enterprise Bot classifies the caller’s request and routes the call back to the right team.' },
      { q: 'How do you handle sensitive health or claims data?', a: 'Choose where data is processed and stored, mask PII before it reaches a model, and keep sensitive topics with your agents through handover rules.' },
    ],
  },
  {
    slug: 'banking',
    name: 'Banking and financial services',
    navLine: 'Secure service lines with identity checks and full audit trails.',
    proofLine: 'MONETA Money Bank (Feedyou) · SIX · Yuh',
    title: ['Voice AI for ', { hl: 'banking service lines.' }],
    intro:
      'Handle routine banking calls and emails with identity checks before any account detail, actions within your limits, and a record of every step.',
    workloads: [
      { t: 'Identify and route', b: 'Verify the caller, understand the request and route it, with the context passed to the agent.' },
      { t: 'Account and card questions', b: 'Answers from approved knowledge and your systems, after identity checks you define.' },
      { t: 'Password and access resets', b: 'Self-service resets over the phone, with the steps your security team approves.' },
      { t: 'Email triage', b: 'Classify, extract and draft replies to service emails, with approval where you need it.' },
    ],
    matters: [
      { t: 'On-premises, with identity checks first', b: 'On-premises or private cloud, with identity checks before any account detail, SSO, role-based access and an exportable audit trail.' },
      { t: 'Controlled AI', b: 'Grounded answers, guardrails and approval limits, so a person signs off where you need one.' },
      { t: 'Measured, not promised', b: 'A pilot on one workload against your own baseline before rollout.' },
    ],
    stories: ['moneta', 'six', 'yuh'],
    products: ['/platform/voice-agent', '/platform/email-agent', '/platform/quality-assessment', '/security'],
    faq: [
      { q: 'Can it run inside our own infrastructure?', a: 'Yes. On-premises deployment on your Kubernetes with self-hosted or private-endpoint models is an option; we confirm which components run on-premises for your setup during scoping.' },
      { q: 'Does it work with Genesys?', a: 'Yes. Enterprise Bot connects to Genesys Cloud, and the MONETA Money Bank voicebot, built by Feedyou, an Enterprise Bot company, runs on Genesys.' },
    ],
  },
  {
    slug: 'transport',
    name: 'Rail, transport and travel',
    navLine: 'Delays, tickets and refunds, answered from live data at peak.',
    proofLine: 'TransPennine Express · LNER · RMV · Comboios de Portugal',
    title: ['AI for rail and travel, ', { hl: 'at peak demand.' }],
    intro:
      'Answer delay, ticket and refund questions from live data on chat, WhatsApp and voice, in the languages your passengers use, and hand over when a person is needed.',
    workloads: [
      { t: 'Delays and disruption', b: 'Answers from live departure and disruption feeds, not a static FAQ.' },
      { t: 'Tickets and refunds', b: 'Ticket questions and refund requests handled with your sales and refund systems.' },
      { t: 'Multilingual passengers', b: 'Answers in the passenger’s language, configured per deployment.' },
      { t: 'Travel management', b: 'Email triage and agent assist for travel desks handling bookings and changes.' },
    ],
    matters: [
      { t: 'Peaks you cannot staff for', b: 'Disruption days bring spikes; automation absorbs routine questions so agents handle the hard ones.' },
      { t: 'Channels passengers use', b: 'Web chat, WhatsApp and voice from one platform, with the same knowledge and rules.' },
      { t: 'Insight after the rush', b: 'Conversation analytics shows why passengers got in touch and where the bot handed over.' },
    ],
    stories: ['comboios', 'tpe', 'rmv', 'bcd'],
    products: ['/platform/chat-agent', '/platform/voice-agent', '/platform/conversation-analytics', '/platform/email-agent'],
    faq: [
      { q: 'Can the AI use live train data?', a: 'Yes. TransPennine Express’s chatbot is integrated with the Darwin real-time departure and disruption feed, according to its published case study.' },
      { q: 'Which channels are supported?', a: 'Web chat, WhatsApp, email and voice, from one platform with shared knowledge and rules.' },
    ],
  },
  {
    slug: 'contact-center-providers',
    name: 'Contact-center providers (BPO)',
    navLine: 'Faster agent ramp-up and quality scoring across client processes.',
    proofLine: 'Callpoint AG: published agent-assist results',
    proofTitle: 'Published by a contact-center provider',
    title: ['AI for ', { hl: 'contact-center providers.' }],
    intro:
      'Help agents across many client processes with real-time assist and knowledge, score eligible calls against each client’s scorecard, and add voice AI to your client lines.',
    workloads: [
      { t: 'Agent assist across clients', b: 'Knowledge and next steps per client process, inside the tools your agents already use.' },
      { t: 'Faster onboarding', b: 'New agents get answers in the moment instead of months of ramp-up.' },
      { t: 'QA at scale', b: 'Score eligible conversations against each client’s scorecard, with evidence and coaching notes.' },
      { t: 'Voice AI for client lines', b: 'Automated first-line handling on your clients’ telephony, configured per client process.' },
    ],
    matters: [
      { t: 'Many processes, one platform', b: 'Separate knowledge, rules and scorecards per client, with role-based access.' },
      { t: 'Proof for your clients', b: 'Quality results and conversation analytics you can report to each client.' },
      { t: 'Languages your clients need', b: 'Multilingual service lines, configured and tested per deployment.' },
    ],
    stories: ['callpoint'],
    products: ['/platform/agent-assist', '/platform/quality-assessment', '/platform/conversation-analytics', '/platform/voice-agent'],
    faq: [
      { q: 'Can we keep each client’s data and scorecards separate?', a: 'Yes. Knowledge, rules, scorecards and access are configured per client process.' },
      { q: 'What result has a contact-center provider published?', a: `Callpoint AG published ${stats.callpointTraining.value} ${stats.callpointTraining.label} with Enterprise Bot agent assist.` },
    ],
  },
]

export const industryBySlug = (slug: string) => industries.find((i) => i.slug === slug)
