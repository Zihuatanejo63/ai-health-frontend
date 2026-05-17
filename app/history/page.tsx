"use client";

import { useEffect, useState } from "react";
import { Card, HistoryItem, PageHeader, PrimaryButton, StatusBadge, type Tone } from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";
import { readSymptomChecks, type SavedSymptomCheck } from "@/lib/settings";
import { careLevelKey, riskLevelKey, symptomItemKey } from "@/lib/i18n-display";

export default function HistoryPage() {
  const { t } = useI18n();
  const [checks, setChecks] = useState<SavedSymptomCheck[]>([]);

  useEffect(() => {
    setChecks(readSymptomChecks());
  }, []);

  function symptomTitle(check: SavedSymptomCheck) {
    const primary = check.primarySymptom || check.symptoms[0];
    const companions = check.symptoms.filter((item) => item !== primary).slice(0, 2);
    return [primary, ...companions].filter(Boolean).map((item) => t(symptomItemKey(item))).join(" + ");
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
          {checks.map((check) => (
            <HistoryItem
              key={check.id}
              symptom={symptomTitle(check)}
              risk={t(riskLevelKey(check.result.riskLevel))}
              care={t(careLevelKey(check.result.recommendedCare))}
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
          <p className="login-save-prompt">{t("home.createAccountPrompt")}</p>
          <PrimaryButton href="/symptom-check">{t("home.start")}</PrimaryButton>
        </Card>
      )}
    </section>
  );
}
