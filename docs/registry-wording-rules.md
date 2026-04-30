# Registry wording rules and locale review

This document records the wording rules that apply to all public copy
about the organization registry, where the per-locale denylist lives,
and what the multipage refactor (issue
[#1](https://github.com/Civic-Skills-Lab/goat-civil-resistance-skills/issues/1),
sub-task [#7](https://github.com/Civic-Skills-Lab/civil-resistance-skills/issues/7))
changed in the four locale catalogues.

## Source of truth for wording

The editorial spec is
[`docs/organization-registry.md`](organization-registry.md). Its
"Wording rules" section lists the required posture (cautious verbs,
attributed claims, dated statements) and what is out of bounds. The
spec governs both the registry itself and the public copy that frames
it.

In short:

- describe the public record, not motivations;
- attribute every characterization to a specific source;
- prefer dated claims over open-ended present tense;
- describe scope honestly — say what is missing rather than fill in
  with adjacent assumptions.

The forbidden categories are:

- claims that the registry is **first**, **unique**, **complete**,
  **comprehensive**, **definitive**, **official**, or **authoritative**;
- claims that the registry is a directory of **trusted**,
  **recommended**, **vetted**, **partner**, or **aligned**
  organizations;
- ranking, scoring, or comparative judgement between organizations;
- adjectives that imply effectiveness, importance, or moral standing
  without source backing — including **leading**, **premier**,
  **influential**, **controversial**, **notorious**;
- speculation about funding, intent, alliances, or future plans;
- restatements of unverified claims as if verified;
- generalizations about people associated with the organization that
  are not separately sourced;
- language that targets identifiable individuals or named small groups
  associated with the organization.

The forbidden categories cover claims about the registry and about the
organizations in it. The same words can appear in everyday meanings
elsewhere on the site (a finished speech brief, an "active" domain in
the temporal sense) without violating the rules — what matters is the
claim being made, not the lexical hit.

## Per-locale denylist for naturalized prose

A second, narrower denylist enforces locale-native prose. It lives in
[`scripts/check-localization.mjs`](../scripts/check-localization.mjs)
in the `forbiddenPublicTerms` map (lines 61–97 at the time of writing)
and runs on every `npm run check`. The patterns there target calques
and English-anchored phrases that have appeared in earlier translation
passes — `Planning Mode`, `speech brief`, `civic educators`, `sandbox`,
`AI-агент`, `señales de riesgo`, `umiejętności stosowane`, and a small
set of related phrases. When a translation fails the gate, read the
matching regex in that file to see why.

The locale gate also enforces strict key-shape parity across en / ru /
es / pl in [`site-src/src/data/site-content.json`](../site-src/src/data/site-content.json).
Every new key added in one locale must appear in the others before the
build will pass.

## What changed in this PR

The story rewrote the homepage as a multipage entry point and added
four new section landings (Methods, Domains, Skills, Organizations)
plus per-organization profile pages. New copy was added in all four
locales for:

- `common.sections` — the labels for the top navigation links.
- `home.explore` — the four-card explore band on the homepage.
- `home.legacyAnchors` — the visible "moved" notices at `#domains`
  and `#catalog` (see
  [`docs/anchor-migration.md`](anchor-migration.md)).
- `methods`, `domains`, `skills`, `organizations` — section landing
  copy (hero, footer, and section-specific blocks).
- `organizations.listing`, `organizations.card`, `organizations.profile`,
  `organizations.empty`, `organizations.emptyTranslation` — the
  registry listing and per-profile templates.

Each block was authored locale-native: Polish uses native syntax and
inflection (`Praktyczne materiały`, `Otwórz obszary`, `Każda karta`);
Spanish uses naturalized phrasing (`Cada perfil describe actividad
documentada`, `Recorra el catálogo`); Russian uses idiomatic verb
forms (`Действует` for active status rather than a literal
adjectival rendering, `На главную` for the back-to-home link).

The wording posture follows the editorial spec: descriptive verbs
(`publishes`, `documents`, `cites`, `paraphrases`), attributions where
claims appear (`per the editorial spec`, `за источниками`), and
explicit scope honesty (the seed profile carries `confidence:
partially_documented` and an explanatory `notes` field).

A spot scan against the forbidden-wording list found no claim-shaped
hits in the new copy. The few lexical occurrences of `first` and
`complete` in pre-existing English copy describe timing or finished
artifacts (an "active first" domain, a "complete" speech brief, an
editorial review that "is complete") rather than registry-wide
claims. The organizations footer that includes the word `recommended`
is the spec-mandated negation — `not a directory of recommended
organizations` — which is the correct wording posture.
