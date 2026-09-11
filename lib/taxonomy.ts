export type SeccionSlug =
  | "pulso-del-mercado"
  | "movimientos-corporativos"
  | "hiperlocal"
  | "legislacion-y-politica"
  | "perfil-comprador-vendedor"
  | "herramientas-y-data";

export interface Seccion {
  slug: SeccionSlug;
  nombre: string;
  descripcion: string;
  fuentePrincipal: string;
}

export const SECCIONES: Record<SeccionSlug, Seccion> = {
  "pulso-del-mercado": {
    slug: "pulso-del-mercado",
    nombre: "Pulso del Mercado",
    descripcion:
      "Precios, inventario y días en mercado — la lectura mensual y trimestral de hacia dónde se mueve Texas.",
    fuentePrincipal:
      "TRERC, Texas REALTORS®, Redfin, Realtor.com, Zonda/Metrostudy, HomesUSA.com, City of Austin Open Data, FRED, Unlock MLS",
  },
  "movimientos-corporativos": {
    slug: "movimientos-corporativos",
    nombre: "Movimientos Corporativos",
    descripcion:
      "Adquisiciones, ejecuciones hipotecarias y desarrollos de lujo que redefinen quién controla el terreno.",
    fuentePrincipal: "The Real Deal Texas, Yardi Matrix, Newmark, Cushman & Wakefield",
  },
  hiperlocal: {
    slug: "hiperlocal",
    nombre: "Hiperlocal / Impacto Regional",
    descripcion:
      "Valor medio por submercado, nuevas comunidades y el desglose ciudad por ciudad, condado por condado.",
    fuentePrincipal: "Community Impact",
  },
  "legislacion-y-politica": {
    slug: "legislacion-y-politica",
    nombre: "Legislación y Política Pública",
    descripcion:
      "Impuestos a la propiedad, regulación de MLS y las leyes estatales que cambian las reglas del juego.",
    fuentePrincipal: "TRERC, Community Impact",
  },
  "perfil-comprador-vendedor": {
    slug: "perfil-comprador-vendedor",
    nombre: "Perfil del Comprador/Vendedor",
    descripcion:
      "Quién compra, quién vende y de dónde viene la migración interna que sigue llenando Texas.",
    fuentePrincipal: "Texas REALTORS®",
  },
  "herramientas-y-data": {
    slug: "herramientas-y-data",
    nombre: "Herramientas y Data para el Agente",
    descripcion:
      "Contenido evergreen: glosarios, cómo leer un reporte y marcos prácticos para el día a día del agente.",
    fuentePrincipal: "Elaboración propia sobre datos de las fuentes",
  },
};

export const SECCION_LIST = Object.values(SECCIONES);

export type CiudadSlug = "austin" | "dallas" | "houston" | "san-antonio" | "estatal" | "otra";

export const CIUDADES: Record<CiudadSlug, string> = {
  austin: "Austin",
  dallas: "Dallas",
  houston: "Houston",
  "san-antonio": "San Antonio",
  estatal: "Estatal",
  otra: "Otra",
};

export const CIUDAD_LIST = Object.entries(CIUDADES).map(([slug, nombre]) => ({
  slug: slug as CiudadSlug,
  nombre,
}));

export type FuenteTipo = "primaria" | "periodistica";

export interface Fuente {
  slug: string;
  nombre: string;
  url: string;
  tipo: FuenteTipo;
  descripcion: string;
}

export const FUENTES: Record<string, Fuente> = {
  trerc: {
    slug: "trerc",
    nombre: "Texas Real Estate Research Center (TRERC)",
    url: "https://trerc.tamu.edu",
    tipo: "primaria",
    descripcion: "Centro de investigación de Texas A&M — fuente científica primaria, Texas Housing Insight mensual.",
  },
  "texas-realtors": {
    slug: "texas-realtors",
    nombre: "Texas REALTORS®",
    url: "https://www.texasrealestate.com",
    tipo: "primaria",
    descripcion: "Asociación estatal de agentes — reportes trimestrales y datos agregados de MLS.",
  },
  "the-real-deal": {
    slug: "the-real-deal",
    nombre: "The Real Deal (Texas)",
    url: "https://therealdeal.com/texas",
    tipo: "periodistica",
    descripcion: "Cobertura periodística de noticias corporativas y desarrollos inmobiliarios.",
  },
  "community-impact": {
    slug: "community-impact",
    nombre: "Community Impact",
    url: "https://communityimpact.com/real-estate",
    tipo: "periodistica",
    descripcion: "Cobertura periodística hiperlocal, comunidad por comunidad.",
  },
  redfin: {
    slug: "redfin",
    nombre: "Redfin Data Center",
    url: "https://www.redfin.com/news/data-center/",
    tipo: "primaria",
    descripcion: "Datos de precios de listado, inventario y días en mercado.",
  },
  "realtor-com": {
    slug: "realtor-com",
    nombre: "Realtor.com Research",
    url: "https://www.realtor.com/research/",
    tipo: "primaria",
    descripcion: "Datos e investigación de mercado de Realtor.com.",
  },
  "zonda-metrostudy": {
    slug: "zonda-metrostudy",
    nombre: "Zonda / Metrostudy",
    url: "https://www.zondahome.com/",
    tipo: "primaria",
    descripcion:
      "Analítica especializada en vivienda nueva, subdivisión por subdivisión — desde compra de terreno crudo hasta tasas de cierre de las constructoras.",
  },
  homesusa: {
    slug: "homesusa",
    nombre: "HomesUSA.com (Ben Caballero)",
    url: "https://www.homesusa.com/",
    tipo: "primaria",
    descripcion:
      "Reportes periódicos de vivienda nueva en Texas: días en mercado e impacto de incentivos de financiamiento (rate buydowns) de las constructoras.",
  },
  "yardi-matrix": {
    slug: "yardi-matrix",
    nombre: "Yardi Matrix",
    url: "https://www.yardimatrix.com/",
    tipo: "primaria",
    descripcion:
      "Reportes trimestrales de pipeline multifamiliar: unidades bajo construcción y entregas planeadas.",
  },
  newmark: {
    slug: "newmark",
    nombre: "Newmark",
    url: "https://www.nmrk.com/insights/market-report/austin-market-reports",
    tipo: "primaria",
    descripcion: "Reportes trimestrales de mercado comercial y multifamiliar.",
  },
  "austin-open-data": {
    slug: "austin-open-data",
    nombre: "City of Austin Open Data Portal",
    url: "https://data.austintexas.gov/Building-and-Development/New-Residential-Units-Summary-by-Calendar-Year-and/2y79-8diw",
    tipo: "primaria",
    descripcion:
      "Datos abiertos del gobierno de Austin: permisos de construcción de vivienda nueva unifamiliar y multifamiliar, resúmenes mensuales y anuales.",
  },
  "fred-austin": {
    slug: "fred-austin",
    nombre: "FRED (Federal Reserve Bank of St. Louis)",
    url: "https://fred.stlouisfed.org/series/AUST448BPPRIV",
    tipo: "primaria",
    descripcion:
      "Indicador mensual de nuevas estructuras privadas autorizadas por permiso de construcción en el área metro Austin-Round Rock-Georgetown.",
  },
  "unlock-mls": {
    slug: "unlock-mls",
    nombre: "Unlock MLS (antes ABoR)",
    url: "https://www.unlockmls.com/stats",
    tipo: "primaria",
    descripcion:
      "Central Texas Housing Report mensual — cierres de venta y precio medio del área metropolitana de Austin, incluyendo constructoras afiliadas.",
  },
  "cushman-wakefield": {
    slug: "cushman-wakefield",
    nombre: "Cushman & Wakefield",
    url: "https://www.cushmanwakefield.com/en/united-states/insights/us-marketbeats/austin-marketbeats",
    tipo: "primaria",
    descripcion: "Reportes trimestrales MarketBeat de mercado comercial y multifamiliar de Austin.",
  },
};

export const FUENTE_LIST = Object.values(FUENTES);
