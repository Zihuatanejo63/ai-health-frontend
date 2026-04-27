import { LegalPage } from "@/components/legal-page";

export default function EmergencyPage() {
  return (
    <LegalPage
      title="Emergency Notice"
      updated="April 27, 2026"
      sections={[
        {
          heading: "Not an emergency service",
          body:
            "AI Health Match is not designed for emergency response, urgent care dispatch, ambulance routing, crisis response, poison control, suicide prevention, or real-time clinical monitoring."
        },
        {
          heading: "When to seek immediate help",
          body: [
            "Chest pain, pressure, or symptoms of heart attack.",
            "Difficulty breathing, blue lips, severe allergic reaction, or choking.",
            "Stroke-like symptoms, severe confusion, seizure, fainting, or loss of consciousness.",
            "Major injury, severe bleeding, burns, poisoning, overdose, or suicidal thoughts."
          ]
        },
        {
          heading: "United States users",
          body:
            "If you are in the United States and may be experiencing a medical emergency, call 911 or go to the nearest emergency department."
        },
        {
          heading: "Other countries",
          body:
            "If you are outside the United States, contact your local emergency number or nearest emergency medical service."
        },
        {
          heading: "Do not wait for AI output",
          body:
            "Do not enter symptoms into AI Health Match or wait for an AI response when urgent help may be needed. Contact emergency services first."
        }
      ]}
    />
  );
}
