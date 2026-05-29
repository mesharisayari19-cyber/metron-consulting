/**
 * CMS integration guide
 *
 * This file documents how content maps to CMS collections.
 * Replace data imports in section components with CMS fetches when ready.
 *
 * Recommended CMS: Sanity, Contentful, or Strapi
 *
 * Collections:
 * - teamMembers    → src/data/team.ts
 * - services       → src/data/services.ts
 * - clients        → src/data/clients.ts
 * - translations   → src/i18n/translations.ts (or CMS i18n plugin)
 * - siteSettings   → theme/theme.config.ts (contact, assets, SEO)
 * - branding       → branding/* (or CMS media library)
 */

export const cmsCollections = {
  team: "teamMembers",
  services: "services",
  clients: "clients",
  pages: ["home", "about", "services", "team", "clients", "contact"],
} as const;
