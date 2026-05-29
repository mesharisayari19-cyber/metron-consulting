/**
 * Logo & wordmark configuration
 * Replace paths when official assets are ready.
 */
export const brandLogo = {
  wordmark: {
    en: "Metron",
    ar: "ميترون",
  },
  tagline: {
    en: "Professional Consulting",
    ar: "للاستشارات المهنية",
  },
  paths: {
    /** Primary logo — place file at public/branding/logo.svg */
    primary: "/branding/logo.svg",
    /** Light variant for dark backgrounds */
    light: "/branding/logo-light.svg",
    /** Icon / favicon */
    icon: "/branding/icon.svg",
    favicon: "/favicon.ico",
  },
  dimensions: {
    headerHeight: 40,
    footerHeight: 36,
  },
} as const;

export type BrandLogo = typeof brandLogo;
