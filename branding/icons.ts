"use client";

/**
 * Enterprise icon system — single Lucide-based family with consistent stroke weight.
 * Section icons are curated for a premium consulting aesthetic.
 */
import {
  Award,
  BadgeCheck,
  BookOpenCheck,
  Briefcase,
  BriefcaseBusiness,
  Building2,
  ChartColumn,
  ChevronRight,
  Diamond,
  Download,
  FileSearch,
  Globe,
  HeartHandshake,
  Landmark,
  LineChart,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Network,
  Phone,
  Radar,
  Scale,
  ScanEye,
  Shield,
  Target,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { createElement, type SVGProps } from "react";

/** Thin-to-medium stroke for enterprise iconography */
export const ICON_STROKE = 1.5;

/** Official X (Twitter) mark — outline-style companion to Lucide LinkedIn */
export function SocialXIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return createElement(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "currentColor",
      className,
      "aria-hidden": true,
      ...props,
    },
    createElement("path", {
      d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    })
  );
}

export const brandIcons = {
  about: {
    tabs: {
      vision: ScanEye,
      mission: Target,
      values: Diamond,
      whyMetron: BadgeCheck,
    },
    values: {
      professionalQuality: Award,
      integrity: Scale,
      sustainableImpact: LineChart,
      clientFocus: Users,
    },
  },
  sectors: {
    government: Landmark,
    semiGovernment: Building2,
    listedCompanies: ChartColumn,
    privateSector: BriefcaseBusiness,
    nonProfit: HeartHandshake,
  },
  values: {
    professionalQuality: Award,
    integrity: Scale,
    sustainableImpact: TrendingUp,
    clientFocus: Shield,
  },
  services: {
    internalAudit: FileSearch,
    governance: Landmark,
    riskManagement: Radar,
    compliance: BookOpenCheck,
    performance: LineChart,
    policies: BookOpenCheck,
    internalControl: ScanEye,
    managementConsulting: Network,
    training: Briefcase,
  },
  ui: {
    download: Download,
    mail: Mail,
    phone: Phone,
    mapPin: MapPin,
    linkedin: Linkedin,
    x: SocialXIcon,
    chevronRight: ChevronRight,
    menu: Menu,
    close: X,
    globe: Globe,
  },
} as const;

export type BrandIcons = typeof brandIcons;
export type BrandLucideIcon = LucideIcon;
