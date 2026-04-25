---
paths:
  - "skills-catalog/**"
  - "methods-registry/**"
---

# Civil Resistance Content Policy

Auto-loaded when working on any file under `skills-catalog/` or `methods-registry/`. This is the short-form policy; the canonical human-readable version lives in [AGENTS.md section Agent-Specific Instructions](../../AGENTS.md).

## Registry vs skills: separation of concerns

- `methods-registry/` tables (`1000-*.md` ... `6000-*.md`) are **taxonomy only**. Rows classify methods. Rows do not teach methods. Never add preparatory content to a registry row.
- `skills-catalog/<skill-id>/SKILL.md` are **skill documents**. They describe + (for low-risk) prepare. Never modify the registry row tables when writing a skill.

## Risk gating

Derived from the registry `Risk` column of the matching taxonomy row:

| Registry `Risk` | Skill frontmatter `risk_status` | `availability` | `How to Prepare` section |
|---|---|---|---|
| `review` (default) | `low` or `medium` | `operational` | **included** |
| `high` | `high` | `educational` / `simulation_only` / `reference_only`  -  **never** `operational` | **omitted** |

Operational preparatory guidance is gated by risk tier, not blanket-allowed.

## Source discipline

- **Primary (descriptive)** sources: Sharp *198 Methods of Nonviolent Action*, Beer/ICNC *Civil Resistance Tactics in the 21st Century*, Albert Einstein Institution 198 Methods list. Cite by method number.
- **Secondary (preparatory)** sources: CANVAS Core Curriculum, Beautiful Trouble toolbox, ICNC training materials, Swarthmore Global Nonviolent Action Database case studies, standard movement media / marshalling training.
- **Paraphrase only.** No direct quotation of prose, exercises, or diagrams from *Blueprint for Revolution* (Popovic) or CANVAS materials. Attribute secondary-source inspiration in `Sources`.

## Hard prohibitions (all tiers)

- No step-by-step instructions for illegal, deceptive, coercive, or physically dangerous activity.
- No endorsement of violence or violent-flank coordination.
- No content that targets identifiable individuals or named small groups.
- No operational content for high-risk methods regardless of framing.

## Tone

Descriptive, not prescriptive. Use phrasing like *"outcomes are historically worse when X"* rather than *"you must X"*. The skill describes documented patterns; it does not command.

## Evidence caveat

Method-level effectiveness evidence is thin. Campaign-level evidence is stronger (Chenoweth / NAVCO). Do not make causal claims at the atomic tactic level. Link to [civil-resistance-evidence-and-critique.md](../../civil-resistance-evidence-and-critique.md) in `Sources` when making effectiveness-adjacent statements.
