# Skills Catalog

Generated `SKILL.md` files for atomic civil-resistance methods. Each skill is a self-contained directory with a `SKILL.md` file and optional bundled resources.

Use [TEMPLATE.md](TEMPLATE.md) as the authoring template for new atomic skills.

## Layout

```text
skills-catalog/
|-- README.md
|-- <skill-id>/
|   |-- SKILL.md
|   |-- references/   # optional, per-skill reference docs
|   |-- scripts/      # optional
|   `-- assets/       # optional
`-- references/       # shared reusable preparation references
```

Flat structure: `skills-catalog/<skill-id>/SKILL.md`. Domain is carried by the first digit of `skill_id`, by the `domain_group:` frontmatter field, and by plugin registration in [../.claude-plugin/marketplace.json](../.claude-plugin/marketplace.json). There are no domain subdirectories.

## ID Scheme

Atomic method IDs use the NVI tactic ID for source compatibility:

```text
<domain-digit><nvi_tactic_id:000>-<slug>
```

Examples:

- `4104-public-speeches` = communication domain (`4`) + NVI tactic `104`.
- `4004-marches` = communication domain (`4`) + NVI tactic `004`.
- `3348-refusal-of-payment` = labor domain (`3`) + NVI tactic `348`.

Active domain digits:

| Digit | Domain code | Plugin | Registry file |
|---:|---|---|---|
| `1` | `gov` | `civil-resistance-governance` | `methods-registry/1000-governance.md` |
| `2` | `econ` | `civil-resistance-economic` | `methods-registry/2000-economic.md` |
| `3` | `labr` | `civil-resistance-labor` | `methods-registry/3000-labor.md` |
| `4` | `comm` | `civil-resistance-communication` | `methods-registry/4000-communication.md` |
| `5` | `soc` | `civil-resistance-social` | `methods-registry/5000-social.md` |
| `6` | `intv` | `civil-resistance-intervention` | `methods-registry/6000-intervention.md` |

`7xxx` is reserved. `domain_subgroup` remains required metadata, but it is not derived from the skill ID.

## Skill Types

Only `atomic` skills live in this catalog. Operational skills (coordinators and commands) are declared in the registry and will receive their own templates in future work.

| Type | Nature | Phase model | Location |
|---|---|---|---|
| `atomic` | Descriptive ontology of a single method plus preparatory guidance for low-risk methods | None - static reference data | `skills-catalog/<skill-id>/SKILL.md` |
| `coordinator` | Lens / planner over atomic methods | Phase 0 Config -> Discovery -> Plan -> Delegate -> Verify -> Self-check | [../methods-registry/01-coordinator-skills.md](../methods-registry/01-coordinator-skills.md) (index); files TBD |
| `command` | User-facing entrypoint workflow | Phase 0 Recovery -> Discovery -> Preflight -> Execute -> Debrief | [../methods-registry/02-command-entrypoints.md](../methods-registry/02-command-entrypoints.md) (index); files TBD |

## Scope: descriptive base plus risk-gated preparatory layer

Canonical sources (Sharp, *198 Methods of Nonviolent Action*, 1973; Beer / ICNC, *Civil Resistance Tactics in the 21st Century*) are taxonomies, not handbooks. Operational preparation guidance comes from secondary training sources: CANVAS Core Curriculum, Beautiful Trouble toolbox, ICNC materials, Swarthmore Global Nonviolent Action Database case studies, and standard movement media / marshalling training.

Atomic `SKILL.md` files combine both layers within the bounds of [../AGENTS.md](../AGENTS.md) Agent-Specific Instructions:

- **Descriptive base (required).** Summary, mechanism, roles, conditions, risks. Source-faithful to Sharp/Beer.
- **Preparatory layer (conditional).** Included only when `availability: operational` (i.e. registry `Risk: review`, not `high`). Paraphrased from secondary sources; never copied from *Blueprint for Revolution* or CANVAS materials. Descriptive patterns, not scripted playbooks.
- **High-risk methods (`risk_status: high`).** Strictly descriptive. No `How to Prepare` section. `availability` must be one of `educational | simulation_only | reference_only`.

Atomic skills do **not** reference other skills, coordinators, or slash-commands in body prose. A skill contains only its own logic. NVI/Beer does not provide a canonical tactic relationship graph, so `related_skills:` is omitted by default. Relatedness can be inferred later from metadata such as `domain_subgroup`, `source_family`, `source_category`, risk, and availability.

## Atomic SKILL.md contract

Every `skills-catalog/<skill-id>/SKILL.md` conforms to this contract:

1. **YAML frontmatter** with required Anthropic Agent Skills fields (`name`, `description`) plus registry provenance (`type: atomic`, `skill_id`, `source`, `nvi_tactic_id`, `sharp_crosswalk`, `domain_group`, `domain_subgroup`, `risk_status`, `availability`) and optional lightweight discovery (`tags`).
2. **Body in imperative / objective third-person form**, <=2000 words, with these sections in order:
   - `Summary` (required)
   - `When to Consult This Skill` (required)
   - `Core Mechanism` (required)
   - `Typical Roles and Participants` (required)
   - `Enabling Conditions` (required)
   - `Risk Signals and Escalation Triggers` (required)
   - `How to Prepare` **(included when `availability: operational`; omitted when `risk_status: high`)**
   - `Sources` (required)
   - `Definition of Done` (required; unchecked boxes; skill-specific user-value checks)
3. **`How to Prepare` content rules.**
   - Draw from secondary training sources (CANVAS Core Curriculum, Beautiful Trouble, ICNC materials, Swarthmore case studies, general movement media / marshalling training).
   - Paraphrase only. No copied prose, exercises, or diagrams from *Blueprint for Revolution* or CANVAS materials.
   - Present as descriptive patterns and contingencies, not scripted playbooks.
   - Never step-by-step for illegal, deceptive, coercive, or physically dangerous activity.
   - Attribute secondary-source inspiration in `Sources`.
4. **Body contains only own logic.** No naming of other skill IDs, coordinator IDs, slash-commands, or file paths of other skills in body prose. Tactic concepts ("speech", "vigil", "rally") may appear as real-world concepts without cross-referencing other `SKILL.md` files.
5. **External resource references use plain markdown links** per the official Agent Skills spec ([code.claude.com/docs/en/skills - Add supporting files](https://code.claude.com/docs/en/skills)). Not the `@path` import syntax, and not the `**MANDATORY READ**` prose convention.
6. **Descriptive, not prescriptive.** Use phrasing like "outcomes are historically worse when X" rather than "you must X".
7. **`Version:` + `Last Updated:`** footer (`YYYY-MM-DD`).
8. **`Definition of Done` checkboxes stay unchecked (`- [ ]`).** They are skill-specific user-value checks, not author attestation. Generic repository contract checks are validated externally.

## Derivation rules

| Frontmatter field | Source |
|---|---|
| `skill_id` | Domain digit + zero-padded `nvi_tactic_id` + registry slug |
| `nvi_tactic_id`, `sharp_crosswalk` | Registry row in `../methods-registry/NNNN-<domain>.md` |
| `domain_group` | First digit of `skill_id` mapped through the active domain table |
| `domain_subgroup` | Registry table heading / taxonomy metadata; not derived from `skill_id` |
| `risk_status` | Registry `Risk` column: `review` -> `low` or `medium`; `high` -> `high` |
| `availability` | `high` risk -> never `operational`; `review` default `operational` |
| Folder placement | Flat `skills-catalog/<skill-id>/SKILL.md` |
| Inclusion of `How to Prepare` | `availability == operational` |
| `name`, `description`, body | Human-authored (AI-assisted), reviewed for policy compliance |

## Loading protocol (progressive disclosure)

1. **Level 1 (always):** YAML frontmatter of all files serves as the tactic index for consuming agents via marketplace plugin registration.
2. **Level 2 (on trigger):** Full body of a specific `SKILL.md` when Claude Code decides the skill is relevant (description match) or the user invokes it directly.
3. **Level 3 (as-needed):** Shared reference artifacts from [../methods-registry/03-sources-and-references.md](../methods-registry/03-sources-and-references.md) or per-skill bundled `references/` loaded by direct markdown-link reference inside the body.

## Marketplace integration

When adding a new `SKILL.md`, append its path (e.g. `./skills-catalog/4104-public-speeches`) to the matching plugin's `skills:` array in [../.claude-plugin/marketplace.json](../.claude-plugin/marketplace.json).

## Validation (external)

Checked via grep/lint, not duplicated inside each skill's `Definition of Done`:

- Frontmatter contains all 11 required fields.
- `description` uses third person and names at least three concrete trigger phrases.
- Body has all required sections; `How to Prepare` present iff `availability == operational`.
- No `## Related Atomic Methods` or `## Coordinator Dependencies` headings.
- No references to other skill IDs, coordinator IDs, or slash-commands in body prose.
- No step-by-step for illegal/deceptive/coercive/dangerous activity.
- No direct quotation from *Blueprint for Revolution* or CANVAS materials.
- No manual `related_skills` field unless a future canonical source supplies tactic relationships.
- Body <= 2000 words.
- Each skill directory listed in a plugin's `skills:` array in `marketplace.json`.
- Skill directory placed directly under `skills-catalog/`.

## Current contents

- `4104-public-speeches/SKILL.md` - Public speeches (Sharp #001 / NVI #104)
- `4004-marches/SKILL.md` - Marches (Sharp #038 / NVI #004)
- `TEMPLATE.md` - authoring template for future atomic skills; not registered as a skill.

Registry row counts in [../methods-registry/README.md](../methods-registry/README.md#current-counts) are canonical; generated skill files are derivative and do not change registry totals.
