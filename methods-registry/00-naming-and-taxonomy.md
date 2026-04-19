# Naming and Taxonomy

Naming rules, artifact ID semantics, and the domain taxonomy for atomic method records.

## Naming scheme

Current skill IDs are code-first and domain-oriented. Source taxonomies are metadata, not part of the skill name.

```text
Atomic method skill: <4digit-id>-<slug>
Coordinator skill:   <3digit-id>-<slug>
Command entrypoint:  /nv-<command>
Reference artifact:  <3digit-id>-ref-<slug>
```

ID length carries the artifact type:

- `4 digits` = atomic method record / skill candidate.
- `3 digits` = coordinator skill.
- `3 digits + cmd/ref marker` = command or reference artifact.

Atomic method IDs start with a four-digit hierarchy:

```text
ABCD
A = domain group
B = subgroup
CD = stable sequence inside the subgroup
```

| Code | Group | Domain | Naming basis |
|---|---:|---|---|
| `gov` | `1000` | Governance, political power, legitimacy, elections, state institutions | Common government abbreviation |
| `econ` | `2000` | Economic pressure, boycott, divestment, consumption, finance | Common economics abbreviation |
| `labr` | `3000` | Labor, workplace, strikes, professional noncooperation | Common labor studies code |
| `comm` | `4000` | Communication, media, symbols, public narrative, persuasion | Common communication abbreviation |
| `soc` | `5000` | Social/community/cultural/religious relations and noncooperation | Common sociology/social code |
| `intv` | `6000` | Nonviolent intervention, presence, obstruction, parallel institutions | Project mnemonic for intervention |

Source identity stays in registry metadata: `source`, `source_number`, `source_family`, and `source_category`. Domain identity stays in metadata fields: `domain_group` and `domain_subgroup`. Examples: `4108-public-speeches`, `1204-mock-elections`, `2101-consumers-boycott`, `3101-protest-or-warning-strikes`, `6116-nonviolent-occupations`.

## Complete domain taxonomy

The taxonomy below lists active, populated subgroups only. Codes are intentionally domain-oriented: source taxonomies are metadata, while the first two digits define the operational domain and subdomain used by agent skills. Future methods must map into one of these groups or trigger an explicit taxonomy revision.

| Range | Domain | Subdomain | Records |
|---:|---|---|---:|
| `11xx` | `gov` | Authority, legitimacy, and resistance advocacy | 3 |
| `12xx` | `gov` | Elections, legislatures, and representative bodies | 6 |
| `13xx` | `gov` | Public institutions, administration, and parallel governance | 12 |
| `14xx` | `gov` | Civil disobedience and obedience alternatives | 14 |
| `15xx` | `gov` | State personnel, enforcement, and security-pillar noncooperation | 9 |
| `16xx` | `gov` | Diplomatic and international governance | 7 |
| `17xx` | `gov` | Legal, accountability, transparency, and anti-corruption pressure | 6 |
| `21xx` | `econ` | Consumer, tenant, and household economic pressure | 8 |
| `22xx` | `econ` | Producer, supplier, worker, and supply-chain boycotts | 3 |
| `23xx` | `econ` | Merchant, management, ownership, and corporate pressure | 4 |
| `24xx` | `econ` | Financial, fiscal, credit, and revenue noncooperation | 6 |
| `25xx` | `econ` | Trade, embargo, sanctions, and market exclusion pressure | 5 |
| `26xx` | `econ` | Constructive and alternative economic systems | 8 |
| `27xx` | `econ` | Property, land, resources, and asset intervention | 8 |
| `28xx` | `econ` | Divestment, standards, IP, and market-rule pressure | 2 |
| `31xx` | `labr` | Symbolic and short strikes | 2 |
| `32xx` | `labr` | Agricultural and rural labor action | 2 |
| `33xx` | `labr` | Special-group, professional, student, and withdrawal strikes | 8 |
| `34xx` | `labr` | Industrial, sectoral, sympathy, and broad shutdown strikes | 8 |
| `35xx` | `labr` | Restricted, selective, slowdown, and work-to-rule strikes | 8 |
| `37xx` | `labr` | Workplace occupation and constructive labor intervention | 2 |
| `41xx` | `comm` | Spoken, written, and declarative expression | 14 |
| `42xx` | `comm` | Media, publishing, broadcast, and communication channels | 11 |
| `43xx` | `comm` | Symbolic, visual, artistic, cultural, and humor expression | 64 |
| `44xx` | `comm` | Assemblies, processions, teach-ins, and public convenings | 15 |
| `45xx` | `comm` | Expressive withdrawal, silence, refusal, and renunciation | 4 |
| `46xx` | `comm` | Interpersonal pressure and direct communicative confrontation | 5 |
| `47xx` | `comm` | Data, mapping, documentation, archiving, and evidence communication | 6 |
| `48xx` | `comm` | Digital platform campaigns and network-native expression | 14 |
| `51xx` | `soc` | Ostracism, exclusion, and social boycott | 5 |
| `52xx` | `soc` | Social customs, events, schools, religion, and institutions | 4 |
| `53xx` | `soc` | Social withdrawal, sanctuary, migration, and disappearance | 6 |
| `54xx` | `soc` | Constructive social alternatives and parallel social institutions | 5 |
| `58xx` | `soc` | Identity, inclusion, solidarity, and cultural belonging | 3 |
| `61xx` | `intv` | Physical presence, occupation, obstruction, and place-based intervention | 26 |
| `62xx` | `intv` | Incursion-style, crossing, and entry intervention | 3 |
| `63xx` | `intv` | Self-exposure, fasting, moral pressure, and personal risk | 12 |
| `64xx` | `intv` | System overload, service disruption, and capacity pressure | 7 |
| `65xx` | `intv` | Protective presence, accompaniment, monitoring, and de-escalation | 4 |
| `66xx` | `intv` | Constructive physical and technical intervention | 2 |
| `67xx` | `intv` | Blockade, blockade-defiance, transport, and chokepoint intervention | 5 |
| `68xx` | `intv` | Digital/technical intervention and cyber-adjacent tactics | 1 |
