"use client";

import { useState } from "react";
import {
  Card,
  IconCircle,
  InsuranceConceptCard,
  PageHeader,
  PrimaryButton,
  StatusBadge
} from "@/components/app-ui";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { useI18n } from "@/components/i18n-provider";
import { useSettings } from "@/components/settings-provider";
import { IllustrationImage } from "@/components/visual-card";

const concepts = [
  ["insurance.copay", "insurance.copayDesc", "warning"],
  ["insurance.deductible", "insurance.deductibleDesc", "primary"],
  ["insurance.outOfPocket", "insurance.outOfPocketDesc", "teal"],
  ["insurance.inNetwork", "insurance.inNetworkDesc", "success"],
  ["insurance.urgentVsEr", "insurance.urgentVsErDesc", "purple"],
  ["insurance.questions", "insurance.questionsDesc", "primary"]
] as const;

const checklistKeys = [
  "insurance.checklist.urgentCovered",
  "insurance.checklist.providerNetwork",
  "insurance.checklist.copay",
  "insurance.checklist.deductible",
  "insurance.checklist.telehealth",
  "insurance.checklist.priorAuth"
];

const careSettingTips = [
  ["insurance.tip.emergency.title", "insurance.tip.emergency.body", "danger"],
  ["insurance.tip.urgent.title", "insurance.tip.urgent.body", "warning"],
  ["insurance.tip.primary.title", "insurance.tip.primary.body", "primary"],
  ["insurance.tip.telehealth.title", "insurance.tip.telehealth.body", "teal"]
] as const;

export default function InsuranceGuidePage() {
  const { t } = useI18n();
  const { settings } = useSettings();
  const insurance = settings.insuranceProfile;
  const [checklistVisible, setChecklistVisible] = useState(false);
  const [message, setMessage] = useState("");
  const hasInsuranceProfile = Boolean(
    insurance.status ||
      insurance.planType ||
      insurance.urgentCareCopay ||
      insurance.primaryCareCopay ||
      insurance.copay ||
      insurance.deductible ||
      insurance.inNetworkPreference
  );

  function checklistPayload() {
    return {
      createdAt: new Date().toISOString(),
      questions: checklistKeys.map((key) => t(key)),
      insuranceProfile: insurance
    };
  }

  function saveChecklist() {
    window.localStorage.setItem("healthmatchai_insurance_checklist", JSON.stringify(checklistPayload()));
    setMessage(t("insurance.checklistSaved"));
  }

  async function copyQuestions() {
    await navigator.clipboard?.writeText(checklistKeys.map((key) => `- ${t(key)}`).join("\n"));
    setMessage(t("insurance.questionsCopied"));
  }

  function exportChecklist() {
    const blob = new Blob([JSON.stringify(checklistPayload(), null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "healthmatchai-insurance-checklist.json";
    link.click();
    URL.revokeObjectURL(url);
    setMessage(t("insurance.checklistExported"));
  }

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
            <div className="intro-copy-actions">
              <button className="btn-primary" onClick={() => setChecklistVisible(true)} type="button">{t("insurance.createChecklist")}</button>
            </div>
          </div>
          <IllustrationImage variant="section" src="/images/illustration-insurance-doctor.png" alt="Medical insurance guidance illustration" />
        </Card>

        <Card className="coverage-snapshot">
          <h2>{t("insurance.snapshot")}</h2>
          {!hasInsuranceProfile ? (
            <div className="snapshot-empty">
              <p>{t("insurance.addProfile")}</p>
              <PrimaryButton href="/settings">{t("insurance.addProfile")}</PrimaryButton>
            </div>
          ) : [
            [t("insurance.planActive"), insurance.status || t("common.notSelected")],
            [t("settings.planType"), insurance.planType || t("common.notSelected")],
            [t("insurance.networkBenefits"), insurance.inNetworkPreference || t("common.notSelected")],
            [t("insurance.urgentCopay"), insurance.urgentCareCopay || insurance.copay || t("common.notSelected")],
            [t("insurance.primaryCopay"), insurance.primaryCareCopay || t("common.notSelected")],
            [t("insurance.deductibleRemaining"), insurance.deductible || t("common.notSelected")]
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

      {checklistVisible ? (
        <Card className="insurance-checklist-builder">
          <div className="card-title-row">
            <h2>{t("insurance.beforeCareAsk")}</h2>
            {message ? <StatusBadge tone="success">{message}</StatusBadge> : null}
          </div>
          <div className="check-list">
            {checklistKeys.map((key) => <span key={key}>□ {t(key)}</span>)}
          </div>
          <div className="button-pair">
            <button className="btn-primary" onClick={saveChecklist} type="button">{t("insurance.saveChecklist")}</button>
            <button className="btn-secondary" onClick={copyQuestions} type="button">{t("insurance.copyQuestions")}</button>
            <button className="btn-secondary" onClick={exportChecklist} type="button">{t("insurance.exportChecklist")}</button>
          </div>
        </Card>
      ) : null}

      <div className="concept-grid">
        {careSettingTips.map(([title, description, tone]) => (
          <InsuranceConceptCard key={title} title={t(title)} description={t(description)} tone={tone} />
        ))}
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
