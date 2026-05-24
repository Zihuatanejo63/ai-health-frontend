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
import { insuranceGuides, countryList, type InsuranceGuide } from "@/lib/insurance-guides";

function GuideCard({ guide }: { guide: InsuranceGuide }) {
  const { t } = useI18n();

  return (
    <Card className="tool-section">
      <StatusBadge tone="primary">{guide.country}</StatusBadge>
      <h2 style={{ marginTop: 8 }}>{guide.publicSystem}</h2>

      {/* Who it helps */}
      <section style={{ marginTop: 16 }}>
        <h3>{t("insurance.guide.whoItHelps")}</h3>
        <div className="check-list">
          {guide.whoItHelps.map((item) => <span key={item}>• {item}</span>)}
        </div>
      </section>

      {/* Steps */}
      <section style={{ marginTop: 16 }}>
        <h3>{t("insurance.guide.steps")}</h3>
        <div className="check-list">
          {guide.steps.map((step, i) => <span key={i}>{i + 1}. {step}</span>)}
        </div>
      </section>

      {/* Official links */}
      <section style={{ marginTop: 16 }}>
        <h3>{t("insurance.guide.officialLinks")}</h3>
        <div className="button-pair" style={{ marginTop: 8 }}>
          {guide.officialLinks.map((link) => (
            <a
              className="btn-secondary"
              href={link.url}
              key={link.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>

      {/* Emergency */}
      <section style={{ marginTop: 16 }}>
        <h3>{t("insurance.guide.emergency")}</h3>
        <p className="help-text">{guide.emergency}</p>
      </section>

      {/* How HealthMatchAI helps */}
      <section style={{ marginTop: 16 }}>
        <h3>{t("insurance.guide.howWeHelpTitle")}</h3>
        <p>{guide.howWeHelp}</p>
        <div className="button-pair" style={{ marginTop: 8 }}>
          <PrimaryButton href="/symptom-check">{t("home.start")}</PrimaryButton>
          <SecondaryButton href="/result">{t("insurance.guide.viewReport")}</SecondaryButton>
        </div>
      </section>

      <p className="help-text" style={{ marginTop: 12 }}>{guide.disclaimer}</p>
    </Card>
  );
}

export default function InsuranceGuidePage() {
  const { t } = useI18n();
  const [selectedCountry, setSelectedCountry] = useState("");

  const guide = selectedCountry ? insuranceGuides[selectedCountry] : null;

  return (
    <section className="app-page">
      <PageHeader
        eyebrow={t("insurance.coverageEyebrow")}
        title={t("insurance.guide.title")}
        description={t("insurance.guide.description")}
      />

      {/* Compliance disclaimer */}
      <Card className="notice-card">
        <IconCircle tone="primary">i</IconCircle>
        <div>
          <p><strong>{t("insurance.complianceTitle")}</strong></p>
          <p>{t("insurance.complianceText")}</p>
        </div>
      </Card>

      {/* Result context banner */}
      <div style={{ marginTop: 16 }}>
        <Card className="notice-card">
          <IconCircle tone="teal">♢</IconCircle>
          <div>
            <p>{t("insurance.guide.resultContext")}</p>
          </div>
        </Card>
      </div>

      {/* Country selector */}
      <Card className="tool-section">
        <StatusBadge tone="primary">{t("insurance.guide.step1")}</StatusBadge>
        <h2>{t("insurance.guide.selectCountry")}</h2>
        <p className="help-text">{t("insurance.guide.selectCountryHelp")}</p>
        <div className="tag-grid concern-grid" style={{ marginTop: 12 }}>
          {countryList.map(({ code, name }) => (
            <button
              className={`choice-pill ${selectedCountry === code ? "selected" : ""}`}
              key={code}
              onClick={() => setSelectedCountry(code)}
              type="button"
            >
              {name}
            </button>
          ))}
        </div>
      </Card>

      {/* Country guide card */}
      {guide ? <GuideCard guide={guide} /> : (
        <Card className="tool-section">
          <p className="help-text">{t("insurance.guide.selectPrompt")}</p>
        </Card>
      )}

      {/* Do not delay care */}
      <Card className="notice-card red-flag-card">
        <IconCircle tone="danger">!</IconCircle>
        <p><strong>{t("insurance.doNotDelayTitle")}</strong> {t("insurance.doNotDelayText")}</p>
      </Card>
    </section>
  );
}
