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
            "HealthMatchAI provides AI-assisted symptom triage, care guidance, doctor-ready summaries, and educational insurance navigation. It is not a medical institution, healthcare provider, insurer, insurance broker, insurance agency, telemedicine platform, hospital, pharmacy, or emergency response service."
        },
        {
          heading: "Medical boundaries",
          body:
            "The service does not diagnose, prescribe, treat, or replace professional medical care. It must not be used as a substitute for professional medical advice, clinician care, emergency care, or clinical decision making."
        },
        {
          heading: "Insurance education only",
          body:
            "Insurance information is educational only and does not constitute insurance advice. HealthMatchAI does not recommend, sell, underwrite, broker, or help users sign up for specific insurance plans. For plan-specific advice, speak with a licensed insurance professional."
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
            "Payments, if enabled, are processed by a hosted merchant-of-record provider.",
            "HealthMatchAI may collect payments for tools such as doctor-ready PDF reports, insurance education checklists, or symptom timeline saving.",
            "A payment does not guarantee a medical outcome, appointment availability, insurance coverage, plan eligibility, or clinician relationship.",
            "Refunds, cancellation, support, and jurisdiction-specific rules apply to paid report or checklist features."
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
