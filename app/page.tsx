"use client";

import {
  Card,
  IconCircle,
  PageHeader,
  PrimaryButton,
  StatCard,
  StatusBadge
} from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";
import { VisualCard } from "@/components/visual-card";

const stats = [
  ["common.riskLevel", "common.moderate", "home.riskDetail", "warning"],
  ["home.recommendedCare", "common.primaryCare", "home.recommendedDetail", "primary"],
  ["home.redFlags", "home.checked", "home.redFlagsDetail", "success"],
  ["home.insuranceNote", "home.insuranceValue", "home.insuranceDetail", "purple"],
  ["home.doctorSummary", "common.ready", "home.summaryDetail", "teal"]
] as const;

export default function HomePage() {
  const { t } = useI18n();

  return (
    <section className="app-page dashboard-page">
      <PageHeader
        title={t("home.title")}
        description={t("home.description")}
        action={<span className="notification-dot">⌁</span>}
      />

      <Card className="symptom-command-card">
        <div className="command-input">
          <IconCircle>Q</IconCircle>
          <div>
            <h2>{t("home.symptomQuestion")}</h2>
            <input placeholder={t("home.placeholder")} />
          </div>
        </div>
        <PrimaryButton href="/symptom-check">{t("home.start")}</PrimaryButton>
      </Card>

      <div className="dashboard-grid">
        <div className="dashboard-card-grid">
          {stats.map(([label, value, detail, tone]) => (
            <StatCard key={label} label={t(label)} value={t(value)} detail={t(detail)} tone={tone} />
          ))}
          <Card className="recent-activity-card">
            <div>
              <IconCircle tone="primary">H</IconCircle>
              <StatusBadge tone="primary">{t("home.recentActivity")}</StatusBadge>
            </div>
            <h2>{t("home.recentType")}</h2>
            <p>{t("home.recentSymptoms")}</p>
            <time>May 19, 2025 · 10:24 AM</time>
          </Card>
        </div>

        <aside className="dashboard-visual">
          <VisualCard
            priority
            src="/images/hero-doctor-care.png"
            alt="Friendly doctor helping users understand care options"
          />
        </aside>
      </div>
    </section>
  );
}
