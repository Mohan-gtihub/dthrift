import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

interface TestimonialStripProps {
  locale: string;
}

const TESTIMONIALS = [
  {
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    nameKey: "testimonial1Name" as const,
    quoteKey: "testimonial1Quote" as const,
    role: "Verified Buyer",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    nameKey: "testimonial2Name" as const,
    quoteKey: "testimonial2Quote" as const,
    role: "Verified Buyer",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    nameKey: "testimonial3Name" as const,
    quoteKey: "testimonial3Quote" as const,
    role: "Verified Buyer",
  },
];

/**
 * Social proof strip — three testimonial cards with avatars. Builds trust
 * and adds visual personality with real faces.
 */
export async function TestimonialStrip({ locale }: TestimonialStripProps) {
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "home",
  });

  return (
    <section className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <Reveal>
        <div className="mb-10 text-center">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.25em] text-primary">
            {t("socialProofLabel")}
          </span>
          <h2 className="text-3xl tracking-tight sm:text-5xl">
            {t("socialProofTitle")}
          </h2>
        </div>
      </Reveal>

      <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((item) => (
          <StaggerItem
            key={item.nameKey}
            className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm transition-shadow duration-300 hover:shadow-lg sm:p-10"
          >
            <div className="relative mb-4 size-16 overflow-hidden rounded-full bg-gray-100">
              <Image
                src={item.avatar}
                alt={t(item.nameKey)}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div className="mb-3 flex gap-0.5 text-primary">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="size-4 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              &ldquo;{t(item.quoteKey)}&rdquo;
            </p>
            <p className="text-sm font-bold">{t(item.nameKey)}</p>
            <p className="text-xs text-muted-foreground">{item.role}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
