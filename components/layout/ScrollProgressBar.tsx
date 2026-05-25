"use client";

import { useEffect, useState } from "react";
import { useScrollY } from "@/components/providers/ScrollContext";

function getScrollProgress(scrollY: number) {
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) return 0;
  return Math.min(1, Math.max(0, scrollY / maxScroll));
}

export function ScrollProgressBar() {
  const scrollY = useScrollY();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(getScrollProgress(scrollY));
  }, [scrollY]);

  useEffect(() => {
    const onResize = () => setProgress(getScrollProgress(scrollY));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [scrollY]);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[110] h-[3px] bg-line/30"
      role="progressbar"
      aria-label="Progreso de lectura"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <div
        className="h-full w-full origin-left bg-gradient-to-r from-optic via-optic to-cta transition-transform duration-150 ease-out motion-reduce:transition-none"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
