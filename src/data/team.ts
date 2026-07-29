/**
 * Team members — sourced from the company profile (PPTX).
 */
export interface TeamMember {
  id: string;
  name: { ar: string; en: string };
  credentials: { ar: string; en: string };
  yearsExperience: { ar: string; en: string };
  bioPoints: { ar: string[]; en: string[] };
  image: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "khaled-almohaimda",
    name: { ar: "خالد المحيمدا", en: "Khaled Almohaimda" },
    credentials: {
      ar: "شريك · الرئيس التنفيذي",
      en: "Partner · Chief Executive Officer",
    },
    yearsExperience: { ar: "٢٥+ سنة خبرة", en: "25+ years of experience" },
    bioPoints: {
      ar: [
        "خبرة مهنية تزيد على 25 عامًا في قطاعي الطاقة والتعدين، شملت العمل في الشركة السعودية للكهرباء وشركة معادن.",
        "خبرة قيادية في التطوير المؤسسي وتعزيز الأطر التنظيمية والإدارية.",
        "خبرة في إعداد وتطوير السياسات والإجراءات وأدلة العمل المؤسسية.",
        "خبرة في تطوير الهياكل التنظيمية وتحديد الأدوار والمسؤوليات والصلاحيات.",
        "خبرة في إعداد الخطط والاستراتيجيات المؤسسية وربطها بالمبادرات ومؤشرات الأداء.",
        "تأهيل مهني متخصص ضمن برامج ومعاهد الشركة السعودية للكهرباء.",
      ],
      en: [
        "25+ years of experience in energy and mining, including the Saudi Electricity Company and Ma'aden.",
        "Leadership experience in organizational development and administrative frameworks.",
        "Expertise in developing policies, procedures, and corporate manuals.",
        "Experience in organizational structures and role, responsibility, and authority design.",
        "Experience in aligning corporate plans and strategies with initiatives and KPIs.",
        "Specialized professional training through Saudi Electricity Company programs and institutes.",
      ],
    },
    image: "/assets/team/khaled-almohaimda.png",
  },
  {
    id: "meshari-alsayari",
    name: { ar: "مشاري السياري", en: "Meshari Alsayari" },
    credentials: { ar: "شريك · CIA", en: "Partner · CIA" },
    yearsExperience: { ar: "١٥+ سنة خبرة", en: "15+ years of experience" },
    bioPoints: {
      ar: [
        "خبرة مهنية تزيد على 15 عامًا في المراجعة الداخلية وإدارة المخاطر والحوكمة.",
        "خبرة في إعداد وتطوير أدلة السياسات والإجراءات والأطر والمنهجيات التنظيمية.",
        "خبرة في إعداد وتحديث سجلات المخاطر المؤسسية وتصميم أطر وسياسات إدارة المخاطر.",
        "قيادة وتنفيذ مشاريع المراجعة الداخلية وتقييم الضوابط الداخلية وتحسين الحوكمة وكفاءة العمليات.",
        "حاصل على شهادة المراجع الداخلي المعتمد (CIA).",
        "بكالوريوس المحاسبة — جامعة الملك سعود.",
      ],
      en: [
        "Over 15 years of professional experience in internal audit, risk management, and governance.",
        "Experience in developing and enhancing policy and procedure manuals, organizational frameworks, and methodologies.",
        "Experience in developing and updating enterprise risk registers and designing risk management frameworks and policies.",
        "Leadership and delivery of internal audit projects, evaluation of internal controls, and enhancement of governance and operational efficiency.",
        "Certified Internal Auditor (CIA).",
        "Bachelor's degree in Accounting — King Saud University.",
      ],
    },
    image: "/assets/team/meshari-alsayari.jpg",
  },
  {
    id: "abdulmuhsen-almugherah",
    name: { ar: "عبدالمحسن المغيرة", en: "Abdulmuhsen Almugherah" },
    credentials: { ar: "شريك · CIA", en: "Partner · CIA" },
    yearsExperience: { ar: "١٣+ سنة خبرة", en: "13+ years of experience" },
    bioPoints: {
      ar: [
        "خبرة مهنية تزيد على 13 عامًا في المراجعة الداخلية والرقابة المالية والالتزام.",
        "خبرة في القطاعات الحكومية وشبه الحكومية والعقارية.",
        "خبرة في قيادة وتنفيذ مهام المراجعة الداخلية وفق المنهجية المبنية على المخاطر.",
        "تقييم أنظمة الرقابة الداخلية والضوابط المالية والإدارية.",
        "قيادة أعمال الالتزام والتحقق من الامتثال للأنظمة واللوائح والسياسات المعتمدة.",
        "حاصل على شهادة المراجع الداخلي المعتمد (CIA) وشهادة أخصائي معتمد في ضريبة القيمة المضافة (SOCPA).",
        "بكالوريوس الإدارة — جامعة الملك سعود.",
      ],
      en: [
        "13+ years of experience in internal audit, financial control, and compliance.",
        "Experience across government, semi-government, and real estate sectors.",
        "Experience leading and executing risk-based internal audit engagements.",
        "Expertise in evaluating internal control systems and financial and administrative controls.",
        "Leading compliance reviews against applicable laws, regulations, and approved policies.",
        "Certified Internal Auditor (CIA) and SOCPA-Certified VAT Specialist.",
        "Bachelor's Degree in Public Administration — King Saud University.",
      ],
    },
    image: "/assets/team/abdulmuhsen-almugherah.png",
  },
  {
    id: "hamad-almansor",
    name: { ar: "حمد المنصور", en: "Hamad Almansor" },
    credentials: { ar: "شريك · CIA", en: "Partner · CIA" },
    yearsExperience: { ar: "١٠+ سنوات خبرة", en: "10+ years of experience" },
    bioPoints: {
      ar: [
        "خبرة مهنية تزيد على 10 أعوام في المراجعة الداخلية والحوكمة وإدارة المخاطر والالتزام.",
        "خبرة متنوعة في القطاعات المصرفية والحكومية وشبه الحكومية والاتصالات والمشاركة في أعمال لجان المراجعة.",
        "خبرة في قيادة وتنفيذ مهام المراجعة الداخلية وفق المنهجية المبنية على المخاطر.",
        "تقييم أنظمة الرقابة الداخلية وتطوير أعمال المراجعة وتعزيز الحوكمة وإدارة المخاطر.",
        "حاصل على شهادة المراجع الداخلي المعتمد (CIA).",
        "بكالوريوس المالية — جامعة ولاية تينيسي، الولايات المتحدة الأمريكية.",
      ],
      en: [
        "10+ years of experience in internal audit, governance, risk management, and compliance.",
        "Experience across banking, government, semi-government, and telecommunications sectors, including audit committee activities.",
        "Experience leading and executing risk-based internal audit engagements.",
        "Expertise in evaluating internal controls, enhancing audit practices, and strengthening governance and risk management.",
        "Certified Internal Auditor (CIA).",
        "Bachelor's Degree in Finance — Tennessee State University, USA.",
      ],
    },
    image: "/assets/team/hamad-almansor.png",
  },
  {
    id: "samer-almansour",
    name: { ar: "سامر المنصور", en: "Samer Almansour" },
    credentials: { ar: "خبير · CCO · CAMS", en: "Expert · CCO · CAMS" },
    yearsExperience: { ar: "١٥+ سنة خبرة", en: "15+ years of experience" },
    bioPoints: {
      ar: [
        "خبرة مهنية تزيد على 15 عامًا في القطاع المصرفي في مجالات الالتزام ومكافحة غسل الأموال وتمويل الإرهاب.",
        "خبرة في قيادة وتطوير برامج الالتزام وتعزيز الأطر الرقابية والتنظيمية.",
        "خبرة في تقييم مخاطر غسل الأموال وتمويل الإرهاب وتطوير السياسات والضوابط المرتبطة بها.",
        "خبرة في التعامل مع الجهات الرقابية والإدارات التنفيذية بشأن متطلبات الالتزام والمخاطر التنظيمية.",
        "حاصل على شهادات مهنية في الالتزام ومكافحة غسل الأموال (CCO و CAMS).",
        "بكالوريوس وماجستير المالية — جامعة ولاية تينيسي وكلية الأمير محمد بن سلمان للإدارة وريادة الأعمال.",
      ],
      en: [
        "15+ years of banking experience in compliance and AML/CFT.",
        "Leadership experience in developing compliance programs and strengthening regulatory and control frameworks.",
        "Expertise in AML/CFT risk assessments and related policies and controls.",
        "Experience engaging with regulators and executive management on compliance requirements and regulatory risks.",
        "CCO and CAMS certified.",
        "Bachelor's and Master's in Finance — Tennessee State University and MBSC.",
      ],
    },
    image: "/assets/team/samer-almansour.png",
  },
];
