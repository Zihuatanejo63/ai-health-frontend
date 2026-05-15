"use client";

import { useLanguage } from "@/components/language-provider";
import { getCopy } from "@/lib/i18n";

type DisclaimerBannerProps = {
  text?: string;
};

export const DEFAULT_DISCLAIMER =
  "HealthMatchAI does not diagnose, prescribe, or replace professional medical care. Insurance information is educational only. For plan enrollment, speak with a licensed insurance agent or broker.";

export function DisclaimerBanner({ text }: DisclaimerBannerProps) {
  const { languageCode } = useLanguage();
  return <p className="disclaimer-banner">{text ?? getCopy(languageCode).banner}</p>;
}
