import { pexels } from "@/lib/pexels";

import type { whyUsIconMap } from "@/lib/icons";

type WhyUsId = keyof typeof whyUsIconMap;

/** Fondos del acordeón: solo producto y equipo (mejor contraste de texto). */
export const whyUsAccordionItems: {
  id: WhyUsId;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}[] = [
  {
    id: "accesible",
    title: "Salud visual accesible",
    description:
      "Centro óptico en Ovalle con vocación de servicio para toda la Provincia del Limarí, con atención amable y cercana.",
    imageUrl: pexels(5996744, 1200),
    imageAlt: "Armazón en balanza óptica — atención precisa",
  },
  {
    id: "tecnologia",
    title: "Equipamiento clínico",
    description:
      "Inversión en tecnología desde 2024 para exámenes de refracción, tonometría, retinografía y evaluación binocular.",
    imageUrl: pexels(5752241, 1200),
    imageAlt: "Foróptero y equipo de diagnóstico oftalmológico",
  },
  {
    id: "variedad",
    title: "Armazones y cristales",
    description:
      "Líneas nuevas de armazones y distintos laboratorios ópticos para toda la gama de cristales del mercado.",
    imageUrl: pexels(5842846, 1200),
    imageAlt: "Variedad de monturas y armazones en primer plano",
  },
  {
    id: "fonasa",
    title: "FONASA y particular",
    description:
      "Atención con enfoque biopsicosocial, principios éticos y opciones para distintos gustos y presupuestos.",
    imageUrl: pexels(5752241, 1200),
    imageAlt: "Consulta con equipamiento moderno",
  },
] as const;
