"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { clients } from "@/data/clients";
import { useLocale } from "@/context/LocaleContext";

export function Clients() {
  const { t, isArabic } = useLocale();

  return (
    <section id="clients" className="py-section-sm md:py-section bg-white">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.clients.title} subtitle={t.clients.subtitle} />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 items-center">
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="flex items-center justify-center p-4 group"
            >
              <div className="relative w-full h-16 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                <Image
                  src={client.logo}
                  alt={isArabic ? client.name.ar : client.name.en}
                  fill
                  className="object-contain"
                  sizes="150px"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
