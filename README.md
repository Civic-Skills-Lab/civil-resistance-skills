# Civil Resistance Skills

`civil-resistance-skills` is a skill registry for civil resistance and nonviolent action methods.

The project organizes 347 atomic method records from the Beer/NVI/ICNC tactic universe into a domain-first taxonomy, with coordinator skills for strategy, planning, risk review, and simulation.

Codename: **Beautiful Country To Come**.

## Registry

The methods registry lives in `methods-registry/README.md`.

Core layers:

- Atomic method records: `methods-registry/1000-governance.md` through `methods-registry/6000-intervention.md`.
- Coordinator skills: `methods-registry/01-coordinator-skills.md`.
- Command entrypoints: `methods-registry/02-command-entrypoints.md`.
- Sources and references: `methods-registry/03-sources-and-references.md`.

## Scope

The registry is not a cookbook. It is a structured reference and simulation substrate for historical tactical patterns, coordinator-driven analysis, and risk-aware skill generation.

High-risk methods remain in the registry for traceability, education, and simulation, but are excluded from operational skill generation until explicitly reviewed.

## Plugin Packaging

`skills-catalog/` is the canonical authoring surface. Claude Code and Codex use separate marketplace surfaces generated from that catalog:

- Claude Code: `.claude-plugin/marketplace.json` plus self-contained plugin directories under `plugins/<domain>/`.
- Codex: `.agents/plugins/marketplace.json` plus `.codex-plugin/plugin.json` manifests and thin `codex-skills/` adapters.

Install and enable the marketplace through one agent surface at a time to avoid duplicate skill discovery.
