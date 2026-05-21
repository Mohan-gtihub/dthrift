import type { Metadata } from "next";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { BrandStory } from "@/components/home/BrandStory";
import { CollectionShowcase } from "@/components/home/CollectionShowcase";
import { FeaturedProductsSection } from "@/components/home/FeaturedProductsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { LifestyleGrid } from "@/components/home/LifestyleGrid";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { TestimonialStrip } from "@/components/home/TestimonialStrip";
import { ValueStrip } from "@/components/home/ValueStrip";
import { Reveal } from "@/components/ui/Reveal";
import { getMarkets, resolveCurrency } from "@/lib/data/markets";
import { generateHomeMetadata } from "@/lib/metadata/home";
import { getDefaultCountry, getDefaultLocale } from "@/lib/store";

interface HomePageProps {
  params: Promise<{
    country: string;
    locale: string;
  }>;
}

/**
 * Prebuild the homepage shell for every (country, locale) combination the
 * store serves. Next.js reuses the static shell (hero + featured section
 * chrome) while featured products stream in under Suspense.
 *
 * Cache Components requires this to return at least one entry, so we
 * always include the store's configured default country/locale as a
 * fallback even if the markets fetch fails.
 */
export async function generateStaticParams() {
  const fallback = {
    country: getDefaultCountry(),
    locale: getDefaultLocale(),
  };

  let markets;
  try {
    ({ data: markets } = await getMarkets());
  } catch {
    return [fallback];
  }

  const params: Array<{ country: string; locale: string }> = [];
  const seen = new Set<string>();

  const addParam = (country: string, locale: string) => {
    const key = `${country}/${locale}`;
    if (seen.has(key)) return;
    seen.add(key);
    params.push({ country, locale });
  };

  for (const market of markets) {
    const locale = market.default_locale;
    if (!locale) continue;
    for (const country of market.countries ?? []) {
      const iso = country.iso?.toLowerCase();
      if (!iso) continue;
      addParam(iso, locale);
    }
  }

  if (params.length === 0) {
    addParam(fallback.country, fallback.locale);
  }

  return params;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { country, locale } = await params;
  return generateHomeMetadata({ country, locale });
}

export default async function HomePage({ params }: HomePageProps) {
  const { country, locale } = await params;
  const basePath = `/${country}/${locale}`;
  const currency = await resolveCurrency(country);

  return (
    <div>
      <HeroSection basePath={basePath} locale={locale} />
      <BrandMarquee />
      <CollectionShowcase basePath={basePath} locale={locale} />
      <Reveal>
        <FeaturedProductsSection
          basePath={basePath}
          locale={locale}
          country={country}
          currency={currency}
        />
      </Reveal>
      <LifestyleGrid basePath={basePath} locale={locale} />
      <BrandStory basePath={basePath} locale={locale} />
      <Reveal delay={100}>
        <ValueStrip locale={locale} />
      </Reveal>
      <TestimonialStrip locale={locale} />
      <NewsletterSection locale={locale} />
    </div>
  );
}
