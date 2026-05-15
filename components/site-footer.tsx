"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { getCopy } from "@/lib/i18n";

export function SiteFooter() {
  const { languageCode } = useLanguage();
  const copy = getCopy(languageCode);
  const [privacy, terms, disclaimer, emergency, cookies] = copy.legal;

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>
          <strong>HealthMatchAI</strong> · {copy.footerSummary}
        </span>
        <p className="footer-disclaimer">{copy.footerSafety}</p>
        <nav className="footer-links">
          <Link href="/privacy">{privacy}</Link>
          <Link href="/terms">{terms}</Link>
          <Link href="/medical-disclaimer">{disclaimer}</Link>
          <Link href="/emergency">{emergency}</Link>
          <Link href="/cookies">{cookies}</Link>
        </nav>
      </div>
    </footer>
  );
}
