import { CONTACT_MAX_BODY_BYTES } from "@/lib/contact-form";

export type ContactRequestBody =
  | { ok: true; value: unknown }
  | { ok: false; reason: "too_large" | "malformed"; status: 413 | 400 };

export async function readContactRequest(request: Request): Promise<ContactRequestBody> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return { ok: false, reason: "malformed", status: 400 };
  }

  const declaredLength = request.headers.get("content-length");
  if (declaredLength !== null) {
    const size = Number(declaredLength);
    if (!Number.isFinite(size) || size < 0 || size > CONTACT_MAX_BODY_BYTES) {
      return { ok: false, reason: "too_large", status: 413 };
    }
  }

  if (!request.body) {
    return { ok: false, reason: "malformed", status: 400 };
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;
      total += value.byteLength;
      if (total > CONTACT_MAX_BODY_BYTES) {
        await reader.cancel();
        return { ok: false, reason: "too_large", status: 413 };
      }
      chunks.push(value);
    }
  } catch {
    return { ok: false, reason: "malformed", status: 400 };
  }

  let text = "";
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(concatBytes(chunks));
  } catch {
    return { ok: false, reason: "malformed", status: 400 };
  }

  if (!text.trim()) {
    return { ok: false, reason: "malformed", status: 400 };
  }

  try {
    return { ok: true, value: JSON.parse(text) as unknown };
  } catch {
    return { ok: false, reason: "malformed", status: 400 };
  }
}

function concatBytes(chunks: Uint8Array[]): Uint8Array {
  const body = new Uint8Array(chunks.reduce((total, chunk) => total + chunk.byteLength, 0));
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return body;
}
