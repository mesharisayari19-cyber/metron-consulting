"use client";

import type { LucideIcon } from "lucide-react";
import { brandIcons } from "@branding/icons";

export interface Service {
  id: string;
  icon: LucideIcon;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  subServices: { ar: string[]; en: string[] };
}

export const services: Service[] = [
  {
    id: "internal-audit",
    icon: brandIcons.services.internalAudit,
    title: { ar: "المراجعة الداخلية", en: "Internal Audit" },
    description: {
      ar: "نقدم خدمات مراجعة داخلية مستقلة تهدف إلى تعزيز فعالية الحوكمة والرقابة وإدارة المخاطر ورفع كفاءة الأداء المؤسسي.",
      en: "We provide independent internal audit services aimed at strengthening governance, control, risk management, and institutional performance efficiency.",
    },
    subServices: {
      ar: [
        "بناء وتطوير إدارات المراجعة الداخلية",
        "إعداد مواثيق وسياسات وإجراءات المراجعة الداخلية",
        "إعداد خطط المراجعة المبنية على المخاطر",
        "تنفيذ مهام المراجعة الداخلية",
        "تقييم جودة أنشطة المراجعة الداخلية وتحسينها",
      ],
      en: [
        "Building and developing internal audit departments",
        "Developing internal audit charters, policies, and procedures",
        "Preparing risk-based audit plans",
        "Executing internal audit engagements",
        "Assessing and improving the quality of internal audit activities",
      ],
    },
  },
  {
    id: "governance-control",
    icon: brandIcons.services.governance,
    title: { ar: "الحوكمة والرقابة", en: "Governance & Oversight" },
    description: {
      ar: "ندعم الجهات في تطوير بيئات حوكمة ورقابة أكثر فعالية من خلال وضوح الأدوار والمسؤوليات وتعزيز الضوابط على مستوى المؤسسة.",
      en: "We support organizations in developing more effective governance and control environments through clear roles, responsibilities, and strengthened enterprise-wide controls.",
    },
    subServices: {
      ar: [
        "تطوير أطر الحوكمة المؤسسية",
        "تقييم فعالية الحوكمة والبيئة الرقابية",
        "تقييم فعالية المجالس واللجان",
        "تطوير مصفوفات الصلاحيات والمسؤوليات",
        "إعداد اللوائح والأطر التنظيمية",
        "تقييم فعالية الضوابط التشغيلية والإدارية والتقنية",
        "تطوير البيئات الرقابية والتشغيلية",
      ],
      en: [
        "Developing corporate governance frameworks",
        "Assessing governance effectiveness and the control environment",
        "Assessing board and committee effectiveness",
        "Developing authority and responsibility matrices",
        "Preparing regulations and organizational frameworks",
        "Assessing operational, administrative, and IT control effectiveness",
        "Developing control and operating environments",
      ],
    },
  },
  {
    id: "risk-management",
    icon: brandIcons.services.riskManagement,
    title: { ar: "إدارة المخاطر", en: "Risk Management" },
    description: {
      ar: "نساعد الجهات في بناء وتطوير منظومات فعالة لإدارة المخاطر بما يدعم تحقيق الأهداف المؤسسية والاستدامة.",
      en: "We help organizations build and develop effective risk management systems that support strategic objectives and sustainability.",
    },
    subServices: {
      ar: [
        "تصميم وتطوير أطر إدارة المخاطر المؤسسية",
        "إعداد وتطوير سجلات المخاطر المؤسسية والتشغيلية",
        "تطوير منهجيات تقييم وتحليل المخاطر",
        "تحديد شهية المخاطر ومستويات التحمل",
        "تطوير مؤشرات المخاطر الرئيسية",
      ],
      en: [
        "Designing and developing enterprise risk management frameworks",
        "Preparing and developing enterprise and operational risk registers",
        "Developing risk assessment and analysis methodologies",
        "Defining risk appetite and tolerance levels",
        "Developing key risk indicators",
      ],
    },
  },
  {
    id: "compliance",
    icon: brandIcons.services.compliance,
    title: { ar: "الالتزام والامتثال", en: "Compliance & Regulatory Adherence" },
    description: {
      ar: "ندعم الجهات في تعزيز الالتزام بالأنظمة والمتطلبات التنظيمية ورفع فعالية البيئة الرقابية بما يسهم في تقليل المخاطر التنظيمية وتحسين مستوى الامتثال المؤسسي.",
      en: "We support organizations in strengthening regulatory compliance and control effectiveness, reducing regulatory risk, and improving institutional compliance maturity.",
    },
    subServices: {
      ar: [
        "تطوير الأطر الرقابية المرتبطة بالالتزام",
        "تقييم الالتزام بالأنظمة والمتطلبات التنظيمية",
        "تنفيذ تقييمات الفجوات التنظيمية",
        "دعم إدارات ووظائف الالتزام",
        "دعم المراجعات الرقابية والاختبارات الدورية",
        "تطوير مصفوفات الالتزام والمتطلبات التنظيمية",
      ],
      en: [
        "Developing compliance-related control frameworks",
        "Assessing compliance with laws and regulatory requirements",
        "Conducting regulatory gap assessments",
        "Supporting compliance departments and functions",
        "Supporting regulatory reviews and periodic testing",
        "Developing compliance and regulatory requirement matrices",
      ],
    },
  },
  {
    id: "institutional-consulting",
    icon: brandIcons.services.managementConsulting,
    title: {
      ar: "الاستشارات المؤسسية والتنظيمية",
      en: "Institutional & Organizational Consulting",
    },
    description: {
      ar: "نقدم خدمات استشارية تدعم تطوير البيئات المؤسسية والتنظيمية وتحسن الكفاءة التشغيلية وترفع مستوى التكامل بين الهياكل والإجراءات والحوكمة المؤسسية.",
      en: "We provide consulting services that support institutional and organizational development, improve operational efficiency, and enhance alignment across structures, processes, and corporate governance.",
    },
    subServices: {
      ar: [
        "تطوير الهياكل التنظيمية والنماذج التشغيلية",
        "تطوير السياسات والإجراءات والأدلة التنظيمية",
        "إعداد المواثيق والأطر التنظيمية",
        "دعم مبادرات التحول والتطوير المؤسسي",
      ],
      en: [
        "Developing organizational structures and operating models",
        "Developing policies, procedures, and regulatory manuals",
        "Preparing charters and organizational frameworks",
        "Supporting transformation and institutional development initiatives",
      ],
    },
  },
];
