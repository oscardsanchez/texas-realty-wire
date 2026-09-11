import Link from "next/link";
import { FUENTE_LIST } from "@/lib/taxonomy";

export function Footer() {
  return (
    <footer className="border-t border-line bg-navy text-paper/70">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-serif text-lg font-bold text-paper">Texas Realty Wire</p>
            <p className="mt-2 text-sm leading-relaxed text-paper/60">
              Noticias e inteligencia de mercado para realtors, brokers y actores del sector
              inmobiliario de Texas. No es asesoría financiera ni de inversión.
            </p>
          </div>
          <div>
            <p className="eyebrow text-paper/50">Fuentes que citamos</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {FUENTE_LIST.map((fuente) => (
                <li key={fuente.slug}>
                  <a
                    href={fuente.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-paper/70 underline decoration-paper/20 underline-offset-2 hover:text-paper"
                  >
                    {fuente.nombre}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-paper/50">Navegación</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>
                <Link href="/notas" className="text-paper/70 hover:text-paper">
                  Todas las notas
                </Link>
              </li>
              <li>
                <Link href="/" className="text-paper/70 hover:text-paper">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/indicadores" className="text-paper/70 hover:text-paper">
                  Historial de indicadores
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-paper/10 pt-6 text-xs text-paper/40">
          © {new Date().getFullYear()} Texas Realty Wire. Toda cifra de mercado se sintetiza y
          atribuye a su fuente original; no reproducimos tablas completas de terceros.
        </p>
      </div>
    </footer>
  );
}
