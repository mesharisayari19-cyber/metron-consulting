import { brandColors } from "../branding/colors";

export const themeExtend = {
  colors: {
    brand: brandColors.primary,
    surface: brandColors.neutral,
    accent: brandColors.accent,
  },
  fontFamily: {
    sans: ["var(--font-sans)", "Montserrat", "system-ui", "sans-serif"],
    arabic: ["var(--font-arabic)", "Neo Sans Arabic", "IBM Plex Sans Arabic", "system-ui", "sans-serif"],
  },
  spacing: {
    section: "7rem",
    "section-sm": "5rem",
  },
  maxWidth: {
    content: "1280px",
    prose: "720px",
  },
  boxShadow: {
    card: "0 1px 3px 0 rgb(15 34 53 / 0.04), 0 8px 32px -4px rgb(27 61 92 / 0.08)",
    "card-hover": "0 24px 48px -12px rgb(27 61 92 / 0.14)",
    elevated: "0 32px 64px -16px rgb(27 61 92 / 0.18)",
    executive: "0 4px 24px -4px rgb(27 61 92 / 0.1)",
  },
  animation: {
    "fade-in": "fadeIn 0.6s ease-out forwards",
    "slide-up": "slideUp 0.6s ease-out forwards",
  },
  keyframes: {
    fadeIn: {
      "0%": { opacity: "0" },
      "100%": { opacity: "1" },
    },
    slideUp: {
      "0%": { opacity: "0", transform: "translateY(24px)" },
      "100%": { opacity: "1", transform: "translateY(0)" },
    },
  },
};
