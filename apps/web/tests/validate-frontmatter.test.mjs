/**
 * Validates that every .mdx file in content/ has `title` and `description`
 * in YAML frontmatter — required for good SEO and Nextra's page metadata.
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'
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

function parseFrontmatter(src) {
  const match = src.match(/^---\r?\n([\s\S]+?)\r?\n---/)
  if (!match) return null
  const fields = {}
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.+)$/)
    if (kv) fields[kv[1]] = kv[2].trim()
  }
  return fields
}

const mdxFiles = walkMdx(CONTENT)

test('every MDX file has YAML frontmatter', () => {
  const violations = []
  for (const file of mdxFiles) {
    const src = readFileSync(file, 'utf-8')
    if (!parseFrontmatter(src)) {
      violations.push(file.replace(ROOT + '/', ''))
    }
  }
  assert.deepEqual(violations, [], `MDX files missing frontmatter:\n  ${violations.join('\n  ')}`)
})

test('every MDX file has a non-empty title', () => {
  const violations = []
  for (const file of mdxFiles) {
    const src = readFileSync(file, 'utf-8')
    const fm = parseFrontmatter(src)
    if (!fm || !fm.title || fm.title.length < 3) {
      violations.push(file.replace(ROOT + '/', ''))
    }
  }
  assert.deepEqual(violations, [], `MDX files missing/short title:\n  ${violations.join('\n  ')}`)
})

test('every MDX file has a non-empty description', () => {
  const violations = []
  for (const file of mdxFiles) {
    const src = readFileSync(file, 'utf-8')
    const fm = parseFrontmatter(src)
    if (!fm || !fm.description || fm.description.length < 10) {
      violations.push(file.replace(ROOT + '/', ''))
    }
  }
  assert.deepEqual(violations, [], `MDX files missing/short description:\n  ${violations.join('\n  ')}`)
})
