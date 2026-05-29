"use client";

import { motion } from "framer-motion";

const bars = [
  { height: 48, delay: 0, opacity: 0.45 },
  { height: 72, delay: 0.15, opacity: 0.65 },
  { height: 96, delay: 0.3, opacity: 1 },
  { height: 120, delay: 0.45, opacity: 1 },
];

/** Animated performance-growth visual derived from Metron logo bars */
export function HeroVisualization() {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-square flex items-end justify-center gap-3 md:gap-4 p-8">
      <div className="absolute inset-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm" />
      <div className="absolute top-6 inset-x-6 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className="relative w-10 md:w-12 rounded-t-sm bg-gradient-to-t from-brand-800 to-brand-400"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: bar.height, opacity: bar.opacity }}
          transition={{
            duration: 0.8,
            delay: 0.6 + bar.delay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      ))}

      <motion.div
        className="absolute -right-2 top-1/4 w-16 h-16 md:w-20 md:h-20 opacity-90"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
          <path
            d="M8 56 L8 24 L24 24 L24 56 Z M32 56 L32 16 L48 16 L48 56 Z M56 56 L56 8 L72 8 L72 40 L56 40 Z"
            fill="url(#mGrad)"
          />
          <defs>
            <linearGradient id="mGrad" x1="8" y1="8" x2="72" y2="56" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8FA8BC" />
              <stop offset="0.5" stopColor="#4A6B8A" />
              <stop offset="1" stopColor="#1B3D5C" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}
