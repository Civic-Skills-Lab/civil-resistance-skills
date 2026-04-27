import fs from "node:fs";

const contentPath = "site-src/src/data/site-content.json";
const metaPath = "site-src/src/data/siteMeta.ts";
const seoSurfacePaths = [
  metaPath,
  "site-src/src/layouts/BaseLayout.astro",
  "site-src/src/pages/llms.txt.ts",
  "site-src/src/pages/robots.txt.ts",
  "site-src/src/pages/sitemap.xml.ts"
];
const content = JSON.parse(fs.readFileSync(contentPath, "utf8"));
const rawContent = fs.readFileSync(contentPath, "utf8");

const mojibakePattern = /Ã|Â|â|Ð|Ñ|�/;
const corruptedQuestionPattern = /\?{2,}|m\?todos|investigaci\?n|p\?blica|campa\?a|preparaci\?n|revisi\?n|simulaci\?n|acci\?n|secci\?n|comunicaci\?n|s\?mbolos|can\?nica|a\?n/i;

function fail(message) {
  console.error(`localization check failed: ${message}`);
  process.exitCode = 1;
}

function flattenStrings(value, path = []) {
  if (typeof value === "string") return [{ path: path.join("."), value }];
  if (Array.isArray(value)) return value.flatMap((item, index) => flattenStrings(item, path.concat(String(index))));
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) => flattenStrings(item, path.concat(key)));
  }
  return [];
}

function keyShape(value) {
  if (Array.isArray(value)) return value.map(keyShape);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, keyShape(value[key])]));
  }
  return true;
}

if (!content.en || !content.es || !content.pl || !content.ru) {
  fail("expected en, es, pl, and ru top-level locales");
}

const enShape = JSON.stringify(keyShape(content.en));
for (const locale of ["es", "pl", "ru"]) {
  if (JSON.stringify(keyShape(content[locale])) !== enShape) {
    fail(`${locale} keys do not match en`);
  }
}

for (const [sourceName, raw] of [[contentPath, rawContent], ...seoSurfacePaths.map((filePath) => [filePath, fs.readFileSync(filePath, "utf8")])]) {
  if (mojibakePattern.test(raw)) fail(`${sourceName} contains mojibake or replacement characters`);
  if (sourceName === contentPath && corruptedQuestionPattern.test(raw)) {
    fail(`${sourceName} contains likely question-mark encoding damage`);
  }
}

const ruText = flattenStrings(content.ru).map((item) => item.value).join("\n");
const esText = flattenStrings(content.es).map((item) => item.value).join("\n");
const plText = flattenStrings(content.pl).map((item) => item.value).join("\n");
const forbiddenPublicTerms = {
  es: [
    /\bPlanning Mode\b/i,
    /\bApplication Mode\b/i,
    /\bspeech brief\b/i,
    /\bcivic educators\b/i,
    /\bsandbox\b/i,
    /constructores de agentes/i,
    /Paso por revisión de riesgo/i,
    /estado de aplicación/i
  ],
  pl: [
    /\bPlanning Mode\b/i,
    /\bApplication Mode\b/i,
    /\bspeech brief\b/i,
    /\bcivic educators\b/i,
    /\bsandbox\b/i,
    /rekord(?:y|ów|ami)?\b/i,
    /umiejętnoś(?:ć|ci) stosowan/i
  ],
  ru: [
    /\bPlanning Mode\b/i,
    /\bApplication Mode\b/i,
    /\bspeech brief\b/i,
    /\bcivic educators\b/i,
    /\bsandbox/i,
    /AI-агент/i,
    /AI-навы/i,
    /нативн/i
  ]
};

if (!/[А-Яа-яЁё]/.test(ruText)) fail("Russian content does not contain Cyrillic text");
if (!/[áéíóúñÁÉÍÓÚÑ¿]/.test(esText)) fail("Spanish content does not contain expected accented characters");
if (!/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/.test(plText)) fail("Polish content does not contain expected Polish characters");

for (const locale of ["es", "pl", "ru"]) {
  for (const { path, value } of flattenStrings(content[locale])) {
    if (/\?{2,}|[\p{L}]\?[\p{L}]/u.test(value)) fail(`${locale} string contains likely question-mark encoding damage: ${path}`);
    if (/\bagent skills\b/i.test(value)) fail(`${locale} string contains raw 'agent skills': ${path}`);
    for (const pattern of forbiddenPublicTerms[locale]) {
      if (pattern.test(value)) fail(`${locale} string contains raw or calqued public term '${pattern}': ${path}`);
    }
  }
}

if (!process.exitCode) {
  console.log("localization ok");
}
