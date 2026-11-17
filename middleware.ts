import { NextRequest, NextResponse } from "next/server";
import { LANG_COOKIE, isLang, pickLangFromHeader } from "@/lib/i18n";

/**
 * Toda URL sin prefijo de idioma se redirige a /en o /es:
 * 1) si el usuario ya eligió idioma con el botón (cookie), se respeta;
 * 2) si no, se usa el idioma del navegador/dispositivo (Accept-Language);
 * 3) si no es ni inglés ni español, inglés.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split("/")[1];
  if (isLang(first)) return NextResponse.next();

  const cookie = req.cookies.get(LANG_COOKIE)?.value;
  const lang = isLang(cookie) ? cookie : pickLangFromHeader(req.headers.get("accept-language"));

  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;

  const res = NextResponse.redirect(url, 307);
  res.headers.set("Vary", "Accept-Language, Cookie");
  return res;
}

export const config = {
  // Excluye _next, api y cualquier archivo con extensión (robots.txt, sitemap.xml, favicon…).
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
