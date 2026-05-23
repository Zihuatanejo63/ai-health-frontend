import { LegalPage } from "@/components/legal-page";

export default function ContactPage() {
  return (
    <LegalPage
      title="Contact"
      updated="May 23, 2026"
      sections={[
        {
          heading: "Support",
          body: "For questions about the service, your account, purchases, or technical issues, email support@healthmatchai.com."
        },
        {
          heading: "Medical concerns",
          body: "HealthMatchAI does not provide medical advice. If you have a medical concern, please contact a licensed healthcare provider. If you are experiencing a medical emergency, call your local emergency services immediately."
        },
        {
          heading: "Data and privacy",
          body: "For questions about your data, data export, or data deletion, see our Privacy Policy or contact support@healthmatchai.com."
        },
        {
          heading: "Business inquiries",
          body: "For business or partnership inquiries, contact support@healthmatchai.com."
        }
      ]}
    />
  );
}
