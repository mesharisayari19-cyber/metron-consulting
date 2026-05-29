/**
 * Metron brand color palette
 * Update these values to rebrand without touching components.
 */
export const brandColors = {
  primary: {
    50: "#E8F0FA",
    100: "#C5D9F0",
    200: "#9BBDE5",
    300: "#6A9DD6",
    400: "#3D7BC4",
    500: "#1A5FA8",
    600: "#0F4A8C",
    700: "#0A3A70",
    800: "#072D57",
    900: "#041F3D",
    950: "#021428",
  },
  neutral: {
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
    950: "#020617",
  },
  accent: {
    gold: "#C9A962",
    light: "#FFFFFF",
  },
  semantic: {
    success: "#059669",
    warning: "#D97706",
    error: "#DC2626",
  },
} as const;

export type BrandColors = typeof brandColors;
