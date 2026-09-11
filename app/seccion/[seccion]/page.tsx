import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { filtrarNotas, getAllNotas } from "@/lib/mdx";
import { SECCIONES, SeccionSlug } from "@/lib/taxonomy";
import { NotaCard } from "@/components/notas/NotaCard";
import { FiltroBar } from "@/components/notas/FiltroBar";

export function generateStaticParams() {
  return Object.keys(SECCIONES).map((seccion) => ({ seccion }));
}

export function generateMetadata({ params }: { params: { seccion: string } }): Metadata {
  const seccion = SECCIONES[params.seccion as SeccionSlug];
  if (!seccion) return {};
  return { title: seccion.nombre, description: seccion.descripcion };
}

export default function SeccionPage({ params }: { params: { seccion: string } }) {
  const seccion = SECCIONES[params.seccion as SeccionSlug];
  if (!seccion) notFound();

  const notas = filtrarNotas(getAllNotas(), { seccion: seccion.slug });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <p className="eyebrow mb-2">Sección</p>
      <h1 className="font-serif text-3xl font-bold text-ink">{seccion.nombre}</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">{seccion.descripcion}</p>
      <p className="mt-1 text-xs uppercase tracking-wide text-ink-soft/60">
        Fuente principal: {seccion.fuentePrincipal}
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[260px_1fr]">
        <FiltroBar seccion={seccion.slug} />
        <div className="grid gap-8 sm:grid-cols-2">
          {notas.length > 0 ? (
            notas.map((nota) => <NotaCard key={nota.slug} nota={nota} />)
          ) : (
            <p className="text-ink-soft sm:col-span-2">Aún no hay notas publicadas en esta sección.</p>
          )}
        </div>
      </div>
    </div>
  );
}
