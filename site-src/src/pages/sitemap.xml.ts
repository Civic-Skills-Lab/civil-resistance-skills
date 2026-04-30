import { absoluteUrl, languages, localizedPaths } from "../data/siteMeta";

const groups = [
  localizedPaths.home,
  localizedPaths.methods,
  localizedPaths.domains,
  localizedPaths.skills,
  localizedPaths.organizations,
  localizedPaths.communication
];

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${groups
  .flatMap((group) =>
    Object.values(group).map(
      (path) => `  <url>
    <loc>${absoluteUrl(path)}</loc>
${languages.map((language) => `    <xhtml:link rel="alternate" hreflang="${language}" href="${absoluteUrl(group[language])}" />`).join("\n")}
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
