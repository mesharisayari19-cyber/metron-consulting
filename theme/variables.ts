import { brandColors } from "../branding/colors";

/**
 * Tailwind theme extension — sourced from branding tokens.
 */
export const themeExtend = {
  colors: {
    brand: brandColors.primary,
    surface: brandColors.neutral,
    accent: brandColors.accent,
  },
  fontFamily: {
    sans: ["var(--font-inter)", "system-ui", "sans-serif"],
    arabic: ["var(--font-ibm-plex-arabic)", "Cairo", "system-ui", "sans-serif"],
  },
  spacing: {
    section: "6rem",
    "section-sm": "4rem",
  },
  maxWidth: {
    content: "1280px",
    prose: "720px",
  },
  boxShadow: {
    card: "0 1px 3px 0 rgb(0 0 0 / 0.04), 0 4px 24px -2px rgb(15 74 140 / 0.08)",
    "card-hover":
      "0 4px 6px -1px rgb(0 0 0 / 0.06), 0 12px 32px -4px rgb(15 74 140 / 0.12)",
    elevated: "0 25px 50px -12px rgb(15 74 140 / 0.15)",
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
      "0%": { opacity: "0", transform: "translateY(20px)" },
      "100%": { opacity: "1", transform: "translateY(0)" },
    },
  },
  transitionDuration: {
    DEFAULT: "300ms",
  },
};
