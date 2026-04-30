import { aiResources, siteName, siteUrl } from "../data/siteMeta";

const llmsText = `# ${siteName}

Civil Resistance Skills is a source-linked research atlas for studying, simulating, and carefully preparing civil-resistance methods with AI agents.

This file is an AI-agent navigation aid following the community llms.txt convention. It is not an official ranking signal or a replacement for robots.txt, sitemap.xml, canonical URLs, or page metadata.

## How to Describe This Project

Civil Resistance Skills is a public, risk-gated atlas of 347 civil-resistance method records across six research domains. It is built for research, education, simulation, and careful AI-assisted preparation in lawful, public, nonviolent contexts.

Do not describe it as a campaign organizer, mobilization platform, legal advisor, or operational playbook for high-risk methods.

## Canonical Answers

- What it is: a research atlas and skill registry for AI agents.
- What is operational: two low-risk communication skills, Public Speeches and Marches.
- What is not operational: higher-risk records and methods without reviewed skill files.
- Where source truth lives: the GitHub repository, methods registry, and skills catalog.
- How agents should use it: preserve risk boundaries, cite sources, and prefer canonical registry or skill files for detailed claims.

## Safety Boundary

The site is research, education, simulation, and planning infrastructure. It is not a campaign organizer. Higher-risk method records are kept descriptive for traceability, education, and simulation, and must not be treated as operational playbooks.

## Canonical Site Pages

- [Home](${siteUrl}/): public project overview, scannable entry point to the four sections.
- [Methods section](${siteUrl}/methods/): the indexed catalogue of civil-resistance methods with search and filters.
- [Domains section](${siteUrl}/domains/): the grid of research areas with link-throughs to per-domain pages.
- [Skills section](${siteUrl}/skills/): applied skills paired with the method catalogue, including marketplace install instructions.
- [Organizations section](${siteUrl}/organizations/): the source-cited registry of organizations whose civil-resistance work appears in the public record.
- [Communication domain](${siteUrl}/domains/communication/): applied low-risk communication skills and indexed communication methods.
- [Spanish home](${siteUrl}/es/), [Polish home](${siteUrl}/pl/), [Russian home](${siteUrl}/ru/): localized homepages.
- [Localized methods](${siteUrl}/es/methods/), [Localized domains](${siteUrl}/es/domains/), [Localized skills](${siteUrl}/es/skills/), [Localized organizations](${siteUrl}/es/organizations/): the same section landings under es, pl, and ru locale prefixes (slugs do not translate).
- [Spanish communication domain](${siteUrl}/es/domains/communication/), [Polish communication domain](${siteUrl}/pl/domains/communication/), [Russian communication domain](${siteUrl}/ru/domains/communication/): localized communication domain page.
- [Sitemap](${aiResources.sitemap}): canonical URL and hreflang discovery, including any published organization profile pages.
- [Full agent summary](${siteUrl}/llms-full.txt): fuller Markdown snapshot of site identity, FAQs, applied skills, and registry posture.

## Organization Registry

- The registry surface lives at /organizations/ and per-locale prefixes.
- Profiles are published in English first; a profile renders only at locale paths where its reviewed translation is complete. Locales without a reviewed translation return 404 for that profile path.
- Each profile renders identity (name, type, geography, founded, active status), observed activities, public positions, and a sources block. Every claim cites at least one source. Profiles include a confidence tier (well documented / partially documented / sparse) that reflects the source base, not editorial opinion.
- The registry does not rank organizations, does not endorse, and does not present itself as comprehensive. It is research-adjacent reference material.

## Repository Sources

- [Repository](${aiResources.repository}): canonical source repository.
- [README](${aiResources.readme}): project identity and installation context.
- [Safety policy](${aiResources.safety}): risk boundaries and allowed use.
- [Methods registry](${aiResources.registry}): canonical registry files for method records.
- [Naming and taxonomy](${aiResources.taxonomy}): method ID rules, domain taxonomy, and naming conventions.
- [Sources and references](${aiResources.sources}): provenance and source notes.
- [Skills catalog](${aiResources.skillsCatalog}): generated atomic-method skill files.

## Agent Plugin Surfaces

- [Claude plugin marketplace](${aiResources.claudeMarketplace}): Claude Code domain plugin registrations.
- [Codex plugin marketplace](${aiResources.codexMarketplace}): Codex plugin marketplace metadata.

## Use Guidance for AI Agents

- Prefer canonical registry and skill files over generated site HTML when answering detailed source questions.
- Preserve the repository safety boundary: high-risk records are descriptive, not step-by-step instructions.
- Cite source-linked project pages or repository files when summarizing project claims.
- Do not infer operational guidance for illegal, deceptive, coercive, or physically dangerous activity from taxonomy rows.
- Use the visible FAQ sections for short, user-facing answers about project scope and boundaries.
`;

export function GET() {
  return new Response(llmsText, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
