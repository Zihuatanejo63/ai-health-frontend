"use client";

import { type ReactNode } from "react";
import { readUser } from "@/lib/auth";
import { LANGUAGES, readHistory, readSummaries, readSymptomChecks, type LanguageCode } from "@/lib/settings";

export function SettingsRow({
  label,
  value,
  onClick,
  danger = false,
  children
}: {
  label: string;
  value?: ReactNode;
  onClick?: () => void;
  danger?: boolean;
  children?: ReactNode;
}) {
  const Component = onClick ? "button" : "div";
  return (
    <Component className={`settings-row${danger ? " danger-row" : ""}`} onClick={onClick as never} type={onClick ? "button" : undefined}>
      <span>{label}</span>
      <strong>{children ?? value ?? "›"}</strong>
    </Component>
  );
}

export function Toggle({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <button
      aria-pressed={checked}
      className={`toggle-switch${checked ? " is-on" : ""}`}
      onClick={() => onChange(!checked)}
      type="button"
    >
      <span />
    </button>
  );
}

export function LanguageSelector({
  value,
  onChange
}: {
  value: LanguageCode;
  onChange: (language: LanguageCode) => void;
}) {
  return (
    <div className="language-grid">
      {LANGUAGES.map((language) => (
        <button
          className={`language-chip${value === language.code ? " selected" : ""}`}
          key={language.code}
          onClick={() => onChange(language.code)}
          type="button"
        >
          {language.name}
        </button>
      ))}
    </div>
  );
}

export function DataExportButton({
  settings,
  children,
  onExport
}: {
  settings: unknown;
  children: ReactNode;
  onExport?: () => void;
}) {
  function exportData() {
    const blob = new Blob(
      [
        JSON.stringify(
          {
            settings,
            user: readUser(),
            healthProfile: (settings as { healthProfile?: unknown })?.healthProfile,
            insuranceProfile: (settings as { insuranceProfile?: unknown })?.insuranceProfile,
            history: readHistory(),
            symptomChecks: readSymptomChecks(),
            summaries: readSummaries()
          },
          null,
          2
        )
      ],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "healthmatchai-data.json";
    link.click();
    URL.revokeObjectURL(url);
    onExport?.();
  }

  return (
    <button className="settings-row" onClick={exportData} type="button">
      <span>{children}</span>
      <strong>↧</strong>
    </button>
  );
}

export function EditableProfileCard({ title, count }: { title: string; count: number | string }) {
  return (
    <span className="profile-count">
      {title} <strong>{count}</strong>
    </span>
  );
}
