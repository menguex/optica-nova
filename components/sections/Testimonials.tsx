"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { testimonials } from "@/lib/data/testimonials";

export function Testimonials() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  const prev = () =>
    setActive((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () =>
    setActive((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-container px-6 md:px-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="10 — VOCES"
            title={
              <>
                Quienes ya ven
                <br />
                <span className="text-accent">con Salud Visual.</span>
              </>
            }
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label="Testimonio anterior"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-paper"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Siguiente testimonio"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-paper"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <blockquote className="mt-16 max-w-4xl">
          <p className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.2] tracking-[-0.02em] text-ink">
            &ldquo;{current.quote}&rdquo;
          </p>
          <footer className="mt-8 font-mono text-xs tracking-[0.15em] text-muted">
            <strong className="text-ink">{current.author}</strong>
            {" · "}
            {current.role}
            {" · Cliente desde "}
            {current.year}
          </footer>
        </blockquote>

        <div className="mt-8 flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Ir al testimonio ${index + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                index === active ? "w-8 bg-optic" : "w-4 bg-line"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
