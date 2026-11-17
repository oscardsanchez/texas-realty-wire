import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllNotas, getNotaBySlug } from "@/lib/mdx";
import { FUENTES } from "@/lib/taxonomy";
import { getCiudadNombre, getSeccion } from "@/lib/taxonomy-i18n";
import { FuenteBadge } from "@/components/ui/FuenteBadge";
import { Tag } from "@/components/ui/Tag";
import { FuenteCitation } from "@/components/notas/FuenteCitation";
import { CTARelacionada } from "@/components/notas/CTARelacionada";
import { formatFecha } from "@/lib/format";
import { getDict, withLang } from "@/lib/i18n";
import { parseLang } from "@/lib/lang-param";
import { buildAlternates } from "@/lib/alternates";

export function generateStaticParams() {
  return getAllNotas().map((nota) => ({ slug: nota.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Metadata {
  const lang = parseLang(params.lang);
  const nota = getNotaBySlug(params.slug, lang);
  if (!nota) return {};

  const soloEs = lang === "en" && nota.contentLang === "es";

  return {
    title: nota.title,
    description: nota.resumen,
    alternates: buildAlternates(lang, `/notas/${nota.slug}`, { soloEs: !nota.hasEn }),
    openGraph: {
      title: nota.title,
      description: nota.resumen,
      type: "article",
      publishedTime: nota.fecha_publicacion,
      locale: getDict(soloEs ? "es" : lang).ogLocale,
    },
  };
}

export default function NotaPage({ params }: { params: { lang: string; slug: string } }) {
  const lang = parseLang(params.lang);
  const t = getDict(lang);
  const nota = getNotaBySlug(params.slug, lang);
  if (!nota) notFound();

  const soloEs = lang === "en" && nota.contentLang === "es";
  const seccion = getSeccion(lang, nota.seccion);
  const fuente = FUENTES[nota.fuente_principal];

  const relacionadas = getAllNotas(lang)
    .filter((n) => n.slug !== nota.slug && n.seccion === nota.seccion)
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: nota.title,
    description: nota.resumen,
    datePublished: nota.fecha_publicacion,
    inLanguage: nota.contentLang,
    articleSection: seccion?.nombre,
    ...(fuente
      ? {
          citation: {
            "@type": "CreativeWork",
            name: fuente.nombre,
            url: nota.fuente_url,
          },
        }
      : {}),
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {soloEs && (
        <p
          role="note"
          className="mb-5 border-l-2 border-accent bg-paper-dim/60 px-4 py-2.5 text-sm text-ink-soft"
        >
          {t.spanishOnlyNotice}
        </p>
      )}

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Tag href={withLang(lang, `/seccion/${nota.seccion}`)} variant="accent">
          {seccion?.nombre ?? nota.seccion}
        </Tag>
        <Tag href={withLang(lang, `/ciudad/${nota.ciudad}`)}>
          {getCiudadNombre(lang, nota.ciudad) ?? nota.ciudad}
        </Tag>
      </div>

      <div lang={nota.contentLang}>
        <h1 className="font-serif text-3xl font-bold leading-tight text-ink sm:text-4xl">
          {nota.title}
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{nota.resumen}</p>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-y border-line py-3 text-sm text-ink-soft/70">
        <FuenteBadge fuenteSlug={nota.fuente_principal} lang={lang} />
        <span>
          {formatFecha(nota.fecha_publicacion, lang)} · {nota.readingMinutes} {t.minRead}
        </span>
      </div>

      <div className="nota-prose mt-8" lang={nota.contentLang}>
        <MDXRemote
          source={nota.content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      <FuenteCitation fuenteSlug={nota.fuente_principal} fuenteUrl={nota.fuente_url} lang={lang} />
      <CTARelacionada relacionadas={relacionadas} lang={lang} />
    </article>
  );
}
