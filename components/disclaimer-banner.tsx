"use client";

import { useLanguage } from "@/components/language-provider";
import { getCopy } from "@/lib/i18n";

type DisclaimerBannerProps = {
  text?: string;
};

export const DEFAULT_DISCLAIMER =
  "HealthMatchAI does not diagnose, prescribe, treat, or replace professional medical care. Insurance information is educational only and does not constitute insurance advice. For plan-specific insurance questions, speak with a licensed insurance professional.";

export function DisclaimerBanner({ text }: DisclaimerBannerProps) {
  const { languageCode } = useLanguage();
  return <p className="disclaimer-banner">{text ?? getCopy(languageCode).banner}</p>;
}
