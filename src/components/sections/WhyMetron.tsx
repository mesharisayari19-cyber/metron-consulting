"use client";

import { Landmark, LineChart, CircleCheckBig, Medal, Sprout } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/context/LocaleContext";

const itemKeys = ["regulatory", "data", "practical", "standards", "sustainable"] as const;
const icons = [Landmark, LineChart, CircleCheckBig, Medal, Sprout];

export function WhyMetron() {
  const { t } = useLocale();

  return (
    <section id="why-metron" className="section-executive bg-brand-950 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t.whyMetron.title}
          subtitle={t.whyMetron.subtitle}
          light
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {itemKeys.map((key, index) => {
            const Icon = icons[index];
            const item = t.whyMetron.items[key];
            return (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className={`group p-8 lg:p-9 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 ${
                  index === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="w-12 h-12 rounded-md bg-brand-700/50 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-brand-600/60 transition-colors duration-500">
                  <Icon className="w-6 h-6 text-brand-200" strokeWidth={1.25} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-white/65 leading-relaxed text-[0.9375rem]">{item.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
