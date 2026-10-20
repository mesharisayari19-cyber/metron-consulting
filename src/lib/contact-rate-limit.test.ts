import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const redisState = vi.hoisted(() => ({
  now: 0,
  keys: new Map<string, number>(),
  setBehavior: "ok" as "ok" | "timeout" | "fail",
  sustainedBehavior: "ok" as "ok" | "timeout" | "fail",
  sustained: new Map<string, number[]>(),
}));

vi.mock("@upstash/redis", () => ({
  Redis: class {
    set(key: string, _value: string, options: { nx?: boolean; px?: number }) {
      if (redisState.setBehavior === "fail") {
        return Promise.reject(new Error("connection_failed"));
      }
      if (redisState.setBehavior === "timeout") {
        return new Promise(() => undefined);
      }

      const expiresAt = redisState.keys.get(key);
      if (options.nx && expiresAt !== undefined && expiresAt > redisState.now) {
        return Promise.resolve(null);
      }

      redisState.keys.set(key, redisState.now + (options.px ?? 0));
      return Promise.resolve("OK");
    }
  },
}));

vi.mock("@upstash/ratelimit", () => ({
  Ratelimit: class {
    static slidingWindow(tokens: number, window: string) {
      return { tokens, window };
    }

    limit(identifier: string) {
      if (redisState.sustainedBehavior === "fail") {
        return Promise.reject(new Error("connection_failed"));
      }
      if (redisState.sustainedBehavior === "timeout") {
        return Promise.resolve({
          success: true,
          reason: "timeout",
          limit: 5,
          remaining: 0,
          reset: 0,
          pending: Promise.resolve(),
        });
      }

      const windowMs = 10 * 60 * 1000;
      const stamps = (redisState.sustained.get(identifier) ?? []).filter(
        (stamp) => redisState.now - stamp < windowMs
      );
      if (stamps.length >= 5) {
        redisState.sustained.set(identifier, stamps);
        return Promise.resolve({
          success: false,
          limit: 5,
          remaining: 0,
          reset: 0,
          pending: Promise.resolve(),
        });
      }

      stamps.push(redisState.now);
      redisState.sustained.set(identifier, stamps);
      return Promise.resolve({
        success: true,
        limit: 5,
        remaining: 5 - stamps.length,
        reset: 0,
        pending: Promise.resolve(),
      });
    }
  },
}));

import { checkContactRateLimit, contactClientKey, resetContactRateLimitState } from "@/lib/contact-rate-limit";

const TEN_MINUTES_MS = 10 * 60 * 1000;

function configureRedis() {
  process.env.UPSTASH_REDIS_REST_URL = "https://example.upstash.io";
  process.env.UPSTASH_REDIS_REST_TOKEN = "test-token";
  resetContactRateLimitState();
}

function resetRedisState() {
  redisState.now = 0;
  redisState.keys.clear();
  redisState.sustained.clear();
  redisState.setBehavior = "ok";
  redisState.sustainedBehavior = "ok";
}

describe("contact rate limiter", () => {
  beforeEach(() => {
    resetRedisState();
    configureRedis();
  });

  afterEach(() => {
    vi.useRealTimers();
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    resetContactRateLimitState();
    resetRedisState();
  });

  it("stays unavailable when the shared Redis backend is not configured", async () => {
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    resetContactRateLimitState();

    await expect(checkContactRateLimit("client")).resolves.toBe("unavailable");
  });

  it("allows the first request", async () => {
    await expect(checkContactRateLimit("client")).resolves.toBe("allow");
  });

  it.each([
    ["1 second", 1_000],
    ["15 seconds", 15_000],
    ["29 seconds", 29_000],
  ])("rejects a second request after %s", async (_label, elapsed) => {
    await expect(checkContactRateLimit("client")).resolves.toBe("allow");
    redisState.now += elapsed;

    await expect(checkContactRateLimit("client")).resolves.toBe("limit");
  });

  it("allows a request after 30 seconds when the sustained limit permits it", async () => {
    await expect(checkContactRateLimit("client")).resolves.toBe("allow");
    redisState.now += 30_000;

    await expect(checkContactRateLimit("client")).resolves.toBe("allow");
  });

  it("keeps the cooldown after a browser refresh for the same client", async () => {
    const headers = { "x-forwarded-for": "203.0.113.10, 198.51.100.2" };
    const firstView = contactClientKey(new Request("https://www.metron.sa/api/contact", { headers }));
    const refreshed = contactClientKey(new Request("https://www.metron.sa/api/contact", { headers }));

    expect(firstView).toBe(refreshed);
    expect(firstView).not.toContain("203.0.113.10");

    await expect(checkContactRateLimit(firstView)).resolves.toBe("allow");
    await expect(checkContactRateLimit(refreshed)).resolves.toBe("limit");
  });

  it("does not let concurrent requests bypass the cooldown", async () => {
    const [first, second] = await Promise.all([
      checkContactRateLimit("client"),
      checkContactRateLimit("client"),
    ]);

    expect([first, second].sort()).toEqual(["allow", "limit"]);
  });

  it("fails closed when Redis does not answer before the deadline", async () => {
    vi.useFakeTimers();
    redisState.setBehavior = "timeout";

    const pending = checkContactRateLimit("client");
    await vi.advanceTimersByTimeAsync(5_000);

    await expect(pending).resolves.toBe("unavailable");
  });

  it("fails closed when the sustained limiter reports a timeout result", async () => {
    redisState.sustainedBehavior = "timeout";

    await expect(checkContactRateLimit("client")).resolves.toBe("unavailable");
  });

  it("fails closed when Redis cannot be reached", async () => {
    redisState.setBehavior = "fail";

    await expect(checkContactRateLimit("client")).resolves.toBe("unavailable");
  });

  it("fails closed when the sustained limiter cannot be reached", async () => {
    redisState.sustainedBehavior = "fail";

    await expect(checkContactRateLimit("client")).resolves.toBe("unavailable");
  });

  it("allows five requests in ten minutes and rejects the sixth", async () => {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      if (attempt > 0) redisState.now += 30_000;
      await expect(checkContactRateLimit("client")).resolves.toBe("allow");
    }

    redisState.now += 30_000;
    expect(redisState.now).toBeLessThan(TEN_MINUTES_MS);
    await expect(checkContactRateLimit("client")).resolves.toBe("limit");
  });
});
