"use client";

import { motion, type Variants } from "motion/react";
import type { ElementType } from "react";
import { DURATION, EASE_OUT_EXPO } from "./tokens";
import { useReducedMotion } from "./useReducedMotion";

interface TextRevealProps {
  /** The text to animate. Split into words, each masked-in in sequence. */
  text: string;
  /** Heading/element tag to render. Defaults to "span". */
  as?: ElementType;
  /** Seconds between each word. Defaults to 0.06. */
  step?: number;
  /** Delay before the first word. Defaults to 0. */
  delay?: number;
  className?: string;
}

const container = (step: number, delay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: step, delayChildren: delay } },
});

const word: Variants = {
  // Each word sits below an overflow-hidden mask, then slides up into view.
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
  },
};

/**
 * Masked, word-by-word headline reveal — the bold editorial entrance where
 * each word slides up from behind a clipping mask. Each word keeps a
 * non-breaking trailing space so wrapping looks natural.
 *
 * Under `prefers-reduced-motion` the text renders plainly (no mask, no
 * motion) so it stays fully legible and accessible.
 */
export function TextReveal({
  text,
  as = "span",
  step = 0.06,
  delay = 0,
  className = "",
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    const Plain = as as ElementType;
    return <Plain className={className}>{text}</Plain>;
  }

  const Component = motion[as as keyof typeof motion] as typeof motion.span;

  return (
    <Component
      className={className}
      style={{ display: "inline-block" }}
      variants={container(step, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          aria-hidden
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
          }}
        >
          <motion.span variants={word} style={{ display: "inline-block" }}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
