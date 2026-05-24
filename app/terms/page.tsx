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
            "HealthMatchAI does not provide medical diagnosis, treatment, prescriptions, emergency care, or insurance brokerage. It provides educational health navigation and doctor-ready report preparation only. It must not be used as a substitute for professional medical advice, clinician care, emergency care, or clinical decision making."
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
            "HealthMatchAI offers a Plus subscription at $9.99/month. Payments are processed through Creem. Applicable taxes may be calculated during checkout depending on your location.",
            "Plus features include unlimited doctor-ready reports, saved health records, symptom history, insurance checklist history, multi-language reports, and priority access to new features.",
            "A payment does not guarantee a medical outcome, appointment availability, insurance coverage, plan eligibility, or clinician relationship.",
            "Subscriptions can be cancelled at any time. Access remains until the end of the billing period after cancellation. Refund and cancellation terms are described in the Refund Policy."
          ]
        },
        {
          heading: "Refund Policy",
          body: [
            "Subscriptions can be cancelled at any time. Access remains until the end of the billing period after cancellation.",
            "Refund requests may be reviewed within 7 days of purchase.",
            "If payment verification fails or access is not delivered, users may contact support@healthmatchai.com."
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
