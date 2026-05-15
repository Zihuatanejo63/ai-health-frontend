import { DisclaimerBox } from "@/components/disclaimer-box";
import { SectionHeader } from "@/components/section-header";

const settingsGroups: Array<{ title: string; items: string[] }> = [
  { title: "Account", items: ["Name", "Email", "Manage account"] },
  { title: "Language", items: ["English", "中文", "Español", "Français", "Deutsch", "日本語", "한국어"] },
  { title: "Privacy & Data", items: ["Export my data", "Delete my data", "Clear symptom history"] },
  { title: "Health Profile", items: ["Age", "Sex", "Chronic conditions", "Allergies", "Medications"] },
  { title: "Insurance Profile", items: ["Insurance status", "Plan type", "Copay", "Deductible", "In-network preference"] },
  { title: "Notifications", items: ["Symptom follow-up reminder", "Report ready reminder"] },
  { title: "Subscription", items: ["Current plan", "Manage billing"] }
];

export default function SettingsPage() {
  return (
    <section className="app-page">
      <SectionHeader
        eyebrow="Settings"
        title="Settings"
        description="Manage account, language, health profile, privacy, and subscription preferences."
      />

      <div className="settings-grid">
        {settingsGroups.map(({ title, items }) => (
          <article className="panel settings-card" key={title}>
            <h2>{title}</h2>
            <ul>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <section className="settings-safety">
        <SectionHeader title="Safety" />
        <DisclaimerBox text="HealthMatchAI does not diagnose, prescribe, treat, or replace professional medical care." />
      </section>
    </section>
  );
}
