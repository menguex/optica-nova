import Image from "next/image";
import { brand } from "@/lib/data/brand";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  size?: "nav" | "footer" | "loader";
};

const sizeClasses = {
  nav: "h-10 max-w-[9.5rem] w-auto sm:h-11 sm:max-w-[11rem] md:h-14 md:max-w-[13rem] lg:h-16",
  footer: "h-20 w-auto max-w-[16rem] md:h-24 md:max-w-[18rem]",
  loader:
    "h-[4.5rem] w-auto max-w-[15rem] sm:h-24 sm:max-w-[17rem] md:h-28 md:max-w-[19rem]",
} as const;

export function BrandLogo({ className, size = "nav" }: BrandLogoProps) {
  return (
    <span className={cn("inline-flex shrink-0 items-center", className)}>
      <Image
        src={brand.logo.src}
        alt={brand.name}
        width={brand.logo.width}
        height={brand.logo.height}
        unoptimized
        priority={size === "nav" || size === "loader"}
        className={cn(
          "object-contain transition-[filter] duration-500 ease-luxury",
          /* Modo oscuro: logo claro con ligera luminosidad para contraste en nav/footer */
          "dark:brightness-0 dark:invert dark:contrast-110",
          "dark:drop-shadow-[0_0_20px_rgba(168,212,245,0.2)]",
          size === "loader" ? "object-center" : "object-left",
          sizeClasses[size],
        )}
        sizes={
          size === "footer" ? "280px" : size === "loader" ? "320px" : "200px"
        }
      />
    </span>
  );
}
