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
            "AI Health Match is not designed for emergency response, urgent care dispatch, ambulance routing, or real-time clinical monitoring."
        },
        {
          heading: "When to seek immediate help",
          body:
            "Seek emergency care immediately for symptoms such as chest pain, difficulty breathing, severe allergic reaction, stroke-like symptoms, major injury, severe bleeding, suicidal thoughts, or loss of consciousness."
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
        }
      ]}
    />
  );
}
