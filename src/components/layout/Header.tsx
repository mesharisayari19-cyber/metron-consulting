"use client";

import { brandIcons } from "@branding/icons";
import { Logo } from "@/components/brand/Logo";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "@/context/LocaleContext";

export function Header() {
  const { t, toggleLocale, dir } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const MenuIcon = brandIcons.ui.menu;
  const CloseIcon = brandIcons.ui.close;
  const GlobeIcon = brandIcons.ui.globe;

  const navItems = [
    { id: "about", label: t.nav.about, href: "#about" },
    { id: "services", label: t.nav.services, href: "#services" },
    { id: "team", label: t.nav.team, href: "#team" },
    { id: "clients", label: t.nav.clients, href: "#clients" },
    { id: "contact", label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
      className={`fixed top-0 inset-x-0 z-50 h-[var(--header-height)] transition-all duration-500 ${
        scrolled ? "glass-header" : "glass-header-dark"
      }`}
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full gap-4">
          <Logo
            variant={scrolled ? "horizontal" : "horizontalLight"}
            size="header"
            priority
            href="#home"
          />

          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-300 ${
                  scrolled
                    ? "text-brand-800 hover:text-brand-600 hover:bg-brand-50/80"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleLocale}
              className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full border transition-all duration-300 ${
                scrolled
                  ? "border-brand-200 text-brand-700 bg-brand-50/50 hover:bg-brand-100 hover:border-brand-300"
                  : "border-white/25 text-white bg-white/5 hover:bg-white/15 hover:border-white/40"
              }`}
              aria-label="Switch language"
            >
              <GlobeIcon className="w-4 h-4" />
              {t.common.switchLang}
            </button>

            <button
              type="button"
              className={`lg:hidden p-2.5 rounded-md transition-colors ${
                scrolled ? "text-brand-800 hover:bg-brand-50" : "text-white hover:bg-white/10"
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
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
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-surface-200 shadow-executive overflow-hidden"
            dir={dir}
          >
            <nav className="flex flex-col p-4 gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3.5 text-brand-900 font-medium rounded-lg hover:bg-brand-50"
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
                className="px-4 py-3.5 text-brand-700 font-semibold rounded-lg hover:bg-brand-50 text-start flex items-center gap-2 border border-brand-100 mt-2"
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
