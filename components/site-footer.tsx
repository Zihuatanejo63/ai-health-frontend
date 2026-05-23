"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n-provider";

export function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>
          <strong>AI Health Match</strong> · {t("footer.summary")}
        </span>
        <p className="footer-disclaimer">
          {t("safety.medical")} {t("safety.insurance")}
        </p>
        <nav className="footer-links">
          <Link href="/privacy">{t("footer.privacy")}</Link>
          <Link href="/terms">{t("footer.terms")}</Link>
          <Link href="/medical-disclaimer">{t("footer.disclaimer")}</Link>
          <Link href="/refund-policy">{t("footer.refundPolicy")}</Link>
          <Link href="/contact">{t("footer.contact")}</Link>
          <Link href="/emergency">{t("footer.emergency")}</Link>
          <Link href="/cookies">{t("footer.cookies")}</Link>
        </nav>
      </div>
    </footer>
  );
}
