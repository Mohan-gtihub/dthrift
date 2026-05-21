"use client";

import nextDynamic from "next/dynamic";
import { type CSSProperties, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * dotLottie player, dynamically imported so the runtime (~kb of WASM/JS) is
 * never part of the server bundle and never blocks first paint / LCP. It only
 * downloads once a `<Lottie>` actually mounts on the client.
 */
const DotLottieReact = nextDynamic(
  () => import("@lottiefiles/dotlottie-react").then((m) => m.DotLottieReact),
  { ssr: false },
);

interface LottieProps {
  /** Path to a `.lottie` or `.json` asset (e.g. "/lottie/cart.lottie"). */
  src: string;
  /** Loop the animation. Defaults to true. */
  loop?: boolean;
  /**
   * "view" (default) — play once the element scrolls into view, pausing
   * when off-screen to save CPU. "always" — autoplay immediately.
   * "hover" — only play while hovered (set via `playing` from the parent).
   */
  trigger?: "view" | "always";
  /** Accessible label; the canvas is otherwise decorative. */
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Reduced-motion-safe Lottie wrapper. Lazy-loads the player, plays only
 * while in view by default (IntersectionObserver), and — crucially — renders
 * a static first frame (autoplay off, loop off) when the user prefers reduced
 * motion, so the artwork is still shown but never animates.
 */
export function Lottie({
  src,
  loop = true,
  trigger = "view",
  ariaLabel,
  className = "",
  style,
}: LottieProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(trigger === "always");

  const observe = (node: HTMLDivElement | null) => {
    ref.current = node;
    if (!node || trigger !== "view" || inView) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
  };

  const shouldAutoplay = !reduce && inView;

  return (
    <div
      ref={observe}
      className={className}
      style={style}
      role="img"
      aria-label={ariaLabel}
    >
      {(inView || reduce) && (
        <DotLottieReact
          src={src}
          loop={reduce ? false : loop}
          autoplay={shouldAutoplay}
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
}
