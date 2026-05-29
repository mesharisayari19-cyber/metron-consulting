"use client";

import { brandIcons } from "@branding/icons";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/context/LocaleContext";

const valueKeys = ["trust", "precision", "integrity", "quality", "impact"] as const;

export function About() {
  const { t } = useLocale();
  const icons = brandIcons.values;

  return (
    <section id="about" className="py-section-sm md:py-section bg-surface-50">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.about.title} subtitle={t.about.subtitle} />

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Card hover={false} className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-brand-900 mb-4">
              {t.about.overviewTitle}
            </h3>
            <p className="text-surface-600 leading-relaxed text-lg">
              {t.about.overview}
            </p>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-brand-800 mb-3">
              {t.about.visionTitle}
            </h3>
            <p className="text-surface-600 leading-relaxed">{t.about.vision}</p>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-brand-800 mb-3">
              {t.about.missionTitle}
            </h3>
            <p className="text-surface-600 leading-relaxed">{t.about.mission}</p>
          </Card>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-brand-900 text-center mb-10">
            {t.about.valuesTitle}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {valueKeys.map((key, index) => {
              const Icon = icons[key];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                >
                  <Card className="text-center h-full flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-brand-50 flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-brand-700" strokeWidth={1.5} />
                    </div>
                    <h4 className="font-semibold text-brand-900">
                      {t.about.values[key]}
                    </h4>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
