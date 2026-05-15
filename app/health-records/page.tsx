import Link from "next/link";
import { SectionHeader } from "@/components/section-header";
import { VisualCard } from "@/components/visual-card";

const summaryItems = [
  "Doctor-ready Summary",
  "Symptoms",
  "Timeline",
  "Medications Taken",
  "Red Flags Checked",
  "Questions to Ask",
  "Save as PDF"
];

export default function HealthRecordsPage() {
  return (
    <section className="app-page">
      <div className="page-hero-grid">
        <SectionHeader
          eyebrow="Health Summary"
          title="Health Summary"
          description="Review a structured, shareable summary before a clinician visit."
        />
        <VisualCard src="/images/illustration-doctor-summary.png" alt="Doctor-ready summary app screen" />
      </div>

      <section className="summary-dashboard-grid">
        {summaryItems.map((item, index) => (
          <article className="panel summary-dashboard-card" key={item}>
            <span>{index + 1}</span>
            <h2>{item}</h2>
            <p>
              {item === "Save as PDF"
                ? "Export a clean report when you are ready."
                : "Organized details for your visit preparation."}
            </p>
          </article>
        ))}
      </section>

      <Link className="btn-primary section-cta" href="/payment-success">
        Save as PDF
      </Link>
    </section>
  );
}
