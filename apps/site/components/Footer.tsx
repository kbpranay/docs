import Link from 'next/link'
import { offices, site } from '@/content/site'
import { products } from '@/content/products'

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
