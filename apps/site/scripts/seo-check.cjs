/** Per-route SEO basics: one H1, title and description length, canonical, OG, alt text, structured data. */
const { chromium } = require('playwright')
const BASE = process.argv[2] || 'http://localhost:3100'
;(async () => {
  const b = await chromium.launch()
  const p = await b.newPage()
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text()
  const routes = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname)
  const issues = []
  for (const r of routes) {
    const res = await p.goto(BASE + r)
    const d = await p.evaluate(() => ({
      h1: document.querySelectorAll('h1').length,
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.content || '',
      canonical: document.querySelector('link[rel="canonical"]')?.href || '',
      ogTitle: document.querySelector('meta[property="og:title"]')?.content || '',
      ogImage: document.querySelector('meta[property="og:image"]')?.content || '',
      noAlt: [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).length,
      ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { const j = JSON.parse(s.textContent); return j['@type'] } catch { return 'INVALID' } }),
    }))
    const f = []
    if (res.status() !== 200) f.push(`status ${res.status()}`)
    if (d.h1 !== 1) f.push(`${d.h1} h1`)
    if (d.title.length > 65) f.push(`title ${d.title.length} chars`)
    if (d.desc.length < 70 || d.desc.length > 170) f.push(`description ${d.desc.length} chars`)
    if (!d.canonical) f.push('no canonical')
    if (!d.ogTitle || !d.ogImage) f.push('missing og')
    if (d.noAlt) f.push(`${d.noAlt} img without alt`)
    if (d.ld.includes('INVALID')) f.push('invalid JSON-LD')
    issues.push({ route: r, ld: d.ld.join(','), issues: f.join('; ') || 'ok' })
  }
  await b.close()
  console.table(issues)
})()
