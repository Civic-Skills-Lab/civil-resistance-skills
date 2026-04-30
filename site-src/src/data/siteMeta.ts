export const basePath = "";
export const repoUrl = "https://github.com/Civic-Skills-Lab/civil-resistance-skills";
export const repoBranch = "master";
export const siteUrl = "https://civic-skills-lab.org";
export const siteName = "Civil Resistance Skills";
export const themeColor = "#245d8f";

export function githubBlob(path: string) {
  return `${repoUrl}/blob/${repoBranch}/${path}`;
}

export function githubTree(path: string) {
  return `${repoUrl}/tree/${repoBranch}/${path}`;
}

export const defaultImage = {
  path: "/assets/social-preview.png",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: {
    en: "Civil Resistance Skills research atlas social preview",
    es: "Vista previa social del atlas de investigación Civil Resistance Skills",
    pl: "Podgląd społecznościowy atlasu badawczego Civil Resistance Skills",
    ru: "Превью исследовательского атласа Civil Resistance Skills"
  }
} as const;

export const languages = ["en", "es", "pl", "ru"] as const;
export type Language = (typeof languages)[number];

export const ogLocales: Record<Language, string> = {
  en: "en_US",
  es: "es_ES",
  pl: "pl_PL",
  ru: "ru_RU"
};

export const langNames: Record<Language, string> = {
  en: "English",
  es: "Español",
  pl: "Polski",
  ru: "Русский"
};

export const aiResources = {
  llms: `${siteUrl}/llms.txt`,
  sitemap: `${siteUrl}/sitemap.xml`,
  repository: repoUrl,
  readme: githubBlob("README.md"),
  safety: githubBlob("SAFETY.md"),
  registry: githubTree("methods-registry"),
  taxonomy: githubBlob("methods-registry/00-naming-and-taxonomy.md"),
  sources: githubBlob("methods-registry/03-sources-and-references.md"),
  skillsCatalog: githubTree("skills-catalog"),
  claudeMarketplace: githubBlob(".claude-plugin/marketplace.json"),
  codexMarketplace: githubBlob(".agents/plugins/marketplace.json")
} as const;

export type SectionKey = "methods" | "domains" | "skills" | "organizations";

// Section slugs are English-uniform across locales by design — only the
// locale prefix changes. New section paths must also be added to the
// `groups` array in src/pages/sitemap.xml.ts.
export const localizedPaths = {
  home: {
    en: "/",
    pl: "/pl/",
    ru: "/ru/",
    es: "/es/"
  },
  methods: {
    en: "/methods/",
    pl: "/pl/methods/",
    ru: "/ru/methods/",
    es: "/es/methods/"
  },
  domains: {
    en: "/domains/",
    pl: "/pl/domains/",
    ru: "/ru/domains/",
    es: "/es/domains/"
  },
  skills: {
    en: "/skills/",
    pl: "/pl/skills/",
    ru: "/ru/skills/",
    es: "/es/skills/"
  },
  organizations: {
    en: "/organizations/",
    pl: "/pl/organizations/",
    ru: "/ru/organizations/",
    es: "/es/organizations/"
  },
  communication: {
    en: "/domains/communication/",
    pl: "/pl/domains/communication/",
    ru: "/ru/domains/communication/",
    es: "/es/domains/communication/"
  }
} as const;

export interface SectionNavLink {
  key: SectionKey;
  label: string;
  href: string;
}

export function sectionsFor(
  lang: Language,
  labels: Record<SectionKey, string>
): SectionNavLink[] {
  return (Object.keys(localizedPaths) as Array<keyof typeof localizedPaths>)
    .filter((k): k is SectionKey =>
      k === "methods" || k === "domains" || k === "skills" || k === "organizations"
    )
    .map((k) => ({
      key: k,
      label: labels[k],
      href: pathFor(localizedPaths[k][lang])
    }));
}

export const pageMeta = {
  home: {
    en: {
      title: "Civil Resistance Skills — Research Atlas",
      description:
        "A source-linked research atlas for studying, simulating, and carefully preparing civil-resistance methods with AI agents.",
      ogDescription:
        "Civil-resistance method skills for Claude, Codex, education, and simulation."
    },
    ru: {
      title: "Civil Resistance Skills — исследовательский атлас",
      description:
        "Исследовательский атлас с источниками — для изучения, симуляций и аккуратной подготовки методов гражданского сопротивления вместе с агентами ИИ.",
      ogDescription:
        "Материалы по методам гражданского сопротивления для Claude, Codex, образования и симуляции."
    },
    es: {
      title: "Civil Resistance Skills — atlas de investigación",
      description:
        "Un atlas de investigación con fuentes — para estudiar, simular y preparar con cuidado métodos de resistencia civil junto a agentes de IA.",
      ogDescription:
        "Habilidades para métodos de resistencia civil — Claude, Codex, educación y simulación."
    },
    pl: {
      title: "Civil Resistance Skills — atlas badawczy",
      description:
        "Atlas badawczy ze źródłami — do badań, symulacji i ostrożnego przygotowania metod obywatelskiego oporu bez przemocy razem z agentami AI.",
      ogDescription:
        "Materiały dotyczące metod obywatelskiego oporu bez przemocy dla Claude, Codex, edukacji i symulacji."
    }
  },
  methods: {
    en: {
      title: "Methods — Civil Resistance Skills",
      description:
        "An indexed catalogue of civil-resistance methods linked to their public taxonomic sources.",
      ogDescription:
        "Indexed civil-resistance methods linked to public sources."
    },
    ru: {
      title: "Методы — Civil Resistance Skills",
      description:
        "Каталог методов гражданского сопротивления — индексированный и связанный с публичными источниками.",
      ogDescription:
        "Каталог методов гражданского сопротивления, со ссылками на публичные источники."
    },
    es: {
      title: "Métodos — Civil Resistance Skills",
      description:
        "Catálogo indexado de métodos de resistencia civil con enlaces a sus fuentes taxonómicas públicas.",
      ogDescription:
        "Catálogo de métodos de resistencia civil con fuentes públicas."
    },
    pl: {
      title: "Metody — Civil Resistance Skills",
      description:
        "Zindeksowany katalog metod obywatelskiego oporu bez przemocy z odnośnikami do publicznych źródeł taksonomicznych.",
      ogDescription:
        "Katalog metod obywatelskiego oporu bez przemocy z publicznymi źródłami."
    }
  },
  domains: {
    en: {
      title: "Domains — Civil Resistance Skills",
      description:
        "Domain pages bring together methods, applied skills, and notes within a single research area.",
      ogDescription:
        "Research domains across the civil-resistance method atlas."
    },
    ru: {
      title: "Разделы — Civil Resistance Skills",
      description:
        "Разделы по областям исследования — методы, прикладные навыки и заметки собраны в одной точке.",
      ogDescription:
        "Разделы атласа методов гражданского сопротивления."
    },
    es: {
      title: "Áreas — Civil Resistance Skills",
      description:
        "Las páginas de área reúnen métodos, habilidades aplicadas y notas dentro de un mismo terreno de investigación.",
      ogDescription:
        "Áreas del atlas de métodos de resistencia civil."
    },
    pl: {
      title: "Obszary — Civil Resistance Skills",
      description:
        "Strony obszarów łączą metody, praktyczne materiały oraz notatki w obrębie jednego pola badawczego.",
      ogDescription:
        "Obszary badawcze atlasu metod obywatelskiego oporu bez przemocy."
    }
  },
  skills: {
    en: {
      title: "Skills — Civil Resistance Skills",
      description:
        "Applied skills built on top of the method catalogue, ready for use with Claude and Codex agents.",
      ogDescription:
        "Applied skills paired with the civil-resistance method catalogue."
    },
    ru: {
      title: "Навыки — Civil Resistance Skills",
      description:
        "Прикладные навыки на основе каталога методов — готовые к использованию вместе с агентами Claude и Codex.",
      ogDescription:
        "Прикладные навыки, связанные с каталогом методов."
    },
    es: {
      title: "Habilidades — Civil Resistance Skills",
      description:
        "Habilidades aplicadas construidas sobre el catálogo de métodos, listas para usarse con agentes Claude y Codex.",
      ogDescription:
        "Habilidades aplicadas vinculadas al catálogo de métodos."
    },
    pl: {
      title: "Materiały — Civil Resistance Skills",
      description:
        "Praktyczne materiały zbudowane wokół katalogu metod, gotowe do użycia razem z agentami Claude i Codex.",
      ogDescription:
        "Praktyczne materiały powiązane z katalogiem metod."
    }
  },
  organizations: {
    en: {
      title: "Organizations — Civil Resistance Skills",
      description:
        "A registry of organizations whose civil-resistance work appears in the public record. Profiles describe documented activity and cite their sources.",
      ogDescription:
        "Source-cited registry of organizations linked to civil-resistance work."
    },
    ru: {
      title: "Организации — Civil Resistance Skills",
      description:
        "Справочник организаций, чья работа в сфере гражданского сопротивления отражена в публичных источниках. Каждая запись опирается на ссылки и цитаты.",
      ogDescription:
        "Справочник организаций со ссылками на публичные источники."
    },
    es: {
      title: "Organizaciones — Civil Resistance Skills",
      description:
        "Un registro de organizaciones cuyo trabajo en resistencia civil aparece en fuentes públicas. Cada perfil describe actividad documentada y cita sus fuentes.",
      ogDescription:
        "Registro de organizaciones con perfiles citando fuentes públicas."
    },
    pl: {
      title: "Organizacje — Civil Resistance Skills",
      description:
        "Zestawienie organizacji, których działalność w zakresie obywatelskiego oporu bez przemocy została odnotowana w źródłach publicznych. Profile opisują udokumentowaną działalność i podają źródła.",
      ogDescription:
        "Zestawienie organizacji z profilami cytującymi źródła publiczne."
    }
  },
  communication: {
    en: {
      title: "Communication Domain — Civil Resistance Skills",
      description:
        "Communication, symbols, media, and public narrative methods in the Civil Resistance Skills research atlas.",
      ogDescription:
        "Applied communication skills and indexed communication methods for civil-resistance research and simulation."
    },
    ru: {
      title: "Раздел коммуникации — Civil Resistance Skills",
      description:
        "Коммуникация, символы, медиа и общественные нарративы в исследовательском атласе Civil Resistance Skills.",
      ogDescription:
        "Прикладные коммуникационные навыки и методы из реестра — для исследований и симуляций гражданского сопротивления."
    },
    es: {
      title: "Sección de comunicación — Civil Resistance Skills",
      description:
        "Comunicación, símbolos, medios y narrativa pública en el atlas de investigación Civil Resistance Skills.",
      ogDescription:
        "Habilidades aplicadas de comunicación y métodos indexados para investigación y simulación de resistencia civil."
    },
    pl: {
      title: "Sekcja komunikacji — Civil Resistance Skills",
      description:
        "Komunikacja, symbole, media i narracje publiczne w atlasie badawczym Civil Resistance Skills.",
      ogDescription:
        "Praktyczne materiały komunikacyjne i zindeksowane metody do badań oraz symulacji obywatelskiego oporu bez przemocy."
    }
  }
} as const;

export function pathFor(path: string) {
  return `${basePath}${path === "/" ? "/" : path}`;
}

export function absoluteUrl(path: string) {
  return `${siteUrl}${path === "/" ? "/" : path}`;
}
