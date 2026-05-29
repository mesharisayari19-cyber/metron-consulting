"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/context/LocaleContext";

const keys = ["measure", "improve", "impact"] as const;

export function Framework() {
  const { t, isArabic } = useLocale();

  const items = keys.map((key) => ({
    key,
    en: t.framework[key].title,
    ar: t.framework[key].titleAr,
    description: t.framework[key].description,
  }));

  return (
    <section className="section-executive bg-white border-y border-surface-200/80">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-0 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-surface-200 rtl:md:divide-x-reverse">
          {items.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.12, duration: 0.5 }}
              className="px-0 md:px-10 lg:px-14 py-12 md:py-0 first:md:ps-0 last:md:pe-0"
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-4xl md:text-5xl font-bold text-brand-700 tracking-tight">
                  {isArabic ? item.ar : item.en}
                </span>
                <span className="text-sm font-semibold tracking-widest uppercase text-brand-400">
                  {item.en}
                </span>
              </div>
              <div className="h-1 w-12 bg-gradient-to-r from-brand-600 to-brand-300 mb-6" />
              <p className="text-lg text-surface-600 leading-relaxed max-w-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
