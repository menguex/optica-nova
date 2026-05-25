"use client";

import Image from "next/image";
import { useState } from "react";
import { IconBox } from "@/components/ui/IconBox";
import { whyUsIconMap } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type AccordionItemData = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
};

type AccordionItemProps = {
  item: AccordionItemData;
  isActive: boolean;
  onActivate: () => void;
};

function AccordionItem({ item, isActive, onActivate }: AccordionItemProps) {
  return (
    <button
      type="button"
      aria-expanded={isActive}
      onClick={onActivate}
      onFocus={onActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate();
        }
      }}
      className={cn(
        "relative z-0 isolate h-[380px] max-h-[min(72vh,450px)] shrink-0 overflow-hidden rounded-2xl border-0 p-0 text-left transition-all duration-700 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-optic sm:h-[420px] md:h-[450px]",
        isActive ? "w-[min(68vw,400px)] sm:w-[340px] md:w-[400px]" : "w-[56px] sm:w-[60px]",
      )}
    >
      <Image
        src={item.imageUrl}
        alt={item.imageAlt}
        fill
        className="object-cover object-center"
        sizes={isActive ? "400px" : "60px"}
      />
      <div
        className={cn(
          "absolute inset-0 transition-colors duration-500",
          isActive ? "bg-ink/45" : "bg-ink/55",
        )}
      />

      {isActive ? (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/90 to-ink/20 p-6 pt-20">
          <IconBox
            icon={whyUsIconMap[item.id as keyof typeof whyUsIconMap]}
            size="md"
            variant="onDark"
            className="mb-4"
          />
          <p className="font-display text-xl font-semibold text-on-dark sm:text-2xl">
            {item.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-on-dark-secondary">
            {item.description}
          </p>
        </div>
      ) : (
        <span className="absolute bottom-24 left-1/2 w-max max-w-[220px] -translate-x-1/2 rotate-90 whitespace-nowrap text-base font-semibold text-on-dark [text-shadow:0_1px_8px_rgba(10,10,11,0.85)] sm:text-lg">
          {item.title}
        </span>
      )}
    </button>
  );
}

type InteractiveImageAccordionProps = {
  items: readonly AccordionItemData[];
  defaultActiveIndex?: number;
  className?: string;
};

export function InteractiveImageAccordion({
  items,
  defaultActiveIndex = 0,
  className,
}: InteractiveImageAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

  return (
    <div
      className={cn(
        "flex flex-row items-stretch justify-center gap-3 overflow-x-auto pb-2 sm:gap-4",
        className,
      )}
    >
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          item={item}
          isActive={index === activeIndex}
          onActivate={() => setActiveIndex(index)}
        />
      ))}
    </div>
  );
}
