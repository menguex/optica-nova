type SectionHeaderProps = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";

  return (
    <header className={`max-w-3xl ${alignClass} ${className}`}>
      <p className="text-xs text-eyebrow">{eyebrow}</p>
      <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-foreground">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-6 max-w-xl text-base text-muted md:text-lg ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
