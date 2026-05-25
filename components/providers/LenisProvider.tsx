"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  LenisContext,
  ScrollContext,
  ScrollLockContext,
} from "@/components/providers/ScrollContext";
import { scrollToSection } from "@/lib/scroll";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [scrollY, setScrollY] = useState(0);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const scrollLockCountRef = useRef(0);

  const setScrollLocked = useCallback((locked: boolean) => {
    scrollLockCountRef.current = Math.max(
      0,
      scrollLockCountRef.current + (locked ? 1 : -1),
    );
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (scrollLockCountRef.current > 0) lenis.stop();
    else lenis.start();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const onScroll = () => setScrollY(window.scrollY);

    if (prefersReducedMotion) {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      // Anclas manuales vía NavAnchor + scrollToSection (espera secciones dynamic).
      anchors: false,
    });

    lenisRef.current = lenis;
    setLenis(lenis);
    if (scrollLockCountRef.current > 0) lenis.stop();

    lenis.on("scroll", (instance) => setScrollY(instance.scroll));

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    onScroll();

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    if (!lenis || pathname !== "/") return;

    const hash = window.location.hash;
    if (!hash) return;

    const timer = window.setTimeout(() => {
      scrollToSection(hash.slice(1), { lenis });
    }, 80);

    return () => window.clearTimeout(timer);
  }, [lenis, pathname]);

  return (
    <ScrollLockContext.Provider value={setScrollLocked}>
      <LenisContext.Provider value={lenis}>
        <ScrollContext.Provider value={scrollY}>{children}</ScrollContext.Provider>
      </LenisContext.Provider>
    </ScrollLockContext.Provider>
  );
}
