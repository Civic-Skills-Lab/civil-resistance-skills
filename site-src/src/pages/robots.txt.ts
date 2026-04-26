import { siteUrl } from "../data/siteMeta";

const allowedUserAgents = [
  "*",
  "Googlebot",
  "Bingbot",
  "Google-Extended",
  "OAI-SearchBot",
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot"
] as const;

export function GET() {
  const body = `${allowedUserAgents.map((userAgent) => `User-agent: ${userAgent}\nAllow: /`).join("\n\n")}

Sitemap: ${siteUrl}/sitemap.xml
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
