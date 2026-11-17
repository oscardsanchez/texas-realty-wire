import type { MetadataRoute } from "next";
import { getAllNotas } from "@/lib/mdx";
import { CIUDADES, SECCIONES } from "@/lib/taxonomy";
import { LANGS, withLang } from "@/lib/i18n";

const SITE_URL = "https://texasrealtywire.com";

type Entry = MetadataRoute.Sitemap[number];

/** Una entrada por idioma, cada una apuntando a su par con hreflang. */
function bilingual(path: string, lastModified?: string): Entry[] {
  const languages = Object.fromEntries(LANGS.map((l) => [l, `${SITE_URL}${withLang(l, path)}`]));
  return LANGS.map((l) => ({
    url: `${SITE_URL}${withLang(l, path)}`,
    ...(lastModified ? { lastModified } : {}),
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const notaEntries = getAllNotas().flatMap((nota): Entry[] =>
    nota.hasEn
      ? bilingual(`/notas/${nota.slug}`, nota.fecha_publicacion)
      : // Sin traducción: solo la URL en español (la de /en tiene canonical a /es).
        [{ url: `${SITE_URL}${withLang("es", `/notas/${nota.slug}`)}`, lastModified: nota.fecha_publicacion }]
  );

  return [
    ...bilingual("/"),
    ...bilingual("/notas"),
    ...bilingual("/indicadores"),
    ...Object.keys(SECCIONES).flatMap((slug) => bilingual(`/seccion/${slug}`)),
    ...Object.keys(CIUDADES).flatMap((slug) => bilingual(`/ciudad/${slug}`)),
    ...notaEntries,
  ];
}
