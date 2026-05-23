"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { useI18n } from "@/components/i18n-provider";
import { useSettings } from "@/components/settings-provider";
import { IllustrationImage } from "@/components/visual-card";
import {
  getDetailGroup,
  getDetailQuestionsForPrimary,
  redFlagGroups,
  symptomCategories,
  type DetailQuestion
} from "@/lib/symptomLibrary";
import { evaluateTriage } from "@/lib/triageRules";
import { submitTriage, type TriageInput } from "@/lib/api-client";
import { readSymptomChecks, writeSymptomChecks, type SavedSymptomCheck } from "@/lib/settings";
import { backgroundFieldKey, symptomItemKey } from "@/lib/i18n-display";
import type { TriageApiResponse } from "@/lib/types";

const SESSION_RESULT_KEY = "ai-health-match-result";
const TOTAL_STEPS = 7;

const primaryConcerns = [
  {
    id: "fever",
    labelKey: "symptom.concern.fever",
    primarySymptom: "fever",
    symptoms: ["fever", "cough", "sore-throat", "runny-nose", "nasal-congestion", "chills", "fatigue", "body-aches", "headache", "rash", "stiff-neck", "shortness-of-breath", "chest-pain"]
  },
  {
    id: "breathing",
    labelKey: "symptom.concern.breathing",
    primarySymptom: "cough",
    symptoms: ["cough", "shortness-of-breath", "chest-tightness", "wheezing", "chest-pain", "fever", "fatigue", "blueOrGrayLips"]
  },
  {
    id: "chest",
    labelKey: "symptom.concern.chest",
    primarySymptom: "chest-pain",
    symptoms: ["chest-pain", "chest-pressure", "shortness-of-breath", "radiating-pain", "sweating-or-nausea", "dizziness", "heart-disease-history"]
  },
  {
    id: "abdominal",
    labelKey: "symptom.concern.abdominal",
    primarySymptom: "abdominal-pain",
    symptoms: ["abdominal-pain", "nausea", "vomiting", "diarrhea", "constipation", "bloating", "blood-in-stool", "black-stool", "loss-of-appetite", "fever", "pregnancy-concern"]
  },
  {
    id: "neurological",
    labelKey: "symptom.concern.neurological",
    primarySymptom: "headache",
    symptoms: ["headache", "dizziness", "confusion", "fainting", "numbness", "weakness", "vision-changes", "trouble-speaking", "balance-problems", "seizure"]
  },
  {
    id: "skin",
    labelKey: "symptom.concern.skin",
    primarySymptom: "rash",
    symptoms: ["rash", "itching", "hives", "swelling", "skin-redness", "blister", "wound", "burn", "severe-allergic-reaction", "shortness-of-breath"]
  },
  {
    id: "urinary",
    labelKey: "symptom.concern.urinary",
    primarySymptom: "painful-urination",
    symptoms: ["painful-urination", "frequent-urination", "urinary-urgency", "difficulty-urinating", "blood-in-urine", "lower-abdominal-pain", "flank-pain", "fever"]
  },
  {
    id: "mental",
    labelKey: "symptom.concern.mental",
    primarySymptom: "anxiety",
    symptoms: ["anxiety", "panic-feeling", "low-mood", "stress", "suicidal-thoughts", "self-harm-thoughts", "immediate-danger"]
  },
  {
    id: "other",
    labelKey: "symptom.concern.other",
    primarySymptom: "feeling-very-unwell",
    symptoms: ["feeling-very-unwell", "fatigue", "body-aches", "chills", "recent-injury", "recent-surgery-concern", "medication-reaction-concern", "dehydration"]
  }
] as const;

type PrimaryConcernId = (typeof primaryConcerns)[number]["id"];

const symptomItemsByValue = new Map(symptomCategories.flatMap((category) => category.symptoms.map((symptom) => [symptom.value, symptom])));

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

const ageOptions = Array.from({ length: 100 }, (_, i) => `${i + 1}`).concat(["100+"]);

const sexOptions = [
  { value: "female", labelKey: "health.sex.female" },
  { value: "male", labelKey: "health.sex.male" },
  { value: "intersex", labelKey: "health.sex.intersex" },
  { value: "preferNotToSay", labelKey: "health.sex.preferNotToSay" }
];

const pregnancyOptions = [
  { value: "notPregnant", labelKey: "health.pregnancy.notPregnant" },
  { value: "pregnant", labelKey: "health.pregnancy.pregnant" },
  { value: "possiblyPregnant", labelKey: "health.pregnancy.possiblyPregnant" },
  { value: "recentlyGaveBirth", labelKey: "health.pregnancy.recentlyGaveBirth" },
  { value: "notApplicable", labelKey: "health.pregnancy.notApplicable" },
  { value: "preferNotToSay", labelKey: "health.pregnancy.preferNotToSay" }
];

const chronicConditionOptions = [
  { value: "none", labelKey: "health.chronic.none" },
  { value: "diabetes", labelKey: "health.chronic.diabetes" },
  { value: "highBloodPressure", labelKey: "health.chronic.highBloodPressure" },
  { value: "heartDisease", labelKey: "health.chronic.heartDisease" },
  { value: "asthmaOrCopd", labelKey: "health.chronic.asthmaOrCopd" },
  { value: "kidneyDisease", labelKey: "health.chronic.kidneyDisease" },
  { value: "immuneCondition", labelKey: "health.chronic.immuneCondition" },
  { value: "cancerTreatment", labelKey: "health.chronic.cancerTreatment" },
  { value: "recentSurgery", labelKey: "health.chronic.recentSurgery" },
  { value: "other", labelKey: "health.chronic.other" }
];

const allergyOptions = [
  { value: "none", labelKey: "health.allergy.none" },
  { value: "medication", labelKey: "health.allergy.medication" },
  { value: "food", labelKey: "health.allergy.food" },
  { value: "latex", labelKey: "health.allergy.latex" },
  { value: "environmental", labelKey: "health.allergy.environmental" },
  { value: "other", labelKey: "health.allergy.other" }
];

const countryOptions = [
  { value: "United States", labelKey: "health.country.us" },
  { value: "Canada", labelKey: "health.country.canada" },
  { value: "United Kingdom", labelKey: "health.country.uk" },
  { value: "Australia", labelKey: "health.country.australia" },
  { value: "Japan", labelKey: "health.country.japan" },
  { value: "China", labelKey: "health.country.china" },
  { value: "European Union", labelKey: "health.country.eu" },
  { value: "Other", labelKey: "health.country.other" }
];

const insuranceStatusOptions = [
  { value: "hasInsurance", labelKey: "health.insurance.has" },
  { value: "noInsurance", labelKey: "health.insurance.no" },
  { value: "notSure", labelKey: "health.insurance.notSure" },
  { value: "lostCoverage", labelKey: "health.insurance.lost" },
  { value: "student", labelKey: "health.insurance.student" },
  { value: "travel", labelKey: "health.insurance.travel" },
  { value: "employer", labelKey: "health.insurance.employer" },
  { value: "government", labelKey: "health.insurance.government" },
  { value: "notApplicable", labelKey: "health.insurance.notApplicable" }
];

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
  const { settings } = useSettings();
  const [step, setStep] = useState(1);
  const [primaryConcern, setPrimaryConcern] = useState<PrimaryConcernId | "">("");
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
  const [submitting, setSubmitting] = useState(false);
  const [background, setBackground] = useState<Record<string, string>>({
    age: "",
    sex: "",
    pregnancyStatus: "",
    chronicConditions: "",
    medications: "",
    allergies: "",
    countryRegion: "",
    insuranceStatus: ""
  });
  const [saveAsProfile, setSaveAsProfile] = useState(false);

  const primaryDetailGroup = useMemo(() => getDetailGroup(primarySymptom), [primarySymptom]);
  const detailQuestions = useMemo(() => getDetailQuestionsForPrimary(primarySymptom), [primarySymptom]);
  const selectedRedFlags = useMemo(() => Object.entries(redFlags).filter(([, selected]) => selected).map(([id]) => id), [redFlags]);
  const selectedImpact = useMemo(() => Object.entries(functionImpact).filter(([, selected]) => selected).map(([id]) => id), [functionImpact]);
  const activeConcern = useMemo(() => primaryConcerns.find((item) => item.id === primaryConcern), [primaryConcern]);
  const associatedSymptoms = useMemo(() => activeConcern?.symptoms ?? [], [activeConcern]);

  const isCrisisSelected =
    symptoms.includes("suicidal-thoughts") ||
    symptoms.includes("self-harm-thoughts") ||
    symptoms.includes("immediate-danger") ||
    details.suicidalThoughts === "yes" ||
    details.selfHarmThoughts === "yes" ||
    details.immediateDanger === "yes" ||
    redFlags.suicidalThoughts ||
    redFlags.selfHarmThoughts;

  useEffect(() => {
    const profile = settings.healthProfile;
    const insurance = settings.insuranceProfile;
    setBackground((current) => ({
      ...current,
      age: current.age || profile.age || "",
      sex: current.sex || profile.sex || "",
      pregnancyStatus: current.pregnancyStatus || profile.pregnancyStatus || "",
      chronicConditions: current.chronicConditions || [...profile.chronicConditions, ...profile.highRiskConditions].join(", "),
      medications: current.medications || profile.medications.join(", "),
      allergies: current.allergies || profile.allergies.join(", "),
      countryRegion: current.countryRegion || profile.countryRegion || "",
      insuranceStatus: current.insuranceStatus || insurance.status || ""
    }));
  }, [settings.healthProfile, settings.insuranceProfile]);

  function toggleSymptom(symptom: string) {
    const nextSymptoms = symptoms.includes(symptom) ? symptoms.filter((item) => item !== symptom) : [...symptoms, symptom];
    setSymptoms(nextSymptoms);
    if (primarySymptom === symptom && !nextSymptoms.includes(symptom)) setPrimarySymptom("");
    setFormError("");
  }

  function choosePrimaryConcern(concernId: PrimaryConcernId) {
    const concern = primaryConcerns.find((item) => item.id === concernId);
    if (!concern) return;
    setPrimaryConcern(concernId);
    setPrimarySymptom(concern.primarySymptom);
    setSymptoms([concern.primarySymptom]);
    setDetails({});
    setFormError("");
  }

  function updateDetail(question: string, value: string) {
    setDetails((current) => ({ ...current, [question]: value }));
    setFormError("");
  }

  function validateStep(currentStep = step) {
    if (currentStep === 1 && !primaryConcern) return "symptom.errors.selectPrimaryConcern";
    if (currentStep === 2 && symptoms.length === 0) return "symptom.errors.selectAtLeastOneSymptom";
    if (currentStep === 2 && (!primarySymptom || !symptoms.includes(primarySymptom))) return "symptom.errors.selectPrimarySymptom";
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

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step !== TOTAL_STEPS) {
      goNext();
      return;
    }
    const error = validateStep(TOTAL_STEPS);
    if (error) {
      setFormError(error);
      return;
    }

    setFormError("");
    setSubmitting(true);

    // 1. Run local triage for immediate crisis/emergency detection
    const localResult = evaluateTriage({
      symptoms,
      selectedSymptoms: symptoms,
      primarySymptom,
      duration,
      trend,
      severity,
      painScore,
      functionImpact,
      redFlags: selectedRedFlags,
      details: {
        ...details,
        painScore,
        trend,
        functionImpact: JSON.stringify(functionImpact)
      },
      healthBackground: background
    });

    // 2. Submit to backend for authoritative result + AI content
    let backendResult: TriageApiResponse | null = null;
    try {
      const triageInput: TriageInput = {
        symptoms,
        primarySymptom,
        duration,
        trend,
        severity,
        painScore,
        redFlags: selectedRedFlags,
        functionImpact: Object.entries(functionImpact).filter(([, v]) => v).map(([k]) => k),
        healthBackground: background,
        details,
        primaryConcern,
        outputLanguage: settings.language,
      };
      backendResult = await submitTriage(triageInput);
    } catch (err) {
      console.error("Backend triage failed, using local result:", err);
    }

    // 3. Merge results: local triage for emergency/crisis detection, backend for AI content
    const finalResult = backendResult ? {
      ...backendResult,
      // Never downgrade crisis/emergency from local rules
      riskLevel: (localResult.riskLevel === "Crisis" || localResult.riskLevel === "Emergency")
        ? localResult.riskLevel
        : backendResult.riskLevel,
      recommendedCare: (localResult.riskLevel === "Crisis" || localResult.riskLevel === "Emergency")
        ? localResult.recommendedCare
        : backendResult.recommendedCare,
    } : localResult;

    const saved: SavedSymptomCheck = {
      id: backendResult?.referenceId || `check_${Date.now()}`,
      createdAt: new Date().toISOString(),
      input: {
        selectedSymptoms: symptoms,
        primarySymptom,
        primaryConcern,
        details,
        duration,
        trend,
        severity,
        painScore,
        functionImpact,
        redFlags,
        healthBackground: background
      },
      symptoms,
      primarySymptom,
      duration,
      severity,
      redFlags: selectedRedFlags,
      healthBackground: background,
      result: finalResult as unknown as SavedSymptomCheck["result"],
    };

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(SESSION_RESULT_KEY, JSON.stringify(saved));
      writeSymptomChecks([saved, ...readSymptomChecks()]);
    }

    setSubmitting(false);
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
              <h2>{t("symptom.mainConcernTitle")}</h2>
              <p>{t("symptom.mainConcernHelp")}</p>
              <div className="choice-grid concern-choice-grid">
                {primaryConcerns.map((concern) => (
                  <label className={`choice-pill primary-choice-pill${primaryConcern === concern.id ? " selected" : ""}`} key={concern.id}>
                    <input checked={primaryConcern === concern.id} onChange={() => choosePrimaryConcern(concern.id)} type="radio" />
                    {t(concern.labelKey)}
                  </label>
                ))}
              </div>
            </article>
          ) : null}

          {step === 2 ? (
            <article className="panel workflow-step">
              <span>{t("symptom.stepAssociated")}</span>
              <h2>{t("symptom.associatedSymptoms")}</h2>
              <p>{t("symptom.associatedSymptomsHelp")}</p>
              <div className="choice-grid associated-symptom-grid">
                {associatedSymptoms.map((symptomValue) => {
                  const symptom = symptomItemsByValue.get(symptomValue);
                  const labelKey = symptom?.labelKey ?? symptomItemKey(symptomValue);
                  const danger = Boolean((symptom?.redFlagWeight && symptom.redFlagWeight >= 5) || ["blueOrGrayLips", "immediate-danger"].includes(symptomValue));
                  return (
                    <label key={symptomValue} className={`choice-pill${danger ? " danger-choice" : ""}`}>
                      <input checked={symptoms.includes(symptomValue)} onChange={() => toggleSymptom(symptomValue)} type="checkbox" />
                      {t(labelKey)}
                    </label>
                  );
                })}
              </div>
              <section className="primary-symptom-card">
                <div>
                  <h3>{t("symptom.mainSymptom")}</h3>
                  {symptoms.length > 0 ? (
                    <>
                      <p>{t("symptom.selectedSymptomCount").replace("{{count}}", String(symptoms.length))}</p>
                      <p>{t("symptom.chooseMainSymptom")}</p>
                    </>
                  ) : (
                    <p>{t("symptom.selectSymptomsFirst")}</p>
                  )}
                </div>
                {symptoms.length > 0 ? (
                  <div className="choice-grid compact-choice-grid">
                    {symptoms.map((symptom) => (
                      <label className="choice-pill primary-choice-pill" key={symptom}>
                        <input checked={primarySymptom === symptom} onChange={() => setPrimarySymptom(symptom)} type="radio" />
                        {t(symptomItemKey(symptom))}
                      </label>
                    ))}
                  </div>
                ) : null}
                {symptoms.length > 0 && !primarySymptom ? <p className="inline-error">{t("symptom.mainSymptomRequired")}</p> : null}
              </section>
            </article>
          ) : null}

          {step === 3 ? (
            <article className="panel workflow-step">
              <span>{t("symptom.stepMainDetails")}</span>
              <h2>{t("symptom.primaryDetails").replace("{symptom}", primarySymptom ? t(symptomItemKey(primarySymptom)) : t("symptom.primarySymptom"))}</h2>
              <p>{t("symptom.tailoredQuestions").replace("{category}", t(`symptom.detailGroups.${primaryDetailGroup}`))}</p>
              <div className="form-grid-two detail-question-grid">
                {detailQuestions.map((question) => renderDetailQuestion(question))}
              </div>
            </article>
          ) : null}

          {step === 4 ? (
            <article className="panel workflow-step">
              <span>{t("symptom.stepDurationTrend")}</span>
              <h2>{t("symptom.durationTrend")}</h2>
              <p>{t("symptom.durationQuestion")}</p>
              {renderChoiceGroup(durations, duration, setDuration)}
              <p>{t("symptom.trendQuestion")}</p>
              {renderChoiceGroup(trends, trend, setTrend)}
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

              {/* Age — select */}
              <div className="form-grid-two">
                <label className="form-field">
                  {t("health.age")}
                  <select value={background.age ?? ""} onChange={(e) => setBackground({ ...background, age: e.target.value })}>
                    <option value="">{t("common.notSelected")}</option>
                    {ageOptions.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </label>

                {/* Sex — select */}
                <label className="form-field">
                  {t("health.sex")}
                  <select value={background.sex ?? ""} onChange={(e) => setBackground({ ...background, sex: e.target.value })}>
                    <option value="">{t("common.notSelected")}</option>
                    {sexOptions.map((o) => <option key={o.value} value={o.value}>{t(o.labelKey)}</option>)}
                  </select>
                </label>

                {/* Pregnancy status — select */}
                <label className="form-field">
                  {t("health.pregnancyStatus")}
                  <select value={background.pregnancyStatus ?? ""} onChange={(e) => setBackground({ ...background, pregnancyStatus: e.target.value })}>
                    <option value="">{t("common.notSelected")}</option>
                    {pregnancyOptions.map((o) => <option key={o.value} value={o.value}>{t(o.labelKey)}</option>)}
                  </select>
                </label>

                {/* Country / region — select */}
                <label className="form-field">
                  {t("health.countryRegion")}
                  <select value={background.countryRegion ?? ""} onChange={(e) => setBackground({ ...background, countryRegion: e.target.value })}>
                    <option value="">{t("common.notSelected")}</option>
                    {countryOptions.map((o) => <option key={o.value} value={o.value}>{t(o.labelKey)}</option>)}
                  </select>
                </label>

                {/* Insurance status — select */}
                <label className="form-field">
                  {t("health.insuranceStatus")}
                  <select value={background.insuranceStatus ?? ""} onChange={(e) => setBackground({ ...background, insuranceStatus: e.target.value })}>
                    <option value="">{t("common.notSelected")}</option>
                    {insuranceStatusOptions.map((o) => <option key={o.value} value={o.value}>{t(o.labelKey)}</option>)}
                  </select>
                </label>
              </div>

              {/* Chronic conditions — multi chips */}
              <div style={{ marginTop: 16 }}>
                <p className="help-text">{t("health.chronicConditions")}</p>
                <div className="choice-grid">
                  {chronicConditionOptions.map((o) => {
                    const selected = background.chronicConditions?.includes(o.value);
                    return (
                      <label className={`choice-pill${selected ? " selected" : ""}`} key={o.value}>
                        <input
                          checked={selected}
                          onChange={() => {
                            const current = background.chronicConditions ? background.chronicConditions.split(", ").filter(Boolean) : [];
                            const next = current.includes(o.value) ? current.filter((c) => c !== o.value) : [...current, o.value];
                            setBackground({ ...background, chronicConditions: next.join(", ") });
                          }}
                          type="checkbox"
                        />
                        {t(o.labelKey)}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Medications — text with placeholder */}
              <div className="form-grid-two" style={{ marginTop: 16 }}>
                <label className="form-field" style={{ gridColumn: "1 / -1" }}>
                  {t("health.medications")}
                  <input
                    value={background.medications ?? ""}
                    onChange={(e) => setBackground({ ...background, medications: e.target.value })}
                    placeholder={t("health.medicationsPlaceholder")}
                  />
                </label>
              </div>

              {/* Allergies — multi chips */}
              <div style={{ marginTop: 16 }}>
                <p className="help-text">{t("health.allergies")}</p>
                <div className="choice-grid">
                  {allergyOptions.map((o) => {
                    const selected = background.allergies?.includes(o.value);
                    return (
                      <label className={`choice-pill${selected ? " selected" : ""}`} key={o.value}>
                        <input
                          checked={selected}
                          onChange={() => {
                            const current = background.allergies ? background.allergies.split(", ").filter(Boolean) : [];
                            const next = current.includes(o.value) ? current.filter((a) => a !== o.value) : [...current, o.value];
                            setBackground({ ...background, allergies: next.join(", ") });
                          }}
                          type="checkbox"
                        />
                        {t(o.labelKey)}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Save as health profile */}
              <label className="choice-pill" style={{ marginTop: 20, display: "inline-flex" }}>
                <input
                  checked={saveAsProfile}
                  onChange={() => setSaveAsProfile((p) => !p)}
                  type="checkbox"
                />
                {t("health.saveAsProfile")}
              </label>
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
              <button className="btn-primary" disabled={(step === 1 && !primaryConcern) || (step === 2 && (symptoms.length === 0 || !primarySymptom))} onClick={goNext} type="button">
                {t("symptom.continue")}
              </button>
            ) : (
              <button className="btn-primary" disabled={submitting} type="submit">
                {submitting ? t("pricing.openingCheckout") : t("symptom.generateCareGuidance")}
              </button>
            )}
          </div>
        </form>
      ) : null}

      <DisclaimerBox text={t("safety.short")} />
    </section>
  );
}
