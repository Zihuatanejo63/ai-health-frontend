import Link from "next/link";
import { VisualCard } from "@/components/visual-card";

const dashboardCards = [
  {
    kicker: "Risk Level",
    value: "Moderate",
    detail: "Based on your symptoms",
    tone: "warning"
  },
  {
    kicker: "Recommended Care",
    value: "Primary Care",
    detail: "Best place to start",
    tone: "primary"
  },
  {
    kicker: "Red Flags",
    value: "Checked",
    detail: "No immediate red flags detected",
    tone: "success"
  },
  {
    kicker: "Insurance Note",
    value: "Check urgent care coverage",
    detail: "Compare urgent care vs ER benefits",
    tone: "secondary"
  },
  {
    kicker: "Doctor-ready Summary",
    value: "Ready",
    detail: "Prepared to share with a clinician",
    tone: "secondary"
  }
];

export default function HomePage() {
  return (
    <section className="app-page dashboard-page">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Welcome back</h1>
          <p>How can we help you today?</p>
        </div>
        <Link className="btn-primary" href="/symptom-check">
          Start Symptom Check
        </Link>
      </div>

      <section className="panel symptom-command-card">
        <div className="command-input">
          <span aria-hidden="true">☤</span>
          <div>
            <h2>What symptoms are you experiencing?</h2>
            <p>e.g., fever, cough, headache, sore throat, fatigue...</p>
          </div>
        </div>
        <Link className="btn-primary" href="/symptom-check">
          Start Symptom Check
        </Link>
      </section>

      <div className="dashboard-grid">
        <section className="dashboard-card-grid">
          {dashboardCards.map((card) => (
            <article className={`panel dashboard-metric metric-${card.tone}`} key={card.kicker}>
              <span>{card.kicker}</span>
              <strong>{card.value}</strong>
              <p>{card.detail}</p>
              <Link href={card.kicker === "Insurance Note" ? "/insurance-guide" : "/result"}>
                View details
              </Link>
            </article>
          ))}
        </section>

        <aside className="dashboard-visual">
          <VisualCard
            priority
            src="/images/hero-care-dashboard.png"
            alt="HealthMatchAI app dashboard preview"
          />
        </aside>
      </div>
    </section>
  );
}
