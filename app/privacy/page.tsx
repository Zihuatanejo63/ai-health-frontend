import { LegalPage } from "@/components/legal-page";

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="April 27, 2026"
      sections={[
        {
          heading: "Information we collect",
          body:
            "AI Health Match may collect symptom descriptions, severity, duration, selected language, AI triage output, technical logs, and basic usage information needed to operate the MVP."
        },
        {
          heading: "How we use information",
          body:
            "We use submitted information to generate AI-assisted triage support, improve product reliability, store case history, prevent abuse, and maintain the service."
        },
        {
          heading: "Medical and sensitive information",
          body:
            "Symptom text may include sensitive health information. Do not submit information you do not want processed by the service. This MVP is not a medical record system."
        },
        {
          heading: "Third-party processors",
          body:
            "Submitted symptoms may be sent to AI providers and Cloudflare infrastructure to provide the service. We do not sell personal health information."
        },
        {
          heading: "Contact",
          body:
            "For privacy requests, contact the AI Health Match operator. A dedicated support address should be added before public launch."
        }
      ]}
    />
  );
}
