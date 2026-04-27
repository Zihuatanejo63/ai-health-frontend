"use client";

import Link from "next/link";
import { LanguageSelect } from "@/components/language-select";
import { useLanguage } from "@/components/language-provider";

const HEADER_COPY = {
  en: { symptoms: "Symptom Checker", result: "AI Result", doctors: "Doctor List" },
  zh: { symptoms: "症状检查", result: "AI 结果", doctors: "医生列表" },
  es: { symptoms: "Síntomas", result: "Resultado IA", doctors: "Doctores" },
  hi: { symptoms: "लक्षण जांच", result: "AI परिणाम", doctors: "डॉक्टर" },
  ar: { symptoms: "فحص الأعراض", result: "نتيجة الذكاء الاصطناعي", doctors: "الأطباء" },
  pt: { symptoms: "Sintomas", result: "Resultado IA", doctors: "Médicos" },
  fr: { symptoms: "Symptômes", result: "Résultat IA", doctors: "Médecins" },
  de: { symptoms: "Symptome", result: "KI-Ergebnis", doctors: "Ärzte" },
  ja: { symptoms: "症状チェック", result: "AI 結果", doctors: "医師一覧" },
  ko: { symptoms: "증상 확인", result: "AI 결과", doctors: "의사 목록" }
};

export function SiteHeader() {
  const { languageCode } = useLanguage();
  const copy = HEADER_COPY[languageCode] ?? HEADER_COPY.en;

  return (
    <header className="top-nav">
      <div className="container top-nav-inner">
        <Link className="brand" href="/">
          AI Health Match
        </Link>
        <nav className="nav-links">
          <Link href="/">{copy.symptoms}</Link>
          <Link href="/result">{copy.result}</Link>
          <Link href="/doctors">{copy.doctors}</Link>
        </nav>
        <LanguageSelect />
      </div>
    </header>
  );
}
