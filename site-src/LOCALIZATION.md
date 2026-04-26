# Site Localization Guide

This guide governs public-facing EN/ES/PL/RU copy in `site-src/src/data/`.

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

| English concept | Spanish | Polish | Russian |
| --- | --- | --- | --- |
| registry | registro | rejestr | реестр |
| atlas | atlas | atlas | атлас |
| domain | sección | sekcja | раздел |
| operational/applied skill | habilidad aplicada | umiejętność stosowana | прикладной навык |
| coming soon/planned | en preparación | w przygotowaniu | в планах |
| low-risk | bajo riesgo | niskie ryzyko | низкий риск / низкорисковый |
| high-risk | alto riesgo | wysokie ryzyko | повышенный риск |
| analysis-only | solo para análisis | tylko do analizy | только для анализа |
| risk-gated/risk-reviewed | con revisión de riesgo | z przeglądem ryzyka | с проверкой риска |
| runtime phases | fases de trabajo | fazy pracy | рабочие фазы |
| artifact | artefacto | artefakt | артефакт / рабочий результат |
| guard/check | control / criterio de revisión | kontrola / kryterium przeglądu | проверка / проверочный критерий |
| readiness verdict | evaluación de preparación | ocena gotowości | оценка готовности |
| ledger | registro / resumen de estado | rejestr / podsumowanie statusu | журнал / сводка статусов |
| debrief | evaluación posterior | omówienie wyników | разбор результатов |

## QA Checklist

- ES/PL/RU pages should read as standalone public copy, not line-by-line translations.
- Avoid raw English terms in ES/PL/RU unless they are listed as names or identifiers above.
- Check mobile layout for longer translated labels.
- Run `npm run check:localization` before publishing.
