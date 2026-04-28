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
- HTTPS certificate: approved for `civic-skills-lab.org` and `www.civic-skills-lab.org`
- Certificate expiry observed through GitHub Pages API: `2026-07-27`

The workflow exposes the GitHub repository variable `GA_MEASUREMENT_ID` to the Astro build as `PUBLIC_GA_MEASUREMENT_ID`.

Useful checks:

```powershell
gh api repos/Civic-Skills-Lab/civil-resistance-skills/pages --jq '{html_url:.html_url, custom_domain:.cname, https_enforced:.https_enforced}'
gh api repos/Civic-Skills-Lab/civil-resistance-skills/pages --jq '{cname:.cname, protected_domain_state:.protected_domain_state, pending_domain_unverified_at:.pending_domain_unverified_at, https_certificate:.https_certificate, https_enforced:.https_enforced}'
gh run list --workflow pages.yml --repo Civic-Skills-Lab/civil-resistance-skills --limit 5
npm run check
npm run build
npm run check:publication
```

GitHub custom domain verification is a separate account/organization security control. GitHub recommends verifying the domain to reduce Pages takeover risk if a repository is deleted, disabled, or disconnected while DNS still points at GitHub Pages. Confirm this in the GitHub organization UI under Pages domain verification; the repository Pages API should not report `pending_domain_unverified_at`.

## Site Configuration

Astro is configured for the custom domain:

- `astro.config.mjs`: `site = "https://civic-skills-lab.org"`, `base = "/"`
- `site-src/src/data/siteMeta.ts`: canonical site URL and GitHub repository URL
- Localized public pages: English, Russian, Spanish, and Polish
- Agent-readable files: `/llms.txt` and `/llms-full.txt`
- Search/agent files: `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt`
- Duplicate-content policy: all public pages use self-canonical URLs on `https://civic-skills-lab.org/`; `http`, `www`, and GitHub Pages host variants redirect to the apex HTTPS custom domain.

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

Publication health gate:

```powershell
npm run check:publication
```

This checks live URLs, redirects, canonical tags, `hreflang`, `robots.txt`, `sitemap.xml`, `llms.txt`, DNS, GitHub Pages state, the GA4 tag, and Cloudflare/email routing if `.env.local` contains a Cloudflare API token.

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

Expected redirect checks:

```text
http://civic-skills-lab.org/ -> https://civic-skills-lab.org/
https://www.civic-skills-lab.org/ -> https://civic-skills-lab.org/
https://civic-skills-lab.github.io/civil-resistance-skills/ -> https://civic-skills-lab.org/
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

The Google Analytics Admin API currently sees the `Civil Resistance Skills` web stream under property `LevNikolaevich Insights`, with default URI `https://civic-skills-lab.org/` and Measurement ID `G-8PKLYL41JQ`.

## Google Search Console

Google Search Console is the remaining manual search-discovery step. The current local Google ADC credentials can reach Google Analytics APIs, but Search Console API access returned `403 Forbidden`, which usually means the OAuth token lacks the Search Console/Webmasters scope or the site property has not been added and verified for the account.

Manual setup:

1. Open Google Search Console.
2. Add a URL-prefix property for `https://civic-skills-lab.org/`.
3. Verify ownership. DNS verification is preferred because DNS is hosted in Cloudflare; HTML tag verification is also acceptable if added to Astro source deliberately.
4. Submit sitemap: `https://civic-skills-lab.org/sitemap.xml`.
5. Use URL Inspection for:
   - `https://civic-skills-lab.org/`
   - `https://civic-skills-lab.org/domains/communication/`
   - `https://civic-skills-lab.org/llms.txt`

If using the Search Console API locally, re-authenticate ADC with the Webmasters scope:

```powershell
gcloud auth application-default login --scopes="https://www.googleapis.com/auth/webmasters,https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/cloud-platform"
```

Then list verified sites and submit the sitemap:

```powershell
$token = gcloud auth application-default print-access-token
$headers = @{ Authorization = "Bearer $token" }
Invoke-RestMethod -Uri "https://www.googleapis.com/webmasters/v3/sites" -Headers $headers
Invoke-RestMethod -Method Put -Uri "https://www.googleapis.com/webmasters/v3/sites/https%3A%2F%2Fcivic-skills-lab.org%2F/sitemaps/https%3A%2F%2Fcivic-skills-lab.org%2Fsitemap.xml" -Headers $headers
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
