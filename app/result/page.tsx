"use client";

import { useEffect, useState } from "react";
import { Card, IconCircle, PageHeader, PrimaryButton, SecondaryButton, StatCard, StatusBadge } from "@/components/app-ui";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { useI18n } from "@/components/i18n-provider";
import { IllustrationImage } from "@/components/visual-card";
import { readSymptomChecks, readSummaries, writeSymptomChecks, writeSummaries, type SavedSymptomCheck } from "@/lib/settings";
import { readUser } from "@/lib/auth";
import { careLevelKey, riskLevelKey, symptomItemKey, triageTextKey } from "@/lib/i18n-display";
import { startCheckout } from "@/lib/checkout";

const SESSION_RESULT_KEY = "ai-health-match-result";
const coverageQuestionMap: Record<string, string[]> = {
  "Self-care and monitoring": ["result.coverage.self.1", "result.coverage.self.2"],
  "Telehealth may be appropriate": ["result.coverage.telehealth.1", "result.coverage.telehealth.2", "result.coverage.telehealth.3"],
  "Primary Care within 24–72 hours": ["result.coverage.primary.1", "result.coverage.primary.2", "result.coverage.primary.3"],
  "Urgent Care today": ["result.coverage.urgent.1", "result.coverage.urgent.2", "result.coverage.urgent.3", "result.coverage.urgent.4"],
  "Emergency care now": ["result.coverage.emergency.1"],
  "Crisis support now": ["result.coverage.crisis.1"]
};

function nextCarePathKeys(recommendedCare: string) {
  if (recommendedCare === "Self-care and monitoring") return ["result.path.self.1", "result.path.self.2", "result.path.self.3"];
  if (recommendedCare === "Telehealth may be appropriate") return ["result.path.telehealth.1", "result.path.telehealth.2", "result.path.telehealth.3"];
  if (recommendedCare === "Primary Care within 24–72 hours") return ["result.path.primary.1", "result.path.primary.2", "result.path.primary.3"];
  if (recommendedCare === "Urgent Care today") return ["result.path.urgent.1", "result.path.urgent.2", "result.path.urgent.3"];
  if (recommendedCare === "Emergency care now") return ["result.path.emergency.1", "result.path.emergency.2"];
  if (recommendedCare === "Crisis support now") return ["result.path.crisis.1", "result.path.crisis.2"];
  return ["result.path.default.1", "result.path.default.2"];
}

export default function ResultPage() {
  const { t } = useI18n();
  const [check, setCheck] = useState<SavedSymptomCheck | null>(null);
  const [saved, setSaved] = useState(false);
  const [timelineSaved, setTimelineSaved] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

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

  async function handleReportCheckout() {
    setCheckoutError("");
    setCheckoutLoading(true);
    try {
      await startCheckout("one_time_report");
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : t("pricing.checkoutFailed"));
      setCheckoutLoading(false);
    }
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

  const result = check.result as Record<string, unknown> & SavedSymptomCheck["result"];
  const reasons: string[] = (result.reasons as string[]) ?? (result.why ? [result.why as string] : []);
  const redFlagsFound: string[] = (result.redFlagsFound as string[]) ?? check.redFlags ?? [];
  const carePlan = result.carePlan;
  const summary = result.doctorReadySummary;

  // Backend returns questionsToAskClinician as string[], local returns nested object
  const backendQuestions = result.questionsToAskClinician as string[] | undefined;
  const questionsToAsk: string[] = backendQuestions ?? (summary?.questionsToAsk as string[]) ?? [];

  // Backend returns coverageQuestions as string[], local uses coverageQuestionMap
  const backendCoverage = result.coverageQuestions as string[] | undefined;
  const coverageQuestions: string[] = backendCoverage ?? (coverageQuestionMap[result.recommendedCare] ?? coverageQuestionMap["Primary Care within 24–72 hours"]);

  const isEmergencyTone = result.riskLevel === "Emergency" || result.riskLevel === "Crisis";
  const nextPathKeys = nextCarePathKeys(result.recommendedCare);
  const selectedSymptoms: string[] = (summary?.selectedSymptoms as string[]) ?? check.symptoms;
  const mainSymptom: string = (summary?.primarySymptom as string) ?? check.primarySymptom;
  const otherSymptoms = selectedSymptoms.filter((item) => item !== mainSymptom);

  // AI-generated content from backend
  const plainLanguageExplanation = result.plainLanguageExplanation as string | undefined;
  const aiReviewStatus = (result.aiReviewStatus as string) || (result.aiGenerated ? "generated" : "unavailable");

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
          detail={t("result.recommendedNextStep")}
          tone="primary"
        />
      </div>

      <Card>
        <h2>{t("result.why")}</h2>
        <div className="check-list">
          {reasons.map((item) => <span key={item}>• {displayText(item)}</span>)}
        </div>
      </Card>

      {/* AI / Safety review status */}
      <Card className="tool-section">
        <h2>{t("result.aiReviewTitle")}</h2>
        <div className="check-list">
          <span>✓ {t("result.safetyRulesChecked")}</span>
          {aiReviewStatus === "generated" ? (
            <span>✓ {t("result.aiSummaryGenerated")}</span>
          ) : aiReviewStatus === "fallback" ? (
            <span>⚠ {t("result.aiSummaryFallback")}</span>
          ) : (
            <span>— {t("result.aiSummaryUnavailable")}</span>
          )}
          <span>✓ {t("result.doctorSummaryPrepared")}</span>
        </div>
        <p className="help-text" style={{ marginTop: 8 }}>{t("result.aiReviewDisclaimer")}</p>
      </Card>

      {plainLanguageExplanation ? (
        <Card className="ai-explanation-card">
          <div className="card-title-row">
            <h2>{t("result.aiSummary")}</h2>
            {aiReviewStatus === "generated" ? <StatusBadge tone="teal">{t("result.aiAssisted")}</StatusBadge> : null}
          </div>
          <p>{plainLanguageExplanation}</p>
          <p className="help-text">{t("result.thisIsNotDiagnosis")}</p>
        </Card>
      ) : null}

      <Card className={isEmergencyTone ? "result-safety-card urgent" : "result-safety-card"}>
        <div className="card-title-row">
          <div>
            <h2>{t("result.whatToDoNow")}</h2>
            <p>{t(careLevelKey(result.recommendedCare))}</p>
          </div>
          <StatusBadge tone={isEmergencyTone ? "danger" : result.riskLevel === "High" ? "warning" : result.riskLevel === "Low" ? "success" : "primary"}>
            {t("result.recommendedNextStep")}
          </StatusBadge>
        </div>
        <div className="check-list">
          {nextPathKeys.map((item) => <span key={item}>• {t(item)}</span>)}
        </div>
        {isEmergencyTone ? (
          <div className="button-pair">
            <PrimaryButton href={result.riskLevel === "Crisis" ? "/emergency" : "/emergency"}>{t("result.seekHelpNow")}</PrimaryButton>
          </div>
        ) : null}
      </Card>

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

      {/* Action cards: Find care + Coverage protection (hidden for emergency/crisis) */}
      {!isEmergencyTone ? (
        <div className="result-action-grid">
          <Card className="action-card">
            <IconCircle tone="primary">♡</IconCircle>
            <div>
              <h2>{t("result.findCareOptions")}</h2>
              <p>{t("result.findCareOptionsDesc")}</p>
              <PrimaryButton href="/care-options">{t("result.findCareOptionsBtn")}</PrimaryButton>
            </div>
          </Card>
          <Card className="action-card">
            <IconCircle tone="teal">♢</IconCircle>
            <div>
              <h2>{t("result.checkCoverageProtection")}</h2>
              <p>{t("result.checkCoverageProtectionDesc")}</p>
              <SecondaryButton href="/insurance-guide">{t("result.checkCoverageProtectionBtn")}</SecondaryButton>
            </div>
          </Card>
        </div>
      ) : null}

      <Card>
        <h2>{t("result.whatToWatch")}</h2>
        <div className="chip-row">
          {result.whatToMonitor.map((item) => <StatusBadge key={item} tone="teal">{displayText(item)}</StatusBadge>)}
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
            </div>
            <IllustrationImage variant="compact" src="/images/illustration-health-summary-doctor.png" alt="Doctor-ready health summary illustration" />
      </Card>

      <Card>
            <h2>{t("result.coverageQuestionsForPath")}</h2>
            <div className="check-list">
              {coverageQuestions.map((item) => <span key={item}>□ {t(item)}</span>)}
            </div>
            <SecondaryButton href="/insurance-guide">{t("result.coverageOptions")}</SecondaryButton>
      </Card>

      <Card className="tool-section">
        <h2>{t("result.exportSaveCreate")}</h2>
        <div className="button-pair">
          <button className="btn-secondary" onClick={saveTimeline} type="button">{t("result.saveTimeline")}</button>
          <button className="btn-secondary" onClick={saveSummary} type="button">{t("result.saveSummary")}</button>
          {!isEmergencyTone ? (
            <button className="btn-primary" disabled={checkoutLoading} onClick={handleReportCheckout} type="button">
              {checkoutLoading ? t("pricing.openingCheckout") : t("pricing.createReportCreem")}
            </button>
          ) : null}
        </div>
        {checkoutError ? <p className="inline-error">{checkoutError}</p> : null}
        {timelineSaved ? <StatusBadge tone="success">{t("result.timelineSaved")}</StatusBadge> : null}
        {saved ? <StatusBadge tone="success">{t("result.saved")}</StatusBadge> : null}
        {loginPrompt ? <p className="login-save-prompt">{t("result.localGuestSavePrompt")}</p> : null}
      </Card>

      <DisclaimerBox text={`${t("safety.medical")} ${t("safety.insurance")}`} />
    </section>
  );
}
