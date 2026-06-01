"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services } from "@/data/services";
import { useLocale } from "@/context/LocaleContext";

const iconStroke = 1.25;

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

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (index % 2) * 0.08, duration: 0.45 }}
                className="group card-premium p-8 md:p-10 lg:p-12 flex flex-col"
              >
                <div className="w-14 h-14 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center mb-6 group-hover:bg-brand-700 group-hover:border-brand-700 transition-colors duration-500">
                  <Icon
                    className="w-7 h-7 text-brand-700 group-hover:text-white transition-colors duration-500"
                    strokeWidth={iconStroke}
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-brand-900 mb-4">
                  {isArabic ? service.title.ar : service.title.en}
                </h3>
                <p className="text-surface-600 leading-relaxed text-base md:text-lg mb-8">
                  {isArabic ? service.description.ar : service.description.en}
                </p>
                <div className="mt-auto pt-6 border-t border-surface-100">
                  <h4 className="text-sm font-bold tracking-widest uppercase text-brand-600 mb-4">
                    {t.services.subServicesHeading}
                  </h4>
                  <ul className="space-y-2.5">
                    {subList.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-surface-700 leading-relaxed text-sm md:text-base"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2.5 shrink-0" />
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
