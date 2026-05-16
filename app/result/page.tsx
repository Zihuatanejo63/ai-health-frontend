"use client";

import {
  Card,
  IconCircle,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  StatCard,
  StatusBadge
} from "@/components/app-ui";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { useI18n } from "@/components/i18n-provider";
import { VisualCard } from "@/components/visual-card";

const redFlags = ["result.noChestPain", "result.noTroubleBreathing", "result.noConfusion", "result.noSevereDehydration"];
const causes = ["result.cold", "result.flu", "result.viral"];
const monitor = ["result.monitorFever", "result.monitorBreathing", "result.monitorHydration", "result.monitorEnergy", "result.monitorLong"];
const checklist = ["result.urgentCovered", "result.providerNetwork", "result.copayQuestion", "result.deductibleQuestion"];

export default function ResultPage() {
  const { t } = useI18n();

  return (
    <section className="app-page result-page">
      <PageHeader title={t("result.title")} description={t("result.reference")} />

      <div className="result-top-grid">
        <StatCard
          label={t("common.riskLevel")}
          value={t("common.moderate")}
          detail={t("result.riskDetail")}
          tone="warning"
        />
        <StatCard
          label={t("home.recommendedCare")}
          value={t("result.careValue")}
          detail={t("result.careDetail")}
          tone="primary"
        />
      </div>

      <div className="result-content-grid">
        <div className="result-column">
          <Card>
            <h2>{t("result.why")}</h2>
            <p>{t("result.whyText")}</p>
          </Card>

          <Card>
            <h2>{t("result.redFlagsChecked")}</h2>
            <div className="check-list">
              {redFlags.map((item) => (
                <span key={item}>✓ {t(item)}</span>
              ))}
            </div>
          </Card>

          <Card>
            <h2>{t("result.possibleCauses")}</h2>
            <p>{t("result.mayBe")}</p>
            <div className="chip-row">
              {causes.map((item) => (
                <StatusBadge key={item} tone="primary">{t(item)}</StatusBadge>
              ))}
            </div>
          </Card>

          <Card>
            <h2>{t("result.monitor")}</h2>
            <div className="chip-row">
              {monitor.map((item) => (
                <StatusBadge key={item} tone="teal">{t(item)}</StatusBadge>
              ))}
            </div>
          </Card>
        </div>

        <div className="result-column">
          <Card className="doctor-summary-card">
            <div className="card-title-row">
              <h2>{t("home.doctorSummary")}</h2>
              <IconCircle tone="teal">✓</IconCircle>
            </div>
            <div className="summary-mini-grid">
              <span>{t("result.symptoms")} <strong>5</strong></span>
              <span>{t("result.duration")} <strong>3 days</strong></span>
              <span>{t("result.checks")} <strong>{t("common.completed")}</strong></span>
              <span>{t("common.riskLevel")} <strong>{t("common.moderate")}</strong></span>
            </div>
            <PrimaryButton href="/payment-success">{t("result.download")}</PrimaryButton>
          </Card>

          <Card>
            <h2>{t("result.insuranceChecklist")}</h2>
            <div className="check-list">
              {checklist.map((item) => (
                <span key={item}>□ {t(item)}</span>
              ))}
            </div>
            <SecondaryButton href="/insurance-guide">{t("result.coverageOptions")}</SecondaryButton>
          </Card>

          <VisualCard src="/images/design-result.png" alt="Result page design reference" />
        </div>
      </div>

      <DisclaimerBox text={`${t("safety.medical")} ${t("safety.insurance")}`} />
    </section>
  );
}
