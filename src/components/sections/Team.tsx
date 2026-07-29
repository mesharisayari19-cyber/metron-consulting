"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { teamMembers } from "@/data/team";
import { useLocale } from "@/context/LocaleContext";

export function Team() {
  const { t, isArabic } = useLocale();
  const shouldReduceMotion = useReducedMotion();
  const sectionTitle = isArabic ? "فريقنا" : "Our Team";

  return (
    <section id="team" className="section-executive bg-surface-50 overflow-x-hidden">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={sectionTitle} subtitle={t.team.subtitle} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-start">
          {teamMembers.map((member, index) => (
            <motion.article
              key={member.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.06, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="card-premium p-6 text-center h-full"
            >
              <TeamCard member={member} isArabic={isArabic} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

type TeamCardProps = {
  member: (typeof teamMembers)[number];
  isArabic: boolean;
};

function TeamCard({ member, isArabic }: TeamCardProps) {
  const [expanded, setExpanded] = useState(false);
  const displayName = isArabic ? member.name.ar : member.name.en;
  const credential = isArabic ? member.credentials.ar : member.credentials.en;
  const points = isArabic ? member.bioPoints.ar : member.bioPoints.en;
  const years = isArabic ? member.yearsExperience.ar : member.yearsExperience.en;
  const credentialParts = credential
    .split("·")
    .map((part) => part.trim())
    .filter(Boolean);
  const title = credentialParts[0] ?? credential;
  const certifications = credentialParts.slice(1).join(" · ");
  const detailsLabel = isArabic ? "+ التفاصيل" : "+ Details";
  const hideLabel = isArabic ? "− إخفاء التفاصيل" : "− Hide details";

  return (
    <div className="h-full flex flex-col">
      <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-surface-100 ring-8 ring-surface-50 overflow-hidden border border-surface-200">
        <Image
          src={member.image}
          alt={displayName}
          width={96}
          height={96}
          className="h-full w-full object-cover object-[50%_18%]"
        />
      </div>

      <h3 className="text-xl font-bold text-brand-900 leading-snug">{displayName}</h3>
      <p className="mt-1 text-surface-600 font-medium">{title}</p>
      {certifications ? (
        <p className="mt-1 text-sm text-surface-500 break-words">{certifications}</p>
      ) : null}
      <p className="mt-2 inline-flex mx-auto rounded-full px-2.5 py-1 bg-brand-50 text-brand-700 text-xs font-semibold">
        {years}
      </p>

      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        className="mt-4 text-brand-700 font-semibold text-sm hover:text-brand-800 transition-colors duration-300 ease-out"
      >
        {expanded ? hideLabel : detailsLabel}
      </button>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            key="details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden text-start"
          >
            <ul className="mt-3 space-y-2 border-t border-surface-200 pt-3">
              {points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-xs text-surface-600 leading-relaxed"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-400 shrink-0" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
