"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  DURATION,
  EASE_OUT_EXPO,
  Lottie,
  MagneticButton,
  TextReveal,
  useReducedMotion,
} from "@/components/motion";

interface HeroStrings {
  tagline: string;
  shopNow: string;
  newArrivals: string;
  scrollToExplore: string;
  freeShipping: string;
}

interface HeroSectionClientProps {
  basePath: string;
  strings: HeroStrings;
}

/**
 * Hero motion island. Visual design is unchanged from the original
 * (full-bleed brand-red panel, oversized DTHRIFT wordmark, dotted grain,
 * dual CTAs, scroll cue) — motion is layered on:
 *   • the wordmark slides up from behind a clipping mask on load
 *   • the dotted grain drifts on scroll (parallax depth)
 *   • the whole hero content gently lifts + fades as you scroll past it
 *   • CTAs are magnetic and the wordmark is interactive
 *   • the scroll cue is a hand-authored Lottie
 */
export function HeroSectionClient({
  basePath,
  strings,
}: HeroSectionClientProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Content drifts up and fades a touch as the hero scrolls away.
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const grainY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden text-white">
      {/* Background lifestyle image */}
      <Image
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50" />
      {/* Brand-red accent gradient from bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary/30 to-transparent" />

      {/* Subtle grain / vignette for depth — parallax drift */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
          backgroundSize: "22px 22px",
          y: reduce ? 0 : grainY,
        }}
      />

      <motion.div
        className="relative mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-between px-5 pt-28 pb-10 sm:px-8 lg:px-12"
        style={{
          y: reduce ? 0 : contentY,
          opacity: reduce ? 1 : contentOpacity,
        }}
      >
        {/* Top kicker row */}
        <motion.div
          className="flex items-center justify-between text-[0.7rem] font-semibold uppercase tracking-[0.25em] sm:text-xs"
          initial={reduce ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, ease: EASE_OUT_EXPO }}
        >
          <span>Est. 2026 — Worldwide</span>
          <span className="hidden sm:inline">Curated Drops / No Fees</span>
        </motion.div>

        {/* Oversized wordmark headline */}
        <div className="flex flex-1 flex-col justify-center py-10">
          <h1 className="font-display leading-[0.82] tracking-[-0.03em]">
            <span className="block overflow-hidden text-[18vw] sm:text-[16vw] lg:text-[13.5rem]">
              <motion.span
                className="inline-block"
                initial={reduce ? false : { y: "108%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: DURATION.slow,
                  ease: EASE_OUT_EXPO,
                  delay: 0.1,
                }}
                whileHover={reduce ? undefined : { scale: 1.01 }}
              >
                DTHRIFT
                <sup className="ml-1 align-super text-[0.22em] tracking-normal">
                  ™
                </sup>
              </motion.span>
            </span>
          </h1>

          <TextReveal
            as="p"
            text={strings.tagline}
            delay={0.5}
            className="mt-6 max-w-xl text-base font-medium leading-snug sm:text-lg lg:text-xl"
          />

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: DURATION.base,
              ease: EASE_OUT_EXPO,
              delay: 0.7,
            }}
          >
            <MagneticButton>
              <Link
                href={`${basePath}/products`}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-black transition-transform duration-200 hover:scale-[1.03] active:scale-95"
              >
                {strings.shopNow}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href={`${basePath}/products`}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors duration-200 hover:bg-white hover:text-black"
              >
                {strings.newArrivals}
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Bottom scroll cue — Lottie mouse + animated label */}
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.25em] sm:text-xs">
            <Lottie
              src="/lottie/scroll-cue.json"
              trigger="always"
              ariaLabel={strings.scrollToExplore}
              className="h-10 w-6"
            />
            {strings.scrollToExplore}
          </div>
          <div className="hidden text-right text-[0.7rem] font-semibold uppercase tracking-[0.25em] sm:block sm:text-xs">
            {strings.freeShipping}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
