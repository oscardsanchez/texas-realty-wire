import Link from "next/link";
import { NotaMeta } from "@/lib/mdx";
import { getCiudadNombre, getSeccion } from "@/lib/taxonomy-i18n";
import { getDict, withLang, type Lang } from "@/lib/i18n";
import { FuenteBadge } from "@/components/ui/FuenteBadge";
import { formatFecha } from "@/lib/format";
import { cn } from "@/lib/cn";

export function NotaCard({
  nota,
  lang,
  destacada = false,
}: {
  nota: NotaMeta;
  lang: Lang;
  destacada?: boolean;
}) {
  const t = getDict(lang);
  const seccion = getSeccion(lang, nota.seccion);
  const soloEs = lang === "en" && nota.contentLang === "es";

  return (
    <Link
      href={withLang(lang, `/notas/${nota.slug}`)}
      className={cn(
        "group flex flex-col border-b border-line pb-6",
        destacada && "border-b-0 pb-0"
      )}
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="eyebrow">{seccion?.nombre ?? nota.seccion}</span>
        <span className="text-line">·</span>
        <span className="font-mono text-[11px] text-ink-soft/70">
          {getCiudadNombre(lang, nota.ciudad) ?? nota.ciudad}
        </span>
      </div>
      <h3
        className={cn(
          "font-serif font-semibold leading-snug text-ink transition-colors group-hover:text-accent",
          destacada ? "text-3xl sm:text-4xl" : "text-xl"
        )}
      >
        {nota.title}
      </h3>
      <p className={cn("mt-2 text-ink-soft", destacada ? "max-w-2xl text-base" : "text-sm")}>
        {nota.resumen}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <FuenteBadge fuenteSlug={nota.fuente_principal} lang={lang} />
        <span className="text-xs text-ink-soft/60">
          {formatFecha(nota.fecha_publicacion, lang)} · {nota.readingMinutes} {t.minRead}
        </span>
        {soloEs && (
          <span
            className="rounded-sm border border-line px-1.5 py-0.5 font-mono text-[10px] font-semibold text-ink-soft/70"
            title={t.spanishOnlyNotice}
          >
            {t.spanishOnlyTag}
          </span>
        )}
      </div>
    </Link>
  );
}
