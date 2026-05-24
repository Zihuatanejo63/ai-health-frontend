"use client";

import { useEffect, useState } from "react";
import { Card, IconCircle, PageHeader, PrimaryButton, SecondaryButton, StatCard, StatusBadge } from "@/components/app-ui";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { useI18n } from "@/components/i18n-provider";
import { readSymptomChecks, readSummaries, writeSymptomChecks, writeSummaries, type SavedSymptomCheck } from "@/lib/settings";
import { readUser } from "@/lib/auth";
import { careLevelKey, riskLevelKey, symptomItemKey, triageTextKey } from "@/lib/i18n-display";
import { startCheckout } from "@/lib/checkout";

const SESSION_RESULT_KEY = "ai-health-match-result";

function nextStepKey(recommendedCare: string) {
  if (recommendedCare === "Self-care and monitoring") return "result.nextStep.self";
  if (recommendedCare === "Telehealth may be appropriate") return "result.nextStep.telehealth";
  if (recommendedCare === "Primary Care within 24–72 hours") return "result.nextStep.primary";
  if (recommendedCare === "Urgent Care today") return "result.nextStep.urgent";
  if (recommendedCare === "Emergency care now") return "result.nextStep.emergency";
  if (recommendedCare === "Crisis support now") return "result.nextStep.crisis";
  return "result.nextStep.self";
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

  function displayHealthValue(key: string, value: string) {
    if (!value) return t("common.notSelected");
    if (key === "age" || key === "medications") return value;
    const labelKey = `health.${key}.${value}`;
    const translated = t(labelKey);
    return translated === labelKey ? value : translated;
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

  async function handlePlusCheckout() {
    setCheckoutError("");
    setCheckoutLoading(true);
    try {
      await startCheckout("plus_monthly");
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : t("pricing.checkoutFailed"));
      setCheckoutLoading(false);
    }
  }

  function copyReportText() {
    if (!check) return;
    const lines: string[] = [];
    const hb = check.healthBackground || {};
    const result = check.result as Record<string, unknown>;
    const summary = result.doctorReadySummary as Record<string, unknown> | undefined;
    const questionsToAsk: string[] = (result.questionsToAskClinician as string[]) ?? (summary?.questionsToAsk as string[]) ?? [];
    const input = check.input as Record<string, unknown> | undefined;
    const funcImpact: string[] = Array.isArray(input?.functionImpact)
      ? input.functionImpact as string[]
      : typeof input?.functionImpact === "object" && input?.functionImpact
        ? Object.entries(input.functionImpact as Record<string, boolean>).filter(([, v]) => v).map(([k]) => k)
        : [];

    lines.push(`=== ${t("result.doctorReadyMedicalReport")} ===`);
    lines.push(`ID: ${check.id}`);
    lines.push("");
    lines.push(`--- ${t("result.report.patientBasics")} ---`);
    if (hb.age) lines.push(`${t("health.age")}: ${hb.age}`);
    if (hb.sex) lines.push(`${t("health.sex")}: ${displayHealthValue("sex", String(hb.sex))}`);
    if (hb.pregnancyStatus) lines.push(`${t("health.pregnancyStatus")}: ${displayHealthValue("pregnancy", String(hb.pregnancyStatus))}`);
    if (hb.countryRegion) lines.push(`${t("health.countryRegion")}: ${hb.countryRegion}`);
    if (hb.insuranceStatus) lines.push(`${t("health.insuranceStatus")}: ${displayHealthValue("insuranceStatus", String(hb.insuranceStatus))}`);
    lines.push("");
    lines.push(`--- ${t("result.report.mainConcern")} ---`);
    lines.push(t(symptomItemKey(check.primarySymptom)));
    lines.push("");
    lines.push(`--- ${t("result.report.associatedSymptoms")} ---`);
    const otherSymptoms = check.symptoms.filter((s) => s !== check.primarySymptom);
    lines.push(otherSymptoms.length ? otherSymptoms.map((s) => t(symptomItemKey(s))).join(", ") : t("common.none"));
    lines.push("");
    lines.push(`--- ${t("result.report.severityImpact")} ---`);
    lines.push(`${t("symptom.severity")}: ${displaySeverity(check.severity)}`);
    lines.push(`${t("symptom.painScore")}: ${check.input ? (check.input as Record<string, unknown>).painScore ?? summary?.painScore ?? "—" : "—"}`);
    lines.push(`${t("symptom.trend")}: ${displayTrend(check.trend)}`);
    if (funcImpact.length) lines.push(`${t("symptom.functionImpact")}: ${funcImpact.map((k) => t(`symptom.impact.${k}`)).join(", ")}`);
    lines.push("");
    lines.push(`--- ${t("result.report.redFlagsChecked")} ---`);
    lines.push(check.redFlags.length ? check.redFlags.map((r) => displayText(r)).join(", ") : t("common.none"));
    lines.push("");
    lines.push(`--- ${t("result.report.healthBackground")} ---`);
    if (hb.chronicConditions) lines.push(`${t("health.chronicConditions")}: ${String(hb.chronicConditions).split(", ").filter(Boolean).map((c: string) => t(`health.chronic.${c}`)).join(", ")}`);
    if (hb.allergies) lines.push(`${t("health.allergies")}: ${String(hb.allergies).split(", ").filter(Boolean).map((a: string) => t(`health.allergy.${a}`)).join(", ")}`);
    if (hb.medications) lines.push(`${t("health.medications")}: ${hb.medications}`);
    lines.push("");
    lines.push(`--- ${t("result.report.triageResult")} ---`);
    lines.push(`${t("common.riskLevel")}: ${t(riskLevelKey(check.result.riskLevel))}`);
    lines.push(`${t("home.recommendedCare")}: ${t(careLevelKey(check.result.recommendedCare))}`);
    const causes = result.possibleCauses as string[] | undefined;
    if (causes?.length) lines.push(`${t("result.report.posssibleCauses")}: ${causes.map((c) => displayText(c)).join(", ")}`);
    lines.push("");
    lines.push(`--- ${t("result.report.aiReview")} ---`);
    const aiStatus = (result.aiReviewStatus as string) || (result.aiGenerated ? "generated" : "unavailable");
    lines.push(aiStatus === "generated" ? t("result.aiSummaryGenerated") : aiStatus === "fallback" ? t("result.aiSummaryFallback") : t("result.aiSummaryUnavailable"));
    lines.push("");
    lines.push(`--- ${t("result.report.questionsForClinician")} ---`);
    questionsToAsk.forEach((q, i) => { lines.push(`${i + 1}. ${q}`); });
    if (!questionsToAsk.length) lines.push(t("common.none"));
    lines.push("");
    lines.push(`--- ${t("result.report.coverageNote")} ---`);
    lines.push(t("result.checkCoverageProtectionDesc"));

    navigator.clipboard.writeText(lines.join("\n")).catch(console.error);
    alert(t("result.report.copyReport"));
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
        <DisclaimerBox text={t("care.disclaimerV2")} />
      </section>
    );
  }

  const result = check.result as Record<string, unknown> & SavedSymptomCheck["result"];
  const reasons: string[] = (result.reasons as string[]) ?? (result.why ? [result.why as string] : []);
  const redFlagsFound: string[] = (result.redFlagsFound as string[]) ?? check.redFlags ?? [];
  const summary = result.doctorReadySummary;
  const input = check.input as Record<string, unknown> | undefined;

  const backendQuestions = result.questionsToAskClinician as string[] | undefined;
  const questionsToAsk: string[] = backendQuestions ?? (summary?.questionsToAsk as string[]) ?? [];

  const isEmergencyTone = result.riskLevel === "Emergency" || result.riskLevel === "Crisis";

  const selectedSymptoms: string[] = (summary?.selectedSymptoms as string[]) ?? check.symptoms;
  const mainSymptom: string = (summary?.primarySymptom as string) ?? check.primarySymptom;
  const otherSymptoms = selectedSymptoms.filter((item) => item !== mainSymptom);

  const plainLanguageExplanation = result.plainLanguageExplanation as string | undefined;
  const aiReviewStatus = (result.aiReviewStatus as string) || (result.aiGenerated ? "generated" : "unavailable");

  // Parse functionImpact from input (could be Record<string, boolean> or string[])
  const rawImpact = input?.functionImpact;
  const functionImpact: string[] = Array.isArray(rawImpact)
    ? rawImpact as string[]
    : typeof rawImpact === "object" && rawImpact
      ? Object.entries(rawImpact as Record<string, boolean>).filter(([, v]) => v).map(([k]) => k)
      : [];

  const hb = check.healthBackground || {};
  const causes = result.possibleCauses as string[] | undefined;

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

      {/* Your next step */}
      <Card className={isEmergencyTone ? "result-safety-card urgent" : "result-safety-card"}>
        <div className="card-title-row">
          <h2>{t("result.yourNextStep")}</h2>
          <StatusBadge tone={isEmergencyTone ? "danger" : result.riskLevel === "High" ? "warning" : result.riskLevel === "Low" ? "success" : "primary"}>
            {t(careLevelKey(result.recommendedCare))}
          </StatusBadge>
        </div>
        <p style={{ marginBottom: 16 }}>{t(nextStepKey(result.recommendedCare))}</p>
        {isEmergencyTone ? (
          <PrimaryButton href="/emergency">{t("result.seekHelpNow")}</PrimaryButton>
        ) : (
          <div className="button-pair">
            <PrimaryButton href="/care-options">{t("result.findCareOptionsBtn")}</PrimaryButton>
            <PrimaryButton href="#doctor-report">{t("result.createDoctorReadyReport")}</PrimaryButton>
            <SecondaryButton href="/insurance-guide">{t("result.checkCoverageProtectionBtn")}</SecondaryButton>
          </div>
        )}
      </Card>

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

      {/* Doctor-ready Medical Report */}
      <div id="doctor-report" className="scroll-anchor">
        <Card className="doctor-summary-card">
          <div className="doctor-summary-content">
            <div className="card-title-row">
              <h2>{t("result.doctorReadyMedicalReport")}</h2>
              <IconCircle tone="teal">✓</IconCircle>
            </div>

            {/* 1. Patient basics */}
            <section style={{ marginTop: 16 }}>
              <h3>{t("result.report.patientBasics")}</h3>
              <div className="summary-mini-grid">
                {hb.age ? <span>{t("health.age")} <strong>{String(hb.age)}</strong></span> : null}
                {hb.sex ? <span>{t("health.sex")} <strong>{displayHealthValue("sex", String(hb.sex))}</strong></span> : null}
                {hb.pregnancyStatus ? <span>{t("health.pregnancyStatus")} <strong>{displayHealthValue("pregnancy", String(hb.pregnancyStatus))}</strong></span> : null}
                {hb.countryRegion ? <span>{t("health.countryRegion")} <strong>{String(hb.countryRegion)}</strong></span> : null}
                {hb.insuranceStatus ? <span>{t("health.insuranceStatus")} <strong>{displayHealthValue("insuranceStatus", String(hb.insuranceStatus))}</strong></span> : null}
              </div>
            </section>

            {/* 2. Main concern */}
            <section style={{ marginTop: 16 }}>
              <h3>{t("result.report.mainConcern")}</h3>
              <p><strong>{mainSymptom ? t(symptomItemKey(mainSymptom)) : t("common.notSelected")}</strong></p>
            </section>

            {/* 3. Associated symptoms */}
            <section style={{ marginTop: 16 }}>
              <h3>{t("result.report.associatedSymptoms")}</h3>
              <p>{otherSymptoms.length ? otherSymptoms.map((s) => t(symptomItemKey(s))).join(", ") : t("common.none")}</p>
            </section>

            {/* 4. Severity and function impact */}
            <section style={{ marginTop: 16 }}>
              <h3>{t("result.report.severityImpact")}</h3>
              <div className="summary-mini-grid">
                <span>{t("symptom.severity")} <strong>{displaySeverity(summary?.severity ?? check.severity)}</strong></span>
                <span>{t("symptom.painScore")} <strong>{typeof input?.painScore === "number" ? input.painScore : (summary?.painScore as number) ?? "—"}</strong></span>
                <span>{t("symptom.trend")} <strong>{displayTrend(summary?.trend ?? check.trend)}</strong></span>
                {functionImpact.length ? <span>{t("symptom.functionImpact")} <strong>{functionImpact.map((k) => t(`symptom.impact.${k}`)).join(", ")}</strong></span> : null}
              </div>
            </section>

            {/* 5. Red flags checked */}
            <section style={{ marginTop: 16 }}>
              <h3>{t("result.report.redFlagsChecked")}</h3>
              <p>{check.redFlags.length ? check.redFlags.map((r) => displayText(r)).join(", ") : t("common.none")}</p>
            </section>

            {/* 6. Health background */}
            <section style={{ marginTop: 16 }}>
              <h3>{t("result.report.healthBackground")}</h3>
              <div className="summary-mini-grid">
                {hb.chronicConditions ? <span>{t("health.chronicConditions")} <strong>{String(hb.chronicConditions).split(", ").filter(Boolean).map((c: string) => t(`health.chronic.${c}`)).join(", ")}</strong></span> : null}
                {hb.allergies ? <span>{t("health.allergies")} <strong>{String(hb.allergies).split(", ").filter(Boolean).map((a: string) => t(`health.allergy.${a}`)).join(", ")}</strong></span> : null}
                {hb.medications ? <span>{t("health.medications")} <strong>{String(hb.medications)}</strong></span> : null}
                {!hb.chronicConditions && !hb.allergies && !hb.medications ? <span>{t("common.none")}</span> : null}
              </div>
            </section>

            {/* 7. Triage result */}
            <section style={{ marginTop: 16 }}>
              <h3>{t("result.report.triageResult")}</h3>
              <div className="summary-mini-grid">
                <span>{t("common.riskLevel")} <strong>{t(riskLevelKey(result.riskLevel))}</strong></span>
                <span>{t("home.recommendedCare")} <strong>{t(careLevelKey(result.recommendedCare))}</strong></span>
                {causes?.length ? <span>{t("result.report.posssibleCauses")} <strong>{causes.map((c) => displayText(c)).join(", ")}</strong></span> : null}
              </div>
            </section>

            {/* 8. AI review status */}
            <section style={{ marginTop: 16 }}>
              <h3>{t("result.report.aiReview")}</h3>
              <p>
                {aiReviewStatus === "generated" ? t("result.aiSummaryGenerated") : aiReviewStatus === "fallback" ? t("result.aiSummaryFallback") : t("result.aiSummaryUnavailable")}
              </p>
            </section>

            {/* 9. Questions for clinician */}
            <section style={{ marginTop: 16 }}>
              <h3>{t("result.report.questionsForClinician")}</h3>
              {questionsToAsk.length ? (
                <div className="check-list">
                  {questionsToAsk.map((q, i) => <span key={i}>{i + 1}. {q}</span>)}
                </div>
              ) : <p>{t("common.none")}</p>}
            </section>

            {/* 10. Coverage note */}
            <section style={{ marginTop: 16 }}>
              <h3>{t("result.report.coverageNote")}</h3>
              <p className="help-text">{t("result.checkCoverageProtectionDesc")}</p>
            </section>

            {/* Report actions: Copy / Download / Save */}
            <div className="button-pair" style={{ marginTop: 20 }}>
              <button className="btn-secondary" onClick={copyReportText} type="button">{t("result.report.copyReport")}</button>
              <button className="btn-secondary" disabled type="button">{t("result.report.downloadPdf")}</button>
              <button className="btn-primary" onClick={saveSummary} type="button">{t("result.report.saveToRecords")}</button>
            </div>
            {saved ? <StatusBadge tone="success">{t("result.saved")}</StatusBadge> : null}
          </div>
        </Card>
      </div>

      <Card className="tool-section">
        <h2>{t("result.exportSaveCreate")}</h2>
        <div className="button-pair">
          <button className="btn-secondary" onClick={saveTimeline} type="button">{t("result.saveTimeline")}</button>
          {!isEmergencyTone ? (
            <button className="btn-primary" disabled={checkoutLoading} onClick={handlePlusCheckout} type="button">
              {checkoutLoading ? t("pricing.openingCheckout") : t("pricing.subscribePlus")}
            </button>
          ) : null}
        </div>
        {checkoutError ? <p className="inline-error">{checkoutError}</p> : null}
        {timelineSaved ? <StatusBadge tone="success">{t("result.timelineSaved")}</StatusBadge> : null}
        {loginPrompt ? <p className="login-save-prompt">{t("result.localGuestSavePrompt")}</p> : null}
      </Card>

      <DisclaimerBox text={t("care.disclaimerV2")} />
    </section>
  );
}
