import { pexels } from "@/lib/pexels";
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

/** Solo producto y equipo clínico — sin retratos de personas. */
const frameImagesByProduct: string[] = [
  pexels(28295159, 1200), // Premium
  pexels(5842846, 1200), // Gama alta
  pexels(5996744, 1200), // Línea básica
  pexels(11624140, 1200), // Seguridad
  pexels(5842846, 1200), // Niños — monturas coloridas (producto)
  pexels(85370, 1200), // Rimless — macro montura
  pexels(978808, 1200), // Sol
  pexels(831430, 1200), // Lectura
  pexels(85370, 1200), // Filtro azul — detalle de lente
  pexels(29173452, 1200), // Clip-on / sol
];

const treatmentImagesByProduct: string[] = [
  pexels(5842846, 1200),
  pexels(85370, 1200), // Filtro azul — detalle lente
  pexels(978808, 1200),
  pexels(85370, 1200),
  pexels(29173452, 1200),
  pexels(5996744, 1200),
  pexels(5752241, 1200),
  pexels(978808, 1200),
  pexels(5752241, 1200),
];

const materialImagesByProduct: string[] = [
  pexels(5996744, 1200),
  pexels(5996744, 1200),
  pexels(11624140, 1200), // Policarbonato — resistencia / seguridad
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
  "Filtro azul": "Aténúa la luz azul de pantallas y entornos artificiales.",
  Fotocromático: "Se oscurece con la luz solar y aclara en interiores.",
  "Teñido ámbar / rosa": "Tonos cosméticos y confort en exteriores.",
  Polarizados: "Elimina deslumbramientos en conducción y actividades al aire libre.",
  "Adelgazado normal (índice 1.67)":
    "Cristales más delgados para graduaciones medias y altas.",
  "Extra adelgazado (índice 1.74)":
    "Máximo adelgazamiento para graduaciones elevadas.",
  "Filtro UV": "Protección ultravioleta en orgánico o mineral.",
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
