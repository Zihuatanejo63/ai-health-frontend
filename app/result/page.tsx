"use client";

import { useEffect, useState } from "react";
import { Card, IconCircle, PageHeader, PrimaryButton, SecondaryButton, StatCard, StatusBadge } from "@/components/app-ui";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { useI18n } from "@/components/i18n-provider";
import { IllustrationImage } from "@/components/visual-card";
import { readSymptomChecks, readSummaries, writeSymptomChecks, writeSummaries, type SavedSymptomCheck } from "@/lib/settings";
import { readUser } from "@/lib/auth";
import { careLevelKey, riskLevelKey, symptomItemKey, triageTextKey } from "@/lib/i18n-display";

const SESSION_RESULT_KEY = "ai-health-match-result";
const checklist = ["result.urgentCovered", "result.providerNetwork", "result.copayQuestion", "result.deductibleQuestion"];

export default function ResultPage() {
  const { t } = useI18n();
  const [check, setCheck] = useState<SavedSymptomCheck | null>(null);
  const [saved, setSaved] = useState(false);
  const [timelineSaved, setTimelineSaved] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState(false);

  useEffect(() => {
    const session = window.sessionStorage.getItem(SESSION_RESULT_KEY);
    if (session) {
      setCheck(JSON.parse(session));
      return;
    }
    setCheck(readSymptomChecks()[0] ?? null);
  }, []);

  function displayText(value?: string) {
    if (!value) return "";
    const translated = t(triageTextKey(value));
    if (translated !== triageTextKey(value)) return translated;
    const symptom = t(symptomItemKey(value));
    return symptom === symptomItemKey(value) ? value : symptom;
  }

  function displayDuration(value?: string) {
    if (!value) return t("common.notSelected");
    const key = `symptom.duration.${value}`;
    const translated = t(key);
    return translated === key ? value : translated;
  }

  function displayTrend(value?: string) {
    if (!value) return t("common.notSelected");
    const key = `symptom.trend.${value}`;
    const translated = t(key);
    return translated === key ? value : translated;
  }

  function displaySeverity(value?: string) {
    if (!value) return t("common.notSelected");
    const key = `symptom.severity.${value}`;
    const translated = t(key);
    return translated === key ? value : translated;
  }

  function saveTimeline() {
    if (!check) return;
    const existing = readSymptomChecks();
    const next = existing.some((item) => item.id === check.id) ? existing : [check, ...existing];
    writeSymptomChecks(next);
    setTimelineSaved(true);
    const user = readUser();
    if (!user || user.isGuest) setLoginPrompt(true);
  }

  function saveSummary() {
    if (!check) return;
    const summary = check.result.doctorReadySummary;
    const existing = readSummaries();
    const nextSummaries = existing.some((item) => item.checkId === check.id) ? existing : [
      {
        id: `summary_${Date.now()}`,
        createdAt: new Date().toISOString(),
        checkId: check.id,
        title: `${check.primarySymptom || "Symptom"} summary`,
        symptoms: summary?.selectedSymptoms ?? check.symptoms,
        riskLevel: check.result.riskLevel,
        recommendedCare: check.result.recommendedCare,
        carePlanTitleKey: check.result.carePlan?.titleKey,
        carePlanSummaryKey: check.result.carePlan?.summaryKey,
        questionsToAsk: summary?.questionsToAsk ?? []
      },
      ...existing
    ];
    writeSummaries(nextSummaries);
    setSaved(true);
    const user = readUser();
    if (!user || user.isGuest) setLoginPrompt(true);
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

  const result = check.result;
  const reasons = result.reasons ?? (result.why ? [result.why] : []);
  const redFlagsFound = result.redFlagsFound ?? check.redFlags ?? [];
  const redFlagsChecked = result.redFlagsChecked ?? check.redFlags ?? [];
  const escalationAdvice = result.escalationAdvice ?? [];
  const carePlan = result.carePlan;
  const summary = result.doctorReadySummary;
  const questionsToAsk = summary?.questionsToAsk ?? [];
  const isEmergencyTone = result.riskLevel === "Emergency" || result.riskLevel === "Crisis";
  const selectedSymptoms = summary?.selectedSymptoms ?? check.symptoms;
  const mainSymptom = summary?.primarySymptom ?? check.primarySymptom;
  const otherSymptoms = selectedSymptoms.filter((item) => item !== mainSymptom);

  return (
    <section className="app-page result-page">
      <PageHeader title={t("result.title")} description={`${t("result.referencePrefix")} ${check.id}`} />

      <div className="result-top-grid">
        <StatCard
          label={t("common.riskLevel")}
          value={t(riskLevelKey(result.riskLevel))}
          detail={t("result.thisIsNotDiagnosis")}
          tone={result.riskLevel === "Low" ? "success" : isEmergencyTone ? "danger" : result.riskLevel === "High" ? "warning" : "primary"}
        />
        <StatCard
          label={t("home.recommendedCare")}
          value={t(careLevelKey(result.recommendedCare))}
          detail={`${t("result.primarySymptom")}: ${check.primarySymptom ? t(symptomItemKey(check.primarySymptom)) : t("common.notSelected")}`}
          tone="primary"
        />
      </div>

      {carePlan ? (
        <Card className={isEmergencyTone ? "care-plan-card urgent" : "care-plan-card"}>
          <div className="card-title-row">
            <div>
              <h2>{t("result.carePlan")}</h2>
              <p>{t(carePlan.summaryKey)}</p>
            </div>
            <StatusBadge tone={isEmergencyTone ? "danger" : result.riskLevel === "High" ? "warning" : result.riskLevel === "Low" ? "success" : "primary"}>
              {t(carePlan.titleKey)}
            </StatusBadge>
          </div>

          <div className="care-plan-grid">
            <div className="care-plan-section">
              <h3>{t("carePlan.actionsTitle")}</h3>
              <div className="check-list">
                {carePlan.actionKeys.map((item) => <span key={item}>• {t(item)}</span>)}
              </div>
            </div>
            <div className="care-plan-section">
              <h3>{t("carePlan.avoidTitle")}</h3>
              <div className="check-list">
                {carePlan.avoidKeys.map((item) => <span key={item}>• {t(item)}</span>)}
              </div>
            </div>
            <div className="care-plan-section">
              <h3>{t("carePlan.seekCareTitle")}</h3>
              <div className="check-list">
                {carePlan.seekCareNowKeys.map((item) => <span key={item}>• {t(item)}</span>)}
              </div>
            </div>
            <div className="care-plan-section">
              <h3>{t("carePlan.tipsTitle")}</h3>
              <div className="check-list">
                {carePlan.categorySpecificTipKeys.map((item) => <span key={item}>• {t(item)}</span>)}
              </div>
            </div>
          </div>
        </Card>
      ) : null}

      <Card className={isEmergencyTone ? "result-safety-card urgent" : "result-safety-card"}>
        <h2>{t("result.safetyTitle")}</h2>
        <div className="check-list">
          <span>• {t("result.thisIsNotDiagnosis")}</span>
          <span>• {t("result.noPrescription")}</span>
          <span>• {t("result.seekHelpIfWorse")}</span>
        </div>
      </Card>

      {redFlagsFound.length > 0 ? (
        <Card className="crisis-card">
          <h2>{t("result.redFlagsFound")}</h2>
          <div className="chip-row">
            {redFlagsFound.map((item) => <StatusBadge key={item} tone="danger">{displayText(item)}</StatusBadge>)}
          </div>
          <p>{isEmergencyTone ? t("result.seekEmergencyHelp") : t("result.seekUrgentHelp")}</p>
        </Card>
      ) : null}

      <div className="result-content-grid">
        <div className="result-column">
          <Card>
            <h2>{t("result.why")}</h2>
            <div className="check-list">
              {reasons.map((item) => <span key={item}>• {displayText(item)}</span>)}
            </div>
          </Card>

          <Card>
            <h2>{t("result.redFlagsChecked")}</h2>
            <div className="check-list">
              {(redFlagsChecked.length ? redFlagsChecked : ["result.noEmergencyRedFlags"]).map((item) => (
                <span key={item}>✓ {item.startsWith("result.") ? t(item) : displayText(item)}</span>
              ))}
            </div>
          </Card>

          {result.riskLevel === "Crisis" ? (
            <Card className="crisis-card">
              <h2>{t("symptom.crisis.title")}</h2>
              <div className="check-list">
                <span>• {t("symptom.crisis.seekImmediateHelp")}</span>
                <span>• {t("symptom.crisis.localEmergency")}</span>
                <span>• {t("symptom.crisis.notAlone")}</span>
              </div>
            </Card>
          ) : (
            <Card>
              <h2>{t("result.possibleCauses")}</h2>
              <p>{t("result.mayBe")}</p>
              <div className="chip-row">
                {result.possibleCauses.map((item) => <StatusBadge key={item} tone="primary">{displayText(item)}</StatusBadge>)}
              </div>
              <p className="microcopy">{t("result.thisIsNotDiagnosis")}</p>
            </Card>
          )}

          <Card>
            <h2>{t("result.monitor")}</h2>
            <div className="chip-row">
              {result.whatToMonitor.map((item) => <StatusBadge key={item} tone="teal">{displayText(item)}</StatusBadge>)}
            </div>
          </Card>

          <Card>
            <h2>{t("result.escalationAdvice")}</h2>
            <div className="check-list">
              {escalationAdvice.map((item) => <span key={item}>• {displayText(item)}</span>)}
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
                <span>{t("result.mainSymptom")} <strong>{mainSymptom ? t(symptomItemKey(mainSymptom)) : t("common.notSelected")}</strong></span>
                <span>{t("result.otherSymptoms")} <strong>{otherSymptoms.length ? otherSymptoms.map((item) => t(symptomItemKey(item))).join(", ") : t("common.none")}</strong></span>
                <span>{t("result.symptoms")} <strong>{selectedSymptoms.length}</strong></span>
                <span>{t("result.duration")} <strong>{displayDuration(summary?.duration ?? check.duration)}</strong></span>
                <span>{t("symptom.trend")} <strong>{displayTrend(summary?.trend)}</strong></span>
                <span>{t("symptom.severity")} <strong>{displaySeverity(summary?.severity ?? check.severity)}</strong></span>
                <span>{t("symptom.painScore")} <strong>{summary?.painScore ?? "—"}</strong></span>
                <span>{t("common.riskLevel")} <strong>{t(riskLevelKey(result.riskLevel))}</strong></span>
              </div>
              <div className="button-pair">
                <PrimaryButton href="/payment-success">{t("result.download")}</PrimaryButton>
                <button className="btn-secondary" onClick={saveTimeline} type="button">{t("result.saveTimeline")}</button>
                <button className="btn-secondary" onClick={saveSummary} type="button">{t("result.saveSummary")}</button>
              </div>
              {timelineSaved ? <StatusBadge tone="success">{t("result.timelineSaved")}</StatusBadge> : null}
              {saved ? <StatusBadge tone="success">{t("result.saved")}</StatusBadge> : null}
              {loginPrompt ? <p className="login-save-prompt">{t("result.localGuestSavePrompt")}</p> : null}
            </div>
            <IllustrationImage variant="compact" src="/images/illustration-health-summary-doctor.png" alt="Doctor-ready health summary illustration" />
          </Card>

          <Card>
            <h2>{t("summary.questions")}</h2>
            <div className="check-list">
              {questionsToAsk.map((item) => <span key={item}>? {displayText(item)}</span>)}
            </div>
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
