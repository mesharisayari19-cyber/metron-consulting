import type { Metadata } from "next";
import { Montserrat, IBM_Plex_Sans_Arabic } from "next/font/google";
import { LocaleProvider } from "@/context/LocaleContext";
import { themeConfig } from "@theme/theme.config";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

/** Neo Sans Arabic — licensed font; IBM Plex Sans Arabic as web fallback */
const arabicFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://metron-consulting.vercel.app"),
  title: {
    default: "Metron | ميترون للاستشارات المهنية",
    template: "%s | Metron",
  },
  description: themeConfig.seo.defaultDescription.en,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "consulting",
    "internal audit",
    "governance",
    "risk management",
    "compliance",
    "Saudi Arabia",
    "استشارات",
    "مراجعة داخلية",
    "حوكمة",
  ],
  openGraph: {
    title: "Metron | ميترون للاستشارات المهنية",
    description: themeConfig.seo.defaultDescription.en,
    type: "website",
    url: "https://metron-consulting.vercel.app",
    locale: "ar_SA",
    alternateLocale: "en_US",
    siteName: themeConfig.seo.siteName.en,
    images: [
      {
        url: "/assets/brand/logo-horizontal.svg",
        alt: "Metron Professional Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Metron | ميترون للاستشارات المهنية",
    description: themeConfig.seo.defaultDescription.en,
    images: ["/assets/brand/logo-horizontal.svg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${arabicFont.variable} font-arabic`}>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Metron Professional Consulting",
              url: "https://metron-consulting.vercel.app",
              logo: "https://metron-consulting.vercel.app/assets/brand/logo-horizontal.svg",
              email: themeConfig.contact.email,
              telephone: themeConfig.contact.phone,
              address: {
                "@type": "PostalAddress",
                addressCountry: "SA",
              },
            }),
          }}
        />
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
