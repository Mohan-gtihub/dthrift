"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { DURATION, EASE_OUT_EXPO, TRAVEL } from "./tokens";
import { useReducedMotion } from "./useReducedMotion";

type Direction = "up" | "down" | "left" | "right" | "scale" | "none";

interface RevealProps {
  children: ReactNode;
  /** Animation entry direction. Defaults to "up". */
  direction?: Direction;
  /** Delay in ms before the transition starts (for staggering). */
  delay?: number;
  /** Add a subtle blur-in for a softer, more premium reveal. */
  blur?: boolean;
  /** Animate only the first time it enters view. Defaults to true. */
  once?: boolean;
  /** Fraction of the element that must be visible to trigger (0–1). */
  amount?: number;
  /** Extra classes on the wrapper. */
  className?: string;
}

const OFFSET: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: TRAVEL },
  down: { y: -TRAVEL },
  left: { x: TRAVEL },
  right: { x: -TRAVEL },
  scale: { scale: 0.94 },
  none: {},
};

/**
 * Scroll-reveal wrapper — the "scroll into view" motion. Elements start
 * hidden + offset and animate into place the first time they enter the
 * viewport. Built on Motion's `whileInView` (which uses IntersectionObserver
 * under the hood, so it's cheap and listener-free) and collapses to an
 * instant, offset-free render under `prefers-reduced-motion`.
 *
 * API-compatible with the original `ui/Reveal` so existing usages keep
 * working; `blur`, `once`, and `amount` are additive.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  blur = false,
  once = true,
  amount = 0.2,
  className = "",
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const offset = OFFSET[direction];
  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x ?? 0,
      y: offset.y ?? 0,
      scale: offset.scale ?? 1,
      filter: blur ? "blur(8px)" : "blur(0px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: DURATION.base,
        ease: EASE_OUT_EXPO,
        delay: delay / 1000,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  );
}
