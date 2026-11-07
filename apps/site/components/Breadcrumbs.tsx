import Link from 'next/link'
import { breadcrumbLd, JsonLd, type Crumb } from '@/lib/seo'

/** Visible breadcrumb trail plus BreadcrumbList structured data. The last crumb is the current page. */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <nav aria-label="Breadcrumb" className="crumbs">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          {crumbs.map((c, i) => (
            <li key={c.href}>
              {i === crumbs.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.href}>{c.name}</Link>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
