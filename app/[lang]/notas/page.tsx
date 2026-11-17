import type { Metadata } from "next";
import { filtrarNotas, getAllNotas } from "@/lib/mdx";
import { NotaCard } from "@/components/notas/NotaCard";
import { FiltroBar } from "@/components/notas/FiltroBar";
import { getDict } from "@/lib/i18n";
import { parseLang } from "@/lib/lang-param";
import { buildAlternates } from "@/lib/alternates";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = parseLang(params.lang);
  const t = getDict(lang);
  return {
    title: t.allNotes,
    description: t.notesIndexDescription,
    alternates: buildAlternates(lang, "/notas"),
  };
}

export default function NotasIndexPage({
  params,
  searchParams,
}: {
  params: { lang: string };
  searchParams: { seccion?: string; ciudad?: string; fuente?: string };
}) {
  const lang = parseLang(params.lang);
  const t = getDict(lang);
  const todas = getAllNotas(lang);
  const notas = filtrarNotas(todas, searchParams);
  const filtrado = Boolean(searchParams.seccion || searchParams.ciudad || searchParams.fuente);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="font-serif text-3xl font-bold text-ink">{t.allNotes}</h1>
      <p className="mt-1 text-ink-soft">{t.notesCount(notas.length, filtrado)}</p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[260px_1fr]">
        <FiltroBar lang={lang} {...searchParams} />

        <div className="grid gap-8 sm:grid-cols-2">
          {notas.length > 0 ? (
            notas.map((nota) => <NotaCard key={nota.slug} nota={nota} lang={lang} />)
          ) : (
            <p className="text-ink-soft sm:col-span-2">{t.noMatch}</p>
          )}
        </div>
      </div>
    </div>
  );
}
