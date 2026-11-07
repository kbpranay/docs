import type { Metadata } from 'next'
import Link from 'next/link'
import { FigureCard } from '@/components/FigureCard'
import { CtaBand, PageHero } from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Security and data',
  description: 'Deployment options, data residency, access control, audit and data logs, and certification status for Enterprise Bot.',
  alternates: { canonical: '/security' },
}

const blocks = [
  { t: 'Deployment options', b: 'Managed hosting in your region (EU, Middle East, North America or Asia), a dedicated private cloud, or on-premises Kubernetes.' },
  { t: 'Data residency', b: 'Choose where data is processed and stored. We document the data flow component by component, including speech engines and language models.' },
  { t: 'Your models, your boundary', b: 'Use language models through your own private endpoints or self-hosted components when data must not leave your environment.' },
  { t: 'Access control', b: 'Single sign-on and SCIM, role-based access and team-wide two-step login.' },
  { t: 'Audit and data logs', b: 'Audit view of configuration changes, per-turn conversation logs and versioned workflows with exportable change history.' },
  { t: 'Data protection', b: 'PII masking before data reaches a model and retention configured per deployment. Encryption and key handling are documented for your security review.' },
]

export default function Security() {
  return (
    <>
      <PageHero
        kicker="Security and data"
        title={
          <>
            Ready for <span className="hl">your security review.</span>
          </>
        }
        intro="Where it runs, what it may access, what it records and who can change it, documented for your security and data protection teams."
        aside={
          <FigureCard
            title="Certifications, stated plainly"
            rows={[
              <>
                <span className="figure-row__k">SOC 2</span>
                <span>Report available on request under NDA</span>
              </>,
              <>
                <span className="figure-row__k">ISO 27001:2022</span>
                <span>Certification audit in progress</span>
              </>,
              <>
                <span className="figure-row__k">GDPR</span>
                <span>DPA and data-flow documentation</span>
              </>,
            ]}
          />
        }
      />
      <section className="section section--paper" aria-labelledby="sec-title">
        <div className="container">
          <h2 id="sec-title" className="sr-only">
            Security controls
          </h2>
          <div className="caps" data-reveal>
            {blocks.map((x) => (
              <article key={x.t} className="cap">
                <h3>{x.t}</h3>
                <p>{x.b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--white" aria-labelledby="cert-title">
        <div className="container">
          <div data-reveal className="narrow">
            <p className="kicker">For your review</p>
            <h2 id="cert-title" className="h2" style={{ marginTop: 16 }}>
              Documentation on request.
            </h2>
            <ul className="share-list">
              <li>SOC 2 report (under NDA)</li>
              <li>Data processing agreement</li>
              <li>Component-by-component data-flow diagram</li>
              <li>Answers to your security questionnaire</li>
            </ul>
            <p className="lede" style={{ marginTop: 20 }}>
              How this website handles your data: <Link href="/privacy">Privacy notice</Link>. Technical detail:{' '}
              <Link href="/technology">Technology</Link>.
            </p>
          </div>
        </div>
      </section>
      <CtaBand title={<>Bring your <span className="hl">security questionnaire.</span></>} body="We answer it with your deployment model in mind and document the data flow for your review." />
    </>
  )
}
