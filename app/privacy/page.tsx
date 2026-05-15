import { LegalPage } from "@/components/legal-page";

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="April 27, 2026"
      sections={[
        {
          heading: "Information we collect",
          body: [
            "Symptom descriptions, severity, duration, selected language, AI triage output, care level guidance, insurance navigation checklist items, and reference IDs.",
            "Optional contact information you choose to provide for support or paid tool access.",
            "Technical data such as device, browser, approximate region, logs, error events, and security signals needed to operate and protect the service."
          ]
        },
        {
          heading: "How we use information",
          body: [
            "Generate AI-assisted symptom triage, care level guidance, doctor visit preparation, and educational insurance navigation.",
            "Store minimized case history so the MVP can show a reference ID, support follow-up, and improve reliability.",
            "Operate, debug, secure, monitor, and improve HealthMatchAI.",
            "Process payments for paid tools such as PDF reports, insurance coverage checklists, or symptom timeline saving if paid features are enabled."
          ]
        },
        {
          heading: "Medical and sensitive information",
          body:
            "Symptom text may include sensitive health information. Do not submit information you do not want processed by the service. This MVP is not a hospital, insurer, insurance agency, medical record system, covered clinical provider, pharmacy, or emergency service."
        },
        {
          heading: "Third-party processors",
          body: [
            "Submitted symptoms may be processed by AI model providers to generate triage support.",
            "Cloudflare may process hosting, database, security, analytics, and logging data.",
            "A merchant-of-record payment provider such as Paddle or Lemon Squeezy may process payment-related data if paid checkout is used.",
            "We do not sell personal health information."
          ]
        },
        {
          heading: "Retention",
          body:
            "MVP case records may be retained for product operation, audit, support, and abuse prevention. A deletion workflow and formal retention schedule should be finalized before broad public launch."
        },
        {
          heading: "Your choices",
          body:
            "You can avoid submitting directly identifying information in symptom text. Before public launch, HealthMatchAI should provide a dedicated support email for access, correction, deletion, and privacy requests."
        },
        {
          heading: "International users",
          body:
            "If you access the service from outside the United States, your information may be processed in other countries where our providers operate. Use of the service means you understand this cross-border processing may occur."
        },
        {
          heading: "Contact",
          body:
            "For privacy requests, contact the HealthMatchAI operator. A dedicated support address should be added before public launch."
        }
      ]}
    />
  );
}
