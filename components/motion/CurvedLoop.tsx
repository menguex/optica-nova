"use client";

import {
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  useMemo,
  useId,
  type PointerEvent,
  type ReactNode,
} from "react";
import "./CurvedLoop.css";

const TEXT_CLASS = "curved-loop-text";

export type CurvedLoopSegment = {
  text: string;
  variant?: "default" | "accent";
};

type CurvedLoopProps = {
  marqueeText?: string;
  segments?: CurvedLoopSegment[];
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: "left" | "right";
  interactive?: boolean;
  variant?: "default" | "marquee";
};

function buildPlainText(marqueeText: string, segments?: CurvedLoopSegment[]) {
  const raw = segments?.length
    ? segments.map((s) => s.text).join("")
    : marqueeText;
  const hasTrailing = /\s|\u00A0$/.test(raw);
  return (hasTrailing ? raw.replace(/\s+$/, "") : raw) + "\u00A0";
}

export default function CurvedLoop({
  marqueeText = "",
  segments,
  speed = 2,
  className = TEXT_CLASS,
  curveAmount = 400,
  direction = "left",
  interactive = true,
  variant = "default",
}: CurvedLoopProps) {
  const text = useMemo(
    () => buildPlainText(marqueeText, segments),
    [marqueeText, segments],
  );

  const measureRef = useRef<SVGTextElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const uid = useId();
  const pathId = `curve-${uid.replace(/:/g, "")}`;
  const pathD = `M-100,40 Q500,${40 + curveAmount} 1540,40`;

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);

  const textLength = spacing;
  const repeatCount = textLength
    ? Math.ceil(1800 / textLength) + 2
    : 1;
  const ready = spacing > 0;

  const measure = () => {
    if (!measureRef.current) return;
    const len = measureRef.current.getComputedTextLength();
    if (len > 0) setSpacing(len);
  };

  useLayoutEffect(() => {
    measure();
    const raf = requestAnimationFrame(measure);
    const t1 = setTimeout(measure, 50);
    const t2 = setTimeout(measure, 200);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [text, className, segments]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [text, className, segments]);

  useEffect(() => {
    if (!spacing) return;
    if (textPathRef.current) {
      const initial = -spacing;
      textPathRef.current.setAttribute("startOffset", `${initial}px`);
      setOffset(initial);
    }
  }, [spacing]);

  useEffect(() => {
    dirRef.current = direction;
  }, [direction]);

  useEffect(() => {
    if (!spacing || !ready) return;
    let frame = 0;
    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === "right" ? speed : -speed;
        const currentOffset = parseFloat(
          textPathRef.current.getAttribute("startOffset") || "0",
        );
        let newOffset = currentOffset + delta;

        const wrapPoint = spacing;
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset > 0) newOffset -= wrapPoint;

        textPathRef.current.setAttribute("startOffset", `${newOffset}px`);
        setOffset(newOffset);
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed, ready]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    dragRef.current = true;
    setIsDragging(true);
    lastXRef.current = e.clientX;
    velRef.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;

    const currentOffset = parseFloat(
      textPathRef.current.getAttribute("startOffset") || "0",
    );
    let newOffset = currentOffset + dx;

    const wrapPoint = spacing;
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;
    if (newOffset > 0) newOffset -= wrapPoint;

    textPathRef.current.setAttribute("startOffset", `${newOffset}px`);
    setOffset(newOffset);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    setIsDragging(false);
    dirRef.current = velRef.current > 0 ? "right" : "left";
  };

  const cursorStyle = interactive
    ? isDragging
      ? "grabbing"
      : "grab"
    : "auto";

  const jacketClass =
    variant === "marquee" ? "curved-loop-jacket--marquee" : "";

  const renderSegmentSpans = (keyPrefix: string) =>
    segments?.map((seg, i) => (
      <tspan
        key={`${keyPrefix}-${i}`}
        className={
          seg.variant === "accent" ? "curved-loop-accent" : "curved-loop-text"
        }
      >
        {seg.text}
      </tspan>
    ));

  const pathContent: ReactNode = segments?.length ? (
    Array.from({ length: repeatCount }, (_, ri) =>
      renderSegmentSpans(`r${ri}`),
    )
  ) : (
    Array(repeatCount).fill(text).join("")
  );

  const fallbackContent = segments?.length
    ? segments.map((seg, i) => (
        <tspan
          key={`f-${i}`}
          className={
            seg.variant === "accent" ? "curved-loop-accent" : "curved-loop-text"
          }
        >
          {seg.text}
        </tspan>
      ))
    : (
      text
    );

  return (
    <div
      className={`curved-loop-jacket ${jacketClass}`}
      style={{
        opacity: ready ? 1 : 0,
        cursor: cursorStyle,
        transition: "opacity 0.3s ease",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg className="curved-loop-svg" viewBox="0 0 1440 120">
        <text
          ref={measureRef}
          className={className}
          xmlSpace="preserve"
          style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
        >
          {text}
        </text>
        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>
        <text fontWeight="bold" xmlSpace="preserve">
          <textPath
            ref={textPathRef}
            href={`#${pathId}`}
            startOffset={ready ? `${offset}px` : "0px"}
            xmlSpace="preserve"
          >
            {ready ? pathContent : fallbackContent}
          </textPath>
        </text>
      </svg>
      <span className="sr-only">{text.trim()}</span>
    </div>
  );
}
