import type { Metadata } from "next";
import { RouteBoundary } from "@/components/route-boundary";
import { AppLayout } from "@/components/app-ui";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";
import "./editorial.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://healthmatchai.com"),
  title: {
    default: "HealthMatch AI | Know your numbers. Catch changes early.",
    template: "%s | HealthMatch AI",
  },
  description:
    "Understand checkup reports, follow changes over time, and keep follow-ups in view. Explore the HealthMatch AI product preview.",
  openGraph: {
    type: "website",
    siteName: "HealthMatch AI",
    title: "Know your numbers. Catch changes early.",
    description:
      "Plain-language report readings, longitudinal tracking, and follow-up reminders. Product preview.",
  },
  twitter: {
    card: "summary",
    title: "HealthMatch AI",
    description: "Know your numbers. Catch changes early.",
  },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export const viewport = {
  themeColor: "#0F6E64",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RouteBoundary>
          <AppLayout>
            <div className="site-shell">
              <SiteHeader />
              <main className="page-main" id="main-content">
                <div className="container">{children}</div>
              </main>
              <SiteFooter />
            </div>
          </AppLayout>
        </RouteBoundary>
      </body>
    </html>
  );
}
