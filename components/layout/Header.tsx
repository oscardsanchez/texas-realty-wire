import Link from "next/link";
import { SECCION_LIST } from "@/lib/taxonomy";

export function Header() {
  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-serif text-xl font-bold tracking-tight text-navy sm:text-2xl">
            Texas Realty Wire
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft/70 sm:inline">
            Inteligencia inmobiliaria para Texas
          </span>
        </Link>
        <Link
          href="/notas"
          className="rounded-sm border border-navy px-3 py-1.5 text-sm font-medium text-navy transition-colors hover:bg-navy hover:text-paper"
        >
          Todas las notas
        </Link>
      </div>
      <nav className="border-t border-line bg-navy">
        <div className="mx-auto flex max-w-6xl gap-x-5 gap-y-1 overflow-x-auto px-4 py-2 text-[13px] sm:px-6">
          {SECCION_LIST.map((seccion) => (
            <Link
              key={seccion.slug}
              href={`/seccion/${seccion.slug}`}
              className="whitespace-nowrap font-medium text-paper/80 transition-colors hover:text-paper"
            >
              {seccion.nombre}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
