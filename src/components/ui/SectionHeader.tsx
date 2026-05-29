"use client";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}
    >
      <div
        className={`h-1 w-12 rounded-full mb-6 ${centered ? "mx-auto" : ""} ${
          light ? "bg-white/60" : "bg-brand-600"
        }`}
      />
      <h2
        className={`text-3xl md:text-4xl font-semibold tracking-tight ${
          light ? "text-white" : "text-brand-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg max-w-2xl ${
            centered ? "mx-auto" : ""
          } ${light ? "text-white/80" : "text-surface-600"}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
