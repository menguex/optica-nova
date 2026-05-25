"use client";

import {
  forwardRef,
  useEffect,
  useState,
  type Ref,
} from "react";
import Image, { type ImageProps } from "next/image";
import { motion, useMotionValue, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  galleryPhotos,
  type GalleryPhoto,
  type GalleryPhotoDirection,
} from "@/lib/data/gallery-photos";

type PhotoGalleryProps = {
  animationDelay?: number;
  className?: string;
};

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const photoVariants: Variants = {
  hidden: () => ({
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
  }),
  visible: (custom: { x: string; y: string; order: number }) => ({
    x: custom.x,
    y: custom.y,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 12,
      mass: 1,
      delay: custom.order * 0.15,
    },
  }),
};

function getRandomNumberInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const MotionImage = motion(
  forwardRef(function MotionImage(
    { alt = "", ...props }: ImageProps,
    ref: Ref<HTMLImageElement>,
  ) {
    return <Image ref={ref} alt={alt} {...props} />;
  }),
);

function scalePx(value: string, scale: number) {
  const num = parseFloat(value);
  if (Number.isNaN(num)) return value;
  return `${num * scale}px`;
}

function useSpreadScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setScale(0.38);
      else if (w < 768) setScale(0.55);
      else if (w < 1024) setScale(0.75);
      else setScale(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return scale;
}

type PhotoProps = {
  src: string;
  alt: string;
  className?: string;
  direction?: GalleryPhotoDirection;
  width: number;
  height: number;
};

function Photo({
  src,
  alt,
  className,
  direction = "right",
  width,
  height,
}: PhotoProps) {
  const [rotation, setRotation] = useState(0);
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  useEffect(() => {
    const randomRotation =
      getRandomNumberInRange(1, 4) * (direction === "left" ? -1 : 1);
    setRotation(randomRotation);
  }, [direction]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  const resetMouse = () => {
    x.set(200);
    y.set(200);
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.12, zIndex: 9999 }}
      whileHover={{
        scale: 1.08,
        rotateZ: 2 * (direction === "left" ? -1 : 1),
        zIndex: 9999,
      }}
      whileDrag={{ scale: 1.08, zIndex: 9999 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      style={{
        width,
        height,
        zIndex: 1,
        userSelect: "none",
        touchAction: "none",
      }}
      className={cn(
        className,
        "relative mx-auto shrink-0 cursor-grab active:cursor-grabbing",
      )}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      draggable={false}
      tabIndex={0}
    >
      <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-float">
        <MotionImage
          className="rounded-3xl object-cover"
          fill
          src={src}
          alt={alt}
          sizes="220px"
          draggable={false}
        />
      </div>
    </motion.div>
  );
}

export function PhotoGallery({
  animationDelay = 0.35,
  className,
}: PhotoGalleryProps) {
  const spreadScale = useSpreadScale();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      setIsLoaded(true);
      return;
    }

    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay * 1000);

    const animationTimer = setTimeout(
      () => {
        setIsLoaded(true);
      },
      (animationDelay + 0.4) * 1000,
    );

    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(animationTimer);
    };
  }, [animationDelay]);

  return (
    <div className={cn("relative w-full", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-8 -z-10 mx-auto hidden h-[280px] max-w-4xl bg-transparent opacity-30 md:block md:bg-[linear-gradient(to_right,var(--nova-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--nova-line)_1px,transparent_1px)] md:bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
      />

      <div className="relative flex h-[300px] w-full items-center justify-center sm:h-[340px] md:h-[380px]">
        <motion.div
          className="relative mx-auto flex w-full max-w-7xl justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="relative flex w-full justify-center"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <div className="relative h-[200px] w-[200px] sm:h-[220px] sm:w-[220px]">
              {[...galleryPhotos].reverse().map((photo: GalleryPhoto) => (
            <motion.div
              key={photo.id}
              className="absolute left-0 top-0"
              style={{ zIndex: photo.zIndex }}
              variants={photoVariants}
              custom={{
                x: scalePx(photo.x, spreadScale),
                y: scalePx(photo.y, spreadScale),
                order: photo.order,
              }}
            >
              <Photo
                width={spreadScale < 1 ? 160 : 200}
                height={spreadScale < 1 ? 160 : 200}
                src={photo.src}
                alt={photo.alt}
                direction={photo.direction}
                className={
                  spreadScale < 1
                    ? "h-[160px] w-[160px] sm:h-[220px] sm:w-[220px]"
                    : "sm:h-[220px] sm:w-[220px]"
                }
              />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
