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
            "AI Health Match is an MVP that provides AI-assisted triage support and doctor matching concepts. It is not a healthcare provider, clinic, insurer, telemedicine practice, hospital, pharmacy, or emergency response service."
        },
        {
          heading: "No medical diagnosis",
          body:
            "The service must not be used as a substitute for professional medical advice, diagnosis, treatment, emergency care, or clinical decision making."
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
            "AI Health Match may collect consultation request payments as the platform operator.",
            "Provider assignment, availability, and any final care relationship are not guaranteed until confirmed.",
            "A payment does not guarantee a medical outcome, appointment availability, prescription, diagnosis, or doctor-patient relationship.",
            "If AI Health Match cannot match an appropriate provider, refunds are handled according to the applicable refund policy.",
            "Refunds, scheduling, cancellation, provider qualifications, and jurisdiction-specific rules must be finalized before offering real consultations."
          ]
        },
        {
          heading: "Provider listings",
          body:
            "Doctor listings in this MVP may be mock data or manually curated information. Do not rely on listings as proof of current licensure, availability, insurance coverage, or clinical suitability."
        },
        {
          heading: "No warranties",
          body:
            "The service is provided as-is for MVP validation. To the maximum extent permitted by law, AI Health Match disclaims warranties of accuracy, availability, fitness for a particular purpose, and non-infringement."
        }
      ]}
    />
  );
}
