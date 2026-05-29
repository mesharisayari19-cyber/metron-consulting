"use client";

import { brandIcons } from "@branding/icons";
import { themeConfig } from "@theme/theme.config";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/context/LocaleContext";

export function Hero() {
  const { t } = useLocale();
  const DownloadIcon = brandIcons.ui.download;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background — swap image or add video via themeConfig */}
      <div className="absolute inset-0 bg-brand-950">
        {/* Add hero image or video: set themeConfig.assets.heroBackground */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(160deg, #021428 0%, #0A3A70 35%, #0F4A8C 65%, #1A5FA8 100%)`,
          }}
        />
        {themeConfig.assets.heroBackground && (
          <div
            className="absolute inset-0 opacity-30 mix-blend-overlay"
            style={{
              backgroundImage: `url('${themeConfig.assets.heroBackground}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(26,95,168,0.25)_0%,_transparent_50%)]" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-brand-950/80 to-transparent" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 max-w-content mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-brand-300 text-sm md:text-base font-medium tracking-widest uppercase mb-6">
            Metron | ميترون
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight tracking-tight max-w-4xl mx-auto">
            {t.hero.title}
          </h1>
          <p className="mt-6 md:mt-8 text-lg md:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="#about" variant="primary" size="lg">
              {t.hero.ctaAbout}
            </Button>
            <Button
              href={themeConfig.assets.companyProfile}
              variant="outline"
              size="lg"
              download
              icon={<DownloadIcon className="w-5 h-5" />}
            >
              {t.hero.ctaProfile}
            </Button>
          </div>
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors"
          aria-label={t.common.scrollDown}
        >
          <span className="text-xs tracking-wide">{t.common.scrollDown}</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8 bg-white/40"
          />
        </motion.a>
      </div>
    </section>
  );
}
