"use client";

import { type MotionValue, useScroll } from "motion/react";
import { type ReactNode, useRef } from "react";

interface PinnedProps {
  /**
   * Render-prop receiving a 0→1 `MotionValue` for the section's scroll
   * progress while it's pinned. Feed it into `useTransform` to scrub any
   * property (opacity, x, scale, color…).
   */
  children: (progress: MotionValue<number>) => ReactNode;
  /**
   * Scroll distance the section stays pinned, as a multiple of the viewport
   * height. 2 = the inner content is pinned for two screens of scrolling.
   */
  height?: number;
  className?: string;
}

/**
 * Pinned scroll-scrub container — the Apple-style "section sticks while a
 * sequence plays out, then releases." A tall outer track reserves the scroll
 * distance; an inner `sticky top-0 h-screen` layer stays put and receives a
 * normalized progress value so children can scrub their own animation.
 *
 * Reduced motion is handled by the children (the scrub simply won't be
 * perceived as motion if they map progress to static end-states); the layout
 * itself is plain CSS sticky and safe.
 */
export function Pinned({ children, height = 2, className = "" }: PinnedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={ref}
      className={className}
      style={{ height: `${height * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {children(scrollYProgress)}
      </div>
    </div>
  );
}
