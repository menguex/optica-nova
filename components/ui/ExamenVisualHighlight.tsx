import { cn } from "@/lib/utils";

type ExamenVisualHighlightProps = {
  className?: string;
};

/** Caja clara fija — contraste alto sobre fondos oscuros y claros */
export function ExamenVisualHighlight({ className }: ExamenVisualHighlightProps) {
  return (
    <span
      className={cn(
        "inline-block max-w-[min(100%,20rem)] rounded-lg bg-surface-light px-3 py-1.5 text-left font-semibold leading-[1.1] tracking-[-0.02em] text-on-light shadow-float",
        "sm:max-w-none sm:rounded-xl sm:px-4 sm:py-2 md:px-5 md:py-2.5",
        className,
      )}
    >
      examen visual.
    </span>
  );
}
