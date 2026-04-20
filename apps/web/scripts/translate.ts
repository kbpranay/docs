#!/usr/bin/env tsx
/**
 * AIDA docs translation pipeline.
 *
 * Uses Claude Sonnet 4.6 with prompt caching to translate English MDX
 * articles under `apps/web/content/en/` into a target locale.
 *
 * Key properties:
 * - Diff-driven: only files changed since the base ref are translated.
 * - Deterministic: temperature 0, thinking disabled.
 * - Prompt-cached: glossary + rules are cached per locale, so every file
 *   after the first in a run pays ~10% of the full prompt cost.
 * - Validated: output is rejected unless frontmatter keys, code blocks,
 *   link URLs, anchor fragments, and `import` statements are all intact.
 * - Memory-backed: `i18n/memory/<locale>.json` records the source hash of
 *   each translated file so unchanged files are skipped on reruns.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... tsx scripts/translate.ts --locale de
 *   tsx scripts/translate.ts --locale fr --all
 *   tsx scripts/translate.ts --locale es --files content/en/integrations/flows-basics.mdx
 */

import Anthropic from '@anthropic-ai/sdk'
import { createHash } from 'node:crypto'
import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const __dirname = dirname(fileURLToPath(import.meta.url))
const MODEL = 'claude-sonnet-4-6'
const APP_ROOT = resolve(__dirname, '..')
const REPO_ROOT = resolve(APP_ROOT, '..', '..')
const CONTENT_ROOT = join(APP_ROOT, 'content')
const EN_ROOT = join(CONTENT_ROOT, 'en')
const I18N_ROOT = join(APP_ROOT, 'i18n')
const GLOSSARY_PATH = join(I18N_ROOT, 'glossary.json')
const LABELS_PATH = join(I18N_ROOT, 'callout-labels.json')

type Locale = 'de' | 'fr' | 'es'
const SUPPORTED_LOCALES: Locale[] = ['de', 'fr', 'es']
const LOCALE_NAMES: Record<Locale, string> = {
  de: 'German (Deutsch)',
  fr: 'French (Français)',
  es: 'Spanish (Español)',
}

interface Glossary {
  protected: string[]
  localized: Record<string, Record<string, string>>
}

interface CalloutLabels {
  labels: Record<string, Record<string, string>>
}

interface Memory {
  version: number
  locale: string
  files: Record<string, string>
}

interface CliArgs {
  locale: Locale
  all: boolean
  files: string[]
  baseRef: string
}

function parseArgs(argv: string[]): CliArgs {
  const args: Partial<CliArgs> = { all: false, files: [] }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--locale') {
      const v = argv[++i]
      if (!SUPPORTED_LOCALES.includes(v as Locale)) {
        throw new Error(`--locale must be one of ${SUPPORTED_LOCALES.join(', ')}`)
      }
      args.locale = v as Locale
    } else if (a === '--all') {
      args.all = true
    } else if (a === '--files') {
      args.files = argv[++i].split(',').map((s) => s.trim()).filter(Boolean)
    } else if (a === '--base-ref') {
      args.baseRef = argv[++i]
    }
  }
  if (!args.locale) throw new Error('--locale is required')
  return {
    locale: args.locale,
    all: args.all ?? false,
    files: args.files ?? [],
    baseRef: args.baseRef ?? process.env.GIT_BASE ?? 'HEAD^',
  }
}

function sha256(s: string): string {
  return createHash('sha256').update(s, 'utf8').digest('hex')
}

function listAllEnFiles(): string[] {
  const out: string[] = []
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry)
      if (statSync(full).isDirectory()) walk(full)
      else if (full.endsWith('.mdx')) out.push(full)
    }
  }
  walk(EN_ROOT)
  return out
}

function listChangedEnFiles(baseRef: string): string[] {
  try {
    const cmd = `git diff --name-only ${baseRef} HEAD -- 'apps/web/content/en/**/*.mdx'`
    const out = execSync(cmd, { encoding: 'utf8', cwd: REPO_ROOT })
    return out
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((p) => join(REPO_ROOT, p))
  } catch {
    // No such ref (e.g. first commit) — translate everything.
    return listAllEnFiles()
  }
}

function buildSystemPrompt(locale: Locale, glossary: Glossary, labels: CalloutLabels): string {
  const targetName = LOCALE_NAMES[locale]
  const localizedTerms = glossary.localized[locale] ?? {}
  const calloutMap = labels.labels[locale] ?? {}
  return `You are a professional technical-documentation translator. You translate Zendesk-style help-center articles from English to ${targetName}.

These are Markdown/MDX files served by a Next.js + Nextra docs site. Your job is to translate the natural-language prose while preserving every byte of structural and programmatic content.

## Output contract

Return the complete translated file. Nothing before it, nothing after. No commentary. No markdown code fences wrapping the output. The output must parse as a valid MDX file identical in structure to the input.

## Structural rules (non-negotiable)

1. **Frontmatter.** Keep the \`---\` delimiters and every key name exactly. Translate only the values of \`title\` and \`description\`. Leave every other frontmatter value unchanged.
2. **Imports.** Leave every \`import ... from '...'\` line byte-identical.
3. **JSX components.** Preserve every component tag, attribute name, and attribute value. Translate only the text content that appears between opening and closing tags. Example: \`<Callout type="warning">**Warning:** Do not delete.</Callout>\` — translate "Warning" (per the callout label map below) and "Do not delete." — never touch \`type="warning"\` or the component name.
4. **Code blocks.** Preserve fenced code blocks (triple-backtick) byte-identical. Do not translate anything inside them.
5. **Inline code.** Preserve inline code (single backtick spans) byte-identical.
6. **Links.** In \`[text](url)\` translate \`text\`, never \`url\`. Preserve \`#anchor\` fragments exactly.
7. **Image and asset paths.** Preserve byte-identical.
8. **Headings.** Translate heading text. Never change the number of \`#\` signs.
9. **Line breaks and indentation.** Preserve the paragraph structure. Match the source's blank-line spacing.
10. **HTML-style tags in MDX.** If you see a raw HTML tag (\`<sup>\`, \`<br />\`, etc.), preserve it.

## Glossary — protected terms

These terms must appear verbatim in your translation, in exactly this casing. Never translate them, never transliterate them, never add articles that would change the wording of the term itself:

${glossary.protected.map((t) => `- ${t}`).join('\n')}

## Glossary — canonical localized terms

When the source uses these English words as common nouns, prefer the given ${targetName} rendering for consistency across the help center:

${Object.entries(localizedTerms)
  .map(([en, local]) => `- ${en} → ${local}`)
  .join('\n')}

## Callout labels

Inside \`<Callout ...>\` bodies, the source often begins with a bold label followed by a colon — \`**Note:**\`, \`**Tip:**\`, \`**Important:**\`, \`**Warning:**\`. Translate these labels as follows and keep the bold and the trailing colon:

${Object.entries(calloutMap)
  .map(([en, local]) => `- **${en}:** → **${local}:**`)
  .join('\n')}

## Voice

Write in a warm, direct, Zendesk-style help-center voice. Use the polite second person appropriate for the target language (Sie for German, vous for French, usted for Spanish). Prefer imperative, task-oriented sentences in numbered steps.

## Negative rules

- Do not add or remove sections.
- Do not rewrite examples.
- Do not invent new warnings or tips.
- Do not "improve" the source — translate it faithfully.
- Do not output any text outside the translated file.`
}

function buildUserMessage(sourceText: string): string {
  return `Translate the following MDX file. Return the complete translated file only.\n\n---SOURCE START---\n${sourceText}\n---SOURCE END---`
}

function extractFences(source: string): string[] {
  const fenced = source.match(/```[\s\S]*?```/g) ?? []
  return fenced.map((s) => s.trim())
}

function extractInlineCode(source: string): string[] {
  // Single-backtick spans, excluding triple-backtick fences (already extracted).
  const withoutFences = source.replace(/```[\s\S]*?```/g, '')
  return (withoutFences.match(/`[^`\n]+`/g) ?? []).map((s) => s)
}

function extractLinkUrls(source: string): string[] {
  // Match markdown link targets: ](url) — excludes image/JSX props.
  const urls: string[] = []
  const re = /\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(source)) !== null) urls.push(m[1])
  return urls
}

function extractImports(source: string): string[] {
  return source.match(/^import\s+.+$/gm) ?? []
}

function extractJsxOpeners(source: string): string[] {
  // Self-closing and opening JSX tags (capital-letter or namespaced component names).
  return source.match(/<[A-Z][A-Za-z0-9.]*(?=[\s/>])/g) ?? []
}

function sortedEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false
  const sa = [...a].sort()
  const sb = [...b].sort()
  return sa.every((v, i) => v === sb[i])
}

interface ValidationError {
  kind: string
  message: string
}

function validate(source: string, translated: string): ValidationError[] {
  const errors: ValidationError[] = []

  let srcFm, dstFm
  try {
    srcFm = matter(source)
    dstFm = matter(translated)
  } catch (e) {
    errors.push({ kind: 'frontmatter', message: `frontmatter parse failed: ${(e as Error).message}` })
    return errors
  }

  const srcKeys = Object.keys(srcFm.data).sort()
  const dstKeys = Object.keys(dstFm.data).sort()
  if (srcKeys.join(',') !== dstKeys.join(',')) {
    errors.push({
      kind: 'frontmatter',
      message: `frontmatter keys differ. source=[${srcKeys.join(', ')}] translated=[${dstKeys.join(', ')}]`,
    })
  }

  const srcFences = extractFences(source)
  const dstFences = extractFences(translated)
  if (!sortedEqual(srcFences, dstFences)) {
    errors.push({
      kind: 'code-blocks',
      message: `fenced code blocks differ. source=${srcFences.length} translated=${dstFences.length}`,
    })
  }

  const srcInline = extractInlineCode(source)
  const dstInline = extractInlineCode(translated)
  if (!sortedEqual(srcInline, dstInline)) {
    errors.push({
      kind: 'inline-code',
      message: `inline code spans differ. source=${srcInline.length} translated=${dstInline.length}`,
    })
  }

  const srcUrls = extractLinkUrls(source)
  const dstUrls = extractLinkUrls(translated)
  if (!sortedEqual(srcUrls, dstUrls)) {
    errors.push({
      kind: 'link-urls',
      message: `link URLs differ. source=${srcUrls.length} translated=${dstUrls.length}. missing=[${srcUrls.filter((u) => !dstUrls.includes(u)).join(', ')}] extra=[${dstUrls.filter((u) => !srcUrls.includes(u)).join(', ')}]`,
    })
  }

  const srcImports = extractImports(source)
  const dstImports = extractImports(translated)
  if (!sortedEqual(srcImports, dstImports)) {
    errors.push({
      kind: 'imports',
      message: `import statements differ`,
    })
  }

  const srcJsx = extractJsxOpeners(source)
  const dstJsx = extractJsxOpeners(translated)
  if (srcJsx.length !== dstJsx.length) {
    errors.push({
      kind: 'jsx-count',
      message: `JSX component opener count differs. source=${srcJsx.length} translated=${dstJsx.length}`,
    })
  }

  return errors
}

async function translateFile(
  client: Anthropic,
  systemPrompt: string,
  source: string,
): Promise<string> {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 16000,
    temperature: 0,
    thinking: { type: 'disabled' },
    system: [
      {
        type: 'text',
        text: systemPrompt,
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [{ role: 'user', content: buildUserMessage(source) }],
  })

  const textBlocks = response.content.filter(
    (b): b is Anthropic.TextBlock => b.type === 'text',
  )
  if (textBlocks.length === 0) {
    throw new Error('Claude returned no text content')
  }
  let text = textBlocks.map((b) => b.text).join('')

  // If Claude wrapped the output in a fenced block, unwrap it.
  const fenceWrap = text.match(/^```(?:mdx)?\n([\s\S]+)\n```\s*$/)
  if (fenceWrap) text = fenceWrap[1]

  if (response.usage.cache_read_input_tokens) {
    process.stderr.write(
      `    cache: read ${response.usage.cache_read_input_tokens}, write ${response.usage.cache_creation_input_tokens ?? 0}, uncached ${response.usage.input_tokens}\n`,
    )
  }

  return text
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const locale = args.locale

  const glossary: Glossary = JSON.parse(readFileSync(GLOSSARY_PATH, 'utf8'))
  const labels: CalloutLabels = JSON.parse(readFileSync(LABELS_PATH, 'utf8'))
  const systemPrompt = buildSystemPrompt(locale, glossary, labels)

  const memoryPath = join(I18N_ROOT, 'memory', `${locale}.json`)
  const memory: Memory = JSON.parse(readFileSync(memoryPath, 'utf8'))

  // Pick source files.
  let sources: string[]
  if (args.files.length > 0) {
    sources = args.files.map((p) => resolve(process.cwd(), p))
  } else if (args.all) {
    sources = listAllEnFiles()
  } else {
    sources = listChangedEnFiles(args.baseRef).filter((p) => p.startsWith(EN_ROOT))
  }
  sources = sources.filter((p) => p.endsWith('.mdx') && existsSync(p))

  if (sources.length === 0) {
    console.log(`[${locale}] No changed EN files. Nothing to translate.`)
    return
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY is required')
  }
  const client = new Anthropic({ apiKey })

  console.log(`[${locale}] Translating ${sources.length} file(s) with ${MODEL}`)

  const targetRoot = join(CONTENT_ROOT, locale)
  const failures: Array<{ file: string; errors: ValidationError[] }> = []

  for (const src of sources) {
    const rel = relative(EN_ROOT, src)
    const source = readFileSync(src, 'utf8')
    const hash = sha256(source)
    const target = join(targetRoot, rel)

    if (memory.files[rel] === hash && existsSync(target)) {
      console.log(`  ${rel}  (cached, skipped)`)
      continue
    }

    process.stdout.write(`  ${rel}  `)
    let translated: string
    try {
      translated = await translateFile(client, systemPrompt, source)
    } catch (e) {
      console.log(`FAILED: ${(e as Error).message}`)
      failures.push({ file: rel, errors: [{ kind: 'api', message: (e as Error).message }] })
      continue
    }

    const errors = validate(source, translated)
    if (errors.length > 0) {
      console.log(`INVALID`)
      for (const e of errors) console.log(`    - [${e.kind}] ${e.message}`)
      failures.push({ file: rel, errors })
      continue
    }

    mkdirSync(dirname(target), { recursive: true })
    writeFileSync(target, translated, 'utf8')
    memory.files[rel] = hash
    writeFileSync(memoryPath, JSON.stringify(memory, null, 2) + '\n', 'utf8')
    console.log(`ok`)
  }

  if (failures.length > 0) {
    console.log(`\n[${locale}] ${failures.length} file(s) failed validation — not written.`)
    process.exit(1)
  }
  console.log(`[${locale}] done`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
