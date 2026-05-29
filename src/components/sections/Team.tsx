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
                <div className="relative aspect-[4/5] bg-gradient-to-br from-brand-100 via-brand-50 to-white overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-light text-brand-300/80 group-hover:scale-105 transition-transform duration-500">
                      {getInitials(displayName)}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-4 inset-x-4 flex items-center justify-center gap-2 py-2.5 bg-white/95 text-brand-800 text-sm font-semibold rounded-md opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                    >
                      <LinkedInIcon className="w-4 h-4" />
                      {t.team.viewLinkedIn}
                    </a>
                  )}
                </div>
                <div className="p-6 md:p-7 border-t border-surface-100">
                  <h3 className="text-lg font-semibold text-brand-900">{displayName}</h3>
                  <p className="text-brand-600 text-sm font-medium mt-1.5 tracking-wide">
                    {isArabic ? member.role.ar : member.role.en}
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
