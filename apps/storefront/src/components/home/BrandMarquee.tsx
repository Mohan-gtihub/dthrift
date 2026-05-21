/**
 * Infinite scrolling brand ticker — a streetwear-store signature.
 * Pure CSS animation (no JS), duplicated track for a seamless loop,
 * and pauses on hover. Respects prefers-reduced-motion.
 */
const ITEMS = [
  "NEW DROPS",
  "FREE WORLDWIDE SHIPPING",
  "LIMITED STOCK",
  "NO PLATFORM FEES",
  "CURATED SELECTION",
  "MEMBERS GET MORE",
];

export function BrandMarquee() {
  // Two identical tracks sit side by side; translating the pair by -50%
  // lands the second copy exactly where the first started — seamless.
  const track = [...ITEMS, ...ITEMS];

  return (
    <div className="group overflow-hidden border-y-2 border-black bg-black py-4 text-white">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] group-hover:paused motion-reduce:animate-none">
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center font-display text-2xl uppercase tracking-tight sm:text-3xl"
          >
            {item}
            <span className="mx-6 text-primary sm:mx-8">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
