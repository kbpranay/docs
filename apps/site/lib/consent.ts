/** First-party consent cookie. "analytics" = visitor accepted analytics; "necessary" = declined. */
export type Consent = 'analytics' | 'necessary'
export const CONSENT_COOKIE = 'eb_consent'
export const OPEN_CONSENT_EVENT = 'eb-open-consent'
export const CONSENT_CHANGE_EVENT = 'eb-consent-change'

export function readConsent(): Consent | null {
  if (typeof document === 'undefined') return null
  const m = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=(analytics|necessary)`))
  return (m?.[1] as Consent) ?? null
}

export function writeConsent(value: Consent) {
  const maxAge = 60 * 60 * 24 * 180 // 6 months, then we ask again
  const secure = location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: value }))
}
