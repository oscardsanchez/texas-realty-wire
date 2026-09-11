import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SECCION_LIST } from "@/lib/taxonomy";

export function SectionGrid() {
  return (
    <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {SECCION_LIST.map((seccion) => (
        <Link
          key={seccion.slug}
          href={`/seccion/${seccion.slug}`}
          className="group flex flex-col justify-between bg-paper p-5 transition-colors hover:bg-paper-dim"
        >
          <div>
            <h3 className="font-serif text-lg font-semibold text-ink group-hover:text-accent">
              {seccion.nombre}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{seccion.descripcion}</p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wide text-ink-soft/60">
              {seccion.fuentePrincipal}
            </span>
            <ArrowRight className="h-4 w-4 text-ink-soft/40 transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
          </div>
        </Link>
      ))}
    </div>
  );
}
