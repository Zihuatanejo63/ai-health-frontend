"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader, SettingsSection, StatusBadge } from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";
import { ConfirmDialog, Modal, Toast } from "@/components/modal";
import {
  DataExportButton,
  EditableProfileCard,
  LanguageSelector,
  SettingsRow,
  Toggle
} from "@/components/settings-controls";
import { useSettings } from "@/components/settings-provider";
import { type HealthMatchSettings } from "@/lib/settings";
import { clearUser, readUser, writeUser, type HealthMatchUser } from "@/lib/auth";

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
  const { settings, updateSettings, resetAll, clearHistory } = useSettings();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [toast, setToast] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [accountDraft, setAccountDraft] = useState(settings.account);
  const [healthDraft, setHealthDraft] = useState(settings.healthProfile);
  const [insuranceDraft, setInsuranceDraft] = useState(settings.insuranceProfile);
  const [accountUser, setAccountUser] = useState<HealthMatchUser | null>(null);

  useEffect(() => {
    setAccountUser(readUser());
  }, []);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  }

  function openModal(type: ModalType) {
    if (type === "account") {
      const user = readUser();
      if (!user || user.isGuest) {
        router.push("/login");
        return;
      }
      setAccountDraft({ name: user.name, email: user.email });
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
    const existing = readUser();
    if (!existing || existing.isGuest) return;
    const nextUser = { ...existing, name: accountDraft.name.trim() || existing.name };
    writeUser(nextUser);
    setAccountUser(nextUser);
    savePatch({ account: accountDraft });
  }

  function onHealthSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    savePatch({ healthProfile: healthDraft });
  }

  function onInsuranceSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    savePatch({ insuranceProfile: insuranceDraft });
  }

  return (
    <section className="app-page settings-page">
      <PageHeader title={t("settings.title")} />

      <SettingsSection title={t("settings.account")} subtitle={t("settings.accountSubtitle")} icon="A">
        <div className="settings-list-control">
          {accountUser ? (
            <>
              <SettingsRow
                label={accountUser.isGuest ? t("auth.guestUser") : accountUser.name}
                value={accountUser.isGuest ? t("auth.localSessionOnly") : accountUser.email}
                onClick={accountUser.isGuest ? undefined : () => openModal("account")}
              />
              {accountUser.isGuest ? (
                <SettingsRow label={t("auth.signInOrCreateAccount")} onClick={() => router.push("/login")} />
              ) : null}
              <SettingsRow
                label={t("auth.signOut")}
                onClick={() => {
                  clearUser();
                  setAccountUser(null);
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

      <SettingsSection title={t("settings.language")} subtitle={t("settings.languageSubtitle")} icon="G" tone="primary">
        <LanguageSelector
          value={language}
          onChange={(nextLanguage) => {
            setLanguage(nextLanguage);
            notify(t("settings.saved"));
          }}
        />
      </SettingsSection>

      <SettingsSection title={t("settings.privacy")} subtitle={t("settings.privacySubtitle")} icon="L" tone="purple">
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

      <SettingsSection title={t("settings.healthProfile")} subtitle={t("settings.healthSubtitle")} icon="H" tone="teal">
        <button className="settings-inline settings-button-inline" onClick={() => openModal("health")} type="button">
          <EditableProfileCard title={t("settings.medicalConditions")} count={settings.healthProfile.chronicConditions.length} />
          <EditableProfileCard title={t("settings.medications")} count={settings.healthProfile.medications.length} />
          <span className="chevron">›</span>
        </button>
      </SettingsSection>

      <SettingsSection title={t("settings.insuranceProfile")} subtitle={t("settings.insuranceSubtitle")} icon="I" tone="primary">
        <div className="settings-list-control">
          <SettingsRow label={t("settings.primaryInsurance")} onClick={() => openModal("insurance")}>
            <StatusBadge tone={settings.insuranceProfile.status ? "success" : "primary"}>{settings.insuranceProfile.status || t("insurance.addProfile")}</StatusBadge>
          </SettingsRow>
          <SettingsRow label={t("settings.insuranceHistory")} onClick={() => openModal("insurance")} />
        </div>
      </SettingsSection>

      <SettingsSection title={t("settings.notifications")} subtitle={t("settings.notificationsSubtitle")} icon="N" tone="purple">
        <div className="settings-list-control">
          <SettingsRow label={t("settings.symptomFollowUp")}>
            <Toggle
              checked={settings.notifications.symptomFollowUp}
              onChange={(symptomFollowUp) => updateSettings((current) => ({ ...current, notifications: { ...current.notifications, symptomFollowUp } }))}
            />
          </SettingsRow>
          <SettingsRow label={t("settings.reportReady")}>
            <Toggle
              checked={settings.notifications.reportReady}
              onChange={(reportReady) => updateSettings((current) => ({ ...current, notifications: { ...current.notifications, reportReady } }))}
            />
          </SettingsRow>
          <SettingsRow label={t("settings.tipsUpdates")}>
            <Toggle
              checked={settings.notifications.tipsUpdates}
              onChange={(tipsUpdates) => updateSettings((current) => ({ ...current, notifications: { ...current.notifications, tipsUpdates } }))}
            />
          </SettingsRow>
        </div>
      </SettingsSection>

      <SettingsSection title={t("settings.subscription")} subtitle={t("settings.subscriptionSubtitle")} icon="S" tone="warning">
        <div className="settings-list-control">
          <SettingsRow label={t("settings.currentPlan")}>
            <strong>{settings.subscription.plan === "Premium" ? t("common.premium") : t("common.free")}</strong>
          </SettingsRow>
          <SettingsRow label={t("settings.manageBilling")} onClick={() => router.push("/pricing")} />
        </div>
      </SettingsSection>

      <SettingsSection title={t("settings.safety")} subtitle={t("settings.safetySubtitle")} icon="!" tone="danger">
        <div className="safety-note">
          {t("safety.medical")} {t("safety.emergency")}
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
