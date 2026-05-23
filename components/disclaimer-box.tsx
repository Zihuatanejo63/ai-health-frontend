"use client";

import { useI18n } from "@/components/i18n-provider";

type DisclaimerBoxProps = {
  text?: string;
};

export function DisclaimerBox({ text }: DisclaimerBoxProps) {
  const { t } = useI18n();
  return <div className="disclaimer-box">{text ?? `${t("safety.medical")} ${t("safety.insurance")}`}</div>;
}
