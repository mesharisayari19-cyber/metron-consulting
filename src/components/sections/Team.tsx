"use client";

import { motion } from "framer-motion";
import { UserRound } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { teamMembers } from "@/data/team";
import { useLocale } from "@/context/LocaleContext";

export function Team() {
  const { t, isArabic } = useLocale();

  return (
    <section id="team" className="section-executive bg-surface-50">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.team.title} subtitle={t.team.subtitle} />

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {teamMembers.map((member, index) => {
            const displayName = isArabic ? member.name.ar : member.name.en;
            return (
              <motion.article
                key={member.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07, duration: 0.5 }}
                className="group bg-white rounded-lg overflow-hidden border border-surface-200/80 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative aspect-[4/5] bg-gradient-to-br from-surface-200 via-surface-100 to-white overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full border border-surface-300 bg-white/70 flex items-center justify-center shadow-[0_6px_20px_-14px_rgba(15,34,53,0.45)] group-hover:scale-[1.03] transition-transform duration-500">
                      <UserRound className="w-14 h-14 text-surface-500" strokeWidth={1.35} />
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 opacity-35"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 30% 25%, rgba(148,163,184,0.22), transparent 45%), radial-gradient(circle at 70% 70%, rgba(148,163,184,0.18), transparent 40%)",
                    }}
                  />
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-52 h-24 rounded-t-[999px] border border-surface-300/70 bg-white/55" />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-36 h-16 rounded-t-[999px] border border-surface-300/80 bg-white/70" />
                  </div>
                <div className="p-6 md:p-7 border-t border-surface-100">
                  <h3 className="text-lg font-semibold text-brand-900">{displayName}</h3>
                  <p className="text-brand-600 text-sm font-medium mt-1.5 tracking-wide">
                    {isArabic ? member.credentials.ar : member.credentials.en}
                  </p>
                  <p className="text-brand-500/90 text-xs font-semibold mt-2 tracking-wide">
                    {isArabic ? member.yearsExperience.ar : member.yearsExperience.en}
                  </p>
                  <p className="text-surface-600 text-sm mt-4 leading-relaxed line-clamp-4">
                    {isArabic ? member.bio.ar : member.bio.en}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
