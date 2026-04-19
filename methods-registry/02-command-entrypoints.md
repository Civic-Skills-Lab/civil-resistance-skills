# Command Entrypoints

Command entrypoints are user-facing workflows. They route into coordinator skills and atomic method records; they are not source concepts and do not count as atomic methods.

| # | Slash command | Artifact ID | Purpose |
|---|---|---|---|
| 01 | `/nv-plan-campaign` | `001-cmd-plan-campaign` | Elicit situation, constraints, risk tolerance, then route through coordinator skills to return a sequenced campaign plan. |
| 02 | `/nv-pick-method` | `002-cmd-pick-method` | Recommend methods matching a scenario and explain tradeoffs. |
| 03 | `/nv-assess-risk` | `003-cmd-assess-risk` | Risk/blowback analysis for a chosen method in a specific context. |
| 04 | `/nv-debrief` | `004-cmd-debrief` | Post-action reflection: what worked, what failed, what to adjust. |
| 05 | `/nv-pillars-map` | `005-cmd-pillars-map` | Guided Pillars of Support mapping. |
| 06 | `/nv-vision-draft` | `006-cmd-vision-draft` | Help draft a Vision of Tomorrow statement. |
