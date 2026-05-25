"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Calendar,
  GraduationCap,
  MapPin,
  Stethoscope,
  X,
} from "lucide-react";
import { ProfessionalPhoto } from "@/components/ui/ProfessionalPhoto";
import { useLenis, useScrollLock } from "@/components/providers/ScrollContext";
import { scrollToSection } from "@/lib/scroll";
import { professionalProfile } from "@/lib/data/professional";
import { brand } from "@/lib/data/brand";
import { ICON_STROKE } from "@/lib/icons";

const profile = professionalProfile;
const modalFocus = profile.focusAreas.slice(0, 4);

type ProfessionalProfileModalProps = {
  open: boolean;
  onClose: () => void;
};

export function ProfessionalProfileModal({
  open,
  onClose,
}: ProfessionalProfileModalProps) {
  const titleId = useId();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const setScrollLocked = useScrollLock();
  const lenis = useLenis();

  function goToExamenes(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    onClose();
    window.setTimeout(() => {
      scrollToSection("examenes", { lenis });
      window.history.replaceState(null, "", "/#examenes");
    }, 200);
  }

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    setScrollLocked(true);
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      setScrollLocked(false);
    };
  }, [open, onClose, setScrollLocked]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="profesional-profile-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="profesional-profile-backdrop"
        onClick={onClose}
        aria-label="Cerrar perfil profesional"
      />
      <div className="profesional-profile-panel">
        <header className="profesional-profile-header">
          <button
            type="button"
            onClick={onClose}
            className="profesional-profile-close"
            aria-label="Cerrar"
          >
            <X className="size-4" strokeWidth={ICON_STROKE} aria-hidden />
          </button>

          <div className="profesional-profile-avatar overflow-hidden">
            <ProfessionalPhoto fill tone="dark" sizes="112px" />
          </div>

          <p className="profesional-profile-eyebrow font-mono text-[10px] tracking-[0.22em]">
            PERFIL CLÍNICO · {brand.nameUpper}
          </p>
          <h2
            id={titleId}
            className="profesional-profile-name mt-3 font-display text-xl font-semibold leading-tight tracking-[-0.02em] sm:text-2xl"
          >
            {profile.name}
          </h2>
          <p className="profesional-profile-role mt-2 text-sm font-medium">
            {profile.title}
          </p>
          <p className="profesional-profile-institution mt-1 text-xs">
            {profile.institution}
          </p>

          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {profile.credentials.map((item) => (
              <li
                key={item}
                className="profesional-profile-credential rounded-full px-3 py-1 font-mono text-[9px] tracking-[0.12em] sm:text-[10px]"
              >
                {item}
              </li>
            ))}
          </ul>
        </header>

        <div
          ref={scrollRef}
          className="profesional-profile-scroll"
          onWheel={(event) => event.stopPropagation()}
          onTouchMove={(event) => event.stopPropagation()}
        >
          <div className="profesional-profile-intro">
            <Stethoscope
              className="profesional-profile-intro-icon size-4 shrink-0"
              strokeWidth={ICON_STROKE}
              aria-hidden
            />
            <p className="profesional-profile-intro-text text-sm leading-relaxed">
              {profile.shortIntro}
            </p>
          </div>

          <dl className="profesional-profile-meta">
            <div>
              <dt>
                <MapPin
                  className="size-3.5"
                  strokeWidth={ICON_STROKE}
                  aria-hidden
                />
                Ubicación
              </dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>
                <Calendar
                  className="size-3.5"
                  strokeWidth={ICON_STROKE}
                  aria-hidden
                />
                Desde
              </dt>
              <dd>{profile.since}</dd>
            </div>
          </dl>

          <div className="profesional-profile-block">
            <p className="profesional-profile-label">
              <Award
                className="profesional-profile-label-icon size-3.5"
                strokeWidth={ICON_STROKE}
                aria-hidden
              />
              Áreas de atención
            </p>
            <ul className="profesional-profile-list">
              {modalFocus.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>

          <div className="profesional-profile-block profesional-profile-block--muted">
            <p className="profesional-profile-label">
              <GraduationCap
                className="profesional-profile-label-icon size-3.5"
                strokeWidth={ICON_STROKE}
                aria-hidden
              />
              Formación
            </p>
            <p className="profesional-profile-body-text text-sm leading-relaxed">
              {profile.education[0].detail}
            </p>
          </div>
        </div>

        <footer className="profesional-profile-footer">
          <p className="profesional-profile-footer-title text-center font-display text-base font-semibold tracking-[-0.02em]">
            Agenda tu examen visual
          </p>
          <p className="profesional-profile-footer-sub mt-1 text-center text-xs">
            FONASA y particular · Ovalle
          </p>
          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
            <Link
              href="/reservar"
              className="btn-cta group justify-center text-sm"
              onClick={onClose}
            >
              Reservar cita
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={ICON_STROKE}
                aria-hidden
              />
            </Link>
            <Link
              href="/#examenes"
              className="profesional-profile-link-secondary"
              onClick={goToExamenes}
            >
              Ver exámenes disponibles
            </Link>
          </div>
        </footer>
      </div>
    </div>,
    document.body,
  );
}
