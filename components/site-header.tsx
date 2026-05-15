"use client";

import Link from "next/link";
import { LanguageSelect } from "@/components/language-select";
import { useLanguage } from "@/components/language-provider";
import { getCopy } from "@/lib/i18n";

export function SiteHeader() {
  const { languageCode } = useLanguage();
  const copy = getCopy(languageCode);
  const [symptoms, care, insurance, records] = copy.nav;

  return (
    <header className="top-nav">
      <div className="container top-nav-inner">
        <Link className="brand" href="/">
          HealthMatchAI
        </Link>
        <nav className="nav-links">
          <Link href="/#symptom-check">{symptoms}</Link>
          <Link href="/#care-options">{care}</Link>
          <Link href="/#insurance-guide">{insurance}</Link>
          <Link href="/#health-records">{records}</Link>
        </nav>
        <LanguageSelect />
      </div>
    </header>
  );
}
