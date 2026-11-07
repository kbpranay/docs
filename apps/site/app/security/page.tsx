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

const residency = [
  { model: 'Managed cloud', where: 'Hosted by us in the region you choose', fits: 'Fastest start; data stays in region' },
  { model: 'Dedicated private cloud', where: 'A single-tenant environment for you', fits: 'Separation from other customers' },
  { model: 'On-premises', where: 'Kubernetes in your own infrastructure', fits: 'Data must not leave your network' },
]

const lifecycle = [
  { t: 'Collect only what is needed', b: 'You decide which channels, recordings and fields are stored. PII can be masked before it reaches a model.' },
  { t: 'Keep it for as long as you set', b: 'Retention is configured per deployment to match your policy.' },
  { t: 'Delete on request', b: 'Conversation data can be deleted to answer data-subject requests and at the end of a contract.' },
  { t: 'Take it with you', b: 'Conversation logs and workflow configuration can be exported, so you are not locked in.' },
]

const procurementFaq = [
  {
    q: 'Where is our data processed and stored?',
    a: 'In the region or environment you choose. We give you a component-by-component data-flow diagram, including speech engines and language models, so you can see where each piece of data goes.',
  },
  {
    q: 'Do our conversations train your models or anyone else’s?',
    a: 'Your conversations are processed to run your service. Whether a model provider may use data for training is governed by its terms, which we set out per deployment in the data processing agreement. Private or self-hosted models are an option when no third-party terms are acceptable.',
  },
  {
    q: 'Can we run it without data leaving our network?',
    a: 'Yes, with on-premises deployment on your Kubernetes and self-hosted or private-endpoint models. We confirm which components can run on-premises for your setup during scoping.',
  },
  {
    q: 'How do you handle security incidents?',
    a: 'We follow a documented incident process with notification to you as agreed in the contract and DPA. We share the process as part of your security review.',
  },
  {
    q: 'Who at Enterprise Bot can access our data?',
    a: 'Access is role-based and limited to the people who operate your deployment. Configuration changes are recorded in the audit view.',
  },
  {
    q: 'What happens at the end of the contract?',
    a: 'You can export conversation logs and workflow configuration, and we delete your data as set out in the contract.',
  },
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
      <section className="section section--white" aria-labelledby="res-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">Deployment and data residency</p>
            <h2 id="res-title" className="h2">
              Choose <span className="hl">where it runs.</span>
            </h2>
          </div>
          <div className="res-table" role="table" aria-label="Deployment models" data-reveal>
            <div className="res-table__row res-table__row--head" role="row">
              <span role="columnheader">Model</span>
              <span role="columnheader">Where it runs</span>
              <span role="columnheader">When it fits</span>
            </div>
            {residency.map((r) => (
              <div key={r.model} className="res-table__row" role="row">
                <span role="cell" className="res-table__model">{r.model}</span>
                <span role="cell" data-label="Where it runs">{r.where}</span>
                <span role="cell" data-label="When it fits">{r.fits}</span>
              </div>
            ))}
          </div>
          <p className="source-note" data-reveal>
            Managed regions: the EU, the Middle East, North America and Asia. Language models through
            your own private endpoints or self-hosted components where required.
          </p>
        </div>
      </section>
      <section className="section section--paper" aria-labelledby="life-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">GDPR and the data lifecycle</p>
            <h2 id="life-title" className="h2">
              From first word <span className="hl">to deletion.</span>
            </h2>
          </div>
          <div className="caps caps--four" data-reveal>
            {lifecycle.map((x) => (
              <article key={x.t} className="cap">
                <h3>{x.t}</h3>
                <p>{x.b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--white" aria-labelledby="pfaq-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="kicker">Procurement questions</p>
            <h2 id="pfaq-title" className="h2">
              What security teams ask us
            </h2>
          </div>
          <div className="faq" data-reveal>
            {procurementFaq.map((f) => (
              <details key={f.q}>
                <summary>
                  {f.q}
                  <span className="plus" aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--paper" aria-labelledby="cert-title">
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
              <Link href="/technology">Technology</Link>. How the AI is governed:{' '}
              <Link href="/responsible-ai">Responsible AI</Link>.
            </p>
          </div>
        </div>
      </section>
      <CtaBand title={<>Bring your <span className="hl">security questionnaire.</span></>} body="We answer it with your deployment model in mind and document the data flow for your review." />
    </>
  )
}
