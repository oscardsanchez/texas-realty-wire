# Texas Realty Wire

Portal de noticias e inteligencia de mercado del ecosistema inmobiliario de Texas, para
realtors, brokers y actores del sector — no para compradores finales de vivienda. Next.js
(App Router, TypeScript) + Tailwind CSS + contenido en MDX versionado en el repo (sin base
de datos en esta fase).

## 1. Instalar y correr en local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

```bash
npm run build   # build de producción (SSG de todas las notas)
npm run typecheck
```

## 2. Cómo publicar una nota nueva (sin tocar código)

Cada nota es un archivo `.mdx` dentro de `content/notas/`. El nombre del archivo se
convierte en la URL de la nota (`mi-nota-nueva.mdx` → `/notas/mi-nota-nueva`), así que
usa minúsculas, sin espacios ni acentos, separado por guiones.

1. Duplica cualquier archivo existente en `content/notas/` como punto de partida.
2. Completa el frontmatter (el bloque entre `---` al inicio del archivo):

```yaml
---
title: "Titular con gancho + dato duro"
seccion: "pulso-del-mercado" # ver valores válidos abajo
ciudad: "austin" # austin | dallas | houston | san-antonio | estatal | otra
fuente_principal: "trerc" # ver slugs de fuente abajo
fuente_url: "https://enlace-directo-al-reporte-o-articulo-original"
fecha_publicacion: "2026-09-09" # formato AAAA-MM-DD
resumen: "1-2 líneas para las tarjetas de preview del home y el listado."
---
```

**Valores válidos de `seccion`** (deben coincidir exactamente):
`pulso-del-mercado`, `movimientos-corporativos`, `hiperlocal`,
`legislacion-y-politica`, `perfil-comprador-vendedor`, `herramientas-y-data`.

**Valores válidos de `fuente_principal`**:
`trerc`, `texas-realtors`, `the-real-deal`, `community-impact`, `redfin`, `realtor-com`,
`zonda-metrostudy`, `homesusa`, `yardi-matrix`, `newmark`.
El sitio usa este valor para mostrar el badge de "dato primario" (verde) o "cobertura
periodística" (gris) automáticamente — no hay que elegir el color a mano.

3. Escribe el cuerpo de la nota en Markdown, siguiendo este orden (es la plantilla
   editorial obligatoria del sitio):
   1. **Lead** (primer párrafo, sin encabezado): el dato más importante primero.
   2. `## Contexto` — por qué está pasando, no solo qué pasa.
   3. `## Los números` — una tabla Markdown con el desglose de datos.
   4. `## Qué hacer con esto` — una lista accionable para el agente/broker.

   **No agregues manualmente** una sección de "Fuente" ni un CTA de cierre — el sitio
   los genera automáticamente al final de cada nota a partir de `fuente_principal` y
   `fuente_url` del frontmatter, y de las notas relacionadas de la misma sección. Esto
   evita que una nota publicada olvide citar su fuente.

4. Si agregas una nueva sección/ciudad/fuente que no existe todavía, edítala primero en
   `lib/taxonomy.ts` (una sola fuente de verdad para todo el sitio: nav, badges, filtros).

5. Guarda el archivo, corre `npm run dev` y revisa la nota en
   `http://localhost:3000/notas/<nombre-del-archivo>` antes de publicar.

### Regla de citación (obligatoria)

`fuente_url` debe enlazar **directo al reporte o artículo original**, no a la home de la
fuente. Nunca copies tablas completas de la fuente — sintetiza y atribuye, como en las
tres notas de ejemplo incluidas.

## 3. Estructura del proyecto

```
app/
  page.tsx                  Home: destacada + últimas notas + widget de indicadores
  notas/page.tsx            Listado completo con filtros (sección, ciudad, fuente)
  notas/[slug]/page.tsx     Plantilla de nota individual
  seccion/[seccion]/page.tsx   Landing de cada una de las 6 secciones
  ciudad/[ciudad]/page.tsx     Landing por ciudad
  sitemap.ts, robots.ts     SEO técnico
components/
  layout/                   Header, Footer
  home/                     SectionGrid, MarketIndicatorsWidget
  notas/                    NotaCard, FiltroBar, FuenteCitation, CTARelacionada
  ui/                       FuenteBadge, Tag
content/notas/*.mdx         Las notas (contenido editorial)
data/indicadores.json       Datos del widget de indicadores del home (actualizar a mano)
lib/
  taxonomy.ts               Las 6 secciones, ciudades y fuentes — fuente única de verdad
  mdx.ts                    Lectura y filtrado de notas
```

## 4. Actualizar el widget de indicadores del home

Edita `data/indicadores.json` a mano cada vez que salga un nuevo Texas Housing Insight de
TRERC (o la fuente que se use). No hay automatización todavía — es deliberado para esta
fase, ver "Fuera de alcance" abajo.

## 5. Fuera de alcance en esta fase (recomendaciones, no implementadas)

- **CMS / edición vía UI**: hoy publicar una nota requiere editar un archivo `.mdx` y
  hacer commit. Si el volumen editorial crece, vale la pena evaluar un CMS headless
  (Sanity, Tina) sobre esta misma estructura de contenido antes de construir uno propio.
- **Autenticación / suscripciones**: el CTA de "recibe el pulso del mercado" en cada nota
  es solo visual — no hay captura de email ni backend. Conectar esto requeriría un
  proveedor de newsletter (Resend, Buttondown) y, si hay contenido premium, autenticación
  real (ver siguiente punto).
- **Base de datos**: el contenido vive como archivos versionados en git a propósito. Si
  el sitio necesita búsqueda full-text, comentarios, o analítica editorial más fina,
  ese es el momento de introducir una base de datos — no antes.

## 6. Despliegue

Pensado para Vercel: conecta el repo, sin variables de entorno requeridas para esta fase
(no hay integraciones externas todavía).
