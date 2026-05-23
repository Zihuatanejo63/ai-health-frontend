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
            "HealthMatchAI provides digital software tools for symptom guidance, care navigation, doctor-ready summaries, and educational coverage questions. It is not a medical institution, healthcare provider, insurer, insurance broker, insurance agency, telemedicine platform, hospital, pharmacy, or emergency response service."
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
            "The service may be modified, interrupted, or unavailable. We do not guarantee that AI outputs will be complete, accurate, or appropriate for your situation."
        },
        {
          heading: "Paid services",
          body: [
            "Payments, where enabled, are processed through Creem. Applicable taxes may be calculated during checkout depending on your location.",
            "HealthMatchAI may collect payments for tools such as doctor-ready PDF reports, insurance education checklists, or symptom timeline saving.",
            "A payment does not guarantee a medical outcome, appointment availability, insurance coverage, plan eligibility, or clinician relationship.",
            "Refund and cancellation terms are described in the Refund Policy."
          ]
        },
        {
          heading: "Refund Policy",
          body: [
            "One-time digital reports may be non-refundable once generated or downloaded, except where required by law.",
            "Subscriptions can be cancelled through the billing flow once live billing is enabled.",
            "If payment verification fails or access is not delivered, users may contact support."
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
            "The service is provided as-is. To the maximum extent permitted by law, HealthMatchAI disclaims warranties of accuracy, availability, fitness for a particular purpose, and non-infringement."
        }
      ]}
    />
  );
}
