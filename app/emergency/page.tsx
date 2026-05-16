import { Card, IconCircle, PageHeader } from "@/components/app-ui";

const emergencySigns = [
  "Chest pain",
  "Trouble breathing",
  "Stroke-like symptoms",
  "Severe bleeding",
  "Loss of consciousness",
  "Seizure",
  "Severe allergic reaction",
  "Suicidal thoughts or self-harm risk"
];

export default function EmergencyPage() {
  return (
    <section className="app-page">
      <PageHeader
        eyebrow="Emergency"
        title="If this is an emergency, call your local emergency number now."
        description="Do not wait for an app result when urgent help may be needed."
      />

      <Card className="crisis-card">
        <IconCircle tone="danger">!</IconCircle>
        <h2>Emergency signs</h2>
        <div className="check-list">
          {emergencySigns.map((sign) => (
            <span key={sign}>• {sign}</span>
          ))}
        </div>
      </Card>

      <Card>
        <h2>Get help first</h2>
        <p>
          HealthMatchAI is not an emergency service. If symptoms are severe, rapidly worsening, or could be life-threatening,
          contact local emergency services or go to the nearest emergency department now.
        </p>
      </Card>
    </section>
  );
}
