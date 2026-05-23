"use client";

import { Card, PageHeader, SecondaryButton } from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";

export default function PaymentCancelledPage() {
  const { t } = useI18n();

  return (
    <section className="app-page">
      <PageHeader
        eyebrow={t("payment.eyebrow")}
        title={t("payment.cancelledTitle")}
        description={t("payment.cancelledDescription")}
      />
      <Card className="paid-tool-card">
        <SecondaryButton href="/pricing">{t("payment.backPricing")}</SecondaryButton>
      </Card>
    </section>
  );
}
