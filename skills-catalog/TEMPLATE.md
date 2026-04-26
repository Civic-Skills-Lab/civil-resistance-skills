# Atomic Skill Template

Use this template when creating a new `skills-catalog/<skill-id>/SKILL.md`. The template is authoring guidance, not a registered skill, and should not be listed in `.claude-plugin/marketplace.json`.

The generated skill must stay source-faithful, risk-gated, and descriptive. It should describe one atomic method as a standalone taxonomic entry. Do not add a manual `related_skills` graph unless a future source explicitly provides canonical relationships.

## Frontmatter Template

```yaml
---
name: <Human-readable method name>
description: >
  This skill describes <method name> as a civil-resistance tactic. Consult when
  a user asks to "<trigger phrase 1>", "<trigger phrase 2>", "<trigger phrase 3>",
  or requests risk analysis of <method-specific situation>.

type: atomic
skill_id: <domain-digit><nvi_tactic_id:000>-<slug>
source: beer_nvi
nvi_tactic_id: <integer>
sharp_crosswalk: "<three-digit Sharp ID or ->"
domain_group: <gov|econ|labr|comm|soc|intv>
domain_subgroup: <taxonomy heading code, e.g. 41xx>
source_family: <registry/source family, if known>
source_category: <registry/source category, if known>
corpus_status: included
risk_status: <low|medium|high>
availability: <operational|educational|simulation_only|reference_only>

tags: [<short-discovery-tag>, <short-discovery-tag>, <short-discovery-tag>]
---
```

Frontmatter rules:

- `skill_id` is derived from the project domain digit and zero-padded NVI tactic ID.
- `domain_subgroup` is taxonomy metadata from the registry heading; it is not derived from `skill_id`.
- `risk_status` comes from the registry `Risk` column.
- `availability: operational` is allowed only for registry `Risk: review`.
- `related_skills` is omitted by default because NVI/Beer does not provide canonical tactic relationships. Relatedness can be inferred later from shared metadata.
- `tags` are discovery hints only; they are not provenance claims.

## Body Template

```markdown
# <Method Name>

## Summary

One short paragraph. Define the method, the visible signal it creates, and the main caveat. Avoid effectiveness claims at atomic-method level unless framed as campaign-dependent.

## When to Consult This Skill

Use 4-6 bullets naming concrete situations that should trigger this skill. Phrase as user/planner needs, not as commands.

## Core Mechanism

Explain how the method creates pressure or meaning. Name the main channels of effect. Distinguish target audience, participant signal, and amplification path where relevant.

## Typical Roles and Participants

List observed roles in historical or training-derived cases. Keep them descriptive. Do not imply every role is mandatory.

## Enabling Conditions

List contextual conditions that tend to make the method legible or coherent. Phrase as correlations and historical tendencies, not guarantees.

## Risk Signals and Escalation Triggers

List conditions where outcomes tend to worsen. Include legal, narrative, safety, reputational, and documentation risks where relevant. Do not provide instructions for illegal, deceptive, coercive, or physically dangerous conduct.

## How to Prepare

Include this section only when `availability: operational`.

Write descriptive preparation patterns, not a rigid playbook. Use phrasing such as "stronger preparations usually include", "documented cases often", and "outcomes tend to be worse when". Cover only low-risk preparation: planning patterns, role clarity, legal posture, documentation, contingency, and debrief.

Keep `SKILL.md` concise. Detailed questionnaires, research protocols, reusable templates, examples, rehearsal checklists, and workbooks should live in per-skill `references/` files linked directly from `How to Prepare`. Keep references one level deep from `SKILL.md`; do not make a chain of references that requires loading one reference to discover another.

Omit this section entirely when `risk_status: high`.

## Sources

**Primary (descriptive, taxonomic):**

- Beer NVI #<id> / Sharp #<id or ->: canonical taxonomic entry for "<method name>".
- Albert Einstein Institution, *198 Methods of Nonviolent Action*.
- Michael Beer / ICNC, *Civil Resistance Tactics in the 21st Century*.
- Full source index: [../methods-registry/03-sources-and-references.md](../methods-registry/03-sources-and-references.md)

**Secondary (preparatory, training-derived, paraphrased):**

- Include only sources actually used for the preparatory layer.

**Evidence caveat:** [../civil-resistance-evidence-and-critique.md](../civil-resistance-evidence-and-critique.md): method-level effectiveness claims for isolated tactics outrun the evidence base.

## Definition of Done

User-value checks for this skill. Keep boxes unchecked; they are review criteria, not author attestation. Generic repository lint rules live in `skills-catalog/README.md`.

- [ ] <The skill produces its intended user-facing artifact or decision support.>
- [ ] <Missing inputs, assumptions, or unresolved evidence gaps are explicit.>
- [ ] <Method-specific risks are reviewed before the user acts.>
- [ ] <Any linked reference templates needed for the skill are present and usable.>

---

**Version:** 0.1.0
**Last Updated:** YYYY-MM-DD
```

## Section Guidance

| Section | Purpose | Include | Avoid |
|---|---|---|---|
| `Summary` | Compact identity and caveat | Method definition, signal, evidence caveat | Claims that the method works by itself |
| `When to Consult This Skill` | Activation surface | Concrete trigger phrases and planning situations | Generic "use this for protest" language |
| `Core Mechanism` | Theory of the method | Pressure channels, audience, amplification | Strategy advice that belongs to coordinators |
| `Typical Roles and Participants` | Role vocabulary | Observed roles and compressed variants | Mandatory staffing checklists |
| `Enabling Conditions` | Context fit | Conditions that improve legibility | Guarantees, universal prerequisites |
| `Risk Signals and Escalation Triggers` | Safety and blowback | Legal, narrative, safety, documentation risks | Mitigation instructions for dangerous or illegal acts |
| `How to Prepare` | Low-risk preparation patterns | Planning, role clarity, legal posture, documentation, contingency, debrief; direct links to per-skill references for detailed templates | Step-by-step playbooks, deception, coercion, evasion; long questionnaires or workbooks inline |
| `Sources` | Provenance and caveat | Primary taxonomy, secondary preparation sources, evidence caveat | Unsupported source claims |
| `Definition of Done` | User-value review checklist | 3-6 method-specific output, evidence, risk, and reference usability checks | Generic repo-lint criteria, checked boxes, or self-attestation |

## Validation Commands

Run from repository root after creating or editing a skill:

```powershell
$file = "skills-catalog/<skill-id>/SKILL.md"
((Get-Content $file) -match '^## ').Count
rg "related_skills|skills-catalog/communi[c]ation|@path|MANDATORY READ|/nv-|`[0-9]{4}-|`[0-9]{3}-" $file
rg "- \[x\]" $file
```

Expected results:

- Section count is 9 for operational skills and 8 for high-risk skills.
- No forbidden or stale marker hits.
- No checked DoD boxes.
