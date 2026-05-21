/**
 * Tiny base64 blur placeholders for `next/image` (`placeholder="blur"`).
 *
 * Remote images (Unsplash editorial shots, Spree product photos) are
 * lazy-loaded and optimized on demand, so they can pop in late. Pairing them
 * with a `blurDataURL` makes them fade in from a soft preview instead of
 * flashing the container's background — which on the dark (`bg-black`)
 * sections previously read as solid-black voids until the image arrived.
 *
 * `BLUR_LIGHT` suits light/neutral surfaces; `BLUR_DARK` blends into the
 * black editorial sections (LifestyleGrid, BrandStory, ScrollStatement).
 */
export const BLUR_LIGHT =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIjZTVlNWU1Ii8+PC9zdmc+";

export const BLUR_DARK =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIjMjYyNjI2Ii8+PC9zdmc+";
