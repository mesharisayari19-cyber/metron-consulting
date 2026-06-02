/**
 * Official Metron logo assets — do not recreate in code
 */
export const brandLogo = {
  wordmark: {
    en: "METRON",
    ar: "ميترون للاستشارات",
  },
  tagline: {
    en: "CONSULTING",
    ar: "للاستشارات المهنية",
  },
  paths: {
    /** Horizontal logo — high-res from official SVG (عرضي) */
    horizontal: "/assets/brand/logo-horizontal-colored.png",
    horizontalLight: "/assets/brand/logo-horizontal-white-v2.png",
    /** Official vector sources */
    horizontalSvg: "/assets/brand/logo-horizontal.svg",
    horizontalWhiteSvg: "/assets/brand/logo-horizontal-white.svg",
    /** Stacked logo (طولي) — footer */
    stackedColored: "/assets/brand/logo-colored-transparent.png",
    stackedWhite: "/assets/brand/logo-white-transparent.png",
    stackedDark: "/assets/brand/logo-stacked-dark.png",
    pattern: "/assets/brand/pattern.svg",
    favicon: "/favicon.ico",
  },
  dimensions: {
    /** Horizontal wordmark ~4:1 aspect ratio */
    header: { width: 480, height: 120 },
    footer: { width: 320, height: 80 },
  },
} as const;

export type BrandLogo = typeof brandLogo;
