"use client";

import { ICON_STROKE, brandIcons } from "@branding/icons";
import { themeConfig } from "@theme/theme.config";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/context/LocaleContext";

export function Contact() {
  const { t } = useLocale();
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const MailIcon = brandIcons.ui.mail;
  const PhoneIcon = brandIcons.ui.phone;
  const LinkedInIcon = brandIcons.ui.linkedin;
  const XIcon = brandIcons.ui.x;
  const phoneHref = `tel:${themeConfig.contact.phone.replace(/\s/g, "")}`;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("success"), 1200);
  };

  return (
    <section id="contact" className="section-executive bg-surface-50">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.contact.title} subtitle={t.contact.subtitle} />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="card-premium-static p-8 md:p-10 space-y-5 order-1 lg:order-1"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-brand-900 mb-2">
                {t.contact.form.name}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3.5 rounded-md border border-surface-300 bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-brand-900 mb-2">
                {t.contact.form.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                dir="ltr"
                className="w-full px-4 py-3.5 rounded-md border border-surface-300 bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 outline-none transition-all text-start"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-brand-900 mb-2">
                {t.contact.phone}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                dir="ltr"
                className="w-full px-4 py-3.5 rounded-md border border-surface-300 bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 outline-none transition-all text-start"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-brand-900 mb-2">
                {t.contact.form.message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full px-4 py-3.5 rounded-md border border-surface-300 bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 outline-none transition-all resize-none"
              />
            </div>
            {status === "success" ? (
              <p className="text-semantic-success text-sm font-medium">{t.contact.form.success}</p>
            ) : (
              <Button type="submit" variant="primary" size="lg">
                {status === "sending" ? t.contact.form.sending : t.contact.form.submit}
              </Button>
            )}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-6 order-2 lg:order-2"
          >
            <div className="card-premium-static p-8 md:p-10 flex gap-5">
              <div className="w-12 h-12 rounded-lg bg-brand-700 flex items-center justify-center shrink-0">
                <MailIcon className="w-5 h-5 text-white" strokeWidth={ICON_STROKE} />
              </div>
              <div>
                <h3 className="font-semibold text-brand-900 mb-1">{t.contact.email}</h3>
                <a
                  href={`mailto:${themeConfig.contact.email}`}
                  className="text-brand-600 hover:text-brand-800 text-lg transition-colors"
                  dir="ltr"
                >
                  {themeConfig.contact.email}
                </a>
              </div>
            </div>

            <div className="card-premium-static p-8 md:p-10 flex gap-5">
              <div className="w-12 h-12 rounded-lg bg-brand-700 flex items-center justify-center shrink-0">
                <PhoneIcon className="w-5 h-5 text-white" strokeWidth={ICON_STROKE} />
              </div>
              <div>
                <h3 className="font-semibold text-brand-900 mb-1">{t.contact.phone}</h3>
                <a
                  href={phoneHref}
                  className="text-brand-600 hover:text-brand-800 text-lg transition-colors"
                  dir="ltr"
                >
                  {themeConfig.contact.phone}
                </a>
              </div>
            </div>

            <div className="card-premium-static p-8 md:p-10 flex gap-5">
              <div className="w-12 h-12 rounded-lg bg-brand-700 flex items-center justify-center shrink-0">
                <LinkedInIcon className="w-5 h-5 text-white" strokeWidth={ICON_STROKE} />
              </div>
              <div>
                <h3 className="font-semibold text-brand-900 mb-1">{t.footer.linkedin}</h3>
                <a
                  href={themeConfig.contact.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 hover:text-brand-800 text-lg transition-colors"
                  dir="ltr"
                >
                  {themeConfig.contact.social.linkedin.replace(/^https?:\/\//, "")}
                </a>
              </div>
            </div>

            <div className="card-premium-static p-8 md:p-10 flex gap-5">
              <div className="w-12 h-12 rounded-lg bg-brand-700 flex items-center justify-center shrink-0">
                <XIcon className="w-[1.125rem] h-[1.125rem] text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-900 mb-1">{t.contact.social.x}</h3>
                <a
                  href={themeConfig.contact.social.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 hover:text-brand-800 text-lg transition-colors"
                  dir="ltr"
                >
                  {themeConfig.contact.social.x.replace(/^https?:\/\//, "")}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
