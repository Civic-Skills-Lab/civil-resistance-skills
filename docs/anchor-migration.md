# Homepage anchor migration

This document records what happened to the old homepage anchor links when
the site moved from a single-page layout to a multipage reference (issue
[#1](https://github.com/Civic-Skills-Lab/civil-resistance-skills/issues/1),
sub-task [#8](https://github.com/Civic-Skills-Lab/civil-resistance-skills/issues/8)).

The site is hosted on GitHub Pages, which cannot rewrite or canonicalize a
URL on the server side. URL fragments (`#anchor`) never reach the server,
so HTTP-level redirects cannot observe them either. Two static-only
mitigations are used here:

1. **Anchor preservation.** When the section that owned the anchor still
   exists on the homepage, the new section keeps the same `id` so an old
   `/#anchor` link continues to land at a meaningful place.
2. **Visible "moved" notice + delayed client-side redirect.** When the
   content moved off the homepage entirely, the homepage keeps a small
   stub section at the same `id` that names the new destination, links
   to it, and — only when the visitor actually arrived with that hash —
   redirects to the new section page after four seconds. The stub is
   visible on the homepage at all times, so the meaningful destination
   is always one click away.

## Anchor inventory

The pre-refactor homepage anchors (from the time before
`agent/issue-1-multipage-and-registry` rewrote the homepage) are:

| Anchor | Pre-refactor section | Post-refactor decision | New destination |
|---|---|---|---|
| `#why` | "Why" — short copy on the project posture | Preserved, content unchanged | (homepage `#why`) |
| `#install` | "Install" — Claude / Codex install snippets | Preserved, content unchanged | (homepage `#install`) |
| `#faq` | FAQ list | Preserved, content unchanged | (homepage `#faq`) |
| `#domains` | Inline domain grid | Stubbed: visible "moved" notice + delayed redirect | `/domains/` (and the locale equivalents) |
| `#catalog` | Inline method catalogue (CatalogTable) | Stubbed: visible "moved" notice + delayed redirect | `/methods/` (and the locale equivalents) |

The new homepage also has `#explore` (the four-card section that names the
methods, domains, skills, and organizations sections) — that anchor is
new and does not need migration.

## Communication page

The communication page anchors `#operational`, `#faq`, and `#registry` are
unchanged; that page's structure was not touched by the multipage
refactor.

## Verification

Per sub-task [#9](https://github.com/Civic-Skills-Lab/civil-resistance-skills/issues/9),
the publication-health verifier is extended to parse rendered HTML at the
homepage URL (and its locale equivalents) and confirm the expected `id`s
exist for the preserved and stubbed anchors. HTTP-only checks cannot
observe fragments, so HTML parsing is the verification path.
