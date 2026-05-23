import { LegalPage } from "@/components/legal-page";

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="May 23, 2026"
      sections={[
        {
          heading: "Information we collect",
          body: [
            "Symptom descriptions, severity, duration, selected language, AI symptom triage output, care guidance, doctor-ready summary fields, insurance education checklist items, and reference IDs.",
            "Optional contact information you choose to provide for support, account access, or paid report delivery.",
            "Technical data such as device, browser, approximate region, logs, error events, and security signals needed to operate and protect the service."
          ]
        },
        {
          heading: "How we use information",
          body: [
            "Generate AI-assisted symptom triage, care guidance, doctor-ready summaries, and educational insurance navigation.",
            "Store minimized case history so the service can show a reference ID, support follow-up, and improve reliability.",
            "Operate, debug, secure, monitor, and improve HealthMatchAI.",
            "Process payments for paid tools such as PDF reports, coverage education checklists, or symptom timeline saving if paid features are enabled."
          ]
        },
        {
          heading: "Guest vs. logged-in data",
          body: [
            "Guest data stays on this device and may be lost if you clear browser data, switch devices, or use private browsing.",
            "Logged-in health records are encrypted before being stored. Only you (via your authenticated session) can access them.",
            "Symptom information may be processed by an AI service provider to generate summaries and explanations."
          ]
        },
        {
          heading: "Medical and sensitive information",
          body:
            "Symptom text may include sensitive health information. Do not submit information you do not want processed by the service. HealthMatchAI is not a medical institution, healthcare provider, insurer, insurance broker, insurance agency, telemedicine platform, pharmacy, medical record system, or emergency service."
        },
        {
          heading: "Third-party processors",
          body: [
            "Submitted symptoms may be processed by AI model providers to generate triage support.",
            "Cloudflare may process hosting, database, security, analytics, and logging data.",
            "Payment-related data may be processed by Creem when paid checkout is used.",
            "We do not sell personal health information."
          ]
        },
        {
          heading: "Retention",
          body: [
            "Health records are retained until the user deletes them. You may request deletion at any time.",
            "Error logs may be retained for security and reliability purposes.",
            "Payment ledger records may be retained as required for accounting, fraud prevention, and legal compliance.",
            "Some data may be stored locally on your device unless you create an account or use paid features."
          ]
        },
        {
          heading: "Your choices",
          body:
            "You can avoid submitting directly identifying information in symptom text. You may request access, export, correction, or deletion by contacting support@healthmatchai.com."
        },
        {
          heading: "Children under 13",
          body:
            "HealthMatchAI is not intended for children under 13. We do not knowingly collect personal information from children under 13."
        },
        {
          heading: "International users",
          body:
            "If you access the service from outside the United States, your information may be processed in other countries where our providers operate. Use of the service means you understand this cross-border processing may occur."
        },
        {
          heading: "Contact",
          body:
            "For privacy requests, contact support@healthmatchai.com."
        }
      ]}
    />
  );
}
