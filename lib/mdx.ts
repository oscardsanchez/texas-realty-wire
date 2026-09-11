import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { CiudadSlug, SeccionSlug } from "./taxonomy";

const CONTENT_DIR = path.join(process.cwd(), "content", "notas");

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
}

export interface Nota extends NotaMeta {
  content: string;
}

function readNotaFile(fileName: string): Nota {
  const slug = fileName.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as NotaFrontmatter;

  return {
    ...frontmatter,
    slug,
    content,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
  };
}

export function getAllNotas(): Nota[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(readNotaFile)
    .sort((a, b) => (a.fecha_publicacion < b.fecha_publicacion ? 1 : -1));
}

export function getNotaBySlug(slug: string): Nota | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return readNotaFile(`${slug}.mdx`);
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
