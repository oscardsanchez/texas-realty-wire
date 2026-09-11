import fs from "fs";
import path from "path";

const INDICADORES_DIR = path.join(process.cwd(), "data", "indicadores");

export interface Indicador {
  etiqueta: string;
  valor: string;
  variacion: string;
  tendencia: "up" | "down";
}

export interface IndicadoresSnapshot {
  periodoSlug: string; // YYYY-MM, derivado del nombre de archivo
  periodo: string;
  actualizado: string;
  fuente_nombre: string;
  fuente_url: string;
  indicadores: Indicador[];
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
