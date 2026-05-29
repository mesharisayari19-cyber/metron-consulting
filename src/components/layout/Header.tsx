"use client";

import { brandLogo } from "@branding/logo";
import { brandIcons } from "@branding/icons";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "@/context/LocaleContext";

export function Header() {
  const { t, toggleLocale, dir, isArabic } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const MenuIcon = brandIcons.ui.menu;
  const CloseIcon = brandIcons.ui.close;
  const GlobeIcon = brandIcons.ui.globe;

  const navItems = [
    { id: "home", label: t.nav.home, href: "#home" },
    { id: "about", label: t.nav.about, href: "#about" },
    { id: "services", label: t.nav.services, href: "#services" },
    { id: "team", label: t.nav.team, href: "#team" },
    { id: "clients", label: t.nav.clients, href: "#clients" },
    { id: "contact", label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-surface-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          <Link
            href="#home"
            className="flex items-center gap-3 group"
            onClick={() => setMobileOpen(false)}
          >
            <div className="w-10 h-10 rounded-md bg-brand-700 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-brand-800 transition-colors">
              M
            </div>
            <div className="flex flex-col leading-tight">
              <span
                className={`font-semibold text-lg ${
                  scrolled ? "text-brand-900" : "text-white"
                }`}
              >
                {isArabic ? brandLogo.wordmark.ar : brandLogo.wordmark.en}
              </span>
              <span
                className={`text-xs ${
                  scrolled ? "text-surface-500" : "text-white/70"
                }`}
              >
                {isArabic ? brandLogo.tagline.ar : brandLogo.tagline.en}
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  scrolled
                    ? "text-surface-700 hover:text-brand-700 hover:bg-brand-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLocale}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                scrolled
                  ? "text-brand-700 hover:bg-brand-50"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Switch language"
            >
              <GlobeIcon className="w-4 h-4" />
              {t.common.switchLang}
            </button>

            <button
              type="button"
              className={`lg:hidden p-2 rounded-md ${
                scrolled ? "text-brand-800" : "text-white"
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <CloseIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-surface-200 shadow-lg overflow-hidden"
            dir={dir}
          >
            <nav className="flex flex-col p-4 gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-brand-900 font-medium rounded-md hover:bg-brand-50"
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  toggleLocale();
                  setMobileOpen(false);
                }}
                className="px-4 py-3 text-brand-700 font-medium rounded-md hover:bg-brand-50 text-start flex items-center gap-2"
              >
                <GlobeIcon className="w-4 h-4" />
                {t.common.switchLang}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
