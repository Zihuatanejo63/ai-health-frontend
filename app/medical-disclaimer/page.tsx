import { LegalPage } from "@/components/legal-page";

export default function MedicalDisclaimerPage() {
  return (
    <LegalPage
      title="Medical Disclaimer"
      updated="April 27, 2026"
      sections={[
        {
          heading: "Medical boundaries",
          body:
            "HealthMatchAI provides AI-generated symptom triage and care guidance only. It does not diagnose, prescribe, treat, interpret medical images as a clinician, or replace evaluation by a licensed clinician."
        },
        {
          heading: "Emergency warning",
          body: [
            "If symptoms are severe, worsening, life-threatening, or rapidly changing, seek emergency care immediately.",
            "Emergency signs may include chest pain, trouble breathing, severe bleeding, stroke-like symptoms, severe allergic reaction, suicidal thoughts, major injury, or loss of consciousness."
          ]
        },
        {
          heading: "AI limitations",
          body:
            "AI outputs can be incomplete or incorrect. They are based on information you provide and may miss important context."
        },
        {
          heading: "Professional care",
          body:
            "Always consult a licensed medical professional for medical advice, care decisions, and follow-up care."
        },
        {
          heading: "Insurance information",
          body:
            "Insurance information is educational only and does not constitute insurance advice. HealthMatchAI is not an insurer, insurance broker, insurance agency, or enrollment platform. For insurance enrollment, subsidies, eligibility, or plan-specific coverage questions, speak with a licensed insurance agent or broker."
        },
        {
          heading: "Paid tools",
          body:
            "Paid tools such as doctor-ready PDF reports, coverage education checklists, or symptom timelines are organizational aids only. They do not create a clinician relationship, guarantee coverage, or replace professional medical or insurance guidance."
        },
        {
          heading: "Image and report uploads",
          body:
            "If image or report analysis is enabled, AI review is still limited and should not be treated as a radiology, pathology, dermatology, or specialist interpretation."
        },
        {
          heading: "Jurisdiction",
          body:
            "Healthcare rules vary by country, state, and region. You are responsible for using local emergency numbers and licensed local medical services."
        }
      ]}
    />
  );
}
