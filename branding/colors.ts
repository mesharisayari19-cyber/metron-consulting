/**
 * Official Metron brand palette — Brand Identity Guide
 */
export const brandColors = {
  primary: {
    50: "#EEF2F6",
    100: "#D4DEE8",
    200: "#A8B8C8",
    300: "#8FA3B5",
    400: "#6B8AA5",
    500: "#4A6B8A",
    600: "#2E5270",
    700: "#1B3D5C",
    800: "#152F47",
    900: "#0F2235",
    950: "#0A1828",
  },
  neutral: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
    950: "#030712",
  },
  accent: {
    barLight: "#B8C9D6",
    barMid: "#6B8AA5",
    barDark: "#1B3D5C",
    light: "#FFFFFF",
  },
  semantic: {
    success: "#059669",
    warning: "#D97706",
    error: "#DC2626",
  },
} as const;

export type BrandColors = typeof brandColors;
