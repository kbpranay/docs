import Link from 'next/link'
import { offices, site } from '@/content/site'
import { integrations } from '@/content/integrations'
import { products } from '@/content/products'
import { industries } from '@/content/industries'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <img src="/eb-logo-on-dark.svg" alt="Enterprise Bot" width={168} height={26} loading="lazy" />
            <p style={{ marginTop: 18, maxWidth: '32ch' }}>
              Contact center automation for voice, email and chat, connected to the systems you already run.
            </p>
            <p style={{ marginTop: 18 }}>
              <Link href={site.primaryCta.href}>{site.primaryCta.label} →</Link>
            </p>
          </div>
          <div className="footer-links">
            <div>
              <h2>Platform</h2>
              <ul>
                {products.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/platform/${p.slug}`}>{p.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Integrations</h2>
              <ul>
                {integrations.map((i) => (
                  <li key={i.slug}>
                    <Link href={`/integrations/${i.slug}`}>{i.name}</Link>
                  </li>
                ))}
              </ul>
              <h2 style={{ marginTop: 28 }}>Industries</h2>
              <ul>
                {industries.map((i) => (
                  <li key={i.slug}>
                    <Link href={`/industries/${i.slug}`}>{i.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Company</h2>
              <ul>
                <li><Link href="/about">About us</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/technology">Technology</Link></li>
                <li><Link href="/languages">Languages</Link></li>
                <li><Link href="/security">Security and data</Link></li>
                <li><Link href="/responsible-ai">Responsible AI</Link></li>
                <li><Link href="/customers">Customer stories</Link></li>
                <li><Link href="/pricing">How pricing works</Link></li>
                <li><Link href="/evaluation">Pilot and evaluation</Link></li>
                <li><Link href="/implementation">Implementation and support</Link></li>
                <li><Link href="/resources">Resources</Link></li>
                <li><Link href="/privacy">Privacy</Link></li>
                <li><a href="https://www.enterprisebot.ai/impressum">Imprint</a></li>
              </ul>
            </div>
          </div>
          <div>
            <h2>Offices</h2>
            <div className="offices">
              {offices.map((o) => (
                <p key={o.city}>
                  <b>{o.city}</b>
                  <span>{o.address}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="site-footer__base">
          <span>© {new Date().getFullYear()} Enterprise Bot</span>
          <span>Simulations and sample scorecards on this site use synthetic data.</span>
        </div>
      </div>
    </footer>
  )
}
