"use client";

import { useEffect, useState } from "react";
import { Card, IconCircle, PageHeader, PrimaryButton, StatusBadge } from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";
import { IllustrationImage } from "@/components/visual-card";
import { readSummaries, readSymptomChecks, writeSummaries, type SavedSummary, type SavedSymptomCheck } from "@/lib/settings";
import { readUser } from "@/lib/auth";
import { careLevelKey, riskLevelKey, symptomItemKey } from "@/lib/i18n-display";

export default function HealthRecordsPage() {
  const { t } = useI18n();
  const [summaries, setSummaries] = useState<SavedSummary[]>([]);
  const [latestCheck, setLatestCheck] = useState<SavedSymptomCheck | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setSummaries(readSummaries());
    setLatestCheck(readSymptomChecks()[0] ?? null);
  }, []);

  function saveLatestSummary() {
    const user = readUser();
    if (!user || user.isGuest) {
      setMessage(t("home.createAccountPrompt"));
      return;
    }
    if (!latestCheck) {
      setMessage(t("summary.startFirst"));
      return;
    }
    const next = {
      id: `summary_${Date.now()}`,
      createdAt: new Date().toISOString(),
      checkId: latestCheck.id,
      title: `${latestCheck.primarySymptom || "Symptom"} summary`,
      symptoms: latestCheck.symptoms,
      riskLevel: latestCheck.result.riskLevel,
      recommendedCare: latestCheck.result.recommendedCare
    };
    const all = [next, ...readSummaries()];
    writeSummaries(all);
    setSummaries(all);
    setMessage(t("summary.savedMessage"));
  }

  const latest = summaries[0];
  const sourceSymptoms = latest?.symptoms ?? latestCheck?.symptoms ?? [];
  const sourceRisk = latest?.riskLevel ?? latestCheck?.result.riskLevel;
  const sourceCare = latest?.recommendedCare ?? latestCheck?.result.recommendedCare;
  const sourceDate = latest?.createdAt ?? latestCheck?.createdAt;
  const items = [
    [t("summary.symptoms"), String(sourceSymptoms.length), sourceSymptoms.map((item) => t(symptomItemKey(item))).join(", ") || t("summary.noSavedSymptoms"), "primary"],
    [t("summary.timeline"), sourceDate ? t("common.ready") : "0", sourceDate ? new Date(sourceDate).toLocaleDateString() : t("summary.noSavedSummaries"), "teal"],
    [t("summary.redFlags"), sourceRisk ? t(riskLevelKey(sourceRisk)) : "—", latestCheck?.redFlags.length ? latestCheck.redFlags.map((item) => t(symptomItemKey(item))).join(", ") : t("summary.fromLatest"), "danger"],
    [t("summary.medications"), "—", t("summary.addMedications"), "teal"],
    [t("summary.questions"), "3", t("summary.questionsVisit"), "primary"]
  ] as const;

  return (
    <section className="app-page">
      <PageHeader
        title={t("summary.title")}
        description={t("summary.description")}
        action={<div className="button-pair"><button className="btn-secondary" type="button">{t("summary.savePdf")}</button><button className="btn-primary" onClick={saveLatestSummary} type="button">{t("common.saveSummary")}</button></div>}
      />

      <Card className="summary-intro-card">
        <div>
          <IconCircle tone="teal">S</IconCircle>
          <h2>{t("summary.preview")}</h2>
          <p>{summaries.length ? t("summary.savedSummaries").replace("{count}", String(summaries.length)) : latestCheck ? t("summary.fromLatest") : t("summary.noSavedSummaries")}</p>
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
          <Card className="summary-preview-card">
            <div className="summary-preview-brand">HealthMatchAI</div>
            <p>{sourceDate ? new Date(sourceDate).toLocaleString() : t("summary.noSavedSummaries")}</p>
            <div className="summary-preview-row"><strong>{t("summary.symptoms")}</strong><span>{sourceSymptoms.map((item) => t(symptomItemKey(item))).join(", ") || "—"}</span></div>
            <div className="summary-preview-row"><strong>{t("common.riskLevel")}</strong><span>{sourceRisk ? t(riskLevelKey(sourceRisk)) : "—"}</span></div>
            <div className="summary-preview-row"><strong>{t("home.recommendedCare")}</strong><span>{sourceCare ? t(careLevelKey(sourceCare)) : "—"}</span></div>
            <div className="summary-preview-row"><strong>{t("summary.questions")}</strong><span>{t("summary.questionsVisit")}</span></div>
          </Card>
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
