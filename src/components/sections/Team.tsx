"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { teamMembers } from "@/data/team";
import { useLocale } from "@/context/LocaleContext";

export function Team() {
  const { t, isArabic } = useLocale();

  return (
    <section id="team" className="section-executive bg-surface-50">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.team.title} subtitle={t.team.subtitle} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-6 lg:gap-8 items-stretch">
          {teamMembers.map((member, index) => {
            const displayName = isArabic ? member.name.ar : member.name.en;
            const points = isArabic ? member.bioPoints.ar : member.bioPoints.en;

            return (
              <motion.article
                key={member.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07, duration: 0.5 }}
                className="group flex flex-col card-premium overflow-hidden min-w-0 h-full transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-14px_rgba(27,61,92,0.10)]"
              >
                <div className="relative aspect-[4/3] sm:aspect-[3/4] bg-surface-100 overflow-hidden shrink-0">
                  <Image
                    src={member.image}
                    alt={displayName}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 20vw"
                    className="object-cover object-[50%_18%] scale-[1.12] transition-transform duration-300 ease-out group-hover:scale-[1.13]"
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/80 to-transparent"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-col flex-1 p-4 sm:p-5 lg:p-6 border-t border-surface-100">
                  <h3 className="text-base lg:text-lg font-semibold text-brand-900 leading-snug">
                    {displayName}
                  </h3>
                  <p className="text-brand-600 text-xs lg:text-sm font-medium mt-1.5 tracking-wide leading-snug">
                    {isArabic ? member.credentials.ar : member.credentials.en}
                  </p>
                  <p className="text-brand-500/90 text-xs font-semibold mt-2 tracking-wide">
                    {isArabic ? member.yearsExperience.ar : member.yearsExperience.en}
                  </p>
                  <ul className="mt-3 lg:mt-4 space-y-2 flex-1">
                    {points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2 text-surface-600 text-xs lg:text-sm leading-relaxed"
                      >
                        <span
                          className="mt-[0.55rem] h-px w-2 shrink-0 bg-brand-400/80"
                          aria-hidden
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
