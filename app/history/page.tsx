import Link from "next/link";
import { SectionHeader } from "@/components/section-header";

const demoHistory = [
  {
    symptoms: "Fever + cough",
    risk: "Moderate risk",
    care: "Primary Care",
    created: "Created May 12, 2025"
  }
];

export default function HistoryPage() {
  return (
    <section className="app-page">
      <SectionHeader
        eyebrow="History"
        title="History"
        description="No saved symptom checks yet."
      />

      <div className="history-grid">
        {demoHistory.map((item) => (
          <article className="panel history-card" key={item.symptoms}>
            <span>{item.created}</span>
            <h2>{item.symptoms}</h2>
            <p>{item.risk}</p>
            <strong>{item.care}</strong>
            <Link className="btn-secondary" href="/result">
              View result
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
