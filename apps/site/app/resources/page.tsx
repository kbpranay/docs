import type { Metadata } from 'next'
import { CtaBand, PageHero } from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Guides on agentic voice AI, Genesys, language coverage and contact-center productivity.',
  alternates: { canonical: '/resources' },
}

const BLOG = 'https://www.enterprisebot.ai/blog/'
const posts = [
  { t: 'The shift from IVRs to voicebots, and now agentic voice AI', d: 'Jun 2026', href: BLOG + 'the-shift-from-ivrs-to-voicebots-and-now-agentic-voice-ai', topic: 'Voice AI' },
  { t: 'Voice bots: speech-to-text, text-to-speech and language coverage', d: 'Apr 2025', href: BLOG + 'the-evolution-of-voice-bots-advances-in-speech-to-text-and-text-to-speech-technologies-2025-and-language-coverage', topic: 'Languages' },
  { t: 'Upgrade your Genesys contact center with generative AI automation', d: 'Earlier', href: BLOG + 'upgrade-your-genesys-contact-center-with-enterprise-bots-genai-automation', topic: 'Genesys' },
  { t: 'How to improve agent productivity in your call center', d: 'Apr 2026', href: BLOG + 'how-to-improve-agent-productivity-in-call-centers', topic: 'Agent assist' },
  { t: 'Key questions to ask before investing in conversational AI', d: 'Nov 2026', href: BLOG + 'key-questions-to-ask-before-investing-in-conversational-ai', topic: 'Evaluation' },
  { t: 'On-premises chatbots and safe business communication', d: 'Earlier', href: BLOG + 'on-premise-chatbots-the-future-of-safe-business-communication', topic: 'Deployment' },
]

export default function Resources() {
  return (
    <>
      <PageHero
        kicker="Resources"
        title={
          <>
            Guides for <span className="hl">evaluating voice AI.</span>
          </>
        }
        intro="Practical reading for contact-center, CX and IT teams evaluating voice AI and quality assessment."
      />
      <section className="section section--paper" aria-labelledby="res-title">
        <div className="container">
          <h2 id="res-title" className="sr-only">
            Articles
          </h2>
          <div className="hub">
            {posts.map((p, i) => (
              <a key={p.href} href={p.href} className="hub__card" data-reveal style={{ ['--reveal-delay' as string]: `${(i % 3) * 70}ms` }}>
                <span className="hub__topic">
                  {p.topic} · {p.d}
                </span>
                <span className="hub__name">{p.t}</span>
                <span className="hub__line">Read on the Enterprise Bot blog</span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title={<>Prefer to see it <span className="hl">working?</span></>} body="Bring one call type and we will show it handled, handed over and scored." />
    </>
  )
}
