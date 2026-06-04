import {
  frameProducts,
  lensMaterials,
  lensTreatments,
} from "@/lib/data/clinic";

export type ProductGalleryItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: "armazones" | "tratamientos" | "materiales";
};

/** WebP optimizado con Sharp (npm run optimize:productos). */
const productImage = (slug: string) => `/productos/${slug}.webp`;

/** Fotos reales de Óptica Salud Visual (carpeta «imagenes de armazon»). */
const frameImagesByProduct: string[] = [
  productImage("premium-marcas"),
  productImage("gama-alta"),
  productImage("linea-basica"),
  productImage("antiparras-seguridad"),
  productImage("ninos-flexibles"),
  productImage("al-aire"),
  productImage("sol-adulto"),
  productImage("lectura"),
  productImage("descanso-filtro-azul"),
  productImage("clip-on"),
];

const treatmentImagesByProduct: string[] = [
  productImage("tratamiento-antirreflejo"),
  productImage("tratamiento-filtro-azul"),
  productImage("tratamiento-fotocromatico"),
  productImage("tratamiento-filtro-ambar"),
  productImage("tratamiento-polarizado"),
  productImage("tratamiento-adelgazado"),
  productImage("tratamiento-extra-adelgazado"),
  productImage("tratamiento-filtro-uv"),
  productImage("tratamiento-antiempanante"),
];

const materialImagesByProduct: string[] = [
  productImage("material-mineral"),
  productImage("material-organico"),
  productImage("material-policarbonato"),
];

function toItems(
  titles: readonly string[],
  images: string[],
  category: ProductGalleryItem["category"],
  descriptions: Record<string, string>,
): ProductGalleryItem[] {
  return titles.map((title, index) => ({
    id: `${category}-${index}`,
    title,
    description:
      descriptions[title] ??
      "Disponible en Óptica Salud Visual con asesoría personalizada según tu receta.",
    image: images[index] ?? images[images.length - 1],
    category,
  }));
}

const frameDescriptions: Record<string, string> = {
  "Armazones premium de marcas reconocidas":
    "Monturas de diseñador y marcas líderes para quienes buscan calidad y estilo.",
  "Armazones gama alta":
    "Acetatos y metales de alta gama con acabados superiores.",
  "Armazones línea básica":
    "Opciones accesibles sin sacrificar resistencia ni comodidad.",
  "Antiparras y armazones de seguridad":
    "Protección laboral y uso industrial con normas de seguridad.",
  "Armazones flexibles para niños":
    "Materiales resistentes y adaptados al uso infantil diario.",
  "Armazones al aire (rimless)":
    "Diseño minimalista con montaje por perforación o nylon.",
  "Lentes de sol (niño y adulto)":
    "Protección UV con polarizado y filtros según necesidad.",
  "Lentes de lectura":
    "Soluciones listas para presbicia y uso cercano.",
  "Lentes de descanso (filtro azul)":
    "Ideal para pantallas y fatiga visual digital.",
  "Lentes clip-on":
    "Adaptables a tu armazón óptico para sol cuando lo necesites.",
};

const treatmentDescriptions: Record<string, string> = {
  Antirreflejo: "Reduce reflejos y mejora la nitidez en condiciones de luz.",
  "Filtro azul":
    "Aténúa la luz azul de pantallas y entornos artificiales, ayudando a reducir la fatiga visual.",
  Fotocromático: "Se oscurece con la luz solar y aclara en interiores.",
  "Filtro ámbar": "Especial para la conducción de noche: mejora contraste y confort visual.",
  Polarizados: "Elimina deslumbramientos en conducción y actividades al aire libre.",
  "Adelgazado normal (índice 1.67)":
    "Cristales más delgados para graduaciones medias y altas.",
  "Extra adelgazado (índice 1.74)":
    "Máximo adelgazamiento para graduaciones elevadas.",
  "Filtro UV": "Protección ultravioleta disponible en orgánico, mineral y policarbonato.",
  Antiempañante: "Tratamiento para evitar empañamiento en cambios de temperatura.",
};

const materialDescriptions: Record<string, string> = {
  Mineral: "Alta nitidez óptica y resistencia a rayaduras.",
  "Orgánico (CR-39)": "Ligero y versátil, el estándar más utilizado.",
  Policarbonato: "Impacto resistente, recomendado para niños y deporte.",
};

export const productGalleryItems: ProductGalleryItem[] = [
  ...toItems(frameProducts, frameImagesByProduct, "armazones", frameDescriptions),
  ...toItems(
    lensTreatments,
    treatmentImagesByProduct,
    "tratamientos",
    treatmentDescriptions,
  ),
  ...toItems(
    lensMaterials,
    materialImagesByProduct,
    "materiales",
    materialDescriptions,
  ),
];

export const productGalleryCategories = [
  {
    id: "armazones" as const,
    label: "Armazones ópticos",
    description: "Desde línea básica hasta premium, sol y seguridad.",
  },
  {
    id: "tratamientos" as const,
    label: "Cristales — tratamientos",
    description: "Antirreflejo, filtros, polarizado y adelgazados.",
  },
  {
    id: "materiales" as const,
    label: "Cristales — materiales",
    description: "Mineral, orgánico y policarbonato según tu receta.",
  },
];
