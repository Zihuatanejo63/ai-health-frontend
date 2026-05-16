"use client";

import { useEffect, useState } from "react";
import { Card, IconCircle, PageHeader, PrimaryButton, SecondaryButton, StatCard, StatusBadge } from "@/components/app-ui";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { useI18n } from "@/components/i18n-provider";
import { IllustrationImage } from "@/components/visual-card";
import { readSymptomChecks, readSummaries, writeSummaries, type SavedSymptomCheck } from "@/lib/settings";
import { readUser } from "@/lib/auth";

const SESSION_RESULT_KEY = "ai-health-match-result";
const checklist = ["result.urgentCovered", "result.providerNetwork", "result.copayQuestion", "result.deductibleQuestion"];

function demoCheck(): SavedSymptomCheck {
  return {
    id: "demo",
    createdAt: new Date().toISOString(),
    symptoms: ["Fever", "Cough", "Fatigue"],
    primarySymptom: "Fever",
    duration: "1–3 days",
    severity: "Moderate",
    redFlags: [],
    healthBackground: {},
    result: {
      riskLevel: "Moderate",
      recommendedCare: "Primary Care",
      possibleCauses: ["Common cold", "Flu-like illness", "Viral respiratory infection"],
      whatToMonitor: ["Fever", "Breathing", "Hydration", "Energy"],
      why: "Your answers do not include emergency warning signs, but follow-up may help if symptoms persist."
    }
  };
}

export default function ResultPage() {
  const { t } = useI18n();
  const [check, setCheck] = useState<SavedSymptomCheck>(demoCheck());
  const [saved, setSaved] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState(false);

  useEffect(() => {
    const session = window.sessionStorage.getItem(SESSION_RESULT_KEY);
    if (session) {
      setCheck(JSON.parse(session));
      return;
    }
    const checks = readSymptomChecks();
    if (checks[0]) setCheck(checks[0]);
  }, []);

  function saveSummary() {
    const user = readUser();
    if (!user || user.isGuest) {
      setLoginPrompt(true);
      return;
    }
    writeSummaries([
      {
        id: `summary_${Date.now()}`,
        createdAt: new Date().toISOString(),
        checkId: check.id,
        title: `${check.primarySymptom || "Symptom"} summary`,
        symptoms: check.symptoms,
        riskLevel: check.result.riskLevel,
        recommendedCare: check.result.recommendedCare
      },
      ...readSummaries()
    ]);
    setSaved(true);
  }

  if (check.result.isCrisis) {
    return (
      <section className="app-page result-page">
        <PageHeader title="Crisis safety support" description="This response should not wait for a routine result page." />
        <Card className="crisis-card">
          <h2>Get immediate support</h2>
          <p>
            If you may hurt yourself or someone else, contact local emergency services now or reach a crisis hotline in your country.
            If you are in the U.S. or Canada, call or text 988.
          </p>
          <SecondaryButton href="/symptom-check">Review symptom check</SecondaryButton>
        </Card>
        <DisclaimerBox text={t("safety.medical")} />
      </section>
    );
  }

  return (
    <section className="app-page result-page">
      <PageHeader title={t("result.title")} description={`Reference ${check.id}`} />

      <div className="result-top-grid">
        <StatCard label={t("common.riskLevel")} value={check.result.riskLevel} detail={check.result.why ?? t("result.riskDetail")} tone={check.result.riskLevel === "Low" ? "success" : check.result.riskLevel === "Emergency" ? "danger" : "warning"} />
        <StatCard label={t("home.recommendedCare")} value={check.result.recommendedCare} detail={`Primary symptom: ${check.primarySymptom || "Not selected"}`} tone="primary" />
      </div>

      <div className="result-content-grid">
        <div className="result-column">
          <Card>
            <h2>{t("result.why")}</h2>
            <p>{check.result.why}</p>
          </Card>

          <Card>
            <h2>{t("result.redFlagsChecked")}</h2>
            <div className="check-list">
              {(check.redFlags.length ? check.redFlags : [t("result.noChestPain"), t("result.noTroubleBreathing"), t("result.noConfusion"), t("result.noSevereDehydration")]).map((item) => (
                <span key={item}>✓ {item}</span>
              ))}
            </div>
          </Card>

          <Card>
            <h2>{t("result.possibleCauses")}</h2>
            <p>{t("result.mayBe")}</p>
            <div className="chip-row">
              {check.result.possibleCauses.map((item) => <StatusBadge key={item} tone="primary">{item}</StatusBadge>)}
            </div>
          </Card>

          <Card>
            <h2>{t("result.monitor")}</h2>
            <div className="chip-row">
              {check.result.whatToMonitor.map((item) => <StatusBadge key={item} tone="teal">{item}</StatusBadge>)}
            </div>
          </Card>
        </div>

        <div className="result-column">
          <Card className="doctor-summary-card">
            <div className="doctor-summary-content">
              <div className="card-title-row">
                <h2>{t("home.doctorSummary")}</h2>
                <IconCircle tone="teal">✓</IconCircle>
              </div>
              <div className="summary-mini-grid">
                <span>{t("result.symptoms")} <strong>{check.symptoms.length}</strong></span>
                <span>{t("result.duration")} <strong>{check.duration}</strong></span>
                <span>{t("result.checks")} <strong>{t("common.completed")}</strong></span>
                <span>{t("common.riskLevel")} <strong>{check.result.riskLevel}</strong></span>
              </div>
              <div className="button-pair">
                <PrimaryButton href="/payment-success">{t("result.download")}</PrimaryButton>
                <button className="btn-secondary" onClick={saveSummary} type="button">Save summary</button>
              </div>
              {saved ? <StatusBadge tone="success">Saved</StatusBadge> : null}
              {loginPrompt ? <p className="login-save-prompt">Create a free account to save your health history.</p> : null}
            </div>
            <IllustrationImage variant="compact" src="/images/illustration-health-summary-doctor.png" alt="Doctor-ready health summary illustration" />
          </Card>

          <Card>
            <h2>{t("result.insuranceChecklist")}</h2>
            <div className="check-list">
              {checklist.map((item) => <span key={item}>□ {t(item)}</span>)}
            </div>
            <SecondaryButton href="/insurance-guide">{t("result.coverageOptions")}</SecondaryButton>
          </Card>
        </div>
      </div>

      <DisclaimerBox text={`${t("safety.medical")} ${t("safety.insurance")}`} />
    </section>
  );
}
