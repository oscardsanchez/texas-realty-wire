export const LANGS = ["en", "es"] as const;
export type Lang = (typeof LANGS)[number];

/** Idioma cuando el navegador no declara ninguno de los dos. */
export const DEFAULT_LANG: Lang = "en";
export const LANG_COOKIE = "lang";

export function isLang(value: unknown): value is Lang {
  return value === "en" || value === "es";
}

/**
 * Elige el idioma a partir del header Accept-Language (idioma del navegador/dispositivo).
 * Gana el de mayor prioridad (q) entre en y es; si no hay ninguno de los dos, inglés.
 */
export function pickLangFromHeader(header: string | null | undefined): Lang {
  if (!header) return DEFAULT_LANG;

  const candidates = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      return {
        base: tag.trim().toLowerCase().split("-")[0],
        q: qParam ? parseFloat(qParam.slice(2)) : 1,
      };
    })
    .filter((c) => (c.base === "en" || c.base === "es") && !Number.isNaN(c.q) && c.q > 0)
    .sort((a, b) => b.q - a.q);

  return (candidates[0]?.base as Lang | undefined) ?? DEFAULT_LANG;
}

/** Ruta con prefijo de idioma: withLang("en", "/notas") → "/en/notas"; withLang("es") → "/es". */
export function withLang(lang: Lang, path = "/"): string {
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

const es = {
  htmlLocale: "es-MX",
  ogLocale: "es_MX",
  siteTitle: "Texas Realty Wire — Inteligencia inmobiliaria para Texas",
  siteDescription:
    "Noticias, datos y análisis del ecosistema inmobiliario de Texas para realtors, brokers y actores del sector — no para compradores finales.",
  tagline: "Inteligencia inmobiliaria para Texas",
  allNotes: "Todas las notas",
  home: "Inicio",
  indicatorsHistory: "Historial de indicadores",
  langLabel: "Idioma",

  lead: "Al frente",
  latest: "Últimas notas",
  sixSections: "Las seis secciones",

  notesCount: (n: number, filtered: boolean) =>
    `${n} nota${n === 1 ? "" : "s"}${filtered ? " que coinciden con tu filtro" : ""}.`,
  notesIndexDescription: "Filtra la cobertura de Texas Realty Wire por sección, ciudad y fuente.",
  noMatch: "No hay notas que coincidan con este filtro todavía.",

  filterSection: "Sección",
  filterCity: "Ciudad",
  filterSource: "Fuente",
  filterAll: "Todas",

  sectionEyebrow: "Sección",
  mainSource: "Fuente principal",
  emptySection: "Aún no hay notas publicadas en esta sección.",
  cityEyebrow: "Ciudad",
  cityTitle: (n: string) => `Cobertura en ${n}`,
  cityDescription: (n: string) => `Notas de Texas Realty Wire sobre ${n}.`,
  emptyCity: (n: string) => `Aún no hay notas publicadas sobre ${n}.`,

  indicatorsTitle: "Historial de indicadores",
  indicatorsDescription:
    "Todos los cortes mensuales de precio medio, inventario y días en mercado en Texas, para consulta y comparación.",
  indicatorsIntro:
    "Cada corte mensual queda archivado aquí — no se sobreescribe con la actualización siguiente, para poder comparar periodo contra periodo.",
  indicatorsEmpty: "Todavía no hay cortes archivados.",
  mostRecent: "Más reciente",
  source: "Fuente",
  widgetTitle: "Indicadores de mercado",
  widgetHistory: "Historial",

  minRead: "min de lectura",
  primaryData: "Dato primario",
  newsCoverage: "Cobertura periodística",
  citationBefore: "Esta nota sintetiza y cita datos de ",
  citationAfter:
    ". No reproducimos tablas o cifras completas de la fuente original — consulta el reporte directamente para el detalle completo.",
  viewOriginal: "Ver el reporte / artículo original →",
  keepReading: "Sigue leyendo",
  ctaTitle: "Recibe el pulso del mercado texano",
  ctaSubtitle: "Notas nuevas de las seis secciones, directo a tu correo.",
  ctaButton: "Ver todas las notas",
  spanishOnlyNotice: "Este artículo solo está disponible en español.",
  spanishOnlyTag: "ES",

  footerDescription:
    "Noticias e inteligencia de mercado para realtors, brokers y actores del sector inmobiliario de Texas. No es asesoría financiera ni de inversión.",
  footerSources: "Fuentes que citamos",
  footerNav: "Navegación",
  footerLegal:
    "Toda cifra de mercado se sintetiza y atribuye a su fuente original; no reproducimos tablas completas de terceros.",
};

type Dict = typeof es;

const en: Dict = {
  htmlLocale: "en-US",
  ogLocale: "en_US",
  siteTitle: "Texas Realty Wire — Real estate intelligence for Texas",
  siteDescription:
    "News, data and analysis on the Texas real estate ecosystem for realtors, brokers and industry professionals — not for end buyers.",
  tagline: "Real estate intelligence for Texas",
  allNotes: "All articles",
  home: "Home",
  indicatorsHistory: "Indicator history",
  langLabel: "Language",

  lead: "Lead story",
  latest: "Latest articles",
  sixSections: "The six sections",

  notesCount: (n, filtered) =>
    `${n} article${n === 1 ? "" : "s"}${filtered ? " matching your filter" : ""}.`,
  notesIndexDescription: "Filter Texas Realty Wire coverage by section, city and source.",
  noMatch: "No articles match this filter yet.",

  filterSection: "Section",
  filterCity: "City",
  filterSource: "Source",
  filterAll: "All",

  sectionEyebrow: "Section",
  mainSource: "Main source",
  emptySection: "No articles have been published in this section yet.",
  cityEyebrow: "City",
  cityTitle: (n) => `Coverage in ${n}`,
  cityDescription: (n) => `Texas Realty Wire articles about ${n}.`,
  emptyCity: (n) => `No articles have been published about ${n} yet.`,

  indicatorsTitle: "Indicator history",
  indicatorsDescription:
    "Every monthly snapshot of median price, inventory and days on market in Texas, for reference and comparison.",
  indicatorsIntro:
    "Each monthly snapshot is archived here — it is never overwritten by the next update, so you can compare period against period.",
  indicatorsEmpty: "No snapshots have been archived yet.",
  mostRecent: "Most recent",
  source: "Source",
  widgetTitle: "Market indicators",
  widgetHistory: "History",

  minRead: "min read",
  primaryData: "Primary data",
  newsCoverage: "News coverage",
  citationBefore: "This article summarizes and cites data from ",
  citationAfter:
    ". We do not reproduce complete tables or figures from the original source — consult the report directly for full detail.",
  viewOriginal: "View the original report / article →",
  keepReading: "Keep reading",
  ctaTitle: "Get the pulse of the Texas market",
  ctaSubtitle: "New articles from all six sections, straight to your inbox.",
  ctaButton: "See all articles",
  spanishOnlyNotice: "This article is available in Spanish only. Read it in Spanish below.",
  spanishOnlyTag: "ES",

  footerDescription:
    "News and market intelligence for realtors, brokers and professionals in the Texas real estate industry. Not financial or investment advice.",
  footerSources: "Sources we cite",
  footerNav: "Navigation",
  footerLegal:
    "Every market figure is summarized and attributed to its original source; we do not reproduce third-party tables in full.",
};

const DICTS: Record<Lang, Dict> = { es, en };

export function getDict(lang: Lang): Dict {
  return DICTS[lang];
}
