/**
 * Team members — CMS-ready data structure.
 * Add or remove members without changing layout components.
 */
export interface TeamMember {
  id: string;
  name: { ar: string; en: string };
  role: { ar: string; en: string };
  bio: { ar: string; en: string };
  image: string;
  linkedin?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: { ar: "أحمد المحمد", en: "Ahmed Al-Mohammed" },
    role: { ar: "الشريك المؤسس", en: "Founding Partner" },
    bio: {
      ar: "خبرة واسعة في المراجعة الداخلية والحوكمة المؤسسية للجهات الحكومية والخاصة.",
      en: "Extensive experience in internal audit and corporate governance for public and private sector entities.",
    },
    image: "/assets/team/placeholder-1.jpg",
    linkedin: "https://linkedin.com",
  },
  {
    id: "2",
    name: { ar: "سارة العتيبي", en: "Sara Al-Otaibi" },
    role: { ar: "مديرة الالتزام", en: "Compliance Director" },
    bio: {
      ar: "متخصصة في الالتزام التنظيمي وإدارة المخاطر وفق أفضل الممارسات الدولية.",
      en: "Specialist in regulatory compliance and risk management aligned with international best practices.",
    },
    image: "/assets/team/placeholder-2.jpg",
    linkedin: "https://linkedin.com",
  },
  {
    id: "3",
    name: { ar: "خالد الشمري", en: "Khalid Al-Shammari" },
    role: { ar: "مدير المراجعة الداخلية", en: "Internal Audit Director" },
    bio: {
      ar: "قيادة فرق المراجعة الداخلية وتطوير أطر الرقابة المؤسسية.",
      en: "Leads internal audit teams and develops institutional control frameworks.",
    },
    image: "/assets/team/placeholder-3.jpg",
  },
  {
    id: "4",
    name: { ar: "نورة القحطاني", en: "Noura Al-Qahtani" },
    role: { ar: "مستشارة إدارية أولى", en: "Senior Management Consultant" },
    bio: {
      ar: "تركّز على تحسين الأداء المؤسسي والسياسات والإجراءات.",
      en: "Focuses on organizational performance improvement and policies & procedures.",
    },
    image: "/assets/team/placeholder-4.jpg",
    linkedin: "https://linkedin.com",
  },
];
