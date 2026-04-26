# Site Localization Guide

This guide governs public-facing EN/RU/ES copy in `site-src/src/data/`.

## Tone

- Write in a neutral research-editorial voice: clear, human, cautious, and non-promotional.
- Position the project as research, education, simulation, and careful preparation infrastructure.
- Avoid activist campaign language, slogans, urgency appeals, and command-style framing.
- Avoid internal engineering jargon unless it helps the public reader understand the product.

## Audience

The site is for researchers, civic educators, simulation/game builders, agent builders, movement-support analysts, and careful practitioners. It should not read like a campaign landing page or a developer-only README.

## Hybrid Glossary

Keep these terms as names or identifiers:

- `Civil Resistance Skills`
- `Claude`, `Codex`
- `NVI`, `Sharp`
- Skill IDs such as `4104-public-speeches`
- Canonical skill titles such as `Public Speeches` and `Marches`

Translate these terms naturally in public copy:

| English concept | Russian | Spanish |
| --- | --- | --- |
| registry | реестр | registro |
| atlas | атлас | atlas |
| domain | раздел | sección |
| operational/applied skill | прикладной навык | habilidad aplicada |
| coming soon/planned | в планах | en preparación |
| low-risk | низкий риск / низкорисковый | bajo riesgo |
| high-risk | повышенный риск | alto riesgo |
| analysis-only | только для анализа | solo para análisis |
| risk-gated/risk-reviewed | с проверкой риска | con revisión de riesgo |
| runtime phases | рабочие фазы | fases de trabajo |
| artifact | артефакт / рабочий результат | artefacto |
| guard/check | проверка / проверочный критерий | control / criterio de revisión |
| readiness verdict | оценка готовности | evaluación de preparación |
| ledger | журнал / сводка статусов | registro / resumen de estado |
| debrief | разбор результатов | evaluación posterior |

## QA Checklist

- RU/ES pages should read as standalone public copy, not line-by-line translations.
- Avoid raw English terms in RU/ES unless they are listed as names or identifiers above.
- Check mobile layout for longer translated labels.
- Run `rg "Ã|Â|â|Ð|Ñ" site-src/src/data` before publishing.
