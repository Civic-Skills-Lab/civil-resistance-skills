import content from "../data/site-content.json";
import registry from "../data/registry.json";
import { aiResources, githubBlob, languages, localizedPaths, siteName, siteUrl } from "../data/siteMeta";

function pageUrl(path: string) {
  return `${siteUrl}${path === "/" ? "/" : path}`;
}

function faqBlock(title: string, items: Array<{ question: string; answer: string }>) {
  return [`## ${title}`, ...items.map((item) => `### ${item.question}\n\n${item.answer}`)].join("\n\n");
}

const home = content.en.home;
const communication = content.en.communication;
const localizedLinks = languages
  .map(
    (language) =>
      `- ${language}: home ${pageUrl(localizedPaths.home[language])}, methods ${pageUrl(localizedPaths.methods[language])}, domains ${pageUrl(localizedPaths.domains[language])}, skills ${pageUrl(localizedPaths.skills[language])}, organizations ${pageUrl(localizedPaths.organizations[language])}, communication ${pageUrl(localizedPaths.communication[language])}`
  )
  .join("\n");
const appliedSkills = communication.operational.skills
  .map(
    (skill) =>
      `- ${skill.id} / ${skill.title}: ${skill.body}\n  Canonical: ${githubBlob(`skills-catalog/${skill.id}/SKILL.md`)}`
  )
  .join("\n");

const llmsFullText = `# ${siteName} Full Agent Summary

Civil Resistance Skills is a source-linked research atlas for studying, simulating, and carefully preparing civil-resistance methods with AI agents.

This file is a fuller Markdown snapshot for AI agents. It is not an official ranking signal, not a substitute for the repository, and not a replacement for robots.txt, sitemap.xml, canonical URLs, or page metadata.

## Project Identity

- Name: ${siteName}
- Repository: ${aiResources.repository}
- Public site: ${siteUrl}/
- Method records: ${registry.stats.methods}
- Research domains: ${registry.stats.domains}
- Applied low-risk skills: ${registry.stats.operational}
- Higher-risk records kept descriptive: ${registry.stats.highRisk}
- Canonical source files: methods registry and skills catalog in the repository.

## Safety Boundary

The project is research, education, simulation, and planning infrastructure for lawful, public, nonviolent contexts. It is not a campaign organizer, legal advisor, mobilization platform, or operational playbook for high-risk methods.

Higher-risk records remain descriptive for traceability, education, and simulation. Agents must not infer step-by-step operational guidance for illegal, deceptive, coercive, defamatory, inciting, or physically dangerous conduct from taxonomy rows.

${faqBlock(home.faq.title, home.faq.items)}

## Applied Skills

${appliedSkills}

${faqBlock(communication.faq.title, communication.faq.items)}

## Canonical Repository Resources

- README: ${aiResources.readme}
- Safety policy: ${aiResources.safety}
- Methods registry: ${aiResources.registry}
- Naming and taxonomy: ${aiResources.taxonomy}
- Sources and references: ${aiResources.sources}
- Skills catalog: ${aiResources.skillsCatalog}
- Claude plugin marketplace: ${aiResources.claudeMarketplace}
- Codex plugin marketplace: ${aiResources.codexMarketplace}

## Site Sections

- Methods (${pageUrl(localizedPaths.methods.en)}): the indexed catalogue of civil-resistance method records.
- Domains (${pageUrl(localizedPaths.domains.en)}): the grid of research areas with link-throughs to per-domain pages.
- Skills (${pageUrl(localizedPaths.skills.en)}): applied agent skills paired with the method catalogue and the marketplace install instructions.
- Organizations (${pageUrl(localizedPaths.organizations.en)}): the source-cited registry of organizations whose civil-resistance work appears in the public record.

## Organization Registry Posture

- Profiles describe documented activity attributed to public sources.
- Each profile renders identity, observed activities, public positions, and a sources block. Every claim cites at least one source from the profile's sources list.
- Profiles include a confidence tier (well documented, partially documented, sparse) that reflects the source base — not editorial opinion of the organization.
- Profiles publish in English first; a profile renders only at locale paths where its reviewed translation is complete. Locales without a reviewed translation return 404 for that profile path.
- The registry is research-adjacent reference material. It does not rank organizations, does not endorse, and does not present itself as comprehensive.

## Localized Public Pages

${localizedLinks}

## Agent Use Guidance

- Prefer repository files over generated HTML for detailed method or skill claims.
- Use public pages and FAQ sections for short user-facing summaries.
- Preserve the distinction between applied low-risk skills and descriptive higher-risk records.
- Cite the repository or source-linked project pages when summarizing project claims.
- Keep canonical skill names, method IDs, NVI, Sharp, Claude, and Codex unchanged.
`;

export function GET() {
  return new Response(llmsFullText, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
