"use client";

import {
  motion,
  type SpringOptions,
  useMotionValue,
  useSpring,
} from "motion/react";
import { type PointerEvent, type ReactNode, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface MagneticButtonProps {
  children: ReactNode;
  /** How far (px) the element drifts toward the cursor at the edge. */
  strength?: number;
  className?: string;
}

const SPRING: SpringOptions = { stiffness: 220, damping: 18, mass: 0.4 };

/**
 * Magnetic hover effect — the element eases toward the cursor while hovered
 * and springs back on leave. A staple of award-style sites for CTAs. Render
 * it as a wrapper around a button/link; it's `display: inline-block` so it
 * hugs its child. Pointer-only (skipped under reduced motion and on devices
 * without a fine pointer, since there's no cursor to chase).
 */
export function MagneticButton({
  children,
  strength = 18,
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  const handleMove = (e: PointerEvent<HTMLSpanElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set((relX / (rect.width / 2)) * strength);
    y.set((relY / (rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  if (reduce) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x: springX, y: springY, display: "inline-block" }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
}
