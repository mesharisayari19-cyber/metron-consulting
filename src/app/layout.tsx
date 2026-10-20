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

const officialSite = "https://www.metron.sa";
const socialTitle = "ميترون للاستشارات | Metron Consulting";
const socialDescription = `شركة سعودية متخصصة في خدمات المراجعة الداخلية والحوكمة وإدارة المخاطر والالتزام والاستشارات الإدارية. ${themeConfig.seo.defaultDescription.en}`;

export const metadata: Metadata = {
  metadataBase: new URL(officialSite),
  title: {
    default: socialTitle,
    template: "%s | Metron",
  },
  description: socialDescription,
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
    title: socialTitle,
    description: socialDescription,
    type: "website",
    url: officialSite,
    locale: "ar_SA",
    alternateLocale: "en_US",
    siteName: "Metron Consulting",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        type: "image/png",
        alt: "Metron Consulting",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: socialTitle,
    description: socialDescription,
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Metron Consulting",
      },
    ],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      {
        url: "/icon.png",
        type: "image/png",
        sizes: "512x512",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icons/metron-dark-512.png",
        type: "image/png",
        sizes: "512x512",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icons/metron-light-32.png",
        type: "image/png",
        sizes: "32x32",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icons/metron-dark-32.png",
        type: "image/png",
        sizes: "32x32",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icons/metron-light-16.png",
        type: "image/png",
        sizes: "16x16",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icons/metron-dark-16.png",
        type: "image/png",
        sizes: "16x16",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
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
              url: officialSite,
              logo: `${officialSite}/assets/brand/logo-horizontal.svg`,
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
