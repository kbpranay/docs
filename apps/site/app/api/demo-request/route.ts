import { NextResponse } from 'next/server'

/**
 * Demo requests go to HubSpot's Forms submission API when configured.
 * Without configuration (preview builds) the route says so plainly instead of
 * pretending a lead was delivered.
 *
 * Env: HUBSPOT_PORTAL_ID, HUBSPOT_FORM_ID
 */

const MAX = 2000
const clean = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ message: 'Invalid request.' }, { status: 400 })
  }

  const email = clean(body.email)
  const company = clean(body.company)
  const interest = clean(body.interest)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !company || !interest) {
    return NextResponse.json({ message: 'Please complete the required fields.' }, { status: 400 })
  }

  const portal = process.env.HUBSPOT_PORTAL_ID
  const form = process.env.HUBSPOT_FORM_ID
  if (!portal || !form) {
    return NextResponse.json(
      { message: 'This preview is not connected to the CRM yet, so your request was not sent.' },
      { status: 503 },
    )
  }

  const fields = [
    ['email', email],
    ['company', company],
    ['demo_interest', interest],
    ['contact_center_platform', clean(body.platform)],
    ['languages_markets', clean(body.market)],
    ['message', clean(body.message, MAX)],
  ]
    .filter(([, v]) => v)
    .map(([name, value]) => ({ name, value }))

  const res = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portal}/${form}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ fields, context: { pageUri: clean(body.page, 300), pageName: 'Book a tailored demo' } }),
  })
  if (!res.ok) {
    return NextResponse.json({ message: 'We could not send your request. Please try again.' }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
