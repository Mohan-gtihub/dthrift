"use client";

import { Headphones, ShieldCheck, Truck } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { EASE_OUT_EXPO } from "./tokens";
import { useReducedMotion } from "./useReducedMotion";

export type IconName = "truck" | "shield" | "support";

const ICONS = {
  truck: Truck,
  shield: ShieldCheck,
  support: Headphones,
} as const;

/**
 * Per-icon entrance + idle loops. We animate the SVG wrapper (cheap,
 * GPU-friendly) rather than individual paths: the truck rolls in from the
 * left then nudges, the shield pops with a confident overshoot, the
 * headset gives a gentle "listening" tilt. Distinct motion per icon keeps
 * the value strip lively without three bespoke Lottie files.
 */
const MOTION: Record<IconName, Variants> = {
  truck: {
    hidden: { x: -28, opacity: 0 },
    visible: {
      x: [-28, 4, 0],
      opacity: 1,
      transition: { duration: 0.8, ease: EASE_OUT_EXPO },
    },
  },
  shield: {
    hidden: { scale: 0.6, opacity: 0 },
    visible: {
      scale: [0.6, 1.12, 1],
      opacity: 1,
      transition: { duration: 0.7, ease: EASE_OUT_EXPO },
    },
  },
  support: {
    hidden: { rotate: -12, opacity: 0 },
    visible: {
      rotate: [-12, 8, -4, 0],
      opacity: 1,
      transition: { duration: 0.9, ease: EASE_OUT_EXPO },
    },
  },
};

interface AnimatedIconProps {
  name: IconName;
  className?: string;
}

/**
 * Lightweight animated lucide icon. Plays its entrance the first time it
 * scrolls into view; static under `prefers-reduced-motion`.
 */
export function AnimatedIcon({ name, className = "" }: AnimatedIconProps) {
  const reduce = useReducedMotion();
  const Icon = ICONS[name];

  if (reduce) {
    return <Icon className={className} aria-hidden />;
  }

  return (
    <motion.span
      style={{ display: "inline-flex" }}
      variants={MOTION[name]}
      initial="hidden"
      whileInView="visible"
      whileHover={{ scale: 1.08 }}
      viewport={{ once: true, amount: 0.6 }}
    >
      <Icon className={className} aria-hidden />
    </motion.span>
  );
}
