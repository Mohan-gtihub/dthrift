import { getTranslations } from "next-intl/server";
import { AnimatedIcon, type IconName, Stagger, StaggerItem } from "@/components/motion";

interface ValueStripProps {
  locale: string;
}

/**
 * Editorial three-up value section. Big numbered blocks with a thick
 * divider grid — collapses to a single column on mobile. Each block carries
 * an animated icon and the trio cascades in as the section scrolls into view
 * (via <Stagger>). Server component for i18n; the motion lives in the
 * client primitives.
 */
export async function ValueStrip({ locale }: ValueStripProps) {
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "home",
  });

  const values: Array<{ title: string; body: string; icon: IconName }> = [
    {
      title: t("qualityProducts"),
      body: t("qualityDescription"),
      icon: "shield",
    },
    { title: t("fastShipping"), body: t("shippingDescription"), icon: "truck" },
    { title: t("support"), body: t("supportDescription"), icon: "support" },
  ];

  return (
    <section className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <Stagger className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-black bg-black md:grid-cols-3">
        {values.map((v, i) => (
          <StaggerItem
            key={v.title}
            className="group flex flex-col gap-4 bg-background p-8 transition-colors duration-300 hover:bg-primary hover:text-black sm:p-10"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-5xl text-primary transition-colors duration-300 group-hover:text-black sm:text-6xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <AnimatedIcon
                name={v.icon}
                className="size-9 text-primary transition-colors duration-300 group-hover:text-black sm:size-10"
              />
            </div>
            <h3 className="text-xl font-bold sm:text-2xl">{v.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-black/70">
              {v.body}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
