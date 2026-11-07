'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { CONSENT_CHANGE_EVENT, OPEN_CONSENT_EVENT, readConsent, writeConsent, type Consent } from '@/lib/consent'

/**
 * Consent banner plus consent-gated analytics. Nothing optional loads until the
 * visitor chooses "Accept analytics". The footer "Cookie settings" button reopens it.
 */
export function ConsentBanner() {
  const [consent, setConsent] = useState<Consent | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const c = readConsent()
    setConsent(c)
    if (!c) setOpen(true)
    const onOpen = () => setOpen(true)
    const onChange = (e: Event) => setConsent((e as CustomEvent<Consent>).detail)
    window.addEventListener(OPEN_CONSENT_EVENT, onOpen)
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange)
    return () => {
      window.removeEventListener(OPEN_CONSENT_EVENT, onOpen)
      window.removeEventListener(CONSENT_CHANGE_EVENT, onChange)
    }
  }, [])

  const choose = (c: Consent) => {
    writeConsent(c)
    setOpen(false)
  }

  return (
    <>
      {consent === 'analytics' && <Analytics />}
      {open && (
        <section className="consent" role="region" aria-label="Cookie consent">
          <div className="consent__inner">
            <p>
              We use a cookie to remember your choice and, only if you accept, privacy-friendly analytics to see which
              pages help visitors. No advertising trackers. <Link href="/privacy#cookies">Privacy notice</Link>
            </p>
            <div className="consent__actions">
              <button type="button" className="btn btn--ghost" onClick={() => choose('necessary')}>
                Necessary only
              </button>
              <button type="button" className="btn btn--primary" onClick={() => choose('analytics')}>
                Accept analytics
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

/** Footer button that reopens the consent banner. */
export function CookieSettingsButton() {
  return (
    <button type="button" className="footer-link-button" onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}>
      Cookie settings
    </button>
  )
}
