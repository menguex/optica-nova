"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ProfessionalPhoto } from "@/components/ui/ProfessionalPhoto";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProfessionalProfileModal } from "@/components/sections/ProfessionalProfileModal";
import { professionalProfile } from "@/lib/data/professional";
import { ICON_STROKE } from "@/lib/icons";

const profile = professionalProfile;

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

export function Professional() {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <section
      id="profesional"
      className="relative overflow-hidden bg-background py-24 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(126,184,232,0.14), transparent 60%)",
        }}
      />

      <PageContainer>
      <motion.div
        className="relative w-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: LUXURY_EASE }}
      >
        <SectionHeader
          eyebrow="03 — PROFESIONAL"
          align="center"
          title={
            <>
              Quién te
              <br />
              <span className="text-accent">atiende.</span>
            </>
          }
          subtitle={profile.sectionTeaser}
          className="mx-auto mb-10 md:mb-12"
        />

        <div className="mx-auto max-w-md text-center">
          <button
            type="button"
            onClick={() => setProfileOpen(true)}
            className="profesional-card-trigger group w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-optic"
            aria-haspopup="dialog"
            aria-expanded={profileOpen}
          >
            <div className="profesional-card-trigger-header">
              TECNÓLOGO MÉDICO · OFTALMOLOGÍA
            </div>

            <div className="px-7 pb-8 pt-10 text-center sm:px-9 sm:pb-9">
              <div className="profesional-card-avatar relative z-10 mx-auto -mt-14 mb-5 size-[5.5rem] overflow-hidden sm:size-24">
                <ProfessionalPhoto
                  fill
                  className="transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 88px, 96px"
                  priority
                />
              </div>

              <p className="font-display text-xl font-semibold tracking-[-0.02em] text-foreground sm:text-2xl">
                {profile.shortName}
              </p>
              <p className="mt-2 text-sm font-medium text-optic">
                {profile.title}
              </p>
              <p className="mt-1 text-xs text-muted">{profile.institution}</p>

              <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-muted">
                {profile.shortIntro}
              </p>

              <span className="profesional-card-cta mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-medium text-cta-fg shadow-float transition-[opacity,transform] group-hover:opacity-90">
                Ver ficha profesional
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={ICON_STROKE}
                  aria-hidden
                />
              </span>
            </div>
          </button>

          <Link
            href="/reservar"
            className="mt-4 inline-flex text-sm text-muted underline-offset-4 transition-colors hover:text-optic hover:underline"
          >
            Reservar examen con Gonzalo
          </Link>
        </div>
      </motion.div>
      </PageContainer>

      <ProfessionalProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
    </section>
  );
}
