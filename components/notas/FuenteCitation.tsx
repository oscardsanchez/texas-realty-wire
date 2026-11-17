import { FUENTES } from "@/lib/taxonomy";
import { getDict, type Lang } from "@/lib/i18n";

export function FuenteCitation({
  fuenteSlug,
  fuenteUrl,
  lang,
}: {
  fuenteSlug: string;
  fuenteUrl: string;
  lang: Lang;
}) {
  const t = getDict(lang);
  const fuente = FUENTES[fuenteSlug];
  if (!fuente) return null;

  const esPrimaria = fuente.tipo === "primaria";

  return (
    <div className="mt-10 border-l-2 border-accent bg-paper-dim/60 p-5">
      <p className="eyebrow mb-2">{esPrimaria ? t.primaryData : t.newsCoverage}</p>
      <p className="text-sm text-ink-soft">
        {t.citationBefore}
        <strong className="text-ink">{fuente.nombre}</strong>
        {t.citationAfter}
      </p>
      <a
        href={fuenteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-sm font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
      >
        {t.viewOriginal}
      </a>
    </div>
  );
}
