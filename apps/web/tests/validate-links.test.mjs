/**
 * Validates that every internal link `[text](/path)` or `href="/path"` in an MDX
 * file resolves to an existing MDX file in content/.
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const CONTENT = join(ROOT, 'content')

function walkMdx(dir) {
  const files = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) files.push(...walkMdx(full))
    else if (entry.endsWith('.mdx')) files.push(full)
  }
  return files
}

function resolveRouteToFile(route) {
  // Strip fragments (#anchor) and query strings
  const clean = route.split('#')[0].split('?')[0]
  // Strip leading /
  const path = clean.replace(/^\//, '')
  if (path === '') return join(CONTENT, 'index.mdx')
  // Try <path>.mdx
  const asFile = join(CONTENT, `${path}.mdx`)
  if (existsSync(asFile)) return asFile
  // Try <path>/index.mdx
  const asDir = join(CONTENT, path, 'index.mdx')
  if (existsSync(asDir)) return asDir
  return null
}

function extractInternalLinks(src) {
  const links = new Set()
  // Markdown [text](/path) — internal links only (start with /)
  for (const m of src.matchAll(/\[[^\]]*\]\((\/[^\s)]*)\)/g)) {
    links.add(m[1])
  }
  // JSX href="/path"
  for (const m of src.matchAll(/href=["'](\/[^"']*)["']/g)) {
    links.add(m[1])
  }
  return [...links]
}

const mdxFiles = walkMdx(CONTENT)

test('every internal link in every MDX file resolves to an existing page', () => {
  const violations = []
  for (const file of mdxFiles) {
    const src = readFileSync(file, 'utf-8')
    const links = extractInternalLinks(src)
    for (const link of links) {
      if (!resolveRouteToFile(link)) {
        violations.push(`${file.replace(ROOT + '/', '')}: ${link}`)
      }
    }
  }
  assert.deepEqual(violations, [], `Broken internal links:\n  ${violations.join('\n  ')}`)
})
