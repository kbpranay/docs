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
            Show us one workload. <span className="hl">See how it runs in your stack.</span>
          </h1>
          <p className="intro">
            Tell us about your contact center and the requests you want to automate. We prepare the session around your
            stack, not a generic script.
          </p>
        </div>
      </section>
      <section className="section section--paper" style={{ paddingTop: 'clamp(48px, 6vw, 80px)' }}>
        <div className="container demo-grid">
          <div>
            <h2 className="h2" style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)' }}>
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
