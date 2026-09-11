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
content/notas/*.mdx         Las notas publicadas (contenido editorial en vivo)
content/borradores/*.mdx    Notas generadas por la actualización automática, sin publicar
data/indicadores/*.json     Historial de indicadores, un archivo por periodo (YYYY-MM.json)
data/indicadores-borrador/  Snapshots de indicadores pendientes de revisión
lib/
  taxonomy.ts               Las 6 secciones, ciudades y fuentes — fuente única de verdad
  mdx.ts                    Lectura y filtrado de notas
  indicadores.ts            Lectura del historial de indicadores
```

## 4. El widget de indicadores y su historial

Cada corte de datos vive en `data/indicadores/<YYYY-MM>.json` (mismo periodo que cubre el
reporte, no la fecha en que se revisó). El widget del home y `/indicadores` siempre leen
**todos** los archivos de esa carpeta y muestran el más reciente arriba — nada se sobreescribe,
así que el historial completo queda disponible para consulta y comparación mes a mes.

Para agregar un corte nuevo a mano: copia el archivo más reciente, cámbiale el nombre al
periodo nuevo y actualiza los valores. La actualización automática (sección 5) también puede
generar estos archivos, pero siempre como borrador en `data/indicadores-borrador/`.

## 5. Actualización automática y flujo de revisión

Tres rutinas programadas (agentes en la nube, ver `https://claude.ai/code/routines`)
investigan las fuentes autorizadas y generan **borradores** — nunca publican directo:

| Rutina | Cadencia | Fuentes que revisa |
|---|---|---|
| Mensual | Día 5 de cada mes | TRERC, Redfin, Realtor.com, Zonda/Metrostudy, HomesUSA.com |
| Trimestral | 15 de ene/abr/jul/oct | Texas REALTORS®, Yardi Matrix, Newmark |
| Semanal | Todos los lunes | The Real Deal Texas, Community Impact |

Cada corrida que encuentra algo nuevo y citable:
1. Escribe la(s) nota(s) en `content/borradores/` (y, si aplica, un snapshot en
   `data/indicadores-borrador/`) siguiendo la misma plantilla y reglas de citación de la
   sección 2 — nunca toca `content/notas/` ni `data/indicadores/` directamente.
2. Crea una rama nueva (`borrador/mensual-...`, `borrador/trimestral-...` o
   `borrador/semanal-...`), hace commit solo de esos archivos nuevos, y abre un Pull
   Request hacia `main`.
3. Si no encuentra nada nuevo, no hace ningún cambio — es normal que muchas semanas no haya
   nada que publicar.

**Para revisar y publicar un borrador**: abre el Pull Request en GitHub, lee la nota
completa (verifica que las cifras y la cita coincidan con la fuente real), y si está lista:
1. Mueve el archivo de `content/borradores/` a `content/notas/` (mismo nombre) — y de
   `data/indicadores-borrador/` a `data/indicadores/` si aplica — dentro de esa misma rama.
2. Ajusta lo que haga falta (tono, cifras, `fecha_publicacion`).
3. Haz merge del PR a `main`. Vercel tiene este repo conectado, así que el merge despliega
   solo — no hace falta correr `vercel --prod` a mano.

Si un borrador no sirve, simplemente cierra el PR sin mergear (o bórralo).

## 6. Fuera de alcance en esta fase (recomendaciones, no implementadas)

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

## 7. Despliegue

En Vercel, con el repo de GitHub (`oscardsanchez/texas-realty-wire`) conectado — cada push
a `main` despliega automáticamente. Sin variables de entorno requeridas (no hay
integraciones externas todavía).
