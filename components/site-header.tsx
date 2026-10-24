"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function SiteHeader() {
  const path = usePathname();
  return (
    <header className="hm-header">
      <a className="hm-skip" href="#main-content">
        Skip to content
      </a>
      <div className="hm-nav">
        <Link href="/" className="hm-brand">
          <span aria-hidden="true">✳</span> HealthMatch <b>AI</b>
        </Link>
        <nav aria-label="Main navigation">
          {[
            ["/", "Home"],
            ["/sample-report", "Sample Report"],
            ["/pricing", "Pricing"],
            ["/safety", "Safety & Limits"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link className="hm-button hm-nav-cta" href="/sample-report">
          Explore the sample ↗
        </Link>
      </div>
    </header>
  );
}
