"use client";

import Link from "next/link";
import { LanguageSelect } from "@/components/language-select";

const HEADER_COPY = {
  en: {
    symptoms: "Symptom Check",
    care: "Care Options",
    insurance: "Insurance Guide",
    records: "Health Records",
    pricing: "Pricing"
  }
};

export function SiteHeader() {
  const copy = HEADER_COPY.en;

  return (
    <header className="top-nav">
      <div className="container top-nav-inner">
        <Link className="brand" href="/">
          HealthMatchAI
        </Link>
        <nav className="nav-links">
          <Link href="/#symptom-check">{copy.symptoms}</Link>
          <Link href="/#care-options">{copy.care}</Link>
          <Link href="/#insurance-guide">{copy.insurance}</Link>
          <Link href="/#health-records">{copy.records}</Link>
          <Link href="/#pricing">{copy.pricing}</Link>
        </nav>
        <LanguageSelect />
      </div>
    </header>
  );
}
