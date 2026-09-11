import type { Metadata } from "next";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { getIndicadoresHistorial } from "@/lib/indicadores";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Historial de indicadores",
  description: "Todos los cortes mensuales de precio medio, inventario y días en mercado en Texas, para consulta y comparación.",
};

export default function IndicadoresHistorialPage() {
  const historial = getIndicadoresHistorial();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <p className="eyebrow mb-2">Pulso del Mercado</p>
      <h1 className="font-serif text-3xl font-bold text-ink">Historial de indicadores</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">
        Cada corte mensual queda archivado aquí — no se sobreescribe con la actualización
        siguiente, para poder comparar periodo contra periodo.
      </p>

      <div className="mt-8 space-y-6">
        {historial.length === 0 && (
          <p className="text-ink-soft">Todavía no hay cortes archivados.</p>
        )}
        {historial.map((snapshot, i) => (
          <div key={snapshot.periodoSlug} className="border border-line">
            <div className="flex items-center justify-between border-b border-line bg-paper-dim/50 px-4 py-2.5">
              <p className="font-serif font-semibold text-ink">{snapshot.periodo}</p>
              {i === 0 && (
                <span className="rounded-sm bg-accent px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-paper">
                  Más reciente
                </span>
              )}
            </div>
            <dl className="grid grid-cols-2 divide-x divide-y divide-line sm:grid-cols-4 sm:divide-y-0">
              {snapshot.indicadores.map((ind) => (
                <div key={ind.etiqueta} className="p-3.5">
                  <dt className="text-xs text-ink-soft">{ind.etiqueta}</dt>
                  <dd className="mt-0.5 font-serif text-lg font-semibold text-ink">{ind.valor}</dd>
                  <div
                    className={cn(
                      "mt-1 flex items-center gap-1 text-[11px] font-medium",
                      ind.tendencia === "up" ? "text-primaria" : "text-accent"
                    )}
                  >
                    {ind.tendencia === "up" ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    <span className="text-ink-soft/80">{ind.variacion}</span>
                  </div>
                </div>
              ))}
            </dl>
            <div className="border-t border-line px-4 py-2">
              <a
                href={snapshot.fuente_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-ink-soft/70 underline decoration-ink-soft/20 underline-offset-2 hover:text-accent"
              >
                Fuente: {snapshot.fuente_nombre} →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
