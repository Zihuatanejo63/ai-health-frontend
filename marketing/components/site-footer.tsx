"use client";
import {usePathname} from "next/navigation";
import {localeOf,localizedHref,textFor} from "@/lib/public-i18n";
import Link from "next/link";
export function SiteFooter() {
 const locale=localeOf(usePathname());
 const t=(text:string)=>textFor(locale,text);
  return (
    <footer className="hm-footer">
      <div className="hm-footer-inner">
        <div>
          <Link href={localizedHref("/",locale)} className="hm-brand">
            <span aria-hidden="true">✳</span> HealthMatch <b>AI</b>
          </Link>
          <p>{t("Know your numbers. Catch changes early.")}</p>
          <p className="hm-small">
            {t("Health information and self-management. Not a substitute for professional care.")}
          </p>
        </div>
        <nav aria-label={t("Footer navigation")}>
          <Link href={localizedHref("/",locale)}>{t("Home")}</Link>
          <Link href={localizedHref("/sample-report",locale)}>{t("Sample Report")}</Link>
          <Link href={localizedHref("/pricing",locale)}>{t("Pricing")}</Link>
          <Link href={localizedHref("/safety",locale)}>{t("Safety & Limits")}</Link>
          <Link href={localizedHref("/privacy",locale)}>{t("Privacy")}</Link>
        </nav>
      </div>
      <div className="hm-footer-bottom">
        © 2026 HealthMatch AI{" "}
        <span>{t("Product preview · Built around a longer view.")}</span>
      </div>
    </footer>
  );
}
