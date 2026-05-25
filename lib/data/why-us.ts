import type { whyUsIconMap } from "@/lib/icons";

type WhyUsPillarId = keyof typeof whyUsIconMap;

export const whyUsPillars: {
  id: WhyUsPillarId;
  title: string;
  description: string;
}[] = [
  {
    id: "tecnologia",
    title: "Diagnóstico avanzado",
    description:
      "Refracción, tonometría, retinografía y evaluación binocular en la misma visita.",
  },
  {
    id: "variedad",
    title: "Monturas y laboratorios",
    description:
      "Líneas de armazones recientes y acceso a distintos laboratorios ópticos.",
  },
  {
    id: "fonasa",
    title: "FONASA y particular",
    description:
      "Convenio FONASA y atención particular, con opciones para distintos gustos y presupuestos.",
  },
];

export const whyUsSteps = [
  { label: "Evaluación", detail: "Examen visual completo" },
  { label: "Orientación", detail: "Receta y asesoría" },
  { label: "Seguimiento", detail: "Productos y control" },
] as const;
