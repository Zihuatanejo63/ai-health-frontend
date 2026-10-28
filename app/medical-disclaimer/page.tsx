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
            "HealthMatchAI does not provide medical diagnosis, treatment, prescriptions, emergency care, or insurance brokerage. It provides educational health navigation and doctor-ready report preparation only. It does not replace evaluation by a licensed clinician."
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
            "Insurance information is educational only and does not constitute insurance advice. HealthMatchAI is not an insurer, insurance broker, insurance agency, or plan sign-up platform. For subsidies, eligibility, or plan-specific coverage questions, speak with a licensed insurance professional."
        },
        {
          heading: "Paid tools",
          body:
            "Paid Plus subscription features — such as unlimited doctor-ready reports, saved health records, symptom history, insurance checklist history, and multi-language reports — are organizational aids only. They do not create a clinician relationship, guarantee coverage, or replace professional medical or insurance guidance."
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
