import { createHash } from "crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export type ContactRateLimitDecision = "allow" | "limit" | "unavailable";

type ContactLimiters = {
  burst: Ratelimit;
  sustained: Ratelimit;
};

let limiters: ContactLimiters | null | undefined;

function createLimiters(): ContactLimiters | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const redis = new Redis({ url, token });
  return {
    burst: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(1, "30 s"),
      prefix: "metron:contact:burst",
      analytics: false,
    }),
    sustained: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      prefix: "metron:contact:sustained",
      analytics: false,
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

export async function checkContactRateLimit(identifier: string): Promise<ContactRateLimitDecision> {
  if (limiters === undefined) limiters = createLimiters();
  if (!limiters) return "unavailable";

  try {
    const burst = await limiters.burst.limit(identifier);
    if (!burst.success) return "limit";
    const sustained = await limiters.sustained.limit(identifier);
    if (!sustained.success) return "limit";
    return "allow";
  } catch (error) {
    console.error("Contact form: shared rate limiter request failed.", {
      name: error instanceof Error ? error.name : "Error",
    });
    return "unavailable";
  }
}

export function isDeployedContactEnvironment(): boolean {
  return process.env.VERCEL_ENV === "production" || process.env.VERCEL_ENV === "preview";
}
