"use client";

/**
 * Icon mapping for brand-consistent iconography.
 * Components import from lucide-react using these keys for CMS-ready swaps.
 */
import {
  Shield,
  Scale,
  Award,
  TrendingUp,
  ClipboardCheck,
  Building2,
  AlertTriangle,
  FileCheck,
  Gauge,
  FileText,
  Eye,
  Briefcase,
  GraduationCap,
  Download,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  ChevronRight,
  Menu,
  X,
  Globe,
} from "lucide-react";

export const brandIcons = {
  values: {
    professionalQuality: Award,
    integrity: Scale,
    sustainableImpact: TrendingUp,
    clientFocus: Shield,
  },
  services: {
    internalAudit: ClipboardCheck,
    governance: Building2,
    riskManagement: AlertTriangle,
    compliance: FileCheck,
    performance: Gauge,
    policies: FileText,
    internalControl: Eye,
    managementConsulting: Briefcase,
    training: GraduationCap,
  },
  ui: {
    download: Download,
    mail: Mail,
    phone: Phone,
    mapPin: MapPin,
    linkedin: Linkedin,
    chevronRight: ChevronRight,
    menu: Menu,
    close: X,
    globe: Globe,
  },
} as const;

export type BrandIcons = typeof brandIcons;
