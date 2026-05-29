import type { LucideIcon } from "lucide-react";
import { brandIcons } from "@branding/icons";

export interface Service {
  id: string;
  icon: LucideIcon;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  /** Future: link to detail page */
  slug?: string;
}

export const services: Service[] = [
  {
    id: "internal-audit",
    icon: brandIcons.services.internalAudit,
    title: { ar: "المراجعة الداخلية", en: "Internal Audit" },
    description: {
      ar: "تصميم وتنفيذ برامج مراجعة داخلية فعّالة وفق المعايير المهنية.",
      en: "Design and execution of effective internal audit programs per professional standards.",
    },
    slug: "internal-audit",
  },
  {
    id: "governance",
    icon: brandIcons.services.governance,
    title: { ar: "الحوكمة", en: "Governance" },
    description: {
      ar: "تعزيز أطر الحوكمة المؤسسية ولوائح مجلس الإدارة.",
      en: "Strengthening corporate governance frameworks and board charters.",
    },
    slug: "governance",
  },
  {
    id: "risk-management",
    icon: brandIcons.services.riskManagement,
    title: { ar: "إدارة المخاطر", en: "Risk Management" },
    description: {
      ar: "تحديد وتقييم وإدارة المخاطر التشغيلية والاستراتيجية.",
      en: "Identification, assessment, and management of operational and strategic risks.",
    },
    slug: "risk-management",
  },
  {
    id: "compliance",
    icon: brandIcons.services.compliance,
    title: { ar: "الالتزام", en: "Compliance" },
    description: {
      ar: "ضمان الامتثال للأنظمة واللوائح والمتطلبات التنظيمية.",
      en: "Ensuring adherence to laws, regulations, and regulatory requirements.",
    },
    slug: "compliance",
  },
  {
    id: "performance",
    icon: brandIcons.services.performance,
    title: { ar: "تحسين الأداء", en: "Performance Improvement" },
    description: {
      ar: "رفع كفاءة العمليات وتحقيق أهداف الأداء المؤسسي.",
      en: "Enhancing operational efficiency and achieving institutional performance goals.",
    },
    slug: "performance",
  },
  {
    id: "policies",
    icon: brandIcons.services.policies,
    title: { ar: "السياسات والإجراءات", en: "Policies & Procedures" },
    description: {
      ar: "تطوير وتوثيق السياسات والإجراءات المؤسسية.",
      en: "Development and documentation of institutional policies and procedures.",
    },
    slug: "policies",
  },
  {
    id: "internal-control",
    icon: brandIcons.services.internalControl,
    title: { ar: "الرقابة الداخلية", en: "Internal Control" },
    description: {
      ar: "بناء وتقوية أنظمة الرقابة الداخلية الفعّالة.",
      en: "Building and strengthening effective internal control systems.",
    },
    slug: "internal-control",
  },
  {
    id: "management-consulting",
    icon: brandIcons.services.managementConsulting,
    title: { ar: "الاستشارات الإدارية", en: "Management Consulting" },
    description: {
      ar: "دعم القيادات في اتخاذ القرارات الاستراتيجية المبنية على البيانات.",
      en: "Supporting leadership in data-driven strategic decision-making.",
    },
    slug: "management-consulting",
  },
  {
    id: "training",
    icon: brandIcons.services.training,
    title: { ar: "التدريب والتوعية", en: "Training & Awareness" },
    description: {
      ar: "برامج تدريبية متخصصة في الحوكمة والمراجعة والالتزام.",
      en: "Specialized training programs in governance, audit, and compliance.",
    },
    slug: "training",
  },
];
