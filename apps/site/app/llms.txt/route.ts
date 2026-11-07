import { integrations } from '@/content/integrations'
import { products } from '@/content/products'
import { site } from '@/content/site'
import { customerStories } from '@/content/claims'
import { showFeedyou } from '@/content/site'

/**
 * llms.txt: a plain summary of the site for AI assistants and answer engines
 * (https://llmstxt.org). Built from the same content files as the pages.
 */
export const dynamic = 'force-static'

export function GET() {
  const u = (p: string) => `${site.url}${p}`
  const stories = customerStories.filter((s) => s.metric && (showFeedyou || s.origin === 'eb'))
  const body = `# ${site.name}

> ${site.description}

${site.name} sells AI voice agents for contact centers and automated quality assessment of human and AI conversations. It is added to the contact-center platform a customer already runs (Genesys Cloud, Microsoft Teams via Luware Nimbus, Cisco, VIER, SIP telephony) rather than replacing it. Deployment options: managed cloud in the EU, Middle East, North America or Asia, dedicated private cloud, or on-premises Kubernetes.

## Products
${products.map((p) => `- [${p.name}](${u(`/platform/${p.slug}`)}): ${p.intro}`).join('\n')}

## Integrations
${integrations.map((i) => `- [${i.name}](${u(`/integrations/${i.slug}`)}): ${i.navLine}`).join('\n')}

## Customer results (published case studies)
${stories.map((s) => `- ${s.name} (${s.sector}, ${s.country}): ${s.metric!.value} ${s.metric!.label}${s.origin === 'feedyou' ? ' (delivered by Feedyou, an Enterprise Bot company)' : ''}. Source: ${s.url}`).join('\n')}

## Buying and trust
- [Security and data](${u('/security')}): deployment models, data residency, the GDPR data lifecycle and current certification status.
- [Responsible AI](${u('/responsible-ai')}): guardrails, human oversight and known limits.
- [How pricing works](${u('/pricing')}): platform fee plus usage, modelled on the buyer's volumes. No public price list.
- [Pilot and evaluation](${u('/evaluation')}) and [Implementation and support](${u('/implementation')}).
- [Languages](${u('/languages')}) and [Technology](${u('/technology')}): Standard (cascaded) and Realtime voice modes.
- [Customer stories](${u('/customers')})

## Contact
- [Book a tailored demo](${u('/demo')})
`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
