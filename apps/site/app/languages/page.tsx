import { Brush } from '@/components/Brush'
import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { FigureCard } from '@/components/FigureCard'
import { Faq } from '@/components/Faq'
import { CtaBand, PageHero } from '@/components/PageHero'
import { Related } from '@/components/Related'
import { ProofStrip } from '@/components/ProofStrip'

export const metadata: Metadata = pageMeta({
  title: 'Languages',
  description:
    'Voice AI languages for Switzerland, Poland, Eastern Europe and India, tested on your own calls.',
  path: '/languages',
})

const markets = [
  { name: 'Switzerland', langs: ['Swiss German', 'German', 'French', 'Italian', 'English'], note: 'Swiss German alongside German, French, Italian and English, tested on your own call audio.' },
  { name: 'Poland', langs: ['Polish', 'Ukrainian', 'Russian', 'English'], note: 'Polish alongside Ukrainian, Russian and English for multilingual service lines.' },
  { name: 'Eastern Europe', langs: ['Czech', 'Slovak', 'Romanian', 'Hungarian', 'Bulgarian', 'Latvian', 'Lithuanian'], note: 'Voices and recognition per language, configured for each deployment.' },
  { name: 'India', langs: ['Hindi', 'English (India)', 'Bengali'], note: 'Further Indian languages have been tested in pilots and are evaluated per project.' },
]

const faq = [
  { q: 'Which languages does the voice AI support?', a: 'Languages depend on the speech and language components configured for your deployment. Our focus markets are Switzerland (Swiss German, German, French, Italian, English), Poland, Eastern Europe and India; ask us about other languages.' },
  { q: 'Does it understand Swiss German?', a: 'Yes. Swiss German is supported alongside German, French, Italian and English, and we test recognition on your own call audio before go-live.' },
  { q: 'How do you check quality in our languages?', a: 'We choose the speech engine per language, add your vocabulary and test on your own call types, including noise, accents and language switches.' },
]

export default function Languages() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Languages', href: '/languages' }]}
        kicker="Languages"
        title={
          <>
            Your markets. <span className="hl hl--brush">Your languages.<Brush draw /></span>
          </>
        }
        intro="Voice AI for the languages and dialects your customers actually speak, with the speech engine chosen per language and tested on your own calls."
        aside={
          <FigureCard
            title="One call, three languages"
            label="Illustrative"
            rows={[
              <>
                <span className="figure-row__k">Caller</span>
                <span className="chip">Swiss German</span>
              </>,
              <>
                <span className="figure-row__k">Agent reply</span>
                <span className="chip">Swiss German</span>
              </>,
              <>
                <span className="figure-row__k">CRM note</span>
                <span className="chip chip--ok">English</span>
              </>,
            ]}
          />
        }
      />
      <section className="section section--paper" aria-labelledby="markets-title">
        <div className="container">
          <h2 id="markets-title" className="sr-only">
            Languages by market
          </h2>
          <div className="markets">
            {markets.map((m, i) => (
              <article key={m.name} className="market" data-reveal style={{ ['--reveal-delay' as string]: `${(i % 2) * 70}ms` }}>
                <h3>{m.name}</h3>
                <ul className="market__langs">
                  {m.langs.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
                <p>{m.note}</p>
              </article>
            ))}
          </div>
          <p className="source-note" data-reveal>
            Supported languages depend on the speech and language components configured for your deployment. Other
            European and Asian languages are available; ask us about yours.
          </p>
          <ProofStrip
            label="Running today"
            items={[
              { id: 'swiss-health', text: 'Swiss German, French and Italian: AI call routing on Genesys at a Swiss health insurer' },
              { id: 'moneta', text: 'Czech: MONETA Money Bank voicebot' },
              { id: 'foxconn', text: 'Foxconn Czech plants: voicebot in 9 languages' },
            ]}
          />
        </div>
      </section>
      <section className="section section--white" aria-labelledby="test-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">How we prove it</p>
            <h2 id="test-title" className="h2">
              Tested on your audio, not ours.
            </h2>
          </div>
          <div className="caps" data-reveal>
            <article className="cap">
              <h3>Your call audio</h3>
              <p>Real telephony audio in your languages and dialects, not studio recordings.</p>
            </article>
            <article className="cap">
              <h3>Your vocabulary</h3>
              <p>Product names, places and specialist terms added and tested.</p>
            </article>
            <article className="cap">
              <h3>Reference scoring</h3>
              <p>Transcripts checked against a reference, plus task success per language.</p>
            </article>
            <article className="cap">
              <h3>Engine per language</h3>
              <p>The best-performing speech engine is selected for each language you serve.</p>
            </article>
            <article className="cap">
              <h3>Language switching</h3>
              <p>Behaviour when callers switch language mid-call is tested, not assumed.</p>
            </article>
            <article className="cap">
              <h3>Live translation</h3>
              <p>Two-way translation between customer and agent languages, in early access.</p>
            </article>
          </div>
        </div>
      </section>
      <Faq id="languages-faq" title="Language questions" items={faq} tone="paper" />
      <Related route="/languages" />
      <CtaBand title={<>Hear it in <span className="hl">your</span> language.</>} body="Tell us your languages and markets and we will test them on your own call types." />
    </>
  )
}
