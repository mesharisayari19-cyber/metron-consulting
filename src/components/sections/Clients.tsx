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
              className="group card-premium p-7 md:p-8 min-h-[160px] flex flex-col items-center justify-center text-center transition-all duration-300 ease-out hover:border-brand-200/60 hover:bg-brand-50/20"
            >
              <div className="icon-container-premium w-12 h-12 rounded-full mb-5 transition-all duration-300 ease-out group-hover:scale-105 group-hover:border-brand-200/80 group-hover:bg-brand-50/80">
                <Icon className="w-6 h-6 text-brand-700 transition-transform duration-300 ease-out group-hover:scale-105" strokeWidth={ICON_STROKE} />
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
