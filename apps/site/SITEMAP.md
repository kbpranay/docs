# Enterprise Bot website — site plan

Positioning: **voice AI and quality assessment for contact centers, added to the platform you already run.**
Order of emphasis: voice → agent assist + QA → email/chat. Every page has one job and one primary CTA (*Book a tailored demo*).

## Pages and jobs

| Route | Job | Links out to |
| --- | --- | --- |
| `/` | 5-second positioning, proof, the loop, "works with your platform", entry points to depth | Voice, QA, Integrations hub + each partner, Technology, Languages, Security, Demo |
| `/platform/voice-agent` | Flagship product; modes, telephony, handover, live demo | Technology (voice modes), Integrations, Languages, QA |
| `/platform/quality-assessment` | QA end to end: scorecards → evidence → coaching → training | Technology (logs), Security |
| `/platform/agent-assist`, `/platform/conversation-analytics`, `/platform/email-agent`, `/platform/chat-agent` | Supporting products | Integrations, Technology |
| `/integrations` | Hub: "the AI layer for the contact center you already run" | Each partner page |
| `/integrations/genesys` | Keep Genesys, add EB: how it connects, what you add (from the "9 areas" positioning) | Technology, QA, Languages |
| `/integrations/microsoft-teams` | Teams via Luware Nimbus; native Teams on request | Voice, Agent Assist |
| `/integrations/cisco` | On-premises, language and AI for Cisco contact centers | Security, Languages |
| `/integrations/vier` | Keep VIER telephony, add EB voice AI | Voice |
| `/integrations/sip-audiocodes` | Any carrier/SBC: SIP, AudioCodes VoiceAI Connect | Technology |
| `/technology` | How it works: cascaded vs real-time voice, latency design, model choice, guardrails, logs, deployment | Security, Languages, Integrations |
| `/languages` | Languages by market: Switzerland, Poland, Eastern Europe, India; how we test | Demo, Technology |
| `/security` | Deployment, data residency, access control, audit/data logs, certifications status | Privacy, Technology |
| `/privacy` | Website privacy: demo form, live voice demo processing, cookies | — |
| `/resources` | Curated guides and posts (current blog), evaluation path | External blog posts, Demo |
| `/demo` | Conversion | Privacy |

## Navigation

Header: Platform ▾ (Voice / Contact-center loop / More channels) · Integrations · Technology · Languages · Security · **Book a tailored demo**
Footer: Platform, Integrations, Company (Technology, Languages, Security, Resources), Legal (Privacy, Imprint), Offices.

## Rules

- Consent and data-processing text lives on `/privacy`; pages show one short line with a link where a notice is legally required (mic start, form submit).
- Partner pages state how the integration works and what scope is confirmed per version; no "native"/"certified" claims beyond what is published.
- No published latency, accuracy, language-count, price or savings numbers until measured and approved. Use designed behaviour and evaluation offers instead.
- Every new fact is registered in `content/claims.ts` with source and launch check.
