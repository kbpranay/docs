/**
 * Blog index: links to articles already published on enterprisebot.ai and
 * feedyou.ai (observed 7 Nov 2026). Titles and dates as published; no article
 * text is copied. Move the articles into the new site when a CMS is chosen.
 */
export interface Post {
  title: string
  date: string
  url: string
  topic: string
  source: 'eb' | 'feedyou'
}

export const postGroups: { label: string; posts: Post[] }[] = [
  {
    label: 'Voice AI and the contact center',
    posts: [
      { title: 'The Shift from IVRs to Voicebots, and Now Agentic Voice AI', date: '2026-06-10', url: 'https://www.enterprisebot.ai/blog/the-shift-from-ivrs-to-voicebots-and-now-agentic-voice-ai', topic: 'How to tell real agentic voice AI from relabelled voicebots in a vendor demo.', source: 'eb' },
      { title: 'How Can You Improve Agent Productivity in Your Call Center?', date: '2026-04-20', url: 'https://www.enterprisebot.ai/blog/how-to-improve-agent-productivity-in-call-centers', topic: 'Using agent assist and AI to get more from the team you have.', source: 'eb' },
      { title: 'Top Agentic AI Companies for Enterprise Customer Service (2026)', date: '2026-04-29', url: 'https://www.enterprisebot.ai/blog/top-agentic-ai-companies-for-enterprise-customer-service-2026', topic: 'The vendor landscape and how to evaluate agentic AI for service.', source: 'eb' },
      { title: '11 Best Contact Center Software Solutions for 2026', date: '2026-01-09', url: 'https://www.enterprisebot.ai/blog/contact-center-software', topic: 'A comparison of contact-center software platforms.', source: 'eb' },
      { title: 'How a voicebot can help you with incoming calls', date: '2024-02-13', url: 'https://feedyou.ai/news/5-tips-voicebot-incoming-calls/', topic: 'Practical tips for inbound voicebots.', source: 'feedyou' },
      { title: '5 tips for using voicebot for outgoing calls', date: '2024-04-19', url: 'https://feedyou.ai/news/5-tips-for-using-voicebot-for-outgoing-calls/', topic: 'Where outbound voicebots work and how to set them up.', source: 'feedyou' },
    ],
  },
  {
    label: 'Speech, languages and accuracy',
    posts: [
      { title: 'The Evolution of Voice Bots: Advances in STT and TTS Technologies 2025 and Language Coverage', date: '2025-04-28', url: 'https://www.enterprisebot.ai/blog/the-evolution-of-voice-bots-advances-in-speech-to-text-and-text-to-speech-technologies-2025-and-language-coverage', topic: 'Speech-to-text and text-to-speech choices, language by language.', source: 'eb' },
      { title: 'Back to BASICs: A Generative AI Benchmark for Enterprise', date: '2024-05-29', url: 'https://www.enterprisebot.ai/blog/back-to-basics-a-generative-ai-benchmark-for-enterprise', topic: 'A framework for evaluating AI answers in the enterprise.', source: 'eb' },
      { title: 'Prompt Engineering for Enterprise Chatbots', date: '2024-10-02', url: 'https://www.enterprisebot.ai/blog/prompt-engineering-for-enterprise-chatbots', topic: 'How prompts are built for consistent quality at scale.', source: 'eb' },
      { title: 'Chatbots that speak all languages', date: '2022-05-30', url: 'https://feedyou.ai/news/chatbots-that-speak-all-languages/', topic: 'Running assistants across many languages.', source: 'feedyou' },
    ],
  },
  {
    label: 'Security, data and model choice',
    posts: [
      { title: 'The Best Open-Source LLMs for Enterprise', date: '2024-12-04', url: 'https://www.enterprisebot.ai/blog/the-best-open-source-llms-for-enterprise', topic: 'Open models for privacy and cost control.', source: 'eb' },
      { title: 'ChatGPT Alternatives for Enterprises', date: '2024-11-04', url: 'https://www.enterprisebot.ai/blog/chatgpt-alternatives-for-enterprises', topic: 'Options when data must stay under your control.', source: 'eb' },
      { title: 'On-premise chatbots: the future of safe business communication', date: '2023-02-06', url: 'https://www.enterprisebot.ai/blog/on-premise-chatbots-the-future-of-safe-business-communication', topic: 'Why some teams keep AI inside their own infrastructure.', source: 'eb' },
    ],
  },
  {
    label: 'Integrations and comparisons',
    posts: [
      { title: 'Upgrade Your Genesys Contact Center with Enterprise Bot’s GenAI Automation', date: '2024-03-28', url: 'https://www.enterprisebot.ai/blog/upgrade-your-genesys-contact-center-with-enterprise-bots-genai-automation', topic: 'Adding AI to Genesys without replacing it.', source: 'eb' },
      { title: 'Enterprise Bot vs. Microsoft Copilot Studio', date: '2024-08-15', url: 'https://www.enterprisebot.ai/blog/enterprise-bot-vs-microsoft-copilot-studio', topic: 'Setup, accuracy and multilingual support compared.', source: 'eb' },
      { title: 'IPEX & Feedyou: Experts in true omnichannel', date: '2022-08-22', url: 'https://feedyou.ai/news/ipex-feedyou-omnichannel/', topic: 'A contact-center integration partnership.', source: 'feedyou' },
    ],
  },
]
