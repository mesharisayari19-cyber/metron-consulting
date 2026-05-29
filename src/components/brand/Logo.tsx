"use client";

import Image from "next/image";
import Link from "next/link";
import { brandLogo } from "@branding/logo";

type LogoVariant = "horizontal" | "horizontalLight";
type LogoSize = "header" | "footer";

interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
  href?: string;
  priority?: boolean;
}

const sizeStyles: Record<LogoSize, string> = {
  header:
    "h-14 sm:h-16 md:h-[4.75rem] lg:h-20 w-auto min-w-[120px] max-w-[200px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[320px]",
  footer:
    "h-12 sm:h-14 md:h-16 w-auto min-w-[100px] max-w-[200px] sm:max-w-[240px] md:max-w-[260px]",
};

export function Logo({
  variant = "horizontal",
  size = "header",
  className = "",
  href = "#home",
  priority = false,
}: LogoProps) {
  const dims =
    size === "header" ? brandLogo.dimensions.header : brandLogo.dimensions.footer;
  const src =
    variant === "horizontal"
      ? brandLogo.paths.horizontal
      : brandLogo.paths.horizontalLight;

  const img = (
    <Image
      src={src}
      alt="Metron Consulting — ميترون للاستشارات"
      width={dims.width}
      height={dims.height}
      className={`object-contain object-start ${sizeStyles[size]} ${className}`}
      priority={priority}
      sizes={size === "header" ? "(max-width: 768px) 200px, 320px" : "(max-width: 768px) 180px, 260px"}
    />
  );

  if (!href) return img;

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded-sm"
    >
      {img}
    </Link>
  );
}
