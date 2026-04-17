/**
 * Validates that every nextra/components import in content/ MDX files
 * is a real named export — not undefined at runtime.
 *
 * Approach: static analysis — parse MDX imports vs. the nextra type declarations.
 * Run: node --test tests/validate-components.test.mjs
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')

// ── 1. Extract valid exports from nextra/components type declarations ───────
const typeDefsPath = join(ROOT, 'node_modules/nextra/dist/client/components/index.d.ts')
const typeDefs = readFileSync(typeDefsPath, 'utf-8')

// Each export looks like: export { Cards } from './cards.js';
const VALID_NEXTRA_EXPORTS = new Set(
  [...typeDefs.matchAll(/^export \{ (\w+)(?:,\s*\w+)* \} from/gm)]
    .flatMap(m => m[0].match(/\{ ([^}]+) \}/)[1].split(',').map(s => s.trim()))
)

// ── 2. Walk content/ and collect MDX files ───────────────────────────────────
function walkMdx(dir) {
  const files = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) files.push(...walkMdx(full))
    else if (entry.endsWith('.mdx')) files.push(full)
  }
  return files
}

const mdxFiles = walkMdx(join(ROOT, 'content'))

// ── 3. Parse imports from nextra/components in each file ────────────────────
// Returns Map<filePath, string[]> of named imports
function extractNextraImports(files) {
  const imports = new Map()
  for (const file of files) {
    const src = readFileSync(file, 'utf-8')
    const match = src.match(/import\s*\{([^}]+)\}\s*from\s*['"]nextra\/components['"]/)
    if (!match) continue
    const names = match[1].split(',').map(s => s.trim()).filter(Boolean)
    imports.set(file.replace(ROOT + '/', ''), names)
  }
  return imports
}

const allImports = extractNextraImports(mdxFiles)

// ── 4. Tests ─────────────────────────────────────────────────────────────────

test('nextra/components type declarations are readable', () => {
  assert.ok(VALID_NEXTRA_EXPORTS.size > 0, 'Should have parsed at least one export')
})

test('Callout, Steps, Tabs, Cards are valid named exports', () => {
  for (const name of ['Callout', 'Steps', 'Tabs', 'Cards']) {
    assert.ok(VALID_NEXTRA_EXPORTS.has(name), `${name} should be a valid export`)
  }
})

test('Card is NOT a standalone named export from nextra/components', () => {
  // Card is only accessible as Cards.Card — importing { Card } gives undefined at runtime.
  assert.equal(VALID_NEXTRA_EXPORTS.has('Card'), false,
    'Card should not be a standalone named export — use Cards.Card instead')
})

test('no MDX file imports { Card } as a standalone named export', () => {
  const violations = []
  for (const [file, names] of allImports) {
    if (names.includes('Card')) violations.push(file)
  }
  assert.deepEqual(violations, [],
    `These files import { Card } which is undefined at runtime:\n  ${violations.join('\n  ')}\n` +
    `Use <Cards.Card> in JSX instead of importing Card separately.`)
})

test('all nextra/components imports in content/ are valid exports', () => {
  const violations = []
  for (const [file, names] of allImports) {
    for (const name of names) {
      if (!VALID_NEXTRA_EXPORTS.has(name)) {
        violations.push(`${file}: { ${name} }`)
      }
    }
  }
  assert.deepEqual(violations, [],
    `Invalid nextra/components imports found:\n  ${violations.join('\n  ')}`)
})
