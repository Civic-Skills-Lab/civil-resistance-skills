import { getCollection } from "astro:content";
import {
  absoluteUrl,
  languages,
  localizedPaths,
  type Language
} from "../data/siteMeta";

interface SitemapGroup {
  paths: Partial<Record<Language, string>>;
}

const staticGroups: SitemapGroup[] = [
  { paths: localizedPaths.home },
  { paths: localizedPaths.methods },
  { paths: localizedPaths.domains },
  { paths: localizedPaths.skills },
  { paths: localizedPaths.organizations },
  { paths: localizedPaths.communication }
];

export async function GET() {
  const profiles = await getCollection("organizations");
  const profileGroups: SitemapGroup[] = profiles
    .map((entry) => {
      const paths: Partial<Record<Language, string>> = {};
      for (const lang of languages) {
        if (entry.data.translations[lang]) {
          paths[lang] = `${localizedPaths.organizations[lang]}${entry.id}/`;
        }
      }
      return { paths };
    })
    .filter((group) => Object.keys(group.paths).length > 0);

  const groups = [...staticGroups, ...profileGroups];

  const urls = groups.flatMap((group) => {
    const presentLocales = Object.keys(group.paths) as Language[];
    return presentLocales.map((language) => {
      const path = group.paths[language]!;
      const hreflangLines = presentLocales.map(
        (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${absoluteUrl(group.paths[l]!)}" />`
      );
      const xDefaultLocale: Language = presentLocales.includes("en") ? "en" : presentLocales[0];
      const xDefaultLine = `    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(group.paths[xDefaultLocale]!)}" />`;
      return `  <url>\n    <loc>${absoluteUrl(path)}</loc>\n${hreflangLines.join("\n")}\n${xDefaultLine}\n  </url>`;
    });
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
}
