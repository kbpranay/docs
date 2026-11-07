/**
 * Cross-link audit: for every sitemap route, count in-content internal links
 * (header and footer excluded) going out, and how many pages link in.
 * Usage: node scripts/links.cjs [baseUrl]
 */
const { chromium } = require('playwright')
const BASE = process.argv[2] || 'http://localhost:3100'
;(async () => {
  const b = await chromium.launch()
  const p = await b.newPage()
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text()
  const routes = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname)
  const out = {}
  const inb = Object.fromEntries(routes.map((r) => [r, new Set()]))
  for (const r of routes) {
    await p.goto(BASE + r)
    const links = await p.evaluate(() =>
      [...document.querySelectorAll('main a[href]')]
        .map((a) => a.getAttribute('href'))
        .filter((h) => h && h.startsWith('/') && !h.startsWith('//'))
        .map((h) => h.split('#')[0] || '/'),
    )
    const uniq = [...new Set(links.filter((h) => h !== r))]
    out[r] = uniq
    for (const h of uniq) if (inb[h]) inb[h].add(r)
  }
  await b.close()
  const rows = routes.map((r) => ({ route: r, out: out[r].length, in: inb[r].size }))
  rows.sort((a, z) => a.in - z.in)
  console.table(rows)
  const weak = rows.filter((x) => x.route !== '/demo' && (x.in < 3 || x.out < 3))
  console.log(JSON.stringify({ weak }, null, 1))
})()
