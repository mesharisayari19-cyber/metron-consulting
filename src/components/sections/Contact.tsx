"use client";

import { brandIcons } from "@branding/icons";
import { themeConfig } from "@theme/theme.config";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/context/LocaleContext";

export function Contact() {
  const { t, isArabic } = useLocale();
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const MailIcon = brandIcons.ui.mail;
  const MapPinIcon = brandIcons.ui.mapPin;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("success"), 1200);
  };

  return (
    <section id="contact" className="py-section-sm md:py-section bg-surface-50">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.contact.title} subtitle={t.contact.subtitle} />

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <MapPinIcon className="w-5 h-5 text-brand-700" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-900">{t.contact.address}</h3>
                <p className="text-surface-600 mt-1">
                  {isArabic
                    ? themeConfig.contact.address.ar
                    : themeConfig.contact.address.en}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <MailIcon className="w-5 h-5 text-brand-700" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-900">{t.contact.email}</h3>
                <a
                  href={`mailto:${themeConfig.contact.email}`}
                  className="text-brand-600 hover:text-brand-800 mt-1 inline-block transition-colors"
                >
                  {themeConfig.contact.email}
                </a>
              </div>
            </div>

            <div className="rounded-lg border border-dashed border-surface-300 bg-white p-8 text-center text-surface-500 text-sm min-h-[200px] flex items-center justify-center">
              {t.contact.mapPlaceholder}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isArabic ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg border border-surface-200 shadow-card p-6 md:p-8 space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-brand-900 mb-2">
                  {t.contact.form.name}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-md border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-brand-900 mb-2">
                  {t.contact.form.email}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-md border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-brand-900 mb-2">
                  {t.contact.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-md border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all resize-none"
                />
              </div>

              {status === "success" ? (
                <p className="text-semantic-success text-sm font-medium">
                  {t.contact.form.success}
                </p>
              ) : (
                <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
                  {status === "sending" ? t.contact.form.sending : t.contact.form.submit}
                </Button>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
