/**
 * Approved company values — keys only; copy lives in src/i18n/translations.ts
 */
export const valueKeys = [
  "professionalQuality",
  "integrity",
  "sustainableImpact",
  "clientFocus",
] as const;

export type ValueKey = (typeof valueKeys)[number];
