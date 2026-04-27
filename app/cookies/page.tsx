import { LegalPage } from "@/components/legal-page";

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      updated="April 27, 2026"
      sections={[
        {
          heading: "How cookies are used",
          body:
            "AI Health Match may use cookies or similar browser storage for essential site operation, language preferences, basic analytics, security, and session continuity."
        },
        {
          heading: "Essential storage",
          body:
            "Some local storage is used to keep your selected language and recent AI triage result available while you navigate between pages."
        },
        {
          heading: "Analytics and security",
          body:
            "Cloudflare and other infrastructure providers may use cookies or similar technologies to protect the service, measure performance, and prevent abuse."
        },
        {
          heading: "Payment cookies",
          body:
            "If hosted payment checkout is used, the payment provider may set cookies or similar technologies for checkout, fraud prevention, payment security, and regulatory compliance."
        },
        {
          heading: "Managing cookies",
          body:
            "You can control cookies through your browser settings. Blocking some storage may affect site functionality, language preferences, payment checkout, or security features."
        }
      ]}
    />
  );
}
