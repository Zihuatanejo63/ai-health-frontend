"use client";

import { useEffect, useState } from "react";
import { Card, IconCircle, PageHeader, PrimaryButton, StatusBadge, SummaryPreview } from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";
import { IllustrationImage } from "@/components/visual-card";
import { readSummaries, readSymptomChecks, writeSummaries, type SavedSummary } from "@/lib/settings";
import { readUser } from "@/lib/auth";

export default function HealthRecordsPage() {
  const { t } = useI18n();
  const [summaries, setSummaries] = useState<SavedSummary[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setSummaries(readSummaries());
  }, []);

  function saveLatestSummary() {
    const user = readUser();
    if (!user || user.isGuest) {
      setMessage("Create a free account to save your health history.");
      return;
    }
    const latest = readSymptomChecks()[0];
    if (!latest) {
      setMessage("Start a symptom check first.");
      return;
    }
    const next = {
      id: `summary_${Date.now()}`,
      createdAt: new Date().toISOString(),
      checkId: latest.id,
      title: `${latest.primarySymptom || "Symptom"} summary`,
      symptoms: latest.symptoms,
      riskLevel: latest.result.riskLevel,
      recommendedCare: latest.result.recommendedCare
    };
    const all = [next, ...readSummaries()];
    writeSummaries(all);
    setSummaries(all);
    setMessage("Summary saved.");
  }

  const latest = summaries[0];
  const items = [
    [t("summary.symptoms"), String(latest?.symptoms.length ?? 0), latest?.symptoms.join(", ") || "No saved symptoms yet", "primary"],
    [t("summary.timeline"), summaries.length ? "Saved" : "0", latest ? new Date(latest.createdAt).toLocaleDateString() : "No saved summaries", "teal"],
    [t("summary.redFlags"), latest?.riskLevel ?? "—", "From latest saved summary", "danger"],
    [t("summary.medications"), "—", "Use Settings to add medications", "teal"],
    [t("summary.questions"), "3", "Questions to ask at your visit", "primary"]
  ] as const;

  return (
    <section className="app-page">
      <PageHeader
        title={t("summary.title")}
        description={t("summary.description")}
        action={<button className="btn-primary" onClick={saveLatestSummary} type="button">{t("summary.savePdf")}</button>}
      />

      <Card className="summary-intro-card">
        <div>
          <IconCircle tone="teal">S</IconCircle>
          <h2>{t("summary.preview")}</h2>
          <p>{summaries.length ? `${summaries.length} saved summaries` : "No saved summaries yet."}</p>
          {message ? <p className="login-save-prompt">{message}</p> : null}
        </div>
        <IllustrationImage variant="section" src="/images/illustration-health-summary-doctor.png" alt="Doctor organizing health summary records" />
      </Card>

      <div className="health-summary-layout">
        <div className="health-summary-list">
          {items.map(([title, count, detail, tone]) => (
            <Card className="summary-dashboard-card" key={title}>
              <IconCircle tone={tone}>{title.charAt(0)}</IconCircle>
              <div>
                <div className="card-title-row">
                  <h2>{title}</h2>
                  <StatusBadge tone={tone}>{count}</StatusBadge>
                </div>
                <p>{detail}</p>
              </div>
            </Card>
          ))}
        </div>
        <div className="health-summary-preview">
          <SummaryPreview generated={t("summary.generated")} ready={t("common.ready")} rows={[t("summary.preview"), t("summary.symptoms"), t("summary.timeline"), t("summary.redFlags"), t("summary.medications"), t("summary.questions")]} />
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
