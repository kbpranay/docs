import Link from 'next/link'
import { related, routeLabels } from '@/content/related'

/** Short "Related" strip above the closing CTA. */
export function Related({ route, extra = [] }: { route: string; extra?: string[] }) {
  const links = [...(related[route] ?? []), ...extra].filter((h, i, a) => a.indexOf(h) === i && h !== route)
  if (!links.length) return null
  return (
    <nav className="related" aria-label="Related pages">
      <div className="container related__inner">
        <span className="related__label">Related</span>
        <ul>
          {links.map((h) => (
            <li key={h}>
              <Link href={h}>{routeLabels[h] ?? h} →</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
