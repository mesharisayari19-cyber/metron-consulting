"use client";

import { brandIcons } from "@branding/icons";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/context/LocaleContext";
import { valueKeys } from "@/data/values";

export function About() {
  const { t } = useLocale();
  const icons = brandIcons.values;

  return (
    <section id="about" className="section-executive bg-surface-50">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.about.title} subtitle={t.about.subtitle} />

        <div className="grid lg:grid-cols-12 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 card-premium p-8 md:p-10 lg:p-12"
          >
            <span className="text-eyebrow text-brand-600 mb-4 block">
              {t.about.overviewTitle}
            </span>
            <p className="text-lg md:text-xl text-surface-700 leading-relaxed">
              {t.about.overview}
            </p>
          </motion.div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card-premium p-8 flex-1 border-brand-200"
            >
              <h3 className="text-sm font-bold tracking-widest uppercase text-brand-600 mb-3">
                {t.about.visionTitle}
              </h3>
              <p className="text-surface-700 leading-relaxed text-lg">{t.about.vision}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="card-premium p-8 flex-1"
            >
              <h3 className="text-sm font-bold tracking-widest uppercase text-brand-600 mb-3">
                {t.about.missionTitle}
              </h3>
              <p className="text-surface-700 leading-relaxed text-lg">{t.about.mission}</p>
            </motion.div>
          </div>
        </div>

        <div>
          <h3 className="heading-display text-center mb-14">{t.about.valuesTitle}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {valueKeys.map((key, index) => {
              const Icon = icons[key];
              const value = t.about.values[key];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="card-premium p-6 md:p-8 text-center group"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center mb-5 group-hover:bg-brand-100 transition-colors">
                    <Icon className="w-8 h-8 text-brand-700" strokeWidth={1.25} />
                  </div>
                  <h4 className="text-lg font-semibold text-brand-900 mb-2">{value.title}</h4>
                  <p className="text-sm text-surface-600 leading-relaxed">{value.statement}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
