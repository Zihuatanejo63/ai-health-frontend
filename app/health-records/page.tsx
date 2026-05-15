import { Card, IconCircle, PageHeader, PrimaryButton, StatusBadge, SummaryPreview } from "@/components/app-ui";
import { VisualCard } from "@/components/visual-card";

const items = [
  ["Symptoms", "4", "Headache, fatigue, mild fever, body aches", "primary"],
  ["Timeline", "5 days", "May 15 – May 19, 2025", "teal"],
  ["Red Flags Checked", "0", "No red flags detected", "danger"],
  ["Medications Taken", "2", "Acetaminophen, cough syrup", "teal"],
  ["Questions to Ask", "3", "Personalized questions for your visit", "primary"]
] as const;

export default function HealthRecordsPage() {
  return (
    <section className="app-page">
      <PageHeader
        title="Doctor-ready Summary"
        description="A shareable overview of your health information."
        action={<PrimaryButton href="/payment-success">Save as PDF</PrimaryButton>}
      />

      <div className="health-summary-layout">
        <div className="health-summary-list">
          {items.map(([title, count, detail, tone]) => (
            <Card className="summary-dashboard-card" key={title}>
              <IconCircle tone={tone}>{title.charAt(0)}</IconCircle>
              <div>
                <div className="card-title-row">
                  <h2>{title}</h2>
                  <StatusBadge tone={tone}>{count}</StatusBadge>
                </div>
                <p>{detail}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="health-summary-preview">
          <SummaryPreview />
          <VisualCard src="/images/design-health-summary.png" alt="Health summary design reference" />
        </div>
      </div>

      <Card className="privacy-card">
        <IconCircle tone="primary">L</IconCircle>
        <div>
          <h2>Your privacy is our priority</h2>
          <p>Your data is encrypted and never shared without your consent.</p>
        </div>
      </Card>
    </section>
  );
}
