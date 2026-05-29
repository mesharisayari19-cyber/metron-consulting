"use client";

import { brandLogo } from "@branding/logo";
import { themeConfig } from "@theme/theme.config";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";

export function Footer() {
  const { t, isArabic } = useLocale();
  const year = new Date().getFullYear();

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#team", label: t.nav.team },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer className="bg-brand-950 text-white/80">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-md bg-brand-600 flex items-center justify-center text-white font-bold">
                M
              </div>
              <div>
                <p className="font-semibold text-white text-lg">
                  {isArabic ? brandLogo.wordmark.ar : brandLogo.wordmark.en}
                </p>
                <p className="text-sm text-white/60">
                  {isArabic ? brandLogo.tagline.ar : brandLogo.tagline.en}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              {isArabic
                ? themeConfig.seo.defaultDescription.ar
                : themeConfig.seo.defaultDescription.en}
            </p>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">{t.nav.home}</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">{t.contact.title}</h3>
            <p className="text-sm mb-2">
              {isArabic
                ? themeConfig.contact.address.ar
                : themeConfig.contact.address.en}
            </p>
            <a
              href={`mailto:${themeConfig.contact.email}`}
              className="text-sm text-brand-300 hover:text-white transition-colors"
            >
              {themeConfig.contact.email}
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>
            © {year}{" "}
            {isArabic ? brandLogo.wordmark.ar : brandLogo.wordmark.en}.{" "}
            {t.footer.rights}
          </p>
          <p>{t.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
