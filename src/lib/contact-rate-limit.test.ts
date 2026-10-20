import { afterEach, describe, expect, it } from "vitest";
import { checkContactRateLimit, resetContactRateLimitState } from "@/lib/contact-rate-limit";

describe("contact rate limiter", () => {
  afterEach(() => {
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    resetContactRateLimitState();
  });

  it("stays unavailable when the shared Redis backend is not configured", async () => {
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    resetContactRateLimitState();

    await expect(checkContactRateLimit("client")).resolves.toBe("unavailable");
  });
});
