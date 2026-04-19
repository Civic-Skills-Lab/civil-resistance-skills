# Repository Guidelines

## Project Structure & Module Organization

This repository is documentation-first. There is no application source tree, build output, or test suite yet.

- `README.md` defines the public project identity: `civil-resistance-skills`.
- `methods-registry/README.md` is the entry point for the method registry.
- `methods-registry/00-naming-and-taxonomy.md` defines naming rules and the domain taxonomy.
- `methods-registry/1000-*.md` through `methods-registry/6000-*.md` contain atomic method records.
- `methods-registry/01-coordinator-skills.md`, `02-command-entrypoints.md`, and `03-sources-and-references.md` contain support metadata.
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
- Atomic method IDs use `<4digit-id>-<slug>`, for example `4108-public-speeches`.
- Coordinator IDs use `<3digit-id>-<slug>`.

Do not encode source names such as Sharp or NVI into skill IDs; keep source provenance in metadata or registry columns.

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

Keep the registry descriptive, not operational. Do not add step-by-step instructions for illegal, deceptive, coercive, or physically dangerous activity. High-risk methods may remain for traceability, education, and simulation, but should not become operational skills without explicit review.
