"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { about, clinicHighlights } from "@/lib/data/clinic";
import { brand } from "@/lib/data/brand";
import { localGalleryImages } from "@/lib/data/images";
import { aboutTabIconMap, ICON_STROKE } from "@/lib/icons";
import { cn } from "@/lib/utils";

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

const tabs = [
  {
    id: "quienes",
    label: "Quiénes somos",
    shortLabel: "Nosotros",
    icon: aboutTabIconMap.quienes,
    content: about.whoWeAre,
    mono: "01",
  },
  {
    id: "mision",
    label: "Misión",
    shortLabel: "Misión",
    icon: aboutTabIconMap.mision,
    content: about.mission,
    mono: "02",
  },
  {
    id: "vision",
    label: "Visión",
    shortLabel: "Visión",
    icon: aboutTabIconMap.vision,
    content: about.vision,
    mono: "03",
  },
] as const;

type TabId = (typeof tabs)[number]["id"];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: LUXURY_EASE },
  },
};

export function About() {
  const [activeTab, setActiveTab] = useState<TabId>("quienes");
  const active = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];
  const ActiveIcon = active.icon;

  return (
    <section id="nosotros" className="bg-background py-24 md:py-32">
      <PageContainer size="wide">
      <motion.div
        className="w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <SectionHeader
            eyebrow="01 — QUIÉNES SOMOS"
            title={
              <>
                Tu centro óptico
                <br />
                <span className="text-accent">en Ovalle.</span>
              </>
            }
            subtitle={`Conoce la historia, misión y visión de ${brand.shortName} desde ${about.founded}.`}
            className="mb-14"
          />
        </motion.div>

        <motion.ul
          className="mx-auto mb-12 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4"
          variants={itemVariants}
        >
          {clinicHighlights.map((item) => (
            <motion.li
              key={item.value}
              className="rounded-2xl border border-line bg-cream p-5 transition-[border-color,box-shadow] duration-500 ease-luxury hover:border-optic/30 hover:shadow-soft"
              variants={itemVariants}
            >
              <p className="font-display text-2xl tracking-[-0.02em] text-ink">
                {item.value}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.label}
              </p>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          variants={itemVariants}
          className="mx-auto mb-12 grid max-w-5xl gap-4 sm:grid-cols-3"
        >
          {localGalleryImages.map((image) => (
            <figure
              key={image.src}
              className="group relative overflow-hidden rounded-2xl border border-line bg-paper shadow-soft"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"
                  aria-hidden
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-on-dark/80">
                    OSV · OVALLE
                  </p>
                  <p className="mt-1 text-sm font-medium text-on-dark">
                    {image.caption}
                  </p>
                </figcaption>
              </div>
            </figure>
          ))}
        </motion.div>

        <motion.div
          className="overflow-hidden rounded-3xl border border-line bg-cream/80 shadow-soft backdrop-blur-sm"
          variants={itemVariants}
        >
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-optic/50 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: LUXURY_EASE }}
          />

          <div className="flex flex-col gap-0 lg:flex-row">
            <div
              className="flex gap-2 overflow-x-auto border-b border-line p-4 lg:w-[min(280px,32%)] lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r lg:p-6"
              role="tablist"
              aria-label="Información institucional"
            >
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`about-panel-${tab.id}`}
                    id={`about-tab-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "group relative flex min-w-[9.5rem] shrink-0 items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors duration-500 ease-luxury lg:min-w-0 lg:w-full",
                      isActive
                        ? "text-on-dark"
                        : "text-muted hover:bg-paper hover:text-foreground",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="about-tab-indicator"
                        className="absolute inset-0 rounded-2xl bg-ink shadow-float"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    ) : null}
                    <span className="relative z-10 flex min-w-0 items-center gap-3">
                      <span
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-500",
                          isActive
                            ? "border-[rgba(250,248,244,0.2)] bg-[rgba(250,248,244,0.1)] text-on-dark"
                            : "border-line bg-paper text-optic group-hover:border-optic/30",
                        )}
                      >
                        <Icon className="size-4" strokeWidth={ICON_STROKE} />
                      </span>
                      <span className="min-w-0">
                        <span
                          className={cn(
                            "block font-mono text-[10px] tracking-[0.2em]",
                            isActive ? "text-on-dark" : "text-muted",
                          )}
                        >
                          {tab.mono}
                        </span>
                        <span className="block truncate text-sm font-medium sm:text-base">
                          <span className="hidden sm:inline">{tab.label}</span>
                          <span className="sm:hidden">{tab.shortLabel}</span>
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <motion.div
              className="relative min-h-[280px] flex-1 p-6 md:p-10 lg:min-h-[320px]"
              role="tabpanel"
              id={`about-panel-${active.id}`}
              aria-labelledby={`about-tab-${active.id}`}
            >
              <AnimatePresence mode="wait">
                <motion.article
                  key={active.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.45, ease: LUXURY_EASE }}
                  className="relative"
                >
                  <motion.div
                    className="mb-6 flex items-start gap-4"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05, ease: LUXURY_EASE }}
                  >
                    <span className="flex size-12 items-center justify-center rounded-2xl border border-line bg-paper text-optic">
                      <ActiveIcon className="size-5" strokeWidth={ICON_STROKE} />
                    </span>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: 48 }}
                      transition={{ duration: 0.6, delay: 0.15, ease: LUXURY_EASE }}
                      className="mt-6 h-px bg-optic/40"
                      aria-hidden
                    />
                  </motion.div>

                  <motion.h3
                    className="font-display text-2xl tracking-[-0.02em] text-ink md:text-3xl"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.08, ease: LUXURY_EASE }}
                  >
                    {active.label}
                  </motion.h3>

                  <motion.p
                    className="mt-5 max-w-2xl whitespace-pre-line text-base leading-relaxed text-muted md:text-lg md:leading-relaxed"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.12, ease: LUXURY_EASE }}
                  >
                    {active.content}
                  </motion.p>

                  {active.id === "quienes" ? (
                    <motion.p
                      className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 font-mono text-[10px] font-medium tracking-[0.18em] text-muted"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2, ease: LUXURY_EASE }}
                    >
                      <span className="size-1.5 rounded-full bg-optic animate-pulse" />
                      Desde {about.founded} · Ovalle, Región de Coquimbo
                    </motion.p>
                  ) : null}
                </motion.article>
              </AnimatePresence>

              <div
                className="pointer-events-none absolute -bottom-16 -right-8 size-48 rounded-full bg-optic/[0.06] blur-3xl"
                aria-hidden
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      </PageContainer>
    </section>
  );
}
