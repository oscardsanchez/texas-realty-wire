"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LANGS, LANG_COOKIE, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/cn";

/**
 * Botón EN | ES. Al elegir un idioma guarda una cookie (para que gane sobre el idioma del
 * dispositivo en próximas visitas) y navega a la misma página en el otro idioma,
 * conservando los filtros de la URL.
 */
export function LanguageSwitcher({ lang, label }: { lang: Lang; label: string }) {
  const pathname = usePathname() ?? `/${lang}`;
  const router = useRouter();
  const rest = pathname.replace(/^\/(en|es)(?=\/|$)/, "");

  function choose(e: React.MouseEvent<HTMLAnchorElement>, target: Lang) {
    if (target === lang) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    try {
      document.cookie = `${LANG_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`;
    } catch {
      // Sin cookies: igual se navega; la próxima visita seguirá el idioma del dispositivo.
    }
    router.push(`/${target}${rest}${window.location.search}`);
  }

  return (
    <div
      role="group"
      aria-label={label}
      className="flex overflow-hidden rounded-sm border border-navy text-xs font-semibold"
    >
      {LANGS.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "true" : undefined}
          onClick={(e) => choose(e, l)}
          className={cn(
            "px-2.5 py-1.5 transition-colors",
            l === lang ? "bg-navy text-paper" : "text-navy hover:bg-navy/10"
          )}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
