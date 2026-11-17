import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { filtrarNotas, getAllNotas } from "@/lib/mdx";
import { CIUDADES } from "@/lib/taxonomy";
import { getCiudadNombre } from "@/lib/taxonomy-i18n";
import { NotaCard } from "@/components/notas/NotaCard";
import { FiltroBar } from "@/components/notas/FiltroBar";
import { getDict } from "@/lib/i18n";
import { parseLang } from "@/lib/lang-param";
import { buildAlternates } from "@/lib/alternates";

export function generateStaticParams() {
  return Object.keys(CIUDADES).map((ciudad) => ({ ciudad }));
}

export function generateMetadata({
  params,
}: {
  params: { lang: string; ciudad: string };
}): Metadata {
  const lang = parseLang(params.lang);
  const t = getDict(lang);
  const nombre = getCiudadNombre(lang, params.ciudad);
  if (!nombre) return {};
  return {
    title: t.cityTitle(nombre),
    description: t.cityDescription(nombre),
    alternates: buildAlternates(lang, `/ciudad/${params.ciudad}`),
  };
}

export default function CiudadPage({ params }: { params: { lang: string; ciudad: string } }) {
  const lang = parseLang(params.lang);
  const t = getDict(lang);
  const nombre = getCiudadNombre(lang, params.ciudad);
  if (!nombre) notFound();

  const notas = filtrarNotas(getAllNotas(lang), { ciudad: params.ciudad });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <p className="eyebrow mb-2">{t.cityEyebrow}</p>
      <h1 className="font-serif text-3xl font-bold text-ink">{nombre}</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[260px_1fr]">
        <FiltroBar lang={lang} ciudad={params.ciudad} />
        <div className="grid gap-8 sm:grid-cols-2">
          {notas.length > 0 ? (
            notas.map((nota) => <NotaCard key={nota.slug} nota={nota} lang={lang} />)
          ) : (
            <p className="text-ink-soft sm:col-span-2">{t.emptyCity(nombre)}</p>
          )}
        </div>
      </div>
    </div>
  );
}
