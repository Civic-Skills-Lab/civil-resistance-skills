# Public Speech Application Protocol

Use this reference when the user or game runtime asks the agent to apply the public speech tactic end-to-end. The goal is a complete speech package, not only preparation advice.

## Transition Rule

Do not advance to the next phase until the required artifact exists. If an artifact cannot be produced, mark it `unavailable` or `assumed`, explain why, and carry that entry into the Completion Ledger.

## Phase Map

| Phase | Action | Required artifact | Completion guard | Pause condition | Next |
|---|---|---|---|---|---|
| `MODE_DETECTION` | Confirm Application Mode and capture user/game constraints. | Mode note with length, audience, speaker, issue, venue, tone, and available tools. | Mode is explicitly Application Mode; default length is 3-5 minutes full draft and 60-90 seconds short version if absent. | Request is only planning/advice, or the mode is ambiguous. | `INTAKE` |
| `INTAKE` | Complete only missing intake fields. | Intake summary. | Goal, audience, speaker standing, delivery context, endpoint, constraints, and counter-frame are known or labeled as assumptions. | A required field is unknowable and cannot be safely assumed. | `RESEARCH` |
| `RESEARCH` | Gather public facts when tools and concrete context are available. | Research notes. | Notes label verified facts, user claims, assumptions, source reliability, contradictions, and facts to verify. | Needed facts are unavailable and unsafe to assume. | `BRIEF` |
| `BRIEF` | Fill the public speech brief before drafting. | Speech brief. | Brief includes core claim, audience model, speaker rationale, values frame, proof points, exclusions, endpoint, media line, and drafting constraints. | Core claim, speaker authority, or endpoint remains incoherent. | `OUTLINE` |
| `OUTLINE` | Choose the speech structure. | Chosen outline. | Outline choice is named and justified against audience, venue, length, and speaker. | No outline fits without changing goal, endpoint, or length. | `DRAFT` |
| `DRAFT` | Write the full speech and short version. | Full speech draft and short version. | Full draft is speakable within target length; short version preserves core claim, one proof point, and action. | Draft depends on unsafe claims or missing authority. | `REVIEW` |
| `REVIEW` | Run source, legal, narrative, reputational, attribution, privacy, documentation, and delivery review. | Risk review and revision notes. | Unsafe claims are cut, softened, sourced, or surfaced as unresolved risk. | Same unresolved issue repeats twice without new evidence. | `FINAL_PACKAGE` |
| `FINAL_PACKAGE` | Assemble the final speech package. | Final package with Completion Ledger. | All output sections exist, skipped artifacts are explained, and readiness verdict is set. | Required final section is missing without explanation. | `DEBRIEF_READY` |
| `DEBRIEF_READY` | Prepare post-delivery observation criteria. | Debrief criteria. | User/game runtime can observe audience response, pickup, distortions, incidents, and endpoint action. | Event data collection is impossible and not relevant to runtime. | Done |

## Lightweight Health Loop

Use this only for draft, review, and revision cycles.

Retry a revision when there is new evidence:

- new verified fact or corrected stale fact
- user correction or game-state update
- resolved legal, narrative, attribution, privacy, or documentation risk
- improved quote-safe line
- shorter or clearer short version
- clearer endpoint or listener action

Pause with `needs_user_decision` when the same issue repeats twice without new evidence. No-progress revision is not failure of the tactic; it means the agent needs a decision, missing fact, or changed constraint.

## Final Speech Package

- **Research Notes:** verified facts, user claims, assumptions, source reliability, contradictions.
- **Speech Brief:** goal, audience, speaker rationale, values frame, core claim, proof points, exclusions, endpoint.
- **Chosen Outline:** selected structure and why it fits.
- **Full Speech Draft:** speakable 3-5 minute draft unless another length is specified.
- **Short Version:** 60-90 seconds.
- **Quote-Safe Line:** one sentence that can survive press or social clipping.
- **Delivery Notes:** tone, pacing, transitions, read-aloud issues.
- **Risk Review:** legal, narrative, reputational, attribution, privacy, documentation flags.
- **Debrief Criteria:** what to observe after delivery.
- **Completion Ledger:** phase status table, artifact list, unresolved assumptions, skipped phases with reasons, risk flags.
- **Readiness Verdict:** `ready`, `ready_with_assumptions`, or `blocked`.

## Completion Ledger Template

| Phase | Status | Artifact | Notes |
|---|---|---|---|
| `MODE_DETECTION` |  |  |  |
| `INTAKE` |  |  |  |
| `RESEARCH` |  |  |  |
| `BRIEF` |  |  |  |
| `OUTLINE` |  |  |  |
| `DRAFT` |  |  |  |
| `REVIEW` |  |  |  |
| `FINAL_PACKAGE` |  |  |  |
| `DEBRIEF_READY` |  |  |  |

Status values: `complete`, `assumed`, `unavailable`, `skipped`, `blocked`.

## Boundaries

Do not invent sources, fabricate support, hide sponsorship, defame named people, encourage violence or threats, pressure vulnerable listeners, expose private details, or advise evasion of law, venue rules, platform rules, or safety constraints.
