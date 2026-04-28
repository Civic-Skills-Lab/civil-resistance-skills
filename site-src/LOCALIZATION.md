# Site Localization Guide

This guide governs public-facing EN/ES/PL/RU copy in `site-src/src/data/`.

## Tone

- Write in a neutral research-editorial voice: clear, human, cautious, and non-promotional.
- Position the project as research, education, simulation, and careful preparation infrastructure.
- Avoid activist campaign language, slogans, urgency appeals, and command-style framing.
- Avoid internal engineering jargon unless it helps the public reader understand the product.

## Audience

The site is for researchers, civic-education practitioners, simulation/game builders, AI-agent builders, analysts who study movements, and careful practitioners. It should not read like a campaign landing page or a developer-only README.

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
| civil resistance | resistencia civil | obywatelski opór bez przemocy / opór obywatelski by context | гражданское сопротивление |
| AI agent | agente de IA | agent AI / agent sztucznej inteligencji on first mention | агент ИИ |
| operational/applied skill | habilidad aplicada | umiejętność praktyczna | прикладной навык |
| coming soon/planned | en preparación | w przygotowaniu | в планах |
| low-risk | bajo riesgo | niskie ryzyko | низкий риск / низкорисковый |
| high-risk | alto riesgo | wysokie ryzyko | повышенный риск |
| analysis-only | solo para análisis | tylko do analizy | только для анализа |
| risk-gated/risk-reviewed | con revisión de riesgos | z oceną ryzyka | с проверкой риска |
| runtime phases | fases de trabajo | fazy pracy | рабочие фазы |
| artifact / working material | material producido / material de trabajo | materiał roboczy | рабочий материал / рабочий результат |
| guard/check | control / criterio de revisión | kontrola / kryterium oceny | проверка / проверочный критерий |
| readiness verdict | evaluación de preparación | ocena gotowości | оценка готовности |
| ledger | registro / resumen de estado | rejestr / podsumowanie statusu | журнал / сводка статусов |
| debrief | evaluación posterior | omówienie wyników | разбор результатов |
| planning mode | modo de planificación | tryb planowania | режим планирования |
| application mode | modo de aplicación | tryb zastosowania | режим применения |
| speech brief | informe breve de discurso | krótki materiał badawczy do przemówienia | краткий бриф речи |
| Civic Research Atlas | Atlas de investigación cívica | Atlas badań obywatelskich | Атлас гражданских исследований |
| risk signals / risk flags | indicadores de riesgo | wskaźniki ryzyka | признаки риска |
| plugin surfaces / plugin layers | formatos de plugin distintos | osobne formaty pluginów | разные форматы плагинов |
| simulation | simulación | symulacja | симуляция (предпочтительный термин в IT-контексте) |
| Domain (UI label) | Sección | Sekcja | Раздел |

## QA Checklist

- ES/PL/RU pages should read as standalone public copy, not line-by-line translations.
- Avoid raw English terms in ES/PL/RU unless they are listed as names or identifiers above.
- Avoid public-facing calques such as `Planning Mode`, `Application Mode`, `speech brief`, `civic educators`, raw `sandbox`, `constructores de agentes`, `Paso por revisión de riesgo`, `rekordy`, `umiejętności stosowane`, `señales de riesgo` / `sygnały ryzyka` / `сигналы риска`, and `capas de plugin` / `warstw pluginów` / `слои плагинов`.
- Check mobile layout for longer translated labels.
- Use em dash `—` (not ASCII hyphen `-`) when separating clauses, brand names from taglines, or in footer copy.
- Run `npm run check:localization` before publishing.
