import type { Metadata } from "next";
import { getAllNotas } from "@/lib/mdx";
import { NotaCard } from "@/components/notas/NotaCard";
import { MarketIndicatorsWidget } from "@/components/home/MarketIndicatorsWidget";
import { SectionGrid } from "@/components/home/SectionGrid";
import { getDict } from "@/lib/i18n";
import { parseLang } from "@/lib/lang-param";
import { buildAlternates } from "@/lib/alternates";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = parseLang(params.lang);
  return { alternates: buildAlternates(lang, "/") };
}

export default function HomePage({ params }: { params: { lang: string } }) {
  const lang = parseLang(params.lang);
  const t = getDict(lang);
  const notas = getAllNotas(lang);
  const [destacada, ...resto] = notas;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          {destacada && (
            <section className="mb-10 border-b border-line pb-10">
              <p className="eyebrow mb-3">{t.lead}</p>
              <NotaCard nota={destacada} lang={lang} destacada />
            </section>
          )}

          {resto.length > 0 && (
            <section className="mb-12">
              <p className="eyebrow mb-4">{t.latest}</p>
              <div className="grid gap-8 sm:grid-cols-2">
                {resto.map((nota) => (
                  <NotaCard key={nota.slug} nota={nota} lang={lang} />
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="lg:sticky lg:top-6 lg:self-start">
          <MarketIndicatorsWidget lang={lang} />
        </div>
      </div>

      <section className="mt-4">
        <p className="eyebrow mb-4">{t.sixSections}</p>
        <SectionGrid lang={lang} />
      </section>
    </div>
  );
}
