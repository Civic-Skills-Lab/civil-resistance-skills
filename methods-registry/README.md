# Methods Registry

Index for the `civil-resistance-skills` method registry. Domain files hold atomic method records; support files hold taxonomy, coordinator, command, and reference metadata.

File prefixes use two conventions:

- `NN-*` files are registry/support documents ordered for reading.
- `1000-*` through `6000-*` files are atomic method domain groups and match the method ID hierarchy.

## Atomic Method Registry

The registry is organized by the complete domain taxonomy, not by source author. It contains the current live Beer/NVI/ICNC tactic index: 347 records total, covering IDs `1-346` plus live ID `348` (`tactic_id=347` is absent from the source index). Sharp provenance is retained as optional crosswalk metadata, not as the organizing structure.

Generated `SKILL.md` metadata should preserve the registry row and add structured fields:

```yaml
source: beer_nvi
nvi_tactic_id: 148
sharp_crosswalk: 090
domain_group: gov | econ | labr | comm | soc | intv
domain_subgroup: 14xx
source_family: political_noncooperation
source_category: action_by_government_personnel
corpus_status: included | deprecated | duplicate
risk_status: low | medium | high
availability: operational | educational | simulation_only | reference_only
```

The `Risk` column in each domain table is canonical for the registry. Current row values are `review` and `high`. Rows marked `high` remain eligible for historical analysis, education, or simulation, but are excluded from operational `SKILL.md` generation until explicitly reviewed.

## Registry Files

| File | Contents |
|---|---|
| `methods-registry/00-naming-and-taxonomy.md` | Naming scheme, ID semantics, active domain taxonomy. |
| `methods-registry/1000-governance.md` | Governance and political power atomic methods. |
| `methods-registry/2000-economic.md` | Economic pressure and alternatives atomic methods. |
| `methods-registry/3000-labor.md` | Labor and workplace power atomic methods. |
| `methods-registry/4000-communication.md` | Communication, symbols, media, and public narrative atomic methods. |
| `methods-registry/5000-social.md` | Social, community, and cultural relations atomic methods. |
| `methods-registry/6000-intervention.md` | Nonviolent intervention and presence atomic methods. |
| `methods-registry/01-coordinator-skills.md` | CANVAS/Popovic/Helvey coordinator skills. |
| `methods-registry/02-command-entrypoints.md` | Slash-command workflow entrypoints. |
| `methods-registry/03-sources-and-references.md` | Source links and shared lazy-loaded reference artifacts. |

## Current Counts

- **347** atomic method records / skill candidates.
- **18** coordinator skills.
- **6** command entrypoints.
- **6** shared references.
- **54** high-risk method records; the canonical risk flag is the `Risk` column in each domain table.
- Current live NVI coverage: IDs `1-346` plus `348`; source ID `347` is absent.

## Loading Rule

For focused work, load `00-naming-and-taxonomy.md` plus the smallest relevant domain file. Risk is read directly from the relevant domain table row.
