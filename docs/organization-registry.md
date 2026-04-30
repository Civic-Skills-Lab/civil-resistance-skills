# Organization Registry — Content Model and Editorial Rules

This document is the editorial spec for the organization registry that will appear as a dedicated section of the Civil Resistance Skills site. It defines what kinds of organizations may be profiled, what each profile must contain, how claims must be sourced, and what tone and wording are out of bounds. It does not yet describe routing, page templates, file layout, or build pipeline; those decisions belong to follow-up tasks under [issue #1](https://github.com/Civic-Skills-Lab/civil-resistance-skills/issues/1).

The registry is research-adjacent reference material. It is not a directory of recommended partners, an endorsement list, or a campaign tool. Its purpose is to help readers understand who has been publicly associated with civil-resistance research, training, education, documentation, archiving, or methodological work, and to point them to the public record those associations rest on.

## Scope

In scope:

- organizations whose civil-resistance-related activity is documented in primary or reputable secondary public sources;
- educational, research, training, archival, journalistic, legal, and methodological organizations whose public output a careful reader might encounter while working through this atlas;
- organizations whose names appear in the registry's primary taxonomic sources (Sharp, Beer/ICNC, Albert Einstein Institution, Swarthmore Global Nonviolent Action Database) or in the secondary preparatory sources used by skills (CANVAS Core Curriculum, Beautiful Trouble toolbox, ICNC training materials).

Out of scope:

- individual people and named small groups;
- political parties, candidate campaigns, and electoral coalitions;
- state agencies, security services, intelligence services, militaries, and paramilitary formations;
- organizations whose public record is dominated by violent, coercive, deceptive, or unlawful conduct;
- private companies whose only relevant connection is supplying tools or services that incidentally appear in protest contexts;
- organizations whose relevance cannot be established from public sources without speculation.

A profile is included because the public record supports a careful description, not because the organization is interesting, popular, or aligned with any particular position. Borderline cases default to omission.

## Profile data model

Each profile records the following fields. Fields without a documented public source are omitted rather than guessed.

- **name** — the organization's primary public name in its working language. Use the form the organization itself uses on its public website or registration where one exists.
- **also_known_as** — additional names, acronyms, predecessors, or transliterations attested in sources. Optional.
- **type** — one of: `research`, `training`, `education`, `archive`, `journalism`, `legal_support`, `documentation`, `methodology`, `convening`. The type describes the organization's documented public function, not its self-description.
- **geography** — primary country or region of operation, attested in public sources. Use country names in English, and add a short qualifier when the public footprint is multi-regional or diasporic.
- **founded** — year, or `unknown` if no reliable public source exists.
- **active_status** — one of: `active`, `dormant`, `dissolved`, `unknown`. Reflects what public sources currently report; not a forecast.
- **focus_areas** — short tag list drawn from a controlled vocabulary maintained alongside the registry. Tags describe documented activity, not aspiration. The controlled vocabulary is an out-of-scope follow-up; until it exists, profiles use lowercase free-text tags and the editor records each new tag in the profile's notes for later normalization.
- **observed_activities** — 2–6 bullets summarizing activities the public record attributes to the organization. Each bullet is a paraphrase grounded in a cited source. Bullets describe what was reported, not why it matters.
- **public_positions** — 0–6 bullets summarizing positions the organization has stated publicly, attributed to the organization itself (founding documents, official statements, charter, public site). Each bullet must cite the document. Positions reported only by third parties belong in `observed_activities` with the third-party attribution.
- **sources** — at least two independent public sources per profile. Primary sources (the organization's own public materials) are listed first; secondary sources (academic publications, established journalism, the registry's taxonomic sources) follow. Sources are linked or fully cited so a reader can verify each claim.
- **confidence** — one of: `well_documented`, `partially_documented`, `sparse`. Reflects the quality and independence of available public sources, not the editor's opinion of the organization.
- **last_reviewed** — `YYYY-MM-DD` of the most recent editorial review. The registry surfaces this date so readers can judge freshness.
- **notes** — optional editor notes about source gaps, contested attributions, or open questions. Notes are visible to readers, not internal-only.

The data model is intentionally narrow. Fields that would invite unsupported judgement (impact rating, effectiveness score, recommendation, alignment) are not part of the model and must not be added by ad-hoc convention.

## Sourcing rules

Every claim in a profile traces to at least one cited public source. Profiles do not include claims sourced only from private correspondence, internal documents, leaked material, or anonymous tips.

Primary sources are the organization's own public materials: official site, founding charter, annual report, public statements, registered filings. Primary sources establish what the organization says about itself.

Secondary sources are independent of the organization: peer-reviewed publications, established journalism, the registry's taxonomic sources (Sharp, Beer/ICNC, Albert Einstein Institution, Swarthmore Global Nonviolent Action Database), and reputable training-source publications (CANVAS, Beautiful Trouble, ICNC). Secondary sources establish what others have publicly said about the organization.

A profile must include at least one secondary source. Profiles that rely entirely on the organization's own materials are dropped to `sparse` confidence and reviewed before publication.

Quotation rules from the wider repository apply: paraphrase only, attribute training-source inspiration, and do not directly quote prose, exercises, or diagrams from *Blueprint for Revolution* or CANVAS materials.

## Wording rules

The registry is descriptive, not promotional, and not adversarial. Profiles describe documented activity and let readers form their own conclusions.

Required wording posture:

- describe the public record, not motivations; "publicly reports" rather than "advocates for";
- use cautious verbs: "documents", "reports", "publishes", "trains", "convenes", "archives", "researches";
- attribute every characterization: "according to its founding charter", "as reported by [secondary source]";
- distinguish primary, secondary, and contested claims: "the organization's site states X; researcher Y reports Z";
- prefer dated claims: "as of 2024" rather than open-ended present tense;
- describe scope honestly: "limited public information" is preferable to filling gaps with adjacent assumptions.

Forbidden wording:

- claims that the registry is first, unique, complete, comprehensive, definitive, official, or authoritative;
- claims that the registry is a directory of trusted, recommended, vetted, partner, or aligned organizations;
- ranking, scoring, or comparative judgement between organizations;
- adjectives that imply effectiveness, importance, or moral standing without source backing ("leading", "premier", "influential", "controversial", "notorious");
- speculation about funding, intent, alliances, or future plans;
- restatements of unverified claims as if verified;
- generalizations about people associated with the organization that are not separately sourced;
- language that targets identifiable individuals or named small groups associated with the organization.

## Confidence and risk handling

Confidence is a property of the source base, not the editor.

- **well_documented** — three or more independent secondary sources, plus primary materials. The profile can describe activities and positions concisely.
- **partially_documented** — two independent sources, with gaps the editor has identified. The profile names the gaps in `notes`.
- **sparse** — fewer than two independent sources, or contested attribution. The profile is short, names the gap explicitly, and may be deferred until sources improve.

Risk-adjacent profiles (organizations whose public record includes high-risk methods such as those in the registry's `Risk: high` rows) follow the same descriptive-only posture as the rest of the project. The profile records what the public record says about the organization and links to the relevant taxonomy entries; it does not contain operational guidance, nor does it endorse or condemn the organization's documented activity. If a profile cannot be written without becoming an endorsement or a denouncement, the entry is omitted.

## Process

A profile moves through three stages:

1. **Draft.** The editor compiles primary and secondary sources, fills the data model fields, paraphrases observed activities and public positions, and records open questions in `notes`. Drafts live in a working location outside the published site until review is complete.
2. **Review.** A second reader checks every claim against its cited source, confirms wording matches the rules above, confirms confidence reflects the source base, and confirms scope and disallowed-content rules are respected. Review produces either a publishable profile or a list of changes.
3. **Publish.** The reviewed profile is added to the registry data file and rendered into the listing and profile pages. The `last_reviewed` field is set to the publication date.

Review notes from earlier rounds are not preserved in the public profile. Substantive changes after publication trigger a new `last_reviewed` date and, where appropriate, a short visible changelog at the foot of the profile.

Profiles that fail review are not published. They are not silently downgraded into looser claims to reach a publishable state.

## Localization

The registry is content like the rest of the site, and localized versions follow the same translation discipline used in [`docs/operations.md`](operations.md) and `site-src/src/data/site-content.json`. Translations preserve the wording rules, the cautious verbs, and the explicit attributions; they do not flatten distinctions between primary and secondary sources or between attested and contested claims.

A profile is publishable in English first. Translations are added when the editorial review is complete and a translator can preserve the wording posture; partial translations are not published.

## Out of scope for this document

The following decisions are deliberately deferred to follow-up tasks linked from [issue #1](https://github.com/Civic-Skills-Lab/civil-resistance-skills/issues/1):

- routing and URL shape for the registry section and individual profiles;
- the data file format and storage layout for profiles;
- the listing experience: filters, sort, and card design;
- the profile experience: section order, table-of-contents, and source-display pattern;
- the controlled focus-area vocabulary and how it is maintained;
- the migration plan for existing homepage anchor links;
- build-time validation rules and lint checks for profiles;
- the discoverability strategy for the new section, including sitemap and `llms.txt` updates.

This spec is the editorial floor those tasks build on. If a follow-up task uncovers a content rule that conflicts with this spec, the spec is updated first and the task adjusts.
