"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { IconBox } from "@/components/ui/IconBox";
import { NavAnchor } from "@/components/ui/NavAnchor";
import { PageContainer } from "@/components/ui/PageContainer";
import { whyUsPillars, whyUsSteps } from "@/lib/data/why-us";
import { whyUsIconMap, ICON_STROKE } from "@/lib/icons";

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: LUXURY_EASE },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.85, ease: LUXURY_EASE },
  },
};

export function WhyUs() {
  return (
    <section id="por-que" className="relative overflow-hidden bg-ink">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 85% 70% at 20% 0%, rgba(30,77,140,0.5), transparent 52%), radial-gradient(ellipse 60% 50% at 90% 20%, rgba(126,184,232,0.2), transparent 48%), radial-gradient(ellipse 50% 40% at 50% 100%, rgba(10,35,66,0.8), transparent 55%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(250,248,244,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(250,248,244,0.55) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <PageContainer size="wide" className="relative z-10 py-20 md:py-28">
        <motion.div
          className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-14 xl:gap-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          <div className="text-center lg:text-left">
            <motion.p
              variants={itemVariants}
              className="text-xs text-eyebrow-on-dark"
            >
              02 — POR QUÉ OSV
            </motion.p>

            <motion.div
              variants={lineVariants}
              className="mx-auto mt-5 h-px w-24 origin-left bg-gradient-to-r from-[#c8e4fa] via-optic/60 to-transparent lg:mx-0"
              aria-hidden
            />

            <motion.div variants={itemVariants} className="mt-8">
              <h2 className="font-display text-[clamp(2.35rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
                <span className="block text-on-dark">Más que una receta.</span>
                <span className="mt-2 block text-on-dark-accent">
                  Cuidado integral de tus ojos.
                </span>
              </h2>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mx-auto mt-8 max-w-lg rounded-2xl border border-[rgba(250,248,244,0.18)] bg-[rgba(250,248,244,0.08)] px-6 py-5 text-left backdrop-blur-sm lg:mx-0"
            >
              <p className="text-base leading-relaxed text-on-dark-secondary md:text-lg">
                Un mismo equipo te acompaña en evaluación, receta y elección de
                montura.
              </p>
            </motion.div>

            <motion.ol
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start"
              aria-label="Proceso de atención"
            >
              {whyUsSteps.map((step, index) => (
                <li key={step.label} className="flex items-center gap-2">
                  <span className="rounded-full border border-[rgba(250,248,244,0.28)] bg-[rgba(250,248,244,0.12)] px-3.5 py-2 text-left backdrop-blur-sm">
                    <span className="block font-mono text-[10px] tracking-[0.14em] text-on-dark-accent">
                      {String(index + 1).padStart(2, "0")} · {step.label}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-on-dark-secondary">
                      {step.detail}
                    </span>
                  </span>
                  {index < whyUsSteps.length - 1 ? (
                    <ArrowRight
                      className="size-4 shrink-0 text-on-dark-secondary"
                      strokeWidth={ICON_STROKE}
                      aria-hidden
                    />
                  ) : null}
                </li>
              ))}
            </motion.ol>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <Link href="/reservar" className="btn-cta group">
                Reservar asesoría
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={ICON_STROKE}
                  aria-hidden
                />
              </Link>
              <NavAnchor
                href="/#examenes"
                className="btn-cta-outline-on-dark"
              >
                Ver exámenes
              </NavAnchor>
            </motion.div>
          </div>

          <motion.ul
            variants={containerVariants}
            className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 lg:gap-4"
          >
            {whyUsPillars.map((pillar, index) => (
              <motion.li
                key={pillar.id}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl border border-[rgba(250,248,244,0.2)] bg-[rgba(250,248,244,0.1)] p-5 transition-[border-color,background,transform] duration-500 ease-luxury hover:-translate-y-0.5 hover:border-[rgba(200,228,250,0.45)] hover:bg-[rgba(250,248,244,0.14)] sm:p-6"
              >
                <div
                  className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-optic/25 blur-2xl opacity-50 transition-opacity duration-500 group-hover:opacity-80"
                  aria-hidden
                />
                <span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-on-dark-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="mt-4 flex items-start gap-4">
                  <IconBox
                    icon={whyUsIconMap[pillar.id]}
                    size="md"
                    variant="onDark"
                  />
                  <div className="min-w-0 text-left">
                    <p className="font-display text-lg font-semibold tracking-[-0.02em] text-on-dark">
                      {pillar.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-on-dark-secondary">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </PageContainer>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent"
        aria-hidden
      />
    </section>
  );
}
