import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { filtrarNotas, getAllNotas } from "@/lib/mdx";
import { SECCIONES, SeccionSlug } from "@/lib/taxonomy";
import { getSeccion } from "@/lib/taxonomy-i18n";
import { NotaCard } from "@/components/notas/NotaCard";
import { FiltroBar } from "@/components/notas/FiltroBar";
import { getDict } from "@/lib/i18n";
import { parseLang } from "@/lib/lang-param";
import { buildAlternates } from "@/lib/alternates";

export function generateStaticParams() {
  return Object.keys(SECCIONES).map((seccion) => ({ seccion }));
}

export function generateMetadata({
  params,
}: {
  params: { lang: string; seccion: string };
}): Metadata {
  const lang = parseLang(params.lang);
  const seccion = getSeccion(lang, params.seccion as SeccionSlug);
  if (!seccion) return {};
  return {
    title: seccion.nombre,
    description: seccion.descripcion,
    alternates: buildAlternates(lang, `/seccion/${seccion.slug}`),
  };
}

export default function SeccionPage({ params }: { params: { lang: string; seccion: string } }) {
  const lang = parseLang(params.lang);
  const t = getDict(lang);
  const seccion = getSeccion(lang, params.seccion as SeccionSlug);
  if (!seccion) notFound();

  const notas = filtrarNotas(getAllNotas(lang), { seccion: seccion.slug });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <p className="eyebrow mb-2">{t.sectionEyebrow}</p>
      <h1 className="font-serif text-3xl font-bold text-ink">{seccion.nombre}</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">{seccion.descripcion}</p>
      <p className="mt-1 text-xs uppercase tracking-wide text-ink-soft/60">
        {t.mainSource}: {seccion.fuentePrincipal}
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[260px_1fr]">
        <FiltroBar lang={lang} seccion={seccion.slug} />
        <div className="grid gap-8 sm:grid-cols-2">
          {notas.length > 0 ? (
            notas.map((nota) => <NotaCard key={nota.slug} nota={nota} lang={lang} />)
          ) : (
            <p className="text-ink-soft sm:col-span-2">{t.emptySection}</p>
          )}
        </div>
      </div>
    </div>
  );
}
