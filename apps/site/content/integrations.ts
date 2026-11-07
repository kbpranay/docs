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
  flow: { method: string; action: string }
  scope: string
  faq: { q: string; a: string }[]
  /** Optional published proof on this platform (key in claims.ts stats). */
  proof?: 'swissHealthRouting'
}

export const integrations: Integration[] = [
  {
    slug: 'genesys',
    proof: 'swissHealthRouting',
    flow: { method: 'AudioHook or SIP', action: 'Account updated in your CRM' },
    name: 'Genesys Cloud',
    navLine: 'Keep Genesys. Add voice AI and QA; live translation in early access.',
    title: ['Keep Genesys. ', { hl: 'Add the AI layer.' }],
    intro:
      'Genesys stays the backbone for routing, workforce management, reporting and the agent desktop. Enterprise Bot sits on top as the AI layer, so you add value without replacing the platform you already run.',
    keep: ['Routing, queues and IVR flows', 'Workforce engagement and reporting', 'The Genesys agent desktop', 'Your numbers and carriers'],
    add: [
      { title: 'Voice AI agents', body: 'AI agents that resolve routine calls in front of your Genesys queues and hand the rest over with a summary.' },
      { title: 'Quality assessment', body: 'Evaluate eligible conversations against your QA scorecard instead of a small manual sample.' },
      { title: 'Live translation', body: 'Customers and agents speak different languages on the same call, with real-time translation (early access).' },
      { title: 'Agent assist beyond Genesys', body: 'AI help inside the apps your agents use, such as Salesforce, while Genesys carries the call.' },
      { title: 'Transcription for your vocabulary', body: 'Speech recognition chosen per language, including Swiss German, with your specialised terms added and tested.' },
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
    scope: 'Listed on the Genesys AppFoundry. Supported scope is confirmed per deployment for Genesys Cloud.',
    faq: [
      { q: 'Does this replace Genesys AI?', a: 'You choose. Many teams keep Genesys for routing and the desktop and use Enterprise Bot where they need more: languages, QA depth, private deployment or workflows across systems.' },
      { q: 'Does our data leave Genesys?', a: 'With audio streaming, the audio record remains in Genesys. What Enterprise Bot stores, and where, follows the deployment you choose.' },
      { q: 'How do we evaluate it?', a: 'Pick one call type. We connect to a Genesys test setup and compare against your current baseline.' },
    ],
  },
  {
    slug: 'microsoft-teams',
    flow: { method: 'Luware Nimbus', action: 'Answer found · request resolved' },
    name: 'Microsoft Teams',
    navLine: 'Voice AI and agent assist for Teams contact centers, via Luware Nimbus.',
    title: ['Voice AI for ', { hl: 'Teams contact centers.' }],
    intro:
      'For contact centers that run on Microsoft Teams with Luware Nimbus, Enterprise Bot adds AI voice agents, agent assist and wrap-up automation alongside your Nimbus routing.',
    keep: ['Microsoft Teams as the agent workspace', 'Luware Nimbus routing and queues', 'Your Microsoft tenant and identity'],
    add: [
      { title: 'AI voice agents', body: 'Answer and resolve routine calls before they reach a Nimbus queue.' },
      { title: 'Live transcription and agent assist', body: 'Suggestions and summaries for agents during Teams calls.' },
      { title: 'Quality assessment', body: 'Score conversations against your QA scorecard, with coaching notes.' },
    ],
    connect: [
      { title: 'Luware Nimbus', body: 'Enterprise Bot connects as a virtual user in Nimbus for AI handling and transcription.' },
      { title: 'Native Teams', body: 'A direct Teams integration without Nimbus is in development. Ask us about its status.' },
    ],
    handover: 'Transfers to the right Nimbus queue with the conversation summary, so the agent in Teams starts with the context.',
    scope: 'Integration through Luware Nimbus; scope is confirmed per deployment and Nimbus version.',
    faq: [
      { q: 'Do we need Luware Nimbus?', a: 'Today the integration runs through Nimbus. A direct Teams integration is in development; ask us about timing.' },
      { q: 'Where are transcripts stored?', a: 'That follows the deployment you choose; we document the data flow component by component during scoping.' },
    ],
  },
  {
    slug: 'cisco',
    flow: { method: 'SIP or media stream', action: 'Status checked in your system' },
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
      { title: 'Media streams', body: 'Audio from the Cisco contact center streamed to Enterprise Bot; the method depends on product and version.' },
      { title: 'SIP', body: 'Standard SIP integration for AI voice agents in front of your queues.' },
    ],
    handover: 'Transfers back into your Cisco queues with context for the agent.',
    scope: 'Cisco UCCX integration is built; UCCE support is planned. Other Cisco products are assessed during scoping.',
    faq: [
      { q: 'Which Cisco versions are supported?', a: 'It depends on the product and version. UCCX is built and UCCE is planned; we confirm the path for your environment before you commit.' },
      { q: 'Can everything run on-premises?', a: 'The AI components can run in your environment; we agree which models and speech components run where.' },
    ],
  },
  {
    slug: 'vier',
    flow: { method: 'Call forwarding', action: 'Appointment moved in your system' },
    name: 'VIER',
    navLine: 'Keep VIER telephony; add Enterprise Bot voice AI.',
    title: ['Keep VIER. ', { hl: 'Add voice AI.' }],
    intro:
      'If your contact center runs on VIER, keep your numbers and call routing and add Enterprise Bot voice agents, with transcripts and quality assessment for the calls they handle.',
    keep: ['VIER telephony and numbers', 'Your call routing'],
    add: [
      { title: 'Voice AI agents', body: 'Resolve routine calls and hand over the rest with a summary.' },
      { title: 'Transcription and QA', body: 'Transcripts and scorecard evaluations for calls handled by the Voice Agent.' },
    ],
    connect: [{ title: 'Call forwarding', body: 'Calls are forwarded from VIER to the Enterprise Bot voice agent and back to your agents.' }],
    handover: 'Transfers back to your VIER routing with context.',
    scope: 'Connected through call forwarding from your VIER setup; other integration paths are assessed during scoping.',
    faq: [
      { q: 'Do we have to change numbers?', a: 'No. Calls are forwarded from your existing VIER setup.' },
      { q: 'What happens when the AI cannot help?', a: 'The call goes back to your VIER routing with the context of the conversation, so the agent does not start from zero.' },
      { q: 'Can we start with one call type?', a: 'Yes. Forward one number or call type first, measure it against your baseline, then widen.' },
    ],
  },
  {
    slug: 'sip-audiocodes',
    flow: { method: 'SIP · AudioCodes', action: 'Request completed via your API' },
    name: 'SIP and AudioCodes',
    navLine: 'Your carrier or SBC: SIP, WebRTC and AudioCodes VoiceAI Connect.',
    title: ['Your carrier. Your SBC. ', { hl: 'Our voice AI.' }],
    intro:
      'Connect Enterprise Bot to the telephony you already have: SIP trunks, session border controllers and AudioCodes VoiceAI Connect, in the cloud or on-premises.',
    keep: ['Your carriers and numbers', 'Your session border controllers'],
    add: [
      { title: 'Voice AI agents', body: 'Inbound calls answered by the Voice Agent.' },
      { title: 'Agent assist on live calls', body: 'Media streams on human-handled calls for transcription and suggestions, where your platform supports them.' },
    ],
    connect: [
      { title: 'SIP / WebRTC', body: 'Bring your own SBC or carrier.' },
      { title: 'AudioCodes VoiceAI Connect', body: 'Point AudioCodes at your Enterprise Bot voice endpoint; cloud or on-premises.' },
    ],
    handover: 'Transfers to your queues or numbers with context passed in SIP headers where supported.',
    scope: 'Codec, SBC and carrier specifics are confirmed during setup.',
    faq: [
      { q: 'Do we need AudioCodes?', a: 'No. Standard SIP carriers and SBCs can connect; codec, SBC and carrier specifics are confirmed during setup. AudioCodes VoiceAI Connect is one live option.' },
      { q: 'Can we keep our carrier and numbers?', a: 'Yes. Calls reach the Voice Agent over SIP from your existing carrier or session border controller.' },
      { q: 'How are calls handed to agents?', a: 'Over SIP to the queue or number you choose, with a summary of the conversation passed along where your platform supports it.' },
    ],
  },
]

export const integrationBySlug = (slug: string) => integrations.find((i) => i.slug === slug)
