"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

type ContainerScrollProps = {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  cardClassName?: string;
  innerClassName?: string;
  /** Más rotación, escala y recorrido del título */
  intensity?: "default" | "strong";
  /** Oculta el bloque de título animado (usar título estático fuera) */
  hideHeader?: boolean;
};

export function ContainerScroll({
  titleComponent,
  children,
  className,
  cardClassName,
  innerClassName,
  intensity = "default",
  hideHeader = false,
}: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isStrong = intensity === "strong";
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: isStrong ? ["start 0.95", "end 0.05"] : ["start end", "end start"],
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleStart = isStrong
    ? isMobile
      ? 0.68
      : 0.78
    : isMobile
      ? 0.82
      : 1.02;
  const scaleEnd = isStrong || !isMobile ? 1 : 0.96;
  const rotateFrom = isStrong ? 38 : 14;
  const translateEnd = isStrong ? -72 : -80;
  /** La tarjeta queda recta antes de llegar al formulario */
  const settleAt = isStrong ? 0.38 : 0.52;

  const rotate = useTransform(
    scrollYProgress,
    [0, settleAt, 1],
    [rotateFrom, 0, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, settleAt, 1],
    [scaleStart, scaleEnd, scaleEnd],
  );
  const translate = useTransform(
    scrollYProgress,
    [0, settleAt * 0.85, 1],
    [0, translateEnd, translateEnd],
  );
  const heightClass = hideHeader
    ? "h-[28rem] md:h-[34rem]"
    : isStrong
      ? "h-[34rem] md:h-[44rem]"
      : "h-[48rem] md:h-[64rem]";

  return (
    <div
      className={`relative flex ${heightClass} items-center justify-center p-2 md:p-6 ${className ?? ""}`}
      ref={containerRef}
    >
      <div
        className={`relative flex w-full flex-col ${
          hideHeader ? "justify-center py-0" : "py-4 md:py-10"
        } ${isStrong && !hideHeader ? "gap-6 md:gap-8" : ""}`}
        style={{ perspective: isStrong ? "1400px" : "1200px" }}
      >
        {!hideHeader ? (
          <ScrollHeader translate={translate} titleComponent={titleComponent} />
        ) : null}
        <ScrollCard
          rotate={rotate}
          scale={scale}
          className={cardClassName}
          innerClassName={innerClassName}
        >
          {children}
        </ScrollCard>
      </div>
    </div>
  );
}

function ScrollHeader({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="mx-auto max-w-5xl text-center"
    >
      {titleComponent}
    </motion.div>
  );
}

function ScrollCard({
  rotate,
  scale,
  children,
  className,
  innerClassName,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        transformStyle: "preserve-3d",
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className={
        className ??
        "mx-auto -mt-8 h-auto min-h-[28rem] w-full max-w-5xl rounded-[28px] border-4 border-[#6C6C6C] bg-[#222222] p-2 shadow-2xl md:-mt-12 md:min-h-[36rem] md:rounded-[30px] md:p-5"
      }
    >
      <div
        className={
          innerClassName ??
          "h-full w-full overflow-hidden rounded-2xl bg-gray-100 md:rounded-2xl md:p-4"
        }
      >
        {children}
      </div>
    </motion.div>
  );
}
