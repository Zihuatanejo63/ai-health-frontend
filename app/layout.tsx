import type { Metadata } from "next";
import { AppLayout } from "@/components/app-ui";
import { I18nProvider } from "@/components/i18n-provider";
import { SettingsProvider } from "@/components/settings-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "HealthMatchAI",
  description: "AI Health Triage & Insurance Navigation"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SettingsProvider>
          <I18nProvider>
            <AppLayout>
              <div className="site-shell">
                <SiteHeader />
                <main className="page-main">
                  <div className="container">{children}</div>
                </main>
                <SiteFooter />
              </div>
            </AppLayout>
          </I18nProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
