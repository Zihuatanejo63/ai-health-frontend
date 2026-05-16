"use client";

import { useEffect, useState } from "react";
import { HistoryItem, PageHeader, PrimaryButton, StatusBadge, type Tone } from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";
import { defaultHistory, readHistory, type SymptomHistoryItem } from "@/lib/settings";

export default function HistoryPage() {
  const { t } = useI18n();
  const [history, setHistory] = useState<SymptomHistoryItem[]>(defaultHistory);

  useEffect(() => {
    setHistory(readHistory());
  }, []);

  return (
    <section className="app-page history-page">
      <PageHeader title={t("history.title")} description={t("history.description")} />

      <div className="filter-chip-row">
        {["history.all", "history.recent", "history.saved", "history.flagged"].map((item, index) => (
          <StatusBadge key={item} tone={index === 0 ? "primary" : "teal"}>
            {t(item)}
          </StatusBadge>
        ))}
      </div>

      <div className="history-list">
        {history.map(({ symptom, risk, care, date, tone }) => (
          <HistoryItem
            key={`${symptom}-${date}`}
            symptom={symptom}
            risk={risk}
            care={care}
            date={date}
            tone={(tone ?? "warning") as Tone}
            riskLabel={t("common.riskLevel")}
            careLabel={t("home.recommendedCare")}
          />
        ))}
      </div>

      <section className="panel history-empty-card">
        <div className="empty-icon">◷</div>
        <h2>{t("history.emptyTitle")}</h2>
        <p>{t("history.emptyText")}</p>
        <PrimaryButton href="/symptom-check">{t("home.start")}</PrimaryButton>
      </section>
    </section>
  );
}
