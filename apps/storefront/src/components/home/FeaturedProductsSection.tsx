import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { TextReveal } from "@/components/motion";
import { FeaturedProducts } from "@/components/products/FeaturedProducts";
import { ProductCardSkeleton } from "@/components/products/ProductCardSkeleton";

function CarouselSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

interface FeaturedProductsSectionProps {
  basePath: string;
  locale: string;
  country: string;
  currency?: string;
}

export async function FeaturedProductsSection({
  basePath,
  locale,
  country,
  currency,
}: FeaturedProductsSectionProps) {
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "home",
  });

  return (
    <section className="mx-auto max-w-400 px-5 sm:px-8 lg:px-12 py-16 sm:py-24 featured-products">
      <div className="flex items-end justify-between mb-10 border-b-2 border-black pb-5">
        <TextReveal
          as="h2"
          text={t("featuredProducts")}
          className="text-3xl sm:text-5xl tracking-tight"
        />
        <Link
          href={`${basePath}/products`}
          className="shrink-0 text-xs sm:text-sm font-bold uppercase tracking-widest underline-offset-4 hover:underline"
        >
          {t("viewAll")} &rarr;
        </Link>
      </div>
      <Suspense fallback={<CarouselSkeleton />}>
        <FeaturedProducts
          basePath={basePath}
          locale={locale}
          country={country}
          currency={currency}
        />
      </Suspense>
    </section>
  );
}
