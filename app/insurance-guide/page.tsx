"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Card,
  IconCircle,
  InsuranceConceptCard,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  StatusBadge
} from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";

const STORAGE_KEY = "healthmatchai_insurance_checklists";

type SavedChecklist = {
  id: string;
  careType: string;
  questions: string[];
  createdAt: string;
};

const insuranceStatuses = [
  { key: "has", labelKey: "insurance.status.has" },
  { key: "no", labelKey: "insurance.status.no" },
  { key: "notSure", labelKey: "insurance.status.notSure" },
  { key: "lost", labelKey: "insurance.status.lost" },
  { key: "special", labelKey: "insurance.status.special" }
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
  { key: "chronicCare", labelKey: "insurance.scenario.chronicCare" }
] as const;

const concepts = [
  ["insurance.copay", "insurance.copayDesc", "warning"],
  ["insurance.deductible", "insurance.deductibleDesc", "primary"],
  ["insurance.coinsurance", "insurance.coinsuranceDesc", "teal"],
  ["insurance.outOfPocket", "insurance.outOfPocketDesc", "purple"],
  ["insurance.inNetwork", "insurance.inNetworkDesc", "success"],
  ["insurance.outOfNetwork", "insurance.outOfNetworkDesc", "danger"],
  ["insurance.priorAuthorization", "insurance.priorAuthorizationDesc", "warning"],
  ["insurance.eob", "insurance.eobDesc", "primary"],
  ["insurance.itemizedBill", "insurance.itemizedBillDesc", "teal"]
] as const;

// ---- OLD CHECKLIST BUILDER (collapsed under "Already insured?") ----

const careTypes = [
  { key: "urgent", labelKey: "insurance.careType.urgent" },
  { key: "primary", labelKey: "insurance.careType.primary" },
  { key: "telehealth", labelKey: "insurance.careType.telehealth" },
  { key: "lab", labelKey: "insurance.careType.lab" },
  { key: "pharmacy", labelKey: "insurance.careType.pharmacy" },
  { key: "followUp", labelKey: "insurance.careType.followUp" },
  { key: "emergency", labelKey: "insurance.careType.emergency" },
  { key: "notSure", labelKey: "insurance.careType.notSure" }
] as const;

const primaryConcerns = [
  { key: "network", labelKey: "insurance.concern.network" },
  { key: "estimatedCost", labelKey: "insurance.concern.estimatedCost" },
  { key: "copay", labelKey: "insurance.concern.copay" },
  { key: "deductible", labelKey: "insurance.concern.deductible" },
  { key: "separateBilling", labelKey: "insurance.concern.separateBilling" },
  { key: "documents", labelKey: "insurance.concern.documents" }
] as const;

const moreConcerns = [
  { key: "priorAuth", labelKey: "insurance.concern.priorAuth" },
  { key: "telehealthCoverage", labelKey: "insurance.concern.telehealthCoverage" },
  { key: "billingIssues", labelKey: "insurance.concern.billingIssues" }
] as const;

const allConcerns = [...primaryConcerns, ...moreConcerns] as const;

type CareTypeKey = (typeof careTypes)[number]["key"];
type ConcernKey = (typeof allConcerns)[number]["key"];

const defaultConcernMap: Record<CareTypeKey, ConcernKey[]> = {
  emergency: ["estimatedCost", "billingIssues"],
  urgent: ["network", "estimatedCost", "copay", "deductible", "separateBilling", "priorAuth", "documents"],
  primary: ["network", "copay", "documents"],
  telehealth: ["telehealthCoverage", "copay", "network"],
  lab: ["network", "deductible", "priorAuth", "separateBilling"],
  pharmacy: ["estimatedCost", "priorAuth"],
  followUp: ["network", "copay", "deductible"],
  notSure: []
};

const questionKeyMap: Partial<Record<CareTypeKey, Partial<Record<ConcernKey, string[]>>>> = {
  emergency: {
    estimatedCost: ["insurance.checklist.emergency.2"],
    billingIssues: ["insurance.checklist.emergency.3", "insurance.checklist.emergency.4"]
  },
  urgent: {
    network: ["insurance.checklist.urgent.network"],
    estimatedCost: ["insurance.checklist.urgent.estimatedCost"],
    copay: ["insurance.checklist.urgent.copay"],
    deductible: ["insurance.checklist.urgent.deductible"],
    separateBilling: ["insurance.checklist.urgent.separateBilling"],
    priorAuth: ["insurance.checklist.urgent.priorAuth"],
    documents: ["insurance.checklist.urgent.documents"]
  },
  primary: {
    network: ["insurance.checklist.primary.network"],
    copay: ["insurance.checklist.primary.copay"],
    documents: ["insurance.checklist.primary.pcp"],
    priorAuth: ["insurance.checklist.primary.referral"],
    estimatedCost: ["insurance.checklist.primary.copay"]
  },
  telehealth: {
    telehealthCoverage: ["insurance.checklist.telehealth.coverage"],
    copay: ["insurance.checklist.telehealth.copay"],
    network: ["insurance.checklist.telehealth.platforms"],
    documents: ["insurance.checklist.telehealth.orders"],
    priorAuth: ["insurance.checklist.telehealth.orders"]
  },
  lab: {
    network: ["insurance.checklist.lab.network"],
    deductible: ["insurance.checklist.lab.deductible"],
    priorAuth: ["insurance.checklist.lab.priorAuth"],
    separateBilling: ["insurance.checklist.lab.separateBilling"],
    estimatedCost: ["insurance.checklist.lab.deductible"]
  },
  pharmacy: {
    estimatedCost: ["insurance.checklist.pharmacy.coverage", "insurance.checklist.pharmacy.alternative"],
    network: ["insurance.checklist.pharmacy.preferred"],
    priorAuth: ["insurance.checklist.pharmacy.priorAuth"],
    copay: ["insurance.checklist.pharmacy.coverage"],
    deductible: ["insurance.checklist.pharmacy.coverage"]
  },
  followUp: {
    estimatedCost: ["insurance.checklist.followUp.coverage"],
    priorAuth: ["insurance.checklist.followUp.referral"],
    network: ["insurance.checklist.followUp.network"],
    copay: ["insurance.checklist.followUp.copay"],
    deductible: ["insurance.checklist.followUp.coverage"]
  }
};

function buildQuestionKeys(careType: CareTypeKey, activeConcerns: ConcernKey[]) {
  if (careType === "notSure") return [];
  const concernKeys = activeConcerns.length ? activeConcerns : defaultConcernMap[careType];
  const keys = new Set<string>();
  if (careType === "emergency") keys.add("insurance.checklist.emergency.1");
  concernKeys.forEach((concern) => {
    questionKeyMap[careType]?.[concern]?.forEach((key) => keys.add(key));
  });
  if (keys.size === 0) {
    defaultConcernMap[careType].forEach((concern) => {
      questionKeyMap[careType]?.[concern]?.forEach((key) => keys.add(key));
    });
  }
  return Array.from(keys);
}

// ---- MAIN PAGE ----

export default function InsuranceGuidePage() {
  const { t } = useI18n();

  // New coverage guide state
  const [insuranceStatus, setInsuranceStatus] = useState<string>("");
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);

  // Old checklist builder state (collapsed)
  const [selectedCareType, setSelectedCareType] = useState<CareTypeKey>("urgent");
  const [selectedConcerns, setSelectedConcerns] = useState<ConcernKey[]>([]);
  const [generatedType, setGeneratedType] = useState<CareTypeKey>("urgent");
  const [generatedConcernKeys, setGeneratedConcernKeys] = useState<ConcernKey[]>(defaultConcernMap.urgent);
  const [message, setMessage] = useState("");
  const [savedChecklists, setSavedChecklists] = useState<SavedChecklist[]>([]);
  const [viewChecklistId, setViewChecklistId] = useState<string | null>(null);

  const generatedKeys = useMemo(() => buildQuestionKeys(generatedType, generatedConcernKeys), [generatedType, generatedConcernKeys]);
  const generatedQuestions = useMemo(() => generatedKeys.map((key) => t(key)), [generatedKeys, t]);
  const generatedCareLabel = t(careTypes.find((ct) => ct.key === generatedType)?.labelKey ?? "insurance.careType.urgent");
  const copyIntro = t("insurance.copyIntro").replace("{careType}", generatedCareLabel.toLowerCase());
  const copyText = [copyIntro, ...generatedQuestions.map((q) => `- ${q}`)].join("\n");
  const viewedChecklist = savedChecklists.find((item) => item.id === viewChecklistId);

  useEffect(() => {
    setSavedChecklists(readSavedChecklists());
  }, []);

  function readSavedChecklists(): SavedChecklist[] {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  function writeSavedChecklists(next: SavedChecklist[]) {
    setSavedChecklists(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function toggleScenario(key: string) {
    setSelectedScenarios((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  function toggleConcern(concern: ConcernKey) {
    setSelectedConcerns((prev) =>
      prev.includes(concern) ? prev.filter((c) => c !== concern) : [...prev, concern]
    );
  }

  function handleCareTypeChange(next: CareTypeKey) {
    setSelectedCareType(next);
    setSelectedConcerns([]);
    if (next === "notSure") {
      setGeneratedType("notSure");
      setGeneratedConcernKeys([]);
      setMessage("");
    }
  }

  function generateChecklist() {
    if (selectedCareType === "notSure") {
      setGeneratedType("notSure");
      setGeneratedConcernKeys([]);
      setMessage("");
      return;
    }
    setGeneratedType(selectedCareType);
    setGeneratedConcernKeys(selectedConcerns.length ? selectedConcerns : defaultConcernMap[selectedCareType]);
    setMessage(t("insurance.checklistGenerated"));
  }

  function saveChecklist() {
    const payload = {
      id: crypto.randomUUID?.() ?? `${Date.now()}`,
      createdAt: new Date().toISOString(),
      careType: generatedCareLabel,
      questions: generatedQuestions
    };
    writeSavedChecklists([payload, ...savedChecklists]);
    setMessage(t("insurance.checklistSaved"));
  }

  async function copyQuestions() {
    await navigator.clipboard?.writeText(copyText);
    setMessage(t("insurance.questionsCopied"));
  }

  function downloadChecklist(payload: SavedChecklist, filename = "healthmatchai-insurance-checklist.json") {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  function clearChecklist() {
    setSelectedConcerns([]);
    setGeneratedType(selectedCareType === "notSure" ? "urgent" : selectedCareType);
    setGeneratedConcernKeys(selectedCareType === "notSure" ? defaultConcernMap.urgent : defaultConcernMap[selectedCareType]);
    setMessage(t("insurance.checklistCleared"));
  }

  async function copySavedChecklist(item: SavedChecklist) {
    const intro = t("insurance.copyIntro").replace("{careType}", item.careType.toLowerCase());
    await navigator.clipboard?.writeText([intro, "", ...item.questions.map((q) => `- ${q}`)].join("\n"));
    setMessage(t("insurance.questionsCopied"));
  }

  function deleteSavedChecklist(id: string) {
    if (!window.confirm(t("insurance.deleteConfirm"))) return;
    writeSavedChecklists(savedChecklists.filter((item) => item.id !== id));
    if (viewChecklistId === id) setViewChecklistId(null);
    setMessage(t("insurance.checklistDeleted"));
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

      {/* Step 1: Do you have insurance? */}
      <Card className="tool-section">
        <StatusBadge tone="primary">{t("insurance.step1")}</StatusBadge>
        <h2>{t("insurance.step1Title")}</h2>
        <div className="tag-grid concern-grid" style={{ marginTop: 12 }}>
          {insuranceStatuses.map((opt) => (
            <button
              className={`choice-pill ${insuranceStatus === opt.key ? "selected" : ""}`}
              key={opt.key}
              onClick={() => setInsuranceStatus(opt.key)}
              type="button"
            >
              {t(opt.labelKey)}
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
                return scenario ? (
                  <span key={key}>• {t(scenario.labelKey)}</span>
                ) : null;
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
          <a className="btn-primary" href="https://www.healthcare.gov" target="_blank" rel="noopener noreferrer">
            {t("insurance.goToMarketplace")}
          </a>
          <SecondaryButton href="/insurance-guide#cost-builder">
            {t("insurance.prepareQuestions")}
          </SecondaryButton>
        </div>
        <p className="help-text" style={{ marginTop: 12 }}>
          {t("insurance.comingSoonPartner")}
        </p>
      </Card>

      {/* Already insured? — collapsed old checklist builder */}
      <div id="cost-builder" className="scroll-anchor">
      <Card className="tool-section">
        <details>
          <summary>{t("insurance.alreadyInsured")}</summary>
          <p style={{ marginTop: 8 }}>{t("insurance.alreadyInsuredDesc")}</p>

          {/* OLD CHECKLIST BUILDER */}
          <div className="insurance-checklist-builder" style={{ marginTop: 16 }}>
            <div className="card-title-row">
              <div>
                <p className="eyebrow">{t("insurance.checklistBuilderEyebrow")}</p>
                <h3>{t("insurance.beforeCareAsk")}</h3>
              </div>
              {message ? <StatusBadge tone="success">{message}</StatusBadge> : null}
            </div>
            <div className="stepper-grid" style={{ marginTop: 12 }}>
              <div className="step-card">
                <StatusBadge tone="primary">{t("insurance.stepCost1")}</StatusBadge>
                <label>
                  {t("insurance.chooseCareType")}
                  <select value={selectedCareType} onChange={(e) => handleCareTypeChange(e.target.value as CareTypeKey)}>
                    {careTypes.map((ct) => <option key={ct.key} value={ct.key}>{t(ct.labelKey)}</option>)}
                  </select>
                </label>
                <button className="btn-primary" onClick={generateChecklist} type="button" style={{ marginTop: 8 }}>
                  {t("insurance.generateChecklist")}
                </button>
              </div>
              <div className="step-card">
                <StatusBadge tone="teal">{t("insurance.stepCost2")}</StatusBadge>
                <p>{t("insurance.chooseConcernsHelp")}</p>
                <div className="tag-grid concern-grid">
                  {primaryConcerns.map((c) => (
                    <button
                      className={`choice-pill ${selectedConcerns.includes(c.key) ? "selected" : ""}`}
                      key={c.key}
                      onClick={() => toggleConcern(c.key)}
                      type="button"
                    >
                      {t(c.labelKey)}
                    </button>
                  ))}
                </div>
                <details className="more-options">
                  <summary>{t("insurance.moreOptions")}</summary>
                  <div className="tag-grid concern-grid">
                    {moreConcerns.map((c) => (
                      <button
                        className={`choice-pill ${selectedConcerns.includes(c.key) ? "selected" : ""}`}
                        key={c.key}
                        onClick={() => toggleConcern(c.key)}
                        type="button"
                      >
                        {t(c.labelKey)}
                      </button>
                    ))}
                  </div>
                </details>
              </div>
            </div>
            {generatedType !== "notSure" ? (
              <div className="copy-script" style={{ marginTop: 16 }}>
                <strong>{t("insurance.yourQuestionsReady")}</strong>
                <pre>{copyText}</pre>
              </div>
            ) : null}
            <div className="button-pair" style={{ marginTop: 12 }}>
              <button className="btn-primary" disabled={generatedType === "notSure"} onClick={copyQuestions} type="button">{t("insurance.copyQuestions")}</button>
              <button className="btn-secondary" disabled={generatedType === "notSure"} onClick={saveChecklist} type="button">{t("insurance.saveChecklist")}</button>
              <button className="btn-secondary" onClick={clearChecklist} type="button">{t("insurance.clearChecklist")}</button>
            </div>
          </div>

          {/* Saved checklists */}
          {savedChecklists.length > 0 ? (
            <div style={{ marginTop: 24 }}>
              <h3>{t("insurance.savedTitle")}</h3>
              <div className="saved-list">
                {savedChecklists.map((item) => (
                  <article className="saved-row" key={item.id}>
                    <div>
                      <strong>{item.careType}</strong>
                      <span>{t("insurance.questionCount").replace("{count}", `${item.questions.length}`)} · {new Date(item.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="button-pair">
                      <button className="btn-secondary" onClick={() => setViewChecklistId(viewChecklistId === item.id ? null : item.id)} type="button">{t("insurance.viewChecklist")}</button>
                      <button className="btn-secondary" onClick={() => copySavedChecklist(item)} type="button">{t("insurance.copyQuestions")}</button>
                      <button className="btn-secondary" onClick={() => downloadChecklist(item)} type="button">{t("insurance.exportChecklist")}</button>
                      <button className="btn-secondary danger-button" onClick={() => deleteSavedChecklist(item.id)} type="button">{t("common.delete")}</button>
                    </div>
                    {viewedChecklist?.id === item.id ? (
                      <div className="check-list saved-question-list">
                        {item.questions.map((q) => <span key={q}>□ {q}</span>)}
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>
          ) : null}
        </details>
      </Card>
      </div>

      {/* Insurance terms — collapsed */}
      <Card className="tool-section">
        <details>
          <summary>{t("insurance.termsCollapsed")}</summary>
          <div className="concept-grid" style={{ marginTop: 16 }}>
            {concepts.map(([titleKey, descKey, tone]) => (
              <InsuranceConceptCard
                key={titleKey}
                title={t(titleKey)}
                description={`${t(descKey)} ${t(`${titleKey}.example`)} ${t("insurance.costDepends")}`}
                tone={tone}
              />
            ))}
          </div>
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
