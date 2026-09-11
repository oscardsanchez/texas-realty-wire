import type { MetadataRoute } from "next";
import { getAllNotas } from "@/lib/mdx";
import { CIUDADES, SECCIONES } from "@/lib/taxonomy";

const SITE_URL = "https://texasrealtywire.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const notas = getAllNotas();

  const notaEntries = notas.map((nota) => ({
    url: `${SITE_URL}/notas/${nota.slug}`,
    lastModified: nota.fecha_publicacion,
  }));

  const seccionEntries = Object.keys(SECCIONES).map((slug) => ({
    url: `${SITE_URL}/seccion/${slug}`,
  }));

  const ciudadEntries = Object.keys(CIUDADES).map((slug) => ({
    url: `${SITE_URL}/ciudad/${slug}`,
  }));

  return [
    { url: SITE_URL },
    { url: `${SITE_URL}/notas` },
    { url: `${SITE_URL}/indicadores` },
    ...seccionEntries,
    ...ciudadEntries,
    ...notaEntries,
  ];
}
