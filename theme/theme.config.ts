import { brandColors, brandLogo, brandTypography } from "../branding";

/**
 * Central theme configuration — single source for runtime theme values.
 */
export const themeConfig = {
  colors: brandColors,
  typography: brandTypography,
  logo: brandLogo,

  layout: {
    maxContentWidth: "1280px",
    headerHeight: "72px",
    sectionPaddingY: { mobile: "4rem", desktop: "6rem" },
    borderRadius: {
      card: "0.5rem",
      button: "0.375rem",
    },
  },

  motion: {
    duration: {
      fast: 0.2,
      normal: 0.4,
      slow: 0.6,
    },
    easing: [0.25, 0.1, 0.25, 1] as const,
  },

  assets: {
    /** Company profile downloads — replace files in public/assets/company-profile/ */
    companyProfile: {
      ar: "/assets/company-profile/metron-profile-ar.pdf",
      en: "/assets/company-profile/metron-profile-en.pdf",
    },
    /** Legacy fallback path (Arabic PDF) */
    companyProfileLegacy: "/assets/company-profile.pdf",
    /** Set path when hero image is ready, e.g. "/assets/hero-bg.jpg" */
    heroBackground: "/assets/hero/kafd.jpg",
  },

  contact: {
    email: "contact@metron.sa",
    phone: "+966 53 693 2633",
    address: {
      ar: "المملكة العربية السعودية",
      en: "Kingdom of Saudi Arabia",
    },
    linkedin: "https://www.linkedin.com/company/metronsa/",
    social: {
      linkedin: "https://www.linkedin.com/company/metronsa/",
      x: "https://x.com/Metronksa",
    },
  },

  seo: {
    siteName: {
      ar: "ميترون للاستشارات المهنية",
      en: "Metron Professional Consulting",
    },
    defaultDescription: {
      ar: "شركة استشارية متخصصة في المراجعة الداخلية، الحوكمة، إدارة المخاطر، والالتزام.",
      en: "Professional consulting firm specializing in internal audit, governance, risk management, and compliance.",
    },
  },
} as const;

export type ThemeConfig = typeof themeConfig;
