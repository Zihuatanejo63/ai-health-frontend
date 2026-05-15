import { HistoryItem, PageHeader, PrimaryButton, StatusBadge } from "@/components/app-ui";

const history = [
  ["Fever + cough", "Moderate", "Primary Care", "May 19, 2025 10:24 AM", "warning"],
  ["Headache", "Low", "Self Care", "May 16, 2025 08:15 PM", "success"],
  ["Stomach pain", "Moderate", "Primary Care", "May 14, 2025 11:47 AM", "warning"],
  ["Sore throat", "Low", "Self Care", "May 10, 2025 09:02 AM", "teal"],
  ["Fatigue", "Moderate", "Primary Care", "May 7, 2025 04:30 PM", "warning"]
] as const;

export default function HistoryPage() {
  return (
    <section className="app-page history-page">
      <PageHeader title="History" description="Your past symptom checks and results." />

      <div className="filter-chip-row">
        {["All", "Recent", "Saved", "Flagged"].map((item, index) => (
          <StatusBadge key={item} tone={index === 0 ? "primary" : "teal"}>
            {item}
          </StatusBadge>
        ))}
      </div>

      <div className="history-list">
        {history.map(([symptom, risk, care, date, tone]) => (
          <HistoryItem
            key={`${symptom}-${date}`}
            symptom={symptom}
            risk={risk}
            care={care}
            date={date}
            tone={tone}
          />
        ))}
      </div>

      <section className="panel history-empty-card">
        <div className="empty-icon">◷</div>
        <h2>No more history yet</h2>
        <p>Your symptom checks will appear here. Start a new check anytime.</p>
        <PrimaryButton href="/symptom-check">Start Symptom Check</PrimaryButton>
      </section>
    </section>
  );
}
