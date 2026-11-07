#!/usr/bin/env node
/**
 * Automated WCAG 2.2 AA audit (axe-core) of every route, desktop and mobile,
 * plus a keyboard check that every focusable element shows a visible focus.
 * Usage: BASE_URL=http://localhost:3100 node scripts/a11y.cjs
 * Exit code 1 if any violation is found.
 */
const fs = require('fs')
const path = require('path')
const { chromium } = require('playwright')

const BASE = process.env.BASE_URL || 'http://localhost:3100'
const axeSource = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8')

async function routes(page) {
  await page.goto(BASE + '/sitemap.xml')
  const xml = await page.content()
  const list = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname)
  return [...new Set(['/', ...list, '/does-not-exist'])]
}

;(async () => {
  const browser = await chromium.launch()
  const results = []
  const ctxD = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const all = await routes(await ctxD.newPage())
  for (const [name, opts] of [
    ['desktop', { viewport: { width: 1440, height: 900 } }],
    ['mobile', { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }],
  ]) {
    const ctx = await browser.newContext({ ...opts, reducedMotion: 'reduce' })
    const page = await ctx.newPage()
    for (const r of all) {
      await page.goto(BASE + r, { waitUntil: 'networkidle' })
      await page.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((e) => e.classList.add('is-visible')))
      await page.waitForTimeout(300)
      await page.addScriptTag({ content: axeSource })
      const res = await page.evaluate(async () =>
        // eslint-disable-next-line no-undef
        axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] } }),
      )
      for (const v of res.violations)
        results.push({ view: name, route: r, id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.slice(0, 3).map((n) => n.target.join(' ')) })
    }
    await ctx.close()
  }

  // Keyboard: tab through the homepage; every focused element must have a visible outline or box-shadow.
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage()
  await page.goto(BASE + '/', { waitUntil: 'networkidle' })
  const noFocus = []
  for (let i = 0; i < 60; i++) {
    await page.keyboard.press('Tab')
    const info = await page.evaluate(() => {
      const el = document.activeElement
      if (!el || el === document.body) return null
      const cs = getComputedStyle(el)
      const visible = (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== 'none'
      return { tag: el.tagName, text: (el.textContent || '').trim().slice(0, 40), visible }
    })
    if (info && !info.visible) noFocus.push(info)
  }
  await browser.close()

  const out = { routes: all, violations: results, focusWithoutIndicator: noFocus }
  fs.mkdirSync('.captures', { recursive: true })
  fs.writeFileSync(path.join('.captures', 'a11y-report.json'), JSON.stringify(out, null, 2))
  console.log(JSON.stringify({ routes: all.length, violations: results.length, focusWithoutIndicator: noFocus.length, sample: results.slice(0, 12) }, null, 2))
  process.exit(results.length || noFocus.length ? 1 : 0)
})().catch((e) => {
  console.error(e)
  process.exit(2)
})
