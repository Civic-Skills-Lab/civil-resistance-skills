# References

Reusable how-to modules lazy-loaded by atomic `SKILL.md` files via plain markdown links. Each file describes **how to perform one preparation action** that recurs across many civil-resistance tactics (research, messaging, marshalling, documentation, contingency, debrief).

## Why a reference library

Public speeches, marches, vigils, petitions, and most other low-risk tactics share ~80% of their preparation: audience research, venue scouting, message discipline, marshal briefing, documentation, press handling, debriefing. Inlining those patterns inside every SKILL.md produces:

- massive body duplication across 293 operational skills
- drift between skills when guidance evolves
- SKILL.md bodies that exceed the 2000-word target

A reference library keeps each preparation pattern in one canonical file. Skills link to it; details stay one edit away.

## Authoring contract

Every file in this directory:

- **Scope.** Describes *one* preparation action. A reader should be able to answer "how do I do X" from a single file.
- **Length.** ≤ 500 words total (including Sources footer).
- **Voice.** Imperative / objective third-person, same as SKILL.md bodies. Use "walk the route", not "you should walk the route".
- **Self-contained.** Does not name any specific skill ID, coordinator ID, or command. The same file is valid whether called from a speech, a march, a vigil, or a boycott.
- **Paraphrased sourcing.** Draws from secondary training sources (CANVAS Core Curriculum, Beautiful Trouble toolbox, ICNC materials, Swarthmore Global Nonviolent Action Database, standard movement training practice). Never copies prose from *Blueprint for Revolution* or CANVAS materials.
- **Risk conscious.** Never contains step-by-step instructions for illegal, deceptive, coercive, or physically dangerous activity. Describes documented patterns and failure modes, not prescriptions.
- **No frontmatter.** References are lazy-loaded by Read tool when Claude follows a link — they are not auto-loaded memory rules. A bare markdown body is sufficient.
- **No version footer.** Files are the live state of the pattern; history lives in git, not inside the content.

## File structure

Each reference file follows the same shape:

```markdown
# <Action name as short imperative phrase>

## Purpose
One-paragraph summary of what this action accomplishes and why it is in the preparation sequence.

## Key patterns
Bulleted list of documented patterns — what skilled practitioners typically do, what distinguishes a well-executed instance.

## Common failure modes
What tends to go wrong, described as observations ("outcomes are worse when X"), not warnings.

## Sources
- Secondary training source attribution (paraphrased from CANVAS / Beautiful Trouble / ICNC / Swarthmore / aggregated movement practice).
```

## Linking from SKILL.md

In an atomic skill's `How to Prepare` section:

```markdown
**Route scouting.** Walk the full route end-to-end on foot before the date.
Detail: [scout-venue](../references/scout-venue.md).
```

One or two sentences of context in the SKILL.md, then a link. The body of the reference holds the detailed pattern. This keeps SKILL.md lean and makes updates propagate to every skill that links the same reference.

## Flat structure (no categories)

All reference files live directly under `skills-catalog/references/` — no subfolders. This follows the Agent Skills best practice: *"Keep files exactly one level deep"* ([mgechev/skills-best-practices](https://github.com/mgechev/skills-best-practices)). File names encode category via prefix where useful (e.g., `brief-*`, `scout-*`).

## Current contents

See the directory listing. Index generated from filenames when file count exceeds navigability threshold (not yet).
