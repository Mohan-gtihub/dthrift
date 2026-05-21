import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion";

interface BrandStoryProps {
  basePath: string;
  locale: string;
}

/**
 * Full-bleed brand story / about section with a large background image,
 * video embed placeholder, and overlaid copy. Creates a cinematic break
 * between product sections.
 */
export async function BrandStory({ basePath, locale }: BrandStoryProps) {
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "home",
  });

  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80"
          alt="Brand story background"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative mx-auto flex min-h-[70vh] max-w-[1600px] flex-col items-center justify-center px-5 py-24 text-center text-white sm:px-8 sm:py-32 lg:px-12">
        <Reveal>
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.3em] text-primary">
            {t("ourStoryLabel")}
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mx-auto max-w-4xl text-4xl leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
            {t("brandStoryHeadline")}
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {t("brandStoryBody")}
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href={`${basePath}/products`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-black transition-transform duration-200 hover:scale-[1.03] active:scale-95"
            >
              {t("shopNow")}
            </Link>
            <Link
              href={`${basePath}/products`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors duration-200 hover:bg-white hover:text-black"
            >
              {t("viewAll")} &rarr;
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
