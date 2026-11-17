import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { CiudadSlug, SeccionSlug } from "./taxonomy";
import type { Lang } from "./i18n";

const CONTENT_DIR = path.join(process.cwd(), "content", "notas");
/**
 * Traducciones al inglés: content/notas-en/<mismo-slug>.mdx. El frontmatter en inglés solo
 * necesita `title` y `resumen`; sección, ciudad, fuente y fecha se heredan del archivo en español.
 */
const EN_DIR = path.join(process.cwd(), "content", "notas-en");

export interface NotaFrontmatter {
  title: string;
  seccion: SeccionSlug;
  ciudad: CiudadSlug;
  fuente_principal: string;
  fuente_url: string;
  fecha_publicacion: string;
  resumen: string;
}

export interface NotaMeta extends NotaFrontmatter {
  slug: string;
  readingMinutes: number;
  /** Idioma del contenido que se está mostrando. */
  contentLang: Lang;
  /** Existe versión en inglés de esta nota. */
  hasEn: boolean;
}

export interface Nota extends NotaMeta {
  content: string;
}

function readNotaFile(fileName: string, lang: Lang): Nota {
  const slug = fileName.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as NotaFrontmatter;

  const enPath = path.join(EN_DIR, fileName);
  const hasEn = fs.existsSync(enPath);

  if (lang === "en" && hasEn) {
    const en = matter(fs.readFileSync(enPath, "utf8"));
    const enData = en.data as Partial<Pick<NotaFrontmatter, "title" | "resumen">>;
    return {
      ...frontmatter,
      title: enData.title ?? frontmatter.title,
      resumen: enData.resumen ?? frontmatter.resumen,
      slug,
      content: en.content,
      readingMinutes: Math.max(1, Math.round(readingTime(en.content).minutes)),
      contentLang: "en",
      hasEn,
    };
  }

  return {
    ...frontmatter,
    slug,
    content,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    contentLang: "es",
    hasEn,
  };
}

export function getAllNotas(lang: Lang = "es"): Nota[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => readNotaFile(f, lang))
    .sort((a, b) => (a.fecha_publicacion < b.fecha_publicacion ? 1 : -1));
}

export function getNotaBySlug(slug: string, lang: Lang = "es"): Nota | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return readNotaFile(`${slug}.mdx`, lang);
}

export interface NotaFiltros {
  seccion?: string;
  ciudad?: string;
  fuente?: string;
}

export function filtrarNotas(notas: Nota[], filtros: NotaFiltros): Nota[] {
  return notas.filter((nota) => {
    if (filtros.seccion && nota.seccion !== filtros.seccion) return false;
    if (filtros.ciudad && nota.ciudad !== filtros.ciudad) return false;
    if (filtros.fuente && nota.fuente_principal !== filtros.fuente) return false;
    return true;
  });
}
