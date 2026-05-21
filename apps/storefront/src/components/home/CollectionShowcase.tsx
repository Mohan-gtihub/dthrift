import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion";

interface CollectionShowcaseProps {
  basePath: string;
  locale: string;
}

/**
 * Two-up editorial collection showcase with large lifestyle images.
 * Left: tall hero image with overlaid text. Right: stacked duo.
 */
export async function CollectionShowcase({
  basePath,
  locale,
}: CollectionShowcaseProps) {
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "home",
  });

  return (
    <section className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <Reveal>
        <div className="mb-10 border-b-2 border-black pb-5">
          <h2 className="text-3xl tracking-tight sm:text-5xl">
            {t("collectionsTitle")}
          </h2>
          <p className="mt-3 max-w-xl text-base text-muted-foreground">
            {t("collectionsSubtitle")}
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
        {/* Large left card */}
        <Reveal>
          <Link
            href={`${basePath}/products`}
            className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100"
          >
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
              alt="Curated streetwear collection"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10">
              <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.25em] text-primary">
                {t("newSeason")}
              </span>
              <h3 className="text-2xl font-bold sm:text-4xl">
                {t("curatedCollection")}
              </h3>
              <p className="mt-2 max-w-sm text-sm text-white/80">
                {t("curatedCollectionDesc")}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-widest text-white underline-offset-4 group-hover:underline">
                {t("shopNow")} &rarr;
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Right stacked duo */}
        <div className="grid grid-rows-2 gap-4 lg:gap-6">
          <Reveal delay={100}>
            <Link
              href={`${basePath}/products`}
              className="group relative block h-full overflow-hidden rounded-2xl bg-gray-100"
            >
              <Image
                src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80"
                alt="Sneaker collection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                <span className="mb-1 inline-block text-xs font-bold uppercase tracking-[0.25em] text-primary">
                  {t("trending")}
                </span>
                <h3 className="text-xl font-bold sm:text-2xl">
                  {t("footwearTitle")}
                </h3>
                <span className="mt-2 inline-flex text-sm font-bold uppercase tracking-widest text-white underline-offset-4 group-hover:underline">
                  {t("shopNow")} &rarr;
                </span>
              </div>
            </Link>
          </Reveal>

          <Reveal delay={200}>
            <Link
              href={`${basePath}/products`}
              className="group relative block h-full overflow-hidden rounded-2xl bg-gray-100"
            >
              <Image
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
                alt="Accessories collection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                <span className="mb-1 inline-block text-xs font-bold uppercase tracking-[0.25em] text-primary">
                  {t("essentials")}
                </span>
                <h3 className="text-xl font-bold sm:text-2xl">
                  {t("accessoriesTitle")}
                </h3>
                <span className="mt-2 inline-flex text-sm font-bold uppercase tracking-widest text-white underline-offset-4 group-hover:underline">
                  {t("shopNow")} &rarr;
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
