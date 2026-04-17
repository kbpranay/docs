/**
 * Validates that every internal link `[text](/path)` or `href="/path"` in an MDX
 * file resolves to an existing MDX file in the SAME locale directory.
 *
 * Content is structured as content/{locale}/..., and all internal links use
 * English slugs (i18n middleware rewrites /path → /{locale}/path). So a link
 * like `/getting-started` in content/de/faq/index.mdx must resolve to
 * content/de/getting-started.mdx or content/de/getting-started/index.mdx.
 *
 * Images are excluded (paths ending in .png, .jpg, etc.).
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const CONTENT = join(ROOT, 'content')
const LOCALES = ['en', 'de', 'fr', 'es']
const IMAGE_EXT = /\.(png|jpg|jpeg|gif|svg|webp|ico)$/i

function walkMdx(dir) {
  if (!existsSync(dir)) return []
  const files = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) files.push(...walkMdx(full))
    else if (entry.endsWith('.mdx')) files.push(full)
  }
  return files
}

function localeOf(file) {
  // file is absolute path; first segment under CONTENT is the locale
  const rel = file.replace(CONTENT + '/', '')
  return rel.split('/')[0]
}

function resolveRouteToFile(route, locale) {
  const clean = route.split('#')[0].split('?')[0]
  const path = clean.replace(/^\//, '')
  const localeRoot = join(CONTENT, locale)
  if (path === '') return join(localeRoot, 'index.mdx')
  const asFile = join(localeRoot, `${path}.mdx`)
  if (existsSync(asFile)) return asFile
  const asDir = join(localeRoot, path, 'index.mdx')
  if (existsSync(asDir)) return asDir
  return null
}

function extractInternalLinks(src) {
  const links = new Set()
  // Markdown [text](/path) — EXCLUDE images (leading `!`) and image file extensions
  for (const m of src.matchAll(/(?<!!)\[[^\]]*\]\((\/[^\s)]*)\)/g)) {
    if (!IMAGE_EXT.test(m[1])) links.add(m[1])
  }
  // JSX href="/path"
  for (const m of src.matchAll(/href=["'](\/[^"']*)["']/g)) {
    if (!IMAGE_EXT.test(m[1])) links.add(m[1])
  }
  return [...links]
}

test('every internal link resolves inside its locale', () => {
  const violations = []
  for (const locale of LOCALES) {
    const files = walkMdx(join(CONTENT, locale))
    for (const file of files) {
      const src = readFileSync(file, 'utf-8')
      const links = extractInternalLinks(src)
      for (const link of links) {
        if (!resolveRouteToFile(link, locale)) {
          violations.push(`${file.replace(ROOT + '/', '')}: ${link}`)
        }
      }
    }
  }
  assert.deepEqual(violations, [], `Broken internal links:\n  ${violations.join('\n  ')}`)
})
