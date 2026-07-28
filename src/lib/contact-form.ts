export const CONTACT_TO_EMAIL = "contact@metron.sa";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ContactFormPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
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
  if (!payload.name || payload.name.length < 2) return false;
  if (!payload.email || !EMAIL_REGEX.test(payload.email)) return false;
  if (!payload.message || payload.message.length < 5) return false;
  return true;
}
