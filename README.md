# AIDA Help Center

Nextra 4 helpdesk site for AIDA — Artificial Intelligence Digital Assistance. Built from the AIDA User Manual and the Flows User Manual (v4.12.x).

## Local development

```bash
cd apps/web
npm install
npm run dev          # http://localhost:3000 — fast iteration (no search)
```

For testing search or production behavior:

```bash
cd apps/web
npm run build        # next build + pagefind index generation
npm run start        # http://localhost:3000 — search works here
```

## Tests

```bash
cd apps/web
npm test             # runs all 14 static-analysis tests in ~100ms
```

The test suite validates:

- MDX component imports resolve to real exports
- Every MDX file has title + description frontmatter
- Every internal `/path` link resolves to an existing page
- Every MDX file is listed in its `_meta.ts`
- Every major manual topic maps to a covering MDX page

## Structure

```
apps/web/
├── app/                      # Next.js App Router entry
│   ├── layout.tsx            # Root layout + Nextra theme wiring
│   ├── globals.css           # Freshdesk-style CSS overrides
│   └── [[...mdxPath]]/       # Catch-all route for MDX pages
├── content/                  # All docs content (9 sections, 43 MDX pages)
│   ├── getting-started/
│   ├── intents-entities/
│   ├── bot-settings/
│   ├── channels/             # Where the bot talks (Web, Voice, WhatsApp, API)
│   ├── integrations/         # What the bot connects to (Flows)
│   ├── analytics/
│   ├── account-admin/
│   ├── troubleshooting/
│   └── faq/
├── tests/                    # node:test static-analysis suite
├── mdx-components.tsx
├── next.config.mjs
├── package.json
└── railway.json              # Railway deployment config
```

## Deploying to Railway

This project is configured to deploy to [Railway](https://railway.com). It's a monorepo — the Next.js app lives at `apps/web/`, so the Railway service must be configured with **Root Directory = `apps/web`**.

### One-time setup (Railway dashboard)

1. Go to https://railway.com/new
2. Choose **Deploy from GitHub repo**
3. Select `kbpranay/docs`
4. In the service settings, set **Root Directory** to `apps/web`
5. Railway auto-detects Next.js and uses the `railway.json` config for build/start commands
6. Add a custom domain or use the generated Railway URL

After that, every push to `main` on GitHub triggers an automatic deploy.

### Or deploy from CLI

```bash
railway login
cd apps/web
railway link              # pick the service
railway up                # upload and deploy
```
