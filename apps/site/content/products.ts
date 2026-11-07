import type { IconName } from '@/components/OutlineIcon'
import type { Segment } from './site'
import { quotes, stats, type QuoteClaim, type StatClaim } from './claims'

/**
 * Product pages share one template:
 * buyer problem → visible workflow → capabilities → fit → proof → FAQ → next step.
 *
 * Capability statements here are draft copy for product sign-off. They are
 * grounded in the AIDA help center and the Notion website masterplan, and
 * deliberately avoid numbers that are not in the claims register.
 */

export interface Product {
  slug: string
  name: string
  short: string
  navLine: string
  icon: IconName
  title: Segment[]
  intro: string
  problem: { title: string; body: string; points: string[] }
  workflow: { title: string; body: string }[]
  capabilities: { icon: IconName; title: string; body: string }[]
  fit: { integrations: string[]; deployment: string }
  proof?: { stats: StatClaim[]; quote?: QuoteClaim }
  faq: { q: string; a: string }[]
  /** Lines for the product hero visual. */
  visual: { channel: string; lines: { who: 'customer' | 'agent' | 'system'; text: string }[] }
}

const deploymentLine =
  'Cloud, private cloud or on-premises, depending on the components and data flows your security team approves.'

export const products: Product[] = [
  {
    slug: 'voice-agent',
    icon: 'phone',
    name: 'Voice Agent',
    short: 'Voice',
    navLine: 'Answers and resolves inbound calls',
    title: ['Answer at once. ', { hl: 'Finish the routine requests.' }],
    intro:
      'An AI voice agent for your inbound lines. It understands the caller, finds the answer in your approved knowledge, completes permitted actions in your systems and hands over to a person, with the context, when it should.',
    problem: {
      title: 'Most calls are routine. They still wait in the queue.',
      body: 'Address changes, status checks, appointment moves and misrouted calls take agent time that customers spend waiting. Menu trees push the routing work onto the caller.',
      points: [
        'Callers repeat themselves after every transfer',
        'Routine requests compete with complex cases for the same agents',
        'Peaks force a choice between long waits and overstaffing',
      ],
    },
    workflow: [
      { title: 'Understand', body: 'Natural speech instead of menu trees. The agent works out what the caller needs, in their own words.' },
      { title: 'Verify', body: 'Checks identity against the rules you define before anything sensitive happens.' },
      { title: 'Ground', body: 'Answers from your approved knowledge sources and records which source it used.' },
      { title: 'Act', body: 'Completes permitted actions through your APIs: update details, book, check a status.' },
      { title: 'Resolve or hand over', body: 'Ends the call resolved, or transfers to the right queue with a written summary.' },
    ],
    capabilities: [
      { icon: 'route', title: 'Routing by intent', body: 'Callers say what they need; the agent routes on meaning, not on which key they pressed.' },
      { icon: 'turns', title: 'Natural turn-taking', body: 'Designed for real conversations: callers can interrupt, correct themselves or change topic.' },
      { icon: 'globe', title: 'Multilingual voice', body: 'Replies in the caller’s language, within the languages configured for your deployment.' },
      { icon: 'plug', title: 'Telephony fit', body: 'Connects to your telephony through SIP and session border controllers such as AudioCodes.' },
      { icon: 'handover', title: 'Warm handover', body: 'Transfers into your existing queues with a summary the agent sees before saying hello.' },
      { icon: 'summary', title: 'Call summaries', body: 'Each call can end with a structured summary written back to your CRM.' },
    ],
    fit: {
      integrations: ['Genesys Cloud and Cisco contact centers', 'Salesforce and other CRMs via API', 'SIP and AudioCodes telephony'],
      deployment: deploymentLine,
    },
    proof: { stats: [stats.generaliComprehension, stats.generaliMisrouted], quote: quotes.generali },
    faq: [
      { q: 'Does it replace our IVR or sit behind it?', a: 'Either. Many teams start behind an existing entry point with one workload, then extend once the results are measured.' },
      { q: 'What happens when the agent is unsure?', a: 'It asks a clarifying question or transfers to a person with the conversation summary. You set the thresholds and the destination queues.' },
      { q: 'Which languages and dialects are supported?', a: 'That depends on the speech and language components configured for your deployment. We test your languages and dialects with your own scenarios during the evaluation.' },
      { q: 'How long does a rollout take?', a: 'It depends on the integrations and workloads you choose. We scope one workload with you first and agree the acceptance criteria before building.' },
    ],
    visual: {
      channel: 'Inbound call',
      lines: [
        { who: 'customer', text: 'I need to move my appointment to next week.' },
        { who: 'system', text: 'Booking system · 3 slots found' },
        { who: 'agent', text: 'I can offer Tuesday at 10:00 or Thursday at 14:30.' },
        { who: 'system', text: 'Appointment moved · confirmation sent' },
      ],
    },
  },
  {
    slug: 'email-agent',
    icon: 'mail',
    name: 'Email Agent',
    short: 'Email',
    navLine: 'Reads, routes and resolves email',
    title: ['Clear the inbox. ', { hl: 'Keep the judgment.' }],
    intro:
      'Reads every incoming email and attachment, separates each request, drafts or sends the reply and completes routine updates. Exceptions go to your team with the case already prepared.',
    problem: {
      title: 'Email queues hide work.',
      body: 'One message can contain three requests, a scanned form and a missing policy number. Manual triage turns that into hours of reading before anyone acts.',
      points: [
        'Multi-request emails are handled one request at a time',
        'Attachments are re-typed by hand',
        'Backlogs grow after every peak and take days to clear',
      ],
    },
    workflow: [
      { title: 'Read', body: 'Reads the message and its attachments, including forms and scanned documents.' },
      { title: 'Separate', body: 'Splits one email into the individual requests it contains.' },
      { title: 'Ground', body: 'Checks each request against your knowledge sources and business rules.' },
      { title: 'Act', body: 'Completes permitted updates in your systems and records what changed.' },
      { title: 'Reply or route', body: 'Sends or drafts the reply, or routes the case to a person with a prepared summary.' },
    ],
    capabilities: [
      { icon: 'layers', title: 'Multi-request triage', body: 'Each request in an email gets its own classification, owner and outcome.' },
      { icon: 'clip', title: 'Attachment extraction', body: 'Pulls structured fields from forms and documents so nobody re-types them.' },
      { icon: 'question', title: 'Missing information', body: 'Asks the sender for exactly what is missing instead of parking the case.' },
      { icon: 'shield', title: 'Your approval rules', body: 'Set each request type to send automatically, draft for approval or route only.' },
      { icon: 'route', title: 'Routing with context', body: 'Cases reach the right team with the summary, extracted data and suggested reply.' },
      { icon: 'log', title: 'Audit trail', body: 'Every action and reply is logged against the original message.' },
    ],
    fit: {
      integrations: ['Shared mailboxes and ticketing systems', 'CRM and case management via API', 'Document and policy systems'],
      deployment: deploymentLine,
    },
    faq: [
      { q: 'Can it send replies without a person checking?', a: 'Only where you allow it. Each request type can be set to automatic, draft-for-approval or route-only, and you can change that at any time.' },
      { q: 'Which attachments can it read?', a: 'Common document and image formats. Extraction quality depends on the documents, so we test with your real, anonymised samples during the evaluation.' },
      { q: 'Does it work with our ticketing system?', a: 'We connect through APIs. We confirm the exact integration scope for your system before you commit.' },
    ],
    visual: {
      channel: 'Incoming email',
      lines: [
        { who: 'customer', text: 'New address attached. Also, where is my refund?' },
        { who: 'system', text: '2 requests found · 1 attachment read' },
        { who: 'system', text: 'Address updated · refund status: approved' },
        { who: 'agent', text: 'Reply sent with both answers' },
      ],
    },
  },
  {
    slug: 'chat-agent',
    icon: 'chat',
    name: 'Chat Agent',
    short: 'Chat',
    navLine: 'Web, app and WhatsApp conversations',
    title: ['Answer in the moment. ', { hl: 'Act on it too.' }],
    intro:
      'AI chat for your website, app and WhatsApp. It answers from your knowledge, completes requests in your systems and hands over to live agents without losing the thread.',
    problem: {
      title: 'Chatbots that only answer FAQs create more contacts.',
      body: 'When a bot can explain a process but cannot complete it, customers leave the chat and call. The handover to a person then starts from zero.',
      points: [
        'Customers switch to the phone when the bot cannot act',
        'Live agents re-ask what the bot already collected',
        'Separate bots per channel drift apart',
      ],
    },
    workflow: [
      { title: 'Understand', body: 'Recognises the request in free text, in the customer’s language.' },
      { title: 'Ground', body: 'Answers from approved sources, and is set up to say when it cannot find an answer.' },
      { title: 'Act', body: 'Runs permitted actions through your systems inside the chat.' },
      { title: 'Hand over', body: 'Passes the conversation and collected details to a live agent.' },
      { title: 'Summarise', body: 'Records the outcome and summary for reporting and follow-up.' },
    ],
    capabilities: [
      { icon: 'code', title: 'Web and app', body: 'Embed on your website or web app with a script tag.' },
      { icon: 'chat', title: 'WhatsApp', body: 'The same agent and knowledge on WhatsApp Business.' },
      { icon: 'book', title: 'Answers with sources', body: 'Knowledge answers come from indexed documents, FAQs and web pages you approve.' },
      { icon: 'bolt', title: 'Actions in chat', body: 'Bookings, status checks and updates through connected workflows.' },
      { icon: 'handover', title: 'Live-agent handover', body: 'Hands over with the full transcript and the details already collected.' },
      { icon: 'globe', title: 'Multilingual', body: 'Understands and replies in the customer’s language using one knowledge base.' },
    ],
    fit: {
      integrations: ['Website and app embed', 'WhatsApp Business', 'Live chat and CRM handover'],
      deployment: deploymentLine,
    },
    faq: [
      { q: 'Can one agent serve web, app and WhatsApp?', a: 'Yes. You publish the same agent to each channel and manage it in one place.' },
      { q: 'What if it does not know the answer?', a: 'It is set up to say so and offer a handover instead of guessing. You choose which sources it may answer from.' },
    ],
    visual: {
      channel: 'Web chat',
      lines: [
        { who: 'customer', text: 'Can I upgrade my plan today?' },
        { who: 'agent', text: 'Yes. Here are the two plans available for your account.' },
        { who: 'system', text: 'Plan changed · effective today' },
        { who: 'agent', text: 'Done. Your confirmation is on its way.' },
      ],
    },
  },
  {
    slug: 'agent-assist',
    icon: 'headset',
    name: 'Agent Assist',
    short: 'Agent Assist',
    navLine: 'Real-time help inside the agent desktop',
    title: ['Give every agent the answer, ', { hl: 'with its source,' }, ' first.'],
    intro:
      'Real-time support inside the agent workspace: suggested answers from your knowledge, next steps during the conversation and a summary written for the agent when it ends.',
    problem: {
      title: 'New agents take months to become confident.',
      body: 'Answers are spread across wikis, PDFs and old tickets. After-call notes eat into handling time, and quality depends on who picks up.',
      points: [
        'Searching for answers while the customer waits',
        'After-call work that adds minutes to every contact',
        'Uneven quality between experienced and new agents',
      ],
    },
    workflow: [
      { title: 'Listen', body: 'Follows the live conversation as it happens.' },
      { title: 'Suggest', body: 'Surfaces the relevant answer with its source, before the agent searches.' },
      { title: 'Guide', body: 'Proposes the next step for the process in progress.' },
      { title: 'Summarise', body: 'Drafts the wrap-up note for the agent to confirm.' },
      { title: 'Write back', body: 'Saves the confirmed summary and outcome to your CRM.' },
    ],
    capabilities: [
      { icon: 'bulb', title: 'Suggested answers', body: 'Relevant knowledge, with the source, while the conversation is still live.' },
      { icon: 'compass', title: 'Next steps', body: 'Process guidance so agents follow the same path for the same request.' },
      { icon: 'summary', title: 'Automatic summaries', body: 'Wrap-up notes drafted for the agent to check and confirm.' },
      { icon: 'sync', title: 'CRM write-back', body: 'Confirmed outcomes saved to the record without copy and paste.' },
      { icon: 'eye', title: 'Handover context', body: 'Agents see what the AI agent already did before they take over.' },
      { icon: 'cap', title: 'Faster onboarding', body: 'New starters get guidance in the flow of work instead of only in training.' },
    ],
    fit: {
      integrations: ['Works alongside your existing agent desktop', 'Genesys Cloud and Cisco contact centers', 'Salesforce and other CRMs'],
      deployment: deploymentLine,
    },
    faq: [
      { q: 'Do our agents need a new desktop?', a: 'No. Agent Assist is designed to work alongside the workspace your agents already use. Supported workspaces and versions are confirmed during scoping.' },
      { q: 'Can agents edit the suggested summary?', a: 'Yes. The agent confirms or edits the summary before it is saved.' },
    ],
    visual: {
      channel: 'Agent desktop',
      lines: [
        { who: 'customer', text: 'My card was charged twice for one order.' },
        { who: 'system', text: 'Suggested answer · Refund policy, section 3' },
        { who: 'system', text: 'Next step · open duplicate-charge refund' },
        { who: 'agent', text: 'Summary drafted · ready to confirm' },
      ],
    },
  },
  {
    slug: 'conversation-analytics',
    icon: 'bars',
    name: 'Conversation Analytics',
    short: 'Analytics',
    navLine: 'What was asked, resolved and handed over',
    title: ['See what happened in ', { hl: 'every conversation.' }],
    intro:
      'One view of your automated conversations: what customers asked for, what was resolved, where handovers happened and why. Know what to automate next from evidence, not anecdotes.',
    problem: {
      title: 'Containment rates hide the real story.',
      body: 'A conversation that ends is not always a request that was resolved. The reasons for handovers sit in transcripts nobody has time to read.',
      points: [
        'Reports count conversations, not outcomes',
        'Handover reasons are invisible',
        'Automation priorities are set by opinion',
      ],
    },
    workflow: [
      { title: 'Capture', body: 'Every conversation, action and handover is recorded with its outcome.' },
      { title: 'Classify', body: 'Requests are grouped by topic and result.' },
      { title: 'Measure', body: 'Resolution, handover and volume trends in live and historical views.' },
      { title: 'Trace', body: 'Every number links back to the conversations behind it.' },
      { title: 'Improve', body: 'Spot the next workload to automate and the answers to fix.' },
    ],
    capabilities: [
      { icon: 'pulse', title: 'Live data', body: 'Current conversation volumes and outcomes as they happen.' },
      { icon: 'bars', title: 'Reports and insights', body: 'Historical trends by topic, channel and outcome.' },
      { icon: 'target', title: 'Resolution, not just containment', body: 'Separates requests that were completed from conversations that simply ended.' },
      { icon: 'split', title: 'Handover reasons', body: 'See why conversations went to a person, so you can find handovers worth automating.' },
      { icon: 'trend', title: 'Topic trends', body: 'Spot new or growing request types early.' },
      { icon: 'link', title: 'Traceability', body: 'Drill from any metric to the conversations behind it.' },
    ],
    fit: {
      integrations: ['Enterprise Bot voice, email and chat agents', 'Exports to your BI tools', 'CRM outcome data'],
      deployment: deploymentLine,
    },
    faq: [
      { q: 'Does it include conversations handled by human agents?', a: 'That depends on the channels and integrations in your deployment. We confirm what can be included during scoping.' },
      { q: 'Can we export the data?', a: 'Yes. Reports can be exported for use in your own BI and reporting tools.' },
    ],
    visual: {
      channel: 'Analytics',
      lines: [
        { who: 'system', text: 'Top request this week · change of address' },
        { who: 'system', text: 'Resolved end to end · trend rising' },
        { who: 'system', text: 'Top handover reason · missing policy number' },
        { who: 'agent', text: 'Suggested fix · ask for it earlier in the flow' },
      ],
    },
  },
]

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug)

/** The four starting points featured on the homepage (Chat stays reachable). */
export const startingPoints = ['voice-agent', 'email-agent', 'agent-assist', 'conversation-analytics']
