import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { experienceImage } from "@/lib/data/images";
import { experienceSteps } from "@/lib/data/testimonials";

export function Experience() {
  return (
    <section id="experiencia" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-container px-6 md:px-16">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="03 — EXPERIENCIA CLÍNICA"
              title={
                <>
                  Un examen visual
                  <br />
                  <span className="text-accent">hecho como un ritual.</span>
                </>
              }
              subtitle="45 minutos. Tecnología de diagnóstico de última generación. Un especialista dedicado a entender cómo ves —y cómo deberías ver."
            />
            <div className="relative mt-10 hidden aspect-[16/10] overflow-hidden rounded-2xl border border-line shadow-soft lg:block">
              <Image
                src={experienceImage.src}
                alt={experienceImage.alt}
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>

          <ol className="space-y-0 border-l border-line pl-8">
            {experienceSteps.map((step, index) => (
              <li key={step.title} className="relative pb-12 last:pb-0">
                <span className="absolute -left-[33px] top-1 flex h-4 w-4 items-center justify-center rounded-full border border-line bg-paper font-mono text-[9px] text-subtle">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl text-ink">{step.title}</h3>
                <p className="mt-2 text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-2xl border border-line shadow-soft lg:hidden">
          <Image
            src={experienceImage.src}
            alt={experienceImage.alt}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
}
