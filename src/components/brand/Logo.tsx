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

const headerBox =
  "block h-11 sm:h-12 md:h-[3.25rem] lg:h-14 w-[240px] sm:w-[300px] md:w-[360px] lg:w-[420px]";

const footerBox =
  "block h-10 sm:h-11 md:h-12 w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px]";

export function Logo({
  variant = "horizontal",
  size = "header",
  className = "",
  href = "#home",
  priority = false,
}: LogoProps) {
  const dims = brandLogo.dimensions[size];
  const isHeader = size === "header";
  const isColored = variant === "horizontal";

  const src = isColored
    ? brandLogo.paths.horizontal
    : brandLogo.paths.horizontalLight;

  const img = (
    <Image
      src={src}
      alt="Metron Consulting — ميترون للاستشارات"
      width={dims.width}
      height={dims.height}
      className={`object-contain object-start bg-transparent ${
        isHeader ? `${headerBox} ${className}` : `${footerBox} ${className}`
      }`}
      priority={priority}
      sizes={
        isHeader
          ? "(max-width: 640px) 240px, (max-width: 1024px) 360px, 420px"
          : "(max-width: 768px) 240px, 320px"
      }
    />
  );

  if (!href) return img;

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded-sm"
    >
      {img}
    </Link>
  );
}
