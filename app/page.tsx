import {
  Card,
  IconCircle,
  PageHeader,
  PrimaryButton,
  StatCard,
  StatusBadge
} from "@/components/app-ui";
import { VisualCard } from "@/components/visual-card";

const stats = [
  ["Risk Level", "Moderate", "Based on your symptoms", "warning"],
  ["Recommended Care", "Primary Care", "Best place to start", "primary"],
  ["Red Flags", "Checked", "No immediate red flags detected", "success"],
  ["Insurance Note", "Check urgent care coverage", "Before choosing care", "purple"],
  ["Doctor-ready Summary", "Ready", "Prepared to share", "teal"]
] as const;

export default function HomePage() {
  return (
    <section className="app-page dashboard-page">
      <PageHeader
        title="Welcome back"
        description="How can we help you today?"
        action={<span className="notification-dot">⌁</span>}
      />

      <Card className="symptom-command-card">
        <div className="command-input">
          <IconCircle>Q</IconCircle>
          <div>
            <h2>What symptoms are you experiencing?</h2>
            <input placeholder="Describe your symptoms..." />
          </div>
        </div>
        <PrimaryButton href="/symptom-check">Start Symptom Check</PrimaryButton>
      </Card>

      <div className="dashboard-grid">
        <div className="dashboard-card-grid">
          {stats.map(([label, value, detail, tone]) => (
            <StatCard key={label} label={label} value={value} detail={detail} tone={tone} />
          ))}
          <Card className="recent-activity-card">
            <div>
              <IconCircle tone="primary">H</IconCircle>
              <StatusBadge tone="primary">Recent Activity</StatusBadge>
            </div>
            <h2>Symptom Check</h2>
            <p>Headache, fatigue, mild fever</p>
            <time>May 19, 2025 · 10:24 AM</time>
          </Card>
        </div>

        <aside className="dashboard-visual">
          <VisualCard
            priority
            src="/images/design-home-dashboard.png"
            alt="HealthMatchAI dashboard design preview"
          />
        </aside>
      </div>
    </section>
  );
}
