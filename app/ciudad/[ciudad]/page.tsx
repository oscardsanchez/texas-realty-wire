import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { filtrarNotas, getAllNotas } from "@/lib/mdx";
import { CIUDADES, CiudadSlug } from "@/lib/taxonomy";
import { NotaCard } from "@/components/notas/NotaCard";
import { FiltroBar } from "@/components/notas/FiltroBar";

export function generateStaticParams() {
  return Object.keys(CIUDADES).map((ciudad) => ({ ciudad }));
}

export function generateMetadata({ params }: { params: { ciudad: string } }): Metadata {
  const nombre = CIUDADES[params.ciudad as CiudadSlug];
  if (!nombre) return {};
  return { title: `Cobertura en ${nombre}`, description: `Notas de Texas Realty Wire sobre ${nombre}.` };
}

export default function CiudadPage({ params }: { params: { ciudad: string } }) {
  const nombre = CIUDADES[params.ciudad as CiudadSlug];
  if (!nombre) notFound();

  const notas = filtrarNotas(getAllNotas(), { ciudad: params.ciudad });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <p className="eyebrow mb-2">Ciudad</p>
      <h1 className="font-serif text-3xl font-bold text-ink">{nombre}</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[260px_1fr]">
        <FiltroBar ciudad={params.ciudad} />
        <div className="grid gap-8 sm:grid-cols-2">
          {notas.length > 0 ? (
            notas.map((nota) => <NotaCard key={nota.slug} nota={nota} />)
          ) : (
            <p className="text-ink-soft sm:col-span-2">Aún no hay notas publicadas sobre {nombre}.</p>
          )}
        </div>
      </div>
    </div>
  );
}
