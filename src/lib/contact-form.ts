import {
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";

export const CONTACT_FIELD_LIMITS = {
  name: 100,
  email: 254,
  phone: 20,
  message: 3000,
} as const;

export const CONTACT_MAX_BODY_BYTES = 10 * 1024;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_TYPING = /^\+?[\d\s()-]*$/;
const HIDDEN_DIAL_COUNTRIES = new Set<CountryCode>(["IL"]);
const COUNTRY_NAME_OVERRIDES: Record<"ar" | "en", Partial<Record<CountryCode, string>>> = {
  ar: { PS: "فلسطين" },
  en: { PS: "Palestine" },
};

function isHiddenDialCountry(country: CountryCode | undefined): boolean {
  return country !== undefined && HIDDEN_DIAL_COUNTRIES.has(country);
}

export interface ContactFormPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  companyWebsite: string;
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
  if (name.length < 2 || name.length > CONTACT_FIELD_LIMITS.name) return false;
  if (!isAllowedNameText(name)) return false;
  return /\p{L}/u.test(name);
}

export function isValidContactEmail(value: string): boolean {
  if (!value || value.length > CONTACT_FIELD_LIMITS.email) return false;
  if (/[\u0000-\u001F\u007F<>]/.test(value)) return false;
  return EMAIL_REGEX.test(value);
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

  if (!parsed?.isValid() || isHiddenDialCountry(parsed.country)) return null;
  return parsed.number;
}

export function normalizePastedPhone(
  raw: string,
  country: CountryCode
): { country: CountryCode; national: string } | null {
  const cleaned = raw.replace(/[^\d+\s()-]/g, "").trim();
  if (!cleaned || !/\d/.test(cleaned)) return null;

  const international = cleaned.startsWith("+") ? parsePhoneNumberFromString(cleaned) : undefined;
  if (international?.isValid() && international.country && !isHiddenDialCountry(international.country)) {
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
  if (!isValidPhoneNumber(phone)) return false;
  return !isHiddenDialCountry(parsePhoneNumberFromString(phone)?.country);
}

export function listDialCountries(locale: "ar" | "en"): DialCountry[] {
  const names = new Intl.DisplayNames([locale], { type: "region" });
  const countries = getCountries()
    .filter((iso) => !isHiddenDialCountry(iso))
    .map((iso) => ({
      iso,
      dial: getCountryCallingCode(iso),
      name: COUNTRY_NAME_OVERRIDES[locale][iso] ?? names.of(iso) ?? iso,
    }));

  countries.sort((a, b) => a.name.localeCompare(b.name, locale));

  const saudiIndex = countries.findIndex((country) => country.iso === "SA");
  if (saudiIndex > 0) {
    const [saudi] = countries.splice(saudiIndex, 1);
    countries.unshift(saudi);
  }

  return countries;
}

function readTrimmedString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  return value.trim();
}

export function parseContactFormPayload(body: unknown): ContactFormPayload | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;

  const data = body as Record<string, unknown>;
  const name = readTrimmedString(data.name);
  const email = readTrimmedString(data.email);
  const message = readTrimmedString(data.message);
  const phone = data.phone === undefined || data.phone === null ? "" : readTrimmedString(data.phone);
  const companyWebsite =
    data.companyWebsite === undefined || data.companyWebsite === null
      ? ""
      : readTrimmedString(data.companyWebsite);

  if (name === null || email === null || message === null || phone === null || companyWebsite === null) {
    return null;
  }

  return { name, email, phone, message, companyWebsite };
}

export function isHoneypotTriggered(payload: ContactFormPayload): boolean {
  return payload.companyWebsite.length > 0;
}

export function validateContactForm(payload: ContactFormPayload): boolean {
  if (!isValidPersonName(payload.name)) return false;
  if (!isValidContactEmail(payload.email)) return false;
  if (payload.phone.length > CONTACT_FIELD_LIMITS.phone || !isValidOptionalPhone(payload.phone)) return false;
  if (payload.message.length < 5 || payload.message.length > CONTACT_FIELD_LIMITS.message) return false;
  return true;
}
