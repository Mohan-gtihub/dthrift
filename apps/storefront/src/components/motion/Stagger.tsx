"use client";

import { motion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { DURATION, EASE_OUT_EXPO, TRAVEL } from "./tokens";
import { useReducedMotion } from "./useReducedMotion";

interface StaggerProps {
  children: ReactNode;
  /** Seconds between each child's entrance. Defaults to 0.08. */
  step?: number;
  /** Delay before the first child animates. Defaults to 0. */
  delay?: number;
  amount?: number;
  className?: string;
  /** Render element for the container. Defaults to "div". */
  as?: ElementType;
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

const containerVariants = (step: number, delay: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: step, delayChildren: delay },
  },
});

const itemVariants: Variants = {
  hidden: { opacity: 0, y: TRAVEL * 0.6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
  },
};

/**
 * Orchestrated list reveal. Wrap a group in `<Stagger>` and each direct
 * `<Stagger.Item>` animates in sequence as the group scrolls into view —
 * the cascading "cards fly in one after another" effect. Children that
 * aren't `Stagger.Item` still render but won't be individually animated.
 *
 * Under `prefers-reduced-motion` everything renders statically.
 */
export function Stagger({
  children,
  step = 0.08,
  delay = 0,
  amount = 0.15,
  className = "",
  as = "div",
}: StaggerProps) {
  const reduce = useReducedMotion();
  const Component = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduce) {
    const Plain = as as ElementType;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Component
      className={className}
      variants={containerVariants(step, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({ children, className = "", as = "div" }: StaggerItemProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Plain = as as ElementType;
    return <Plain className={className}>{children}</Plain>;
  }

  const Component = motion[as as keyof typeof motion] as typeof motion.div;
  return (
    <Component className={className} variants={itemVariants}>
      {children}
    </Component>
  );
}

Stagger.Item = StaggerItem;
