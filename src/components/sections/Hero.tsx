"use client";

import { brandIcons } from "@branding/icons";
import { BrandPattern } from "@/components/brand/BrandPattern";
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
      className="relative min-h-screen flex items-center overflow-hidden bg-brand-950"
    >
      {/* Layer 1 — KAFD / Riyadh skyline (cover) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${themeConfig.assets.heroBackground}')`,
        }}
        aria-hidden
      />

      {/* Layer 2 — Metron dark blue overlay (~60% — image ~20% clearer than /80) */}
      <div className="absolute inset-0 bg-brand-950/60" aria-hidden />

      {/* Layer 3 — Metron pattern (very subtle) */}
      <BrandPattern opacity={0.07} />

      <div
        className="pointer-events-none absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-brand-950 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-content mx-auto px-4 sm:px-6 lg:px-8 hero-offset pb-20 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-start max-w-3xl"
        >
          <p className="text-eyebrow text-brand-300 mb-5">{t.hero.eyebrow}</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-[3.25rem] font-semibold text-white leading-[1.2] tracking-tight text-balance">
            {t.hero.title}
          </h1>
          <p className="mt-6 md:mt-8 text-base md:text-lg text-white/75 max-w-xl leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button
              href="#about"
              variant="secondary"
              size="lg"
              className="border-0 shadow-executive hover:bg-brand-50"
            >
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
      </div>
    </section>
  );
}
