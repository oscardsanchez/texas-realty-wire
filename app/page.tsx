import { getAllNotas } from "@/lib/mdx";
import { NotaCard } from "@/components/notas/NotaCard";
import { MarketIndicatorsWidget } from "@/components/home/MarketIndicatorsWidget";
import { SectionGrid } from "@/components/home/SectionGrid";

export default function HomePage() {
  const notas = getAllNotas();
  const [destacada, ...resto] = notas;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          {destacada && (
            <section className="mb-10 border-b border-line pb-10">
              <p className="eyebrow mb-3">Al frente</p>
              <NotaCard nota={destacada} destacada />
            </section>
          )}

          {resto.length > 0 && (
            <section className="mb-12">
              <p className="eyebrow mb-4">Últimas notas</p>
              <div className="grid gap-8 sm:grid-cols-2">
                {resto.map((nota) => (
                  <NotaCard key={nota.slug} nota={nota} />
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="lg:sticky lg:top-6 lg:self-start">
          <MarketIndicatorsWidget />
        </div>
      </div>

      <section className="mt-4">
        <p className="eyebrow mb-4">Las seis secciones</p>
        <SectionGrid />
      </section>
    </div>
  );
}
