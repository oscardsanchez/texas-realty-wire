import Link from "next/link";
import { NotaMeta } from "@/lib/mdx";
import { CIUDADES, SECCIONES } from "@/lib/taxonomy";
import { FuenteBadge } from "@/components/ui/FuenteBadge";
import { formatFecha } from "@/lib/format";
import { cn } from "@/lib/cn";

export function NotaCard({ nota, destacada = false }: { nota: NotaMeta; destacada?: boolean }) {
  const seccion = SECCIONES[nota.seccion];

  return (
    <Link
      href={`/notas/${nota.slug}`}
      className={cn(
        "group flex flex-col border-b border-line pb-6",
        destacada && "border-b-0 pb-0"
      )}
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="eyebrow">{seccion?.nombre ?? nota.seccion}</span>
        <span className="text-line">·</span>
        <span className="font-mono text-[11px] text-ink-soft/70">
          {CIUDADES[nota.ciudad] ?? nota.ciudad}
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
        <FuenteBadge fuenteSlug={nota.fuente_principal} />
        <span className="text-xs text-ink-soft/60">
          {formatFecha(nota.fecha_publicacion)} · {nota.readingMinutes} min de lectura
        </span>
      </div>
    </Link>
  );
}
