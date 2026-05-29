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
    /** Logo on light backgrounds (header when scrolled) */
    horizontal: "/assets/brand/logo-horizontal.png",
    /** Logo on dark backgrounds (header over hero, footer) */
    horizontalLight: "/assets/brand/logo-horizontal-light.png",
    stackedDark: "/assets/brand/logo-stacked-dark.png",
    pattern: "/assets/brand/pattern.svg",
    favicon: "/favicon.ico",
  },
  dimensions: {
    /** Display sizes for Next/Image intrinsic dimensions */
    header: { width: 360, height: 96 },
    footer: { width: 300, height: 80 },
  },
} as const;

export type BrandLogo = typeof brandLogo;
