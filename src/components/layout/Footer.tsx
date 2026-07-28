"use client";

import { ICON_STROKE, brandIcons } from "@branding/icons";
import { Logo } from "@/components/brand/Logo";
import { themeConfig } from "@theme/theme.config";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";

export function Footer() {
  const { t, dir, isArabic } = useLocale();
  const year = new Date().getFullYear();
  const copyright = t.footer.copyright.replace("{year}", String(year));
  const LinkedInIcon = brandIcons.ui.linkedin;
  const XIcon = brandIcons.ui.x;
  const phoneHref = `tel:${themeConfig.contact.phone.replace(/\s/g, "")}`;
  const linkedinUrl = themeConfig.contact.linkedin || themeConfig.contact.social.linkedin;
  const xUrl = themeConfig.contact.social.x;

  const sectionHeadingClass = isArabic
    ? "text-white font-semibold text-sm tracking-normal mb-5"
    : "text-white font-semibold text-sm tracking-widest uppercase mb-5";

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#team", label: t.nav.team },
    { href: "#clients", label: t.nav.clients },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer className="bg-brand-950 text-white/75 border-t border-white/5">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14 items-start">
          <div className="lg:col-span-2">
            <Logo variant="horizontalLight" size="footer" href="#home" />
            <p className="mt-7 text-sm leading-relaxed max-w-md text-white/60">
              {t.footer.summary}
            </p>
            <div className="mt-7 flex items-center gap-3.5">
              {linkedinUrl ? (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/25 text-white/50 hover:border-white/50 hover:text-white transition-all duration-200 ease-out"
                  aria-label={t.footer.linkedin}
                >
                  <LinkedInIcon className="w-4 h-4 shrink-0" strokeWidth={ICON_STROKE} />
                </a>
              ) : null}
              {xUrl ? (
                <a
                  href={xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/25 text-white/50 hover:border-white/50 hover:text-white transition-all duration-200 ease-out"
                  aria-label={t.contact.social.x}
                >
                  <XIcon className="w-4 h-4 shrink-0" />
                </a>
              ) : null}
            </div>
          </div>

          <div className="lg:pt-1">
            <h3 className={sectionHeadingClass}>{t.footer.quickLinks}</h3>
            <ul className="space-y-3.5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors duration-200 ease-out"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-start lg:pt-1">
            <h3 className={sectionHeadingClass}>{t.contact.title}</h3>
            <div className="flex flex-col gap-3.5 w-fit max-w-full" dir="ltr">
              <a
                href={phoneHref}
                className="block text-sm text-brand-300 hover:text-white transition-colors duration-200 ease-out text-start leading-none"
              >
                {themeConfig.contact.phone}
              </a>
              <a
                href={`mailto:${themeConfig.contact.email}`}
                className="block text-sm text-brand-300 hover:text-white transition-colors duration-200 ease-out text-start leading-none"
              >
                {themeConfig.contact.email}
              </a>
            </div>
          </div>
        </div>

        <div
          className="mt-16 pt-8 border-t border-white/10 text-sm text-white/40 text-center sm:text-start"
          dir={dir}
        >
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
