import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

// YAML 1.1 parsers (including Astro's) auto-promote unquoted ISO-8601 dates
// to JS Date objects. Accept both shapes from authoring and normalize to a
// YYYY-MM-DD string so downstream code only sees strings.
const dateString = z.preprocess(
  (value) => {
    if (value instanceof Date) {
      return value.toISOString().slice(0, 10);
    }
    return value;
  },
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "must be a YYYY-MM-DD date")
);

const sourceSchema = z.object({
  id: z.string().min(1, "source id is required"),
  type: z.enum(["primary", "secondary"]),
  url: z.url("source url must be a valid URL"),
  accessed_on: dateString,
  citation: z.string().min(1).optional()
});

const claimSchema = z.object({
  text: z.string().min(1),
  source_ids: z
    .array(z.string().min(1))
    .min(1, "every claim must cite at least one source")
});

type Claim = z.infer<typeof claimSchema>;

const organizationType = z.enum([
  "research",
  "training",
  "education",
  "archive",
  "journalism",
  "legal_support",
  "documentation",
  "methodology",
  "convening"
]);

const activeStatus = z.enum(["active", "dormant", "dissolved", "unknown"]);

const confidence = z.enum([
  "well_documented",
  "partially_documented",
  "sparse"
]);

// Per-locale publication signal. A profile renders only at locales whose
// flag is true; the listing and sitemap consume this to avoid surfacing
// translation-pending placeholders. See docs/organization-registry.md
// § Localization and issue #6.
const translationFlags = z.object({
  en: z.boolean(),
  ru: z.boolean(),
  es: z.boolean(),
  pl: z.boolean()
});

const currentYear = new Date().getFullYear();

const baseProfile = z.object({
  name: z.string().min(1),
  also_known_as: z.array(z.string().min(1)).optional(),
  type: organizationType,
  geography: z.string().min(1),
  founded: z.union([
    z.number().int().gte(1700).lte(currentYear),
    z.literal("unknown")
  ]),
  active_status: activeStatus,
  focus_areas: z.array(z.string().min(1)).min(1).max(12),
  observed_activities: z.array(claimSchema).min(2).max(6),
  public_positions: z.array(claimSchema).max(6).default([]),
  sources: z.array(sourceSchema).min(2),
  confidence,
  last_reviewed: dateString,
  notes: z.string().min(1).optional(),
  translations: translationFlags
});

export const organizationProfileSchema = baseProfile.superRefine(
  (data, ctx) => {
    const knownIds = new Set(data.sources.map((s) => s.id));
    const checkClaims = (
      claims: Claim[],
      field: "observed_activities" | "public_positions"
    ) => {
      claims.forEach((claim, i) => {
        claim.source_ids.forEach((sid, j) => {
          if (!knownIds.has(sid)) {
            ctx.addIssue({
              code: "custom",
              message: `${field}[${i}].source_ids[${j}] references unknown source id "${sid}"`,
              path: [field, i, "source_ids", j]
            });
          }
        });
      });
    };
    checkClaims(data.observed_activities, "observed_activities");
    checkClaims(data.public_positions, "public_positions");

    if (!data.sources.some((s) => s.type === "secondary")) {
      ctx.addIssue({
        code: "custom",
        message:
          'sources must include at least one entry with type "secondary"',
        path: ["sources"]
      });
    }

    const ids = data.sources.map((s) => s.id);
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    if (dupes.length) {
      ctx.addIssue({
        code: "custom",
        message: `duplicate source ids: ${[...new Set(dupes)].join(", ")}`,
        path: ["sources"]
      });
    }

    if (!data.translations.en) {
      ctx.addIssue({
        code: "custom",
        message:
          "translations.en must be true — profiles are publishable in English first per the editorial spec",
        path: ["translations", "en"]
      });
    }
  }
);

const organizations = defineCollection({
  loader: glob({
    base: "./site-src/src/content/organizations",
    pattern: "**/*.{yaml,yml,json}"
  }),
  schema: organizationProfileSchema
});

export const collections = { organizations };
