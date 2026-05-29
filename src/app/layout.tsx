import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import { LocaleProvider } from "@/context/LocaleContext";
import { themeConfig } from "@theme/theme.config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Metron | ميترون للاستشارات المهنية",
    template: "%s | Metron",
  },
  description: themeConfig.seo.defaultDescription.en,
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
    type: "website",
    locale: "ar_SA",
    alternateLocale: "en_US",
    siteName: themeConfig.seo.siteName.en,
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
      <body
        className={`${inter.variable} ${ibmPlexArabic.variable} font-arabic`}
      >
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
