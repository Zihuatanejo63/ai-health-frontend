import { type LanguageCode } from "@/lib/settings";
import { getTranslation } from "@/lib/translations";

type Copy = {
  banner: string;
  footerSummary: string;
  footerSafety: string;
  legal: string[];
};

export function getCopy(languageCode: LanguageCode): Copy {
  return {
    banner: `${getTranslation(languageCode, "safety.medical")} ${getTranslation(languageCode, "safety.insurance")}`,
    footerSummary: getTranslation(languageCode, "footer.summary"),
    footerSafety: `${getTranslation(languageCode, "safety.medical")} ${getTranslation(languageCode, "safety.insurance")}`,
    legal: [
      getTranslation(languageCode, "footer.privacy"),
      getTranslation(languageCode, "footer.terms"),
      getTranslation(languageCode, "footer.disclaimer"),
      getTranslation(languageCode, "footer.emergency"),
      getTranslation(languageCode, "footer.cookies")
    ]
  };
}
