"use client";

import { Lottie } from "@/components/motion";

const STATS = [
  {
    lottie: "/lottie/quality-check.json",
    value: "100%",
    label: "Curated Quality",
  },
  {
    lottie: "/lottie/globe-spin.json",
    value: "50+",
    label: "Countries Shipped",
  },
  {
    lottie: "/lottie/heart-beat.json",
    value: "10K+",
    label: "Happy Customers",
  },
];

/**
 * Animated stat pills with Lottie icons. Client component so the
 * Lottie player can mount and play.
 */
export function BrandStoryClient() {
  return (
    <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="group flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-5 text-center backdrop-blur-sm transition-colors duration-300 hover:border-primary/40 hover:bg-white/[0.06] sm:px-5 sm:py-6"
        >
          <Lottie
            src={stat.lottie}
            trigger="view"
            className="size-10 sm:size-12"
            ariaLabel={stat.label}
          />
          <span className="font-display text-xl text-primary sm:text-2xl">
            {stat.value}
          </span>
          <span className="text-[0.65rem] font-medium uppercase tracking-widest text-white/50 sm:text-xs">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
