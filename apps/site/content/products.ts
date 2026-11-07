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
  flowTitle?: Segment[]
  capabilities: { icon: IconName; title: string; body: string }[]
  fit: { integrations: string[]; deployment: string }
  proof?: { stats: StatClaim[]; quote?: QuoteClaim }
  /** Published customer stories (claims.ts customerStories ids) shown under "Also in production". */
  storyIds?: string[]
  showcase?: { kind: 'call' | 'inbox' | 'chat' | 'suggest' | 'transcript' | 'bars' | 'metrics'; title: Segment[]; body: string }
  faq: { q: string; a: string }[]
  /** Lines for the product hero visual. */
  visual: { channel: string; lines: { who: 'customer' | 'agent' | 'person' | 'system'; text: string }[] }
}

const deploymentLine =
  'Cloud, private cloud or on-premises, depending on the components and data flows your security team approves.'

export const products: Product[] = [
  {
    slug: 'voice-agent',
    showcase: { kind: 'call', title: ['One call, ', { hl: 'start to finish.' }], body: 'Verify the caller, find the rule, act in your system and hand over with a summary when a person must decide, all on the same call.' },
    storyIds: ['swiss-health', 'moneta', 'foxconn', 'bezrealitky'],
    icon: 'phone',
    name: 'Voice Agent',
    short: 'Voice',
    navLine: 'Answers and resolves inbound calls',
    title: ['AI voice agents ', { hl: 'for your inbound lines.' }],
    intro:
      'Answers calls in natural speech, finds the answer in your approved knowledge, completes permitted actions in your systems and transfers to your queues with a summary. Connected through SIP and AudioCodes to Genesys Cloud, Cisco and your existing telephony.',
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
      { icon: 'book', title: 'Answers from complex documents', body: 'Long policy documents, tables and attachments, with the source of each answer shown.' },
      { icon: 'route', title: 'Routing by intent', body: 'Callers say what they need; the agent routes on meaning, not on which key they pressed.' },
      { icon: 'turns', title: 'Natural turn-taking', body: 'Designed for real conversations: callers can interrupt, correct themselves or change topic.' },
      { icon: 'globe', title: 'Multilingual voice', body: 'Replies in the caller’s language, within the languages configured for your deployment.' },
      { icon: 'plug', title: 'Telephony fit', body: 'Connects to your telephony through SIP and session border controllers such as AudioCodes.' },
      { icon: 'handover', title: 'Warm handover', body: 'Transfers into your existing queues with a summary the agent sees before saying hello.' },
      { icon: 'summary', title: 'Call summaries', body: 'Each call can end with a structured summary written back to your CRM.' },
      { icon: 'target', title: 'Quality assessment of AI calls', body: 'AI calls can be scored against the same QA scorecard as your agents’ calls.' },
      { icon: 'globe', title: 'Live translation', body: 'Customers and agents speak different languages on the same call, with real-time translation. Early access.' },
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
      { q: 'What will it not do?', a: 'It does not act outside the permissions you set, does not answer from sources you have not approved, and transfers to a person when a request is above your thresholds or outside its scope.' },
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
    slug: 'conversation-insights',
    showcase: { kind: 'metrics', title: ['Ask for any metric. ', { hl: 'In plain words.' }], body: 'Describe the metric you need, such as “customer asked for a callback”. It is applied to your conversations and appears as a column you can sort, filter and report on. Ask follow-up questions in plain language and get the answer as a chart.' },
    flowTitle: ['From every conversation to ', { hl: 'the next decision.' }],
    icon: 'target',
    name: 'Conversation Insights',
    short: 'Insights',
    navLine: 'Quality scoring, custom metrics and analytics for every conversation',
    title: ['Score every conversation. ', { hl: 'Measure what you choose.' }],
    intro:
      'Quality assessment and conversation analytics in one. Conversations handled by your agents and your AI agents are scored against your QA scorecard, with evidence and a coaching note, and analysed with the metrics you define in plain language: intents, escalation reasons, sentiment, compliance and your own custom KPIs.',
    problem: {
      title: 'Decisions are made on a small sample.',
      body: 'Quality teams can review only a small share of calls, and standard reports count conversations, not outcomes. The reasons customers call back, escalate or churn sit in transcripts nobody has time to read.',
      points: ['Manual sampling misses most conversations', 'Every new question needs a new report', 'Scores and insights vary by who looked'],
    },
    workflow: [
      { title: 'Capture', body: 'Transcripts of calls and chats from your agents and your AI agents.' },
      { title: 'Score', body: 'Each conversation is checked against your scorecard, criterion by criterion, with evidence.' },
      { title: 'Measure', body: 'Your custom metrics, intents, escalation reasons and sentiment are applied to every conversation.' },
      { title: 'Explore', body: 'Dashboards and plain-language questions, with drill-down to the transcript behind any number.' },
      { title: 'Act', body: 'Coaching notes for agents, scheduled reports for leaders and the next workload to automate.' },
    ],
    capabilities: [
      { icon: 'log', title: 'Your scorecards', body: 'Criteria, weights and targets your quality team defines, assigned by rule and versioned.' },
      { icon: 'eye', title: 'Evidence per score', body: 'Each result points to the moment in the conversation behind it, with a coaching note.' },
      { icon: 'bars', title: 'Custom metrics in plain language', body: 'Describe a KPI in words and it becomes a column you can sort, filter and report on.' },
      { icon: 'pulse', title: 'Ask your data', body: 'Ask questions in plain language and get the answer as a chart.' },
      { icon: 'split', title: 'Why customers escalate', body: 'Intents, escalation reasons and sentiment, so you know what to fix and what to automate next.' },
      { icon: 'handover', title: 'Human and AI agents', body: 'One quality standard for your agents and your AI agents, with skill gaps by agent and team.' },
      { icon: 'link', title: 'Drill down to the call', body: 'Every number links to the conversations behind it.' },
      { icon: 'trend', title: 'Reports that arrive', body: 'Configurable dashboards and scheduled PDF and CSV reports.' },
    ],
    fit: {
      integrations: ['Call recordings and transcripts from your contact center', 'Genesys Cloud and Cisco contact centers', 'Enterprise Bot voice, email and chat agents'],
      deployment: deploymentLine,
    },
    faq: [
      { q: 'Which conversations are analysed?', a: 'Calls and chats handled by your agents or by your AI agents that you choose to include. Coverage, exclusions and any further channels are confirmed during scoping.' },
      { q: 'How do custom metrics work?', a: 'You describe the metric in plain language, for example “customer asked for a callback”. It is applied to your conversations and shown as a column you can sort, filter and include in reports.' },
      { q: 'Can we use our existing scorecard?', a: 'Yes. Your criteria, weights and targets are configured during setup and tested on your own anonymised conversations during the evaluation.' },
      { q: 'What will it not do?', a: 'It does not replace your reviewers’ judgement or make HR decisions. Every score shows its evidence so your team can check it.' },
      { q: 'Which languages can it analyse?', a: 'That depends on the language components configured for your deployment. We test your languages with your own conversations.' },
      { q: 'Can we take the data into our own tools?', a: 'Yes. Scheduled PDF and CSV reports, and exports for your own reporting.' },
    ],
    visual: {
      channel: 'Conversation insights',
      lines: [
        { who: 'system', text: 'Call 10:42 · Claims QA scorecard · 2 of 3 met' },
        { who: 'system', text: 'Custom metric · callback requested · yes' },
        { who: 'system', text: 'Escalation reason · amount above approval limit' },
        { who: 'agent', text: 'Coaching note · tell the caller when Claims will confirm' },
      ],
    },
  },
  {
    slug: 'email-agent',
    showcase: { kind: 'inbox', title: ['Every request in the email, ', { hl: 'handled.' }], body: 'Each email is split into its requests, the details are pulled out and a reply is drafted, then sent or held for approval under your rules.' },
    storyIds: ['avenberg', 'six', 'bcd'],
    icon: 'mail',
    name: 'Email Agent',
    short: 'Email',
    navLine: 'Reads, routes and resolves email',
    title: ['Clear the inbox. ', { hl: 'Keep the judgment.' }],
    intro:
      'Reads incoming email and attachments, separates each request, drafts or sends the reply and completes routine updates. Exceptions go to your team with the case already prepared. It runs on the same knowledge, rules and audit trail as your Voice Agent.',
    flowTitle: ['From inbox to ', { hl: 'resolved case.' }],
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
      { q: 'What will it not do?', a: 'It does not send replies for request types you set to draft or route-only, does not act outside the permissions you set, and routes a case to your team when information is missing or no rule covers it.' },
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
    showcase: { kind: 'chat', title: ['Answers that ', { hl: 'act.' }], body: 'Live data and your systems behind the answers, so the chat can check a train, start a refund or hand over to a colleague without losing the thread.' },
    storyIds: ['tpe', 'swica', 'ksw', 'yuh'],
    icon: 'chat',
    name: 'Chat Agent',
    short: 'Chat',
    navLine: 'Web, app and WhatsApp conversations',
    title: ['Answer in the moment. ', { hl: 'Act on it too.' }],
    intro:
      'AI chat for your website, app and WhatsApp. It answers from your knowledge, completes requests in your systems and hands over to live agents without losing the thread. One knowledge base and rule set for phone and chat, so the answer a caller gets matches the answer in chat.',
    problem: {
      title: 'Chat that cannot act sends customers to the phone.',
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
      { q: 'What will it not do?', a: 'It does not answer from sources you have not approved, does not act outside the permissions you set, and offers a person when it cannot help.' },
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
    slug: 'live-translate',
    showcase: { kind: 'transcript', title: ['Each side hears ', { hl: 'their own language.' }], body: 'The customer speaks German, the agent speaks English, and each hears the other translated in real time (early access).' },
    icon: 'globe',
    name: 'Live Translate',
    short: 'Translate',
    navLine: 'Customer and agent speak different languages on one call (early access)',
    title: ['One call. ', { hl: 'Two\u00a0languages.' }],
    flowTitle: ['Both directions, ', { hl: 'at the same time.' }],
    intro:
      'Live two-way translation for contact-center calls. The customer speaks their language, the agent speaks theirs, and each hears the other translated in real time. In early access.',
    problem: {
      title: 'Language skills decide who can take the call.',
      body: 'Calls in less common languages wait for the one agent who speaks them, get escalated, or need an interpreter on the line. Peaks and new markets make it worse.',
      points: ['Language queues with long waits', 'Interpreters added to calls at extra cost', 'Agents limited to the languages they speak'],
    },
    workflow: [
      { title: 'Customer speaks', body: 'The caller talks naturally in their own language.' },
      { title: 'Translate', body: 'Speech is recognised and translated while they talk.' },
      { title: 'Agent hears', body: 'The agent hears the translation in their language.' },
      { title: 'Agent replies', body: 'The reply is translated back to the customer in parallel.' },
      { title: 'Record', body: 'The conversation can be transcribed for summaries and quality assessment.' },
    ],
    capabilities: [
      { icon: 'globe', title: 'Two-way, in parallel', body: 'Both directions are translated at the same time, so the conversation keeps its rhythm.' },
      { icon: 'plug', title: 'Fits your contact center', body: 'How it connects to your platform is confirmed with you during early access.' },
      { icon: 'handover', title: 'Route on skills, not language', body: 'Route calls on skills and availability instead of language alone.' },
      { icon: 'summary', title: 'Transcripts for follow-up', body: 'Transcripts available for summaries and QA where you enable them.' },
      { icon: 'shield', title: 'Your deployment choices', body: 'Hosting and data flow agreed with your security team, like the rest of the platform.' },
      { icon: 'target', title: 'Tested on your language pairs', body: 'Language pairs and audio conditions are tested with your own calls before rollout.' },
    ],
    fit: {
      integrations: ['Connection to your contact center confirmed during early access', 'Enterprise Bot Conversation Insights'],
      deployment: deploymentLine,
    },
    faq: [
      { q: 'What will it not do?', a: 'It is not a certified interpreter for legal or medical consent. Language pairs are confirmed on your own audio before rollout, and calls can still go to a person who speaks the customer’s language.' },
      { q: 'Is it generally available?', a: 'Live Translate is in early access. We confirm language pairs, telephony setup and availability with each contact center before a pilot.' },
      { q: 'Which languages are supported?', a: 'English and German have been demonstrated. Other language pairs are being tested; we confirm yours on your own audio before rollout.' },
      { q: 'How fast is it?', a: 'Translation runs while people speak. We measure the delay on your telephony during the evaluation rather than quote a lab number.' },
    ],
    visual: {
      channel: 'Live translation',
      lines: [
        { who: 'customer', text: 'Hello, I’d like to move my appointment.' },
        { who: 'system', text: 'Agent hears (German): Guten Tag, ich möchte meinen Termin verschieben.' },
        { who: 'person', text: 'Gerne. Passt Ihnen Dienstag um 10 Uhr?' },
        { who: 'system', text: 'Customer hears (English): Of course. Does Tuesday at 10 work for you?' },
      ],
    },
  },
  {
    slug: 'agent-assist',
    showcase: { kind: 'suggest', title: ['The right answer, ', { hl: 'while the customer talks.' }], body: 'Suggestions come from your approved knowledge, with the source shown, so agents can check them before they use them.' },
    storyIds: ['callpoint', 'bcd'],
    icon: 'headset',
    name: 'Agent Assist',
    short: 'Agent Assist',
    navLine: 'Real-time help inside the agent desktop',
    title: ['Give every agent the answer, ', { hl: 'with its source,' }, ' first.'],
    intro:
      'Real-time support inside the agent workspace: suggested answers from your knowledge, next steps during the conversation and a summary written for the agent when it ends. Use it next to Conversation Insights: agents get guidance during the call, and team leads coach on what the scorecard finds.',
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
      { q: 'What will it not do?', a: 'It does not speak to the customer, and nothing is saved without the agent confirming it. Suggestions come only from the knowledge sources you approve.' },
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
]

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug)

/** The four starting points featured on the homepage (Chat stays reachable). */
export const startingPoints = ['voice-agent', 'agent-assist', 'conversation-insights', 'live-translate']
