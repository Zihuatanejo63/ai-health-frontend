"use client";
import { usePathname } from "next/navigation";
import { SettingsProvider } from "@/components/settings-provider";
import { I18nProvider } from "@/components/i18n-provider";
const currentRoutes = [
  "/",
  "/sample-report",
  "/sample-doctor-report",
  "/pricing",
  "/safety",
  "/privacy",
];
export function RouteBoundary({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  if (currentRoutes.includes(path.replace(/\/$/, "") || "/"))
    return <>{children}</>;
  return (
    <SettingsProvider>
      <I18nProvider>
        <aside className="hm-legacy">
          <strong>Legacy page · retired product</strong>
          <p>
            This page belongs to the previous symptom and care-navigation
            experience. Do not submit health data or make purchases here.{" "}
            <a href="/sample-report">Explore the new report-reading sample →</a>
          </p>
        </aside>
        {children}
      </I18nProvider>
    </SettingsProvider>
  );
}
