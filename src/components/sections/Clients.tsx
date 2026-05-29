"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { clients } from "@/data/clients";
import { useLocale } from "@/context/LocaleContext";

export function Clients() {
  const { t, isArabic } = useLocale();

  return (
    <section id="clients" className="section-executive bg-white border-y border-surface-200/80">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.clients.title} subtitle={t.clients.subtitle} />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-10 lg:gap-12">
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group flex items-center justify-center p-6 md:p-8 min-h-[120px] rounded-lg border border-transparent hover:border-surface-200 hover:bg-surface-50/50 transition-all duration-500"
            >
              <div className="relative w-full h-14 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                <Image
                  src={client.logo}
                  alt={isArabic ? client.name.ar : client.name.en}
                  fill
                  className="object-contain"
                  sizes="160px"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
