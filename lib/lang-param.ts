import { notFound } from "next/navigation";
import { isLang, type Lang } from "./i18n";

/** Valida el segmento [lang] de la URL; cualquier otro valor es 404. */
export function parseLang(value: string): Lang {
  if (!isLang(value)) notFound();
  return value;
}
