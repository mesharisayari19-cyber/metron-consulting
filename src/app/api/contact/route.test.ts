import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CONTACT_FIELD_LIMITS, CONTACT_MAX_BODY_BYTES } from "@/lib/contact-form";

const { mockSend, mockRateLimit } = vi.hoisted(() => ({
  mockSend: vi.fn(),
  mockRateLimit: vi.fn(),
}));

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: mockSend };
  },
}));

vi.mock("@/lib/contact-rate-limit", async () => {
  const actual = await vi.importActual<typeof import("@/lib/contact-rate-limit")>(
    "@/lib/contact-rate-limit"
  );
  return {
    ...actual,
    checkContactRateLimit: mockRateLimit,
  };
});

import { POST } from "./route";

const validPayload = {
  name: "Meshari Alsayari",
  email: "customer@example.com",
  phone: "+966536932633",
  message: "Hello <script>alert(\"x\")</script>",
  companyWebsite: "",
};

function postContact(body: string, headers?: HeadersInit) {
  return POST(
    new Request("https://www.metron.sa/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...headers,
      },
      body,
    })
  );
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "re_test_placeholder");
    vi.stubEnv("CONTACT_FROM_EMAIL", "website@notify.metron.sa");
    vi.stubEnv("CONTACT_TO_EMAIL", "contact@metron.sa");
    vi.stubEnv("VERCEL_ENV", "");
    mockRateLimit.mockResolvedValue("allow");
    mockSend.mockResolvedValue({ data: { id: "email_123" }, error: null, headers: null });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it("accepts a valid submission only after the provider returns an id", async () => {
    const response = await postContact(JSON.stringify(validPayload));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
    expect(mockSend).toHaveBeenCalledTimes(1);
    const sent = mockSend.mock.calls[0][0];
    expect(sent.from).toBe("website@notify.metron.sa");
    expect(sent.to).toEqual(["contact@metron.sa"]);
    expect(sent.replyTo).toBe("customer@example.com");
    expect(sent.text).toContain("Hello <script>alert(\"x\")</script>");
    expect(sent.html).toContain("&lt;script&gt;");
    expect(sent.html).not.toContain("<script>");
    expect(JSON.stringify(sent)).not.toContain("re_test_placeholder");
  });

  it("rejects an invalid name", async () => {
    const response = await postContact(JSON.stringify({ ...validPayload, name: "John1" }));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: "invalid_payload" });
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("rejects a name longer than 100 characters", async () => {
    const response = await postContact(
      JSON.stringify({ ...validPayload, name: "A".repeat(CONTACT_FIELD_LIMITS.name + 1) })
    );

    expect(response.status).toBe(400);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("rejects an invalid email", async () => {
    const response = await postContact(JSON.stringify({ ...validPayload, email: "not-an-email" }));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: "invalid_payload" });
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("rejects an email longer than 254 characters", async () => {
    const local = "a".repeat(CONTACT_FIELD_LIMITS.email);
    const response = await postContact(JSON.stringify({ ...validPayload, email: `${local}@example.com` }));

    expect(response.status).toBe(400);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("rejects an invalid phone number", async () => {
    const response = await postContact(JSON.stringify({ ...validPayload, phone: "12345" }));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: "invalid_payload" });
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("rejects an empty message", async () => {
    const response = await postContact(JSON.stringify({ ...validPayload, message: "   " }));

    expect(response.status).toBe(400);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("rejects an oversized message", async () => {
    const response = await postContact(
      JSON.stringify({ ...validPayload, message: "a".repeat(CONTACT_FIELD_LIMITS.message + 1) })
    );

    expect(response.status).toBe(400);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("rejects an oversized request", async () => {
    const body = "x".repeat(CONTACT_MAX_BODY_BYTES + 1);
    const response = await postContact(body);

    expect(response.status).toBe(413);
    await expect(response.json()).resolves.toEqual({ error: "invalid_payload" });
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON", async () => {
    const response = await postContact("{");

    expect(response.status).toBe(400);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("rejects a missing API key without calling the provider", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const response = await postContact(JSON.stringify(validPayload));

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({ error: "server_config" });
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns a provider failure when Resend rejects the message", async () => {
    mockSend.mockResolvedValue({
      data: null,
      error: { message: "rejected", name: "validation_error", statusCode: 422 },
      headers: null,
    });
    const response = await postContact(JSON.stringify(validPayload));
    const body = await response.json();

    expect(response.status).toBe(502);
    expect(body).toEqual({ error: "send_failed" });
    expect(JSON.stringify(body)).not.toContain("rejected");
  });

  it("returns success for a mocked Resend acceptance", async () => {
    mockSend.mockResolvedValue({ data: { id: "email_accepted" }, error: null, headers: null });
    const response = await postContact(JSON.stringify({ ...validPayload, message: "Need a consultation" }));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
  });

  it("rejects a rate-limited client", async () => {
    mockRateLimit.mockResolvedValue("limit");
    const response = await postContact(JSON.stringify(validPayload));

    expect(response.status).toBe(429);
    await expect(response.json()).resolves.toEqual({ error: "rate_limited" });
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("does not send when the shared limiter is unavailable in production", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    mockRateLimit.mockResolvedValue("unavailable");
    const response = await postContact(JSON.stringify(validPayload));

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({ error: "server_config" });
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("rejects a honeypot submission", async () => {
    const response = await postContact(
      JSON.stringify({ ...validPayload, companyWebsite: "https://spam.example" })
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: "invalid_payload" });
    expect(mockSend).not.toHaveBeenCalled();
  });
});
