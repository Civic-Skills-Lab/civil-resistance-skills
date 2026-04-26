# March Planning Protocol

Use this reference when the user asks for a concrete march plan. The agent produces a planning package and readiness verdict; it does not perform or coordinate the real-world march.

## Transition Rule

Do not advance to the next phase until the required artifact exists. If an artifact cannot be produced, mark it `unavailable` or `assumed`, explain why, and carry that entry into the Completion Ledger.

## Phase Map

| Phase | Action | Required artifact | Completion guard | Pause condition | Next |
|---|---|---|---|---|---|
| `MODE_DETECTION` | Confirm the request is planning-only. | Mode note. | Request asks for planning, readiness, route/logistics, risk review, or package creation. | User asks the agent to perform real-world coordination or attend the march. | `INTAKE` |
| `INTAKE` | Gather only missing planning inputs. | Intake summary. | Purpose, audience, turnout model, route idea, legal posture, accessibility needs, constraints, counter-mobilization concerns, and endpoint are known or labeled. | Core purpose, route, or endpoint cannot be safely assumed. | `CONTEXT_RESEARCH` |
| `CONTEXT_RESEARCH` | Research public context when tools and location/topic are concrete. | Context notes. | Notes separate verified facts, user claims, assumptions, legal unknowns, audience concerns, and likely counter-frames. | Needed public facts are unavailable and unsafe to assume. | `ROUTE_AND_LEGAL_POSTURE` |
| `ROUTE_AND_LEGAL_POSTURE` | Assess route, jurisdiction, public forum, permits, and rights questions. | Route/legal posture note. | Route fit, start/end, exits, transit, accessibility, permit questions, recording posture, and legal-observer need are stated. | Legal or route constraints make the plan incoherent or unsafe. | `ROLES_AND_LOGISTICS` |
| `ROLES_AND_LOGISTICS` | Plan staffing, materials, and participant flow. | Roles/logistics plan. | Marshals/stewards, documentarians, medical, legal, accessibility, media, endpoint owner, supplies, and communications are assigned or marked missing. | Minimum staffing or logistics capacity is below the plan's own assumptions. | `COMMUNICATIONS_AND_DOCUMENTATION` |
| `COMMUNICATIONS_AND_DOCUMENTATION` | Define message, press, documentation, and turnout estimate method. | Communications/documentation plan. | Message frame, press packet items, image/video plan, source of turnout estimate, and post-event update path are stated. | Event has no coherent public message or documentation path. | `RISK_AND_CONTINGENCY_REVIEW` |
| `RISK_AND_CONTINGENCY_REVIEW` | Review legal, safety, accessibility, route, counter-frame, and logistics risks. | Risk/contingency review. | Decision authority, pause/dispersal triggers, fallback meeting point, legal/medical escalation path, and unresolved risks are explicit. | A risk requires user/legal/venue decision before planning can continue. | `MARCH_PLAN_PACKAGE` |
| `MARCH_PLAN_PACKAGE` | Assemble the final planning package. | March Planning Package with Completion Ledger. | All required sections exist, skipped artifacts are explained, and readiness verdict is set. | Required final section is missing without explanation. | `DEBRIEF_READY` |
| `DEBRIEF_READY` | Prepare post-event learning criteria. | Debrief criteria. | Plan can capture turnout, coverage, incidents, endpoint action, accessibility gaps, and changes for next time. | Debrief is irrelevant to the user's stated planning purpose. | Done |

## Final March Planning Package

- **Purpose and Strategic Fit:** what the march is for and why a procession fits.
- **Audience and Turnout Model:** primary/secondary audiences, expected participation, uncertainty.
- **Legal / Permitting Posture:** jurisdiction-specific questions, permit status, public-forum assumptions, recording posture.
- **Route and Logistics Plan:** start, endpoint, route rationale, exits, transit, weather, access, materials, sound, signs, water, toilets.
- **Roles and Staffing Plan:** marshals/stewards, documentarians, media, legal, medical, accessibility, endpoint owner.
- **Marshalling / Safety / Accessibility Plan:** role boundaries, communication, de-escalation posture, accessibility support, reconnect points.
- **Communications and Documentation Plan:** message frame, press packet, quote, image/video plan, turnout estimate method, post-event update.
- **Contingency Plan:** route changes, pause/dispersal authority, fallback point, legal/medical escalation, counter-frame response.
- **Debrief Criteria:** what to observe after the march.
- **Completion Ledger:** phase status table, artifact list, unresolved assumptions, skipped phases with reasons, risk flags.
- **Readiness Verdict:** `ready`, `ready_with_assumptions`, or `blocked`.

## Completion Ledger Template

| Phase | Status | Artifact | Notes |
|---|---|---|---|
| `MODE_DETECTION` |  |  |  |
| `INTAKE` |  |  |  |
| `CONTEXT_RESEARCH` |  |  |  |
| `ROUTE_AND_LEGAL_POSTURE` |  |  |  |
| `ROLES_AND_LOGISTICS` |  |  |  |
| `COMMUNICATIONS_AND_DOCUMENTATION` |  |  |  |
| `RISK_AND_CONTINGENCY_REVIEW` |  |  |  |
| `MARCH_PLAN_PACKAGE` |  |  |  |
| `DEBRIEF_READY` |  |  |  |

Status values: `complete`, `assumed`, `unavailable`, `skipped`, `blocked`.

## Boundaries

Do not invent legal authority, permit status, turnout numbers, endorsements, staffing capacity, or public facts. Do not advise deception, coercion, violence, property damage, unsafe confrontation, or evasion of law, venue rules, platform rules, or safety constraints.
