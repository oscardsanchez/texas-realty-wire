import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NotaMeta } from "@/lib/mdx";
import { getSeccion } from "@/lib/taxonomy-i18n";
import { getDict, withLang, type Lang } from "@/lib/i18n";

export function CTARelacionada({ relacionadas, lang }: { relacionadas: NotaMeta[]; lang: Lang }) {
  const t = getDict(lang);
  return (
    <div className="mt-8 border-t border-line pt-6">
      {relacionadas.length > 0 ? (
        <>
          <p className="eyebrow mb-3">{t.keepReading}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {relacionadas.map((nota) => (
              <Link
                key={nota.slug}
                href={withLang(lang, `/notas/${nota.slug}`)}
                className="group block border border-line p-4 transition-colors hover:border-accent/40 hover:bg-paper-dim/50"
              >
                <p className="text-[11px] uppercase tracking-wide text-ink-soft/60">
                  {getSeccion(lang, nota.seccion)?.nombre}
                </p>
                <p className="mt-1 flex items-start justify-between gap-2 font-serif font-semibold text-ink group-hover:text-accent">
                  {nota.title}
                  <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-ink-soft/40 group-hover:text-accent" />
                </p>
              </Link>
            ))}
          </div>
        </>
      ) : null}
      <div className="mt-6 flex items-center justify-between border border-navy bg-navy px-5 py-4">
        <div>
          <p className="font-serif text-base font-semibold text-paper">
            {t.ctaTitle}
          </p>
          <p className="mt-0.5 text-xs text-paper/60">{t.ctaSubtitle}</p>
        </div>
        <Link
          href={withLang(lang, "/notas")}
          className="whitespace-nowrap rounded-sm border border-paper/40 px-3 py-1.5 text-sm font-medium text-paper transition-colors hover:bg-paper hover:text-navy"
        >
          {t.ctaButton}
        </Link>
      </div>
    </div>
  );
}
