import type { Metadata } from "next";
import type { Lang } from "./i18n";
import { withLang } from "./i18n";

/**
 * Canonical + hreflang para una ruta (sin prefijo de idioma). Si la página en inglés no tiene
 * traducción (`soloEs`), su canonical apunta a la versión en español para no duplicar contenido.
 */
export function buildAlternates(lang: Lang, path: string, opts: { soloEs?: boolean } = {}): Metadata["alternates"] {
  const es = withLang("es", path);
  const en = withLang("en", path);

  if (opts.soloEs) {
    return { canonical: es, languages: { es, "x-default": es } };
  }
  return { canonical: lang === "en" ? en : es, languages: { en, es, "x-default": en } };
}
