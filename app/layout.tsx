import type { Metadata } from "next";
import { AppLayout } from "@/components/app-ui";
import { LanguageProvider } from "@/components/language-provider";
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
        <LanguageProvider>
          <AppLayout>
            <div className="site-shell">
            <SiteHeader />
            <main className="page-main">
              <div className="container">{children}</div>
            </main>
            <SiteFooter />
            </div>
          </AppLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}
