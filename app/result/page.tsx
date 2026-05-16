"use client";

import { useEffect, useState } from "react";
import { Card, IconCircle, PageHeader, PrimaryButton, SecondaryButton, StatCard, StatusBadge } from "@/components/app-ui";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { useI18n } from "@/components/i18n-provider";
import { IllustrationImage } from "@/components/visual-card";
import { readSymptomChecks, readSummaries, writeSummaries, type SavedSymptomCheck } from "@/lib/settings";
import { readUser } from "@/lib/auth";
import { careLevelKey, riskLevelKey, symptomItemKey, triageTextKey } from "@/lib/i18n-display";

const SESSION_RESULT_KEY = "ai-health-match-result";
const checklist = ["result.urgentCovered", "result.providerNetwork", "result.copayQuestion", "result.deductibleQuestion"];
const whyKeyMap: Record<string, string> = {
  "You selected a safety concern that should not be handled as a routine symptom check.": "triage.why.safety",
  "Your answers include emergency warning signs that need urgent evaluation.": "triage.why.emergency",
  "Severe abdominal pain with bleeding signals may need emergency evaluation.": "triage.why.abdominal.emergency",
  "Severe abdominal symptoms or bleeding signals need same-day clinical review.": "triage.why.abdominal",
  "Severe breathing symptoms should be assessed promptly.": "triage.why.breathing",
  "Fever that lasts longer or is worsening should be reviewed by a clinician.": "triage.why.fever",
  "Mild upper respiratory symptoms without red flags often improve with home monitoring.": "triage.why.mild.respiratory",
  "Your answers include higher-risk symptoms or warning signs.": "triage.why.high.risk",
  "Your answers do not include emergency warning signs, but follow-up may help if symptoms persist.": "triage.why.default",
  "Your health background may make follow-up more important.": "triage.why.background"
};

export default function ResultPage() {
  const { t } = useI18n();
  const [check, setCheck] = useState<SavedSymptomCheck | null>(null);
  const [saved, setSaved] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState(false);

  useEffect(() => {
    const session = window.sessionStorage.getItem(SESSION_RESULT_KEY);
    if (session) {
      setCheck(JSON.parse(session));
      return;
    }
    setCheck(readSymptomChecks()[0] ?? null);
  }, []);

  function displayWhy(value?: string) {
    if (!value) return t("result.riskDetail");
    return t(whyKeyMap[value] ?? value);
  }

  function displayListItem(value: string) {
    const translated = t(triageTextKey(value));
    if (translated !== triageTextKey(value)) return translated;
    const symptom = t(symptomItemKey(value));
    return symptom === symptomItemKey(value) ? value : symptom;
  }

  function saveSummary() {
    const user = readUser();
    if (!user || user.isGuest) {
      setLoginPrompt(true);
      return;
    }
    if (!check) return;
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

  if (!check) {
    return (
      <section className="app-page result-page">
        <PageHeader title={t("result.title")} description={t("summary.startFirst")} />
        <Card className="history-empty-card">
          <div className="empty-icon">◷</div>
          <h2>{t("history.noSavedChecks")}</h2>
          <p>{t("history.emptyText")}</p>
          <PrimaryButton href="/symptom-check">{t("home.start")}</PrimaryButton>
        </Card>
        <DisclaimerBox text={`${t("safety.medical")} ${t("safety.insurance")}`} />
      </section>
    );
  }

  if (check.result.isCrisis) {
    return (
      <section className="app-page result-page">
        <PageHeader title={t("result.crisisTitle")} description={t("result.crisisDescription")} />
        <Card className="crisis-card">
          <h2>{t("result.crisisSupport")}</h2>
          <p>{t("result.crisisBody")}</p>
          <SecondaryButton href="/symptom-check">{t("result.reviewSymptomCheck")}</SecondaryButton>
        </Card>
        <DisclaimerBox text={t("safety.medical")} />
      </section>
    );
  }

  return (
    <section className="app-page result-page">
      <PageHeader title={t("result.title")} description={`${t("result.referencePrefix")} ${check.id}`} />

      <div className="result-top-grid">
        <StatCard label={t("common.riskLevel")} value={t(riskLevelKey(check.result.riskLevel))} detail={displayWhy(check.result.why)} tone={check.result.riskLevel === "Low" ? "success" : check.result.riskLevel === "Emergency" ? "danger" : "warning"} />
        <StatCard label={t("home.recommendedCare")} value={t(careLevelKey(check.result.recommendedCare))} detail={`${t("result.primarySymptom")}: ${check.primarySymptom ? t(symptomItemKey(check.primarySymptom)) : t("common.notSelected")}`} tone="primary" />
      </div>

      <div className="result-content-grid">
        <div className="result-column">
          <Card>
            <h2>{t("result.why")}</h2>
            <p>{displayWhy(check.result.why)}</p>
          </Card>

          <Card>
            <h2>{t("result.redFlagsChecked")}</h2>
            <div className="check-list">
              {(check.redFlags.length ? check.redFlags : [t("result.noChestPain"), t("result.noTroubleBreathing"), t("result.noConfusion"), t("result.noSevereDehydration")]).map((item) => (
                <span key={item}>✓ {check.redFlags.length ? t(symptomItemKey(item)) : item}</span>
              ))}
            </div>
          </Card>

          <Card>
            <h2>{t("result.possibleCauses")}</h2>
            <p>{t("result.mayBe")}</p>
            <div className="chip-row">
              {check.result.possibleCauses.map((item) => <StatusBadge key={item} tone="primary">{displayListItem(item)}</StatusBadge>)}
            </div>
            <p className="microcopy">{t("result.thisIsNotDiagnosis")}</p>
          </Card>

          <Card>
            <h2>{t("result.monitor")}</h2>
            <div className="chip-row">
              {check.result.whatToMonitor.map((item) => <StatusBadge key={item} tone="teal">{displayListItem(item)}</StatusBadge>)}
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
                <span>{t("common.riskLevel")} <strong>{t(riskLevelKey(check.result.riskLevel))}</strong></span>
              </div>
              <div className="button-pair">
                <PrimaryButton href="/payment-success">{t("result.download")}</PrimaryButton>
                <button className="btn-secondary" onClick={saveSummary} type="button">{t("result.saveSummary")}</button>
              </div>
              {saved ? <StatusBadge tone="success">{t("result.saved")}</StatusBadge> : null}
              {loginPrompt ? <p className="login-save-prompt">{t("result.createAccountPrompt")}</p> : null}
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
