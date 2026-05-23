"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/components/i18n-provider";
import { useSettings } from "@/components/settings-provider";

export const sidebarItems = [
  { labelKey: "nav.home", href: "/", icon: "⌂" },
  { labelKey: "nav.symptomCheck", href: "/symptom-check", icon: "☤" },
  { labelKey: "nav.careGuidance", href: "/care-options", icon: "♡" },
  { labelKey: "nav.insurance", href: "/insurance-guide", icon: "♢" },
  { labelKey: "nav.healthSummary", href: "/health-records", icon: "▣" },
  { labelKey: "nav.history", href: "/history", icon: "◷" },
  { labelKey: "nav.pricing", href: "/pricing", icon: "$" }
];

const settingsItem = { labelKey: "nav.settings", href: "/settings", icon: "⚙" };

function isActive(pathname: string, href: string) {
  if (pathname === "/result" && href === "/symptom-check") return true;
  if (pathname === "/payment-success" && href === "/pricing") return true;
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function SidebarItem({
  href,
  icon,
  label,
  active = false,
  className = ""
}: {
  href: string;
  icon: string;
  label: string;
  active?: boolean;
  className?: string;
}) {
  return (
    <Link className={`sidebar-link${active ? " active" : ""}${className ? ` ${className}` : ""}`} href={href}>
      <span aria-hidden="true">{icon}</span>
      <strong>{label}</strong>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useI18n();
  const { serverUser } = useSettings();

  const displayName = serverUser
    ? (serverUser.name || serverUser.email)
    : t("auth.signIn");
  const avatarChar = displayName.charAt(0).toUpperCase();

  return (
    <aside className="app-sidebar" aria-label="HealthMatchAI app navigation">
      <div className="sidebar-top">
        <Link className="brand sidebar-brand" href="/">
          HealthMatchAI
        </Link>
        <Link className="sidebar-user" href={serverUser ? "/settings" : "/login"}>
          <span>{avatarChar}</span>
          <strong>{displayName}</strong>
        </Link>
        <nav className="sidebar-nav">
          {sidebarItems.map((item) => (
            <SidebarItem
              active={isActive(pathname, item.href)}
              href={item.href}
              icon={item.icon}
              key={item.href}
              label={t(item.labelKey)}
            />
          ))}
        </nav>
      </div>

      <SidebarItem
        active={isActive(pathname, settingsItem.href)}
        className="sidebar-settings"
        href={settingsItem.href}
        icon={settingsItem.icon}
        label={t(settingsItem.labelKey)}
      />
    </aside>
  );
}
