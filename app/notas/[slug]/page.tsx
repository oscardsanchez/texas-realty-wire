import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllNotas, getNotaBySlug } from "@/lib/mdx";
import { CIUDADES, FUENTES, SECCIONES } from "@/lib/taxonomy";
import { FuenteBadge } from "@/components/ui/FuenteBadge";
import { Tag } from "@/components/ui/Tag";
import { FuenteCitation } from "@/components/notas/FuenteCitation";
import { CTARelacionada } from "@/components/notas/CTARelacionada";
import { formatFecha } from "@/lib/format";

export function generateStaticParams() {
  return getAllNotas().map((nota) => ({ slug: nota.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const nota = getNotaBySlug(params.slug);
  if (!nota) return {};

  return {
    title: nota.title,
    description: nota.resumen,
    openGraph: {
      title: nota.title,
      description: nota.resumen,
      type: "article",
      publishedTime: nota.fecha_publicacion,
    },
  };
}

export default function NotaPage({ params }: { params: { slug: string } }) {
  const nota = getNotaBySlug(params.slug);
  if (!nota) notFound();

  const seccion = SECCIONES[nota.seccion];
  const fuente = FUENTES[nota.fuente_principal];

  const relacionadas = getAllNotas()
    .filter((n) => n.slug !== nota.slug && n.seccion === nota.seccion)
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: nota.title,
    description: nota.resumen,
    datePublished: nota.fecha_publicacion,
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

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Tag href={`/seccion/${nota.seccion}`} variant="accent">
          {seccion?.nombre ?? nota.seccion}
        </Tag>
        <Tag href={`/ciudad/${nota.ciudad}`}>{CIUDADES[nota.ciudad] ?? nota.ciudad}</Tag>
      </div>

      <h1 className="font-serif text-3xl font-bold leading-tight text-ink sm:text-4xl">
        {nota.title}
      </h1>

      <p className="mt-4 text-lg leading-relaxed text-ink-soft">{nota.resumen}</p>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-y border-line py-3 text-sm text-ink-soft/70">
        <FuenteBadge fuenteSlug={nota.fuente_principal} />
        <span>
          {formatFecha(nota.fecha_publicacion)} · {nota.readingMinutes} min de lectura
        </span>
      </div>

      <div className="nota-prose mt-8">
        <MDXRemote
          source={nota.content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      <FuenteCitation fuenteSlug={nota.fuente_principal} fuenteUrl={nota.fuente_url} />
      <CTARelacionada relacionadas={relacionadas} />
    </article>
  );
}
