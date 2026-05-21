/**
 * Motion design tokens — the JS mirror of the `--ease-*` / `--duration-*`
 * custom properties declared in `globals.css`. Keeping both in sync means a
 * CSS transition and a Motion (Framer Motion) animation that "feel the same"
 * literally share the same cubic-bezier values.
 *
 * Easing arrays are in the [x1, y1, x2, y2] form Motion expects for
 * `ease`/`transition.ease`.
 */

/** Soft, slightly-overshooting curve — the playful default. */
export const EASE_BRAND = [0.22, 1, 0.36, 1] as const;

/** Apple-style decelerate — long, smooth tail. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Symmetric ease for reversible UI (open/close). */
export const EASE_IN_OUT_SOFT = [0.65, 0, 0.35, 1] as const;

export const DURATION = {
  fast: 0.25,
  base: 0.55,
  slow: 0.9,
} as const;

/** Distance (px) elements travel during enter transitions. */
export const TRAVEL = 40;
