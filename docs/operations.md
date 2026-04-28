# Operations Runbook

This file records the non-secret operational setup for the public project site, organization repository, custom domain, analytics, and email routing.

## Repository

- GitHub organization: `Civic-Skills-Lab`
- Repository: `Civic-Skills-Lab/civil-resistance-skills`
- Local remote: `origin = https://github.com/Civic-Skills-Lab/civil-resistance-skills.git`
- Default branch: `master`
- Former personal repository: not retained as a local remote.

Useful checks:

```powershell
git remote -v
git branch --show-current
gh repo view Civic-Skills-Lab/civil-resistance-skills --json nameWithOwner,visibility,defaultBranchRef,homepageUrl
```

## GitHub Pages

The public site is deployed from Astro source, not from committed build output.

- Source directory: `site-src/`
- Generated output: `dist/` (ignored and not committed)
- Workflow: `.github/workflows/pages.yml`
- Trigger branch: `master`
- GitHub Pages domain: `https://civic-skills-lab.org/`
- GitHub Pages source: GitHub Actions
- HTTPS: enforced in GitHub Pages settings

The workflow exposes the GitHub repository variable `GA_MEASUREMENT_ID` to the Astro build as `PUBLIC_GA_MEASUREMENT_ID`.

Useful checks:

```powershell
gh api repos/Civic-Skills-Lab/civil-resistance-skills/pages --jq '{html_url:.html_url, custom_domain:.cname, https_enforced:.https_enforced}'
gh run list --workflow pages.yml --repo Civic-Skills-Lab/civil-resistance-skills --limit 5
npm run check
npm run build
```

## Site Configuration

Astro is configured for the custom domain:

- `astro.config.mjs`: `site = "https://civic-skills-lab.org"`, `base = "/"`
- `site-src/src/data/siteMeta.ts`: canonical site URL and GitHub repository URL
- Localized public pages: English, Russian, Spanish, and Polish
- Agent-readable files: `/llms.txt` and `/llms-full.txt`

Useful live checks:

```powershell
$urls = @(
  "https://civic-skills-lab.org/",
  "https://civic-skills-lab.org/ru/",
  "https://civic-skills-lab.org/es/",
  "https://civic-skills-lab.org/pl/",
  "https://civic-skills-lab.org/domains/communication/",
  "https://civic-skills-lab.org/llms.txt",
  "https://civic-skills-lab.org/llms-full.txt"
)

foreach ($url in $urls) {
  $response = Invoke-WebRequest -Uri $url -UseBasicParsing -MaximumRedirection 5
  "$($response.StatusCode) $url $($response.Content.Length)"
}
```

## Domain And DNS

- Domain: `civic-skills-lab.org`
- Registrar: GoDaddy
- DNS host: Cloudflare
- Cloudflare nameservers:
  - `albert.ns.cloudflare.com`
  - `savanna.ns.cloudflare.com`

GitHub Pages DNS records:

```text
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   civic-skills-lab.github.io
```

Current recommendation: keep GitHub Pages records DNS-only unless intentionally moving the site behind the Cloudflare proxy. If enabling the proxy later, review Cloudflare SSL/TLS mode first and use `Full`, not `Flexible`.

Useful checks:

```powershell
Resolve-DnsName civic-skills-lab.org -Type NS
Resolve-DnsName civic-skills-lab.org -Type A
Resolve-DnsName www.civic-skills-lab.org -Type CNAME
```

## Google Analytics

Google Analytics details live in `docs/analytics.md`.

Current setup:

- GA4 property: `LevNikolaevich Insights`
- Web stream: `Civil Resistance Skills`
- Stream default URI: `https://civic-skills-lab.org/`
- Measurement ID: `G-8PKLYL41JQ`
- GitHub variable: `GA_MEASUREMENT_ID`

Useful checks:

```powershell
gh variable list --repo Civic-Skills-Lab/civil-resistance-skills
$response = Invoke-WebRequest -Uri "https://civic-skills-lab.org/" -UseBasicParsing
$response.Content -match "G-8PKLYL41JQ"
```

## Email Routing

Cloudflare DNS and email routing details live in `docs/cloudflare.md`.

Current routing:

```text
contact@civic-skills-lab.org -> levnikolaevich.com@gmail.com
```

Cloudflare Email Routing must remain enabled and the destination Gmail address must remain verified.

DNS records used for Cloudflare Email Routing:

```text
MX  @  route1.mx.cloudflare.net  priority 9
MX  @  route2.mx.cloudflare.net  priority 69
MX  @  route3.mx.cloudflare.net  priority 38
TXT @  v=spf1 include:_spf.mx.cloudflare.net ~all
TXT cf2024-1._domainkey  Cloudflare DKIM key
```

Useful checks:

```powershell
Resolve-DnsName civic-skills-lab.org -Type MX
Resolve-DnsName civic-skills-lab.org -Type TXT
Resolve-DnsName cf2024-1._domainkey.civic-skills-lab.org -Type TXT
```

In Gmail, keep a filter for messages addressed to `contact@civic-skills-lab.org` with **Never send it to Spam**.

## Secrets And Local Credentials

Do not commit OAuth client JSON files, ADC credentials, Cloudflare tokens, private keys, service account keys, or PEM files.

Ignored local files include:

- `.env`
- `.env.*`
- `client_secret*.json`
- `application_default_credentials.json`
- `credentials.json`
- `token.json`
- `*.pem`
- `*.key`

The local Cloudflare token pointer is documented in `docs/cloudflare.md`. The token value itself must stay only in ignored local files or a proper secrets manager.
