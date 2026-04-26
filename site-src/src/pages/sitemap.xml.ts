import { absoluteUrl, localizedPaths } from "../data/siteMeta";

const groups = [localizedPaths.home, localizedPaths.communication];

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${groups
  .flatMap((group) =>
    Object.values(group).map(
      (path) => `  <url>
    <loc>${absoluteUrl(path)}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${absoluteUrl(group.en)}" />
    <xhtml:link rel="alternate" hreflang="ru" href="${absoluteUrl(group.ru)}" />
    <xhtml:link rel="alternate" hreflang="es" href="${absoluteUrl(group.es)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(group.en)}" />
  </url>`
    )
  )
  .join("\n")}
</urlset>
`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
}

