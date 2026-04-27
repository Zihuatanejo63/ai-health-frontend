"use client";

import { useLanguage } from "@/components/language-provider";

type DisclaimerBannerProps = {
  text?: string;
};

export const DEFAULT_DISCLAIMER =
  "Medical disclaimer: AI Health Match does not provide medical diagnosis. " +
  "This information is for triage support only and does not replace professional medical advice. " +
  "If you are in danger or have severe symptoms, seek emergency care immediately.";

const DISCLAIMER_COPY = {
  en: DEFAULT_DISCLAIMER,
  zh: "医疗免责声明：AI Health Match 不提供医疗诊断。本信息仅用于分诊辅助，不能替代专业医疗建议。如有危险或严重症状，请立即寻求急救。",
  es: "Aviso médico: AI Health Match no proporciona diagnósticos médicos. Esta información solo apoya el triaje y no reemplaza el consejo profesional. Si tienes síntomas graves, busca atención de emergencia.",
  hi: "चिकित्सा अस्वीकरण: AI Health Match चिकित्सा निदान नहीं देता। यह जानकारी केवल ट्रायेज सहायता है और पेशेवर सलाह का विकल्प नहीं है। गंभीर लक्षण हों तो आपातकालीन देखभाल लें।",
  ar: "تنبيه طبي: لا يقدم AI Health Match تشخيصا طبيا. هذه المعلومات لدعم الفرز فقط ولا تغني عن استشارة مختص. إذا كانت الأعراض شديدة فاطلب رعاية طارئة.",
  pt: "Aviso médico: AI Health Match não fornece diagnóstico médico. Esta informação é apenas apoio de triagem e não substitui aconselhamento profissional. Em sintomas graves, procure emergência.",
  fr: "Avertissement médical : AI Health Match ne fournit pas de diagnostic médical. Ces informations servent uniquement au triage et ne remplacent pas un avis professionnel. En cas de symptômes graves, contactez les urgences.",
  de: "Medizinischer Hinweis: AI Health Match stellt keine medizinische Diagnose. Diese Informationen dienen nur der Triage und ersetzen keine professionelle Beratung. Bei schweren Symptomen suchen Sie Notfallhilfe.",
  ja: "医療上の免責事項：AI Health Match は診断を提供しません。この情報はトリアージ支援のみを目的とし、専門家の助言に代わるものではありません。重い症状がある場合は救急医療を受けてください。",
  ko: "의료 고지: AI Health Match는 의학적 진단을 제공하지 않습니다. 이 정보는 분류 지원용이며 전문 의료 조언을 대체하지 않습니다. 심각한 증상이 있으면 응급 진료를 받으세요."
};

export function DisclaimerBanner({ text }: DisclaimerBannerProps) {
  const { languageCode } = useLanguage();
  return <p className="disclaimer-banner">{text ?? DISCLAIMER_COPY[languageCode]}</p>;
}
