"use client";

import { ICON_STROKE } from "@branding/icons";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services } from "@/data/services";
import { useLocale } from "@/context/LocaleContext";

export function Services() {
  const { t, isArabic } = useLocale();

  return (
    <section id="services" className="section-executive bg-white">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.services.title} subtitle={t.services.subtitle} />

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const subList = isArabic ? service.subServices.ar : service.subServices.en;
            const isLastAlone = index === services.length - 1 && services.length % 2 !== 0;

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (index % 2) * 0.08, duration: 0.45 }}
                className={`group card-premium relative flex flex-col overflow-hidden p-8 md:p-10 lg:p-12 ${
                  isLastAlone ? "md:col-span-2 md:max-w-3xl md:mx-auto md:w-full" : ""
                }`}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-surface-200/80 transition-colors duration-500 group-hover:bg-brand-200/60"
                  aria-hidden
                />

                <div className="mb-7 inline-flex h-14 w-14 items-center justify-center rounded-md border border-brand-100/90 bg-brand-50/40 transition-all duration-500 group-hover:border-brand-700 group-hover:bg-brand-700">
                  <Icon
                    className="h-7 w-7 text-brand-700 transition-colors duration-500 group-hover:text-white"
                    strokeWidth={ICON_STROKE}
                  />
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-brand-900 mb-4 tracking-tight">
                  {isArabic ? service.title.ar : service.title.en}
                </h3>

                <p className="text-surface-600 leading-relaxed text-base md:text-lg mb-8 max-w-prose">
                  {isArabic ? service.description.ar : service.description.en}
                </p>

                <div className="mt-auto border-t border-surface-200/80 pt-7">
                  <h4
                    className={`text-sm font-bold text-brand-600 mb-5 ${
                      isArabic ? "tracking-normal normal-case" : "tracking-widest uppercase"
                    }`}
                  >
                    {t.services.subServicesHeading}
                  </h4>
                  <ul className="space-y-3">
                    {subList.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-surface-700 leading-relaxed text-sm md:text-base"
                      >
                        <span className="mt-[0.65rem] h-px w-3 shrink-0 bg-brand-400/80" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
