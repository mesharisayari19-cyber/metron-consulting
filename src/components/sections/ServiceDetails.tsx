"use client";

import { motion } from "framer-motion";
import { services } from "@/data/services";
import { useLocale } from "@/context/LocaleContext";

export function ServiceDetails() {
  const { t, isArabic } = useLocale();

  return (
    <>
      {services.map((service, index) => {
        const Icon = service.icon;
        const isAlt = index % 2 === 1;

        return (
          <section
            key={service.id}
            id={`service-${service.id}`}
            className={`section-executive scroll-mt-24 ${isAlt ? "bg-white" : "bg-surface-50"}`}
          >
            <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="max-w-3xl"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0">
                    <Icon className="w-7 h-7 text-brand-700" strokeWidth={1.25} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-brand-900 leading-snug pt-2">
                    {isArabic ? service.title.ar : service.title.en}
                  </h2>
                </div>

                <p className="text-surface-700 leading-relaxed text-base md:text-lg mb-10">
                  {isArabic ? service.description.ar : service.description.en}
                </p>

                <div>
                  <h3 className="text-sm font-bold tracking-widest uppercase text-brand-600 mb-5">
                    {t.services.subServicesHeading}
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                    {(isArabic ? service.subServices.ar : service.subServices.en).map(
                      (item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-surface-700 leading-relaxed text-sm md:text-base"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </motion.div>
            </div>
          </section>
        );
      })}
    </>
  );
}
