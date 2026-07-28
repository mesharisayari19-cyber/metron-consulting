import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  CONTACT_TO_EMAIL,
  parseContactFormPayload,
  validateContactForm,
} from "@/lib/contact-form";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = parseContactFormPayload(body);

    if (!payload || !validateContactForm(payload)) {
      return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("Contact form: SMTP environment variables are not configured.");
      return NextResponse.json({ error: "server_config" }, { status: 500 });
    }

    const smtpPort = Number(process.env.SMTP_PORT || "587");
    const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
    const smtpFrom = process.env.SMTP_FROM || smtpUser;
    const recipient = process.env.CONTACT_TO_EMAIL || CONTACT_TO_EMAIL;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const phoneLine = payload.phone || "—";

    await transporter.sendMail({
      from: smtpFrom,
      to: recipient,
      replyTo: payload.email,
      subject: `رسالة جديدة من موقع ميترون — ${payload.name}`,
      text: [
        `الاسم: ${payload.name}`,
        `البريد الإلكتروني: ${payload.email}`,
        `رقم الجوال: ${phoneLine}`,
        "",
        "الرسالة:",
        payload.message,
      ].join("\n"),
      html: `
        <h2>رسالة جديدة من نموذج التواصل</h2>
        <p><strong>الاسم:</strong> ${escapeHtml(payload.name)}</p>
        <p><strong>البريد الإلكتروني:</strong> ${escapeHtml(payload.email)}</p>
        <p><strong>رقم الجوال:</strong> ${escapeHtml(phoneLine)}</p>
        <p><strong>الرسالة:</strong></p>
        <p>${escapeHtml(payload.message).replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form send failed:", error);
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
