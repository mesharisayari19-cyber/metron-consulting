"use client";

interface BrandPatternProps {
  className?: string;
  opacity?: number;
}

/** Metron bar-chart inspired pattern from brand guidelines */
export function BrandPattern({ className = "", opacity = 0.06 }: BrandPatternProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <svg
        className="absolute inset-0 h-full w-full text-white"
        style={{ opacity }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="metron-bars" width="80" height="80" patternUnits="userSpaceOnUse">
            <rect x="4" y="48" width="8" height="24" fill="currentColor" />
            <rect x="18" y="36" width="8" height="36" fill="currentColor" />
            <rect x="32" y="24" width="8" height="48" fill="currentColor" />
            <rect x="52" y="40" width="8" height="32" fill="currentColor" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#metron-bars)" />
      </svg>
    </div>
  );
}
