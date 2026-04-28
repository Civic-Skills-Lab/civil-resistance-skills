# Google Analytics Setup

This project uses Google Analytics 4 only for basic public-site traffic visibility.

## Current Configuration

- Analytics account: `LevNikolaevich`
- Property: `LevNikolaevich Insights`
- Web data stream: `Civil Resistance Skills`
- Site URL: `https://civic-skills-lab.github.io/civil-resistance-skills/`
- Measurement ID: `G-8PKLYL41JQ`
- GitHub repository variable: `GA_MEASUREMENT_ID`

The Measurement ID is a public site identifier, not an OAuth secret. OAuth client JSON files, refresh tokens, access tokens, ADC files, service-account keys, and local Google Cloud credentials must never be committed.

The site does not hard-code the Measurement ID in source. GitHub Actions reads `GA_MEASUREMENT_ID` and exposes it to the Astro build as `PUBLIC_GA_MEASUREMENT_ID`. The layout injects the Google tag only when that value matches the GA4 `G-...` format.

## How Deployment Works

1. Update or confirm the repository variable:

   ```powershell
   gh variable set GA_MEASUREMENT_ID --body "G-8PKLYL41JQ"
   ```

2. Rebuild and deploy GitHub Pages:

   ```powershell
   gh workflow run pages.yml
   ```

3. Verify the live page contains the Google tag:

   ```powershell
   $r = Invoke-WebRequest -Uri "https://civic-skills-lab.github.io/civil-resistance-skills/" -UseBasicParsing
   $r.Content -match "G-8PKLYL41JQ"
   ```

## Where To View Analytics

In Google Analytics:

- Open property `LevNikolaevich Insights`.
- Use **Reports → Realtime** to confirm current visits after a deployment.
- Use **Reports → Engagement → Pages and screens** to see which localized pages and domain pages are being visited.
- Use **Reports → Acquisition → Traffic acquisition** to understand source and medium.
- Use **Admin → Data streams → Civil Resistance Skills** to confirm stream settings and the Measurement ID.

Useful URLs:

- Site: `https://civic-skills-lab.github.io/civil-resistance-skills/`
- Data stream default URI: `https://civic-skills-lab.github.io/civil-resistance-skills/`

## What To Watch

- Visits by language path: `/`, `/ru/`, `/es/`.
- Visits to the communication domain pages: `/domains/communication/`, `/ru/domains/communication/`, `/es/domains/communication/`.
- Traffic sources after sharing the repository or site.
- Whether users reach operational skill links from the communication page.

## Privacy and Compliance Notes

Google Analytics is enabled through the standard Google tag. If the site is promoted to EU audiences or used beyond low-volume project analytics, add a privacy/cookie notice or consent-mode decision before expanding tracking.

Do not commit OAuth client secrets, downloaded Google client JSON files, local ADC credentials, service-account keys, or token files. The local OAuth client used to create the GA4 stream is not part of the website.
