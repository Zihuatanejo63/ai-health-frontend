export function toI18nSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "");
}

export function symptomItemKey(value: string) {
  return `symptom.item.${toI18nSlug(value)}`;
}

export function symptomCategoryKey(value: string) {
  return `symptom.category.${toI18nSlug(value)}`;
}

export function detailQuestionKey(value: string) {
  return `symptom.detail.${toI18nSlug(value)}`;
}

export function backgroundFieldKey(value: string) {
  return `symptom.background.${toI18nSlug(value)}`;
}

export function riskLevelKey(value: string) {
  return `risk.${toI18nSlug(value)}`;
}

export function careLevelKey(value: string) {
  return `careLevel.${toI18nSlug(value)}`;
}

export function triageTextKey(value: string) {
  return `triage.${toI18nSlug(value)}`;
}

export function careDetailKey(value: string) {
  return `care.detail.${toI18nSlug(value)}`;
}
