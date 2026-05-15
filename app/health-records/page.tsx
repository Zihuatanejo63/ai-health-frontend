import { SectionHeader } from "@/components/section-header";
import { VisualCard } from "@/components/visual-card";

const features = [
  "Saved symptom checks",
  "Doctor-ready PDF reports",
  "Family profiles",
  "Medication list",
  "Allergy list",
  "Insurance checklist history"
];

export default function HealthRecordsPage() {
  return (
    <section className="stack-page">
      <div className="page-hero-grid">
        <SectionHeader
          eyebrow="Health Records"
          title="Keep your health decisions organized"
          description="A clean workspace for symptom timelines, visit preparation, family context, and coverage questions."
        />
        <VisualCard src="/images/illustration-doctor-summary.png" alt="Health records and PDF report preview" />
      </div>

      <div className="feature-grid">
        {features.map((feature) => (
          <article className="panel record-card" key={feature}>
            <span className="feature-status">Coming soon</span>
            <h3>{feature}</h3>
            <p>Designed for organized, shareable health decision records.</p>
          </article>
        ))}
      </div>
    </section>
  );
}
