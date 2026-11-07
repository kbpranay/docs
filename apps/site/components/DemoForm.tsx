'use client'

import { useState, type FormEvent } from 'react'
import { Arrow } from './Icons'

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'ok' } | { kind: 'info' | 'error'; message: string }

const interests = ['Voice Agent', 'Quality Assessment', 'Live Translate', 'Agent Assist', 'Conversation Analytics', 'Email Agent', 'Chat Agent', 'Not sure yet']
const platforms = ['Genesys Cloud', 'Cisco', 'Salesforce', 'Other / none']

export function DemoForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>
    const next: Record<string, string> = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? '')) next.email = 'Enter your work email.'
    if (!(data.company ?? '').trim()) next.company = 'Enter your company.'
    if (!data.interest) next.interest = 'Choose what you want to see.'
    setErrors(next)
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus()
      return
    }
    setStatus({ kind: 'sending' })
    try {
      const res = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...data, page: window.location.pathname }),
      })
      const body = (await res.json().catch(() => ({}))) as { message?: string }
      if (res.ok) {
        setStatus({ kind: 'ok' })
        form.reset()
      } else if (res.status === 503) {
        setStatus({ kind: 'info', message: body.message ?? 'Form delivery is not connected in this preview.' })
      } else {
        setStatus({ kind: 'error', message: body.message ?? 'Something went wrong. Please try again.' })
      }
    } catch {
      setStatus({ kind: 'error', message: 'Network error. Please try again.' })
    }
  }

  const err = (k: string) =>
    errors[k] ? (
      <span className="error" id={`${k}-error`}>
        {errors[k]}
      </span>
    ) : null

  return (
    <form className="form-card" onSubmit={onSubmit} noValidate aria-describedby="form-note">
      <div className="form-grid">
        <div className="field full">
          <label htmlFor="email">Work email</label>
          <input id="email" name="email" type="email" autoComplete="email" required
            aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
          {err('email')}
        </div>
        <div className="field">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" autoComplete="organization" required
            aria-invalid={!!errors.company} aria-describedby={errors.company ? 'company-error' : undefined} />
          {err('company')}
        </div>
        <div className="field">
          <label htmlFor="interest">What do you want to see?</label>
          <select id="interest" name="interest" defaultValue="" required
            aria-invalid={!!errors.interest} aria-describedby={errors.interest ? 'interest-error' : undefined}>
            <option value="" disabled>Choose one</option>
            {interests.map((i) => <option key={i}>{i}</option>)}
          </select>
          {err('interest')}
        </div>
        <div className="field">
          <label htmlFor="platform">Contact center platform <span className="opt">(optional)</span></label>
          <select id="platform" name="platform" defaultValue="">
            <option value="">Choose one</option>
            {platforms.map((i) => <option key={i}>{i}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="market">Languages or markets <span className="opt">(optional)</span></label>
          <input id="market" name="market" placeholder="e.g. German, French; Switzerland" />
        </div>
        <div className="field full">
          <label htmlFor="message">Anything we should know? <span className="opt">(optional)</span></label>
          <textarea id="message" name="message" />
        </div>
        <div className="full" style={{ display: 'grid', gap: 12 }}>
          <button className="btn btn--primary" type="submit" disabled={status.kind === 'sending'}>
            {status.kind === 'sending' ? 'Sending…' : 'Request my demo'} <Arrow />
          </button>
          <p className="form-note" id="form-note">
            We use these details to arrange your demo. <a href="/privacy#demo-form">Privacy</a>
          </p>
        </div>
      </div>
      <div aria-live="polite">
        {status.kind === 'ok' && <p className="form-status form-status--ok">Thank you. We’ve received your request and will be in touch to arrange the session.</p>}
        {status.kind === 'info' && <p className="form-status form-status--info">{status.message}</p>}
        {status.kind === 'error' && <p className="form-status form-status--error">{status.message}</p>}
      </div>
    </form>
  )
}
