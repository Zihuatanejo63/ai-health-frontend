"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

const FOOTER_COPY = {
  en: {
    summary: "MVP for AI-assisted triage and doctor matching.",
    privacy: "Privacy",
    terms: "Terms",
    disclaimer: "Medical Disclaimer",
    emergency: "Emergency Notice",
    cookies: "Cookie Policy"
  },
  zh: {
    summary: "AI 辅助分诊和医生匹配 MVP。",
    privacy: "隐私政策",
    terms: "用户协议",
    disclaimer: "医疗免责声明",
    emergency: "非急救服务提示",
    cookies: "Cookie 政策"
  },
  es: { summary: "MVP de triaje asistido por IA.", privacy: "Privacidad", terms: "Términos", disclaimer: "Aviso médico", emergency: "Emergencia", cookies: "Cookies" },
  hi: { summary: "AI-सहायता प्राप्त ट्रायेज MVP.", privacy: "गोपनीयता", terms: "शर्तें", disclaimer: "चिकित्सा अस्वीकरण", emergency: "आपात सूचना", cookies: "Cookie नीति" },
  ar: { summary: "نسخة أولية للفرز المدعوم بالذكاء الاصطناعي.", privacy: "الخصوصية", terms: "الشروط", disclaimer: "تنبيه طبي", emergency: "تنبيه الطوارئ", cookies: "سياسة ملفات الارتباط" },
  pt: { summary: "MVP de triagem assistida por IA.", privacy: "Privacidade", terms: "Termos", disclaimer: "Aviso médico", emergency: "Aviso de emergência", cookies: "Cookies" },
  fr: { summary: "MVP de triage assisté par IA.", privacy: "Confidentialité", terms: "Conditions", disclaimer: "Avertissement médical", emergency: "Urgence", cookies: "Cookies" },
  de: { summary: "MVP für KI-gestützte Triage.", privacy: "Datenschutz", terms: "Bedingungen", disclaimer: "Medizinischer Hinweis", emergency: "Notfallhinweis", cookies: "Cookies" },
  ja: { summary: "AI 支援トリアージ MVP。", privacy: "プライバシー", terms: "利用規約", disclaimer: "医療免責事項", emergency: "緊急時の注意", cookies: "Cookie ポリシー" },
  ko: { summary: "AI 지원 분류 MVP.", privacy: "개인정보", terms: "약관", disclaimer: "의료 고지", emergency: "응급 안내", cookies: "Cookie 정책" }
};

export function SiteFooter() {
  const { languageCode } = useLanguage();
  const copy = FOOTER_COPY[languageCode] ?? FOOTER_COPY.en;

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>
          <strong>AI Health Match</strong> · {copy.summary}
        </span>
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
