import type { Metadata } from "next";
import { AppLayout } from "@/components/app-ui";
import { I18nProvider } from "@/components/i18n-provider";
import { SettingsProvider } from "@/components/settings-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://healthmatchai.com"),
  title: {
    default: "HealthMatchAI | Symptom Guidance, Care Navigation, and Health Summaries",
    template: "%s | HealthMatchAI"
  },
  description:
    "HealthMatchAI helps users structure symptom checks, compare care options, prepare doctor-ready summaries, and generate before-care cost and coverage questions.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    type: "website",
    url: "https://healthmatchai.com/",
    siteName: "HealthMatchAI",
    title: "HealthMatchAI | Symptom Guidance and Care Navigation",
    description:
      "Use structured symptom guidance, care-level decision support, doctor-ready summaries, and before-care cost and coverage questions.",
    images: [
      {
        url: "/images/hero-doctor-care.png",
        width: 1536,
        height: 1152,
        alt: "HealthMatchAI care navigation illustration"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "HealthMatchAI | Symptom Guidance and Care Navigation",
    description:
      "Structured symptom checks, care guidance, health summaries, and before-care cost and coverage questions.",
    images: ["/images/hero-doctor-care.png"]
  },
  category: "health",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
};

export const viewport = {
  themeColor: "#00B8C8",
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
        {/* Cookieless, privacy-safe analytics — no health data leaves the page. */}
        {process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN ? (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN}"}`}
          />
        ) : null}
      </body>
    </html>
  );
}
