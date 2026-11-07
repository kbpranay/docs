/**
 * Partner integration pages. Positioning: Enterprise Bot is the AI layer you
 * add to the contact center you already run — not a replacement.
 * Status and scope are registered in claims.ts (integrationStatus) and must be
 * confirmed by product before launch. No customer names.
 */
import type { Segment } from './site'

export interface Integration {
  slug: string
  name: string
  navLine: string
  title: Segment[]
  intro: string
  keep: string[]
  add: { title: string; body: string }[]
  connect: { title: string; body: string }[]
  handover: string
  scope: string
  faq: { q: string; a: string }[]
}

export const integrations: Integration[] = [
  {
    slug: 'genesys',
    name: 'Genesys Cloud',
    navLine: 'Keep Genesys. Add voice AI, QA and live translation.',
    title: ['Keep Genesys. ', { hl: 'Add the AI layer.' }],
    intro:
      'Genesys stays the backbone for routing, workforce management, reporting and the agent desktop. Enterprise Bot sits on top as the AI layer, so you add value without replacing the platform you already run.',
    keep: ['Routing, queues and IVR flows', 'Workforce engagement and reporting', 'The Genesys agent desktop', 'Your numbers and carriers'],
    add: [
      { title: 'Voice AI agents', body: 'AI agents that resolve routine calls in front of your Genesys queues and hand the rest over with a summary.' },
      { title: 'Quality assessment', body: 'Evaluate eligible conversations against your QA scorecard instead of a small manual sample.' },
      { title: 'Live translation', body: 'Customers and agents speak different languages on the same call, with real-time translation (early access).' },
      { title: 'Agent assist beyond Genesys', body: 'AI help inside the apps your agents use, such as Salesforce, while Genesys carries the call.' },
      { title: 'Transcription for your vocabulary', body: 'Speech recognition tuned for dialects such as Swiss German and for specialised terms.' },
      { title: 'Your models, your infrastructure', body: 'Private cloud or on-premises deployment with the language models you prefer.' },
      { title: 'Email that completes the work', body: 'Process unstructured emails and attachments and complete workflows in connected systems.' },
      { title: 'Run costs you can check', body: 'We model AI run costs against your actual volumes and pricing before you decide.' },
    ],
    connect: [
      { title: 'Audio streaming', body: 'Genesys AudioHook or Audio Connector streams the call to Enterprise Bot; the audio record stays in Genesys.' },
      { title: 'SIP', body: 'Calls reach Enterprise Bot over SIP and transfer back to Genesys with a SIP header carrying context.' },
      { title: 'Data back into Genesys', body: 'The summary and transcript are written back so agents and reporting see what the AI did.' },
    ],
    handover: 'Transfers into your existing Genesys queues with the summary and transcript attached, so the agent does not ask the customer to repeat themselves.',
    scope: 'Listed on the Genesys AppFoundry. Supported scope is confirmed per deployment (Genesys Cloud; Genesys Engage on request).',
    faq: [
      { q: 'Does this replace Genesys AI?', a: 'You choose. Many teams keep Genesys for routing and the desktop and use Enterprise Bot where they need more: languages, QA depth, private deployment or workflows across systems.' },
      { q: 'Does our data leave Genesys?', a: 'With audio streaming, the audio record remains in Genesys. What Enterprise Bot stores, and where, follows the deployment you choose.' },
      { q: 'How do we evaluate it?', a: 'Pick one call type. We connect to a Genesys test setup and compare against your current baseline.' },
    ],
  },
  {
    slug: 'microsoft-teams',
    name: 'Microsoft Teams',
    navLine: 'Voice AI and agent assist inside Teams, via Luware Nimbus.',
    title: ['Voice AI for ', { hl: 'Teams contact centers.' }],
    intro:
      'For contact centers that run on Microsoft Teams with Luware Nimbus, Enterprise Bot adds AI voice agents, agent assist and wrap-up automation while conversations stay inside your Microsoft environment.',
    keep: ['Microsoft Teams as the agent workspace', 'Luware Nimbus routing and queues', 'Your Microsoft tenant and identity'],
    add: [
      { title: 'AI voice agents', body: 'Answer and resolve routine calls before they reach a Nimbus queue.' },
      { title: 'Live transcription and agent assist', body: 'Suggestions and summaries for agents during Teams calls.' },
      { title: 'Quality assessment', body: 'Score conversations against your QA scorecard, with coaching notes.' },
    ],
    connect: [
      { title: 'Luware Nimbus', body: 'Enterprise Bot connects as a virtual user in Nimbus for AI handling and transcription.' },
      { title: 'Native Teams', body: 'A direct Teams integration without Nimbus is available on request; ask us about current availability.' },
    ],
    handover: 'Transfers to the right Nimbus queue with the conversation summary, so the agent in Teams starts with the context.',
    scope: 'Scope is confirmed per deployment and Nimbus version.',
    faq: [
      { q: 'Do we need Luware Nimbus?', a: 'Today the integration runs through Nimbus. If you use Teams without Nimbus, talk to us about the direct integration.' },
      { q: 'Where are transcripts stored?', a: 'That follows the deployment you choose; we document the data flow component by component during scoping.' },
    ],
  },
  {
    slug: 'cisco',
    name: 'Cisco',
    navLine: 'On-premises, multilingual AI for Cisco contact centers.',
    title: ['AI close to your ', { hl: 'Cisco infrastructure.' }],
    intro:
      'For Cisco contact centers with strict deployment and language requirements: voice AI, agent assist and quality assessment that can run on-premises or in your private cloud.',
    keep: ['Cisco routing and agent desktop', 'Your telephony and numbers', 'Your data center or private cloud'],
    add: [
      { title: 'On-premises or private cloud', body: 'Run the AI components inside your infrastructure, with the models you choose.' },
      { title: 'Multilingual voice', body: 'Voice agents in the languages configured and tested for your markets.' },
      { title: 'Agent assist and QA', body: 'Live transcription, suggestions and conversation scoring for your agents.' },
    ],
    connect: [
      { title: 'Media streams', body: 'Audio from the Cisco contact center streamed to the Enterprise Bot media gateway (WebSocket or gRPC, by version).' },
      { title: 'SIP', body: 'Standard SIP integration for AI voice agents in front of your queues.' },
    ],
    handover: 'Transfers back into your Cisco queues with context for the agent.',
    scope: 'Supported Cisco products and versions (for example UCCX, UCCE/PCCE, Webex Contact Center) are confirmed during scoping.',
    faq: [
      { q: 'Which Cisco versions are supported?', a: 'It depends on the product and version. We confirm the integration path for your environment before you commit.' },
      { q: 'Can everything run on-premises?', a: 'The AI components can run on Kubernetes in your environment; we agree which models and speech components run where.' },
    ],
  },
  {
    slug: 'vier',
    name: 'VIER',
    navLine: 'Keep VIER telephony; add Enterprise Bot voice AI.',
    title: ['Keep VIER. ', { hl: 'Add voice AI.' }],
    intro:
      'If your contact center runs on VIER, keep your numbers and call routing and add Enterprise Bot voice agents, transcription and quality assessment.',
    keep: ['VIER telephony and numbers', 'Your call routing'],
    add: [
      { title: 'Voice AI agents', body: 'Resolve routine calls and hand over the rest with a summary.' },
      { title: 'Transcription and QA', body: 'Transcripts and scorecard evaluations for your conversations.' },
    ],
    connect: [{ title: 'Call forwarding or SIP', body: 'Calls are forwarded from VIER to the Enterprise Bot voice agent and back to your agents.' }],
    handover: 'Transfers back to your VIER routing with context.',
    scope: 'Integration path confirmed during scoping.',
    faq: [{ q: 'Do we have to change numbers?', a: 'No. Calls are forwarded from your existing VIER setup.' }],
  },
  {
    slug: 'sip-audiocodes',
    name: 'SIP and AudioCodes',
    navLine: 'Any carrier or SBC: SIP, SIPREC, AudioCodes VoiceAI Connect.',
    title: ['Your carrier. Your SBC. ', { hl: 'Our voice AI.' }],
    intro:
      'Connect Enterprise Bot to the telephony you already have: SIP trunks, session border controllers and AudioCodes VoiceAI Connect, in the cloud or on-premises.',
    keep: ['Your carriers and numbers', 'Your session border controllers'],
    add: [
      { title: 'Voice AI agents', body: 'Inbound calls answered by the Voice Agent.' },
      { title: 'Agent assist on live calls', body: 'Calls streamed via SIPREC or a media stream for transcription and suggestions.' },
    ],
    connect: [
      { title: 'SIP / WebRTC', body: 'Bring your own SBC or carrier.' },
      { title: 'AudioCodes VoiceAI Connect', body: 'Point AudioCodes at your Enterprise Bot voice endpoint; cloud or on-premises.' },
      { title: 'SIPREC', body: 'Recording-based streaming for agent assist and QA on human-handled calls.' },
    ],
    handover: 'Transfers to your queues or numbers with context passed in SIP headers where supported.',
    scope: 'Codec, SBC and carrier specifics are confirmed during setup.',
    faq: [{ q: 'Do we need AudioCodes?', a: 'No. Any SIP-capable carrier or SBC works; AudioCodes is one supported option.' }],
  },
]

export const integrationBySlug = (slug: string) => integrations.find((i) => i.slug === slug)
