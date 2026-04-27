import { LegalPage } from "@/components/legal-page";

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="April 27, 2026"
      sections={[
        {
          heading: "Service scope",
          body:
            "AI Health Match is an MVP that provides AI-assisted triage support and doctor matching concepts. It is not a healthcare provider and does not establish a doctor-patient relationship."
        },
        {
          heading: "No medical diagnosis",
          body:
            "The service must not be used as a substitute for professional medical advice, diagnosis, treatment, emergency care, or clinical decision making."
        },
        {
          heading: "User responsibility",
          body:
            "You are responsible for deciding what information to submit and for seeking appropriate care from licensed professionals."
        },
        {
          heading: "Availability",
          body:
            "The MVP may be modified, interrupted, or unavailable. We do not guarantee that AI outputs will be complete, accurate, or appropriate for your situation."
        },
        {
          heading: "Future paid services",
          body:
            "If payments or consultations are added, additional terms for refunds, scheduling, provider qualifications, and cancellation will be required."
        }
      ]}
    />
  );
}
