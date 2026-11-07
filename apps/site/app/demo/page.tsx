import type { Metadata } from 'next'
import { DemoForm } from '@/components/DemoForm'
import { Waves } from '@/components/Waves'

export const metadata: Metadata = {
  title: 'Book a tailored demo',
  description: 'See Enterprise Bot handle one of your workloads with your contact center, systems and languages.',
  alternates: { canonical: '/demo' },
}

export default function DemoPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="demo-title" style={{ paddingBottom: 'clamp(48px, 6vw, 72px)' }}>
        <Waves />
        <div className="container">
          <p className="kicker">Tailored demo</p>
          <h1 id="demo-title" style={{ maxWidth: '18ch' }}>
            Show us one call type. <span className="hl">See it handled, then scored.</span>
          </h1>
          <p className="intro">
            Tell us about your contact center, your languages and the calls you want to automate or review. We prepare
            the session around your stack, not a generic script.
          </p>
        </div>
      </section>
      <section className="section section--paper" style={{ paddingTop: 'clamp(48px, 6vw, 80px)' }}>
        <div className="container demo-grid">
          <div>
            <h2 className="h2" style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)' }}>
              What you will see
            </h2>
            <ul className="see-list">
              <li>A voice agent handling your scenario in your language</li>
              <li>A QA scorecard applied to a sample conversation</li>
              <li>The handover into your contact center, with the summary your agents would see</li>
            </ul>
            <h2 className="h2" style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)', marginTop: 48 }}>
              What happens next
            </h2>
            <ol className="next-steps">
              {[
                { t: 'We read your request', d: 'A solutions specialist reviews your channels, platform and languages.' },
                { t: 'We agree the scope', d: 'A short call to pick one workload and what success looks like.' },
                { t: 'You see it working', d: 'A session built around your request types, systems and approval rules.' },
              ].map((s, i) => (
                <li key={s.t}>
                  <b>{i + 1}</b>
                  <div>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <DemoForm />
        </div>
      </section>
    </>
  )
}
