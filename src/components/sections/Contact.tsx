"use client";

import { ICON_STROKE, brandIcons } from "@branding/icons";
import { themeConfig } from "@theme/theme.config";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/context/LocaleContext";

type FormStatus = "idle" | "sending" | "success" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const { t } = useLocale();
  const [status, setStatus] = useState<FormStatus>("idle");
  const MailIcon = brandIcons.ui.mail;
  const PhoneIcon = brandIcons.ui.phone;
  const LinkedInIcon = brandIcons.ui.linkedin;
  const XIcon = brandIcons.ui.x;
  const phoneHref = `tel:${themeConfig.contact.phone.replace(/\s/g, "")}`;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("idle");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message || !EMAIL_REGEX.test(email)) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, message }),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
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
            noValidate
            className="card-premium-static p-6 sm:p-8 md:p-10 space-y-5 order-1 lg:order-1 min-w-0"
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
                minLength={2}
                autoComplete="name"
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
                autoComplete="email"
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
                autoComplete="tel"
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
                minLength={5}
                className="w-full px-4 py-3.5 rounded-md border border-surface-300 bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 outline-none transition-all resize-none"
              />
            </div>

            {status === "success" ? (
              <p className="text-semantic-success text-sm font-medium" role="status">
                {t.contact.form.success}
              </p>
            ) : null}

            {status === "error" ? (
              <p className="text-red-600 text-sm font-medium" role="alert">
                {t.contact.form.error}
              </p>
            ) : null}

            {status !== "success" ? (
              <Button type="submit" variant="primary" size="lg" disabled={status === "sending"}>
                {status === "sending" ? t.contact.form.sending : t.contact.form.submit}
              </Button>
            ) : null}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-5 order-2 lg:order-2 min-w-0"
          >
            <div className="card-premium-static p-6 sm:p-8 md:p-10 flex gap-4 sm:gap-5 min-w-0">
              <div className="w-12 h-12 rounded-lg bg-brand-700 flex items-center justify-center shrink-0">
                <MailIcon className="w-5 h-5 text-white" strokeWidth={ICON_STROKE} />
              </div>
              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <h3 className="font-semibold text-brand-900">{t.contact.email}</h3>
                <a
                  href={`mailto:${themeConfig.contact.email}`}
                  className="mt-1.5 text-brand-600 hover:text-brand-800 text-sm sm:text-base transition-colors duration-200 ease-out break-all"
                  dir="ltr"
                >
                  {themeConfig.contact.email}
                </a>
              </div>
            </div>

            <div className="card-premium-static p-6 sm:p-8 md:p-10 flex gap-4 sm:gap-5 min-w-0">
              <div className="w-12 h-12 rounded-lg bg-brand-700 flex items-center justify-center shrink-0">
                <PhoneIcon className="w-5 h-5 text-white" strokeWidth={ICON_STROKE} />
              </div>
              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <h3 className="font-semibold text-brand-900">{t.contact.phone}</h3>
                <a
                  href={phoneHref}
                  className="mt-1.5 text-brand-600 hover:text-brand-800 text-sm sm:text-base transition-colors duration-200 ease-out break-all"
                  dir="ltr"
                >
                  {themeConfig.contact.phone}
                </a>
              </div>
            </div>

            <div className="card-premium-static p-6 sm:p-8 md:p-10 flex gap-4 sm:gap-5 min-w-0">
              <div className="w-12 h-12 rounded-lg bg-brand-700 flex items-center justify-center shrink-0">
                <LinkedInIcon className="w-5 h-5 text-white" strokeWidth={ICON_STROKE} />
              </div>
              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <h3 className="font-semibold text-brand-900">{t.footer.linkedin}</h3>
                <a
                  href={themeConfig.contact.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 text-brand-600 hover:text-brand-800 text-sm sm:text-base transition-colors duration-200 ease-out break-all"
                  dir="ltr"
                >
                  {themeConfig.contact.social.linkedin.replace(/^https?:\/\//, "")}
                </a>
              </div>
            </div>

            <div className="card-premium-static p-6 sm:p-8 md:p-10 flex gap-4 sm:gap-5 min-w-0">
              <div className="w-12 h-12 rounded-lg bg-brand-700 flex items-center justify-center shrink-0">
                <XIcon className="w-[1.125rem] h-[1.125rem] text-white" />
              </div>
              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <h3 className="font-semibold text-brand-900">{t.contact.social.x}</h3>
                <a
                  href={themeConfig.contact.social.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 text-brand-600 hover:text-brand-800 text-sm sm:text-base transition-colors duration-200 ease-out break-all"
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
