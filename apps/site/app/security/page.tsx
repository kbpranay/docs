import type { Metadata } from 'next'
import Link from 'next/link'
import { CtaBand, PageHero } from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Security and data',
  description: 'Deployment options, data residency, access control, audit and data logs, and certification status for Enterprise Bot.',
  alternates: { canonical: '/security' },
}

const blocks = [
  { t: 'Deployment options', b: 'Managed hosting in the EU, Middle East, North America or Asia; a dedicated private cloud; or on-premises Kubernetes (EKS, GKE, AKS or your own infrastructure).' },
  { t: 'Data residency', b: 'Choose where data is processed and stored. We document the data flow component by component, including speech engines and language models.' },
  { t: 'Your models, your boundary', b: 'Use language models through your own private endpoints or self-hosted components when data must not leave your environment.' },
  { t: 'Access control', b: 'Single sign-on and SCIM, role-based access and enforced two-step login.' },
  { t: 'Audit and data logs', b: 'Audit view of configuration changes, per-turn conversation logs and versioned workflows with exportable change history.' },
  { t: 'Data protection', b: 'PII masking before data reaches a model, encryption in transit and at rest, and retention configured per deployment.' },
]

export default function Security() {
  return (
    <>
      <PageHero
        kicker="Security and data"
        title={
          <>
            Built to pass <span className="hl">your security review.</span>
          </>
        }
        intro="Where it runs, what it may access, what it records and who can change it, documented for your security and data protection teams."
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
        <div className="container fit fit--light">
          <div data-reveal>
            <p className="kicker">Certifications</p>
            <h2 id="cert-title" className="h2" style={{ marginTop: 16 }}>
              Status, stated plainly.
            </h2>
            <ul className="status-list">
              <li>
                <b>SOC 2</b> Report available on request under NDA.
              </li>
              <li>
                <b>ISO 27001:2022</b> Certification audit in progress.
              </li>
              <li>
                <b>GDPR</b> Data processing agreement and data-flow documentation provided during procurement.
              </li>
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
