import Image from "next/image";
import { professionalProfile } from "@/lib/data/professional";
import { cn } from "@/lib/utils";

const { photo } = professionalProfile;

type ProfessionalPhotoProps = {
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Fondo claro (tarjeta) u oscuro (cabecera del modal) */
  tone?: "light" | "dark";
  /** Rellena el contenedor padre (debe ser `relative` con tamaño fijo) */
  fill?: boolean;
};

function ProfessionalPhotoPlaceholder({
  alt,
  className,
  fill,
  initials,
  tone = "light",
}: {
  alt: string;
  className?: string;
  fill?: boolean;
  initials: string;
  tone?: "light" | "dark";
}) {
  const shell = cn(
    "flex items-center justify-center",
    fill && "absolute inset-0 h-full w-full",
    tone === "dark"
      ? "bg-[color-mix(in_srgb,var(--prof-header-fg,#faf8f4)_14%,transparent)] text-[var(--prof-header-fg,#faf8f4)]"
      : "bg-gradient-to-br from-optic/15 via-cream to-optic/25 text-optic",
    className,
  );

  return (
    <div className={shell} role="img" aria-label={alt}>
      <span
        className={cn(
          "font-display font-semibold leading-none tracking-[-0.04em]",
          fill ? "text-[1.65rem] sm:text-3xl" : "text-2xl",
        )}
      >
        {initials}
      </span>
    </div>
  );
}

export function ProfessionalPhoto({
  className,
  imageClassName,
  sizes = "(max-width: 768px) 96px, 192px",
  priority = false,
  tone = "light",
  fill = false,
}: ProfessionalPhotoProps) {
  if (!photo.src) {
    return (
      <ProfessionalPhotoPlaceholder
        alt={photo.alt}
        className={className}
        fill={fill}
        initials={photo.initials}
        tone={tone}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        unoptimized
        priority={priority}
        sizes={sizes}
        className={cn("object-cover object-[center_18%]", imageClassName, className)}
      />
    );
  }

  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      unoptimized
      priority={priority}
      sizes={sizes}
      className={cn("object-cover object-[center_18%]", imageClassName, className)}
    />
  );
}
