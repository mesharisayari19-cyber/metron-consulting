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
            className="order-2 lg:order-2 min-w-0"
          >
            <div className="card-premium-static p-6 sm:p-8 md:p-10">
              <h3 className="text-2xl font-semibold text-brand-900 mb-8">{t.contact.title}</h3>

              <div className="space-y-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-surface-500 text-lg font-semibold">{t.contact.email}</p>
                    <a
                      href={`mailto:${themeConfig.contact.email}`}
                      className="mt-2 block text-brand-900 text-2xl font-semibold leading-tight break-all hover:text-brand-700 transition-colors duration-200 ease-out"
                      dir="ltr"
                    >
                      {themeConfig.contact.email}
                    </a>
                  </div>
                  <div className="w-10 h-10 rounded-lg border border-brand-100 bg-brand-50 flex items-center justify-center shrink-0">
                    <MailIcon className="w-5 h-5 text-brand-600" strokeWidth={ICON_STROKE} />
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-surface-500 text-lg font-semibold">{t.contact.phone}</p>
                    <a
                      href={phoneHref}
                      className="mt-2 block text-brand-900 text-2xl font-semibold leading-tight break-all hover:text-brand-700 transition-colors duration-200 ease-out"
                      dir="ltr"
                    >
                      {themeConfig.contact.phone}
                    </a>
                  </div>
                  <div className="w-10 h-10 rounded-lg border border-brand-100 bg-brand-50 flex items-center justify-center shrink-0">
                    <PhoneIcon className="w-5 h-5 text-brand-600" strokeWidth={ICON_STROKE} />
                  </div>
                </div>

                <div className="pt-2 border-t border-surface-200/80">
                  <p className="text-surface-500 text-base font-semibold mb-4">{t.footer.linkedin} & {t.contact.social.x}</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <a
                      href={themeConfig.contact.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-surface-200/90 bg-white px-4 py-3 hover:border-brand-200 hover:bg-brand-50/40 transition-all duration-200 ease-out"
                      dir="ltr"
                    >
                      <div className="flex items-center gap-2 text-brand-700 font-semibold">
                        <LinkedInIcon className="w-4 h-4" strokeWidth={ICON_STROKE} />
                        <span>{t.footer.linkedin}</span>
                      </div>
                      <p className="mt-1 text-sm text-surface-600 break-all">
                        {themeConfig.contact.social.linkedin.replace(/^https?:\/\//, "")}
                      </p>
                    </a>
                    <a
                      href={themeConfig.contact.social.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-surface-200/90 bg-white px-4 py-3 hover:border-brand-200 hover:bg-brand-50/40 transition-all duration-200 ease-out"
                      dir="ltr"
                    >
                      <div className="flex items-center gap-2 text-brand-700 font-semibold">
                        <XIcon className="w-4 h-4" />
                        <span>{t.contact.social.x}</span>
                      </div>
                      <p className="mt-1 text-sm text-surface-600 break-all">
                        {themeConfig.contact.social.x.replace(/^https?:\/\//, "")}
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
