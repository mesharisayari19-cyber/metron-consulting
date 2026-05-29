"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services } from "@/data/services";
import { useLocale } from "@/context/LocaleContext";

export function Services() {
  const { t, isArabic } = useLocale();

  return (
    <section id="services" className="py-section-sm md:py-section bg-white">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.services.title} subtitle={t.services.subtitle} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (index % 3) * 0.06, duration: 0.4 }}
              >
                <Card className="h-full group cursor-default">
                  <div className="w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center mb-5 group-hover:bg-brand-100 transition-colors">
                    <Icon
                      className="w-6 h-6 text-brand-700 group-hover:scale-110 transition-transform duration-300"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-brand-900 mb-2">
                    {isArabic ? service.title.ar : service.title.en}
                  </h3>
                  <p className="text-surface-600 text-sm leading-relaxed">
                    {isArabic ? service.description.ar : service.description.en}
                  </p>
                  {service.slug && (
                    <p className="mt-4 text-xs text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      {t.services.learnMore} →
                    </p>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
