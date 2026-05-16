import { Card, IconCircle, PageHeader, PrimaryButton, SecondaryButton } from "@/components/app-ui";

export default function PaymentSuccessPage() {
  return (
    <section className="app-page">
      <PageHeader
        eyebrow="Paid tools"
        title="Your paid tools are ready"
        description="Paid tools do not include clinician care, medication orders, diagnosis, or insurance recommendations."
      />

      <div className="paid-tool-grid">
        <Card className="paid-tool-card">
          <IconCircle tone="primary">PDF</IconCircle>
          <h2>Download Doctor-ready PDF</h2>
          <p>Shareable visit summary.</p>
          <PrimaryButton href="/result">Download Full PDF Report</PrimaryButton>
        </Card>
        <Card className="paid-tool-card">
          <IconCircle tone="teal">I</IconCircle>
          <h2>View Insurance Checklist</h2>
          <p>Coverage questions before care.</p>
          <SecondaryButton href="/insurance-guide">View Checklist</SecondaryButton>
        </Card>
        <Card className="paid-tool-card">
          <IconCircle tone="success">T</IconCircle>
          <h2>Save Symptom Timeline</h2>
          <p>Keep your symptom history organized.</p>
          <SecondaryButton href="/result">Save Timeline</SecondaryButton>
        </Card>
        <Card className="paid-tool-card">
          <IconCircle tone="purple">↩</IconCircle>
          <h2>Back to Result</h2>
          <p>Return to your care guidance.</p>
          <SecondaryButton href="/result">Back to Result</SecondaryButton>
        </Card>
      </div>
    </section>
  );
}
