import type { Metadata } from "next";
import { filtrarNotas, getAllNotas } from "@/lib/mdx";
import { NotaCard } from "@/components/notas/NotaCard";
import { FiltroBar } from "@/components/notas/FiltroBar";

export const metadata: Metadata = {
  title: "Todas las notas",
  description: "Filtra la cobertura de Texas Realty Wire por sección, ciudad y fuente.",
};

export default function NotasIndexPage({
  searchParams,
}: {
  searchParams: { seccion?: string; ciudad?: string; fuente?: string };
}) {
  const todas = getAllNotas();
  const notas = filtrarNotas(todas, searchParams);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="font-serif text-3xl font-bold text-ink">Todas las notas</h1>
      <p className="mt-1 text-ink-soft">
        {notas.length} nota{notas.length === 1 ? "" : "s"}
        {searchParams.seccion || searchParams.ciudad || searchParams.fuente
          ? " que coinciden con tu filtro"
          : ""}
        .
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[260px_1fr]">
        <FiltroBar {...searchParams} />

        <div className="grid gap-8 sm:grid-cols-2">
          {notas.length > 0 ? (
            notas.map((nota) => <NotaCard key={nota.slug} nota={nota} />)
          ) : (
            <p className="text-ink-soft sm:col-span-2">
              No hay notas que coincidan con este filtro todavía.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
