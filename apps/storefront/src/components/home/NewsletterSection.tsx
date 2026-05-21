import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion";

interface NewsletterSectionProps {
  locale: string;
}

/**
 * Newsletter signup with a lifestyle background image.
 * Visual anchor before the footer.
 */
export async function NewsletterSection({ locale }: NewsletterSectionProps) {
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "home",
  });

  return (
    <section className="relative overflow-hidden bg-gray-100">
      <div className="absolute inset-0 hidden md:block">
        <Image
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80"
          alt="Newsletter background"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {t("newsletterLabel")}
            </span>
            <h2 className="text-3xl tracking-tight sm:text-4xl">
              {t("newsletterTitle")}
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              {t("newsletterDesc")}
            </p>
            <form
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
              action="#"
            >
              <input
                type="email"
                placeholder={t("newsletterPlaceholder")}
                className="rounded-full border-2 border-black bg-white px-6 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary sm:w-80"
              />
              <button
                type="submit"
                className="rounded-full bg-black px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-transform duration-200 hover:scale-[1.03] active:scale-95"
              >
                {t("newsletterCta")}
              </button>
            </form>
            <p className="mt-3 text-xs text-muted-foreground">
              {t("newsletterDisclaimer")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
