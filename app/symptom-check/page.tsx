"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { useI18n } from "@/components/i18n-provider";
import { IllustrationImage } from "@/components/visual-card";
import {
  getDetailGroup,
  getDetailQuestionsForPrimary,
  redFlagGroups,
  symptomCategories,
  type DetailQuestion
} from "@/lib/symptomLibrary";
import { evaluateTriage } from "@/lib/triageRules";
import { readSymptomChecks, writeSymptomChecks, type SavedSymptomCheck } from "@/lib/settings";
import { backgroundFieldKey, symptomItemKey } from "@/lib/i18n-display";

const SESSION_RESULT_KEY = "ai-health-match-result";
const TOTAL_STEPS = 7;

const durations = [
  { value: "lessThan24h", labelKey: "symptom.duration.lessThan24h" },
  { value: "oneToThreeDays", labelKey: "symptom.duration.oneToThreeDays" },
  { value: "fourToSevenDays", labelKey: "symptom.duration.fourToSevenDays" },
  { value: "moreThanSevenDays", labelKey: "symptom.duration.moreThanSevenDays" },
  { value: "moreThanTwoWeeks", labelKey: "symptom.duration.moreThanTwoWeeks" }
];

const trends = [
  { value: "gettingBetter", labelKey: "symptom.trend.gettingBetter" },
  { value: "unchanged", labelKey: "symptom.trend.unchanged" },
  { value: "gettingWorse", labelKey: "symptom.trend.gettingWorse" },
  { value: "improvedThenWorsened", labelKey: "symptom.trend.improvedThenWorsened" }
];

const severities = [
  { value: "mild", labelKey: "symptom.severity.mild" },
  { value: "moderate", labelKey: "symptom.severity.moderate" },
  { value: "severe", labelKey: "symptom.severity.severe" }
];

const functionImpactOptions = [
  { value: "sleepAffected", labelKey: "symptom.impact.sleepAffected" },
  { value: "eatingDrinkingAffected", labelKey: "symptom.impact.eatingDrinkingAffected" },
  { value: "unableToWorkOrWalkNormally", labelKey: "symptom.impact.unableToWorkOrWalkNormally" },
  { value: "hardToStayAwake", labelKey: "symptom.impact.hardToStayAwake" },
  { value: "veryWeakOrUnsteady", labelKey: "symptom.impact.veryWeakOrUnsteady" },
  { value: "notUrinatingOrVeryLittle", labelKey: "symptom.impact.notUrinatingOrVeryLittle" }
];

const booleanBackgroundFields = [
  "pregnantOrPossiblyPregnant",
  "child",
  "olderAdult",
  "immunocompromised",
  "heartDisease",
  "diabetes",
  "asthmaOrChronicLungDisease",
  "kidneyDisease",
  "recentSurgery"
];

const textBackgroundFields = ["age", "sex", "chronicConditions", "medications", "allergies", "countryOrRegion", "insuranceStatus"];

const yesNoOptions = [
  { value: "no", labelKey: "common.no" },
  { value: "yes", labelKey: "common.yes" }
];

function createBooleanState(items: string[]) {
  return items.reduce<Record<string, boolean>>((acc, item) => {
    acc[item] = false;
    return acc;
  }, {});
}

export default function SymptomCheckPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [step, setStep] = useState(1);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [primarySymptom, setPrimarySymptom] = useState("");
  const [details, setDetails] = useState<Record<string, string>>({});
  const [duration, setDuration] = useState("oneToThreeDays");
  const [trend, setTrend] = useState("unchanged");
  const [severity, setSeverity] = useState("moderate");
  const [painScore, setPainScore] = useState("3");
  const [functionImpact, setFunctionImpact] = useState<Record<string, boolean>>(() => createBooleanState(functionImpactOptions.map((item) => item.value)));
  const [redFlags, setRedFlags] = useState<Record<string, boolean>>(() => createBooleanState(redFlagGroups.flatMap((group) => group.items.map((item) => item.value))));
  const [formError, setFormError] = useState("");
  const [background, setBackground] = useState<Record<string, string>>({
    age: "",
    sex: "",
    pregnantOrPossiblyPregnant: "no",
    child: "no",
    olderAdult: "no",
    immunocompromised: "no",
    chronicConditions: "",
    heartDisease: "no",
    diabetes: "no",
    asthmaOrChronicLungDisease: "no",
    kidneyDisease: "no",
    recentSurgery: "no",
    medications: "",
    allergies: "",
    countryOrRegion: "",
    insuranceStatus: "active"
  });

  const primaryDetailGroup = useMemo(() => getDetailGroup(primarySymptom), [primarySymptom]);
  const detailQuestions = useMemo(() => getDetailQuestionsForPrimary(primarySymptom), [primarySymptom]);
  const selectedRedFlags = useMemo(() => Object.entries(redFlags).filter(([, selected]) => selected).map(([id]) => id), [redFlags]);
  const selectedImpact = useMemo(() => Object.entries(functionImpact).filter(([, selected]) => selected).map(([id]) => id), [functionImpact]);

  const isCrisisSelected =
    symptoms.includes("suicidal-thoughts") ||
    symptoms.includes("self-harm-thoughts") ||
    details.suicidalThoughts === "yes" ||
    details.selfHarmThoughts === "yes" ||
    details.immediateDanger === "yes" ||
    redFlags.suicidalThoughts ||
    redFlags.selfHarmThoughts;

  function toggleSymptom(symptom: string) {
    const nextSymptoms = symptoms.includes(symptom) ? symptoms.filter((item) => item !== symptom) : [...symptoms, symptom];
    setSymptoms(nextSymptoms);
    if (primarySymptom === symptom && !nextSymptoms.includes(symptom)) setPrimarySymptom("");
    setFormError("");
  }

  function updateDetail(question: string, value: string) {
    setDetails((current) => ({ ...current, [question]: value }));
    setFormError("");
  }

  function validateStep(currentStep = step) {
    if (currentStep === 1 && symptoms.length === 0) return "symptom.errors.selectAtLeastOneSymptom";
    if (currentStep === 1 && !primarySymptom) return "symptom.errors.selectPrimarySymptom";
    if (currentStep === 6 && background.age.trim()) {
      const age = Number(background.age);
      if (!Number.isInteger(age) || age < 0 || age > 120) return "symptom.errors.invalidAge";
    }
    return "";
  }

  function goNext() {
    const error = validateStep();
    if (error) {
      setFormError(error);
      return;
    }
    setFormError("");
    setStep((current) => Math.min(TOTAL_STEPS, current + 1));
  }

  function resetCrisisSelection() {
    setSymptoms((current) => current.filter((item) => item !== "suicidal-thoughts" && item !== "self-harm-thoughts"));
    setDetails((current) => ({ ...current, suicidalThoughts: "no", selfHarmThoughts: "no", immediateDanger: "no" }));
    setRedFlags((current) => ({ ...current, suicidalThoughts: false, selfHarmThoughts: false }));
    setPrimarySymptom("");
    setStep(1);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const error = validateStep(6);
    if (error) {
      setFormError(error);
      return;
    }
    const result = evaluateTriage({
      symptoms,
      primarySymptom,
      duration,
      severity,
      redFlags: selectedRedFlags,
      details: {
        ...details,
        painScore,
        trend,
        functionImpact: JSON.stringify(functionImpact)
      },
      healthBackground: background
    });
    const saved: SavedSymptomCheck = {
      id: `check_${Date.now()}`,
      createdAt: new Date().toISOString(),
      symptoms,
      primarySymptom,
      duration,
      severity,
      redFlags: selectedRedFlags,
      healthBackground: background,
      result
    };
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(SESSION_RESULT_KEY, JSON.stringify(saved));
      writeSymptomChecks([saved, ...readSymptomChecks()]);
    }
    router.push("/result");
  }

  function renderChoiceGroup(items: { value: string; labelKey: string }[], value: string, onChange: (value: string) => void) {
    return (
      <div className="choice-grid compact-choice-grid">
        {items.map((item) => (
          <label className="choice-pill" key={item.value}>
            <input checked={value === item.value} onChange={() => onChange(item.value)} type="radio" />
            {t(item.labelKey)}
          </label>
        ))}
      </div>
    );
  }

  function renderDetailQuestion(question: DetailQuestion) {
    if (question.type === "choice" && question.options) {
      return (
        <div className="detail-question" key={question.id}>
          <p>{t(question.labelKey)}</p>
          {renderChoiceGroup(question.options, details[question.id] ?? "", (value) => updateDetail(question.id, value))}
        </div>
      );
    }
    return (
      <label className="form-field" key={question.id}>
        {t(question.labelKey)}
        <input value={details[question.id] ?? ""} onChange={(event) => updateDetail(question.id, event.target.value)} />
      </label>
    );
  }

  return (
    <section className="app-page symptom-app-page">
      <div className="intro-card app-page-header">
        <div>
          <p className="eyebrow">{t("symptom.eyebrow")}</p>
          <h1>{t("symptom.title")}</h1>
          <p>{t("symptom.subtitle")}</p>
          <p>{t("symptom.stepOf").replace("{step}", String(step)).replace("{total}", String(TOTAL_STEPS))}</p>
        </div>
        <IllustrationImage variant="section" src="/images/illustration-symptom-triage-doctor.png" alt="Doctor reviewing symptom triage icons" />
      </div>

      {isCrisisSelected ? (
        <section className="panel crisis-card">
          <h2>{t("symptom.crisis.title")}</h2>
          <p>{t("symptom.crisis.description")}</p>
          <p><strong>{t("symptom.crisis.seekImmediateHelp")}</strong></p>
          <p>{t("symptom.crisis.localEmergency")}</p>
          <p>{t("symptom.crisis.notAlone")}</p>
          <button className="btn-secondary" onClick={resetCrisisSelection} type="button">
            {t("symptom.reviewAnswers")}
          </button>
        </section>
      ) : null}

      {!isCrisisSelected ? (
        <form className="triage-workflow" onSubmit={onSubmit}>
          {step === 1 ? (
            <article className="panel workflow-step">
              <span>{t("symptom.stepChoose")}</span>
              <h2>{t("symptom.chooseSymptoms")}</h2>
              <p>{t("symptom.chooseSymptomsDesc")} {t("symptom.selectAllThatApply")}</p>
              <div className="symptom-category-grid">
                {symptomCategories.map((category) => (
                  <section className="symptom-category-card" key={category.id}>
                    <h3>{t(category.labelKey)}</h3>
                    <div className="choice-grid">
                      {category.symptoms.map((symptom) => (
                        <label key={symptom.id} className={`choice-pill${symptom.redFlagWeight && symptom.redFlagWeight >= 5 ? " danger-choice" : ""}`}>
                          <input checked={symptoms.includes(symptom.value)} onChange={() => toggleSymptom(symptom.value)} type="checkbox" />
                          {t(symptom.labelKey)}
                        </label>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
              <label className="form-field">
                {t("symptom.primarySymptom")}
                <select value={primarySymptom} onChange={(event) => setPrimarySymptom(event.target.value)}>
                  <option value="">{t("symptom.primarySymptomRequired")}</option>
                  {symptoms.map((symptom) => <option key={symptom} value={symptom}>{t(symptomItemKey(symptom))}</option>)}
                </select>
              </label>
            </article>
          ) : null}

          {step === 2 ? (
            <article className="panel workflow-step">
              <span>{t("symptom.stepMainDetails")}</span>
              <h2>{t("symptom.primaryDetails").replace("{symptom}", primarySymptom ? t(symptomItemKey(primarySymptom)) : t("symptom.primarySymptom"))}</h2>
              <p>{t("symptom.tailoredQuestions").replace("{category}", t(`symptom.detailGroups.${primaryDetailGroup}`))}</p>
              <div className="form-grid-two detail-question-grid">
                {detailQuestions.map((question) => renderDetailQuestion(question))}
              </div>
            </article>
          ) : null}

          {step === 3 ? (
            <article className="panel workflow-step">
              <span>{t("symptom.stepDurationTrend")}</span>
              <h2>{t("symptom.durationTrend")}</h2>
              <p>{t("symptom.durationQuestion")}</p>
              {renderChoiceGroup(durations, duration, setDuration)}
              <p>{t("symptom.trendQuestion")}</p>
              {renderChoiceGroup(trends, trend, setTrend)}
            </article>
          ) : null}

          {step === 4 ? (
            <article className="panel workflow-step">
              <span>{t("symptom.stepSeverityImpact")}</span>
              <h2>{t("symptom.severityImpact")}</h2>
              <p>{t("symptom.severityQuestion")}</p>
              {renderChoiceGroup(severities, severity, setSeverity)}
              <label className="form-field">
                {t("symptom.painScore")}: {painScore}
                <input min="0" max="10" value={painScore} onChange={(event) => setPainScore(event.target.value)} type="range" />
              </label>
              <p>{t("symptom.functionImpact")}</p>
              <div className="choice-grid">
                {functionImpactOptions.map((item) => (
                  <label className="choice-pill" key={item.value}>
                    <input
                      checked={functionImpact[item.value]}
                      onChange={() => setFunctionImpact((current) => ({ ...current, [item.value]: !current[item.value] }))}
                      type="checkbox"
                    />
                    {t(item.labelKey)}
                  </label>
                ))}
              </div>
            </article>
          ) : null}

          {step === 5 ? (
            <article className="panel workflow-step">
              <span>{t("symptom.stepRedFlags")}</span>
              <h2>{t("symptom.redFlags")}</h2>
              <p>{t("symptom.redFlagQuestion")}</p>
              <div className="symptom-category-grid">
                {redFlagGroups.map((group) => (
                  <section className="symptom-category-card" key={group.id}>
                    <h3>{t(group.labelKey)}</h3>
                    <div className="choice-grid">
                      {group.items.map((item) => (
                        <label className="choice-pill danger-choice" key={item.id}>
                          <input
                            checked={redFlags[item.value]}
                            onChange={() => setRedFlags((current) => ({ ...current, [item.value]: !current[item.value] }))}
                            type="checkbox"
                          />
                          {t(item.labelKey)}
                        </label>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </article>
          ) : null}

          {step === 6 ? (
            <article className="panel workflow-step">
              <span>{t("symptom.stepBackground")}</span>
              <h2>{t("symptom.healthBackground")}</h2>
              <div className="form-grid-two">
                {textBackgroundFields.map((key) => (
                  <label className="form-field" key={key}>
                    {t(backgroundFieldKey(key))}
                    <input value={background[key] ?? ""} onChange={(event) => setBackground({ ...background, [key]: event.target.value })} />
                  </label>
                ))}
              </div>
              <div className="choice-grid">
                {booleanBackgroundFields.map((key) => (
                  <label className="choice-pill" key={key}>
                    <input
                      checked={background[key] === "yes"}
                      onChange={() => setBackground((current) => ({ ...current, [key]: current[key] === "yes" ? "no" : "yes" }))}
                      type="checkbox"
                    />
                    {t(backgroundFieldKey(key))}
                  </label>
                ))}
              </div>
            </article>
          ) : null}

          {step === 7 ? (
            <article className="panel workflow-step">
              <span>{t("symptom.stepReview")}</span>
              <h2>{t("symptom.reviewConfirm")}</h2>
              <div className="review-grid">
                <div><strong>{t("symptom.primarySymptom")}</strong><span>{primarySymptom ? t(symptomItemKey(primarySymptom)) : t("common.notSelected")}</span></div>
                <div><strong>{t("symptom.selectedSymptoms")}</strong><span>{symptoms.map((item) => t(symptomItemKey(item))).join(", ")}</span></div>
                <div><strong>{t("symptom.duration")}</strong><span>{t(durations.find((item) => item.value === duration)?.labelKey ?? "common.notSelected")}</span></div>
                <div><strong>{t("symptom.trend")}</strong><span>{t(trends.find((item) => item.value === trend)?.labelKey ?? "common.notSelected")}</span></div>
                <div><strong>{t("symptom.severity")}</strong><span>{t(severities.find((item) => item.value === severity)?.labelKey ?? "common.notSelected")}</span></div>
                <div><strong>{t("symptom.painScore")}</strong><span>{painScore}</span></div>
                <div><strong>{t("symptom.redFlags")}</strong><span>{selectedRedFlags.length ? selectedRedFlags.map((item) => t(`symptom.redFlags.${item}`)).join(", ") : t("symptom.noRedFlagsSelected")}</span></div>
                <div><strong>{t("symptom.functionImpact")}</strong><span>{selectedImpact.length ? selectedImpact.map((item) => t(`symptom.impact.${item}`)).join(", ") : t("common.none")}</span></div>
              </div>
            </article>
          ) : null}

          <div className="workflow-actions">
            {formError ? <p className="inline-error">{t(formError)}</p> : null}
            <button className="btn-secondary" disabled={step === 1} onClick={() => setStep((current) => Math.max(1, current - 1))} type="button">
              {step === TOTAL_STEPS ? t("symptom.backToEdit") : t("symptom.back")}
            </button>
            {step < TOTAL_STEPS ? (
              <button className="btn-primary" onClick={goNext} type="button">
                {t("symptom.continue")}
              </button>
            ) : (
              <button className="btn-primary" type="submit">
                {t("symptom.generateCareGuidance")}
              </button>
            )}
          </div>
        </form>
      ) : null}

      <DisclaimerBox text={t("safety.medical")} />
    </section>
  );
}
