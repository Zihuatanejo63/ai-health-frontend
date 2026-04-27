import { LegalPage } from "@/components/legal-page";

export default function MedicalDisclaimerPage() {
  return (
    <LegalPage
      title="Medical Disclaimer"
      updated="April 27, 2026"
      sections={[
        {
          heading: "Not a diagnosis",
          body:
            "AI Health Match provides AI-generated triage support only. It does not diagnose, treat, prescribe, interpret medical images as a clinician, or replace evaluation by a licensed clinician."
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
            "Always consult a licensed medical professional for medical advice, diagnosis, treatment decisions, and follow-up care."
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
