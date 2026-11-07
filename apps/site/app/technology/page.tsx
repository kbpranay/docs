import { Brush } from '@/components/Brush'
import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import Link from 'next/link'
import { FigureCard } from '@/components/FigureCard'
import { Check } from '@/components/Icons'
import { Faq } from '@/components/Faq'
import { CtaBand, PageHero } from '@/components/PageHero'
import { Related } from '@/components/Related'
import { Pipeline } from '@/components/Pipeline'

export const metadata: Metadata = pageMeta({
  title: 'Technology',
  description:
    'How Enterprise Bot voice AI works: cascaded and real-time voice modes, low-latency design, model choice, telephony, guardrails, logs and deployment.',
  path: '/technology',
})

const faq = [
  { q: 'What is the difference between Standard and Realtime voice mode?', a: 'Standard (cascaded) mode runs speech-to-text, a language model and text-to-speech, with guardrails and PII masking on every turn. Realtime mode uses one speech-to-speech model for the most natural turn-taking, with more limited guardrail and PII controls.' },
  { q: 'Which models and speech engines can we use?', a: 'Speech recognition from engines such as Microsoft Azure, Deepgram and Google; voices from providers such as ElevenLabs, Microsoft Azure and Amazon Polly; language models from OpenAI, Google Gemini, Amazon Bedrock or your own private models.' },
  { q: 'How do you keep response times low?', a: 'Streaming speech recognition, barge-in, turn-taking tuned per agent and hosting near your telephony. We measure response time on your telephony during the evaluation instead of quoting lab numbers.' },
]

export default function Technology() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Technology', href: '/technology' }]}
        kicker="Technology"
        title={
          <>
            Built for live calls, <span className="hl hl--brush">built for control.<Brush draw /></span>
          </>
        }
        intro="Two voice modes, the speech and language models you choose, your telephony, and a full record of what the AI did."
        aside={
          <FigureCard
            title="Designed for low latency"
            rows={['Streaming speech recognition', 'Barge-in: callers can interrupt', 'Turn-taking tuned per agent', 'Hosted near your telephony'].map((t) => (
              <>
                <span className="figure-row__tick" aria-hidden="true">
                  <Check />
                </span>
                <span>{t}</span>
              </>
            ))}
          />
        }
      />

      <section className="section section--paper" aria-labelledby="modes-title">
        <div className="container">
          <div className="section-head section-head--split" data-reveal>
            <div>
              <p className="kicker">Voice architecture</p>
              <h2 id="modes-title" className="h2" style={{ marginTop: 16 }}>
                Cascaded or real‑time. <span className="hl">Per agent.</span>
              </h2>
            </div>
            <p className="lede">Choose the voice mode for each agent based on what the call needs: control and accuracy, or the most natural turn-taking.</p>
          </div>
          <div className="modes" data-reveal>
            <article className="mode">
              <p className="mode__tag">Cascaded</p>
              <h3>Speech-to-text → language model → text-to-speech</h3>
              <Pipeline
                label="Cascaded: caller, speech-to-text, language model with guardrails and PII masking, text-to-speech, caller"
                nodes={[{ name: 'Speech to text' }, { name: 'Language model', tag: 'Guardrails · PII masking', strong: true }, { name: 'Text to speech' }]}
              />
              <ul>
                <li>Guardrails and PII masking apply to every turn</li>
                <li>Readable transcripts for QA and audit</li>
                <li>Choose the best speech engine per language</li>
                <li>Recommended for most enterprise service calls</li>
              </ul>
            </article>
            <article className="mode">
              <p className="mode__tag">Real-time</p>
              <h3>One speech-to-speech model hears and answers</h3>
              <Pipeline label="Real-time: caller, speech-to-speech model, caller" nodes={[{ name: 'Speech-to-speech model', strong: true }]} />
              <ul>
                <li>The most natural turn-taking</li>
                <li>Suited to open, conversational calls</li>
                <li>Guardrail and PII controls are more limited in this mode</li>
                <li>Model options include Gemini Live and GPT Realtime</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--white" aria-labelledby="latency-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">Low latency by design</p>
            <h2 id="latency-title" className="h2">
              Fast where callers notice it.
            </h2>
          </div>
          <div className="caps" data-reveal>
            <article className="cap">
              <h3>Streaming recognition</h3>
              <p>Speech is transcribed while the caller talks, not after they finish.</p>
            </article>
            <article className="cap">
              <h3>Barge-in</h3>
              <p>Callers can interrupt; the agent stops speaking and listens.</p>
            </article>
            <article className="cap">
              <h3>Tunable turn-taking</h3>
              <p>Silence timeouts are configured per agent, so it answers when the caller is done, not later.</p>
            </article>
            <article className="cap">
              <h3>Hosting near your telephony</h3>
              <p>Regional hosting keeps the round trip between carrier, speech engines and model short.</p>
            </article>
            <article className="cap">
              <h3>Real-time mode where it fits</h3>
              <p>Use speech-to-speech for the most conversational calls.</p>
            </article>
            <article className="cap">
              <h3>Measured on your lines</h3>
              <p>We measure response time on your telephony during the evaluation instead of quoting lab numbers.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--navy" aria-labelledby="models-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">Model choice</p>
            <h2 id="models-title" className="h2">
              Your models, <span className="hl">swappable.</span>
            </h2>
          </div>
          <div className="integrations-list" data-reveal>
            <article className="integration">
              <h3>Speech-to-text</h3>
              <p>Engines such as Microsoft Azure, Deepgram and Google, chosen per language, with your vocabulary added and tested.</p>
            </article>
            <article className="integration">
              <h3>Text-to-speech</h3>
              <p>Voices from providers such as ElevenLabs, Microsoft Azure and Amazon Polly.</p>
            </article>
            <article className="integration">
              <h3>Language models</h3>
              <p>OpenAI, Google Gemini, models on Amazon Bedrock, or your own private and open models.</p>
            </article>
            <article className="integration">
              <h3>Compare before you switch</h3>
              <p>Compare language models side by side on your own scenarios before you switch.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--paper" aria-labelledby="control-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">Control and traceability</p>
            <h2 id="control-title" className="h2">
              Every answer, action and change on record.
            </h2>
          </div>
          <div className="caps" data-reveal>
            <article className="cap">
              <h3>Guardrails</h3>
              <p>Prompt-injection and prompt-leak detection and blocked terms, applied before the model answers.</p>
            </article>
            <article className="cap">
              <h3>PII masking</h3>
              <p>Masks IBANs, phone numbers, emails, names and your own patterns before data reaches a model.</p>
            </article>
            <article className="cap">
              <h3>Audit view</h3>
              <p>A compliance view of who changed what, and when.</p>
            </article>
            <article className="cap">
              <h3>Conversation logs</h3>
              <p>Searchable history of every conversation with per-turn detail: what was said, retrieved and done.</p>
            </article>
            <article className="cap">
              <h3>Versioned workflows</h3>
              <p>Every workflow change is logged and exportable, so actions in your systems are traceable.</p>
            </article>
            <article className="cap">
              <h3>Quality assessment</h3>
              <p>
                Conversations scored against your QA scorecard. <Link href="/platform/quality-assessment">How QA works</Link>
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--white" aria-labelledby="deploy-title">
        <div className="container">
          <div data-reveal className="narrow">
            <p className="kicker">Telephony and deployment</p>
            <h2 id="deploy-title" className="h2" style={{ marginTop: 16 }}>
              Runs where your rules say it can.
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              SIP, WebRTC, WebSockets and platform audio streams. Managed hosting, a dedicated private cloud, or
              on-premises Kubernetes. <Link href="/integrations">See integrations</Link> ·{' '}
              <Link href="/security">Security and data</Link>
            </p>
          </div>
        </div>
      </section>
      <Faq id="technology-faq" title="Technology questions" items={faq} tone="white" />
      <Related route="/technology" />
      <CtaBand title={<>Test it on <span className="hl">your</span> lines.</>} body="We measure voice quality and response time on your telephony, in your languages." />
    </>
  )
}
