import { CIUDADES, SECCIONES, type CiudadSlug, type SeccionSlug } from "./taxonomy";
import type { Lang } from "./i18n";

/**
 * Nombres y descripciones visibles en inglés. Los slugs y la taxonomía canónica siguen
 * viviendo en taxonomy.ts (en español); este archivo solo traduce lo que se muestra.
 */
const SECCIONES_EN: Record<SeccionSlug, { nombre: string; descripcion: string; fuentePrincipal: string }> = {
  "pulso-del-mercado": {
    nombre: "Market Pulse",
    descripcion:
      "Prices, inventory and days on market — the monthly and quarterly read on where Texas is headed.",
    fuentePrincipal: SECCIONES["pulso-del-mercado"].fuentePrincipal,
  },
  "movimientos-corporativos": {
    nombre: "Corporate Moves",
    descripcion:
      "Acquisitions, foreclosures and luxury developments reshaping who controls the land.",
    fuentePrincipal: SECCIONES["movimientos-corporativos"].fuentePrincipal,
  },
  hiperlocal: {
    nombre: "Hyperlocal / Regional Impact",
    descripcion:
      "Median value by submarket, new communities and the city-by-city, county-by-county breakdown.",
    fuentePrincipal: SECCIONES.hiperlocal.fuentePrincipal,
  },
  "legislacion-y-politica": {
    nombre: "Legislation & Public Policy",
    descripcion:
      "Property taxes, MLS regulation and the state laws that change the rules of the game.",
    fuentePrincipal: SECCIONES["legislacion-y-politica"].fuentePrincipal,
  },
  "perfil-comprador-vendedor": {
    nombre: "Buyer/Seller Profile",
    descripcion:
      "Who is buying, who is selling and where the domestic migration that keeps filling Texas comes from.",
    fuentePrincipal: SECCIONES["perfil-comprador-vendedor"].fuentePrincipal,
  },
  "herramientas-y-data": {
    nombre: "Agent Tools & Data",
    descripcion:
      "Evergreen content: glossaries, how to read a report and practical frameworks for the agent's day-to-day work.",
    fuentePrincipal: "Our own analysis of source data",
  },
};

const CIUDADES_EN: Record<CiudadSlug, string> = {
  austin: "Austin",
  dallas: "Dallas",
  houston: "Houston",
  "san-antonio": "San Antonio",
  estatal: "Statewide",
  otra: "Other",
};

export function getSeccion(lang: Lang, slug: SeccionSlug) {
  const base = SECCIONES[slug];
  if (!base) return undefined;
  if (lang === "es") return base;
  return { ...base, ...SECCIONES_EN[slug] };
}

export function getSeccionList(lang: Lang) {
  return (Object.keys(SECCIONES) as SeccionSlug[]).map((slug) => getSeccion(lang, slug)!);
}

export function getCiudadNombre(lang: Lang, slug: string): string | undefined {
  if (!(slug in CIUDADES)) return undefined;
  return lang === "es" ? CIUDADES[slug as CiudadSlug] : CIUDADES_EN[slug as CiudadSlug];
}

export function getCiudadList(lang: Lang) {
  return (Object.keys(CIUDADES) as CiudadSlug[]).map((slug) => ({
    slug,
    nombre: getCiudadNombre(lang, slug)!,
  }));
}
