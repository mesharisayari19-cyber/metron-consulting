import { createHash } from "crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export type ContactRateLimitDecision = "allow" | "limit" | "unavailable";

const COOLDOWN_MS = 30_000;
const SUSTAINED_LIMIT = 5;
const SUSTAINED_WINDOW = "10 m";
const REDIS_OPERATION_TIMEOUT_MS = 5_000;
const COOLDOWN_PREFIX = "metron:contact:cooldown:";

type ContactLimiters = {
  redis: Redis;
  sustained: Ratelimit;
};

let limiters: ContactLimiters | null | undefined;

function createLimiters(): ContactLimiters | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const redis = new Redis({ url, token });
  return {
    redis,
    sustained: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(SUSTAINED_LIMIT, SUSTAINED_WINDOW),
      prefix: "metron:contact:sustained",
      analytics: false,
      ephemeralCache: false,
    }),
  };
}

export function resetContactRateLimitState(): void {
  limiters = undefined;
}

export function contactClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip")?.trim() || "unknown";
  return createHash("sha256").update(ip).digest("hex");
}

function withDeadline<T>(operation: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("rate_limit_timeout"));
    }, timeoutMs);

    operation.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error: unknown) => {
        clearTimeout(timer);
        reject(error instanceof Error ? error : new Error("rate_limit_failed"));
      }
    );
  });
}

async function acquireCooldown(redis: Redis, identifier: string): Promise<ContactRateLimitDecision | "acquired"> {
  try {
    const created = await withDeadline(
      redis.set(`${COOLDOWN_PREFIX}${identifier}`, "1", { nx: true, px: COOLDOWN_MS }),
      REDIS_OPERATION_TIMEOUT_MS
    );
    if (created === "OK") return "acquired";
    if (created === null) return "limit";
    return "unavailable";
  } catch (error) {
    console.error("Contact form: cooldown could not be verified.", {
      name: error instanceof Error ? error.name : "Error",
    });
    return "unavailable";
  }
}

// The cooldown key is acquired before the sustained check and is not deleted
// if that check rejects or cannot be verified. Resend runs only after both
// checks allow, and a later provider failure does not release the key either.
// Keeping it prevents the same client from retrying inside the 30 seconds.
// The 5-request window still rejects the sixth request on its own.
export async function checkContactRateLimit(identifier: string): Promise<ContactRateLimitDecision> {
  if (limiters === undefined) limiters = createLimiters();
  if (!limiters) {
    console.error("Contact form: shared rate limiter is not configured.");
    return "unavailable";
  }

  const cooldown = await acquireCooldown(limiters.redis, identifier);
  if (cooldown !== "acquired") return cooldown;

  try {
    const sustained = await limiters.sustained.limit(identifier);
    if (sustained.reason === "timeout") {
      console.error("Contact form: sustained rate limiter timed out.");
      return "unavailable";
    }
    if (!sustained.success) return "limit";
    return "allow";
  } catch (error) {
    console.error("Contact form: sustained rate limiter could not be verified.", {
      name: error instanceof Error ? error.name : "Error",
    });
    return "unavailable";
  }
}
