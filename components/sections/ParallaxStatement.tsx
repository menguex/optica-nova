"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NavAnchor } from "@/components/ui/NavAnchor";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/components/providers/ScrollContext";
import { parallaxStatementImage } from "@/lib/data/images";

type ScrollMotion = {
  imageY: number;
  imageScale: number;
  textY: number;
  reveal: number;
};

export function ParallaxStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const [scrollMotion, setScrollMotion] = useState<ScrollMotion>({
    imageY: 0,
    imageScale: 1.22,
    textY: 24,
    reveal: 0,
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      const reveal = Math.min(
        1,
        Math.max(0, (vh - sectionTop) / (vh + sectionHeight * 0.45)),
      );

      if (prefersReducedMotion) {
        setScrollMotion({ imageY: 0, imageScale: 1.12, textY: 0, reveal });
        return;
      }

      const enter = Math.min(
        1,
        Math.max(0, (vh - sectionTop) / (vh * 0.75)),
      );
      const exit = Math.min(1, Math.max(0, (vh - sectionTop) / sectionHeight));

      const scrollInto = Math.max(0, vh - sectionTop);
      const progress = scrollInto / (sectionHeight + vh * 0.5);
      const imageY = (progress - 0.35) * sectionHeight * 0.32;
      const textY = (0.5 - progress) * 36;
      const imageScale = 1.14 + enter * 0.14 - exit * 0.06;

      setScrollMotion({ imageY, imageScale, textY, reveal });
    };

    update();

    if (lenis) {
      lenis.on("scroll", update);
      return () => {
        lenis.off("scroll", update);
      };
    }

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [lenis]);

  return (
    <section
      ref={sectionRef}
      id="compromiso"
      className="relative min-h-[52svh] overflow-hidden bg-surface-dark"
      aria-label="Nuestro compromiso con la salud visual"
    >
      <div
        className="absolute inset-0 overflow-hidden lg:left-[36%] lg:right-0"
        aria-hidden
      >
        <div
          className="absolute -left-[6%] top-[-14%] h-[128%] w-[112%] will-change-transform lg:left-[-4%] lg:top-[-12%] lg:h-[124%] lg:w-[108%]"
          style={{
            transform: `translate3d(0, ${scrollMotion.imageY}px, 0) scale(${scrollMotion.imageScale})`,
          }}
        >
          <Image
            src={parallaxStatementImage.src}
            alt=""
            fill
            className="object-cover object-[center_28%] sm:object-[62%_24%] lg:object-[58%_22%]"
            sizes="(max-width: 1024px) 100vw, 64vw"
            priority
          />
        </div>

        <div className="absolute inset-0 bg-ink/55 lg:bg-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink/40 lg:from-ink lg:via-ink/88 lg:to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-ink/60" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 78% 40%, rgba(126,184,232,0.28), transparent 65%)",
          }}
        />
      </div>

      <div
        className="relative z-10 mx-auto flex min-h-[52svh] max-w-3xl flex-col items-center justify-center px-6 py-14 text-center md:px-10 md:py-16"
        style={{
          opacity: 0.35 + scrollMotion.reveal * 0.65,
          transform: `translate3d(0, ${scrollMotion.textY + (1 - scrollMotion.reveal) * 32}px, 0)`,
        }}
      >
        <p className="font-mono text-xs tracking-[0.2em] text-on-dark">
          06 — NUESTRO COMPROMISO
        </p>
        <h2 className="mt-6 font-display text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-on-dark">
          Compromiso con
          <br />
          <span className="font-semibold text-on-dark-accent">
            tu salud visual.
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-on-dark md:text-lg">
          Trato cercano, principios éticos y vocación de servicio en la Provincia
          del Limarí — para que te sientas acompañado en cada visita.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/reservar" className="btn-cta group">
            Reservar examen visual
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <NavAnchor href="/#productos" className="btn-cta-outline-on-dark">
            Ver productos
          </NavAnchor>
        </div>
      </div>
    </section>
  );
}
