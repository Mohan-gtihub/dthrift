"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { type ReactNode, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface ParallaxProps {
  children: ReactNode;
  /**
   * Travel distance in px across the element's scroll through the viewport.
   * Positive = moves up as you scroll down (classic parallax). Defaults 60.
   */
  speed?: number;
  /** Animate scale alongside translation for a depth effect. */
  scale?: boolean;
  className?: string;
}

/**
 * Scroll-linked parallax. Maps the element's progress through the viewport
 * to a vertical translate (and optional scale), giving the Apple-style sense
 * of layered depth. Uses Motion's `useScroll` (rAF-batched, no manual scroll
 * listeners). No-ops under `prefers-reduced-motion`.
 */
export function Parallax({
  children,
  speed = 60,
  scale = false,
  className = "",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const s = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1, 1.04]);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y, scale: scale ? s : undefined, willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}
