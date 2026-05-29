export type Locale = "ar" | "en";

export const translations = {
  ar: {
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      services: "خدماتنا",
      team: "فريقنا",
      clients: "عملاؤنا",
      contact: "تواصل معنا",
    },
    hero: {
      title: "استشارات مهنية مبنية على الثقة",
      subtitle:
        "ميترون للاستشارات المهنية — شريككم في المراجعة الداخلية، الحوكمة، إدارة المخاطر، والالتزام.",
      ctaAbout: "تعرف علينا",
      ctaProfile: "تحميل بروفايل الشركة",
    },
    about: {
      title: "من نحن",
      subtitle: "خبرة مؤسسية — أثر مستدام",
      overviewTitle: "نبذة عن الشركة",
      overview:
        "ميتـرون للاستشارات المهنية هي شركة متخصصة في خدمات المراجعة الداخلية، الحوكمة، إدارة المخاطر، الالتزام، والاستشارات الإدارية. نعمل على دعم الجهات الحكومية وشبه الحكومية والخاصة من خلال حلول عملية مبنية على الدقة والثقة وفهم البيئة التنظيمية.",
      visionTitle: "الرؤية",
      vision: "أن نكون الشريك المهني الموثوق في تعزيز الحوكمة وتحسين الأداء المؤسسي.",
      missionTitle: "الرسالة",
      mission:
        "تقديم خدمات استشارية ومهنية عالية الجودة تساعد الجهات على اتخاذ قرارات أفضل وتحقيق أثر مستدام.",
      valuesTitle: "قيمنا",
      values: {
        trust: "الثقة",
        precision: "الدقة",
        integrity: "النزاهة",
        quality: "الجودة",
        impact: "الأثر",
      },
    },
    services: {
      title: "خدماتنا",
      subtitle: "حلول متكاملة لاحتياجاتكم المؤسسية",
      learnMore: "اعرف المزيد",
    },
    team: {
      title: "فريقنا",
      subtitle: "خبراء يقودون التميز المؤسسي",
      viewLinkedIn: "LinkedIn",
    },
    clients: {
      title: "عملاؤنا",
      subtitle: "ثقة مؤسسات رائدة في مختلف القطاعات",
    },
    contact: {
      title: "تواصل معنا",
      subtitle: "نرحب باستفساراتكم ونتطلع للتواصل معكم",
      address: "العنوان",
      email: "البريد الإلكتروني",
      form: {
        name: "الاسم",
        email: "البريد الإلكتروني",
        message: "الرسالة",
        submit: "إرسال الرسالة",
        sending: "جاري الإرسال...",
        success: "تم إرسال رسالتكم بنجاح. سنتواصل معكم قريباً.",
      },
      mapPlaceholder: "خريطة الموقع — قابلة للإضافة",
    },
    footer: {
      rights: "جميع الحقوق محفوظة",
      tagline: "للاستشارات المهنية",
    },
    common: {
      switchLang: "English",
      scrollDown: "اكتشف المزيد",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      services: "Services",
      team: "Our Team",
      clients: "Clients",
      contact: "Contact",
    },
    hero: {
      title: "Professional Consulting Built on Trust",
      subtitle:
        "Metron Professional Consulting — your partner in internal audit, governance, risk management, and compliance.",
      ctaAbout: "About Us",
      ctaProfile: "Download Company Profile",
    },
    about: {
      title: "About Us",
      subtitle: "Institutional expertise — sustainable impact",
      overviewTitle: "Company Overview",
      overview:
        "Metron Professional Consulting is a specialized firm in internal audit, governance, risk management, compliance, and management consulting. We support government, semi-government, and private sector entities through practical solutions built on precision, trust, and regulatory understanding.",
      visionTitle: "Vision",
      vision:
        "To be the trusted professional partner in strengthening governance and improving institutional performance.",
      missionTitle: "Mission",
      mission:
        "Delivering high-quality consulting and professional services that help organizations make better decisions and achieve sustainable impact.",
      valuesTitle: "Our Values",
      values: {
        trust: "Trust",
        precision: "Precision",
        integrity: "Integrity",
        quality: "Quality",
        impact: "Impact",
      },
    },
    services: {
      title: "Our Services",
      subtitle: "Integrated solutions for your institutional needs",
      learnMore: "Learn more",
    },
    team: {
      title: "Our Team",
      subtitle: "Experts driving institutional excellence",
      viewLinkedIn: "LinkedIn",
    },
    clients: {
      title: "Our Clients",
      subtitle: "Trusted by leading organizations across sectors",
    },
    contact: {
      title: "Contact Us",
      subtitle: "We welcome your inquiries and look forward to connecting",
      address: "Address",
      email: "Email",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        submit: "Send Message",
        sending: "Sending...",
        success: "Your message has been sent successfully. We will be in touch soon.",
      },
      mapPlaceholder: "Location map — coming soon",
    },
    footer: {
      rights: "All rights reserved",
      tagline: "Professional Consulting",
    },
    common: {
      switchLang: "العربية",
      scrollDown: "Discover more",
    },
  },
} as const;

export type Translations = (typeof translations)[Locale];
