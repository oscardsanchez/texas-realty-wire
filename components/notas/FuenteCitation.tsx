import { FUENTES } from "@/lib/taxonomy";

export function FuenteCitation({
  fuenteSlug,
  fuenteUrl,
}: {
  fuenteSlug: string;
  fuenteUrl: string;
}) {
  const fuente = FUENTES[fuenteSlug];
  if (!fuente) return null;

  const esPrimaria = fuente.tipo === "primaria";

  return (
    <div className="mt-10 border-l-2 border-accent bg-paper-dim/60 p-5">
      <p className="eyebrow mb-2">{esPrimaria ? "Dato primario" : "Cobertura periodística"}</p>
      <p className="text-sm text-ink-soft">
        Esta nota sintetiza y cita datos de <strong className="text-ink">{fuente.nombre}</strong>.
        No reproducimos tablas o cifras completas de la fuente original — consulta el reporte
        directamente para el detalle completo.
      </p>
      <a
        href={fuenteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-sm font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
      >
        Ver el reporte / artículo original →
      </a>
    </div>
  );
}
