import { PageHeader, SettingsSection, StatusBadge } from "@/components/app-ui";

export default function SettingsPage() {
  return (
    <section className="app-page settings-page">
      <PageHeader title="Settings" />

      <SettingsSection title="Account" subtitle="Manage your personal information" icon="A">
        <div className="settings-inline">
          <strong>Alex Johnson</strong>
          <span>alex.johnson@email.com</span>
          <span className="chevron">›</span>
        </div>
      </SettingsSection>

      <SettingsSection title="Language" subtitle="Choose your preferred language" icon="G" tone="primary">
        <div className="button-chip-row">
          {["English", "中文", "Español"].map((item, index) => (
            <StatusBadge key={item} tone={index === 0 ? "primary" : "teal"}>
              {item}
            </StatusBadge>
          ))}
        </div>
      </SettingsSection>

      <SettingsSection title="Privacy & Data" subtitle="Control your data and privacy" icon="L" tone="purple">
        <div className="settings-list-control">
          <span>Export data ›</span>
          <span className="danger-text">Delete data ›</span>
        </div>
      </SettingsSection>

      <SettingsSection title="Health Profile" subtitle="Manage your health information" icon="H" tone="teal">
        <div className="settings-list-control">
          <span>Medical conditions <StatusBadge tone="teal">3</StatusBadge></span>
          <span>Medications <StatusBadge tone="teal">2</StatusBadge></span>
        </div>
      </SettingsSection>

      <SettingsSection title="Insurance Profile" subtitle="Manage your insurance details" icon="I" tone="primary">
        <div className="settings-list-control">
          <span>Primary insurance <StatusBadge tone="success">Active</StatusBadge></span>
          <span>Insurance history ›</span>
        </div>
      </SettingsSection>

      <SettingsSection title="Notifications" subtitle="Manage how you stay updated" icon="N" tone="purple">
        <div className="settings-list-control">
          <span>Reminders <span className="toggle-on" /></span>
          <span>Tips & updates <span className="toggle-on" /></span>
        </div>
      </SettingsSection>

      <SettingsSection title="Subscription" subtitle="Manage your plan and billing" icon="S" tone="warning">
        <div className="settings-list-control">
          <span>Plan <strong>Premium</strong></span>
          <span>Billing & payments ›</span>
        </div>
      </SettingsSection>

      <SettingsSection title="Safety" subtitle="Important information" icon="!" tone="danger">
        <div className="safety-note">
          HealthMatchAI does not diagnose or replace professional care. In an emergency, call your local emergency number.
        </div>
      </SettingsSection>
    </section>
  );
}
