/**
 * Validates that every MDX file in a directory is listed in that directory's
 * _meta.ts file — otherwise Nextra won't show it in the sidebar.
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, resolve, basename } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const CONTENT = join(ROOT, 'content')

function extractMetaKeys(metaSrc) {
  // Crude but effective: extract `key` or `'key'` before a `:` inside the default export
  const body = metaSrc.match(/export\s+default\s*\{([\s\S]+)\}/)
  if (!body) return []
  const keys = new Set()
  for (const m of body[1].matchAll(/(?:^|[,{\s])['"]?([\w-]+)['"]?\s*:/g)) {
    keys.add(m[1])
  }
  return [...keys]
}

function walkDirs(dir) {
  const dirs = [dir]
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) dirs.push(...walkDirs(full))
  }
  return dirs
}

const dirs = walkDirs(CONTENT)

test('every content directory has a _meta.ts file', () => {
  const violations = []
  for (const dir of dirs) {
    if (!existsSync(join(dir, '_meta.ts'))) {
      // Allow directories with no .mdx files to skip
      const hasMdx = readdirSync(dir).some(e => e.endsWith('.mdx'))
      if (hasMdx) violations.push(dir.replace(ROOT + '/', ''))
    }
  }
  assert.deepEqual(violations, [], `Directories with MDX but no _meta.ts:\n  ${violations.join('\n  ')}`)
})

test('every MDX file is listed in its directory _meta.ts', () => {
  const violations = []
  for (const dir of dirs) {
    const metaPath = join(dir, '_meta.ts')
    if (!existsSync(metaPath)) continue
    const meta = readFileSync(metaPath, 'utf-8')
    const keys = extractMetaKeys(meta)
    const mdxFiles = readdirSync(dir).filter(f => f.endsWith('.mdx'))
    for (const mdx of mdxFiles) {
      const slug = basename(mdx, '.mdx')
      if (!keys.includes(slug)) {
        violations.push(`${dir.replace(ROOT + '/', '')}/${mdx} (missing key '${slug}' in _meta.ts)`)
      }
    }
  }
  assert.deepEqual(violations, [], `MDX files not listed in _meta.ts:\n  ${violations.join('\n  ')}`)
})
