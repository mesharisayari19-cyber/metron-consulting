/**
 * Team members — CMS-ready data structure.
 */
export interface TeamMember {
  id: string;
  name: { ar: string; en: string };
  credentials: { ar: string; en: string };
  yearsExperience: { ar: string; en: string };
  bio: { ar: string; en: string };
  image: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: { ar: "أحمد المحمد", en: "Ahmed Al-Mohammed" },
    credentials: { ar: "شريك مؤسس · محاسب قانوني", en: "Founding Partner · CPA" },
    yearsExperience: { ar: "٢٠+ سنة خبرة", en: "20+ years of experience" },
    bio: {
      ar: "خبرة واسعة في المراجعة الداخلية والحوكمة المؤسسية للجهات الحكومية والخاصة.",
      en: "Extensive experience in internal audit and corporate governance for public and private sector entities.",
    },
    image: "/assets/team/placeholder-1.jpg",
  },
  {
    id: "2",
    name: { ar: "سارة العتيبي", en: "Sara Al-Otaibi" },
    credentials: { ar: "مديرة الالتزام · CIA", en: "Compliance Director · CIA" },
    yearsExperience: { ar: "١٥+ سنة خبرة", en: "15+ years of experience" },
    bio: {
      ar: "متخصصة في الالتزام التنظيمي وإدارة المخاطر وفق أفضل الممارسات الدولية.",
      en: "Specialist in regulatory compliance and risk management aligned with international best practices.",
    },
    image: "/assets/team/placeholder-2.jpg",
  },
  {
    id: "3",
    name: { ar: "خالد الشمري", en: "Khalid Al-Shammari" },
    credentials: { ar: "مدير المراجعة الداخلية · CISA", en: "Internal Audit Director · CISA" },
    yearsExperience: { ar: "١٨+ سنة خبرة", en: "18+ years of experience" },
    bio: {
      ar: "قيادة فرق المراجعة الداخلية وتطوير أطر الرقابة المؤسسية.",
      en: "Leads internal audit teams and develops institutional control frameworks.",
    },
    image: "/assets/team/placeholder-3.jpg",
  },
  {
    id: "4",
    name: { ar: "نورة القحطاني", en: "Noura Al-Qahtani" },
    credentials: { ar: "مستشارة إدارية أولى · MBA", en: "Senior Management Consultant · MBA" },
    yearsExperience: { ar: "١٢+ سنة خبرة", en: "12+ years of experience" },
    bio: {
      ar: "تركّز على تحسين الأداء المؤسسي والسياسات والإجراءات.",
      en: "Focuses on organizational performance improvement and policies & procedures.",
    },
    image: "/assets/team/placeholder-4.jpg",
  },
];
