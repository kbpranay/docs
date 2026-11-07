import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Privacy notice',
  description:
    'How the Enterprise Bot website handles your data: demo requests, the live voice demo, cookies and your rights.',
  path: '/privacy',
})

export default function Privacy() {
  return (
    <section className="section section--paper prose-page" aria-labelledby="privacy-title">
      <div className="container prose">
        <p className="kicker">Privacy</p>
        <h1 id="privacy-title" className="h2" style={{ marginTop: 16 }}>
          Privacy notice for this website
        </h1>
        <p className="lede">This notice covers the demo request form and the live voice demo on this website.</p>

        <h2 id="controller">Who is responsible</h2>
        <p>Enterprise Bot, Dufourstrasse 22, 8008 Zurich, Switzerland.</p>

        <h2 id="demo-form">Demo requests</h2>
        <p>
          When you request a demo, we use your work email, company, interests and message to arrange and prepare the
          session. The details are stored in our CRM and kept only as long as needed for that purpose and any follow-up
          you agree to.
        </p>

        <h2 id="voice-demo">Live voice demo</h2>
        <p>
          The “Try a demo call” button asks your browser for microphone access only after you press start.
          During the call, your voice is streamed to our AI voice provider (Google Gemini, or OpenAI where configured) to
          generate the agent’s replies and captions. Calls are limited to two minutes. The website does not record or
          store the audio. Please do not share personal information: the scenario is fictional.
        </p>
        <p>
          To prevent misuse, we count demo calls per IP address in server memory for up to one hour; these counts are not
          stored permanently.
        </p>

        <h2 id="cookies">Cookies and analytics</h2>
        <p>This website currently sets no cookies and uses no analytics or advertising trackers.</p>

        <h2 id="rights">Your rights and contact</h2>
        <p>
          You can ask us about, correct or delete your data at any time via our{' '}
          <a href="https://www.enterprisebot.ai/contact-us">contact page</a>. Our full company privacy policy covers other
          processing.
        </p>
        <p className="source-note">Draft for review by Enterprise Bot’s privacy owner before launch.</p>
      </div>
    </section>
  )
}
