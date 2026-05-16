"use client";

import { useEffect } from "react";
import { Card, IconCircle, PageHeader, PrimaryButton, SecondaryButton } from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";
import { useSettings } from "@/components/settings-provider";

export default function PaymentSuccessPage() {
  const { t } = useI18n();
  const { updateSettings } = useSettings();

  useEffect(() => {
    updateSettings((current) => ({ ...current, subscription: { plan: "Premium" } }));
  }, [updateSettings]);

  return (
    <section className="app-page">
      <PageHeader
        eyebrow={t("payment.eyebrow")}
        title={t("payment.title")}
        description={t("payment.description")}
      />

      <div className="paid-tool-grid">
        <Card className="paid-tool-card">
          <IconCircle tone="primary">PDF</IconCircle>
          <h2>{t("payment.downloadPdf")}</h2>
          <p>{t("payment.summary")}</p>
          <PrimaryButton href="/result">{t("result.download")}</PrimaryButton>
        </Card>
        <Card className="paid-tool-card">
          <IconCircle tone="teal">I</IconCircle>
          <h2>{t("payment.viewChecklist")}</h2>
          <p>{t("payment.coverage")}</p>
          <SecondaryButton href="/insurance-guide">{t("payment.viewChecklist")}</SecondaryButton>
        </Card>
        <Card className="paid-tool-card">
          <IconCircle tone="success">T</IconCircle>
          <h2>{t("payment.saveTimeline")}</h2>
          <p>{t("payment.timelineText")}</p>
          <SecondaryButton href="/result">{t("payment.saveTimeline")}</SecondaryButton>
        </Card>
        <Card className="paid-tool-card">
          <IconCircle tone="purple">↩</IconCircle>
          <h2>{t("payment.backResult")}</h2>
          <p>{t("payment.return")}</p>
          <SecondaryButton href="/result">{t("payment.backResult")}</SecondaryButton>
        </Card>
      </div>
    </section>
  );
}
