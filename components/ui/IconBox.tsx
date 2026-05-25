import { ICON_STROKE } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type IconBoxProps = {
  icon: LucideIcon;
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "soft" | "solid" | "onDark";
  iconClassName?: string;
  className?: string;
};

const boxSize = {
  sm: "size-9 rounded-xl",
  md: "size-10 rounded-xl",
  lg: "size-12 rounded-2xl",
} as const;

const iconPixel = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
} as const;

const variantClass = {
  soft: "border border-line bg-cream text-optic",
  solid: "bg-optic text-paper",
  onDark: "border border-[rgba(250,248,244,0.2)] bg-[rgba(250,248,244,0.1)] text-on-dark",
} as const;

export function IconBox({
  icon: Icon,
  label,
  size = "md",
  variant = "soft",
  iconClassName,
  className,
}: IconBoxProps) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center",
        boxSize[size],
        variantClass[variant],
        className,
      )}
      aria-hidden={label ? undefined : true}
      title={label}
    >
      <Icon className={cn(iconPixel[size], iconClassName)} strokeWidth={ICON_STROKE} />
    </span>
  );
}
