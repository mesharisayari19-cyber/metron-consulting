import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildContactEmail } from "@/lib/contact-email";
import {
  isHoneypotTriggered,
  parseContactFormPayload,
  validateContactForm,
} from "@/lib/contact-form";
import { checkContactRateLimit, contactClientKey } from "@/lib/contact-rate-limit";
import { readContactRequest } from "@/lib/contact-request";

type ContactErrorCode = "invalid_payload" | "server_config" | "send_failed" | "rate_limited";

function contactError(error: ContactErrorCode, status: number) {
  return NextResponse.json({ error }, { status });
}

function configuredMailbox(name: "CONTACT_FROM_EMAIL" | "CONTACT_TO_EMAIL"): string | null {
  const value = process.env[name]?.trim();
  if (!value || value.length > 320 || /[\r\n]/.test(value)) return null;
  return value;
}

export async function POST(request: Request) {
  try {
    const decision = await checkContactRateLimit(contactClientKey(request));
    if (decision === "limit") {
      console.warn("Contact form rejected: rate_limited");
      return contactError("rate_limited", 429);
    }
    if (decision === "unavailable") {
      console.error("Contact form: shared rate limiter could not be verified.");
      return contactError("server_config", 503);
    }

    const body = await readContactRequest(request);
    if (!body.ok) {
      console.warn(`Contact form rejected: ${body.reason}`);
      return contactError("invalid_payload", body.status);
    }

    const payload = parseContactFormPayload(body.value);
    if (!payload || !validateContactForm(payload)) {
      console.warn("Contact form rejected: invalid_payload");
      return contactError("invalid_payload", 400);
    }
    if (isHoneypotTriggered(payload)) {
      console.warn("Contact form rejected: honeypot");
      return contactError("invalid_payload", 400);
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    const from = configuredMailbox("CONTACT_FROM_EMAIL");
    const to = configuredMailbox("CONTACT_TO_EMAIL");
    if (!apiKey || !from || !to) {
      console.error("Contact form: email environment variables are not configured.");
      return contactError("server_config", 500);
    }

    const email = buildContactEmail(payload);
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: payload.email,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });

    if (error || !data?.id) {
      console.error("Contact form: email provider rejected the message.", {
        name: error?.name ?? "missing_id",
        statusCode: error?.statusCode ?? null,
      });
      return contactError("send_failed", 502);
    }

    console.info("Contact form accepted by email provider.");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form send failed.", {
      name: error instanceof Error ? error.name : "Error",
    });
    return contactError("send_failed", 500);
  }
}
