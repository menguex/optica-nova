import type { LucideIcon } from "lucide-react";
import {
  Box,
  Eye,
  FileCheck,
  Focus,
  Gauge,
  Glasses,
  Heart,
  ScanEye,
  Target,
  Users,
} from "lucide-react";
import type { ExamId, ServiceId } from "@/lib/data/clinic";

/** Trazo único para toda la iconografía (Lucide) */
export const ICON_STROKE = 1.5;

export const iconSize = {
  xs: "size-3.5",
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
  xl: "size-7",
} as const;

/** Exámenes — metáfora clínica / oftalmológica */
export const examIconMap: Record<ExamId, LucideIcon> = {
  refraccion: Eye,
  tonometria: Gauge,
  retinografia: ScanEye,
  sensoriomotora: Focus,
  estereopsis: Box,
};

/** Servicios */
export const serviceIconMap: Record<ServiceId, LucideIcon> = {
  "atencion-tmo": Eye,
  receta: Glasses,
  operativos: Users,
  certificados: FileCheck,
};

/** Pestañas Nosotros */
export const aboutTabIconMap = {
  quienes: Eye,
  mision: Heart,
  vision: Target,
} as const satisfies Record<string, LucideIcon>;

/** Por qué OSV — acordeón */
export const whyUsIconMap = {
  accesible: Heart,
  tecnologia: ScanEye,
  variedad: Glasses,
  fonasa: FileCheck,
} as const;
