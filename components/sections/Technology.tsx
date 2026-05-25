import { SectionHeader } from "@/components/ui/SectionHeader";
import { clinicHighlights } from "@/lib/data/clinic";

export function Technology() {
  return (
    <section id="tecnologia" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-container px-6 md:px-16">
        <SectionHeader
          eyebrow="02 — NUESTRO CENTRO"
          title={
            <>
              Equipamiento y calidad
              <br />
              <span className="text-accent">al servicio del Limarí.</span>
            </>
          }
          className="mb-16"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {clinicHighlights.map((item) => (
            <article
              key={item.value}
              className="rounded-2xl border border-line bg-cream p-8 transition-shadow hover:shadow-soft"
            >
              <p className="font-display text-4xl tracking-[-0.03em] text-ink md:text-5xl">
                {item.value}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{item.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
