"use client";

import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { heroGooeyTexts } from "@/lib/data/hero-gooey-texts";

export function HeroTitleMorph() {
  return (
    <div className="w-full max-w-[13ch] sm:max-w-[14ch]">
      <p className="sr-only">{heroGooeyTexts.join(". ")}</p>
      <GooeyText
        texts={[...heroGooeyTexts]}
        morphTime={2.2}
        cooldownTime={1.35}
        className="min-h-[clamp(7.5rem,22vw,12rem)] w-full items-start justify-start"
        textClassName="whitespace-pre-line text-balance font-display text-left text-[clamp(2.1rem,6.5vw,5.75rem)] font-medium leading-[0.98] tracking-[-0.04em] text-ink"
      />
    </div>
  );
}
