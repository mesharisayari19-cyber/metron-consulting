"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  download?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  icon?: ReactNode;
  external?: boolean;
  disabled?: boolean;
}

const variants: Record<Variant, string> = {
  primary: "bg-brand-700 text-white hover:bg-brand-800 shadow-executive",
  secondary:
    "bg-white text-brand-800 border border-brand-200 hover:border-brand-400 hover:bg-brand-50",
  outline:
    "border-2 border-white/80 text-white hover:bg-white/10 backdrop-blur-sm",
  ghost: "text-brand-700 hover:bg-brand-50",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-3.5 text-base font-semibold",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  download,
  onClick,
  type = "button",
  className = "",
  icon,
  external,
  disabled = false,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all duration-200 ease-out disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {icon}
      {children}
    </>
  );

  if (href) {
    if (external || download) {
      return (
        <motion.a
          href={href}
          download={download}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={classes}
          whileHover={{ y: -1 }}
          whileTap={{ y: 0 }}
        >
          {content}
        </motion.a>
      );
    }
    return (
      <Link href={href} className={classes}>
        <motion.span
          className="inline-flex items-center gap-2"
          whileHover={{ y: -1 }}
          whileTap={{ y: 0 }}
        >
          {content}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { y: 0 }}
    >
      {content}
    </motion.button>
  );
}
