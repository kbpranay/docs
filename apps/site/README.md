# Enterprise Bot website (`apps/site`)

The marketing website for Enterprise Bot, built from the **website masterplan** in Notion
(7 Nov 2026, "Enterprise Bot website masterplan — contact center automation").

- Category: contact center automation
- Promise: *Automate the conversation. Complete the work.*
- One main call to action: **Book a tailored demo**

## Run it

```bash
cd apps/site
npm install
npm run dev            # http://localhost:3100
npm run build && npm run start   # production mode (use this for motion review)
npm test               # static checks: claims, links, copy rules, contrast, motion rules
npm run typecheck
```

## What is here

| Path | What it is |
| --- | --- |
| `app/page.tsx` | Homepage: hero scene, proof row, customer outcomes, channel journey, starting points, integrations, enterprise control, evaluation path, final CTA |
| `app/platform/[slug]` | One template for all five product pages (problem → workflow → capabilities → fit → proof → FAQ → next step) |
| `app/demo` | Demo request page; form posts to `/api/demo-request` |
| `components/HeroScene.tsx` | Signature motion: a call resolved through an action (12 s, five beats) |
| `components/Journey.tsx` | Same request across voice, email and chat |
| `content/claims.ts` | **Claims register.** Every customer name, number and quote, with source and what to re-check before launch |
| `content/products.ts` | Product page copy |
| `scripts/capture-motion.cjs` | Captures timed frames, stills and metrics for design review |
| `../../.claude/agents/critical-marketing-designer.md` | The critical design reviewer agent and its approval rubric |

## Motion rules

- Micro-interactions 120–250 ms, entrances 300–600 ms; only opacity, transform and line-draws animate.
- The hero plays once, then rests. Visitors can pause, replay or inspect any step.
- Motion stops when off screen or in a background tab.
- `prefers-reduced-motion` and no-JS both show the complete still state.

## Design review loop

1. `npm run build && npm run start`
2. `OUT_DIR=.captures/round-N node scripts/capture-motion.cjs`
3. Ask the `critical-marketing-designer` agent to review that folder.
4. Fix its required changes and repeat until its verdict is **APPROVED**.

## Live voice demo ("Talk to the voice agent")

A button in the homepage voice section connects the visitor's microphone to a
real-time voice model running a fictional insurance-claims scenario
(`lib/voiceDemo.ts`). The consent step names the provider before the mic starts.

- **Default provider: Gemini Live** (cheaper). Set `VOICE_DEMO_ENABLED=true` and `GEMINI_API_KEY=...`.
  The server issues a single-use token locked to the demo model and prompt; it must be used within
  30 s and expires at the cap, after which Gemini rejects the session. Optional: `GEMINI_LIVE_MODEL`,
  `GEMINI_LIVE_VOICE` (Kore).
- **Fallback: OpenAI Realtime.** Set `VOICE_DEMO_PROVIDER=openai` and `OPENAI_API_KEY=...`. The server
  proxies the WebRTC offer and hangs up the call itself at the cap.
- Limits (server-side, both providers): `VOICE_DEMO_MAX_SECONDS` (120), `VOICE_DEMO_PER_IP_PER_HOUR` (3),
  `VOICE_DEMO_DAILY_LIMIT` (200), `VOICE_DEMO_MAX_CONCURRENT` (5). In memory per server; use a shared
  store if you run more than one instance. Also set a spend cap on the provider account.
- Env vars are read at build and run time (rebuild after changing them).
- Not yet tested against the live Gemini or OpenAI APIs from this build (no keys available here).
  Check the model name against Google's current Live API model list when you add the key.

## Before launch (not done in this build)

- Confirm every entry in `content/claims.ts` (customer permission, metric period and definition).
- Product sign-off on capability and deployment statements in `content/products.ts`.
- Replace text customer names with approved logo files.
- Feedyou: stories and names are on by default (launch together with the Feedyou announcement). Confirm each Feedyou customer's permission to appear; set `NEXT_PUBLIC_SHOW_FEEDYOU=false` to hide them if the launch date moves.
- Connect HubSpot: set `HUBSPOT_PORTAL_ID` and `HUBSPOT_FORM_ID`. Until then the form says it is not connected.
- Add imprint, privacy and cookie pages, plus a consent manager, before any analytics.
- Set `SITE_INDEXABLE=true` and `NEXT_PUBLIC_SITE_URL` only for the approved production deployment
  (previews are `noindex` and `robots.txt` disallows all).
- German and other locales: content structure is ready; translations need native review first.
