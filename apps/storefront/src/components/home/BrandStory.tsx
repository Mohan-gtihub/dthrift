import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion";
import { BLUR_DARK } from "@/lib/blur";
import { BrandStoryClient } from "./BrandStoryClient";

interface BrandStoryProps {
  basePath: string;
  locale: string;
}

/**
 * Full-bleed brand story section. Split layout: left side has the editorial
 * copy with Lottie accents, right side features a large lifestyle image.
 * Creates a premium magazine-style break between product sections.
 */
export async function BrandStory({ basePath, locale }: BrandStoryProps) {
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "home",
  });

  return (
    <section className="relative overflow-hidden bg-black">
      <div className="mx-auto grid min-h-[80vh] max-w-[1600px] grid-cols-1 lg:grid-cols-2">
        {/* Left: Editorial copy + Lottie accents */}
        <div className="relative flex flex-col justify-center px-5 py-20 sm:px-8 sm:py-28 lg:px-16 lg:py-32">
          {/* Decorative grid pattern */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative">
            <Reveal>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-primary" />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                  {t("ourStoryLabel")}
                </span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="max-w-xl text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {t("brandStoryHeadline")}
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
                {t("brandStoryBody")}
              </p>
            </Reveal>

            {/* Lottie stat pills */}
            <Reveal delay={300}>
              <BrandStoryClient />
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href={`${basePath}/products`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-black transition-transform duration-200 hover:scale-[1.03] active:scale-95"
                >
                  {t("shopNow")}
                </Link>
                <Link
                  href={`${basePath}/products`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-black"
                >
                  {t("viewAll")} &rarr;
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right: Lifestyle image mosaic */}
        <div className="relative hidden lg:block">
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2 p-2">
            <div className="relative overflow-hidden rounded-xl bg-neutral-800">
              <Image
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&q=80"
                alt="Curated fashion store"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="25vw"
                placeholder="blur"
                blurDataURL={BLUR_DARK}
              />
            </div>
            <div className="relative overflow-hidden rounded-xl bg-neutral-800">
              <Image
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80"
                alt="Fashion details"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="25vw"
                placeholder="blur"
                blurDataURL={BLUR_DARK}
              />
            </div>
            <div className="relative col-span-2 overflow-hidden rounded-xl bg-neutral-800">
              <Image
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80"
                alt="Brand lifestyle"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="50vw"
                placeholder="blur"
                blurDataURL={BLUR_DARK}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
          {/* Fade edge into the black bg */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent" />
        </div>

        {/* Mobile: single hero image */}
        <div className="relative aspect-[4/3] bg-neutral-800 lg:hidden">
          <Image
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80"
            alt="Curated fashion store"
            fill
            className="object-cover"
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR_DARK}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
