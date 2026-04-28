# Cloudflare Operations

This project uses Cloudflare for DNS and email routing for `civic-skills-lab.org`.

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

## Current Email Routing Goal

Route incoming mail:

```text
contact@civic-skills-lab.org -> levnikolaevich.com@gmail.com
```

Cloudflare may require the destination address to be verified by email before routing becomes active.

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

