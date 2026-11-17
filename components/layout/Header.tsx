import Link from "next/link";
import { getSeccionList } from "@/lib/taxonomy-i18n";
import { getDict, withLang, type Lang } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header({ lang }: { lang: Lang }) {
  const t = getDict(lang);

  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href={withLang(lang)} className="flex items-baseline gap-2">
          <span className="font-serif text-xl font-bold tracking-tight text-navy sm:text-2xl">
            Texas Realty Wire
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft/70 sm:inline">
            {t.tagline}
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher lang={lang} label={t.langLabel} />
          <Link
            href={withLang(lang, "/notas")}
            className="rounded-sm border border-navy px-3 py-1.5 text-sm font-medium text-navy transition-colors hover:bg-navy hover:text-paper"
          >
            {t.allNotes}
          </Link>
        </div>
      </div>
      <nav className="border-t border-line bg-navy">
        <div className="mx-auto flex max-w-6xl gap-x-5 gap-y-1 overflow-x-auto px-4 py-2 text-[13px] sm:px-6">
          {getSeccionList(lang).map((seccion) => (
            <Link
              key={seccion.slug}
              href={withLang(lang, `/seccion/${seccion.slug}`)}
              className="whitespace-nowrap font-medium text-paper/80 transition-colors hover:text-paper"
            >
              {seccion.nombre}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
