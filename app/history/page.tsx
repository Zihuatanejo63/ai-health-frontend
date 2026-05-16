"use client";

import { useEffect, useState } from "react";
import { Card, HistoryItem, PageHeader, PrimaryButton, StatusBadge, type Tone } from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";
import { readSymptomChecks, type SavedSymptomCheck } from "@/lib/settings";

export default function HistoryPage() {
  const { t } = useI18n();
  const [checks, setChecks] = useState<SavedSymptomCheck[]>([]);

  useEffect(() => {
    setChecks(readSymptomChecks());
  }, []);

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
          {checks.map((check) => (
            <HistoryItem
              key={check.id}
              symptom={check.symptoms.slice(0, 3).join(" + ") || check.primarySymptom}
              risk={check.result.riskLevel}
              care={check.result.recommendedCare}
              date={new Date(check.createdAt).toLocaleString()}
              tone={(check.result.riskLevel === "Low" ? "success" : check.result.riskLevel === "Emergency" ? "danger" : "warning") as Tone}
              riskLabel={t("common.riskLevel")}
              careLabel={t("home.recommendedCare")}
            />
          ))}
        </div>
      ) : (
        <Card className="history-empty-card">
          <div className="empty-icon">◷</div>
          <h2>{t("history.emptyTitle")}</h2>
          <p>{t("history.emptyText")}</p>
          <p className="login-save-prompt">Create a free account to save your health history.</p>
          <PrimaryButton href="/symptom-check">{t("home.start")}</PrimaryButton>
        </Card>
      )}
    </section>
  );
}
