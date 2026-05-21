"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { DURATION, EASE_OUT_EXPO } from "./tokens";
import { useReducedMotion } from "./useReducedMotion";

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Route-change enter transition. Keying the wrapper on `pathname` remounts
 * it on navigation, replaying the enter animation — a soft fade-and-rise that
 * makes client navigations feel intentional rather than abrupt. We animate
 * enter-only (no exit) because the App Router unmounts the old tree before we
 * could play one, and a fake exit would just delay the new page.
 *
 * No-ops under `prefers-reduced-motion`.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  // Opacity-only (no transform): a `transform` on this wrapper would create a
  // containing block that breaks `position: sticky` descendants like the
  // pinned ScrollStatement. A clean cross-fade keeps navigations smooth
  // without that side effect.
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DURATION.fast, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}
