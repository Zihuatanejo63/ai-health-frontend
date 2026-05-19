"use client";

import { useEffect, useState } from "react";
import { Card, PageHeader, PrimaryButton, SecondaryButton, StatusBadge } from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";

function planMessageKey(plan: string) {
  if (plan === "plus_monthly" || plan === "plus_yearly") return "payment.plusReady";
  if (plan === "one_time_report") return "payment.reportReady";
  return "payment.pending";
}

export default function PaymentSuccessPage() {
  const { t } = useI18n();
  const [plan, setPlan] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPlan(params.get("plan") || "");
  }, []);

  return (
    <section className="app-page">
      <PageHeader
        eyebrow={t("payment.eyebrow")}
        title={t("payment.receivedTitle")}
        description={t("payment.creemDescription")}
      />

      <Card className="paid-tool-card">
        <StatusBadge tone="primary">{t("payment.creemBadge")}</StatusBadge>
        <h2>{t(planMessageKey(plan))}</h2>
        <p>{t("payment.verificationNote")}</p>
      </Card>

      <div className="paid-tool-grid">
        <Card className="paid-tool-card">
          <h2>{t("nav.healthSummary")}</h2>
          <p>{t("payment.recordsText")}</p>
          <PrimaryButton href="/health-records">{t("payment.goHealthRecords")}</PrimaryButton>
        </Card>
        <Card className="paid-tool-card">
          <h2>{t("common.startSymptomCheck")}</h2>
          <p>{t("payment.symptomText")}</p>
          <SecondaryButton href="/symptom-check">{t("common.startSymptomCheck")}</SecondaryButton>
        </Card>
        <Card className="paid-tool-card">
          <h2>{t("nav.home")}</h2>
          <p>{t("payment.dashboardText")}</p>
          <SecondaryButton href="/">{t("payment.backDashboard")}</SecondaryButton>
        </Card>
      </div>
    </section>
  );
}
