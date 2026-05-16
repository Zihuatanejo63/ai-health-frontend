"use client";

import {
  Card,
  IconCircle,
  InsuranceConceptCard,
  PageHeader,
  StatusBadge
} from "@/components/app-ui";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { useI18n } from "@/components/i18n-provider";
import { useSettings } from "@/components/settings-provider";
import { VisualCard } from "@/components/visual-card";

const concepts = [
  ["insurance.copay", "insurance.copayDesc", "warning"],
  ["insurance.deductible", "insurance.deductibleDesc", "primary"],
  ["insurance.outOfPocket", "insurance.outOfPocketDesc", "teal"],
  ["insurance.inNetwork", "insurance.inNetworkDesc", "success"],
  ["insurance.urgentVsEr", "insurance.urgentVsErDesc", "purple"],
  ["insurance.questions", "insurance.questionsDesc", "primary"]
] as const;

export default function InsuranceGuidePage() {
  const { t } = useI18n();
  const { settings } = useSettings();
  const insurance = settings.insuranceProfile;

  return (
    <section className="app-page">
      <PageHeader
        eyebrow={t("insurance.title")}
        title={t("insurance.title")}
        description={t("insurance.description")}
      />

      <div className="insurance-dashboard-grid">
        <Card className="insurance-hero-card">
          <div>
            <IconCircle tone="teal">I</IconCircle>
            <h2>{t("insurance.coverageClear")}</h2>
            <p>{t("insurance.coverageText")}</p>
          </div>
          <VisualCard src="/images/design-insurance-navigation.png" alt="Insurance navigation design reference" />
        </Card>

        <Card className="coverage-snapshot">
          <h2>{t("insurance.snapshot")}</h2>
          {[
            [t("insurance.planActive"), insurance.status],
            [t("insurance.networkBenefits"), insurance.inNetworkPreference],
            [t("insurance.urgentCopay"), insurance.copay],
            [t("insurance.deductibleRemaining"), insurance.deductible]
          ].map(([label, value]) => (
            <div className="snapshot-row" key={label}>
              <span>{label}</span>
              <StatusBadge tone={value === "Active" || value === "In-network" ? "success" : "primary"}>
                {value}
              </StatusBadge>
            </div>
          ))}
        </Card>
      </div>

      <div className="concept-grid">
        {concepts.map(([title, description, tone]) => (
          <InsuranceConceptCard key={title} title={t(title)} description={t(description)} tone={tone} />
        ))}
      </div>

      <DisclaimerBox text={t("safety.insurance")} />
    </section>
  );
}
