"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      whileHover={hover ? { y: -4 } : undefined}
      className={`bg-white rounded-lg border border-surface-200 p-6 md:p-8 shadow-card transition-shadow duration-300 ${
        hover ? "hover:shadow-card-hover hover:border-brand-200" : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
