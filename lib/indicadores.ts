import fs from "fs";
import path from "path";
import type { Lang } from "./i18n";

const INDICADORES_DIR = path.join(process.cwd(), "data", "indicadores");

export interface Indicador {
  etiqueta: string;
  valor: string;
  variacion: string;
  tendencia: "up" | "down";
}

/** Traducción opcional de un snapshot (bloque `en` dentro del JSON). Sin `en`, se muestra en español. */
export interface IndicadoresSnapshotEn {
  periodo: string;
  fuente_nombre?: string;
  indicadores: Pick<Indicador, "etiqueta" | "valor" | "variacion">[];
}

export interface IndicadoresSnapshot {
  periodoSlug: string; // YYYY-MM, derivado del nombre de archivo
  periodo: string;
  actualizado: string;
  fuente_nombre: string;
  fuente_url: string;
  indicadores: Indicador[];
  en?: IndicadoresSnapshotEn;
}

/** Devuelve el snapshot en el idioma pedido; si no tiene traducción, el original en español. */
export function localizeSnapshot(s: IndicadoresSnapshot, lang: Lang): IndicadoresSnapshot {
  if (lang !== "en" || !s.en) return s;
  return {
    ...s,
    periodo: s.en.periodo,
    fuente_nombre: s.en.fuente_nombre ?? s.fuente_nombre,
    indicadores: s.indicadores.map((ind, i) => ({ ...ind, ...(s.en!.indicadores[i] ?? {}) })),
  };
}

export function getIndicadoresHistorial(): IndicadoresSnapshot[] {
  if (!fs.existsSync(INDICADORES_DIR)) return [];

  return fs
    .readdirSync(INDICADORES_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(INDICADORES_DIR, f), "utf8");
      const data = JSON.parse(raw) as Omit<IndicadoresSnapshot, "periodoSlug">;
      return { ...data, periodoSlug: f.replace(/\.json$/, "") };
    })
    .sort((a, b) => (a.periodoSlug < b.periodoSlug ? 1 : -1));
}

export function getIndicadoresActuales(): IndicadoresSnapshot | null {
  return getIndicadoresHistorial()[0] ?? null;
}
