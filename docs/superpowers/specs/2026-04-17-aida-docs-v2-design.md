# AIDA Help Center V2 — Design Spec

**Date:** 2026-04-17
**Status:** Approved, proceeding to implementation
**Owner:** Pranay Jain

## Context

V1 shipped a working Nextra 4 site at `apps/web/` but only covers ~23% of the 3,292-line AIDA User Manual and uses Nextra's default theme. User feedback: *"the helpdesk content is too short...UI is not great...use the design skill to improve it and keep it consistent also with a left tab with structure and hyperlinks."*

V2 expands content to match the manual and redesigns the UI to a Freshdesk-style helpdesk.

## Tone & Content Constraint

**User directive:** *"dont use verbatim text as that can be unfriendly for users so find the best text without creating fictional content"*

- Rewrite the manual into clear, user-friendly English (active voice, short sentences, scannable).
- Stay strictly faithful to facts in the manual — no invented features, no fabricated defaults, no made-up examples.
- When the manual is ambiguous, keep the ambiguity (e.g., "available roles depend on your plan") rather than inventing specifics.
- Preserve all factual details: role names, default values (5 attempts / 30min / 60sec), URL patterns (`?source=SourceName`), buttons to click, feature names.

## Information Architecture — 8 Sections

```
/                              Landing: hero + search + 8 cards + popular + contact CTA
/getting-started/              overview · login-setup · first-bot · home-page
/intents-entities/             overview · intents · triggers-parameters · entities ·
                               docbrain · train-conversations · intent-explainer
/bot-settings/                 overview · bot-info · classifier · multilingual · flows-actions
/integrations/                 overview · web-app (salesforce.mdx) · voice (zendesk.mdx) ·
                               whatsapp (genesys.mdx) · api-services
/analytics/                    overview · live-data · reports-insights
/account-admin/                overview · profile · users-permissions · team-settings · migration
/troubleshooting/              overview · login-issues · bot-quality · integration-issues · deep-links
/faq/                          20+ Q&As (expanded from 10)
```

V1 file names preserved where they already exist (salesforce.mdx, zendesk.mdx, genesys.mdx, invoices.mdx) — only title/content changes.

## Visual Design — Freshdesk Style

**Palette:**
- `--primary: #2b5ce6` (AIDA blue)
- `--primary-soft: #eff3ff`
- `--primary-hover: #1e4ad1`
- `--bg: #ffffff`
- `--bg-alt: #f8f9fb`
- `--border: #eef0f8`
- `--text: #1a1a2e`
- `--text-muted: #6b7280`
- `--text-subtle: #9ca3af`

**Layout:**
- Persistent left sidebar at ≥900px width, collapsible drawer below
- Sidebar: section labels uppercase 11px weight 700, nav items 13px weight 500, active state uses `--primary-soft` bg + `--primary` text
- Top navbar: logo on left, search + contact link on right
- Content area: max-width 720px for prose, breadcrumb at top
- Hero on landing: gradient `#e8f0fe → #f0f4ff`, 2px primary border on search bar

**Typography:** Inter (Nextra default), bump sidebar section headers to 11px uppercase.

**Implementation approach:** Custom CSS at `app/globals.css` imported in `layout.tsx`. Target Nextra's DOM classes (`.nextra-sidebar-container`, `.nextra-nav-container`, etc.) with overrides. NO custom theme — keeps Nextra upgrades cheap.

## Homepage Landing Page

Rewrite `content/index.mdx` as a proper landing with:
1. Hero: H1 "Welcome to AIDA Help Center" + subtitle "Find answers, guides, and troubleshooting for AIDA"
2. Search bar (Nextra's built-in Pagefind)
3. 8 category cards (2×4 grid, emoji icon, title, 1-line desc)
4. "Popular articles" section (5 hand-picked top links)
5. Footer CTA: "Can't find what you need? Contact support"

## Verification — TDD

Extend `tests/validate-components.test.mjs` + add new test files:

1. **`tests/validate-components.test.mjs`** (existing) — component imports
2. **`tests/validate-frontmatter.test.mjs`** (new) — every MDX file has title + description
3. **`tests/validate-links.test.mjs`** (new) — every `[text](/path)` link resolves to an existing MDX file
4. **`tests/validate-nav.test.mjs`** (new) — every MDX file is listed in its `_meta.ts`
5. **`tests/validate-manual-coverage.test.mjs`** (new) — assert the 26 major `##` sections from the manual each map to an MDX page

All tests pass + `next build` clean = V2 done.

## Out of Scope

- Custom Nextra theme (using CSS overrides instead)
- Real screenshots (manual's blob URLs unusable; text-only for now, placeholder spots reserved)
- Internationalization / multilingual docs site
- Analytics tracking / feedback widgets
- Login-gated content
