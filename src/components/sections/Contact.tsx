"use client";

import { ICON_STROKE, brandIcons } from "@branding/icons";
import { themeConfig } from "@theme/theme.config";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import type { CountryCode } from "libphonenumber-js";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { PhoneField } from "@/components/ui/PhoneField";
import { useLocale } from "@/context/LocaleContext";
import { isAllowedNameText, isValidPersonName, toE164 } from "@/lib/contact-form";

type FormStatus = "idle" | "sending" | "success" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactLinkClass =
  "flex min-w-0 flex-col items-center justify-center gap-2 rounded-lg border border-brand-100 bg-brand-50 px-3 py-4 text-center text-brand-700 transition-colors duration-200 ease-out hover:border-brand-200 hover:bg-brand-100/70 hover:text-brand-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2";

const contactValueClass = "max-w-full text-xs font-medium leading-snug text-brand-800";

function ContactValue({ value }: { value: string }) {
  const parts = value.split("/");

  return (
    <span dir="ltr" className={contactValueClass}>
      {parts.map((part, index) => (
        <span key={`${part}-${index}`}>
          {part}
          {index < parts.length - 1 ? (
            <>
              /<wbr />
            </>
          ) : null}
        </span>
      ))}
    </span>
  );
}

export function Contact() {
  const { t, locale } = useLocale();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>("SA");
  const [phoneNational, setPhoneNational] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const MailIcon = brandIcons.ui.mail;
  const PhoneIcon = brandIcons.ui.phone;
  const LinkedInIcon = brandIcons.ui.linkedin;
  const XIcon = brandIcons.ui.x;
  const phoneHref = `tel:${themeConfig.contact.phone.replace(/\s/g, "")}`;

  const showPhoneError = () => setPhoneError(t.contact.form.phoneInvalid);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("idle");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const nameValue = name.trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const phoneValue = phoneNational.trim() ? toE164(phoneCountry, phoneNational) : "";

    let invalid = false;

    if (!isValidPersonName(nameValue)) {
      setNameError(t.contact.form.nameInvalid);
      invalid = true;
    } else {
      setNameError("");
    }

    if (phoneNational.trim() && !phoneValue) {
      showPhoneError();
      invalid = true;
    } else {
      setPhoneError("");
    }

    if (!email || !message || !EMAIL_REGEX.test(email)) {
      setStatus("error");
      invalid = true;
    }

    if (invalid || (phoneNational.trim() && !phoneValue)) return;

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameValue,
          email,
          phone: phoneValue ?? "",
          message,
        }),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      form.reset();
      setName("");
      setPhoneNational("");
      setPhoneCountry("SA");
      setNameError("");
      setPhoneError("");
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
                value={name}
                aria-invalid={nameError ? true : undefined}
                aria-describedby={nameError ? "name-error" : undefined}
                onChange={(event) => {
                  const next = event.target.value;
                  if (!isAllowedNameText(next)) {
                    setNameError(t.contact.form.nameInvalid);
                    return;
                  }
                  setName(next);
                  if (nameError) setNameError("");
                }}
                onPaste={(event) => {
                  const pasted = event.clipboardData.getData("text");
                  if (!isAllowedNameText(pasted)) {
                    event.preventDefault();
                    setNameError(t.contact.form.nameInvalid);
                  }
                }}
                className={`w-full px-4 py-3.5 rounded-md border bg-white outline-none transition-all ${
                  nameError
                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/15"
                    : "border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                }`}
              />
              {nameError ? (
                <p id="name-error" className="mt-2 text-sm font-medium text-red-600" role="alert">
                  {nameError}
                </p>
              ) : null}
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
              <PhoneField
                id="phone"
                locale={locale}
                country={phoneCountry}
                nationalNumber={phoneNational}
                onCountryChange={setPhoneCountry}
                onNationalNumberChange={setPhoneNational}
                invalidMessage={t.contact.form.phoneInvalid}
                labels={{
                  country: t.contact.phoneField.countryLabel,
                  search: t.contact.phoneField.searchPlaceholder,
                  empty: t.contact.phoneField.emptyResults,
                }}
                error={phoneError}
                onInvalid={showPhoneError}
                onClearError={() => setPhoneError("")}
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <a href={`mailto:${themeConfig.contact.email}`} className={contactLinkClass}>
                  <MailIcon className="h-6 w-6" strokeWidth={ICON_STROKE} />
                  <ContactValue value={themeConfig.contact.email} />
                </a>
                <a href={phoneHref} className={contactLinkClass}>
                  <PhoneIcon className="h-6 w-6" strokeWidth={ICON_STROKE} />
                  <ContactValue value={themeConfig.contact.phone} />
                </a>
                <a
                  href={themeConfig.contact.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactLinkClass}
                >
                  <LinkedInIcon className="h-6 w-6" strokeWidth={ICON_STROKE} />
                  <ContactValue value={themeConfig.contact.social.linkedin} />
                </a>
                <a
                  href={themeConfig.contact.social.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactLinkClass}
                >
                  <XIcon className="h-6 w-6" />
                  <ContactValue value={themeConfig.contact.social.x} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
