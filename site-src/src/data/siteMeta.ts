export const basePath = "/civil-resistance-skills";
export const repoUrl = "https://github.com/levnikolaevich/civil-resistance-skills";
export const siteUrl = "https://levnikolaevich.github.io/civil-resistance-skills";

export const languages = ["en", "es", "ru"] as const;
export type Language = (typeof languages)[number];

export const langNames: Record<Language, string> = {
  en: "English",
  es: "Español",
  ru: "Русский"
};

export const localizedPaths = {
  home: {
    en: "/",
    ru: "/ru/",
    es: "/es/"
  },
  communication: {
    en: "/domains/communication/",
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
        "Исследовательский атлас для изучения, симуляции и аккуратной подготовки методов гражданского сопротивления с AI-агентами.",
      ogDescription:
        "Навыки по методам гражданского сопротивления для Claude, Codex, образования и симуляции."
    },
    es: {
      title: "Civil Resistance Skills - atlas de investigación",
      description:
        "Un atlas de investigación con fuentes para estudiar, simular y preparar con cuidado métodos de resistencia civil con agentes de IA.",
      ogDescription:
        "Habilidades sobre métodos de resistencia civil para Claude, Codex, educación y simulación."
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
    }
  }
} as const;

export function pathFor(path: string) {
  return `${basePath}${path === "/" ? "/" : path}`;
}

export function absoluteUrl(path: string) {
  return `${siteUrl}${path === "/" ? "/" : path}`;
}
