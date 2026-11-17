import type { Metadata } from "next";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { getIndicadoresHistorial, localizeSnapshot } from "@/lib/indicadores";
import { getSeccion } from "@/lib/taxonomy-i18n";
import { getDict } from "@/lib/i18n";
import { parseLang } from "@/lib/lang-param";
import { buildAlternates } from "@/lib/alternates";
import { cn } from "@/lib/cn";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = parseLang(params.lang);
  const t = getDict(lang);
  return {
    title: t.indicatorsTitle,
    description: t.indicatorsDescription,
    alternates: buildAlternates(lang, "/indicadores"),
  };
}

export default function IndicadoresHistorialPage({ params }: { params: { lang: string } }) {
  const lang = parseLang(params.lang);
  const t = getDict(lang);
  const historial = getIndicadoresHistorial().map((snap) => localizeSnapshot(snap, lang));

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <p className="eyebrow mb-2">{getSeccion(lang, "pulso-del-mercado")?.nombre}</p>
      <h1 className="font-serif text-3xl font-bold text-ink">{t.indicatorsTitle}</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">
        {t.indicatorsIntro}
      </p>

      <div className="mt-8 space-y-6">
        {historial.length === 0 && (
          <p className="text-ink-soft">{t.indicatorsEmpty}</p>
        )}
        {historial.map((snapshot, i) => (
          <div key={snapshot.periodoSlug} className="border border-line">
            <div className="flex items-center justify-between border-b border-line bg-paper-dim/50 px-4 py-2.5">
              <p className="font-serif font-semibold text-ink">{snapshot.periodo}</p>
              {i === 0 && (
                <span className="rounded-sm bg-accent px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-paper">
                  {t.mostRecent}
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
                {t.source}: {snapshot.fuente_nombre} →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
