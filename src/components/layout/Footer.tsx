"use client";

import { Logo } from "@/components/brand/Logo";
import { themeConfig } from "@theme/theme.config";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { Linkedin } from "lucide-react";

export function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#why-metron", label: t.whyMetron.title },
    { href: "#team", label: t.nav.team },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer className="bg-brand-950 text-white/75 border-t border-white/5">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          <div className="lg:col-span-2">
            <Logo variant="horizontalLight" size="footer" href="#home" />
            <p className="mt-6 text-sm leading-relaxed max-w-md text-white/60">
              {t.footer.summary}
            </p>
            {themeConfig.contact.linkedin ? (
              <a
                href={themeConfig.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-sm text-white/50 hover:text-white transition-colors"
                aria-label={t.footer.linkedin}
              >
                <Linkedin className="w-4 h-4" />
                {t.footer.linkedin}
              </a>
            ) : null}
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-5">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-3">
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
            <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-5">
              {t.contact.title}
            </h3>
            <p className="text-sm mb-3">{t.contact.location}</p>
            <a
              href={`mailto:${themeConfig.contact.email}`}
              className="text-sm text-brand-300 hover:text-white transition-colors"
            >
              {themeConfig.contact.email}
            </a>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>© {year} Metron Consulting. {t.footer.rights}</p>
          <p className="tracking-widest uppercase text-xs">{t.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
