"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services } from "@/data/services";
import { useLocale } from "@/context/LocaleContext";
import { brandIcons } from "@branding/icons";

export function Services() {
  const { t, isArabic } = useLocale();
  const Chevron = brandIcons.ui.chevronRight;

  return (
    <section id="services" className="section-executive bg-white">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.services.title} subtitle={t.services.subtitle} />

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (index % 2) * 0.08, duration: 0.45 }}
                className="group card-premium p-8 md:p-10 lg:p-12 flex flex-col min-h-[280px]"
              >
                <div className="flex items-start justify-between gap-4 mb-8">
                  <div className="w-14 h-14 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center group-hover:bg-brand-700 group-hover:border-brand-700 transition-colors duration-500">
                    <Icon
                      className="w-7 h-7 text-brand-700 group-hover:text-white transition-colors duration-500"
                      strokeWidth={1.25}
                    />
                  </div>
                  <span className="text-xs font-bold text-brand-400 tracking-widest">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-brand-900 mb-4">
                  {isArabic ? service.title.ar : service.title.en}
                </h3>
                <p className="text-surface-600 leading-relaxed flex-1 text-base md:text-lg">
                  {isArabic ? service.description.ar : service.description.en}
                </p>
                {service.slug && (
                  <p className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {t.services.learnMore}
                    <Chevron className="w-4 h-4 rtl:rotate-180" />
                  </p>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
