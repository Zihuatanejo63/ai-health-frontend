"use client";

import Link from "next/link";

const FOOTER_COPY = {
  en: {
    summary: "Symptom Triage, Care Level Finder, Doctor Visit Prep, and Insurance Navigation.",
    privacy: "Privacy",
    terms: "Terms",
    disclaimer: "Medical Disclaimer",
    emergency: "Emergency Notice",
    cookies: "Cookie Policy",
    safety:
      "HealthMatchAI does not diagnose, prescribe, replace professional medical care, or sell insurance plans."
  },
  zh: {
    summary: "AI 症状分诊、就医决策和保险导航。",
    privacy: "隐私政策",
    terms: "用户协议",
    disclaimer: "医疗免责声明",
    emergency: "非急救服务提示",
    cookies: "Cookie 政策"
  },
  es: { summary: "Triaje de salud con IA y navegación de seguros.", privacy: "Privacidad", terms: "Términos", disclaimer: "Aviso médico", emergency: "Emergencia", cookies: "Cookies" },
  hi: { summary: "AI स्वास्थ्य ट्रायेज और बीमा नेविगेशन.", privacy: "गोपनीयता", terms: "शर्तें", disclaimer: "चिकित्सा अस्वीकरण", emergency: "आपात सूचना", cookies: "Cookie नीति" },
  ar: { summary: "فرز صحي بالذكاء الاصطناعي وتوجيه تأميني.", privacy: "الخصوصية", terms: "الشروط", disclaimer: "تنبيه طبي", emergency: "تنبيه الطوارئ", cookies: "سياسة ملفات الارتباط" },
  pt: { summary: "Triagem de saúde por IA e navegação de seguros.", privacy: "Privacidade", terms: "Termos", disclaimer: "Aviso médico", emergency: "Aviso de emergência", cookies: "Cookies" },
  fr: { summary: "Triage santé IA et navigation assurance.", privacy: "Confidentialité", terms: "Conditions", disclaimer: "Avertissement médical", emergency: "Urgence", cookies: "Cookies" },
  de: { summary: "KI-Gesundheitstriage und Versicherungsnavigation.", privacy: "Datenschutz", terms: "Bedingungen", disclaimer: "Medizinischer Hinweis", emergency: "Notfallhinweis", cookies: "Cookies" },
  ja: { summary: "AI ヘルストリアージと保険ナビゲーション。", privacy: "プライバシー", terms: "利用規約", disclaimer: "医療免責事項", emergency: "緊急時の注意", cookies: "Cookie ポリシー" },
  ko: { summary: "AI 건강 분류 및 보험 안내.", privacy: "개인정보", terms: "약관", disclaimer: "의료 고지", emergency: "응급 안내", cookies: "Cookie 정책" }
};

export function SiteFooter() {
  const copy = FOOTER_COPY.en;

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>
          <strong>HealthMatchAI</strong> · {copy.summary}
        </span>
        <p className="footer-disclaimer">{copy.safety}</p>
        <nav className="footer-links">
          <Link href="/privacy">{copy.privacy}</Link>
          <Link href="/terms">{copy.terms}</Link>
          <Link href="/medical-disclaimer">{copy.disclaimer}</Link>
          <Link href="/emergency">{copy.emergency}</Link>
          <Link href="/cookies">{copy.cookies}</Link>
        </nav>
      </div>
    </footer>
  );
}
