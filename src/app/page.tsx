"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhyMetron } from "@/components/sections/WhyMetron";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { Clients } from "@/components/sections/Clients";
import { Contact } from "@/components/sections/Contact";
import { useLocale } from "@/context/LocaleContext";
import { useEffect } from "react";

function LocaleSync() {
  const { locale, dir, isArabic } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.body.classList.remove("font-arabic", "font-sans");
    document.body.classList.add(isArabic ? "font-arabic" : "font-sans");
  }, [locale, dir, isArabic]);

  return null;
}

export default function HomePage() {
  return (
    <>
      <LocaleSync />
      <Header />
      <main>
        <Hero />
        <WhyMetron />
        <About />
        <Services />
        <Team />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
