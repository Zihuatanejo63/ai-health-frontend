"use client";

import { useState } from "react";
import {
  Card,
  IconCircle,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  StatusBadge
} from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";

const countries = [
  "United States", "Canada", "United Kingdom", "Australia",
  "Japan", "European Union", "China", "Other"
] as const;

const coverageScenarios = [
  { key: "emergency", labelKey: "insurance.scenario.emergency" },
  { key: "hospitalization", labelKey: "insurance.scenario.hospitalization" },
  { key: "doctorVisits", labelKey: "insurance.scenario.doctorVisits" },
  { key: "urgentCare", labelKey: "insurance.scenario.urgentCare" },
  { key: "prescriptions", labelKey: "insurance.scenario.prescriptions" },
  { key: "labImaging", labelKey: "insurance.scenario.labImaging" },
  { key: "mentalHealth", labelKey: "insurance.scenario.mentalHealth" },
  { key: "maternity", labelKey: "insurance.scenario.maternity" },
  { key: "chronicCare", labelKey: "insurance.scenario.chronicCare" },
  { key: "travelMedical", labelKey: "insurance.scenario.travelMedical" }
] as const;

export default function InsuranceGuidePage() {
  const { t } = useI18n();
  const [country, setCountry] = useState("");
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);

  function toggleScenario(key: string) {
    setSelectedScenarios((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  const hasSelection = selectedScenarios.length > 0;

  return (
    <section className="app-page">
      <PageHeader
        eyebrow={t("insurance.coverageEyebrow")}
        title={t("insurance.title")}
        description={t("insurance.description")}
      />

      {/* Compliance disclaimer */}
      <Card className="notice-card">
        <IconCircle tone="primary">i</IconCircle>
        <div>
          <p><strong>{t("insurance.complianceTitle")}</strong></p>
          <p>{t("insurance.complianceText")}</p>
        </div>
      </Card>

      {/* Step 1: Country / Region */}
      <Card className="tool-section">
        <StatusBadge tone="primary">{t("insurance.step1")}</StatusBadge>
        <h2>{t("insurance.step1CountryTitle")}</h2>
        <div className="tag-grid concern-grid" style={{ marginTop: 12 }}>
          {countries.map((c) => (
            <button
              className={`choice-pill ${country === c ? "selected" : ""}`}
              key={c}
              onClick={() => setCountry(c)}
              type="button"
            >
              {c}
            </button>
          ))}
        </div>
      </Card>

      {/* Step 2: What do you want coverage to protect? */}
      <Card className="tool-section">
        <StatusBadge tone="teal">{t("insurance.step2")}</StatusBadge>
        <h2>{t("insurance.step2Title")}</h2>
        <p className="help-text">{t("insurance.step2Help")}</p>
        <div className="tag-grid concern-grid" style={{ marginTop: 12 }}>
          {coverageScenarios.map((scenario) => (
            <button
              className={`choice-pill ${selectedScenarios.includes(scenario.key) ? "selected" : ""}`}
              key={scenario.key}
              onClick={() => toggleScenario(scenario.key)}
              type="button"
            >
              {t(scenario.labelKey)}
            </button>
          ))}
        </div>
      </Card>

      {/* Step 3: Coverage needs summary */}
      <Card className="tool-section">
        <StatusBadge tone="success">{t("insurance.step3")}</StatusBadge>
        <h2>{t("insurance.step3Title")}</h2>
        {hasSelection ? (
          <>
            <p>{t("insurance.coverageNeedsIntro")}</p>
            <div className="check-list" style={{ marginTop: 8 }}>
              {selectedScenarios.map((key) => {
                const scenario = coverageScenarios.find((s) => s.key === key);
                return scenario ? <span key={key}>• {t(scenario.labelKey)}</span> : null;
              })}
            </div>
          </>
        ) : (
          <p className="help-text">{t("insurance.selectScenariosPrompt")}</p>
        )}
      </Card>

      {/* Step 4: Next step */}
      <Card className="tool-section cta-panel">
        <StatusBadge tone="primary">{t("insurance.step4")}</StatusBadge>
        <h2>{t("insurance.step4Title")}</h2>
        <div className="button-pair" style={{ marginTop: 16 }}>
          <button className="btn-secondary" disabled type="button">
            {t("insurance.talkToLicensedPartner")}
          </button>
          <a className="btn-primary" href="https://www.healthcare.gov" target="_blank" rel="noopener noreferrer">
            {t("insurance.goToMarketplace")}
          </a>
          <SecondaryButton href="#questions">
            {t("insurance.prepareQuestions")}
          </SecondaryButton>
        </div>
        <p className="help-text" style={{ marginTop: 12 }}>
          {t("insurance.licensedPartnerComingSoon")}
        </p>
      </Card>

      {/* Prepare questions — collapsed */}
      <div id="questions" className="scroll-anchor">
        <Card className="tool-section">
        <details>
          <summary>{t("insurance.prepareQuestions")}</summary>
          <p style={{ marginTop: 8 }}>{t("insurance.alreadyInsuredDesc")}</p>
          <div className="check-list" style={{ marginTop: 8 }}>
            {hasSelection ? selectedScenarios.map((key) => {
              const scenario = coverageScenarios.find((s) => s.key === key);
              return scenario ? <span key={key}>□ {t(`insurance.question.${scenario.key}`)}</span> : null;
            }) : <p className="help-text">{t("insurance.selectScenariosFirst")}</p>}
          </div>
        </details>
        </Card>
      </div>

      {/* Insurance terms — collapsed, optional */}
      <Card className="tool-section">
        <details>
          <summary>{t("insurance.termsOptional")}</summary>
          <p className="help-text" style={{ marginTop: 8 }}>{t("insurance.termsCollapsed")}</p>
        </details>
      </Card>

      {/* Do not delay care */}
      <Card className="notice-card red-flag-card">
        <IconCircle tone="danger">!</IconCircle>
        <p><strong>{t("insurance.doNotDelayTitle")}</strong> {t("insurance.doNotDelayText")}</p>
      </Card>
    </section>
  );
}
