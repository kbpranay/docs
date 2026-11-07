// Static checks for claims, links, copy guardrails and colour contrast.
// Run with: npm test   (no build or browser needed)
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => readFileSync(join(root, p), 'utf8')

function walk(dir, exts) {
  const out = []
  for (const name of readdirSync(join(root, dir))) {
    const rel = join(dir, name)
    const st = statSync(join(root, rel))
    if (st.isDirectory()) out.push(...walk(rel, exts))
    else if (exts.some((e) => name.endsWith(e))) out.push(rel)
  }
  return out
}

const sourceFiles = [...walk('app', ['.tsx', '.ts']), ...walk('components', ['.tsx']), ...walk('content', ['.ts'])]
const visibleFiles = sourceFiles.filter((f) => !f.endsWith('claims.ts'))

test('percentages and customer metrics only come from the claims register', () => {
  for (const f of visibleFiles) {
    const text = read(f)
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '')
      // CSS-in-JS widths and keyframe percentages are not claims
      .replace(/['"`][\d.]+%['"`]/g, '')
      // margins such as IntersectionObserver rootMargin '0px 0px -12% 0px'
      .replace(/['"`][^'"`\n]*\dpx[^'"`\n]*['"`]/g, '')
      .replace(/(width|height|top|left|right|bottom|inset|translate[XY]?|flex|max|min|calc)\([^)]*%[^)]*\)/g, '')
    const hits = text.match(/\b\d{1,3}(?:[.,]\d+)?\s?%/g) || []
    assert.deepEqual(hits, [], `${f} contains a hard-coded percentage: ${hits.join(', ')}`)
  }
})

test('no unsupported superlatives, guarantees or certification claims in visible copy', () => {
  const banned = [
    /best[- ]in[- ]class/i,
    /world'?s? (leading|best|first)/i,
    /\bleading provider\b/i,
    /\bguarantee/i,
    /\b100\s?%/,
    /\bgdpr[- ]compliant\b/i,
    /fully autonomous/i,
    /self[- ]improving/i,
    /\bunlimited\b/i,
    /\bnumber one\b|#1\b/i,
    /lorem ipsum/i,
  ]
  for (const f of visibleFiles) {
    const text = read(f)
    for (const re of banned) assert.ok(!re.test(text), `${f} matches banned pattern ${re}`)
    // Certifications may only be stated on the security page, with their real status.
    if (f !== 'app/security/page.tsx') {
      assert.ok(!/\b(iso\s?27001|soc ?2)\b/i.test(text), `${f} mentions a certification outside the security page`)
    }
  }
  const sec = read('app/security/page.tsx')
  assert.match(sec, /ISO 27001:2022<\/span>\s*<span>Certification audit in progress/, 'ISO 27001 must be stated as in progress')
})

test('every claim records its source, observed date and launch check', () => {
  const claims = read('content/claims.ts')
  const blocks = claims.split(/\n\s{2}\w+: \{\n/).slice(1)
  assert.ok(blocks.length >= 6, 'expected at least six claims')
  for (const b of blocks) {
    const body = b.split('\n  },')[0]
    assert.match(body, /source:/, 'claim missing source')
    assert.match(body, /observed:/, 'claim missing observed date')
    assert.match(body, /reviewBeforeLaunch:/, 'claim missing launch check')
  }
  assert.match(claims, /reviewBeforeLaunch: 'Confirm logo\/name permission/, 'proof row needs a permission check')
})

test('internal links resolve to real routes or anchors', () => {
  const slugs = [...read('content/products.ts').matchAll(/slug: '([a-z-]+)'/g)].map((m) => m[1])
  const home = read('app/page.tsx')
  const anchors = new Set([...home.matchAll(/id="([a-z-]+)"/g)].map((m) => m[1]))
  const intSlugs = [...read('content/integrations.ts').matchAll(/slug: '([a-z-]+)'/g)].map((m) => m[1])
  const staticPages = readdirSync(join(root, 'app'), { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('[') && d.name !== 'api')
    .filter((d) => { try { statSync(join(root, 'app', d.name, 'page.tsx')); return true } catch { return false } })
    .map((d) => `/${d.name}`)
  const routes = new Set(['/', ...staticPages, ...slugs.map((s) => `/platform/${s}`), ...intSlugs.map((s) => `/integrations/${s}`)])
  const hrefs = []
  for (const f of sourceFiles) {
    for (const m of read(f).matchAll(/href[:=]\s*[{]?\s*['"`]([^'"`]+)['"`]/g)) hrefs.push([f, m[1]])
  }
  assert.ok(hrefs.length > 10, 'expected to find links')
  for (const [f, href] of hrefs) {
    if (/^(https?:|mailto:|#main$)/.test(href) || href.includes('${')) continue
    const [path, hash] = href.split('#')
    if (path === '/privacy') continue
    assert.ok(routes.has(path || '/'), `${f}: unknown route ${href}`)
    if (hash && (path === '/' || path === '')) assert.ok(anchors.has(hash), `${f}: missing anchor #${hash}`)
  }
})

test('product pages follow the template', () => {
  const src = read('content/products.ts')
  const count = (re) => (src.match(re) || []).length
  const n = count(/\n    slug: '/g)
  assert.equal(n, 6, 'expected six products')
  for (const key of ['title:', 'intro:', 'problem:', 'workflow:', 'capabilities:', 'fit:', 'faq:', 'visual:']) {
    assert.equal(count(new RegExp(`\\n    ${key}`, 'g')), n, `every product needs ${key}`)
  }
  assert.equal(count(/\n    title: \[[^\n]*\{ hl: '/g), n, 'every product title needs a highlighted phrase')
})

test('text colour pairs meet WCAG AA', () => {
  const lum = (hex) => {
    const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
  }
  const ratio = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p)
    return (x + 0.05) / (y + 0.05)
  }
  const css = read('app/globals.css')
  const token = (name) => css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`))[1]
  const pairs = [
    ['ink', 'paper'], ['ink', 'white'], ['ink-2', 'paper'], ['ink-2', 'white'], ['ink-2', 'mist'],
    ['orange-ink', 'paper'], ['orange-ink', 'white'],
    ['on-dark', 'navy'], ['on-dark-2', 'navy'], ['on-dark-3', 'navy'], ['orange', 'navy'],
    ['navy', 'orange'], // primary button text
  ]
  for (const [fg, bg] of pairs) {
    const r = ratio(token(fg), token(bg))
    assert.ok(r >= 4.5, `--${fg} on --${bg} is ${r.toFixed(2)}:1 (needs 4.5:1)`)
  }
  // Large display text only (h1/h2 highlights, big stats): WCAG AA large is 3:1.
  for (const [fg, bg] of [['orange-display', 'paper'], ['orange-display', 'white']]) {
    const r = ratio(token(fg), token(bg))
    assert.ok(r >= 3, `--${fg} on --${bg} is ${r.toFixed(2)}:1 (needs 3:1 for large text)`)
  }
})

test('motion respects reduced-motion and only animates cheap properties', () => {
  const css = read('app/globals.css')
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/)
  const keyframes = [...css.matchAll(/@keyframes [\w-]+ \{([\s\S]*?)\n\}/g)].map((m) => m[1])
  for (const k of keyframes) {
    const props = [...k.matchAll(/^\s+([a-z-]+):/gm)].map((m) => m[1])
    for (const p of props) assert.ok(['opacity', 'transform', 'stroke-dashoffset', 'border-color'].includes(p), `keyframe animates ${p}`)
  }
  const scene = read('components/HeroScene.tsx')
  assert.match(scene, /prefers-reduced-motion: reduce/, 'hero scene must honour reduced motion')
  assert.match(scene, /IntersectionObserver/, 'hero scene must pause off screen')
  assert.match(scene, /visibilitychange/, 'hero scene must pause in background tabs')
})
