import { execFileSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import dns from "node:dns/promises";

const site = "https://civic-skills-lab.org";
const repo = "Civic-Skills-Lab/civil-resistance-skills";
const expectedMeasurementId = "G-8PKLYL41JQ";
const expectedPagesHost = "civic-skills-lab.github.io";
const expectedApexRecords = new Set([
  "185.199.108.153",
  "185.199.109.153",
  "185.199.110.153",
  "185.199.111.153",
]);

// Section landings × 4 locales plus the existing communication domain page.
// Slugs are English-uniform (only the locale prefix changes) and must not
// translate; new section paths must also stay in lockstep with the
// localizedPaths registry in src/data/siteMeta.ts.
const sectionLandings = [];
for (const section of ["methods", "domains", "skills", "organizations"]) {
  for (const prefix of ["", "/ru", "/es", "/pl"]) {
    sectionLandings.push(`${prefix}/${section}/`);
  }
}

const pages = [
  "/",
  "/ru/",
  "/es/",
  "/pl/",
  ...sectionLandings,
  "/domains/communication/",
  "/ru/domains/communication/",
  "/es/domains/communication/",
  "/pl/domains/communication/",
];

// Pages that are expected to receive only a SUBSET of hreflang entries.
// Profile pages render only at locales where translations[lang] is true;
// a profile published only in English emits hreflang for `en` and
// `x-default` and does not list `ru`, `es`, or `pl`. The verifier needs
// to know which locales to expect when it walks each page.
const partialHreflangPages = new Map([
  ["/organizations/albert-einstein-institution/", new Set(["en", "x-default"])],
]);

// Profile URLs to verify in addition to the section landings. Each entry
// is checked for a 200 response, the canonical link, and that the page's
// hreflang set matches the partialHreflangPages contract above.
const profilePages = ["/organizations/albert-einstein-institution/"];

// Anchor IDs that must remain present on the homepage HTML for the
// legacy migration in #8. Some are preserved sections (#why, #install,
// #faq); some are visible "moved" stubs at the original ids (#domains,
// #catalog) plus the new section-card band (#explore).
const expectedHomepageAnchors = ["why", "install", "faq", "domains", "catalog", "explore"];
const homepagePaths = ["/", "/ru/", "/es/", "/pl/"];

const redirects = [
  ["http://civic-skills-lab.org/", `${site}/`],
  ["https://www.civic-skills-lab.org/", `${site}/`],
  ["http://www.civic-skills-lab.org/", `${site}/`],
  ["https://civic-skills-lab.github.io/civil-resistance-skills/", `${site}/`],
  ["https://Civic-Skills-Lab.github.io/civil-resistance-skills/", `${site}/`],
];

let failures = 0;
let warnings = 0;

function ok(message) {
  console.log(`ok   ${message}`);
}

function warn(message) {
  warnings += 1;
  console.warn(`warn ${message}`);
}

function fail(message) {
  failures += 1;
  console.error(`fail ${message}`);
}

async function fetchText(url, init = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      ...init,
    });
    const text = init.method === "HEAD" ? "" : await response.text();
    return { response, text };
  } finally {
    clearTimeout(timeout);
  }
}

function readLocalEnv() {
  if (!existsSync(".env.local")) return {};
  return Object.fromEntries(
    readFileSync(".env.local", "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const index = line.indexOf("=");
        return [line.slice(0, index), line.slice(index + 1)];
      }),
  );
}

function ghJson(args) {
  const output = execFileSync("gh", ["api", ...args], { encoding: "utf8" });
  return JSON.parse(output);
}

function expectedHreflangSet(path) {
  return partialHreflangPages.get(path) ?? new Set(["en", "ru", "es", "pl", "x-default"]);
}

async function checkLivePages() {
  for (const path of [...pages, ...profilePages]) {
    const url = `${site}${path}`;
    const { response, text } = await fetchText(url);
    if (response.status !== 200) {
      fail(`${url} returned ${response.status}`);
      continue;
    }

    const canonical = text.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    const robots = text.match(/<meta name="robots" content="([^"]+)"/)?.[1];
    const expectedCanonical = `${site}${path}`;

    if (canonical !== expectedCanonical) fail(`${url} canonical is ${canonical || "missing"}`);
    else ok(`${path} canonical`);

    if (!robots?.includes("index") || !robots?.includes("follow")) fail(`${url} robots meta is ${robots || "missing"}`);
    if (/levnikolaevich\.github\.io|github\.com\/levnikolaevich\/civil-resistance-skills/.test(text)) {
      fail(`${url} contains old personal repository or site URL`);
    }

    const expectedHreflang = expectedHreflangSet(path);
    for (const lang of expectedHreflang) {
      if (!text.includes(`hreflang="${lang}"`)) fail(`${url} missing hreflang ${lang}`);
    }
    for (const lang of ["en", "ru", "es", "pl"]) {
      if (!expectedHreflang.has(lang) && text.includes(`hreflang="${lang}"`)) {
        fail(`${url} unexpectedly emits hreflang ${lang} (per locale publication contract)`);
      }
    }
  }
}

async function checkHomepageAnchors() {
  // URL fragments never reach the server, so HTTP-only checks cannot
  // observe whether `/#anchor` resolves to a meaningful place. The
  // verifier instead parses the rendered homepage HTML at each locale
  // and confirms the expected `id="..."` attributes are still present
  // for the legacy anchor migration (#8) and the new section-card band.
  for (const path of homepagePaths) {
    const url = `${site}${path}`;
    const { response, text } = await fetchText(url);
    if (response.status !== 200) continue; // already reported by checkLivePages
    for (const id of expectedHomepageAnchors) {
      if (!new RegExp(`id=\"${id}\"`).test(text)) {
        fail(`${url} missing expected anchor id="${id}"`);
      }
    }
    ok(`${path} retains all expected anchor ids`);
  }
}

async function checkProfileSchema() {
  // Profile pages must emit Organization JSON-LD alongside the standard
  // WebPage node so AI agents and search crawlers can read the profile
  // without scraping prose.
  for (const path of profilePages) {
    const url = `${site}${path}`;
    const { response, text } = await fetchText(url);
    if (response.status !== 200) continue;
    if (!/"@type":"Organization"/.test(text)) {
      fail(`${url} missing Organization JSON-LD`);
    } else {
      ok(`${path} emits Organization JSON-LD`);
    }
  }
}

async function checkRedirects() {
  for (const [from, to] of redirects) {
    const { response } = await fetchText(from, { method: "HEAD" });
    if (response.status !== 200 || response.url !== to) fail(`${from} resolved to ${response.status} ${response.url}`);
    else ok(`${from} -> ${to}`);
  }
}

async function checkCrawlerFiles() {
  const robots = await fetchText(`${site}/robots.txt`);
  const sitemap = await fetchText(`${site}/sitemap.xml`);
  const llms = await fetchText(`${site}/llms.txt`);
  const llmsFull = await fetchText(`${site}/llms-full.txt`);

  for (const [name, result] of [
    ["robots.txt", robots],
    ["sitemap.xml", sitemap],
    ["llms.txt", llms],
    ["llms-full.txt", llmsFull],
  ]) {
    if (result.response.status !== 200) fail(`${name} returned ${result.response.status}`);
    else ok(`${name} returns 200`);
  }

  for (const token of ["Sitemap: https://civic-skills-lab.org/sitemap.xml", "OAI-SearchBot", "GPTBot", "ClaudeBot", "PerplexityBot"]) {
    if (!robots.text.includes(token)) fail(`robots.txt missing ${token}`);
  }

  const urlCount = [...sitemap.text.matchAll(/<url>/g)].length;
  const hreflangCount = [...sitemap.text.matchAll(/hreflang=/g)].length;
  // 6 static groups (home, methods, domains, skills, organizations,
  // communication) × 4 locales = 24 entries with 5 hreflang each
  // (en, ru, es, pl, x-default) = 120 hreflang. AEI seed profile is
  // published only in English, so it adds 1 url + 2 hreflang
  // (en + x-default). Update both expectations whenever a new profile
  // adds a translation flag or a new section is registered.
  const expectedUrlCount = 25;
  const expectedHreflangCount = 122;
  if (urlCount !== expectedUrlCount) fail(`sitemap URL count is ${urlCount}, expected ${expectedUrlCount}`);
  else ok(`sitemap has ${expectedUrlCount} URL entries`);
  if (hreflangCount !== expectedHreflangCount) fail(`sitemap hreflang count is ${hreflangCount}, expected ${expectedHreflangCount}`);
  else ok(`sitemap has ${expectedHreflangCount} hreflang entries`);
  if (/levnikolaevich|github\.io\/civil-resistance-skills/.test(sitemap.text)) fail("sitemap contains old host");
  if (!llms.text.includes(site) || !llmsFull.text.includes(site)) fail("llms files do not mention canonical site");

  for (const agent of ["OAI-SearchBot/1.3", "GPTBot/1.3", "ClaudeBot", "PerplexityBot", "Googlebot"]) {
    const result = await fetchText(`${site}/llms.txt`, {
      method: "HEAD",
      headers: { "user-agent": agent },
    });
    if (result.response.status !== 200) fail(`${agent} received ${result.response.status} for llms.txt`);
  }
}

async function checkDns() {
  const aRecords = new Set(await dns.resolve4("civic-skills-lab.org"));
  for (const ip of expectedApexRecords) {
    if (!aRecords.has(ip)) fail(`missing apex A record ${ip}`);
  }
  if (aRecords.size === expectedApexRecords.size) ok("apex A records match GitHub Pages");

  const cname = await dns.resolveCname("www.civic-skills-lab.org");
  if (!cname.includes(expectedPagesHost)) fail(`www CNAME is ${cname.join(",")}`);
  else ok("www CNAME points to GitHub Pages host");

  const mx = await dns.resolveMx("civic-skills-lab.org");
  const mxHosts = new Set(mx.map((record) => record.exchange));
  for (const host of ["route1.mx.cloudflare.net", "route2.mx.cloudflare.net", "route3.mx.cloudflare.net"]) {
    if (!mxHosts.has(host)) fail(`missing MX ${host}`);
  }
  if (mxHosts.size >= 3) ok("Cloudflare Email Routing MX records present");
}

function checkGitHub() {
  try {
    const repoView = JSON.parse(
      execFileSync("gh", [
        "repo",
        "view",
        repo,
        "--json",
        "visibility,defaultBranchRef,homepageUrl,isPrivate,isArchived",
      ], { encoding: "utf8" }),
    );
    if (repoView.visibility !== "PUBLIC" || repoView.isPrivate) fail("GitHub repository is not public");
    else ok("GitHub repository is public");
    if (repoView.defaultBranchRef?.name !== "master") fail(`default branch is ${repoView.defaultBranchRef?.name}`);
    else ok("default branch is master");
    if (repoView.homepageUrl !== `${site}/`) fail(`homepage URL is ${repoView.homepageUrl}`);
  } catch (error) {
    warn(`GitHub repo check skipped: ${error.message}`);
  }

  try {
    const pagesState = ghJson(["repos/Civic-Skills-Lab/civil-resistance-skills/pages"]);
    if (pagesState.cname !== "civic-skills-lab.org") fail(`Pages cname is ${pagesState.cname}`);
    if (!pagesState.https_enforced) fail("Pages HTTPS is not enforced");
    if (pagesState.https_certificate?.state !== "approved") fail("Pages certificate is not approved");
    else ok("GitHub Pages certificate is approved");
    if (pagesState.pending_domain_unverified_at) warn("GitHub Pages reports pending domain verification");
  } catch (error) {
    warn(`GitHub Pages API check skipped: ${error.message}`);
  }

  try {
    const variable = execFileSync("gh", ["variable", "list", "--repo", repo], { encoding: "utf8" });
    if (!variable.includes(`GA_MEASUREMENT_ID\t${expectedMeasurementId}`)) fail("GA_MEASUREMENT_ID repo variable missing or mismatched");
    else ok("GA_MEASUREMENT_ID repository variable is set");
  } catch (error) {
    warn(`GitHub variable check skipped: ${error.message}`);
  }
}

async function checkAnalyticsTag() {
  const { text } = await fetchText(`${site}/`);
  if (!text.includes(expectedMeasurementId) || !text.includes("googletagmanager.com/gtag/js")) {
    fail("live homepage does not include expected Google tag");
  } else {
    ok("live homepage includes expected GA4 tag");
  }
}

async function checkCloudflareIfConfigured() {
  const env = readLocalEnv();
  const token = env.CLOUDFLARE_API_TOKEN;
  if (!token) {
    warn("Cloudflare API checks skipped: CLOUDFLARE_API_TOKEN not found in .env.local");
    return;
  }

  const headers = { authorization: `Bearer ${token}`, "content-type": "application/json" };
  const verify = await fetch("https://api.cloudflare.com/client/v4/user/tokens/verify", { headers }).then((response) => response.json());
  if (verify.result?.status !== "active") fail("Cloudflare API token is not active");
  else ok("Cloudflare API token is active");

  const zones = await fetch("https://api.cloudflare.com/client/v4/zones?name=civic-skills-lab.org", { headers }).then((response) => response.json());
  const zone = zones.result?.[0];
  if (!zone) {
    fail("Cloudflare zone not found");
    return;
  }
  if (zone.status !== "active") fail(`Cloudflare zone status is ${zone.status}`);
  else ok("Cloudflare zone is active");

  const records = await fetch(`https://api.cloudflare.com/client/v4/zones/${zone.id}/dns_records?per_page=100`, { headers }).then((response) => response.json());
  const apex = records.result.filter((record) => record.type === "A" && record.name === "civic-skills-lab.org");
  const www = records.result.find((record) => record.type === "CNAME" && record.name === "www.civic-skills-lab.org");
  if (apex.length !== 4) fail(`Cloudflare apex A record count is ${apex.length}`);
  if (apex.some((record) => record.proxied)) warn("Cloudflare apex records are proxied; re-check GitHub Pages health and crawler access");
  if (!www || www.content !== expectedPagesHost) fail("Cloudflare www CNAME is missing or wrong");
  if (www?.proxied) warn("Cloudflare www CNAME is proxied; re-check GitHub Pages health and crawler access");

  const routing = await fetch(`https://api.cloudflare.com/client/v4/zones/${zone.id}/email/routing`, { headers }).then((response) => response.json());
  if (!routing.result?.enabled || routing.result?.status !== "ready") fail("Cloudflare Email Routing is not ready");
  else ok("Cloudflare Email Routing is ready");

  const rules = await fetch(`https://api.cloudflare.com/client/v4/zones/${zone.id}/email/routing/rules`, { headers }).then((response) => response.json());
  const contactRule = rules.result?.find((rule) =>
    rule.enabled &&
    rule.matchers?.some((matcher) => matcher.field === "to" && matcher.value === "contact@civic-skills-lab.org") &&
    rule.actions?.some((action) => action.type === "forward" && action.value?.includes("levnikolaevich.com@gmail.com")),
  );
  if (!contactRule) fail("contact@ forwarding rule is missing or disabled");
  else ok("contact@ forwarding rule is enabled");
}

async function main() {
  await checkLivePages();
  await checkHomepageAnchors();
  await checkProfileSchema();
  await checkRedirects();
  await checkCrawlerFiles();
  await checkDns();
  checkGitHub();
  await checkAnalyticsTag();
  await checkCloudflareIfConfigured();

  if (failures > 0) {
    console.error(`\npublication health failed: ${failures} failure(s), ${warnings} warning(s)`);
    process.exit(1);
  }

  console.log(`\npublication health ok: ${warnings} warning(s)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
