"use client";

import { useEffect, useState } from "react";
import { Card, IconCircle, PageHeader, PrimaryButton, StatusBadge } from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";
import { ConfirmDialog } from "@/components/modal";
import { IllustrationImage } from "@/components/visual-card";
import { readSummaries, readSymptomChecks, writeSummaries, type SavedSummary, type SavedSymptomCheck } from "@/lib/settings";
import { readUser } from "@/lib/auth";
import { careLevelKey, riskLevelKey, symptomItemKey, triageTextKey } from "@/lib/i18n-display";

export default function HealthRecordsPage() {
  const { t } = useI18n();
  const [summaries, setSummaries] = useState<SavedSummary[]>([]);
  const [latestCheck, setLatestCheck] = useState<SavedSymptomCheck | null>(null);
  const [message, setMessage] = useState("");
  const [selectedSummaryId, setSelectedSummaryId] = useState("");
  const [deleteSummaryId, setDeleteSummaryId] = useState<string | null>(null);

  useEffect(() => {
    setSummaries(readSummaries());
    setLatestCheck(readSymptomChecks()[0] ?? null);
  }, []);

  function saveLatestSummary() {
    const user = readUser();
    if (!latestCheck) {
      setMessage(t("summary.startFirst"));
      return;
    }
    const existing = readSummaries();
    if (existing.some((summary) => summary.checkId === latestCheck.id)) {
      setSummaries(existing);
      setSelectedSummaryId(existing.find((summary) => summary.checkId === latestCheck.id)?.id ?? "");
      setMessage(t("summary.alreadySaved"));
      return;
    }
    const next = {
      id: `summary_${Date.now()}`,
      createdAt: new Date().toISOString(),
      checkId: latestCheck.id,
      title: `${latestCheck.primarySymptom || "Symptom"} summary`,
      symptoms: latestCheck.symptoms,
      riskLevel: latestCheck.result.riskLevel,
      recommendedCare: latestCheck.result.recommendedCare,
      carePlanTitleKey: latestCheck.result.carePlan?.titleKey,
      carePlanSummaryKey: latestCheck.result.carePlan?.summaryKey,
      questionsToAsk: latestCheck.result.doctorReadySummary?.questionsToAsk ?? []
    };
    const all = [next, ...existing];
    writeSummaries(all);
    setSummaries(all);
    setSelectedSummaryId(next.id);
    setMessage(!user || user.isGuest ? t("home.createAccountPrompt") : t("summary.savedMessage"));
  }

  function deleteSummary(id: string) {
    const next = readSummaries().filter((summary) => summary.id !== id);
    writeSummaries(next);
    setSummaries(next);
    setSelectedSummaryId(next[0]?.id ?? "");
    setDeleteSummaryId(null);
    setMessage(t("summary.deleted"));
  }

  function exportSummary(summary: SavedSummary) {
    const blob = new Blob([JSON.stringify(summary, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `healthmatchai-summary-${summary.id}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setMessage(t("summary.exported"));
  }

  const selectedSummary = summaries.find((summary) => summary.id === selectedSummaryId) ?? summaries[0];
  const sourceSymptoms = selectedSummary?.symptoms ?? [];
  const sourceRisk = selectedSummary?.riskLevel;
  const sourceCare = selectedSummary?.recommendedCare;
  const sourceDate = selectedSummary?.createdAt;
  const hasSource = Boolean(selectedSummary);
  const sourceCheck = selectedSummary ? readSymptomChecks().find((check) => check.id === selectedSummary.checkId) : null;
  const questions = selectedSummary?.questionsToAsk ?? sourceCheck?.result.doctorReadySummary?.questionsToAsk ?? [];
  const items = [
    [t("summary.symptoms"), String(sourceSymptoms.length), sourceSymptoms.map((item) => t(symptomItemKey(item))).join(", ") || t("summary.noSavedSymptoms"), "primary"],
    [t("common.riskLevel"), sourceRisk ? t(riskLevelKey(sourceRisk)) : "—", sourceDate ? new Date(sourceDate).toLocaleDateString() : t("summary.noSavedSummaries"), "teal"],
    [t("home.recommendedCare"), sourceCare ? t(careLevelKey(sourceCare)) : "—", selectedSummary?.carePlanTitleKey ? t(selectedSummary.carePlanTitleKey) : t("summary.noCarePlan"), "primary"],
    [t("result.carePlan"), selectedSummary?.carePlanTitleKey ? t(selectedSummary.carePlanTitleKey) : "—", selectedSummary?.carePlanSummaryKey ? t(selectedSummary.carePlanSummaryKey) : t("summary.noCarePlan"), "success"],
    [t("summary.questions"), String(questions.length), questions.length ? questions.map((item) => t(triageTextKey(item))).join(" · ") : t("summary.questionsVisit"), "primary"]
  ] as const;

  return (
    <section className="app-page">
      <PageHeader
        title={t("summary.title")}
        description={t("summary.description")}
        action={<div className="button-pair"><button className="btn-secondary" type="button">{t("summary.savePdf")}</button><button className="btn-primary" onClick={saveLatestSummary} type="button">{t("common.saveSummary")}</button></div>}
      />

      {!hasSource ? (
        <Card className="history-empty-card">
          <div className="empty-icon">S</div>
          <h2>{t("summary.noSavedSummaries")}</h2>
          <p>{t("summary.startFirst")}</p>
          {message ? <p className="login-save-prompt">{message}</p> : null}
          <PrimaryButton href="/symptom-check">{t("home.start")}</PrimaryButton>
        </Card>
      ) : (
        <>
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
          {summaries.length > 0 ? (
            <Card className="summary-dashboard-card">
              <div className="card-title-row">
                <h2>{t("summary.savedSummaries").replace("{count}", String(summaries.length))}</h2>
              </div>
              <div className="summary-record-list">
                {summaries.map((summary) => (
                  <div className="summary-record-row" key={summary.id}>
                    <button className="summary-record-main" onClick={() => setSelectedSummaryId(summary.id)} type="button">
                      <strong>{summary.symptoms.map((item) => t(symptomItemKey(item))).slice(0, 2).join(" + ")}</strong>
                      <span>{new Date(summary.createdAt).toLocaleString()}</span>
                    </button>
                    <button className="btn-secondary" onClick={() => setSelectedSummaryId(summary.id)} type="button">{t("common.viewDetails")}</button>
                    <button className="btn-secondary" onClick={() => exportSummary(summary)} type="button">{t("summary.exportJson")}</button>
                    <button className="btn-danger" onClick={() => setDeleteSummaryId(summary.id)} type="button">{t("common.delete")}</button>
                  </div>
                ))}
              </div>
            </Card>
          ) : null}
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
            <div className="summary-preview-row"><strong>{t("result.carePlan")}</strong><span>{selectedSummary?.carePlanSummaryKey ? t(selectedSummary.carePlanSummaryKey) : "—"}</span></div>
            <div className="summary-preview-row"><strong>{t("summary.questions")}</strong><span>{questions.length ? questions.map((item) => t(triageTextKey(item))).join(" · ") : t("summary.questionsVisit")}</span></div>
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
        </>
      )}
      {deleteSummaryId ? (
        <ConfirmDialog
          title={t("summary.deleteTitle")}
          body={t("summary.deleteBody")}
          confirmLabel={t("common.delete")}
          cancelLabel={t("common.cancel")}
          onCancel={() => setDeleteSummaryId(null)}
          onConfirm={() => deleteSummary(deleteSummaryId)}
        />
      ) : null}
    </section>
  );
}
