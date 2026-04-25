---
paths:
  - "skills-catalog/**/SKILL.md"
---

# Atomic SKILL.md Contract

Auto-loaded whenever an atomic `SKILL.md` is opened for reading or editing. This rule is the short-form contract; the expanded version with rationale lives in [skills-catalog/README.md](../../skills-catalog/README.md).

## Required frontmatter (11 fields)

`name`, `description`, `type: atomic`, `skill_id`, `source`, `nvi_tactic_id`, `sharp_crosswalk`, `domain_group`, `domain_subgroup`, `risk_status`, `availability`. Optional discovery: `tags`.

`skill_id` format is `<domain-digit><nvi_tactic_id:000>-<slug>`. The first digit maps to `domain_group`; `domain_subgroup` is taxonomy metadata and is not derived from the skill ID.

`description` must be third-person and name at least three concrete trigger phrases.

## Body: 9 sections in strict order

1. `## Summary`
2. `## When to Consult This Skill`
3. `## Core Mechanism`
4. `## Typical Roles and Participants`
5. `## Enabling Conditions`
6. `## Risk Signals and Escalation Triggers`
7. `## How to Prepare`  -  **included iff `availability: operational`**; omitted for `risk_status: high`
8. `## Sources`  -  Primary (descriptive, Sharp/Beer) + Secondary (preparatory, paraphrased) + Evidence caveat
9. `## Definition of Done`  -  generic contract + 3-6 skill-specific invariants; **checkboxes always unchecked `[ ]`**

Body <= 2000 words. Imperative / objective third-person form.

## Forbidden

- `## Related Atomic Methods` or `## Coordinator Dependencies` body headings  -  the skill contains only its own logic.
- Naming other skill IDs (`4004-*`, `4104-*`, ...), coordinator IDs (`101-*`, `404-*`, ...), or slash-commands (`/nv-*`) in body prose. Tactic concepts ("speech", "vigil", "rally") are fine as real-world nouns.
- `@path` import syntax  -  that is CLAUDE.md / memory-layer only, not SKILL.md.
- `**MANDATORY READ**` prose convention  -  sibling-repo stylistic choice, not an Anthropic standard.
- Direct quotation from *Blueprint for Revolution* or CANVAS materials. Paraphrase only.
- Step-by-step instructions for illegal, deceptive, coercive, or physically dangerous activity  -  at any risk tier.
- Pre-checked DoD boxes (`- [x]`). They are verification criteria, not author attestation.

## Required

- External references via plain markdown links: `[name](relative/path.md)`.
- `Version:` + `Last Updated:` footer (`YYYY-MM-DD`) at file end.
- Omit manual `related_skills:` unless a future canonical source supplies tactic relationships.

## Verification commands

Run from repo root when editing:

```bash
# section count (expect 9 per file when availability=operational; 8 when high-risk omits How to Prepare)
grep -c "^## " skills-catalog/<skill-id>/SKILL.md

# no cross-refs
grep -E "/nv-|`[0-9]{4}-|`[0-9]{3}-" skills-catalog/<skill-id>/SKILL.md

# no pre-checked boxes
grep -c "- \[x\]" skills-catalog/<skill-id>/SKILL.md   # expect 0
```
