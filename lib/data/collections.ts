import { pexels } from "@/lib/pexels";

export const collectionSlugs = [
  "opticos-esenciales",
  "solares-cineticos",
  "edicion-atelier",
  "tech-performance",
] as const;

export type CollectionSlug = (typeof collectionSlugs)[number];

export type CollectionGalleryImage = {
  src: string;
  alt: string;
};

export type Collection = {
  slug: CollectionSlug;
  name: string;
  tag: string;
  description: string;
  price: string;
  image: string;
  overview: string;
  highlights: readonly string[];
  gallery: readonly CollectionGalleryImage[];
};

export const collections: readonly Collection[] = [
  {
    slug: "opticos-esenciales",
    name: "Ópticos Esenciales",
    tag: "EVERYDAY",
    description: "Diseño puro, acetatos premium",
    price: "Desde $89.990",
    image: pexels(532220, 1200),
    overview:
      "Monturas de uso diario con líneas limpias y acetatos de alta densidad. Pensadas para acompañarte horas frente a pantalla sin perder carácter ni comodidad.",
    highlights: [
      "Acetatos italianos y titanio ligero",
      "Lentes monofocales y progresivos",
      "Tratamiento antirreflejo premium",
      "Ajuste facial personalizado en boutique",
    ],
    gallery: [
      { src: pexels(532220, 900), alt: "Hombre con lentes ópticos de armazón" },
      { src: pexels(3768131, 900), alt: "Mujer con lentes sobre fondo claro" },
      { src: pexels(261651, 900), alt: "Retrato con lentes esenciales" },
      { src: pexels(1462637, 900), alt: "Cliente con montura óptica" },
    ],
  },
  {
    slug: "solares-cineticos",
    name: "Solares Cinéticos",
    tag: "SUN",
    description: "Filtros polarizados de alta gama",
    price: "Desde $129.990",
    image: pexels(1139793, 1200),
    overview:
      "Lentes de sol con polarización óptica y contraste elevado para conducción, ciudad y costa. Protección UV400 con estética contemporánea.",
    highlights: [
      "Polarizado de grado óptico",
      "Protección UV400 total",
      "Monturas ultraligeras resistentes",
      "Colores de lente curados para Chile",
    ],
    gallery: [
      { src: pexels(1139793, 900), alt: "Persona con lentes de sol polarizados" },
      { src: pexels(1036623, 900), alt: "Mujer con solares en exteriores" },
      { src: pexels(1040880, 900), alt: "Retrato con lentes de sol" },
      { src: pexels(1680175, 900), alt: "Cliente con colección solar" },
    ],
  },
  {
    slug: "edicion-atelier",
    name: "Edición Atelier",
    tag: "LIMITED",
    description: "Tirajes limitados, piezas numeradas",
    price: "Desde $199.990",
    image: pexels(8422089, 1200),
    overview:
      "Piezas de autor en tirajes numerados: materiales nobles, biselado a mano y detalles que convierten cada montura en un objeto de diseño.",
    highlights: [
      "Series limitadas por temporada",
      "Certificado de autenticidad",
      "Materiales horn acetate y beta-titanio",
      "Asesoría de estilo 1:1 en boutique",
    ],
    gallery: [
      { src: pexels(8422089, 900), alt: "Retrato con montura de autor" },
      { src: pexels(7987854, 900), alt: "Mujer con lentes edición atelier" },
      { src: pexels(1331757, 900), alt: "Detalle de montura premium" },
      { src: pexels(697509, 900), alt: "Cliente con pieza numerada" },
    ],
  },
  {
    slug: "tech-performance",
    name: "Tech Performance",
    tag: "SPORT",
    description: "Lentes deportivos de nueva generación",
    price: "Desde $149.990",
    image: pexels(7749093, 1200),
    overview:
      "Equipamiento visual para rendimiento: grip antideslizante, lentes de alto contraste y monturas que soportan movimiento intenso y luz variable.",
    highlights: [
      "Lentes fotocromáticos deportivos",
      "Ventilación y grip anatómico",
      "Resistencia a impacto certificada",
      "Compatibles con prescripción",
    ],
    gallery: [
      { src: pexels(7749093, 900), alt: "Persona con lentes deportivos" },
      { src: pexels(3786525, 900), alt: "Hombre con montura performance" },
      { src: pexels(4506122, 900), alt: "Cliente con lentes tech" },
      { src: pexels(1239291, 900), alt: "Retrato colección performance" },
    ],
  },
] as const;

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((item) => item.slug === slug);
}

export function getAllCollectionSlugs(): CollectionSlug[] {
  return [...collectionSlugs];
}
