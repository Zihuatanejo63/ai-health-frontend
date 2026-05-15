import {
  Card,
  IconCircle,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  StatCard,
  StatusBadge
} from "@/components/app-ui";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { VisualCard } from "@/components/visual-card";

const redFlags = ["No chest pain", "No trouble breathing", "No confusion", "No severe dehydration"];
const causes = ["Common cold", "Flu-like illness", "Viral respiratory infection"];
const monitor = ["Fever", "Breathing", "Hydration", "Energy", "Symptoms lasting >7 days"];
const checklist = ["Is urgent care covered?", "Is the provider in-network?", "What is your copay?", "Does your deductible apply?"];

export default function ResultPage() {
  return (
    <section className="app-page result-page">
      <PageHeader title="Your symptom check result" description="Reference HM-2025-0519-1024" />

      <div className="result-top-grid">
        <StatCard
          label="Risk Level"
          value="Moderate"
          detail="Your symptoms are not likely to be serious."
          tone="warning"
        />
        <StatCard
          label="Recommended Care"
          value="Primary Care within 24–72 hours"
          detail="See a primary care provider within the next 1–3 days."
          tone="primary"
        />
      </div>

      <div className="result-content-grid">
        <div className="result-column">
          <Card>
            <h2>Why this result?</h2>
            <p>Your symptoms are consistent with non-urgent conditions that are commonly treated in primary care.</p>
          </Card>

          <Card>
            <h2>Red Flags Checked</h2>
            <div className="check-list">
              {redFlags.map((item) => (
                <span key={item}>✓ {item}</span>
              ))}
            </div>
          </Card>

          <Card>
            <h2>Possible Causes</h2>
            <p>Your symptoms may be consistent with:</p>
            <div className="chip-row">
              {causes.map((item) => (
                <StatusBadge key={item} tone="primary">{item}</StatusBadge>
              ))}
            </div>
          </Card>

          <Card>
            <h2>What to Monitor</h2>
            <div className="chip-row">
              {monitor.map((item) => (
                <StatusBadge key={item} tone="teal">{item}</StatusBadge>
              ))}
            </div>
          </Card>
        </div>

        <div className="result-column">
          <Card className="doctor-summary-card">
            <div className="card-title-row">
              <h2>Doctor-ready Summary</h2>
              <IconCircle tone="teal">✓</IconCircle>
            </div>
            <div className="summary-mini-grid">
              <span>Symptoms <strong>5</strong></span>
              <span>Duration <strong>3 days</strong></span>
              <span>Checks <strong>Completed</strong></span>
              <span>Risk Level <strong>Moderate</strong></span>
            </div>
            <PrimaryButton href="/payment-success">Download Full PDF Report</PrimaryButton>
          </Card>

          <Card>
            <h2>Insurance Checklist</h2>
            <div className="check-list">
              {checklist.map((item) => (
                <span key={item}>□ {item}</span>
              ))}
            </div>
            <SecondaryButton href="/insurance-guide">Understand Coverage Options</SecondaryButton>
          </Card>

          <VisualCard src="/images/design-result.png" alt="Result page design reference" />
        </div>
      </div>

      <DisclaimerBox text="HealthMatchAI does not diagnose, prescribe, treat, or replace professional medical care. Insurance information is educational only." />
    </section>
  );
}
