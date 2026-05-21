"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

/**
 * Reactive `prefers-reduced-motion` flag. Unlike a one-shot read in an
 * effect, this updates live if the user toggles the OS setting, and it's
 * SSR-safe (server snapshot is always `false`, so the first client paint
 * matches the server and there's no hydration mismatch). Motion ships its
 * own `useReducedMotion`, but a `useSyncExternalStore` version keeps our
 * non-Motion primitives (CSS-only) consistent with the same source.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
