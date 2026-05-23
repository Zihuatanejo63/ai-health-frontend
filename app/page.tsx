"use client";

import { useEffect, useState } from "react";
import {
  Card,
  IconCircle,
  PageHeader,
  PrimaryButton,
  StatCard,
  StatusBadge
} from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";
import { useSettings } from "@/components/settings-provider";
import { IllustrationImage } from "@/components/visual-card";
import { careLevelKey, riskLevelKey, symptomItemKey } from "@/lib/i18n-display";
import { hasUsableInsuranceProfile, readSymptomChecks, type SavedSymptomCheck } from "@/lib/settings";

export default function HomePage() {
  const { t } = useI18n();
  const { settings } = useSettings();
  const [latestCheck, setLatestCheck] = useState<SavedSymptomCheck | null>(null);

  useEffect(() => {
    setLatestCheck(readSymptomChecks()[0] ?? null);
  }, []);

  function symptomTitle(check: SavedSymptomCheck) {
    const primary = check.primarySymptom || check.symptoms[0];
    const companions = check.symptoms.filter((item) => item !== primary).slice(0, 2);
    return [primary, ...companions].filter(Boolean).map((item) => t(symptomItemKey(item))).join(" + ");
  }

  const hasCheck = Boolean(latestCheck);
  const hasInsuranceProfile = hasUsableInsuranceProfile(settings.insuranceProfile);
  const stats = [
    {
      label: t("common.riskLevel"),
      value: hasCheck ? t(riskLevelKey(latestCheck!.result.riskLevel)) : t("home.notChecked"),
      detail: hasCheck ? t("home.riskDetail") : t("home.startCheckValue"),
      tone: hasCheck ? (latestCheck!.result.riskLevel === "Low" ? "success" : latestCheck!.result.riskLevel === "Emergency" ? "danger" : "warning") : "primary"
    },
    {
      label: t("home.recommendedCare"),
      value: hasCheck ? t(careLevelKey(latestCheck!.result.recommendedCare)) : t("home.startCheckValue"),
      detail: hasCheck ? t("home.recommendedDetail") : t("home.description"),
      tone: "primary"
    },
    {
      label: t("home.redFlags"),
      value: hasCheck ? t("home.checked") : t("home.notReviewed"),
      detail: hasCheck && latestCheck!.redFlags.length > 0 ? latestCheck!.redFlags.map((item) => t(symptomItemKey(item))).join(", ") : t("home.redFlagsDetail"),
      tone: hasCheck && latestCheck!.redFlags.length > 0 ? "warning" : "success"
    },
    {
      label: t("home.insuranceNote"),
      value: hasInsuranceProfile ? `${settings.insuranceProfile.status || t("common.saved")} · ${settings.insuranceProfile.planType || t("insurance.profile")}` : t("home.addInsuranceProfile"),
      detail: hasInsuranceProfile
        ? `${t("insurance.urgentCopay")}: ${settings.insuranceProfile.urgentCareCopay || settings.insuranceProfile.copay || t("common.notSelected")}`
        : t("home.insuranceDetail"),
      tone: "purple"
    },
    {
      label: t("home.doctorSummary"),
      value: hasCheck ? t("common.ready") : t("home.createAfterCheck"),
      detail: hasCheck ? t("home.summaryDetail") : t("home.startCheckValue"),
      tone: "teal"
    }
  ] as const;

  return (
    <section className="app-page dashboard-page">
      <PageHeader
        title={t("home.title")}
        description={t("home.description")}
        action={<span className="notification-dot">⌁</span>}
      />

      <Card className="symptom-command-card">
        <div className="command-input">
          <IconCircle>Q</IconCircle>
          <div>
            <h2>{t("home.symptomQuestion")}</h2>
            <input placeholder={t("home.placeholder")} />
          </div>
        </div>
        <PrimaryButton href="/symptom-check">{t("home.start")}</PrimaryButton>
      </Card>

      <div className="dashboard-quick-actions">
        <a className="btn-secondary" href={hasCheck ? "/health-records" : "/symptom-check"}>{t("home.viewSampleReport")}</a>
        <a className="btn-secondary" href="/care-options">{t("home.howItWorks")}</a>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card-grid">
          {stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} detail={stat.detail} tone={stat.tone} />
          ))}
          <Card className="recent-activity-card">
            <div>
              <IconCircle tone="primary">H</IconCircle>
              <StatusBadge tone="primary">{t("home.recentActivity")}</StatusBadge>
            </div>
            {latestCheck ? (
              <>
                <h2>{symptomTitle(latestCheck)}</h2>
                <p>{t(riskLevelKey(latestCheck.result.riskLevel))} · {t(careLevelKey(latestCheck.result.recommendedCare))}</p>
                <time>{new Date(latestCheck.createdAt).toLocaleString()}</time>
              </>
            ) : (
              <>
                <h2>{t("home.noRecentActivity")}</h2>
                <p>{t("home.createAccountPrompt")}</p>
                <PrimaryButton href="/symptom-check">{t("home.start")}</PrimaryButton>
              </>
            )}
          </Card>
        </div>

        <aside className="dashboard-visual">
          <IllustrationImage
            priority
            variant="hero"
            src="/images/hero-doctor-care.png"
            alt="Friendly doctor helping users understand care options"
          />
        </aside>
      </div>
    </section>
  );
}
