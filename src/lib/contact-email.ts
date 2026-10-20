import type { ContactFormPayload } from "@/lib/contact-form";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildContactEmail(payload: ContactFormPayload): {
  subject: string;
  text: string;
  html: string;
} {
  const phoneLine = payload.phone || "—";
  const subject = `رسالة جديدة من موقع ميترون — ${payload.name.replace(/[\r\n]/g, " ")}`;
  const text = [
    `الاسم: ${payload.name}`,
    `البريد الإلكتروني: ${payload.email}`,
    `رقم الجوال: ${phoneLine}`,
    "",
    "الرسالة:",
    payload.message,
  ].join("\n");
  const html = `
        <h2>رسالة جديدة من نموذج التواصل</h2>
        <p><strong>الاسم:</strong> ${escapeHtml(payload.name)}</p>
        <p><strong>البريد الإلكتروني:</strong> ${escapeHtml(payload.email)}</p>
        <p><strong>رقم الجوال:</strong> ${escapeHtml(phoneLine)}</p>
        <p><strong>الرسالة:</strong></p>
        <p>${escapeHtml(payload.message).replace(/\n/g, "<br />")}</p>
      `;

  return { subject, text, html };
}
