import type { Metadata } from "next";
import { ReservarPageView } from "@/components/sections/ReservarPageView";
import { brand } from "@/lib/data/brand";

export const metadata: Metadata = {
  title: `Reservar cita — ${brand.name}`,
  description:
    "Agenda tu examen visual en Ovalle. Completa el formulario y te confirmamos por correo, WhatsApp o teléfono.",
};

export default function ReservarPage() {
  return <ReservarPageView />;
}
