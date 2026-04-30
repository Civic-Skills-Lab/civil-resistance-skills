import { defineCollection } from "astro:content";
import { z } from "astro:schema";
import { glob } from "astro/loaders";

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

const confidence = z.enum(["well_documented", "partially_documented", "sparse"]);

const sourceType = z.enum(["primary", "secondary"]);

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "must be YYYY-MM-DD");

const yearOrUnknown = z.union([
  z.number().int().min(1700).max(2100),
  z.literal("unknown")
]);

const sourceSchema = z.object({
  id: z.string().min(1),
  type: sourceType,
  url: z.string().url(),
  accessed_on: isoDate,
  citation: z.string().min(1).optional()
});

const claimSchema = z.object({
  text: z.string().min(1),
  source_ids: z.array(z.string().min(1)).min(1, "every claim cites at least one source")
});

const translationsSchema = z.object({
  en: z.literal(true),
  ru: z.boolean(),
  es: z.boolean(),
  pl: z.boolean()
});

const profileSchema = z
  .object({
    name: z.string().min(1),
    also_known_as: z.array(z.string().min(1)).optional(),
    type: organizationType,
    geography: z.string().min(1),
    founded: yearOrUnknown,
    active_status: activeStatus,
    focus_areas: z.array(z.string().min(1)).min(1),
    observed_activities: z.array(claimSchema).min(2).max(6),
    public_positions: z.array(claimSchema).max(6),
    sources: z.array(sourceSchema).min(2),
    confidence,
    last_reviewed: isoDate,
    notes: z.string().optional(),
    translations: translationsSchema
  })
  .superRefine((data, ctx) => {
    const sourceIds = new Set(data.sources.map((source) => source.id));

    const ids = data.sources.map((source) => source.id);
    if (ids.length !== new Set(ids).size) {
      ctx.addIssue({
        code: "custom",
        message: "sources contain duplicate ids",
        path: ["sources"]
      });
    }

    const checkClaims = (group: "observed_activities" | "public_positions") => {
      data[group].forEach((claim, index) => {
        for (const ref of claim.source_ids) {
          if (!sourceIds.has(ref)) {
            ctx.addIssue({
              code: "custom",
              message: `${group}[${index}] cites unknown source_id "${ref}"`,
              path: [group, index, "source_ids"]
            });
          }
        }
      });
    };
    checkClaims("observed_activities");
    checkClaims("public_positions");

    if (!data.sources.some((source) => source.type === "secondary")) {
      ctx.addIssue({
        code: "custom",
        message: "profile must include at least one secondary source",
        path: ["sources"]
      });
    }
  });

const organizations = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./site-src/src/content/organizations" }),
  schema: profileSchema
});

export const collections = { organizations };
