"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const primaryNav = [
  { label: "Home", href: "/", icon: "⌂" },
  { label: "Symptom Check", href: "/symptom-check", icon: "☤" },
  { label: "Care Guidance", href: "/care-options", icon: "♡" },
  { label: "Insurance", href: "/insurance-guide", icon: "♢" },
  { label: "Health Summary", href: "/health-records", icon: "▣" },
  { label: "History", href: "/history", icon: "◷" }
];

const settingsItem = { label: "Settings", href: "/settings", icon: "⚙" };

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <aside className="app-sidebar" aria-label="HealthMatchAI app navigation">
      <div className="sidebar-top">
        <Link className="brand sidebar-brand" href="/">
          HealthMatchAI
        </Link>
        <nav className="sidebar-nav">
          {primaryNav.map((item) => (
            <Link
              className={`sidebar-link${isActive(pathname, item.href) ? " active" : ""}`}
              href={item.href}
              key={item.href}
            >
              <span aria-hidden="true">{item.icon}</span>
              <strong>{item.label}</strong>
            </Link>
          ))}
        </nav>
      </div>

      <Link
        className={`sidebar-link sidebar-settings${isActive(pathname, settingsItem.href) ? " active" : ""}`}
        href={settingsItem.href}
      >
        <span aria-hidden="true">{settingsItem.icon}</span>
        <strong>{settingsItem.label}</strong>
      </Link>
    </aside>
  );
}
