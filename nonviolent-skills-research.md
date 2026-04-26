# Research: Live Civil Resistance Methods + Coordinator Skills

Project name: **Civil Resistance Skills**.

Repository name: `civil-resistance-skills`.

Codename: **Beautiful Country To Come**.

## Request context

Package the civil-resistance tactics universe as AI-agent skills:
- **Atomic method layer** — domain-organized method records populated from the current live Beer/NVI/ICNC index: 347 records total, covering IDs `1-346` plus live ID `348` (`tactic_id=347` is absent in the source index).
- **Coordinator layer** — Srdja Popovic / CANVAS / Helvey strategic concepts as coordinators over atomic methods, not as method records.

...as a standalone **SKILL**, modeled after the local `claude-code-skills` reference project.

---

## 1. Has anyone done this before? — **No**

No source surfaced an existing packaging of the live Beer/NVI/ICNC civil-resistance tactics universe, Sharp's 198 core, or Popovic/CANVAS strategic coordinators as:
- Claude Code skills / Claude Agent Skills / skill-pack
- MCP server
- npm / PyPI / Hugging Face / LangChain hub package

Checked: awesome-agent-skills (VoltAgent), mcpservers.org/agent-skills, mcpmarket, killer-skills, npm, PyPI, HF datasets, GitHub.

**Verdict:** green field — if you build this, you're first on this canon.

---

## 2. Closest prior art (direct)

### Beautiful Trouble Toolbox
- Site: https://beautifultrouble.org/toolbox
- GitHub API: https://github.com/BeautifulTrouble/idealab-api (Python/Flask, `/api` endpoint)
- Sister project: https://github.com/BeautifulTrouble/Beautiful-Rising-Research

~300 cards across 4 types — **Tactics / Principles / Theories / Case Studies**. From *Beautiful Trouble: A Toolbox for Revolution* (Andrew Boyd, 2012). Web format, not LLM skills. **License CC BY-NC-SA 3.0** — non-commercial + share-alike (limits text reuse).

### Beautiful Rising (Messenger/Telegram/Skype chatbot, 2016)

Sister project of Beautiful Trouble — shipped a **pre-LLM conversational agent** over an activist toolkit. Ancestor pattern: "activist canon as conversational agent." Research repo: https://github.com/BeautifulTrouble/Beautiful-Rising-Research

### Civil Resistance 2.0
- Overview: https://commonslibrary.org/198-nonviolent-methods-upgraded/
- Data (Google Sheet / PDF / XLSX) — linked from the overview page

Mary Joyce & Patrick Meier (2012). Crowdsourced upgrade of Sharp's 198 methods with digital tactics (hashtag campaigns, DDoS-as-protest). **License CC BY-SA**. **The most machine-readable artifact** in Sharp's taxonomy — exportable as CSV, usable as seed dataset.

### Swarthmore Global Nonviolent Action Database
- https://nvdatabase.swarthmore.edu/browse-methods

Academic case database organized around Sharp's taxonomy. No API, browse-only. Richest source of **historical examples**.

### Albert Einstein Institution
- https://www.aeinstein.org/198-methods-of-nonviolent-action/

Canonical list of method names, freely published. Names and categorization are de-facto public domain.

### ProtestGPT (Micah White)
- https://micahmwhite.com/ai-red-teaming/protestgpt-ai-for-activists

Closed ChatGPT Custom GPT over GPT-4 + *End of Protest* + a proprietary "ProCampGen" pseudolanguage. Closed, no repo. Nearest LLM-era precedent for "AI activist advisor" — but closed/generative, not structured skills.

### Resistance.ai (Micah White + Albert Einstein Institution)
- https://bohemian.com/resistance-ai-putting-nonviolence-advisor-in-every-persons-pocket/

Concept / prompt pattern over the Sharp corpus. Explicitly "nonviolence advisor in every person's pocket" — closest ideological overlap with this project. Prompt-only / RAG, not structured skills.

### Other
- https://github.com/codyhopper/198Project — abandoned static HTML site (0★, 2021).
- https://github.com/cognitivetech/Marshall-Rosenberg-NVC — adjacent pattern: activist canon → curated markdown corpus (not YAML skills, but proves the "canon → machine-readable base" direction).

---

## 3. Adjacent activist canons — packaging status

All searches combined canon name + `claude skill` / `mcp` / `agent skill` / `prompt library` / `custom gpt`.

| Canon | Author / Source | LLM skill / MCP? |
|---|---|---|
| Rules for Radicals (13 rules) | Alinsky | **No** |
| Pedagogy of the Oppressed | Freire | **No** (generic `claude-education-skills` exists but not Freirean) |
| Training for Change curriculum | George Lakey | **No** |
| Ruckus Society Action Planning | Ruckus | **No** |
| Midwest Academy manual | Midwest | **No** |
| Handbook for Nonviolent Campaigns | War Resisters' Intl | **No** |
| Movement for Black Lives toolkit | M4BL | **No** |
| From Dictatorship to Democracy | Sharp | **No** (second Sharp book) |
| Conflict transformation | Lederach | **No** |
| Why Civil Resistance Works | Chenoweth & Stephan | **No** |
| Deep canvassing / Street epistemology | — | **No** |
| ACORN / IAF / PICO organizing | — | **No** |
| Security in a Box | Tactical Tech | **No** |
| Nonviolent Communication | Rosenberg | **Partial** — cognitivetech repo is markdown corpus, not YAML skills |

**Bottom line:** the whole activist-canon space is unclaimed. Zero duplication risk.

---

## 4. Canon → skills pattern in OTHER domains (precedents to learn from)

The pattern is **mainstream in 2025/2026** — registries hold ~1,400+ skills. Domain breakdown:

| Domain | Packaged? | Standout |
|---|---|---|
| Mental models / thinking | **Yes, heavy** | `mattnowdev/thinking-partner` (150+ models, 128★); `kcchien/model-thinking` (253 models) |
| Cognitive biases | **Yes** | `glebis/claude-skills` "Decision Toolkit" (20+ biases) |
| Persuasion / Cialdini | **Yes** | `wondelai/skills` (Cialdini, Ogilvy, Schwartz); `@clawfu/mcp-skills` (169 marketing skills) |
| Negotiation (Voss / Getting to Yes) | **Yes** | Vossify on mcpmarket (Voss tactical empathy as Claude skill) |
| CBT / therapy | **Yes** | `arktnld/cbt-llm-kit` (12-step thought records, 13 distortions, JSON schemas, slash commands) |
| Business (Lean, JTBD, OKRs, SWOT) | **Partial** | `wondelai/skills`, mega-registries |
| Software — OWASP | **Yes** | `agamm/claude-code-owasp` (Top 10:2025 + ASVS 5.0 + Agentic AI risks) |
| Software — GoF patterns | **Yes** | `markpitt/claude-skills` `gof-design-patterns` (8 languages) |
| Bloom's Taxonomy | **Yes (thin)** | mcpmarket "course-designer", "study-system" |
| DBT / IFS / Gagné / dark patterns | **No** | — |

Anthropic has published an official building guide:
https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf

---

## 5. Best structural templates to borrow

### Template A — `agamm/claude-code-owasp` (closest analog to our use case)
OWASP is a **numbered, authoritative, activist-adjacent** canon packaged as ONE unified skill with reference tables and contextual auto-activation. **Primary template for our project.**

### Template B — `mattnowdev/thinking-partner`
One unified skill + `references/model-catalog.md` holding 150+ models loaded on demand. **"Orientation detection" routes situations to the right model** (GT0-GT5 thinking states). Directly applicable: user describes situation → skill routes to the right Sharp method family.

### Template C — `wondelai/skills`
**One skill per canonical source**, named by author/book. Structure: definition (1-2 sentences) → about source → "use when" bullets → example prompts. Explicit trigger phrase `"Use X skill"`. Clean if we want one skill per major framework (Sharp-protest / Sharp-noncoop / Sharp-intervention / Popovic-dilemma-actions / Popovic-branding).

### Template D — `arktnld/cbt-llm-kit`
Slash commands + JSON schemas. `/cbt:record` (guided flow), `/cbt:checkin`, `/cbt:analyze`, `schema.json`, `questions.json`, `cheat-sheet.md`. Best fit for **procedural** sub-skills (e.g., `/nv:plan-campaign`, `/nv:pick-method`, `/nv:debrief`).

### Registries to list in
- https://github.com/ComposioHQ/awesome-claude-skills (54k★)
- https://github.com/VoltAgent/awesome-agent-skills (1000+ skills)
- https://mcpmarket.com

---

## 6. Key structural conventions from prior art

- **Granularity split observed:** ~60% pick "one unified skill + references/", ~40% pick "one skill per source/concept." **No prior art goes full atomic on the live Beer/NVI/ICNC civil-resistance tactics universe** — but this is observation, not prescription. Atomic gives precise auto-activation (each skill's specific `description` is what Claude matches), at the cost of system-prompt bloat. **Our project goes hybrid:** atomic per method + coordinator skills on top + `shared/` references for cross-cutting content.
- **Triggering:** two conventions — (a) explicit suffix `"Use X skill"` (wondelai); (b) natural-language auto-activation via keywords in `description` field (Anthropic-recommended, now dominant).
- **Frontmatter:** YAML with `name` + `description`. **Description is where trigger keywords live** — it's how Claude decides when to load the skill. Anthropic guide says use `SKILL.md` + `references/` only, no README.md inside skill folder.
- **Progressive disclosure is universal:** `SKILL.md` is lean; heavy content in `references/*.md` loaded on demand. `model-thinking` (253 models) does this explicitly.
- **Procedural canons** (CBT, campaign planning) → slash commands. **Descriptive canons** (biases, patterns, 198 methods) → either unified-skill+references (most prior art) or **atomic-per-item + orchestrators** (our chosen path — trades prompt size for activation precision, composability, independent versioning, and per-method discoverability).

---

## 7. Source comparison (updated)

| Source | Format | Volume | License | Seed suitability |
|---|---|---|---|---|
| Beer / ICNC / NVI | Monograph + live tactics database | 346 monograph tactics; 347 current live records | ICNC/NVI content copyright; database terms need review | **Primary target corpus**; use as names/facts/citations and paraphrase prose |
| Beautiful Trouble | Web + JSON API | ~300 | CC BY-NC-SA 3.0 | Structural inspiration; don't copy texts |
| Civil Resistance 2.0 | Google Sheet / PDF | ~200 | CC BY-SA | **Best seed** with attribution |
| Swarthmore DB | Web (no API) | hundreds of cases | — | Historical examples |
| AEI 198 list | PDF / HTML | 198 | De-facto public domain | Canonical names + categories |

---

## 8. Licensing constraints

- **Sharp's 198 method names and numbers**: widely reproduced, AEI publishes freely → **safe**.
- **Sharp, *Politics of Nonviolent Action* (1973), prose descriptions**: under copyright (Porter Sargent). **Paraphrase only**, cite source.
- **Beer / ICNC / Nonviolence International tactics universe**: use as a source of names, facts, citations, and taxonomy inspiration; **paraphrase prose** and review database terms before bundling large extracted datasets.
- **Civil Resistance 2.0**: CC BY-SA — with attribution, derivatives also CC BY-SA.
- **Beautiful Trouble**: CC BY-NC-SA 3.0 — non-commercial, share-alike. idealab-api has no explicit license.
- **CANVAS Core Curriculum / Blueprint for Revolution**: copyright authors/publishers. **Paraphrase only**, don't bundle source text.

**Safe path:** method names + your own categorization + your own concise descriptions + citations to primary sources.

---

## 9. How the claude-code-skills reference is structured

### Repository layout
- `skills-catalog/` — 135+ skills as `ln-{number}-{name}/SKILL.md`
- `skills-catalog/shared/` — templates, references, scripts
- `.claude-plugin/marketplace.json` — 7 plugins grouping skills
- `mcp/` — MCP servers (hex-line, hex-graph, hex-ssh)
- `docs/`, `site/` — documentation

### One skill = folder `ln-XXX-slug/` with `SKILL.md`

```yaml
---
name: ln-002-session-analyzer
description: "Analyzes current or recent session for errors..."
license: MIT
allowed-tools: "Bash, Read, Glob, Grep, Agent"
model: claude-sonnet-4-6
---

# [Title]
**Type:** L1 Orchestrator | L2 Coordinator | L3 Worker | Standalone Utility
**Category:** [1XX Documentation Pipeline]

## When to Use This Skill
## Inputs
## Workflow / Phases
## Output / Runtime Contract
```

### Numbering ranges
0XX setup · 1XX docs · 2XX-3XX agile · 4XX exec · 5XX quality · 6XX audit · 7XX bootstrap · 8XX optimize · 9XX community.

Process-oriented (non-code) examples in repo: `ln-500-story-quality-gate`, `ln-300-task-coordinator` — good templates for methodological content.

---

## 10. Design implications from the research

1. **Our project is first on this corpus, not first on the pattern.** Differentiator = **atomic**, composable, machine-queryable skill-pack for civil-resistance methods across the current live Beer/NVI/ICNC universe.
2. **Architecture decision: atomic + hybrid.** One `SKILL.md` per reviewed method for precise auto-activation, coordinator skills on top, command entrypoints for workflows, and reference artifacts for cross-cutting content.
3. **Registry target:** 347 atomic method records / skill candidates total for the current live index: IDs `1-346` plus `348`; source ID `347` is currently absent. Sharp's 198 are included as provenance/crosswalk metadata, not as a separate namespace or limit.
4. **Taxonomy completeness:** `methods-registry/README.md` is the registry index; the complete domain/subdomain map lives in `methods-registry/00-naming-and-taxonomy.md`, and domain method tables live in `methods-registry/1000-governance.md` through `methods-registry/6000-intervention.md`. Additional live or third-party records must be distributed into those groups; if a new method does not fit, revise the taxonomy explicitly rather than creating an ad-hoc bucket.
5. **Naming scheme (per `methods-registry/README.md` and `methods-registry/00-naming-and-taxonomy.md`):** atomic methods use `<domain-digit><nvi_tactic_id:000>-<slug>`, without a duplicated domain slug. Concrete method skills use IDs such as `4104-public-speeches` (communication + NVI 104). Domain and subgroup live in metadata fields (`domain_group`, `domain_subgroup`), while subgroup headings remain taxonomy metadata. Registry/support documents use separate two-digit file prefixes, currently `00` through `03`.
6. **Source provenance is metadata.** A row may have `source: sharp`, `source: beer_nvi`, or `source: civil_resistance_2`, but source names are not encoded in the skill name unless needed as a note.
7. **CANVAS/Popovic concepts are coordinators, not atomic method skills.** They use `<3digit-id>-<slug>`; the three-digit ID itself marks the artifact as a coordinator, and coordinators route over the atomic methods.
8. **Commands remain workflow entrypoints:** `/nv-plan-campaign`, `/nv-pick-method`, `/nv-assess-risk`, `/nv-debrief`, `/nv-pillars-map`, `/nv-vision-draft`.
9. **Ancestors and sources to credit:** Beautiful Rising, ProtestGPT, Resistance.ai, AEI, Beer/NVI/ICNC, CR 2.0, Swarthmore DB.
10. **Read before writing frontmatter:** Anthropic's "The Complete Guide to Building Skill for Claude."

---

## 11. Open Forks

1. ~~**What does a skill DO?**~~ — **resolved:** atomic per-method reference cards + coordinator skills on top. See §10 and `methods-registry/README.md`.
2. ~~**Canon scope?**~~ — **resolved for registry architecture:** domain-first live Beer/NVI/ICNC corpus, currently 347 method records. Sharp is provenance/crosswalk metadata; CR 2.0 can add source metadata or genuinely new future records after deduplication.
3. ~~**Language?**~~ — **resolved for v1:** English-only skill/source content.
4. **Target user?** Field activist / researcher-writer / educator.
5. ~~**Repository?**~~ — **resolved:** public repository name `civil-resistance-skills`.

Remaining open choice: target user emphasis for v1.
