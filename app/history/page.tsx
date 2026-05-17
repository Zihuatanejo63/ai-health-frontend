"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, IconCircle, PageHeader, PrimaryButton, StatusBadge, type Tone } from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";
import { ConfirmDialog } from "@/components/modal";
import { readSymptomChecks, writeSymptomChecks, type SavedSymptomCheck } from "@/lib/settings";
import { careLevelKey, riskLevelKey, symptomItemKey } from "@/lib/i18n-display";

const SESSION_RESULT_KEY = "ai-health-match-result";

export default function HistoryPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [checks, setChecks] = useState<SavedSymptomCheck[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    setChecks(readSymptomChecks());
  }, []);

  function symptomTitle(check: SavedSymptomCheck) {
    const primary = check.primarySymptom || check.symptoms[0];
    const companions = check.symptoms.filter((item) => item !== primary).slice(0, 2);
    return [primary, ...companions].filter(Boolean).map((item) => t(symptomItemKey(item))).join(" + ");
  }

  function viewResult(check: SavedSymptomCheck) {
    window.sessionStorage.setItem(SESSION_RESULT_KEY, JSON.stringify(check));
    router.push("/result");
  }

  function deleteCheck(id: string) {
    const next = readSymptomChecks().filter((item) => item.id !== id);
    writeSymptomChecks(next);
    setChecks(next);
    setDeleteId(null);
  }

  return (
    <section className="app-page history-page">
      <PageHeader title={t("history.title")} description={t("history.description")} />

      <div className="filter-chip-row">
        {["history.all", "history.recent", "history.saved", "history.flagged"].map((item, index) => (
          <StatusBadge key={item} tone={index === 0 ? "primary" : "teal"}>{t(item)}</StatusBadge>
        ))}
      </div>

      {checks.length > 0 ? (
        <div className="history-list">
          {checks.map((check) => {
            const tone = (check.result.riskLevel === "Low" ? "success" : check.result.riskLevel === "Emergency" ? "danger" : "warning") as Tone;
            return (
              <Card className="history-item history-item-with-actions" key={check.id}>
                <IconCircle tone={tone}>{symptomTitle(check).charAt(0)}</IconCircle>
                <div>
                  <h2>{symptomTitle(check)}</h2>
                  <div className="history-meta">
                    <span>{t("common.riskLevel")}</span>
                    <strong>{t(riskLevelKey(check.result.riskLevel))}</strong>
                    <span>{t("home.recommendedCare")}</span>
                    <strong>{t(careLevelKey(check.result.recommendedCare))}</strong>
                  </div>
                </div>
                <time>{new Date(check.createdAt).toLocaleString()}</time>
                <div className="history-actions">
                  <button className="btn-secondary" onClick={() => viewResult(check)} type="button">{t("history.viewResult")}</button>
                  <button className="btn-danger" onClick={() => setDeleteId(check.id)} type="button">{t("common.delete")}</button>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="history-empty-card">
          <div className="empty-icon">◷</div>
          <h2>{t("history.emptyTitle")}</h2>
          <p>{t("history.emptyText")}</p>
          <p className="login-save-prompt">{t("home.createAccountPrompt")}</p>
          <PrimaryButton href="/symptom-check">{t("home.start")}</PrimaryButton>
        </Card>
      )}
      {deleteId ? (
        <ConfirmDialog
          title={t("history.deleteTitle")}
          body={t("history.deleteBody")}
          confirmLabel={t("common.delete")}
          cancelLabel={t("common.cancel")}
          onCancel={() => setDeleteId(null)}
          onConfirm={() => deleteCheck(deleteId)}
        />
      ) : null}
    </section>
  );
}
