import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="section section--paper not-found">
      <div>
        <p className="kicker">404</p>
        <h1 className="h2" style={{ margin: '16px auto 24px' }}>This page doesn’t exist.</h1>
        <Link className="btn btn--primary" href="/">Back to the homepage</Link>
      </div>
    </section>
  )
}
