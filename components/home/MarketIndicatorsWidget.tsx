import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { getIndicadoresActuales } from "@/lib/indicadores";
import { cn } from "@/lib/cn";

export function MarketIndicatorsWidget() {
  const snapshot = getIndicadoresActuales();
  if (!snapshot) return null;

  const { periodo, fuente_nombre, fuente_url, indicadores } = snapshot;

  return (
    <aside className="border border-navy/15 bg-paper-dim/60">
      <div className="border-b border-navy/15 bg-navy px-4 py-3">
        <p className="eyebrow text-accent-soft">Indicadores de mercado</p>
        <p className="mt-0.5 text-xs text-paper/60">{periodo}</p>
      </div>
      <dl className="divide-y divide-navy/10">
        {indicadores.map((ind) => (
          <div key={ind.etiqueta} className="flex items-center justify-between px-4 py-3">
            <div>
              <dt className="text-xs text-ink-soft">{ind.etiqueta}</dt>
              <dd className="font-serif text-xl font-semibold text-ink">{ind.valor}</dd>
            </div>
            <div
              className={cn(
                "flex items-center gap-1 text-right text-xs font-medium",
                ind.tendencia === "up" ? "text-primaria" : "text-accent"
              )}
            >
              {ind.tendencia === "up" ? (
                <ArrowUpRight className="h-3.5 w-3.5" />
              ) : (
                <ArrowDownRight className="h-3.5 w-3.5" />
              )}
              <span className="max-w-[7.5rem] leading-tight text-ink-soft/80">{ind.variacion}</span>
            </div>
          </div>
        ))}
      </dl>
      <div className="flex items-center justify-between border-t border-navy/15 px-4 py-2.5">
        <a
          href={fuente_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-ink-soft/70 underline decoration-ink-soft/20 underline-offset-2 hover:text-accent"
        >
          Fuente: {fuente_nombre} →
        </a>
        <Link
          href="/indicadores"
          className="text-[11px] font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
        >
          Historial
        </Link>
      </div>
    </aside>
  );
}
