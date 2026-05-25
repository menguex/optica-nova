"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { IconBox } from "@/components/ui/IconBox";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  examHighlights,
  exams,
  type ExamId,
} from "@/lib/data/clinic";
import { experienceImage } from "@/lib/data/images";
import { examIconMap } from "@/lib/icons";
import { cn } from "@/lib/utils";

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: LUXURY_EASE },
  },
};

export function Exams() {
  const [activeId, setActiveId] = useState<ExamId>("refraccion");
  const active = exams.find((exam) => exam.id === activeId) ?? exams[0];
  const ActiveIcon = examIconMap[active.id];

  return (
    <section id="examenes" className="bg-cream py-24 md:py-32">
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
            eyebrow="04 — EXÁMENES"
            title={
              <>
                Diagnóstico visual
                <br />
                <span className="text-accent">
                  con equipamiento clínico.
                </span>
              </>
            }
            subtitle="Desde la receta hasta fondo de ojo, presión intraocular, visión binocular y profundidad — en una misma consulta."
          />
        </motion.div>

        <motion.ul
          variants={itemVariants}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {examHighlights.map((item) => (
            <li
              key={item.label}
              className="rounded-full border border-line bg-paper px-4 py-2 text-sm shadow-soft"
            >
              <span className="font-display text-lg text-optic">{item.value}</span>
              <span className="ml-2 text-muted">{item.label}</span>
            </li>
          ))}
        </motion.ul>

        <motion.div
          variants={itemVariants}
          className="mx-auto mt-14 grid max-w-5xl gap-10 lg:max-w-none lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12"
        >
          <motion.div
            layout
            className="relative overflow-hidden rounded-3xl border border-line bg-paper shadow-soft"
          >
            <motion.div
              layout
              className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/11]"
            >
              <Image
                src={experienceImage.src}
                alt={experienceImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent"
                aria-hidden
              />
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: LUXURY_EASE }}
                className="relative p-6 md:p-8"
              >
                <div className="flex items-start gap-4">
                  <IconBox icon={ActiveIcon} size="lg" variant="soft" className="bg-optic/10" />
                  <div>
                    <p className="font-mono text-[10px] font-medium tracking-[0.18em] text-muted">
                      {active.tag} · {active.duration}
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-ink md:text-3xl">
                      {active.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-muted">
                      {active.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className="flex flex-col gap-2">
            <p className="mb-2 text-xs text-eyebrow">
              SELECCIONA UN EXAMEN
            </p>
            {exams.map((exam, index) => {
              const Icon = examIconMap[exam.id];
              const isActive = exam.id === activeId;

              return (
                <motion.button
                  key={exam.id}
                  type="button"
                  onClick={() => setActiveId(exam.id)}
                  variants={itemVariants}
                  className={cn(
                    "group flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition-colors md:p-6",
                    isActive
                      ? "border-optic/40 bg-paper shadow-soft"
                      : "border-line bg-paper/80 hover:border-optic/25 hover:bg-paper",
                  )}
                  aria-pressed={isActive}
                >
                  <IconBox
                    icon={Icon}
                    size="md"
                    variant={isActive ? "solid" : "soft"}
                    className={cn(
                      !isActive && "group-hover:border-optic/30 group-hover:bg-optic/10",
                    )}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="rounded-full bg-cream px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-optic">
                        {exam.tag}
                      </span>
                    </span>
                    <span className="mt-1 block font-display text-lg text-ink">
                      {exam.title}
                    </span>
                    <span
                      className={cn(
                        "mt-1 block text-sm leading-relaxed text-muted transition-all",
                        isActive ? "line-clamp-none" : "line-clamp-2",
                      )}
                    >
                      {exam.description}
                    </span>
                  </span>
                  <ArrowRight
                    className={cn(
                      "mt-1 size-4 shrink-0 transition-transform",
                      isActive
                        ? "translate-x-0 text-optic"
                        : "text-subtle opacity-0 group-hover:translate-x-0.5 group-hover:opacity-100",
                    )}
                    aria-hidden
                  />
                </motion.button>
              );
            })}

            <Link
              href="/reservar"
              className="btn-cta mt-4"
            >
              Agendar examen visual
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
      </PageContainer>
    </section>
  );
}
