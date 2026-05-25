"use client";

import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { brand } from "@/lib/data/brand";
import { cn } from "@/lib/utils";

const MIN_VISIBLE_MS = 450;
const FADE_MS = 350;

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => setIsDark(root.classList.contains("dark"));
    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setVisible(false);
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    // No depender de `window.load`: en Next.js suele dispararse antes de hidratar.
    const fadeTimer = window.setTimeout(() => setFadeOut(true), MIN_VISIBLE_MS);
    const hideTimer = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, MIN_VISIBLE_MS + FADE_MS);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Cargando ${brand.name}`}
      className={cn(
        "fixed inset-0 z-[300] flex flex-col items-center justify-center transition-opacity duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        isDark ? "bg-background" : "bg-paper",
        fadeOut ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className={cn(
            "absolute left-1/2 top-1/2 h-[min(85vw,30rem)] w-[min(85vw,30rem)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl",
            isDark
              ? "bg-[radial-gradient(circle,rgba(126,184,232,0.22)_0%,transparent_68%)]"
              : "bg-[radial-gradient(circle,rgba(168,212,245,0.4)_0%,transparent_68%)]",
          )}
        />
      </div>

      <div className="relative flex flex-col items-center gap-8 px-6">
        <BrandLogo size="loader" className="justify-center" />

        <div
          className={cn(
            "h-px w-28 overflow-hidden rounded-full sm:w-32",
            isDark ? "bg-foreground/15" : "bg-ink/10",
          )}
          aria-hidden
        >
          <span className="block h-full w-full origin-left animate-pulse rounded-full bg-gradient-to-r from-transparent via-optic to-transparent" />
        </div>
      </div>
    </div>
  );
}
