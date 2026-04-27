export const basePath = "/civil-resistance-skills";
export const repoUrl = "https://github.com/levnikolaevich/civil-resistance-skills";
export const siteUrl = "https://levnikolaevich.github.io/civil-resistance-skills";
export const siteName = "Civil Resistance Skills";
export const themeColor = "#245d8f";

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
  readme: `${repoUrl}/blob/main/README.md`,
  safety: `${repoUrl}/blob/main/SAFETY.md`,
  registry: `${repoUrl}/tree/main/methods-registry`,
  taxonomy: `${repoUrl}/blob/main/methods-registry/00-naming-and-taxonomy.md`,
  sources: `${repoUrl}/blob/main/methods-registry/03-sources-and-references.md`,
  skillsCatalog: `${repoUrl}/tree/main/skills-catalog`,
  claudeMarketplace: `${repoUrl}/blob/main/.claude-plugin/marketplace.json`,
  codexMarketplace: `${repoUrl}/blob/main/.agents/plugins/marketplace.json`
} as const;

export const localizedPaths = {
  home: {
    en: "/",
    pl: "/pl/",
    ru: "/ru/",
    es: "/es/"
  },
  communication: {
    en: "/domains/communication/",
    pl: "/pl/domains/communication/",
    ru: "/ru/domains/communication/",
    es: "/es/domains/communication/"
  }
} as const;

export const pageMeta = {
  home: {
    en: {
      title: "Civil Resistance Skills - Research Atlas",
      description:
        "A source-linked research atlas for studying, simulating, and carefully preparing civil-resistance methods with AI agents.",
      ogDescription:
        "Civil-resistance method skills for Claude, Codex, education, and simulation."
    },
    ru: {
      title: "Civil Resistance Skills - исследовательский атлас",
      description:
        "Исследовательский атлас для изучения, симуляции и аккуратной подготовки методов гражданского сопротивления с агентами ИИ.",
      ogDescription:
        "Материалы по методам гражданского сопротивления для Claude, Codex, образования и симуляции."
    },
    es: {
      title: "Civil Resistance Skills - atlas de investigación",
      description:
        "Un atlas de investigación con fuentes para estudiar, simular y preparar con cuidado métodos de resistencia civil con agentes de IA.",
      ogDescription:
        "Habilidades sobre métodos de resistencia civil para Claude, Codex, educación y simulación."
    },
    pl: {
      title: "Civil Resistance Skills - atlas badawczy",
      description:
        "Atlas badawczy ze źródłami do studiowania, symulowania i ostrożnego przygotowywania metod obywatelskiego oporu bez przemocy z agentami AI.",
      ogDescription:
        "Materiały dotyczące metod obywatelskiego oporu bez przemocy dla Claude, Codex, edukacji i symulacji."
    }
  },
  communication: {
    en: {
      title: "Communication Domain - Civil Resistance Skills",
      description:
        "Communication, symbols, media, and public narrative methods in the Civil Resistance Skills research atlas.",
      ogDescription:
        "Applied communication skills and indexed communication methods for civil-resistance research and simulation."
    },
    ru: {
      title: "Домен коммуникации - Civil Resistance Skills",
      description:
        "Коммуникация, символы, медиа и публичный нарратив в исследовательском атласе Civil Resistance Skills.",
      ogDescription:
        "Прикладные коммуникационные навыки и методы из реестра для исследования и симуляции гражданского сопротивления."
    },
    es: {
      title: "Dominio de comunicación - Civil Resistance Skills",
      description:
        "Comunicación, símbolos, medios y narrativa pública en el atlas de investigación Civil Resistance Skills.",
      ogDescription:
        "Habilidades aplicadas de comunicación y métodos indexados para investigación y simulación de resistencia civil."
    },
    pl: {
      title: "Domena komunikacji - Civil Resistance Skills",
      description:
        "Komunikacja, symbole, media i narracja publiczna w atlasie badawczym Civil Resistance Skills.",
      ogDescription:
        "Stosowane umiejętności komunikacyjne i zindeksowane metody do badań oraz symulacji oporu obywatelskiego."
    }
  }
} as const;

export function pathFor(path: string) {
  return `${basePath}${path === "/" ? "/" : path}`;
}

export function absoluteUrl(path: string) {
  return `${siteUrl}${path === "/" ? "/" : path}`;
}
