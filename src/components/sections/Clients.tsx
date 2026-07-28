"use client";

import { ICON_STROKE, brandIcons } from "@branding/icons";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/context/LocaleContext";

const sectorKeys = ["government", "semiGovernment", "listedCompanies", "privateSector", "nonProfit"] as const;

export function Clients() {
  const { t, isArabic } = useLocale();

  return (
    <section id="clients" className="section-executive bg-white border-y border-surface-200/80">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.clients.title} subtitle={t.clients.subtitle} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-7">
          {sectorKeys.map((key, index) => {
            const Icon = brandIcons.sectors[key];
            const label = isArabic ? t.clients.sectors[key].ar : t.clients.sectors[key].en;
            return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
              className="group card-premium p-6 md:p-7 min-h-[152px] flex flex-col items-center justify-center text-center"
            >
              <div className="w-11 h-11 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors duration-300">
                <Icon className="w-5 h-5 text-brand-700" strokeWidth={ICON_STROKE} />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-brand-900 leading-snug">{label}</h3>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
