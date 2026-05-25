"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { ExamenVisualHighlight } from "@/components/ui/ExamenVisualHighlight";
import { brand } from "@/lib/data/brand";
import { site, whatsappUrlWithMessage } from "@/lib/data/site";

type ContactReservationScrollProps = {
  children: React.ReactNode;
};

export function ContactReservationScroll({
  children,
}: ContactReservationScrollProps) {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <header className="relative z-10 px-2 text-center text-reserve-fg md:px-4">
        <p className="text-xs text-eyebrow text-on-dark">08 — RESERVAR</p>
        <h2 className="mt-3 flex flex-col items-center gap-2 font-display text-[clamp(1.75rem,5.5vw,3.25rem)] leading-[1.05] tracking-[-0.03em] text-reserve-fg sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-3 sm:gap-y-2 md:mt-4">
          <span className="block shrink-0">Agenda tu</span>
          <ExamenVisualHighlight />
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-on-dark md:text-base">
          Completa el formulario y te confirmaremos por correo, teléfono o
          WhatsApp.
        </p>
        <p className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-on-dark">
          <a
            href={`mailto:${brand.email}`}
            className="underline underline-offset-4 transition-colors hover:text-reserve-fg"
          >
            {brand.email}
          </a>
          <span className="hidden text-on-dark-secondary sm:inline" aria-hidden>
            ·
          </span>
          <a
            href={whatsappUrlWithMessage}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-colors hover:text-reserve-fg"
          >
            WhatsApp
          </a>
          <span className="hidden text-on-dark-secondary sm:inline" aria-hidden>
            ·
          </span>
          <a
            href={`tel:${site.phone}`}
            className="underline underline-offset-4 transition-colors hover:text-reserve-fg"
          >
            {site.phoneDisplay}
          </a>
        </p>
      </header>

      <ContainerScroll
        intensity="strong"
        hideHeader
        titleComponent={null}
        className="!p-0 md:!p-0"
        cardClassName="mx-auto w-full max-w-xl rounded-3xl border border-line/20 bg-surface-light p-1 shadow-float md:max-w-2xl md:p-1.5"
        innerClassName="overflow-hidden rounded-[1.35rem] bg-surface-light p-3 md:p-5"
      >
        {children}
      </ContainerScroll>
    </div>
  );
}
