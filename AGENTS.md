# Repository Guidelines

## Project Structure & Module Organization

This repository is documentation-first. There is no application source tree, build output, or test suite yet.

- `README.md` defines the public project identity: `civil-resistance-skills`.
- `methods-registry/README.md` is the entry point for the method registry.
- `methods-registry/00-naming-and-taxonomy.md` defines naming rules and the domain taxonomy.
- `methods-registry/1000-*.md` through `methods-registry/6000-*.md` contain atomic method records.
- `methods-registry/01-coordinator-skills.md`, `02-command-entrypoints.md`, and `03-sources-and-references.md` contain support metadata.
- `skills-catalog/<skill-id>/SKILL.md` holds generated atomic-method skill files (flat layout, no domain subdirectories). Domain is carried in the first skill-id digit, `domain_group`, and plugin registration. See `skills-catalog/README.md` for the atomic-skill contract and the `atomic` / `coordinator` / `command` type taxonomy.
- `.claude-plugin/marketplace.json` registers six domain plugins (`civil-resistance-<domain>`), each listing the `skills-catalog/` paths that belong to that domain.
- `nonviolent-skills-research.md` and `civil-resistance-evidence-and-critique.md` are research notes.

## Build, Test, and Development Commands

There is no build system. Use lightweight validation commands before committing:

```powershell
git status --short
git diff --stat
rg "Part [A-Z]|methods-registry\.md|corpus-intake|[1-6]xxx-" .
```

Use `rg` to search content and verify stale names or legacy structure are not reintroduced. For registry edits, manually verify method counts and table structure.

## Coding Style & Naming Conventions

Write Markdown in concise English. Use ATX headings (`#`, `##`) and avoid decorative separators unless they add meaning.

Registry naming rules:

- Support files use two-digit prefixes: `00-`, `01-`, `02-`, `03-`.
- Domain files use top-level numeric groups: `1000-governance.md` through `6000-intervention.md`.
- Atomic method IDs use `<domain-digit><nvi_tactic_id:000>-<slug>`, for example `4104-public-speeches`.
- Coordinator IDs use `<3digit-id>-<slug>`.

Do not encode source names such as Sharp or NVI into skill IDs. The NVI numeric tactic ID is included for source compatibility; source names and other provenance stay in metadata or registry columns.

## Testing Guidelines

No automated tests exist. Treat documentation consistency as the test surface. After changes, check:

- registry totals remain accurate;
- taxonomy subgroup counts match domain tables;
- high-risk rows remain marked in the `Risk` column;
- local links point to existing files.

## Commit & Pull Request Guidelines

Current history uses concise sentence-case commits, for example `Initial civil resistance skills registry`.

Pull requests should include:

- a short summary of changed files;
- any count changes to atomic methods, coordinators, commands, or references;
- source/license notes when adding external material;
- risk handling notes for any new or changed high-risk method.

## Agent-Specific Instructions

Registry row tables (`<NNNN>-*.md`) stay strictly descriptive  -  the taxonomy layer classifies methods, it does not teach them.

Generated atomic `SKILL.md` files are gated by the registry `Risk` column:

- **Low-risk (`Risk: review` with `availability: operational`)**: the skill file may include preparatory guidance  -  planning patterns, role assignments, contingency notes, post-event debrief  -  drawn from secondary training sources. Acceptable sources: CANVAS Core Curriculum, Beautiful Trouble toolbox, ICNC training materials, Swarthmore Global Nonviolent Action Database case studies, standard movement media training. Keep guidance as descriptive patterns and contingencies, not scripted playbooks, and paraphrase only  -  never copy prose, exercises, or diagrams from *Blueprint for Revolution* or CANVAS materials.
- **High-risk (`Risk: high`)**: the skill file stays strictly descriptive. No preparatory section, no operational availability, no step-by-step content. High-risk methods remain for traceability, education, and simulation; they do not become operational skills without explicit review.

Across all risk tiers, never add step-by-step instructions for illegal, deceptive, coercive, or physically dangerous activity.
