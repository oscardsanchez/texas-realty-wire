import Link from "next/link";
import { cn } from "@/lib/cn";
import { FUENTE_LIST } from "@/lib/taxonomy";
import { getCiudadList, getSeccionList } from "@/lib/taxonomy-i18n";
import { getDict, withLang, type Lang } from "@/lib/i18n";

interface FiltroParams {
  seccion?: string;
  ciudad?: string;
  fuente?: string;
}

interface FiltroBarProps extends FiltroParams {
  lang: Lang;
}

type Dimension = keyof FiltroParams;

function buildHref(lang: Lang, params: FiltroParams) {
  const search = new URLSearchParams();
  if (params.seccion) search.set("seccion", params.seccion);
  if (params.ciudad) search.set("ciudad", params.ciudad);
  if (params.fuente) search.set("fuente", params.fuente);
  const qs = search.toString();
  const base = withLang(lang, "/notas");
  return qs ? `${base}?${qs}` : base;
}

function FiltroGrupo({
  lang,
  titulo,
  dimension,
  todas,
  activo,
  opciones,
  active,
}: {
  lang: Lang;
  titulo: string;
  dimension: Dimension;
  todas: string;
  activo?: string;
  opciones: { slug: string; nombre: string }[];
  active: FiltroParams;
}) {
  return (
    <div>
      <p className="eyebrow mb-2">{titulo}</p>
      <div className="flex flex-wrap gap-1.5">
        <Link
          href={buildHref(lang, { ...active, [dimension]: undefined })}
          className={cn(
            "rounded-sm border px-2.5 py-1 text-xs font-medium transition-colors",
            !activo ? "border-accent bg-accent text-paper" : "border-line text-ink-soft hover:border-accent/40"
          )}
        >
          {todas}
        </Link>
        {opciones.map((op) => (
          <Link
            key={op.slug}
            href={buildHref(lang, { ...active, [dimension]: op.slug })}
            className={cn(
              "rounded-sm border px-2.5 py-1 text-xs font-medium transition-colors",
              activo === op.slug
                ? "border-accent bg-accent text-paper"
                : "border-line text-ink-soft hover:border-accent/40"
            )}
          >
            {op.nombre}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function FiltroBar({ lang, seccion, ciudad, fuente }: FiltroBarProps) {
  const t = getDict(lang);
  const active = { seccion, ciudad, fuente };

  return (
    <div className="space-y-4 border border-line bg-paper-dim/40 p-4">
      <FiltroGrupo
        lang={lang}
        titulo={t.filterSection}
        dimension="seccion"
        todas={t.filterAll}
        activo={seccion}
        active={active}
        opciones={getSeccionList(lang).map((s) => ({ slug: s.slug, nombre: s.nombre }))}
      />
      <FiltroGrupo
        lang={lang}
        titulo={t.filterCity}
        dimension="ciudad"
        todas={t.filterAll}
        activo={ciudad}
        active={active}
        opciones={getCiudadList(lang)}
      />
      <FiltroGrupo
        lang={lang}
        titulo={t.filterSource}
        dimension="fuente"
        todas={t.filterAll}
        activo={fuente}
        active={active}
        opciones={FUENTE_LIST.map((f) => ({ slug: f.slug, nombre: f.nombre }))}
      />
    </div>
  );
}
