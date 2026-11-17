import Link from "next/link";
import { FUENTE_LIST } from "@/lib/taxonomy";
import { getDict, withLang, type Lang } from "@/lib/i18n";

export function Footer({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  return (
    <footer className="border-t border-line bg-navy text-paper/70">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-serif text-lg font-bold text-paper">Texas Realty Wire</p>
            <p className="mt-2 text-sm leading-relaxed text-paper/60">
              {t.footerDescription}
            </p>
          </div>
          <div>
            <p className="eyebrow text-paper/50">{t.footerSources}</p>
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
            <p className="eyebrow text-paper/50">{t.footerNav}</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>
                <Link href={withLang(lang, "/notas")} className="text-paper/70 hover:text-paper">
                  {t.allNotes}
                </Link>
              </li>
              <li>
                <Link href={withLang(lang)} className="text-paper/70 hover:text-paper">
                  {t.home}
                </Link>
              </li>
              <li>
                <Link href={withLang(lang, "/indicadores")} className="text-paper/70 hover:text-paper">
                  {t.indicatorsHistory}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-paper/10 pt-6 text-xs text-paper/40">
          © {new Date().getFullYear()} Texas Realty Wire. {t.footerLegal}
        </p>
      </div>
    </footer>
  );
}
