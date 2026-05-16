"use client";

import { Card, IconCircle, PageHeader, PrimaryButton, StatusBadge, SummaryPreview } from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";
import { IllustrationImage } from "@/components/visual-card";

const items = [
  ["summary.symptoms", "4", "Headache, fatigue, mild fever, body aches", "primary"],
  ["summary.timeline", "5 days", "May 15 – May 19, 2025", "teal"],
  ["summary.redFlags", "0", "No red flags detected", "danger"],
  ["summary.medications", "2", "Acetaminophen, cough syrup", "teal"],
  ["summary.questions", "3", "Personalized questions for your visit", "primary"]
] as const;

export default function HealthRecordsPage() {
  const { t } = useI18n();

  return (
    <section className="app-page">
      <PageHeader
        title={t("summary.title")}
        description={t("summary.description")}
        action={<PrimaryButton href="/payment-success">{t("summary.savePdf")}</PrimaryButton>}
      />

      <Card className="summary-intro-card">
        <div>
          <IconCircle tone="teal">S</IconCircle>
          <h2>{t("summary.preview")}</h2>
          <p>{t("summary.description")}</p>
        </div>
        <IllustrationImage
          variant="section"
          src="/images/illustration-health-summary-doctor.png"
          alt="Doctor organizing health summary records"
        />
      </Card>

      <div className="health-summary-layout">
        <div className="health-summary-list">
          {items.map(([title, count, detail, tone]) => (
            <Card className="summary-dashboard-card" key={title}>
              <IconCircle tone={tone}>{t(title).charAt(0)}</IconCircle>
              <div>
                <div className="card-title-row">
                  <h2>{t(title)}</h2>
                  <StatusBadge tone={tone}>{count}</StatusBadge>
                </div>
                <p>{detail}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="health-summary-preview">
          <SummaryPreview
            generated={t("summary.generated")}
            ready={t("common.ready")}
            rows={[t("summary.preview"), t("summary.symptoms"), t("summary.timeline"), t("summary.redFlags"), t("summary.medications"), t("summary.questions")]}
          />
        </div>
      </div>

      <Card className="privacy-card">
        <IconCircle tone="primary">L</IconCircle>
        <div>
          <h2>{t("summary.privacyTitle")}</h2>
          <p>{t("summary.privacyText")}</p>
        </div>
      </Card>
    </section>
  );
}
