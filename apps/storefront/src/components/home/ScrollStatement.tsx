"use client";

import { type MotionValue, motion, useTransform } from "motion/react";
import { Pinned, useReducedMotion } from "@/components/motion";

interface ScrollStatementProps {
  /** Three short words/lines that reveal in sequence. */
  lines?: [string, string, string];
}

/**
 * Pinned scroll-scrub statement — the cinematic "Apple moment". The section
 * sticks to the viewport for ~2.5 screens while three oversized words scrub
 * in and out, a brand-red wash sweeps across, and the type drifts on a
 * subtle horizontal parallax. Pure scroll-driven; nothing autoplays.
 *
 * Under reduced motion it renders a single static stacked statement (no pin,
 * no scrub) so the message still lands without movement.
 */
export function ScrollStatement({
  lines = ["CURATED.", "NOT", "MASS-PRODUCED."],
}: ScrollStatementProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <section className="bg-black py-24 text-center text-background">
        <p className="font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl">
          {lines.join(" ")}
        </p>
      </section>
    );
  }

  return (
    <Pinned height={2.6} className="bg-black text-background">
      {(progress) => <Inner progress={progress} lines={lines} />}
    </Pinned>
  );
}

function Inner({
  progress,
  lines,
}: {
  progress: MotionValue<number>;
  lines: [string, string, string];
}) {
  // Red wash sweeps up from the bottom across the middle of the scroll.
  const washY = useTransform(progress, [0, 0.5, 1], ["100%", "0%", "-12%"]);
  // Whole stack drifts left a touch for parallax life.
  const stackX = useTransform(progress, [0, 1], [40, -40]);

  return (
    <div className="relative h-full w-full">
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-primary"
        style={{ y: washY }}
      />
      <motion.div
        className="relative flex h-full flex-col items-center justify-center gap-1 px-5 text-center mix-blend-difference"
        style={{ x: stackX }}
      >
        {lines.map((line, i) => (
          <Line key={line} progress={progress} index={i} total={lines.length}>
            {line}
          </Line>
        ))}
      </motion.div>
    </div>
  );
}

function Line({
  progress,
  index,
  total,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  children: string;
}) {
  // Each line owns a slice of the scroll: fades/slides in, holds, eases out.
  const start = (index / total) * 0.6;
  const opacity = useTransform(
    progress,
    [start, start + 0.12, start + 0.4, start + 0.55],
    [0, 1, 1, 0.25],
  );
  const y = useTransform(
    progress,
    [start, start + 0.12, start + 0.55],
    [60, 0, -40],
  );

  return (
    <motion.span
      className="block font-display text-[14vw] leading-[0.9] tracking-tight text-white sm:text-[10vw] lg:text-[8.5rem]"
      style={{ opacity, y }}
    >
      {children}
    </motion.span>
  );
}
