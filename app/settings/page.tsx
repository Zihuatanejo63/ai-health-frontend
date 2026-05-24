"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader, SettingsSection, StatusBadge } from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";
import { ConfirmDialog, Modal, Toast } from "@/components/modal";
import {
  DataExportButton,
  EditableProfileCard,
  LanguageSelector,
  SettingsRow
} from "@/components/settings-controls";
import { useSettings } from "@/components/settings-provider";
import { hasUsableInsuranceProfile, type HealthMatchSettings } from "@/lib/settings";
import { logout } from "@/lib/auth-client";
import type { ServerUser } from "@/lib/auth-client";

type ModalType = "account" | "health" | "insurance" | null;

function ListEditor({
  label,
  values,
  onChange,
  addLabel,
  emptyLabel
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  addLabel: string;
  emptyLabel: string;
}) {
  const [draft, setDraft] = useState("");

  function addItem() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onChange([...values, trimmed]);
    setDraft("");
  }

  return (
    <div className="list-editor">
      <label>{label}</label>
      <div className="tag-list">
        {values.length === 0 ? <span className="empty-tag">{emptyLabel}</span> : null}
        {values.map((item) => (
          <button key={item} onClick={() => onChange(values.filter((value) => value !== item))} type="button">
            {item} ×
          </button>
        ))}
      </div>
      <div className="inline-input">
        <input value={draft} onChange={(event) => setDraft(event.target.value)} />
        <button className="btn-secondary" onClick={addItem} type="button">
          {addLabel}
        </button>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const { language, setLanguage, t } = useI18n();
  const { settings, updateSettings, resetAll, clearHistory, serverUser, serverEntitlement, refreshAuth } = useSettings();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [toast, setToast] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [accountDraft, setAccountDraft] = useState(settings.account);
  const [healthDraft, setHealthDraft] = useState(settings.healthProfile);
  const [insuranceDraft, setInsuranceDraft] = useState(settings.insuranceProfile);

  const accountUser: ServerUser | null = serverUser;

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  }

  function openModal(type: ModalType) {
    if (type === "account") {
      if (!accountUser) {
        router.push("/login");
        return;
      }
      setAccountDraft({ name: accountUser.name, email: accountUser.email });
    }
    if (type === "health") setHealthDraft(settings.healthProfile);
    if (type === "insurance") setInsuranceDraft(settings.insuranceProfile);
    setActiveModal(type);
  }

  function savePatch(patch: Partial<HealthMatchSettings>) {
    updateSettings((current) => ({ ...current, ...patch }));
    setActiveModal(null);
    notify(t("settings.saved"));
  }

  function onAccountSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accountUser) return;
    savePatch({ account: accountDraft });
  }

  function onHealthSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    savePatch({ healthProfile: healthDraft });
  }

  function onInsuranceSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    savePatch({ insuranceProfile: { ...insuranceDraft, lastUpdated: new Date().toISOString() } });
  }

  const hasInsuranceProfile = hasUsableInsuranceProfile(settings.insuranceProfile);

  return (
    <section className="app-page settings-page">
      <PageHeader title={t("settings.title")} />

      <SettingsSection title={t("settings.account")} subtitle={t("settings.accountSubtitle")} icon="A">
        <div className="settings-list-control">
          {accountUser ? (
            <>
              <SettingsRow
                label={accountUser.name}
                value={accountUser.email}
                onClick={() => openModal("account")}
              />
              <SettingsRow
                label={t("auth.signOut")}
                onClick={async () => {
                  await logout();
                  await refreshAuth();
                  notify(t("settings.saved"));
                }}
              />
            </>
          ) : (
            <>
              <SettingsRow label={t("auth.notSignedIn")} value={t("auth.createAccountPrompt")} />
              <SettingsRow label={t("auth.signIn")} onClick={() => router.push("/login")} />
              <SettingsRow label={t("auth.createAccount")} onClick={() => router.push("/signup")} />
            </>
          )}
        </div>
      </SettingsSection>

      <SettingsSection title={t("settings.preferences")} subtitle={t("settings.languageSubtitle")} icon="P" tone="primary">
        <LanguageSelector
          value={language}
          onChange={(nextLanguage) => {
            setLanguage(nextLanguage);
            notify(t("settings.saved"));
          }}
        />
      </SettingsSection>

      <SettingsSection title={t("settings.dataManagement")} subtitle={t("settings.dataManagementSubtitle")} icon="D" tone="purple">
        <div className="settings-list-control">
          <DataExportButton settings={settings} onExport={() => notify(t("settings.exported"))}>
            {t("settings.exportData")}
          </DataExportButton>
          <SettingsRow
            label={t("settings.clearHistory")}
            onClick={() => {
              clearHistory();
              notify(t("settings.historyCleared"));
            }}
          />
          <SettingsRow label={t("settings.deleteData")} danger onClick={() => setConfirmDelete(true)} />
        </div>
      </SettingsSection>

      <SettingsSection title={t("settings.savedProfiles")} subtitle={t("settings.healthSubtitle")} icon="H" tone="teal">
        <button className="settings-inline settings-button-inline" onClick={() => openModal("health")} type="button">
          <EditableProfileCard title={t("settings.age")} count={settings.healthProfile.age ? 1 : 0} />
          <EditableProfileCard title={t("settings.sex")} count={settings.healthProfile.sex ? 1 : 0} />
          <EditableProfileCard title={t("settings.medicalConditions")} count={settings.healthProfile.chronicConditions.length} />
          <EditableProfileCard title={t("settings.medications")} count={settings.healthProfile.medications.length} />
          <EditableProfileCard title={t("settings.highRiskConditions")} count={settings.healthProfile.highRiskConditions.length} />
          <span className="chevron">›</span>
        </button>
      </SettingsSection>

      <div id="insurance-profile" className="scroll-anchor">
        <SettingsSection title={t("settings.insuranceProfile")} subtitle={t("settings.insuranceSubtitle")} icon="I" tone="primary">
          <div className="settings-list-control">
            <SettingsRow label={hasInsuranceProfile ? t("settings.primaryInsurance") : t("insurance.noProfileYet")} onClick={() => openModal("insurance")}>
              <StatusBadge tone={hasInsuranceProfile ? "success" : "primary"}>{hasInsuranceProfile ? (settings.insuranceProfile.status || t("common.saved")) : t("insurance.addProfile")}</StatusBadge>
            </SettingsRow>
            {hasInsuranceProfile ? <SettingsRow label={t("settings.insuranceHistory")} onClick={() => openModal("insurance")} /> : null}
          </div>
        </SettingsSection>
      </div>

      <SettingsSection title={t("settings.manageBilling")} subtitle={t("settings.billingSubtitle")} icon="B" tone="warning">
        <div className="settings-list-control">
          <SettingsRow label={t("settings.currentPlan")}>
            <strong>
              {serverEntitlement?.planId === "plus_monthly" && serverEntitlement?.status === "active"
                ? "Plus"
                : t("common.free")}
            </strong>
          </SettingsRow>
          <SettingsRow label={t("settings.manageBilling")} onClick={() => router.push("/pricing")} />
        </div>
      </SettingsSection>

      {activeModal === "account" ? (
        <Modal title={t("settings.account")} onClose={() => setActiveModal(null)}>
          <form className="settings-form" onSubmit={onAccountSubmit}>
            <label>
              {t("settings.name")}
              <input value={accountDraft.name} onChange={(event) => setAccountDraft({ ...accountDraft, name: event.target.value })} />
            </label>
            <label>
              {t("settings.email")}
              <input readOnly value={accountDraft.email} />
            </label>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setActiveModal(null)} type="button">
                {t("common.cancel")}
              </button>
              <button className="btn-primary" type="submit">
                {t("common.save")}
              </button>
            </div>
          </form>
        </Modal>
      ) : null}

      {activeModal === "health" ? (
        <Modal title={t("settings.healthProfile")} onClose={() => setActiveModal(null)}>
          <form className="settings-form" onSubmit={onHealthSubmit}>
            <div className="form-grid-two">
              <label>
                {t("settings.age")}
                <input value={healthDraft.age} onChange={(event) => setHealthDraft({ ...healthDraft, age: event.target.value })} />
              </label>
              <label>
                {t("settings.sex")}
                <input value={healthDraft.sex} onChange={(event) => setHealthDraft({ ...healthDraft, sex: event.target.value })} />
              </label>
              <label>
                {t("settings.pregnancyStatus")}
                <input value={healthDraft.pregnancyStatus} onChange={(event) => setHealthDraft({ ...healthDraft, pregnancyStatus: event.target.value })} />
              </label>
            </div>
            <ListEditor
              addLabel={t("settings.addItem")}
              emptyLabel={t("common.none")}
              label={t("settings.medicalConditions")}
              values={healthDraft.chronicConditions}
              onChange={(chronicConditions) => setHealthDraft({ ...healthDraft, chronicConditions })}
            />
            <ListEditor
              addLabel={t("settings.addItem")}
              emptyLabel={t("common.none")}
              label={t("settings.allergies")}
              values={healthDraft.allergies}
              onChange={(allergies) => setHealthDraft({ ...healthDraft, allergies })}
            />
            <ListEditor
              addLabel={t("settings.addItem")}
              emptyLabel={t("common.none")}
              label={t("settings.medications")}
              values={healthDraft.medications}
              onChange={(medications) => setHealthDraft({ ...healthDraft, medications })}
            />
            <label>
              {t("settings.recentSurgery")}
              <input value={healthDraft.recentSurgery} onChange={(event) => setHealthDraft({ ...healthDraft, recentSurgery: event.target.value })} />
            </label>
            <ListEditor
              addLabel={t("settings.addItem")}
              emptyLabel={t("common.none")}
              label={t("settings.highRiskConditions")}
              values={healthDraft.highRiskConditions}
              onChange={(highRiskConditions) => setHealthDraft({ ...healthDraft, highRiskConditions })}
            />
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setActiveModal(null)} type="button">
                {t("common.cancel")}
              </button>
              <button className="btn-primary" type="submit">
                {t("common.save")}
              </button>
            </div>
          </form>
        </Modal>
      ) : null}

      {activeModal === "insurance" ? (
        <Modal title={t("settings.insuranceProfile")} onClose={() => setActiveModal(null)}>
          <form className="settings-form" onSubmit={onInsuranceSubmit}>
            <div className="form-grid-two">
              <label>
                {t("settings.insuranceStatus")}
                <input value={insuranceDraft.status} onChange={(event) => setInsuranceDraft({ ...insuranceDraft, status: event.target.value })} />
              </label>
              <label>
                {t("settings.planType")}
                <input value={insuranceDraft.planType} onChange={(event) => setInsuranceDraft({ ...insuranceDraft, planType: event.target.value })} />
              </label>
              <label>
                {t("settings.urgentCareCopay")}
                <input value={insuranceDraft.urgentCareCopay} onChange={(event) => setInsuranceDraft({ ...insuranceDraft, urgentCareCopay: event.target.value, copay: event.target.value })} />
              </label>
              <label>
                {t("settings.primaryCareCopay")}
                <input value={insuranceDraft.primaryCareCopay} onChange={(event) => setInsuranceDraft({ ...insuranceDraft, primaryCareCopay: event.target.value })} />
              </label>
              <label>
                {t("settings.deductible")}
                <input value={insuranceDraft.deductible} onChange={(event) => setInsuranceDraft({ ...insuranceDraft, deductible: event.target.value })} />
              </label>
              <label>
                {t("insurance.lastUpdated")}
                <input value={insuranceDraft.lastUpdated ? new Date(insuranceDraft.lastUpdated).toLocaleString() : t("insurance.notRecorded")} readOnly />
              </label>
            </div>
            <label>
              {t("settings.inNetworkPreference")}
              <input value={insuranceDraft.inNetworkPreference} onChange={(event) => setInsuranceDraft({ ...insuranceDraft, inNetworkPreference: event.target.value })} />
            </label>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setActiveModal(null)} type="button">
                {t("common.cancel")}
              </button>
              <button className="btn-primary" type="submit">
                {t("common.save")}
              </button>
            </div>
          </form>
        </Modal>
      ) : null}

      {confirmDelete ? (
        <ConfirmDialog
          body={t("settings.confirmDeleteBody")}
          cancelLabel={t("common.cancel")}
          confirmLabel={t("settings.deleteData")}
          title={t("settings.confirmDelete")}
          onCancel={() => setConfirmDelete(false)}
          onConfirm={() => {
            resetAll();
            setConfirmDelete(false);
            notify(t("settings.deleted"));
          }}
        />
      ) : null}

      {toast ? <Toast message={toast} /> : null}
    </section>
  );
}
