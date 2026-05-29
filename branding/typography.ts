/**
 * Typography — Brand Identity Guide
 * Arabic: Neo Sans Arabic | English: Montserrat
 */
export const brandTypography = {
  fonts: {
    arabic: {
      family: "Neo Sans Arabic",
      fallback: "IBM Plex Sans Arabic, system-ui, sans-serif",
      variable: "--font-arabic",
    },
    english: {
      family: "Montserrat",
      fallback: "system-ui, sans-serif",
      variable: "--font-sans",
    },
  },
  scale: {
    hero: { ar: "3rem", en: "3.25rem" },
    h1: { ar: "2.375rem", en: "2.5rem" },
    h2: { ar: "1.875rem", en: "2rem" },
    h3: { ar: "1.375rem", en: "1.5rem" },
    body: { ar: "1.0625rem", en: "1rem" },
    small: { ar: "0.9375rem", en: "0.875rem" },
  },
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;
