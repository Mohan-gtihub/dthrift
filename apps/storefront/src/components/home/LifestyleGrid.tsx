import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion";

interface LifestyleGridProps {
  basePath: string;
  locale: string;
}

const LIFESTYLE_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    alt: "Street style fashion",
    span: "md:col-span-1 md:row-span-2",
    aspect: "aspect-[3/4]",
  },
  {
    src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
    alt: "Minimalist fashion",
    span: "md:col-span-1",
    aspect: "aspect-square",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
    alt: "Urban streetwear",
    span: "md:col-span-1",
    aspect: "aspect-square",
  },
  {
    src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    alt: "Bold sneakers",
    span: "md:col-span-2",
    aspect: "aspect-[2/1]",
  },
] as const;

/**
 * Instagram-style lifestyle image grid. Masonry-inspired layout with
 * varying aspect ratios to feel editorial and curated.
 */
export async function LifestyleGrid({ basePath, locale }: LifestyleGridProps) {
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "home",
  });

  return (
    <section className="bg-black py-16 sm:py-24">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="mb-10 flex items-end justify-between border-b border-white/20 pb-5">
            <div>
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.25em] text-primary">
                @DTHRIFT
              </span>
              <h2 className="text-3xl tracking-tight text-white sm:text-5xl">
                {t("lifestyleTitle")}
              </h2>
            </div>
            <Link
              href={`${basePath}/products`}
              className="shrink-0 text-xs font-bold uppercase tracking-widest text-white underline-offset-4 hover:underline sm:text-sm"
            >
              {t("shopTheLook")} &rarr;
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:grid-rows-2 lg:gap-4">
          {LIFESTYLE_IMAGES.map((img, i) => (
            <Reveal key={img.src} delay={i * 80}>
              <Link
                href={`${basePath}/products`}
                className={`group relative block overflow-hidden rounded-xl ${img.span} ${img.aspect}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-black">
                    {t("shopNow")}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
