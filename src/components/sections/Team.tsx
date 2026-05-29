"use client";

import { brandIcons } from "@branding/icons";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { teamMembers } from "@/data/team";
import { useLocale } from "@/context/LocaleContext";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`;
  }
  return name.charAt(0);
}

export function Team() {
  const { t, isArabic } = useLocale();
  const LinkedInIcon = brandIcons.ui.linkedin;

  return (
    <section id="team" className="py-section-sm md:py-section bg-surface-50">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.team.title} subtitle={t.team.subtitle} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member, index) => {
            const displayName = isArabic ? member.name.ar : member.name.en;
            return (
              <motion.article
                key={member.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className="bg-white rounded-lg border border-surface-200 shadow-card overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative w-full aspect-[4/5] bg-gradient-to-br from-brand-100 via-brand-50 to-brand-200 flex items-center justify-center">
                  <span className="text-5xl font-semibold text-brand-400/70">
                    {getInitials(displayName)}
                  </span>
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="text-lg font-semibold text-brand-900">{displayName}</h3>
                  <p className="text-brand-600 text-sm font-medium mt-1">
                    {isArabic ? member.role.ar : member.role.en}
                  </p>
                  <p className="text-surface-600 text-sm mt-3 leading-relaxed">
                    {isArabic ? member.bio.ar : member.bio.en}
                  </p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-4 text-sm text-brand-600 hover:text-brand-800 transition-colors"
                    >
                      <LinkedInIcon className="w-4 h-4" />
                      {t.team.viewLinkedIn}
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
