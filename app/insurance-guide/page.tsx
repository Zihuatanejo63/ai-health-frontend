import {
  Card,
  IconCircle,
  InsuranceConceptCard,
  PageHeader,
  StatusBadge
} from "@/components/app-ui";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { VisualCard } from "@/components/visual-card";

const concepts = [
  ["Copay", "Fixed amount paid at a visit", "warning"],
  ["Deductible", "Amount before your plan pays", "primary"],
  ["Out-of-pocket max", "Yearly limit for covered costs", "teal"],
  ["In-network", "Providers with lower negotiated cost", "success"],
  ["Urgent care vs ER", "Compare cost and urgency before going", "purple"],
  ["Questions to ask your insurer", "Confirm coverage before non-emergency care", "primary"]
] as const;

export default function InsuranceGuidePage() {
  return (
    <section className="app-page">
      <PageHeader
        eyebrow="Insurance Navigation"
        title="Insurance Navigation"
        description="Understand your coverage. Make informed care decisions."
      />

      <div className="insurance-dashboard-grid">
        <Card className="insurance-hero-card">
          <div>
            <IconCircle tone="teal">I</IconCircle>
            <h2>Your coverage, made clear</h2>
            <p>
              We break down key concepts so you can estimate costs, compare care options, and avoid surprises.
            </p>
          </div>
          <VisualCard src="/images/design-insurance-navigation.png" alt="Insurance navigation design reference" />
        </Card>

        <Card className="coverage-snapshot">
          <h2>Coverage snapshot</h2>
          {[
            ["Plan active", "Active"],
            ["In-network benefits", "In-network"],
            ["Urgent care copay", "$35"],
            ["Deductible remaining", "$1,250 / $2,000"]
          ].map(([label, value]) => (
            <div className="snapshot-row" key={label}>
              <span>{label}</span>
              <StatusBadge tone={value === "Active" || value === "In-network" ? "success" : "primary"}>
                {value}
              </StatusBadge>
            </div>
          ))}
        </Card>
      </div>

      <div className="concept-grid">
        {concepts.map(([title, description, tone]) => (
          <InsuranceConceptCard key={title} title={title} description={description} tone={tone} />
        ))}
      </div>

      <DisclaimerBox text="HealthMatchAI provides educational information only. We do not sell insurance and do not recommend any specific plan, provider, or treatment. Always verify benefits with your insurer." />
    </section>
  );
}
