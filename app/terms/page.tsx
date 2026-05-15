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
            "HealthMatchAI is an MVP that provides AI-assisted symptom triage, care level guidance, doctor visit preparation, and educational insurance navigation. It is not a healthcare provider, clinic, insurer, insurance agency, telemedicine practice, hospital, pharmacy, or emergency response service."
        },
        {
          heading: "Medical boundaries",
          body:
            "The service must not be used as a substitute for professional medical advice, clinician care, emergency care, or clinical decision making."
        },
        {
          heading: "No insurance advice",
          body:
            "Insurance information is educational only. HealthMatchAI does not recommend, sell, underwrite, or enroll users in specific insurance plans. For plan enrollment or plan-specific advice, speak with a licensed insurance agent or broker."
        },
        {
          heading: "User responsibility",
          body: [
            "You are responsible for deciding what information to submit.",
            "You are responsible for seeking appropriate care from licensed professionals.",
            "You should call local emergency services immediately if you may be experiencing an emergency."
          ]
        },
        {
          heading: "Availability",
          body:
            "The MVP may be modified, interrupted, or unavailable. We do not guarantee that AI outputs will be complete, accurate, or appropriate for your situation."
        },
        {
          heading: "Paid services",
          body: [
            "Payments, if enabled, are processed by a hosted merchant-of-record provider such as Paddle or Lemon Squeezy.",
            "HealthMatchAI may collect payments for tools such as doctor-ready PDF reports, insurance coverage checklists, or symptom timeline saving.",
            "A payment does not guarantee a medical outcome, appointment availability, insurance coverage, plan eligibility, enrollment, or clinician relationship.",
            "Refunds, cancellation, support, and jurisdiction-specific rules must be finalized before offering paid tools publicly."
          ]
        },
        {
          heading: "Care and coverage decisions",
          body:
            "You are responsible for seeking appropriate care from licensed professionals and verifying coverage directly with your insurer, plan documents, benefits administrator, or a licensed insurance agent or broker."
        },
        {
          heading: "No warranties",
          body:
            "The service is provided as-is for MVP validation. To the maximum extent permitted by law, HealthMatchAI disclaims warranties of accuracy, availability, fitness for a particular purpose, and non-infringement."
        }
      ]}
    />
  );
}
