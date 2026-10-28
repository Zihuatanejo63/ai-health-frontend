"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {languages,localeOf,basePath,localizedHref,textFor} from "@/lib/public-i18n";
export function SiteHeader() {
  const path = usePathname();
  const locale=localeOf(path), base=basePath(path);
  const t=(text:string)=>textFor(locale,text);
  return (
    <header className="hm-header">
      <a className="hm-skip" href="#main-content">
        {t("Skip to content")}
      </a>
      <div className="hm-nav">
        <Link href={localizedHref("/",locale)} className="hm-brand">
          <span aria-hidden="true">✳</span> HealthMatch <b>AI</b>
        </Link>
        <nav aria-label={t("Main navigation")}>
          {[
            ["/", "Home"],
            ["/sample-report", "Sample Report"],
            ["/pricing", "Pricing"],
            ["/safety", "Safety & Limits"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={localizedHref(href,locale)}
              aria-current={base === href ? "page" : undefined}
            >
              {t(label)}
            </Link>
          ))}
        </nav>
        <label className="hm-locale-select">
          <span className="sr-only">{t("Language")}</span>
          <select aria-label={t("Language")} value={locale} onChange={e=>{window.location.assign(localizedHref(["/","/sample-report","/pricing","/safety","/privacy"].includes(base)?base:"/",e.target.value as typeof locale));}}>
            {languages.map(([code,name])=><option key={code} value={code} lang={code}>{name}</option>)}
          </select>
        </label>
        <Link className="hm-button hm-nav-cta" href="/dashboard">
          {t("Open my workspace ↗")}
        </Link>
      </div>
    </header>
  );
}
