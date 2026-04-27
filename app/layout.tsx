import type { Metadata } from "next";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { LanguageProvider } from "@/components/language-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Health Match",
  description: "AI-assisted symptom triage and doctor matching"
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
          <div className="site-shell">
            <SiteHeader />
            <main className="page-main">
              <div className="container">
                {children}
                <DisclaimerBanner />
              </div>
            </main>
            <SiteFooter />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
