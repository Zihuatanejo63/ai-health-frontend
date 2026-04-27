"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DisclaimerBanner, DEFAULT_DISCLAIMER } from "@/components/disclaimer-banner";
import type { AnalyzeSymptomsResponse, RiskLevel } from "@/lib/types";

const SESSION_RESULT_KEY = "ai-health-match-result";

type StoredAnalysis = {
  request?: {
    languageCode?: string;
    languageName?: string;
  };
  response: AnalyzeSymptomsResponse;
};

const RESULT_COPY = {
  en: {
    unavailable: "AI result unavailable",
    unavailableText: "Submit your symptoms on the home page first to generate an assessment summary.",
    input: "Go to Symptom Input",
    title: "AI Assessment Summary",
    reference: "Reference ID",
    risk: "Risk Level",
    clinical: "Clinical understanding",
    departments: "Recommended departments",
    steps: "Suggested next steps",
    doctors: "Find Matching Doctors",
    restart: "Start New Assessment"
  },
  zh: {
    unavailable: "暂无 AI 结果",
    unavailableText: "请先在首页提交症状，生成评估摘要。",
    input: "返回症状输入",
    title: "AI 评估摘要",
    reference: "参考编号",
    risk: "风险等级",
    clinical: "临床理解",
    departments: "建议科室",
    steps: "建议下一步",
    doctors: "查找匹配医生",
    restart: "重新评估"
  },
  es: {
    unavailable: "Resultado de IA no disponible",
    unavailableText: "Envía tus síntomas en la página principal para generar un resumen.",
    input: "Ir al formulario",
    title: "Resumen de evaluación de IA",
    reference: "ID de referencia",
    risk: "Nivel de riesgo",
    clinical: "Comprensión clínica",
    departments: "Departamentos recomendados",
    steps: "Próximos pasos sugeridos",
    doctors: "Buscar doctores",
    restart: "Nueva evaluación"
  },
  hi: {
    unavailable: "AI परिणाम उपलब्ध नहीं",
    unavailableText: "पहले होम पेज पर अपने लक्षण भेजें।",
    input: "लक्षण इनपुट पर जाएं",
    title: "AI मूल्यांकन सारांश",
    reference: "संदर्भ ID",
    risk: "जोखिम स्तर",
    clinical: "क्लिनिकल समझ",
    departments: "सुझाए गए विभाग",
    steps: "सुझाए गए अगले कदम",
    doctors: "मेल खाते डॉक्टर खोजें",
    restart: "नया मूल्यांकन"
  },
  ar: {
    unavailable: "نتيجة الذكاء الاصطناعي غير متاحة",
    unavailableText: "أرسل الأعراض من الصفحة الرئيسية أولا.",
    input: "اذهب إلى إدخال الأعراض",
    title: "ملخص تقييم الذكاء الاصطناعي",
    reference: "رقم المرجع",
    risk: "مستوى الخطر",
    clinical: "الفهم السريري",
    departments: "الأقسام المقترحة",
    steps: "الخطوات التالية",
    doctors: "ابحث عن أطباء مناسبين",
    restart: "تقييم جديد"
  },
  pt: {
    unavailable: "Resultado de IA indisponível",
    unavailableText: "Envie seus sintomas na página inicial primeiro.",
    input: "Ir para sintomas",
    title: "Resumo da avaliação de IA",
    reference: "ID de referência",
    risk: "Nível de risco",
    clinical: "Compreensão clínica",
    departments: "Departamentos recomendados",
    steps: "Próximos passos sugeridos",
    doctors: "Encontrar médicos",
    restart: "Nova avaliação"
  },
  fr: {
    unavailable: "Résultat IA indisponible",
    unavailableText: "Envoyez d'abord vos symptômes depuis l'accueil.",
    input: "Saisir les symptômes",
    title: "Résumé d'évaluation IA",
    reference: "ID de référence",
    risk: "Niveau de risque",
    clinical: "Compréhension clinique",
    departments: "Services recommandés",
    steps: "Prochaines étapes",
    doctors: "Trouver des médecins",
    restart: "Nouvelle évaluation"
  },
  de: {
    unavailable: "KI-Ergebnis nicht verfügbar",
    unavailableText: "Senden Sie zuerst Ihre Symptome auf der Startseite.",
    input: "Zur Symptomeingabe",
    title: "KI-Bewertungsübersicht",
    reference: "Referenz-ID",
    risk: "Risikostufe",
    clinical: "Klinische Einschätzung",
    departments: "Empfohlene Fachbereiche",
    steps: "Empfohlene nächste Schritte",
    doctors: "Passende Ärzte finden",
    restart: "Neue Bewertung"
  },
  ja: {
    unavailable: "AI 結果がありません",
    unavailableText: "まずホームで症状を送信してください。",
    input: "症状入力へ",
    title: "AI 評価サマリー",
    reference: "参照 ID",
    risk: "リスクレベル",
    clinical: "臨床的な理解",
    departments: "推奨診療科",
    steps: "推奨される次のステップ",
    doctors: "合う医師を探す",
    restart: "新しい評価"
  },
  ko: {
    unavailable: "AI 결과가 없습니다",
    unavailableText: "먼저 홈에서 증상을 제출하세요.",
    input: "증상 입력으로 이동",
    title: "AI 평가 요약",
    reference: "참조 ID",
    risk: "위험도",
    clinical: "임상적 이해",
    departments: "추천 진료과",
    steps: "권장 다음 단계",
    doctors: "맞는 의사 찾기",
    restart: "새 평가"
  }
};

type ResultCopy = (typeof RESULT_COPY)["en"];

function getResultCopy(languageCode?: string): ResultCopy {
  return RESULT_COPY[languageCode as keyof typeof RESULT_COPY] ?? RESULT_COPY.en;
}

function riskClassName(riskLevel: RiskLevel): string {
  if (riskLevel === "low") return "chip risk-low";
  if (riskLevel === "high") return "chip risk-high";
  return "chip risk-medium";
}

export default function ResultPage() {
  const [analysis, setAnalysis] = useState<StoredAnalysis | null>(null);
  const copy = getResultCopy(analysis?.request?.languageCode);

  useEffect(() => {
    const rawValue = sessionStorage.getItem(SESSION_RESULT_KEY);
    if (!rawValue) return;

    try {
      const parsed = JSON.parse(rawValue) as StoredAnalysis;
      if (parsed.response) setAnalysis(parsed);
    } catch {
      setAnalysis(null);
    }
  }, []);

  const result = analysis?.response;
  const disclaimer = useMemo(
    () => result?.disclaimer || DEFAULT_DISCLAIMER,
    [result?.disclaimer]
  );

  if (!result) {
    return (
      <section className="panel" style={{ padding: 18 }}>
        <h1 className="page-title" style={{ fontSize: 28 }}>
          {copy.unavailable}
        </h1>
        <p className="page-subtitle" style={{ marginBottom: 14 }}>
          {copy.unavailableText}
        </p>
        <Link className="btn-primary" href="/" style={{ display: "inline-block" }}>
          {copy.input}
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h1 className="page-title">{copy.title}</h1>
      <p className="page-subtitle">
        {copy.reference}: <strong>{result.referenceId}</strong>
      </p>

      <div className="panel" style={{ marginTop: 18, padding: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className={riskClassName(result.riskLevel)}>
            {copy.risk}: {result.riskLevel.toUpperCase()}
          </span>
        </div>

        <h2 style={{ marginTop: 16, marginBottom: 6, fontSize: 22 }}>{copy.clinical}</h2>
        <p style={{ marginTop: 0, lineHeight: 1.7 }}>{result.summary}</p>

        <h3 style={{ marginTop: 16, marginBottom: 8, fontSize: 18 }}>{copy.departments}</h3>
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
          {result.recommendedDepartments.map((department) => (
            <li key={department}>{department}</li>
          ))}
        </ul>

        <h3 style={{ marginTop: 16, marginBottom: 8, fontSize: 18 }}>{copy.steps}</h3>
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
          {result.nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>

        <DisclaimerBanner text={disclaimer} />

        <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
          <Link className="btn-primary" href="/doctors">
            {copy.doctors}
          </Link>
          <Link className="btn-secondary" href="/">
            {copy.restart}
          </Link>
        </div>
      </div>
    </section>
  );
}
