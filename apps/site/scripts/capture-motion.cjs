#!/usr/bin/env node
/**
 * Motion capture for design review.
 *
 * Captures timed frames of the hero scene (desktop + mobile), interaction
 * states, reduced-motion and no-JS stills, full pages, contact sheets and a
 * small metrics report, so a reviewer can judge motion from still images.
 *
 * Usage:  BASE_URL=http://localhost:3100 OUT_DIR=.captures/run1 node scripts/capture-motion.cjs
 * Needs a running server (npm run build && npm run start).
 */
const fs = require('fs')
const path = require('path')
const { chromium } = require('playwright')

const BASE = process.env.BASE_URL || 'http://localhost:3100'
const OUT = path.resolve(process.env.OUT_DIR || `.captures/${new Date().toISOString().replace(/[:.]/g, '-')}`)
fs.mkdirSync(OUT, { recursive: true })

const DESKTOP = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }
const MOBILE = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true }
const report = { base: BASE, out: OUT, frames: {}, checks: {}, metrics: {} }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/** Infinite CSS animations currently running inside the hero scene. */
function runningLoopsInScene() {
  const scene = document.querySelector('.scene')
  return document
    .getAnimations()
    .filter((a) => {
      const t = a.effect && a.effect.target
      return a.playState === 'running' && a.effect.getTiming().iterations === Infinity && t && scene.contains(t)
    })
    .map((a) => a.animationName || 'unknown')
}

async function progress(page) {
  return page.evaluate(() => {
    const el = document.querySelector('.scene')
    return el ? Number(el.__ebProgress || 0) : -1
  })
}

/** Wait until the scene timeline reaches `ms`, then screenshot. */
async function frameAt(page, ms, file, clip) {
  const deadline = Date.now() + 20000
  while ((await progress(page)) < ms && Date.now() < deadline) await sleep(25)
  const actual = Math.round(await progress(page))
  await page.screenshot({ path: path.join(OUT, file), clip })
  return { file, target: ms, actual }
}

async function sceneClip(page, pad = 24) {
  const box = await page.locator('.scene').boundingBox()
  return { x: Math.max(0, box.x - pad), y: Math.max(0, box.y - pad), width: box.width + pad * 2, height: box.height + pad * 2 }
}

async function scrollThrough(page) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < h; y += 500) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y)
    await sleep(140)
  }
  await sleep(700)
  await page.evaluate(() => window.scrollTo(0, 0))
  await sleep(300)
}

async function contactSheet(browser, title, frames, file, cols) {
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } })
  const cells = frames
    .map(
      (f) =>
        `<figure><img src="data:image/png;base64,${fs.readFileSync(path.join(OUT, f.file)).toString('base64')}"><figcaption>${f.label || ''} target ${(f.target / 1000).toFixed(1)}s · actual ${(f.actual / 1000).toFixed(2)}s</figcaption></figure>`,
    )
    .join('')
  await page.setContent(
    `<html><body style="margin:0;padding:24px;font:14px system-ui;background:#eee"><h1 style="font-size:18px;margin:0 0 16px">${title}</h1><div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:16px">${cells}</div><style>figure{margin:0;background:#fff;padding:8px;border-radius:8px}img{width:100%;display:block}figcaption{margin-top:6px;color:#333}</style></body></html>`,
    { waitUntil: 'load' },
  )
  await page.screenshot({ path: path.join(OUT, file), fullPage: true })
  await page.close()
}

;(async () => {
  const browser = await chromium.launch()
  // Pre-set the consent cookie so the banner does not cover captured frames.
  const consentCookie = [{ name: 'eb_consent', value: 'necessary', url: BASE }]
  const _newContext = browser.newContext.bind(browser)
  browser.newContext = async (opts) => {
    const c = await _newContext(opts)
    await c.addCookies(consentCookie)
    return c
  }
  browser.newPage = async (opts) => (await browser.newContext(opts)).newPage()

  // ---------- Desktop: hero timeline ----------
  {
    const ctx = await browser.newContext(DESKTOP)
    const page = await ctx.newPage()
    await page.addInitScript(() => {
      window.__cls = 0
      window.__lcp = 0
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value
      }).observe({ type: 'layout-shift', buffered: true })
      new PerformanceObserver((l) => {
        const e = l.getEntries().at(-1)
        if (e) window.__lcp = e.startTime
      }).observe({ type: 'largest-contentful-paint', buffered: true })
    })
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' })
    const clip = { x: 0, y: 0, width: 1440, height: 900 }
    const targets = [150, 1000, 1700, 2600, 3600, 5100, 6300, 8100, 9100, 10200, 11200, 12000]
    const frames = []
    for (const t of targets) frames.push({ ...(await frameAt(page, t, `d-hero-${String(t).padStart(5, '0')}.png`, clip)), label: 'Desktop' })
    await sleep(2000)
    await page.screenshot({ path: path.join(OUT, 'd-hero-rest.png'), clip })
    frames.push({ file: 'd-hero-rest.png', target: 14000, actual: 14000, label: 'Rest (+2s)' })
    report.frames.desktopHero = frames

    // Scene close-ups at the five beats
    const sc = await sceneClip(page)
    report.frames.sceneCloseup = sc

    // Controls: inspect a beat, then replay
    await page.getByRole('button', { name: 'Show step 3: Action' }).click()
    await sleep(600)
    await page.screenshot({ path: path.join(OUT, 'd-scene-inspect-action.png'), clip: await sceneClip(page) })
    await page.getByRole('button', { name: /Play the simulation|Replay the simulation/ }).click()
    await sleep(900)
    await page.screenshot({ path: path.join(OUT, 'd-scene-resume.png'), clip: await sceneClip(page) })

    // Off-screen pause / resume
    await page.getByRole('button', { name: /Pause the simulation/ }).click().catch(() => {})
    await page.getByRole('button', { name: 'Show step 1: Request' }).click()
    await page.getByRole('button', { name: /Play the simulation/ }).click()
    await sleep(400)
    await page.evaluate(() => window.scrollTo(0, 1600))
    await sleep(700)
    const p1 = await progress(page)
    await sleep(1000)
    const p2 = await progress(page)
    const loopsOffscreen = await page.evaluate(runningLoopsInScene)
    await page.evaluate(() => window.scrollTo(0, 0))
    await sleep(1200)
    const p3 = await progress(page)
    await page.getByRole('button', { name: /Pause the simulation/ }).click().catch(() => {})
    await sleep(300)
    const loopsPaused = await page.evaluate(runningLoopsInScene)
    report.checks.offscreenPause = {
      pausedWhileOffscreen: Math.abs(p2 - p1) < 1,
      resumedOnReturn: p3 > p2 + 300,
      infiniteLoopsRunningOffscreen: loopsOffscreen,
      infiniteLoopsRunningWhenPaused: loopsPaused,
      p1,
      p2,
      p3,
    }

    // Animated properties in use (should be opacity/transform-centric)
    report.checks.animatedProperties = await page.evaluate(() => {
      const props = new Set()
      for (const a of document.getAnimations()) {
        if (a.transitionProperty) props.add(a.transitionProperty)
        const eff = a.effect
        if (eff && eff.getKeyframes) for (const k of eff.getKeyframes()) Object.keys(k).forEach((p) => !['offset', 'easing', 'composite', 'computedOffset'].includes(p) && props.add(p))
      }
      return [...props]
    })

    // Full page with reveals triggered
    await scrollThrough(page)
    await page.screenshot({ path: path.join(OUT, 'd-full-home.png'), fullPage: true })

    // Journey tab switch frames
    const journey = page.locator('#journey')
    await journey.scrollIntoViewIfNeeded()
    await sleep(600)
    const jb = await journey.boundingBox()
    const jc = { x: 0, y: Math.max(0, jb.y), width: 1440, height: Math.min(jb.height, 900) }
    await page.getByRole('tab', { name: 'Email' }).click()
    const jframes = []
    for (const [i, ms] of [0, 120, 300, 700, 1300].entries()) {
      await sleep(i === 0 ? 0 : ms - [0, 120, 300, 700, 1300][i - 1])
      const f = `d-journey-email-${ms}.png`
      await page.screenshot({ path: path.join(OUT, f), clip: jc })
      jframes.push({ file: f, target: ms, actual: ms, label: 'Email tab +' })
    }
    report.frames.journey = jframes

    // Integration diagram flow
    const arch = page.locator('.arch')
    await arch.scrollIntoViewIfNeeded()
    await sleep(800)
    const ab = await arch.boundingBox()
    const ac = { x: 0, y: Math.max(0, ab.y - 40), width: 1440, height: Math.min(ab.height + 80, 900) }
    await page.screenshot({ path: path.join(OUT, 'd-arch-a.png'), clip: ac })
    await sleep(900)
    await page.screenshot({ path: path.join(OUT, 'd-arch-b.png'), clip: ac })

    // Mega menu
    await page.evaluate(() => window.scrollTo(0, 0))
    await sleep(300)
    await page.getByRole('button', { name: 'Platform' }).click()
    await sleep(400)
    await page.screenshot({ path: path.join(OUT, 'd-mega.png'), clip: { x: 0, y: 0, width: 1440, height: 520 } })
    report.checks.megaMenu = await page.evaluate(() => {
      const links = [...document.querySelectorAll('.mega a')]
      const overflow = links.filter((a) => a.scrollWidth > a.clientWidth + 1).length
      const rects = links.map((a) => a.getBoundingClientRect())
      let overlaps = 0
      for (let i = 0; i < rects.length; i++)
        for (let j = i + 1; j < rects.length; j++) {
          const a = rects[i], b = rects[j]
          if (a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1) overlaps++
        }
      return { links: links.length, overflow, overlaps, ok: overflow === 0 && overlaps === 0 }
    })

    report.metrics.desktop = await page.evaluate(() => {
      const res = performance.getEntriesByType('resource')
      const sum = (f) => res.filter(f).reduce((a, r) => a + (r.transferSize || 0), 0)
      return {
        cls: Number(window.__cls.toFixed(4)),
        lcpMs: Math.round(window.__lcp),
        jsKB: Math.round(sum((r) => r.name.endsWith('.js')) / 1024),
        fontKB: Math.round(sum((r) => r.name.includes('.woff2')) / 1024),
        totalKB: Math.round(sum(() => true) / 1024),
        requests: res.length,
      }
    })
    await ctx.close()
  }

  // ---------- Mobile ----------
  {
    const ctx = await browser.newContext(MOBILE)
    const page = await ctx.newPage()
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' })
    await sleep(600)
    await page.screenshot({ path: path.join(OUT, 'm-first-screen.png') })
    const startP = await progress(page)
    report.checks.mobileSceneWaitsUntilVisible = { progressBeforeScroll: Math.round(startP) }
    await page.locator('.scene').scrollIntoViewIfNeeded()
    await page.evaluate(() => {
      const r = document.querySelector('.scene').getBoundingClientRect()
      window.scrollBy(0, r.top - 84)
    })
    const frames = []
    for (const t of [300, 1800, 3500, 6200, 8800, 10600, 12000])
      frames.push({ ...(await frameAt(page, t, `m-scene-${String(t).padStart(5, '0')}.png`)), label: 'Mobile' })
    report.frames.mobileScene = frames
    report.checks.mobileScene = await page.evaluate(() => {
      const r = document.querySelector('.scene').getBoundingClientRect()
      return { sceneHeight: Math.round(r.height), top: Math.round(r.top), bottom: Math.round(r.bottom), fitsUnderHeader: r.top >= 72 && r.bottom <= window.innerHeight }
    })
    await scrollThrough(page)
    await page.screenshot({ path: path.join(OUT, 'm-full-home.png'), fullPage: true })
    await page.getByRole('button', { name: 'Open menu' }).click()
    await sleep(400)
    await page.screenshot({ path: path.join(OUT, 'm-menu.png') })
    await ctx.close()
  }

  // ---------- Phone-width overflow check ----------
  // Mobile emulation zooms out (and widens innerWidth) when content overflows,
  // so compare against the configured layout width, not window.innerWidth.
  const overflow = {}
  for (const width of [320, 360, 390]) {
    const ctx = await browser.newContext({ viewport: { width, height: 740 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true })
    const page = await ctx.newPage()
    for (const route of ['/', '/platform/voice-agent', '/platform/email-agent', '/demo']) {
      await page.goto(BASE + route, { waitUntil: 'networkidle' })
      overflow[`${width} ${route}`] = await page.evaluate((layoutWidth) => {
        // Page-level horizontal scroll, plus content that sticks out of the
        // viewport but is hidden by an overflow:hidden ancestor (clipped text).
        const vw = layoutWidth
        const clipped = []
        for (const el of document.querySelectorAll('main *, header *')) {
          // .marquee__row scrolls logos past its masked edge on purpose.
          if (el.closest('[aria-hidden="true"], .hero__waves, .mobile-menu, .marquee__row')) continue
          const r = el.getBoundingClientRect()
          if (r.width && r.right > vw + 1 && getComputedStyle(el).position !== 'fixed') {
            clipped.push((el.className && String(el.className).slice(0, 40)) || el.tagName)
          }
        }
        // Ellipsis truncation inside the hero scene (text cut but not overflowing).
        const truncated = []
        for (const el of document.querySelectorAll('.scene *')) {
          if (el.children.length === 0 && el.textContent.trim() && el.scrollWidth > el.clientWidth + 1 && el.clientWidth > 0) {
            truncated.push(el.textContent.trim().slice(0, 40))
          }
        }
        return {
          truncatedInScene: truncated,
          pageScroll: document.documentElement.scrollWidth - vw,
          innerWidth: window.innerWidth,
          clippedElements: clipped.length,
          examples: [...new Set(clipped)].slice(0, 8),
        }
      }, width)
    }
    await ctx.close()
  }
  report.checks.phoneOverflow = overflow
  report.checks.phoneOverflowOk = Object.values(overflow).every((o) => o.pageScroll <= 0 && o.innerWidth <= 390 && o.clippedElements === 0 && o.truncatedInScene.length === 0)

  // ---------- Desktop: nothing sticks out of its card ----------
  {
    const clipped = {}
    for (const w of [1000, 1280, 1440]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 })
      const page = await ctx.newPage()
      await page.goto(BASE + '/sitemap.xml')
      const routes = [...(await page.content()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname)
      const offenders = []
      for (const r of routes) {
        await page.goto(BASE + r, { waitUntil: 'networkidle' })
        const n = await page.evaluate(() => {
          let c = 0
          for (const box of document.querySelectorAll('.mode, .hub__card, .cap, .mini-scene, .scene, .market, .integration, .quote-card')) {
            const b = box.getBoundingClientRect()
            const cs = getComputedStyle(box)
            const right = b.right - parseFloat(cs.borderRightWidth)
            for (const el of box.querySelectorAll('*')) {
              if (el.closest('[aria-hidden="true"]')) continue
              const r = el.getBoundingClientRect()
              if (r.width && r.right > right + 1) c++
            }
          }
          return c
        })
        if (n) offenders.push({ route: r, elements: n })
      }
      clipped[w] = { ok: offenders.length === 0, routesChecked: routes.length, offenders }
      await ctx.close()
    }
    report.checks.desktopClipping = clipped
    report.checks.desktopClippingOk = Object.values(clipped).every((x) => x.ok)
  }

  // ---------- Scene fits common laptop screens (final state) ----------
  {
    const fits = {}
    for (const [w, h] of [[1366, 768], [1440, 900], [1536, 864]]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: 'reduce' })
      const page = await ctx.newPage()
      await page.goto(BASE + '/', { waitUntil: 'networkidle' })
      await sleep(300)
      if (w === 1366) await page.screenshot({ path: path.join(OUT, 'd-fold-1366x768.png') })
      fits[`${w}x${h}`] = await page.evaluate((vh) => {
        const scene = document.querySelector('.scene').getBoundingClientRect()
        const foot = document.querySelector('.scene__foot').getBoundingClientRect()
        const note = document.querySelector('.scene__note').getBoundingClientRect()
        return { sceneHeight: Math.round(scene.height), footBottom: Math.round(foot.bottom), noteBottom: Math.round(note.bottom), fits: foot.bottom <= vh }
      }, h)
      await ctx.close()
    }
    report.checks.sceneFitsFold = fits
  }

  // ---------- Reduced motion + no JS stills ----------
  for (const [name, opts] of [
    ['d-reduced', { ...DESKTOP, reducedMotion: 'reduce' }],
    ['m-reduced', { ...MOBILE, reducedMotion: 'reduce' }],
    ['d-nojs', { ...DESKTOP, javaScriptEnabled: false }],
  ]) {
    const ctx = await browser.newContext(opts)
    const page = await ctx.newPage()
    await page.goto(BASE + '/', { waitUntil: 'networkidle' })
    await sleep(500)
    if (name.startsWith('m')) await page.locator('.scene').scrollIntoViewIfNeeded()
    await page.screenshot({ path: path.join(OUT, `${name}-hero.png`) })
    if (name === 'd-reduced') {
      report.checks.reducedMotionRunningAnimations = await page.evaluate(
        () => document.getAnimations().filter((a) => a.playState === 'running' && a.effect && a.effect.getTiming().duration > 50).length,
      )
    }
    await ctx.close()
  }

  // ---------- Product + demo pages ----------
  {
    const ctx = await browser.newContext(DESKTOP)
    const page = await ctx.newPage()
    await page.goto(BASE + '/platform/voice-agent', { waitUntil: 'domcontentloaded' })
    await sleep(350)
    await page.screenshot({ path: path.join(OUT, 'd-voice-hero-0.4s.png') })
    await sleep(1600)
    await page.screenshot({ path: path.join(OUT, 'd-voice-hero-2s.png') })
    await scrollThrough(page)
    await page.screenshot({ path: path.join(OUT, 'd-full-voice-agent.png'), fullPage: true })
    await page.goto(BASE + '/demo', { waitUntil: 'networkidle' })
    await page.screenshot({ path: path.join(OUT, 'd-full-demo.png'), fullPage: true })
    await ctx.close()
  }

  await contactSheet(browser, 'Desktop hero timeline (1440×900)', report.frames.desktopHero, 'contact-desktop-hero.png', 3)
  await contactSheet(browser, 'Mobile scene timeline (390×844)', report.frames.mobileScene, 'contact-mobile-scene.png', 4)
  await contactSheet(browser, 'Journey: switch to Email tab', report.frames.journey, 'contact-journey.png', 3)

  await browser.close()
  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2))
  console.log(JSON.stringify({ out: OUT, checks: report.checks, metrics: report.metrics }, null, 2))
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
