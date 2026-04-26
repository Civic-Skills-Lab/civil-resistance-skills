export const basePath = "/civil-resistance-skills";
export const repoUrl = "https://github.com/levnikolaevich/civil-resistance-skills";
export const siteUrl = "https://levnikolaevich.github.io/civil-resistance-skills";

export const languages = ["en", "ru", "es"] as const;
export type Language = (typeof languages)[number];

export const langNames: Record<Language, string> = {
  en: "EN",
  ru: "RU",
  es: "ES"
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
      title: "Civil Resistance Skills - Civic Research Atlas",
      description:
        "A research-grade skill registry for studying, simulating, and carefully preparing civil-resistance methods with AI agents.",
      ogDescription:
        "Research-grade civil-resistance method skills for Claude, Codex, education, and simulation."
    },
    ru: {
      title: "Civil Resistance Skills - исследовательский атлас",
      description:
        "Исследовательский реестр навыков для изучения, симуляции и аккуратной подготовки методов гражданского сопротивления с AI-агентами.",
      ogDescription:
        "Исследовательские навыки по методам гражданского сопротивления для Claude, Codex, образования и симуляции."
    },
    es: {
      title: "Civil Resistance Skills - atlas de investigación cívica",
      description:
        "Un registro de habilidades de nivel investigativo para estudiar, simular y preparar con cuidado métodos de resistencia civil con agentes de IA.",
      ogDescription:
        "Habilidades de métodos de resistencia civil para Claude, Codex, educación y simulación."
    }
  },
  communication: {
    en: {
      title: "Communication Domain - Civil Resistance Skills",
      description:
        "Communication, symbols, media, and public narrative skills in the Civil Resistance Skills research atlas.",
      ogDescription:
        "Operational communication skills and indexed communication methods for civil-resistance research and simulation."
    },
    ru: {
      title: "Домен коммуникации - Civil Resistance Skills",
      description:
        "Коммуникация, символы, медиа и публичный нарратив в исследовательском атласе Civil Resistance Skills.",
      ogDescription:
        "Операционные коммуникационные навыки и индексированные методы коммуникации для исследования и симуляции гражданского сопротивления."
    },
    es: {
      title: "Dominio de comunicación - Civil Resistance Skills",
      description:
        "Comunicación, símbolos, medios y narrativa pública en el atlas de investigación Civil Resistance Skills.",
      ogDescription:
        "Habilidades operativas de comunicación y métodos de comunicación indexados para investigación y simulación de resistencia civil."
    }
  }
} as const;

export function pathFor(path: string) {
  return `${basePath}${path === "/" ? "/" : path}`;
}

export function absoluteUrl(path: string) {
  return `${siteUrl}${path === "/" ? "/" : path}`;
}
