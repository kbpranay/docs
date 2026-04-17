/**
 * Validates that the major sections of the source AIDA User Manual each have
 * at least one MDX page covering them. This is a coarse "are we missing a
 * whole topic?" check — not a line-by-line completeness assertion.
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const CONTENT = join(ROOT, 'content')
const MANUAL = '/Users/pranayjain/Downloads/AIDA User Manual v4.12.x.md'

function walkMdx(dir) {
  const files = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) files.push(...walkMdx(full))
    else if (entry.endsWith('.mdx')) files.push(full)
  }
  return files
}

// The manual's major topics, mapped to MDX pages that should cover them.
// Each entry: [manual topic (lowercase keyword), expected MDX file]
const COVERAGE_MAP = [
  ['about aida',            'getting-started/index.mdx'],
  ['about aida roles',      'getting-started/index.mdx'],
  ['how to login aida',     'getting-started/setup.mdx'],
  ['signup',                'getting-started/setup.mdx'],
  ['multiple team login',   'getting-started/setup.mdx'],
  ['create team',           'getting-started/setup.mdx'],
  ['profile dropdown',      'account-admin/profile.mdx'],
  ['switch team',           'account-admin/index.mdx'],
  ['account',               'account-admin/profile.mdx'],
  ['time zone',             'account-admin/profile.mdx'],
  ['bots page',             'getting-started/first-bot.mdx'],
  ['how to create a new chatbot', 'getting-started/first-bot.mdx'],
  ['home page',             'getting-started/home-page.mdx'],
  ['go-live',               'integrations/index.mdx'],
  ['multi-build-source',    'integrations/salesforce.mdx'],
  ['voice',                 'integrations/zendesk.mdx'],
  ['whatsapp',              'integrations/genesys.mdx'],
  ['intents',               'intents-entities/intents.mdx'],
  ['triggers',              'intents-entities/triggers-parameters.mdx'],
  ['parameters',            'intents-entities/triggers-parameters.mdx'],
  ['entities',              'intents-entities/entities.mdx'],
  ['train conversation',    'intents-entities/train-conversations.mdx'],
  ['user rights',           'account-admin/users-permissions.mdx'],
  ['team settings',         'account-admin/team-settings.mdx'],
  ['bot settings',          'bot-settings/index.mdx'],
  ['classifier',            'bot-settings/classifier.mdx'],
  ['multilingual',          'bot-settings/multilingual.mdx'],
  ['analytics',             'analytics/index.mdx'],
  ['api & services',        'integrations/api-services.mdx'],
  ['migration',             'account-admin/migration.mdx'],
  ['deep-link',             'troubleshooting/deep-links.mdx'],
  ['intent explainer',      'intents-entities/intent-explainer.mdx'],
]

test('source manual exists at expected path', () => {
  assert.ok(existsSync(MANUAL), 'Manual not found — update MANUAL path in this test')
})

test('every major manual section has a corresponding MDX page', () => {
  const violations = []
  for (const [topic, file] of COVERAGE_MAP) {
    const full = join(CONTENT, file)
    if (!existsSync(full)) {
      violations.push(`${topic} → ${file} (file does not exist)`)
    }
  }
  assert.deepEqual(violations, [], `Missing coverage:\n  ${violations.join('\n  ')}`)
})

test('each mapped MDX page mentions the manual topic keyword (sanity check)', () => {
  const weakCoverage = []
  for (const [topic, file] of COVERAGE_MAP) {
    const full = join(CONTENT, file)
    if (!existsSync(full)) continue
    const src = readFileSync(full, 'utf-8').toLowerCase()
    // Check the topic's main word appears somewhere in the file
    const mainWord = topic.replace(/[^a-z]/g, ' ').split(/\s+/).filter(w => w.length > 3)[0]
    if (!mainWord) continue
    if (!src.includes(mainWord)) {
      weakCoverage.push(`${file} does not mention "${mainWord}" (expected from topic "${topic}")`)
    }
  }
  assert.deepEqual(weakCoverage, [], `Weak coverage:\n  ${weakCoverage.join('\n  ')}`)
})
