import { DisclaimerBox } from "@/components/disclaimer-box";
import { SectionHeader } from "@/components/section-header";
import { VisualCard } from "@/components/visual-card";

const topics = [
  ["Urgent care vs ER", "Urgent care is often designed for same-day non-emergency needs. ER care is for emergencies and can involve different facility charges."],
  ["Copay", "A fixed amount you may pay for a covered visit or service."],
  ["Deductible", "The amount you may need to pay before some benefits begin."],
  ["Coinsurance", "A percentage of covered costs you may owe after deductible rules apply."],
  ["Out-of-pocket maximum", "A plan limit on certain covered costs during a plan year."],
  ["In-network vs out-of-network", "Network status can change what is covered and how much you may owe."],
  ["Questions to ask your insurer", "Ask whether the location is covered, whether the provider is in-network, and what copay or deductible rules apply."],
  ["Talk to a licensed insurance partner", "For plan enrollment or plan-specific recommendations, speak with a licensed insurance agent or broker."]
];

export default function InsuranceGuidePage() {
  return (
    <section className="stack-page">
      <div className="page-hero-grid">
        <SectionHeader
          eyebrow="Insurance Navigation"
          title="Insurance Navigation"
          description="Learn the insurance questions to ask before a non-emergency visit."
        />
        <VisualCard src="/images/illustration-insurance-checklist.png" alt="Insurance checklist product illustration" />
      </div>

      <div className="insurance-topic-grid guide-grid">
        {topics.map(([title, description]) => (
          <article className="insurance-topic-card" key={title}>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>

      <DisclaimerBox text="HealthMatchAI does not sell insurance or recommend a specific plan. Insurance information is educational only." />
    </section>
  );
}
