"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  scrollRunway?: string;
  children?: ReactNode;
}

export function ScrollExpandMedia({
  mediaType = "image",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  scrollRunway = "h-[52vh] sm:h-[62vh]",
  children,
}: ScrollExpandMediaProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [isMobileState, setIsMobileState] = useState(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const runwayRef = useRef<HTMLDivElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const updateProgress = useCallback(() => {
    const section = sectionRef.current;
    const runway = runwayRef.current;
    if (!section || !runway) return;

    const sectionTop = section.getBoundingClientRect().top;
    const runwayHeight = runway.offsetHeight;

    if (runwayHeight <= 0) {
      setScrollProgress(1);
      setShowContent(true);
      return;
    }

    const scrolled = Math.min(Math.max(-sectionTop, 0), runwayHeight);
    const progress = scrolled / runwayHeight;

    setScrollProgress(progress);
    setShowContent(progress >= 0.72);
  }, []);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setScrollProgress(1);
      setShowContent(true);
      return;
    }

    const node = sectionRef.current;
    if (!node) return;

    let rafId = 0;

    const tick = () => {
      updateProgress();
      rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(rafId);
        if (entry.isIntersecting) {
          updateProgress();
          rafId = requestAnimationFrame(tick);
        }
      },
      { rootMargin: "8% 0px 8% 0px", threshold: 0 },
    );

    observer.observe(node);
    updateProgress();
    window.addEventListener("resize", updateProgress);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", updateProgress);
    };
  }, [reducedMotion, updateProgress, mediaType]);

  useEffect(() => {
    const checkIfMobile = () => setIsMobileState(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const mediaWidth = 280 + scrollProgress * (isMobileState ? 520 : 980);
  const mediaHeight = 360 + scrollProgress * (isMobileState ? 180 : 320);
  const textTranslateX = scrollProgress * (isMobileState ? 80 : 72);

  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";

  return (
    <div ref={sectionRef} className="relative overflow-x-hidden bg-background">
      <div className="sticky top-0 z-10 h-[100dvh] w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 - scrollProgress * 0.85 }}
          transition={{ duration: 0.12 }}
        >
          <Image
            src={bgImageSrc}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-paper/35" />
        </motion.div>

        <div className="relative z-10 flex h-full w-full items-center justify-center px-4 sm:px-6">
          <div className="relative flex items-center justify-center">
            <div
              className="relative rounded-2xl transition-none"
              style={{
                width: `${mediaWidth}px`,
                height: `${mediaHeight}px`,
                maxWidth: "min(92vw, 1100px)",
                maxHeight: "min(68vh, 720px)",
                boxShadow: "var(--shadow-float)",
              }}
            >
              {mediaType === "video" ? (
                <div className="pointer-events-none relative h-full w-full">
                  <video
                    src={mediaSrc}
                    poster={posterSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="h-full w-full rounded-xl object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-ink/30"
                    animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                    transition={{ duration: 0.15 }}
                  />
                </div>
              ) : (
                <div className="relative h-full w-full">
                  <Image
                    src={mediaSrc}
                    alt={title || "Contenido visual"}
                    fill
                    className="rounded-xl object-cover"
                    sizes="(max-width: 768px) 92vw, 1100px"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-ink/40"
                    animate={{ opacity: 0.7 - scrollProgress * 0.35 }}
                    transition={{ duration: 0.15 }}
                  />
                </div>
              )}
            </div>

            <div
              className={cn(
                "pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 px-4 text-center sm:gap-2",
                textBlend ? "mix-blend-difference" : "mix-blend-normal",
              )}
            >
              {firstWord && (
                <motion.h2
                  className="font-display text-3xl font-medium tracking-[-0.03em] text-paper sm:text-4xl md:text-5xl lg:text-6xl"
                  style={{ transform: `translateX(-${textTranslateX}px)` }}
                >
                  {firstWord}
                </motion.h2>
              )}
              {restOfTitle && (
                <motion.h2
                  className="font-display text-3xl font-semibold tracking-[-0.03em] text-paper sm:text-4xl md:text-5xl lg:text-6xl"
                  style={{ transform: `translateX(${textTranslateX}px)` }}
                >
                  {restOfTitle}
                </motion.h2>
              )}
            </div>
          </div>
        </div>

        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-1.5 text-center transition-opacity duration-500 sm:bottom-10",
            showContent ? "opacity-0" : "opacity-100",
          )}
        >
          {date && (
            <p className="font-mono text-[10px] tracking-[0.2em] text-paper/90 sm:text-xs">
              {date}
            </p>
          )}
          {scrollToExpand && (
            <p className="text-xs font-medium text-paper/90 sm:text-sm">
              {scrollToExpand}
            </p>
          )}
          <span className="mt-1 block h-6 w-px animate-pulse bg-paper/50" aria-hidden />
        </div>
      </div>

      <div ref={runwayRef} aria-hidden className={cn("w-full", scrollRunway)} />

      <motion.section
        className="relative z-20 mx-auto w-full max-w-container px-6 pb-16 pt-2 md:px-16 md:pb-20"
        initial={{ opacity: 0, y: 16 }}
        animate={{
          opacity: showContent ? 1 : 0,
          y: showContent ? 0 : 16,
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden={!showContent}
      >
        {children}
      </motion.section>
    </div>
  );
}

export default ScrollExpandMedia;
