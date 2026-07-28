"use client";

import { useLocale } from "@/context/LocaleContext";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  const { isArabic } = useLocale();
  const gradientClass = isArabic
    ? light
      ? "bg-gradient-to-l from-brand-400 to-brand-600"
      : "bg-gradient-to-l from-brand-600 to-brand-400"
    : light
      ? "bg-gradient-to-r from-brand-400 to-brand-600"
      : "bg-gradient-to-r from-brand-600 to-brand-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`mb-14 md:mb-16 ${centered ? "text-center" : ""}`}
    >
      <div
        className={`h-1 w-14 rounded-full mb-6 ${centered ? "mx-auto" : ""} ${gradientClass}`}
      />
      <h2
        className={`heading-display ${centered ? "mx-auto max-w-3xl" : ""} ${
          light ? "text-white" : ""
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 text-lg md:text-xl max-w-2xl leading-relaxed ${
            centered ? "mx-auto" : ""
          } ${light ? "text-white/70" : "text-surface-600"}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
