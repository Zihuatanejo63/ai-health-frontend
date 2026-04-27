"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { analyzeSymptoms } from "@/lib/api";
import type { DurationUnit, Severity } from "@/lib/types";

const SESSION_RESULT_KEY = "ai-health-match-result";
const LANGUAGES = [
  {
    code: "en",
    name: "English",
    title: "Smart triage for faster care",
    subtitle: "Describe your symptoms and get AI-assisted risk stratification plus a recommended department.",
    symptomsLabel: "Primary symptoms",
    symptomsPlaceholder: "Example: sharp pain in lower right abdomen for 12 hours, worse when moving.",
    severityLabel: "Current severity",
    durationLabel: "Duration",
    uploadNote: "Upload reports is planned for a future version (Coming soon).",
    analyze: "Run AI Symptom Analysis",
    analyzing: "Analyzing...",
    doctors: "Browse Doctors",
    disclaimer:
      "Medical disclaimer: AI Health Match does not provide medical diagnosis. This information is for triage support only and does not replace professional medical advice. If you are in danger or have severe symptoms, seek emergency care immediately.",
    errors: {
      symptoms: "Please provide symptom details.",
      duration: "Duration must be greater than 0.",
      unexpected: "Unexpected error."
    },
    severity: { mild: "Mild", moderate: "Moderate", severe: "Severe" },
    units: { hours: "Hours", days: "Days", weeks: "Weeks", months: "Months" }
  },
  {
    code: "zh",
    name: "中文",
    title: "更快找到合适医疗帮助",
    subtitle: "描述症状，获取 AI 辅助风险分层和建议科室。",
    symptomsLabel: "主要症状",
    symptomsPlaceholder: "例如：右下腹刺痛 12 小时，活动时加重。",
    severityLabel: "当前严重程度",
    durationLabel: "持续时间",
    uploadNote: "上传报告功能将在后续版本提供。",
    analyze: "开始 AI 症状分析",
    analyzing: "分析中...",
    doctors: "浏览医生",
    disclaimer:
      "医疗免责声明：AI Health Match 不提供医疗诊断。本信息仅用于分诊辅助，不能替代专业医疗建议。如有危险或严重症状，请立即寻求急救。",
    errors: {
      symptoms: "请填写症状详情。",
      duration: "持续时间必须大于 0。",
      unexpected: "发生未知错误。"
    },
    severity: { mild: "轻微", moderate: "中等", severe: "严重" },
    units: { hours: "小时", days: "天", weeks: "周", months: "月" }
  },
  {
    code: "es",
    name: "Español",
    title: "Orientación médica más rápida",
    subtitle: "Describe tus síntomas y recibe una clasificación de riesgo asistida por IA.",
    symptomsLabel: "Síntomas principales",
    symptomsPlaceholder: "Ejemplo: dolor agudo en la parte inferior derecha del abdomen durante 12 horas.",
    severityLabel: "Gravedad actual",
    durationLabel: "Duración",
    uploadNote: "La carga de informes estará disponible en una versión futura.",
    analyze: "Analizar síntomas con IA",
    analyzing: "Analizando...",
    doctors: "Ver doctores",
    disclaimer:
      "Aviso médico: AI Health Match no proporciona diagnósticos médicos. Esta información solo apoya el triaje y no reemplaza el consejo profesional. Si tienes síntomas graves, busca atención de emergencia.",
    errors: {
      symptoms: "Proporciona detalles de los síntomas.",
      duration: "La duración debe ser mayor que 0.",
      unexpected: "Error inesperado."
    },
    severity: { mild: "Leve", moderate: "Moderada", severe: "Grave" },
    units: { hours: "Horas", days: "Días", weeks: "Semanas", months: "Meses" }
  },
  {
    code: "hi",
    name: "हिन्दी",
    title: "तेज़ देखभाल के लिए स्मार्ट ट्रायेज",
    subtitle: "अपने लक्षण बताएं और AI-सहायता प्राप्त जोखिम स्तर व विभाग सुझाव पाएं।",
    symptomsLabel: "मुख्य लक्षण",
    symptomsPlaceholder: "उदाहरण: 12 घंटे से पेट के दाहिने निचले हिस्से में तेज दर्द।",
    severityLabel: "वर्तमान गंभीरता",
    durationLabel: "अवधि",
    uploadNote: "रिपोर्ट अपलोड भविष्य के संस्करण में उपलब्ध होगा।",
    analyze: "AI लक्षण विश्लेषण चलाएं",
    analyzing: "विश्लेषण हो रहा है...",
    doctors: "डॉक्टर देखें",
    disclaimer:
      "चिकित्सा अस्वीकरण: AI Health Match चिकित्सा निदान नहीं देता। यह जानकारी केवल ट्रायेज सहायता है और पेशेवर सलाह का विकल्प नहीं है। गंभीर लक्षण हों तो आपातकालीन देखभाल लें।",
    errors: {
      symptoms: "कृपया लक्षणों का विवरण दें।",
      duration: "अवधि 0 से अधिक होनी चाहिए।",
      unexpected: "अनपेक्षित त्रुटि।"
    },
    severity: { mild: "हल्का", moderate: "मध्यम", severe: "गंभीर" },
    units: { hours: "घंटे", days: "दिन", weeks: "सप्ताह", months: "महीने" }
  },
  {
    code: "ar",
    name: "العربية",
    title: "فرز ذكي لرعاية أسرع",
    subtitle: "صف أعراضك واحصل على تقييم مخاطر مدعوم بالذكاء الاصطناعي وقسم مقترح.",
    symptomsLabel: "الأعراض الرئيسية",
    symptomsPlaceholder: "مثال: ألم حاد في أسفل البطن الأيمن لمدة 12 ساعة.",
    severityLabel: "الشدة الحالية",
    durationLabel: "المدة",
    uploadNote: "رفع التقارير سيكون متاحا في إصدار لاحق.",
    analyze: "تحليل الأعراض بالذكاء الاصطناعي",
    analyzing: "جار التحليل...",
    doctors: "تصفح الأطباء",
    disclaimer:
      "تنبيه طبي: لا يقدم AI Health Match تشخيصا طبيا. هذه المعلومات لدعم الفرز فقط ولا تغني عن استشارة مختص. إذا كانت الأعراض شديدة فاطلب رعاية طارئة.",
    errors: {
      symptoms: "يرجى إدخال تفاصيل الأعراض.",
      duration: "يجب أن تكون المدة أكبر من 0.",
      unexpected: "حدث خطأ غير متوقع."
    },
    severity: { mild: "خفيفة", moderate: "متوسطة", severe: "شديدة" },
    units: { hours: "ساعات", days: "أيام", weeks: "أسابيع", months: "أشهر" }
  },
  {
    code: "pt",
    name: "Português",
    title: "Triagem inteligente para cuidado mais rápido",
    subtitle: "Descreva seus sintomas e receba estratificação de risco assistida por IA.",
    symptomsLabel: "Sintomas principais",
    symptomsPlaceholder: "Exemplo: dor aguda no abdômen inferior direito por 12 horas.",
    severityLabel: "Gravidade atual",
    durationLabel: "Duração",
    uploadNote: "O envio de relatórios será lançado em uma versão futura.",
    analyze: "Analisar sintomas com IA",
    analyzing: "Analisando...",
    doctors: "Ver médicos",
    disclaimer:
      "Aviso médico: AI Health Match não fornece diagnóstico médico. Esta informação é apenas apoio de triagem e não substitui aconselhamento profissional. Em sintomas graves, procure emergência.",
    errors: {
      symptoms: "Informe detalhes dos sintomas.",
      duration: "A duração deve ser maior que 0.",
      unexpected: "Erro inesperado."
    },
    severity: { mild: "Leve", moderate: "Moderada", severe: "Grave" },
    units: { hours: "Horas", days: "Dias", weeks: "Semanas", months: "Meses" }
  },
  {
    code: "fr",
    name: "Français",
    title: "Un triage intelligent pour des soins plus rapides",
    subtitle: "Décrivez vos symptômes et obtenez une évaluation du risque assistée par IA.",
    symptomsLabel: "Symptômes principaux",
    symptomsPlaceholder: "Exemple : douleur vive en bas à droite de l'abdomen depuis 12 heures.",
    severityLabel: "Gravité actuelle",
    durationLabel: "Durée",
    uploadNote: "L'ajout de rapports sera disponible dans une prochaine version.",
    analyze: "Analyser avec l'IA",
    analyzing: "Analyse...",
    doctors: "Voir les médecins",
    disclaimer:
      "Avertissement médical : AI Health Match ne fournit pas de diagnostic médical. Ces informations servent uniquement au triage et ne remplacent pas un avis professionnel. En cas de symptômes graves, contactez les urgences.",
    errors: {
      symptoms: "Veuillez fournir les détails des symptômes.",
      duration: "La durée doit être supérieure à 0.",
      unexpected: "Erreur inattendue."
    },
    severity: { mild: "Légère", moderate: "Modérée", severe: "Sévère" },
    units: { hours: "Heures", days: "Jours", weeks: "Semaines", months: "Mois" }
  },
  {
    code: "de",
    name: "Deutsch",
    title: "Smarte Ersteinschätzung für schnellere Hilfe",
    subtitle: "Beschreiben Sie Symptome und erhalten Sie eine KI-gestützte Risikoeinschätzung.",
    symptomsLabel: "Hauptsymptome",
    symptomsPlaceholder: "Beispiel: stechender Schmerz rechts unten im Bauch seit 12 Stunden.",
    severityLabel: "Aktuelle Schwere",
    durationLabel: "Dauer",
    uploadNote: "Das Hochladen von Berichten ist für eine spätere Version geplant.",
    analyze: "KI-Symptomanalyse starten",
    analyzing: "Analyse läuft...",
    doctors: "Ärzte ansehen",
    disclaimer:
      "Medizinischer Hinweis: AI Health Match stellt keine medizinische Diagnose. Diese Informationen dienen nur der Triage und ersetzen keine professionelle Beratung. Bei schweren Symptomen suchen Sie Notfallhilfe.",
    errors: {
      symptoms: "Bitte geben Sie Symptomdetails ein.",
      duration: "Die Dauer muss größer als 0 sein.",
      unexpected: "Unerwarteter Fehler."
    },
    severity: { mild: "Leicht", moderate: "Mittel", severe: "Schwer" },
    units: { hours: "Stunden", days: "Tage", weeks: "Wochen", months: "Monate" }
  },
  {
    code: "ja",
    name: "日本語",
    title: "より早いケアのためのスマートトリアージ",
    subtitle: "症状を入力し、AI によるリスク分類と推奨診療科を確認できます。",
    symptomsLabel: "主な症状",
    symptomsPlaceholder: "例：右下腹部の鋭い痛みが12時間続き、動くと悪化する。",
    severityLabel: "現在の重症度",
    durationLabel: "期間",
    uploadNote: "レポートのアップロードは今後のバージョンで対応予定です。",
    analyze: "AI 症状分析を実行",
    analyzing: "分析中...",
    doctors: "医師を見る",
    disclaimer:
      "医療上の免責事項：AI Health Match は診断を提供しません。この情報はトリアージ支援のみを目的とし、専門家の助言に代わるものではありません。重い症状がある場合は救急医療を受けてください。",
    errors: {
      symptoms: "症状の詳細を入力してください。",
      duration: "期間は 0 より大きくしてください。",
      unexpected: "予期しないエラーです。"
    },
    severity: { mild: "軽度", moderate: "中等度", severe: "重度" },
    units: { hours: "時間", days: "日", weeks: "週", months: "か月" }
  },
  {
    code: "ko",
    name: "한국어",
    title: "더 빠른 진료를 위한 스마트 분류",
    subtitle: "증상을 입력하고 AI 기반 위험도와 추천 진료과를 확인하세요.",
    symptomsLabel: "주요 증상",
    symptomsPlaceholder: "예: 오른쪽 아랫배의 날카로운 통증이 12시간 지속됨.",
    severityLabel: "현재 심각도",
    durationLabel: "기간",
    uploadNote: "검사 자료 업로드는 향후 버전에서 제공됩니다.",
    analyze: "AI 증상 분석 실행",
    analyzing: "분석 중...",
    doctors: "의사 보기",
    disclaimer:
      "의료 고지: AI Health Match는 의학적 진단을 제공하지 않습니다. 이 정보는 분류 지원용이며 전문 의료 조언을 대체하지 않습니다. 심각한 증상이 있으면 응급 진료를 받으세요.",
    errors: {
      symptoms: "증상 세부 정보를 입력하세요.",
      duration: "기간은 0보다 커야 합니다.",
      unexpected: "예상치 못한 오류입니다."
    },
    severity: { mild: "경미", moderate: "중간", severe: "심각" },
    units: { hours: "시간", days: "일", weeks: "주", months: "개월" }
  }
] as const;

type LanguageCode = (typeof LANGUAGES)[number]["code"];

export default function HomePage() {
  const router = useRouter();
  const [languageCode, setLanguageCode] = useState<LanguageCode>("en");
  const [symptoms, setSymptoms] = useState("");
  const [severity, setSeverity] = useState<Severity>("mild");
  const [durationValue, setDurationValue] = useState<number>(1);
  const [durationUnit, setDurationUnit] = useState<DurationUnit>("days");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const copy = LANGUAGES.find((language) => language.code === languageCode) ?? LANGUAGES[0];

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    const trimmedSymptoms = symptoms.trim();
    if (!trimmedSymptoms) {
      setError(copy.errors.symptoms);
      return;
    }
    if (!Number.isFinite(durationValue) || durationValue <= 0) {
      setError(copy.errors.duration);
      return;
    }

    setLoading(true);
    try {
      const result = await analyzeSymptoms({
        symptoms: trimmedSymptoms,
        severity,
        durationValue,
        durationUnit
      });

      sessionStorage.setItem(
        SESSION_RESULT_KEY,
        JSON.stringify({
          request: {
            symptoms: trimmedSymptoms,
            severity,
            durationValue,
            durationUnit
          },
          response: result
        })
      );
      router.push("/result");
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : copy.errors.unexpected;
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <div className="language-toolbar" aria-label="Language selector">
        {LANGUAGES.map((language) => (
          <button
            className={language.code === languageCode ? "language-chip active" : "language-chip"}
            key={language.code}
            onClick={() => {
              setLanguageCode(language.code);
              setError("");
            }}
            type="button"
          >
            {language.name}
          </button>
        ))}
      </div>

      <h1 className="page-title">{copy.title}</h1>
      <p className="page-subtitle">{copy.subtitle}</p>

      <form className="panel" onSubmit={onSubmit} style={{ marginTop: 18, padding: 18 }}>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="symptoms">{copy.symptomsLabel}</label>
          <textarea
            id="symptoms"
            value={symptoms}
            onChange={(event) => setSymptoms(event.target.value)}
            placeholder={copy.symptomsPlaceholder}
          />
        </div>

        <div className="grid-2">
          <div>
            <label htmlFor="severity">{copy.severityLabel}</label>
            <select
              id="severity"
              value={severity}
              onChange={(event) => setSeverity(event.target.value as Severity)}
            >
              <option value="mild">{copy.severity.mild}</option>
              <option value="moderate">{copy.severity.moderate}</option>
              <option value="severe">{copy.severity.severe}</option>
            </select>
          </div>
          <div>
            <label htmlFor="durationValue">{copy.durationLabel}</label>
            <div className="grid-2" style={{ gap: 8 }}>
              <input
                id="durationValue"
                type="number"
                min={1}
                value={durationValue}
                onChange={(event) => setDurationValue(Number(event.target.value))}
              />
              <select
                value={durationUnit}
                onChange={(event) => setDurationUnit(event.target.value as DurationUnit)}
              >
                <option value="hours">{copy.units.hours}</option>
                <option value="days">{copy.units.days}</option>
                <option value="weeks">{copy.units.weeks}</option>
                <option value="months">{copy.units.months}</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 12, color: "#475467", fontSize: 13 }}>
          {copy.uploadNote}
        </div>

        {error && <p className="inline-error">{error}</p>}

        <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
          <button className="btn-primary" disabled={loading} type="submit">
            {loading ? copy.analyzing : copy.analyze}
          </button>
          <button className="btn-secondary" onClick={() => router.push("/doctors")} type="button">
            {copy.doctors}
          </button>
        </div>
      </form>

      <p className="disclaimer-banner">{copy.disclaimer}</p>
    </section>
  );
}
