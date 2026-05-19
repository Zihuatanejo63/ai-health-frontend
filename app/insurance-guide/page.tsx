"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Card,
  IconCircle,
  InsuranceConceptCard,
  PageHeader,
  PrimaryButton,
  StatusBadge,
  type Tone
} from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";
import { useSettings } from "@/components/settings-provider";
import { hasUsableInsuranceProfile } from "@/lib/settings";

const STORAGE_KEY = "healthmatchai_insurance_checklists";

type SavedChecklist = {
  id: string;
  careType: string;
  questions: string[];
  createdAt: string;
};

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

const careSettingTips = [
  ["insurance.tip.emergency.title", ["insurance.tip.emergency.1", "insurance.tip.emergency.2", "insurance.tip.emergency.3"], "danger"],
  ["insurance.tip.urgent.title", ["insurance.tip.urgent.1", "insurance.tip.urgent.2", "insurance.tip.urgent.3", "insurance.tip.urgent.4"], "warning"],
  ["insurance.tip.primary.title", ["insurance.tip.primary.1", "insurance.tip.primary.2", "insurance.tip.primary.3"], "primary"],
  ["insurance.tip.telehealth.title", ["insurance.tip.telehealth.1", "insurance.tip.telehealth.2", "insurance.tip.telehealth.3"], "teal"],
  ["care.selfCare", ["insurance.tip.self.1", "insurance.tip.self.2"], "success"]
] as const;

const careTypes = [
  { key: "emergency", labelKey: "insurance.careType.emergency" },
  { key: "urgent", labelKey: "insurance.careType.urgent" },
  { key: "primary", labelKey: "insurance.careType.primary" },
  { key: "telehealth", labelKey: "insurance.careType.telehealth" },
  { key: "lab", labelKey: "insurance.careType.lab" },
  { key: "pharmacy", labelKey: "insurance.careType.pharmacy" },
  { key: "followUp", labelKey: "insurance.careType.followUp" },
  { key: "notSure", labelKey: "insurance.careType.notSure" }
] as const;

const concerns = [
  { key: "network", labelKey: "insurance.concern.network" },
  { key: "estimatedCost", labelKey: "insurance.concern.estimatedCost" },
  { key: "copay", labelKey: "insurance.concern.copay" },
  { key: "deductible", labelKey: "insurance.concern.deductible" },
  { key: "priorAuth", labelKey: "insurance.concern.priorAuth" },
  { key: "separateBilling", labelKey: "insurance.concern.separateBilling" },
  { key: "telehealthCoverage", labelKey: "insurance.concern.telehealthCoverage" },
  { key: "documents", labelKey: "insurance.concern.documents" },
  { key: "billingIssues", labelKey: "insurance.concern.billingIssues" }
] as const;

type CareTypeKey = (typeof careTypes)[number]["key"];
type ConcernKey = (typeof concerns)[number]["key"];

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

export default function InsuranceGuidePage() {
  const { t } = useI18n();
  const { settings } = useSettings();
  const insurance = settings.insuranceProfile;
  const [selectedCareType, setSelectedCareType] = useState<CareTypeKey>("urgent");
  const [selectedConcerns, setSelectedConcerns] = useState<ConcernKey[]>([]);
  const [generatedType, setGeneratedType] = useState<CareTypeKey>("urgent");
  const [generatedConcernKeys, setGeneratedConcernKeys] = useState<ConcernKey[]>(defaultConcernMap.urgent);
  const [message, setMessage] = useState("");
  const [savedChecklists, setSavedChecklists] = useState<SavedChecklist[]>([]);
  const [viewChecklistId, setViewChecklistId] = useState<string | null>(null);
  const hasInsuranceProfile = hasUsableInsuranceProfile(insurance);
  const generatedKeys = useMemo(() => buildQuestionKeys(generatedType, generatedConcernKeys), [generatedType, generatedConcernKeys]);
  const generatedQuestions = useMemo(() => generatedKeys.map((key) => t(key)), [generatedKeys, t]);
  const generatedCareLabel = t(careTypes.find((careType) => careType.key === generatedType)?.labelKey ?? "insurance.careType.urgent");
  const copyIntro = t("insurance.copyIntro").replace("{careType}", generatedCareLabel.toLowerCase());
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

  function displayValue(value: string) {
    return value || t("insurance.notRecorded");
  }

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

  function toggleConcern(concern: ConcernKey) {
    setSelectedConcerns((current) => current.includes(concern) ? current.filter((item) => item !== concern) : [...current, concern]);
  }

  function handleCareTypeChange(nextCareType: CareTypeKey) {
    setSelectedCareType(nextCareType);
    setSelectedConcerns([]);
    if (nextCareType === "notSure") {
      setGeneratedType("notSure");
      setGeneratedConcernKeys([]);
      setMessage("");
    }
  }

  function checklistPayload() {
    return {
      id: crypto.randomUUID?.() ?? `${Date.now()}`,
      createdAt: new Date().toISOString(),
      careType: generatedCareLabel,
      questions: generatedQuestions
    };
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
    const payload = checklistPayload();
    writeSavedChecklists([payload, ...savedChecklists]);
    setMessage(t("insurance.checklistSaved"));
  }

  async function copyQuestions() {
    await navigator.clipboard?.writeText([copyIntro, "", ...generatedQuestions.map((question) => `- ${question}`)].join("\n"));
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

  function exportChecklist() {
    downloadChecklist(checklistPayload());
    setMessage(t("insurance.checklistExported"));
  }

  function clearChecklist() {
    setSelectedConcerns([]);
    setGeneratedType(selectedCareType === "notSure" ? "urgent" : selectedCareType);
    setGeneratedConcernKeys(selectedCareType === "notSure" ? defaultConcernMap.urgent : defaultConcernMap[selectedCareType]);
    setMessage(t("insurance.checklistCleared"));
  }

  async function copySavedChecklist(item: SavedChecklist) {
    const intro = t("insurance.copyIntro").replace("{careType}", item.careType.toLowerCase());
    await navigator.clipboard?.writeText([intro, "", ...item.questions.map((question) => `- ${question}`)].join("\n"));
    setMessage(t("insurance.questionsCopied"));
  }

  function deleteSavedChecklist(id: string) {
    if (!window.confirm(t("insurance.deleteConfirm"))) return;
    writeSavedChecklists(savedChecklists.filter((item) => item.id !== id));
    if (viewChecklistId === id) setViewChecklistId(null);
    setMessage(t("insurance.checklistDeleted"));
  }

  return (
    <section className="app-page">
      <PageHeader
        eyebrow={t("insurance.checklistBuilderEyebrow")}
        title={t("insurance.title")}
        description={t("insurance.description")}
      />

      <Card className="notice-card">
        <IconCircle tone="primary">i</IconCircle>
        <p>{t("insurance.boundaryStatement")}</p>
      </Card>

      <Card className="notice-card red-flag-card">
        <IconCircle tone="danger">!</IconCircle>
        <p><strong>{t("insurance.doNotDelayTitle")}</strong> {t("insurance.doNotDelayText")}</p>
      </Card>

      <div id="checklist-builder" className="scroll-anchor">
      <Card className="insurance-checklist-builder tool-section">
        <div className="card-title-row">
          <div>
            <p className="eyebrow">{t("insurance.checklistBuilderEyebrow")}</p>
            <h2>{t("insurance.beforeCareAsk")}</h2>
          </div>
          {message ? <StatusBadge tone="success">{message}</StatusBadge> : null}
        </div>
        <div className="stepper-grid">
          <div className="step-card">
            <StatusBadge tone="primary">{t("insurance.step1")}</StatusBadge>
            <label>
              {t("insurance.chooseCareType")}
              <select value={selectedCareType} onChange={(event) => handleCareTypeChange(event.target.value as CareTypeKey)}>
                {careTypes.map((careType) => <option key={careType.key} value={careType.key}>{t(careType.labelKey)}</option>)}
              </select>
            </label>
            {selectedCareType === "notSure" ? (
              <div className="empty-inline">
                <p>{t("insurance.notSureHelp")}</p>
                <div className="button-pair">
                  <a className="btn-primary" href="/symptom-check">{t("home.start")}</a>
                  <a className="btn-secondary" href="/care-options">{t("insurance.viewCareGuidance")}</a>
                </div>
              </div>
            ) : null}
            <button className="btn-primary" onClick={generateChecklist} type="button">{t("insurance.generateChecklist")}</button>
          </div>
          <div className="step-card">
            <StatusBadge tone="teal">{t("insurance.step2")}</StatusBadge>
            <p>{t("insurance.chooseConcernsHelp")}</p>
            <div className="tag-grid concern-grid">
              {concerns.map((concern) => (
                <button
                  className={`choice-pill ${selectedConcerns.includes(concern.key) ? "selected" : ""}`}
                  key={concern.key}
                  onClick={() => toggleConcern(concern.key)}
                  type="button"
                >
                  {t(concern.labelKey)}
                </button>
              ))}
            </div>
          </div>
          <div className="step-card">
            <StatusBadge tone="success">{t("insurance.step3")}</StatusBadge>
            <p>{t("insurance.checklistReadyText")}</p>
          </div>
        </div>
        {generatedType === "notSure" ? (
          <div className="empty-inline">
            <p>{t("insurance.notSureHelp")}</p>
            <div className="button-pair">
              <a className="btn-primary" href="/symptom-check">{t("home.start")}</a>
              <a className="btn-secondary" href="/care-options">{t("insurance.viewCareGuidance")}</a>
            </div>
          </div>
        ) : (
          <>
            <div className="copy-script">
              <strong>{t("insurance.yourQuestionsReady")}</strong>
              <p>{copyIntro}</p>
            </div>
            <div className="check-list">
              {generatedQuestions.map((question) => <span key={question}>□ {question}</span>)}
            </div>
          </>
        )}
        <div className="button-pair">
          <button className="btn-primary" disabled={generatedType === "notSure"} onClick={copyQuestions} type="button">{t("insurance.copyQuestions")}</button>
          <button className="btn-secondary" disabled={generatedType === "notSure"} onClick={saveChecklist} type="button">{t("insurance.saveChecklist")}</button>
          <button className="btn-secondary" disabled={generatedType === "notSure"} onClick={exportChecklist} type="button">{t("insurance.exportChecklist")}</button>
          <button className="btn-secondary" onClick={clearChecklist} type="button">{t("insurance.clearChecklist")}</button>
        </div>
      </Card>
      </div>

      <Card className="tool-section">
        <div className="card-title-row">
          <div>
            <p className="eyebrow">{t("insurance.savedEyebrow")}</p>
            <h2>{t("insurance.savedTitle")}</h2>
          </div>
        </div>
        {savedChecklists.length === 0 ? (
          <div className="empty-inline">{t("insurance.noSavedChecklists")}</div>
        ) : (
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
                    {item.questions.map((question) => <span key={question}>□ {question}</span>)}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </Card>

      <Card className="tool-section">
        <h2>{t("insurance.snapshot")}</h2>
        {!hasInsuranceProfile ? (
          <div className="snapshot-empty">
            <p><strong>{t("insurance.noProfileYet")}</strong></p>
            <p>{t("insurance.addProfilePrompt")}</p>
            <PrimaryButton href="/settings#insurance-profile">{t("insurance.addProfile")}</PrimaryButton>
          </div>
        ) : [
          [t("settings.insuranceStatus"), displayValue(insurance.status)],
          [t("settings.planType"), displayValue(insurance.planType)],
          [t("insurance.primaryCopay"), displayValue(insurance.primaryCareCopay)],
          [t("insurance.urgentCopay"), displayValue(insurance.urgentCareCopay || insurance.copay)],
          [t("settings.deductible"), displayValue(insurance.deductible)],
          [t("settings.inNetworkPreference"), displayValue(insurance.inNetworkPreference)],
          [t("insurance.lastUpdated"), t("insurance.notRecorded")]
        ].map(([label, value]) => (
          <div className="snapshot-row" key={label}>
            <span>{label}</span>
            <StatusBadge tone={value === t("insurance.notRecorded") ? "primary" : "success"}>
              {value}
            </StatusBadge>
          </div>
        )).concat([
          <PrimaryButton key="edit-profile" href="/settings#insurance-profile">{t("insurance.editProfile")}</PrimaryButton>
        ])}
      </Card>

      <Card className="tool-section">
        <p className="eyebrow">{t("insurance.settingEyebrow")}</p>
        <h2>{t("insurance.settingTitle")}</h2>
        <div className="care-setting-grid">
          {careSettingTips.map(([title, tips, tone]) => (
            <article className="care-setting-card" key={title}>
              <IconCircle tone={tone as Tone}>{t(title).charAt(0)}</IconCircle>
              <h3>{t(title)}</h3>
              <ul className="tool-check-list">
                {tips.map((tip) => <li key={tip}>{t(tip)}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </Card>

      <Card className="tool-section">
        <p className="eyebrow">{t("insurance.conceptsEyebrow")}</p>
        <h2>{t("insurance.conceptsTitle")}</h2>
        <div className="concept-grid">
          {concepts.map(([title, description, tone]) => (
            <InsuranceConceptCard key={title} title={t(title)} description={`${t(description)} ${t(`${title}.example`)} ${t("insurance.costDepends")}`} tone={tone} />
          ))}
        </div>
      </Card>

      <Card className="tool-section">
        <p className="eyebrow">{t("insurance.afterVisitEyebrow")}</p>
        <h2>{t("insurance.afterVisitTitle")}</h2>
        <ul className="tool-check-list">
          {["insurance.afterVisit.1", "insurance.afterVisit.2", "insurance.afterVisit.3", "insurance.afterVisit.4"].map((key) => <li key={key}>{t(key)}</li>)}
        </ul>
        <p className="fine-print">{t("insurance.afterVisitNote")}</p>
      </Card>

      <Card className="tool-section cta-panel">
        <h2>{t("insurance.bottomCtaTitle")}</h2>
        <div className="button-pair">
          <PrimaryButton href="/symptom-check">{t("home.start")}</PrimaryButton>
          <a className="btn-secondary" href="/care-options">{t("insurance.viewCareGuidance")}</a>
          <a className="btn-secondary" href="/pricing">{t("nav.pricing")}</a>
        </div>
      </Card>
    </section>
  );
}
