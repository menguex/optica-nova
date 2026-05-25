import { cn } from "@/lib/utils";

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
  /** default ≈ 896px | wide ≈ 1152px | full ≈ 1280px */
  size?: "default" | "wide" | "full";
};

const sizeClasses = {
  default: "max-w-5xl",
  wide: "max-w-6xl",
  full: "max-w-container",
} as const;

export function PageContainer({
  children,
  className,
  size = "default",
}: PageContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-6 md:px-10", sizeClasses[size], className)}
    >
      {children}
    </div>
  );
}
