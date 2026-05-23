"use client";

import { Card, IconCircle, PageHeader } from "@/components/app-ui";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { useI18n } from "@/components/i18n-provider";

const emergencySigns = [
  "emergency.sign.chestPain",
  "emergency.sign.troubleBreathing",
  "emergency.sign.stroke",
  "emergency.sign.severeBleeding",
  "emergency.sign.lossConsciousness",
  "emergency.sign.seizure",
  "emergency.sign.allergicReaction",
  "emergency.sign.selfHarm"
];

export default function EmergencyPage() {
  const { t } = useI18n();
  return (
    <section className="app-page">
      <PageHeader
        eyebrow={t("emergency.eyebrow")}
        title={t("emergency.title")}
        description={t("emergency.description")}
      />

      <Card className="crisis-card">
        <IconCircle tone="danger">!</IconCircle>
        <h2>{t("emergency.signsTitle")}</h2>
        <ul className="emergency-sign-grid grid gap-3 sm:grid-cols-2">
          {emergencySigns.map((sign) => (
            <li key={sign}>{t(sign)}</li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2>{t("emergency.helpFirst")}</h2>
        <p>
          {t("emergency.helpBody")}
        </p>
      </Card>
      <DisclaimerBox text={t("emergency.examples")} />
    </section>
  );
}
