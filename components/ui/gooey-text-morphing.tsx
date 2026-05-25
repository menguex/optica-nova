"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
}

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName,
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);
  const filterId = React.useId().replace(/:/g, "");

  React.useEffect(() => {
    if (texts.length === 0) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      if (text1Ref.current) {
        text1Ref.current.textContent = texts[0];
        text1Ref.current.style.opacity = "100%";
        text1Ref.current.style.filter = "";
      }
      if (text2Ref.current) {
        text2Ref.current.textContent = "";
        text2Ref.current.style.opacity = "0%";
      }
      return;
    }

    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;
    let frameId = 0;
    let cancelled = false;

    const setMorph = (fraction: number) => {
      if (!text1Ref.current || !text2Ref.current) return;

      text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      const inverse = 1 - fraction;
      text1Ref.current.style.filter = `blur(${Math.min(8 / inverse - 8, 100)}px)`;
      text1Ref.current.style.opacity = `${Math.pow(inverse, 0.4) * 100}%`;
    };

    const doCooldown = () => {
      morph = 0;
      if (!text1Ref.current || !text2Ref.current) return;

      text2Ref.current.style.filter = "";
      text2Ref.current.style.opacity = "100%";
      text1Ref.current.style.filter = "";
      text1Ref.current.style.opacity = "0%";
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    };

    const animate = () => {
      if (cancelled) return;

      frameId = requestAnimationFrame(animate);
      const newTime = new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;

      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length;
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length];
            text2Ref.current.textContent =
              texts[(textIndex + 1) % texts.length];
          }
        }
        doMorph();
      } else {
        doCooldown();
      }
    };

    if (text1Ref.current && text2Ref.current) {
      text1Ref.current.textContent = texts[textIndex % texts.length];
      text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
    }

    animate();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
    };
  }, [texts, morphTime, cooldownTime]);

  if (texts.length === 0) return null;

  return (
    <div
      className={cn("relative w-full", className)}
      aria-live="polite"
      aria-atomic="true"
    >
      <svg className="absolute h-0 w-0" aria-hidden focusable="false">
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className={cn(
          "relative flex min-h-[3.5rem] w-full items-center md:min-h-[4.5rem]",
          textClassName?.includes("text-left")
            ? "justify-start"
            : "justify-center",
        )}
        style={{ filter: `url(#${filterId})` }}
      >
        <span
          ref={text1Ref}
          className={cn(
            "absolute inline-block w-full select-none text-center",
            textClassName,
          )}
        />
        <span
          ref={text2Ref}
          className={cn(
            "absolute inline-block w-full select-none text-center",
            textClassName,
          )}
        />
      </div>
    </div>
  );
}
