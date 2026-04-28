# Cloudflare Operations

This project uses Cloudflare for DNS and email routing for `civic-skills-lab.org`.

See `docs/operations.md` for the full site/domain runbook.

## Current Zone Setup

- Zone: `civic-skills-lab.org`
- DNS host: Cloudflare
- Registrar: GoDaddy
- Nameservers:
  - `albert.ns.cloudflare.com`
  - `savanna.ns.cloudflare.com`

GitHub Pages records:

```text
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   civic-skills-lab.github.io
```

The GitHub Pages records are currently intended to stay DNS-only. If Cloudflare proxying is enabled later, first verify SSL/TLS mode and use `Full`, not `Flexible`.

## Local API Token

The Cloudflare API token is stored locally and must not be committed:

```text
.env.local
```

Expected local variables:

```text
CLOUDFLARE_API_TOKEN=...
CLOUDFLARE_ZONE_NAME=civic-skills-lab.org
CLOUDFLARE_EMAIL_SOURCE=contact@civic-skills-lab.org
CLOUDFLARE_EMAIL_DESTINATION=levnikolaevich.com@gmail.com
```

`.env.local` is ignored by `.gitignore`.

## Current Email Routing

Route incoming mail:

```text
contact@civic-skills-lab.org -> levnikolaevich.com@gmail.com
```

Cloudflare may require the destination address to be verified by email before routing becomes active.

Required email DNS records:

```text
MX  @  route1.mx.cloudflare.net  priority 9
MX  @  route2.mx.cloudflare.net  priority 69
MX  @  route3.mx.cloudflare.net  priority 38
TXT @  v=spf1 include:_spf.mx.cloudflare.net ~all
TXT cf2024-1._domainkey  Cloudflare DKIM key
```

Use Cloudflare **Email Routing > Activity Log** to verify delivery. The expected successful state for a test email is `forward` / `delivered`.

## Useful Checks

```powershell
Resolve-DnsName civic-skills-lab.org -Type NS
Resolve-DnsName civic-skills-lab.org -Type MX
Resolve-DnsName civic-skills-lab.org -Type TXT
Resolve-DnsName cf2024-1._domainkey.civic-skills-lab.org -Type TXT
```

```powershell
$env:CLOUDFLARE_API_TOKEN = (Get-Content .env.local | Where-Object { $_ -like "CLOUDFLARE_API_TOKEN=*" }).Split("=", 2)[1]
Invoke-RestMethod `
  -Uri "https://api.cloudflare.com/client/v4/user/tokens/verify" `
  -Headers @{ Authorization = "Bearer $env:CLOUDFLARE_API_TOKEN" }
```
