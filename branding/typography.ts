/**
 * Typography configuration — change fonts here to rebrand globally.
 */
export const brandTypography = {
  fonts: {
    arabic: {
      family: "IBM Plex Sans Arabic",
      fallback: "Cairo, system-ui, sans-serif",
      googleFontUrl:
        "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap",
    },
    english: {
      family: "Inter",
      fallback: "Manrope, system-ui, sans-serif",
      googleFontUrl:
        "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
    },
  },
  scale: {
    hero: { ar: "3.25rem", en: "3.5rem" },
    h1: { ar: "2.5rem", en: "2.75rem" },
    h2: { ar: "2rem", en: "2.25rem" },
    h3: { ar: "1.5rem", en: "1.625rem" },
    body: { ar: "1.0625rem", en: "1.0625rem" },
    small: { ar: "0.9375rem", en: "0.9375rem" },
  },
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

export type BrandTypography = typeof brandTypography;
