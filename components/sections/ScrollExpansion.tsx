import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { pexels } from "@/lib/pexels";

const labImage = pexels(1181686, 1000);

export function ScrollExpansion() {
  return (
    <section id="vision-inmersiva" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-container px-6 md:px-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line shadow-soft lg:aspect-[5/6]">
            <Image
              src={labImage}
              alt="Persona con lentes durante examen visual"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <SectionHeader
              eyebrow="05 — EXPERIENCIA INMERSIVA"
              title={
                <>
                  Laboratorio óptico de{" "}
                  <span className="text-accent">precisión</span>
                </>
              }
              subtitle="Cada montura pasa por medición digital, centrado pupilar y verificación de adaptación. Calibramos tu forma de ver el mundo con diseño, ciencia óptica y atención humana."
              className="mb-8"
            />
            <Link
              href="/reservar"
              className="btn-cta group"
            >
              Agendar examen visual
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
