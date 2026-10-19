import {
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";

export const CONTACT_TO_EMAIL = "contact@metron.sa";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_TYPING = /^\+?[\d\s()-]*$/;

export interface ContactFormPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface DialCountry {
  iso: CountryCode;
  dial: string;
  name: string;
}

export function isAllowedNameText(value: string): boolean {
  for (const char of value) {
    if (char === " " || char === "\u00A0" || char === "-" || char === "'" || char === "\u2019" || char === "\u2018") {
      continue;
    }
    if (/\p{N}/u.test(char)) return false;
    if (/\p{M}/u.test(char)) continue;
    if (!/\p{L}/u.test(char)) return false;
    if (!/\p{Script=Arabic}/u.test(char) && !/\p{Script=Latin}/u.test(char)) return false;
  }
  return true;
}

export function isValidPersonName(value: string): boolean {
  const name = value.trim();
  if (name.length < 2) return false;
  if (!isAllowedNameText(name)) return false;
  return /\p{L}/u.test(name);
}

export function isAllowedPhoneTyping(value: string): boolean {
  return PHONE_TYPING.test(value);
}

export function toE164(country: CountryCode, nationalNumber: string): string | null {
  const trimmed = nationalNumber.trim();
  if (!trimmed) return null;

  const parsed = trimmed.startsWith("+")
    ? parsePhoneNumberFromString(trimmed)
    : parsePhoneNumberFromString(trimmed, country);

  if (!parsed?.isValid()) return null;
  return parsed.number;
}

export function normalizePastedPhone(
  raw: string,
  country: CountryCode
): { country: CountryCode; national: string } | null {
  const cleaned = raw.replace(/[^\d+\s()-]/g, "").trim();
  if (!cleaned || !/\d/.test(cleaned)) return null;

  const international = cleaned.startsWith("+") ? parsePhoneNumberFromString(cleaned) : undefined;
  if (international?.isValid() && international.country) {
    return { country: international.country, national: international.formatNational() };
  }

  const local = parsePhoneNumberFromString(cleaned, country);
  if (local?.isValid()) {
    return { country, national: local.formatNational() };
  }

  return null;
}

export function isValidOptionalPhone(phone: string): boolean {
  if (!phone) return true;
  return isValidPhoneNumber(phone);
}

export function listDialCountries(locale: "ar" | "en"): DialCountry[] {
  const names = new Intl.DisplayNames([locale], { type: "region" });
  const countries = getCountries().map((iso) => ({
    iso,
    dial: getCountryCallingCode(iso),
    name: names.of(iso) ?? iso,
  }));

  countries.sort((a, b) => a.name.localeCompare(b.name, locale));

  const saudiIndex = countries.findIndex((country) => country.iso === "SA");
  if (saudiIndex > 0) {
    const [saudi] = countries.splice(saudiIndex, 1);
    countries.unshift(saudi);
  }

  return countries;
}

export function parseContactFormPayload(body: unknown): ContactFormPayload | null {
  if (!body || typeof body !== "object") return null;

  const data = body as Record<string, unknown>;

  return {
    name: String(data.name ?? "").trim(),
    email: String(data.email ?? "").trim(),
    phone: String(data.phone ?? "").trim(),
    message: String(data.message ?? "").trim(),
  };
}

export function validateContactForm(payload: ContactFormPayload): boolean {
  if (!isValidPersonName(payload.name)) return false;
  if (!payload.email || !EMAIL_REGEX.test(payload.email)) return false;
  if (!isValidOptionalPhone(payload.phone)) return false;
  if (!payload.message || payload.message.length < 5) return false;
  return true;
}
