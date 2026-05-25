"use client";

import CurvedLoop from "@/components/motion/CurvedLoop";
import { heroMarqueeSegments } from "@/lib/data/hero-marquee";

export function HeroCurvedBrands() {
  return (
    <CurvedLoop
      variant="marquee"
      segments={heroMarqueeSegments}
      speed={2}
      curveAmount={280}
      direction="right"
      interactive
    />
  );
}
