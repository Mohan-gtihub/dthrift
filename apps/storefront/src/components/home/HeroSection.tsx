import { getTranslations } from "next-intl/server";
import { HeroSectionClient } from "./HeroSectionClient";

interface HeroSectionProps {
  basePath: string;
  locale: string;
}

/**
 * DTHRIFT hero — server wrapper. Resolves translations on the server (so the
 * headline text is in the SSR HTML for LCP + SEO) and hands them to the
 * client island that owns the motion (masked text reveal, parallax grain,
 * magnetic CTAs, Lottie scroll cue).
 */
export async function HeroSection({ basePath, locale }: HeroSectionProps) {
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "home",
  });

  return (
    <HeroSectionClient
      basePath={basePath}
      strings={{
        tagline: t("tagline"),
        shopNow: t("shopNow"),
        newArrivals: t("newArrivals"),
        scrollToExplore: t("scrollToExplore"),
        freeShipping: t("freeShipping"),
      }}
    />
  );
}
