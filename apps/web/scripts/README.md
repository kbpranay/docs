# Translation pipeline

Automated EN → DE / FR / ES translation for the AIDA docs, powered by Claude Sonnet 4.6.

## How it works

1. On every push to `main` that touches `apps/web/content/en/**/*.mdx`, GitHub Actions (`.github/workflows/translate.yml`) runs `scripts/translate.ts` three times — once per locale — in parallel.
2. The script diffs EN content against the previous commit (`git diff HEAD^ HEAD`) and only translates files that actually changed.
3. For each changed file, it builds a system prompt from the shared glossary + callout-label map, calls Claude Sonnet 4.6 once per file with `cache_control: {type: "ephemeral"}` on the system prompt, and receives the translated MDX.
4. The output is validated — frontmatter keys, fenced code blocks, inline code, link URLs, anchor fragments, imports, and JSX component counts must all match the source. Any mismatch aborts the write and fails the job so you notice.
5. Valid translations are written to `apps/web/content/<locale>/<same/relative/path>.mdx` and the source hash is recorded in `apps/web/i18n/memory/<locale>.json`. A pull request is opened against `main` for review.

## Why this design

- **Diff-driven** — typo fixes don't re-translate the whole site.
- **Prompt-cached** — the glossary + rules sit at the front of every call and cache per locale, so the first file in a run pays ~1.25× of the system prompt and the rest pay ~0.1×.
- **Per-file in one call** — cross-paragraph context is preserved within an article, so terminology stays consistent.
- **Glossary-first** — product names (AIDA, DocBrain, Flows, Blitzico, …) are declared protected, and every locale has canonical renderings for common domain terms.
- **Structural validation** — code blocks, URLs, anchor fragments, JSX components, and frontmatter keys are byte-identical by requirement. The translator can't drift into "improving" the source.
- **Translation memory** — rerunning the pipeline on an unchanged source is a no-op.

## Files

| Path | Purpose |
|---|---|
| `apps/web/scripts/translate.ts` | The pipeline itself. |
| `apps/web/i18n/glossary.json` | Protected terms (never translated) + per-locale canonical renderings for common domain words. |
| `apps/web/i18n/callout-labels.json` | Zendesk-style callout labels (`Note` / `Tip` / `Important` / `Warning`) per locale. |
| `apps/web/i18n/memory/<locale>.json` | Source hash of every translated file. Bumped whenever a translation is written. |
| `.github/workflows/translate.yml` | CI that runs the pipeline per-locale and opens PRs. |

## Running locally

```bash
# Translate changed files for one locale
cd apps/web
ANTHROPIC_API_KEY=sk-... npm run translate -- --locale de

# Re-translate every EN file for one locale
ANTHROPIC_API_KEY=sk-... npm run translate -- --locale fr --all

# Translate a specific list of files
ANTHROPIC_API_KEY=sk-... npm run translate -- --locale es \
  --files content/en/integrations/flows-basics.mdx,content/en/integrations/workspace.mdx

# Use a different base ref for the diff
GIT_BASE=origin/main npm run translate -- --locale de
```

## Required GitHub secret

The workflow needs `ANTHROPIC_API_KEY` set as a repository secret. Add it under **Settings → Secrets and variables → Actions → New repository secret**.

## When validation fails

If the script reports `INVALID` for a file it means Claude's output drifted from the source in a way that would corrupt the docs (broken link, missing code block, mismatched JSX count, etc.). The translated file is **not** written. Common causes and fixes:

- **Link URL differs** — Claude translated a URL fragment by mistake. Usually self-corrects on rerun; if it recurs on the same file, check for unusual link constructs and report back.
- **JSX component count differs** — Claude either dropped or duplicated a component. Rerun first; if it recurs, open the affected file and look for edge cases (deeply nested components, conditional rendering).
- **Frontmatter keys differ** — usually Claude invented a new key; rerun.
- **Code block hash differs** — Claude translated something inside a fence. Rerun; if persistent, tighten the system prompt.

One rerun is almost always enough at `temperature: 0` since the prompt is deterministic. If a file is a repeat offender, adjust the glossary / callout labels / protected terms rather than editing the file directly — the goal is that every change to the pipeline improves *every* future translation.

## Updating the glossary or callout labels

When you notice terminology drift:

1. Add the term to `apps/web/i18n/glossary.json` (`protected` for never-translate, `localized[<locale>]` for canonical renderings).
2. Or update `apps/web/i18n/callout-labels.json` if the drift is on a callout prefix.
3. Commit. The workflow file path trigger will re-run the pipeline on the next push, and since the system prompt changed, the prompt cache naturally invalidates — all the existing translation memory still applies (no re-translation unless the source itself changed), but any new file coming through picks up the tighter glossary.
4. If you want to force a full re-translation with the new glossary: **Actions → Translate docs → Run workflow** and set `all: true`.

## Cost ballpark

With prompt caching on, Sonnet 4.6 at $3 / $15 per 1M tokens, and the current EN surface (~30k words):

- First-time full translation, one locale: **~$1.50 – $3**
- Per-PR incremental translation (typical): **~$0.05 – $0.20**
- Translation memory drives the recurring number toward $0 when the PR doesn't touch EN.
