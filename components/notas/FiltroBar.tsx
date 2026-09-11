import Link from "next/link";
import { cn } from "@/lib/cn";
import { CIUDAD_LIST, FUENTE_LIST, SECCION_LIST } from "@/lib/taxonomy";

interface FiltroBarProps {
  seccion?: string;
  ciudad?: string;
  fuente?: string;
}

function buildHref(params: FiltroBarProps) {
  const search = new URLSearchParams();
  if (params.seccion) search.set("seccion", params.seccion);
  if (params.ciudad) search.set("ciudad", params.ciudad);
  if (params.fuente) search.set("fuente", params.fuente);
  const qs = search.toString();
  return qs ? `/notas?${qs}` : "/notas";
}

function FiltroGrupo({
  titulo,
  activo,
  opciones,
  active,
}: {
  titulo: string;
  activo?: string;
  opciones: { slug: string; nombre: string }[];
  active: FiltroBarProps;
}) {
  const dimension = titulo === "Sección" ? "seccion" : titulo === "Ciudad" ? "ciudad" : "fuente";

  return (
    <div>
      <p className="eyebrow mb-2">{titulo}</p>
      <div className="flex flex-wrap gap-1.5">
        <Link
          href={buildHref({ ...active, [dimension]: undefined })}
          className={cn(
            "rounded-sm border px-2.5 py-1 text-xs font-medium transition-colors",
            !activo ? "border-accent bg-accent text-paper" : "border-line text-ink-soft hover:border-accent/40"
          )}
        >
          Todas
        </Link>
        {opciones.map((op) => (
          <Link
            key={op.slug}
            href={buildHref({ ...active, [dimension]: op.slug })}
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

export function FiltroBar({ seccion, ciudad, fuente }: FiltroBarProps) {
  const active = { seccion, ciudad, fuente };

  return (
    <div className="space-y-4 border border-line bg-paper-dim/40 p-4">
      <FiltroGrupo
        titulo="Sección"
        activo={seccion}
        active={active}
        opciones={SECCION_LIST.map((s) => ({ slug: s.slug, nombre: s.nombre }))}
      />
      <FiltroGrupo
        titulo="Ciudad"
        activo={ciudad}
        active={active}
        opciones={CIUDAD_LIST.map((c) => ({ slug: c.slug, nombre: c.nombre }))}
      />
      <FiltroGrupo
        titulo="Fuente"
        activo={fuente}
        active={active}
        opciones={FUENTE_LIST.map((f) => ({ slug: f.slug, nombre: f.nombre }))}
      />
    </div>
  );
}
