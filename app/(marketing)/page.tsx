import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { WhyUs } from "@/components/sections/WhyUs";
import { Professional } from "@/components/sections/Professional";
import { Exams } from "@/components/sections/Exams";
import { Services } from "@/components/sections/Services";
import { ParallaxStatement } from "@/components/sections/ParallaxStatement";

const Products = dynamic(
  () =>
    import("@/components/sections/Products").then((m) => ({
      default: m.Products,
    })),
);

const ReservationSection = dynamic(
  () =>
    import("@/components/sections/ReservationSection").then((m) => ({
      default: m.ReservationSection,
    })),
);

/**
 * Home — cada bloque con un mensaje distinto (sin repetir FONASA/Limarí/receta):
 * Hero → Nosotros → Por qué → Profesional → Exámenes → Servicios →
 * Compromiso → Productos → Reserva
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <WhyUs />
      <Professional />
      <Exams />
      <Services />
      <ParallaxStatement />
      <Products />
      <ReservationSection />
    </>
  );
}
