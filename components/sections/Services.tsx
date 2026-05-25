"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { IconBox } from "@/components/ui/IconBox";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services, type ServiceId } from "@/lib/data/clinic";
import { serviceIconMap } from "@/lib/icons";
import { cn } from "@/lib/utils";

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

const categoryStyles: Record<
  (typeof services)[number]["category"],
  string
> = {
  Clínica: "bg-optic/10 text-optic",
  Productos: "bg-cream text-ink border border-line",
  Comunidad: "bg-paper text-ink border border-line",
  Certificación: "bg-foreground/5 text-foreground",
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
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

export function Services() {
  const [activeId, setActiveId] = useState<ServiceId>("atencion-tmo");
  const active = services.find((s) => s.id === activeId) ?? services[0];
  const ActiveIcon = serviceIconMap[active.id];

  return (
    <section id="servicios" className="bg-background py-24 md:py-32">
      <PageContainer size="wide">
      <motion.div
        className="w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <SectionHeader
            eyebrow="05 — SERVICIOS"
            title={
              <>
                Certificados,
                <br />
                <span className="text-accent">operativos y más.</span>
              </>
            }
            subtitle="Despacho de receta, campañas para empresas y documentación para COMPIN, Tránsito, colegios y exámenes preocupacionales."
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:max-w-none lg:grid-cols-4"
        >
          {services.map((service) => {
            const Icon = serviceIconMap[service.id];
            const isActive = service.id === activeId;

            return (
              <motion.button
                key={service.id}
                type="button"
                onClick={() => setActiveId(service.id)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: LUXURY_EASE }}
                className={cn(
                  "flex h-full flex-col rounded-2xl border p-6 text-left transition-shadow",
                  isActive
                    ? "border-optic/35 bg-cream shadow-soft"
                    : "border-line bg-cream/50 hover:border-optic/20 hover:bg-cream hover:shadow-soft",
                )}
                aria-pressed={isActive}
              >
                <span
                  className={cn(
                    "inline-flex w-fit rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider",
                    categoryStyles[service.category],
                  )}
                >
                  {service.category}
                </span>
                <IconBox
                  icon={Icon}
                  size="md"
                  variant={isActive ? "solid" : "soft"}
                  className="mt-4"
                />
                <span className="mt-4 font-display text-xl text-ink">
                  {service.title}
                </span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {service.description}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8 overflow-hidden rounded-3xl border border-line bg-cream"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.35, ease: LUXURY_EASE }}
              className="grid gap-6 p-6 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-8 md:p-8"
            >
              <IconBox icon={ActiveIcon} size="lg" variant="solid" />
              <div>
                <p className="font-mono text-[10px] font-medium tracking-[0.18em] text-muted">
                  {active.category}
                </p>
                <h3 className="mt-1 font-display text-2xl text-ink md:text-3xl">
                  {active.title}
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
                  {active.detail}
                </p>
              </div>
              <Link
                href="/reservar"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-ink/15 bg-paper px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-background"
              >
                Consultar
                <ArrowRight className="size-4" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </motion.div>
      </PageContainer>
    </section>
  );
}
