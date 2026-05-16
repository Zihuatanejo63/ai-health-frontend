import type { LanguageCode } from "@/lib/language";

const safety = {
  en: "HealthMatchAI does not diagnose, prescribe, treat, or replace professional medical care. If you have severe symptoms such as chest pain, trouble breathing, confusion, severe dehydration, or other emergency signs, seek urgent medical help.",
  zh: "HealthMatchAI 不诊断、不处方，也不能替代专业医疗服务。如果出现胸痛、呼吸困难、意识混乱、严重脱水或其他急症信号，请立即寻求紧急医疗帮助。",
  es: "HealthMatchAI no diagnostica, no receta ni reemplaza la atención médica profesional. Si tienes dolor de pecho, dificultad para respirar, confusión, deshidratación grave u otros signos de emergencia, busca ayuda médica urgente.",
  hi: "HealthMatchAI निदान या दवा नहीं देता और पेशेवर चिकित्सा देखभाल का विकल्प नहीं है। सीने में दर्द, सांस लेने में कठिनाई, भ्रम, गंभीर निर्जलीकरण या अन्य आपात संकेत हों तो तुरंत चिकित्सा सहायता लें।",
  ar: "لا يقوم HealthMatchAI بالتشخيص أو الوصف ولا يحل محل الرعاية الطبية المتخصصة. إذا ظهرت أعراض شديدة مثل ألم الصدر أو صعوبة التنفس أو الارتباك أو الجفاف الشديد أو أي علامات طارئة، فاطلب مساعدة طبية عاجلة.",
  pt: "HealthMatchAI não diagnostica, não prescreve e não substitui cuidados médicos profissionais. Se houver dor no peito, dificuldade para respirar, confusão, desidratação grave ou outros sinais de emergência, procure ajuda médica urgente.",
  fr: "HealthMatchAI ne diagnostique pas, ne prescrit pas et ne remplace pas les soins médicaux professionnels. En cas de douleur thoracique, difficulté à respirer, confusion, déshydratation sévère ou autre signe d'urgence, demandez une aide médicale urgente.",
  de: "HealthMatchAI stellt keine Diagnose, verschreibt nichts und ersetzt keine professionelle medizinische Versorgung. Bei Brustschmerz, Atemnot, Verwirrtheit, schwerer Dehydrierung oder anderen Notfallzeichen suchen Sie dringend medizinische Hilfe.",
  ja: "HealthMatchAI は診断や処方を行わず、専門的な医療の代わりにはなりません。胸痛、呼吸困難、混乱、重度の脱水、その他の緊急サインがある場合は、至急医療機関に相談してください。",
  ko: "HealthMatchAI는 진단하거나 처방하지 않으며 전문 의료를 대체하지 않습니다. 흉통, 호흡곤란, 혼란, 심한 탈수 또는 기타 응급 징후가 있으면 즉시 의료 도움을 받으세요."
};

export const copy = {
  en: {
    languageName: "English",
    nav: ["Symptom Check", "Care Options", "Insurance Guide", "Health Records", "Pricing"],
    footerSummary: "AI-assisted symptom triage, care guidance, and insurance navigation.",
    footerSafety: "HealthMatchAI does not diagnose, treat, prescribe, or sell insurance.",
    legal: ["Privacy", "Terms", "Medical Disclaimer", "Emergency Notice", "Cookie Policy"],
    banner: "HealthMatchAI does not diagnose, prescribe, treat, or replace professional medical care. Insurance information is educational only and does not constitute insurance advice. For insurance enrollment, speak with a licensed insurance agent or broker.",
    safety: safety.en,
    home: {
      eyebrow: "Dashboard",
      title: "Welcome back",
      subtitle: "How can we help you today?",
      start: "Start Symptom Check",
      careCta: "Find My Care Option",
      previewKicker: "AI triage result preview",
      previewSymptom: "Symptom: Fever + cough",
      riskLevel: "Risk level",
      moderate: "Moderate",
      recommendedCare: "Recommended care",
      previewCare: "Primary care / urgent care if worsening",
      insuranceNote: "Insurance note: Check urgent care vs ER coverage before going",
      symptomTitle: "Understand your symptoms. Get clear next steps.",
      symptomDescription: "Answer a few simple questions about your symptoms, duration, severity, and warning signs.",
      symptomsLabel: "Primary symptoms",
      symptomsPlaceholder: "Example: fever and cough for 2 days, temperature 101°F, worse at night.",
      severityLabel: "Current severity",
      durationLabel: "Duration",
      analyzing: "Checking symptoms...",
      careTitle: "Find the right level of care, right when you need it.",
      careDescription: "Learn whether emergency care, urgent care, primary care, telehealth, or self-care may be appropriate based on your answers.",
      prepTitle: "Everything your doctor needs, ready to review.",
      prepDescription: "Create a clear, organized summary with your symptoms, timeline, medications, red flags checked, and questions to ask.",
      insuranceTitle: "Understand your coverage before you overpay.",
      insuranceDescription: "Learn key insurance terms and prepare the right questions before choosing where to seek care.",
      safetyTitle: "Designed for guidance, not diagnosis.",
      symptoms: ["Fever", "Cough", "Headache", "Stomach pain", "Rash", "Chest discomfort", "Urinary pain", "Diarrhea"],
      careLevels: [["Emergency", "Seek emergency care now"], ["Urgent Care", "Get care today"], ["Primary Care", "See a clinician soon"], ["Telehealth", "Start with virtual care"], ["Self-care", "Monitor at home"]],
      insuranceTopics: ["Urgent care vs ER", "Deductible", "Copay", "Out-of-pocket maximum", "In-network vs out-of-network", "Talk to a licensed insurance partner"],
      severity: { mild: "Mild", moderate: "Moderate", severe: "Severe" },
      units: { hours: "Hours", days: "Days", weeks: "Weeks", months: "Months" },
      errors: { symptoms: "Please provide symptom details.", duration: "Duration must be greater than 0.", unexpected: "Unexpected error." }
    },
    summary: {
      eyebrow: "Doctor Visit Prep",
      title: "Doctor-ready Summary",
      fields: ["Main symptoms", "Timeline", "Temperature / pain level", "Medications taken", "Red flags checked", "Questions to ask"],
      cta: "Create Doctor-ready Summary",
      fullCta: "Download Full PDF Report"
    },
    result: {
      unavailableText: "Start a symptom check first to create your care level, Doctor-ready Summary, and insurance checklist.",
      title: "Your symptom check result",
      reference: "Reference ID",
      current: "Current result",
      recommended: "Recommended Care Level",
      why: "Why this result?",
      redFlags: "Red Flags Checked",
      causes: "Possible Causes",
      monitor: "What to Monitor",
      summaryDescription: "Free preview. Download the full PDF report when you want a shareable visit note.",
      insurance: "Insurance Checklist",
      whyText: "This {risk} result is based on the symptoms, severity, duration, red flags, and care level signals you provided. The recommended care level is {care}, but a licensed clinician should make care decisions with your full history and exam.",
      possiblePrefix: "Your symptoms may be consistent with",
      risk: { Low: "Low", Moderate: "Moderate", High: "High", Emergency: "Emergency" },
      careDescriptions: {
        Emergency: "Seek emergency care now",
        "Urgent Care": "Get care today",
        "Primary Care": "See a clinician soon",
        Telehealth: "Start with virtual care",
        "Pharmacy/Self-care": "Ask a pharmacist or use self-care when appropriate",
        "Monitor at home": "Track symptoms and reassess if things change"
      },
      fallbackCare: "Choose the care setting that matches your symptoms."
    },
    insurance: {
      eyebrow: "Insurance Navigation",
      title: "Insurance Checklist",
      description: "Educational checklist only. For plan-specific decisions, speak with a licensed insurance agent or broker.",
      items: ["Is urgent care covered?", "Is the provider in-network?", "What is your copay?", "Does your deductible apply?", "Is telehealth covered?"],
      cta: "Understand Coverage Options"
    }
  },
  zh: {
    languageName: "中文",
    nav: ["症状检查", "就医选择", "保险指南", "健康记录", "价格"],
    footerSummary: "AI 辅助症状分诊、就医指导和保险导航。",
    footerSafety: "HealthMatchAI 不诊断、不治疗、不处方，也不销售保险。",
    legal: ["隐私", "条款", "医疗免责声明", "急救提示", "Cookie 政策"],
    banner: "HealthMatchAI 不诊断、不处方、不治疗，也不能替代专业医疗服务。保险信息仅供教育参考，不构成保险建议。投保请咨询持牌保险代理人或经纪人。",
    safety: safety.zh,
    home: {
      eyebrow: "症状分诊 · 就医路线 · 保险导航",
      title: "知道该去哪看病，也知道可能怎么付费。",
      subtitle: "检查症状、了解风险等级、选择合适就医方式，并准备清晰的医生沟通摘要。",
      start: "开始症状检查",
      careCta: "查找就医选择",
      previewKicker: "AI 分诊结果预览",
      previewSymptom: "症状：发热 + 咳嗽",
      riskLevel: "风险等级",
      moderate: "中等",
      recommendedCare: "建议就医方式",
      previewCare: "初级保健；如加重则考虑急诊门诊",
      insuranceNote: "保险提示：前往前先了解 urgent care 与 ER 的保障差异",
      symptomTitle: "从你的感受开始",
      symptomDescription: "选择常见症状或自行描述。结果会帮助你理解风险、可能原因和就医选择。",
      symptomsLabel: "主要症状",
      symptomsPlaceholder: "例如：发热和咳嗽 2 天，体温 38.3°C，夜间加重。",
      severityLabel: "当前严重程度",
      durationLabel: "持续时间",
      analyzing: "检查中...",
      careTitle: "选择合适的就医地点",
      careDescription: "在花时间或花钱前，先比较常见就医路线。",
      prepTitle: "让医生沟通更清楚",
      prepDescription: "把零散症状记录整理成结构化的 Doctor-ready Summary。",
      insuranceTitle: "知道该问哪些保险问题",
      insuranceDescription: "仅作教育说明。HealthMatchAI 不销售保险，也不推荐具体计划。",
      safetyTitle: "把它当作参考，而不是最终结论",
      symptoms: ["发热", "咳嗽", "头痛", "胃痛/腹痛", "皮疹", "胸部不适", "尿痛", "腹泻"],
      careLevels: [["急救", "立即寻求紧急医疗帮助"], ["急诊门诊", "今天就医"], ["初级保健", "尽快看临床医生"], ["远程医疗", "先从线上问诊开始"], ["自我护理", "在家观察"]],
      insuranceTopics: ["Urgent care 与 ER", "免赔额", "共付额", "自付上限", "网络内与网络外", "咨询持牌保险伙伴"],
      severity: { mild: "轻微", moderate: "中等", severe: "严重" },
      units: { hours: "小时", days: "天", weeks: "周", months: "月" },
      errors: { symptoms: "请填写症状详情。", duration: "持续时间必须大于 0。", unexpected: "发生未知错误。" }
    },
    summary: {
      eyebrow: "医生沟通准备",
      title: "医生可读摘要",
      fields: ["主要症状", "时间线", "体温/疼痛等级", "已服药物", "已检查危险信号", "想问的问题"],
      cta: "创建医生可读摘要",
      fullCta: "下载完整 PDF 报告"
    },
    result: {
      unavailableText: "请先开始症状检查，生成就医等级、医生可读摘要和保险清单。",
      title: "你的症状检查结果",
      reference: "参考编号",
      current: "当前结果",
      recommended: "建议就医等级",
      why: "为什么是这个结果？",
      redFlags: "已检查危险信号",
      causes: "可能原因",
      monitor: "需要观察什么",
      summaryDescription: "免费版显示预览。需要可分享就诊记录时可下载完整 PDF。",
      insurance: "保险清单",
      whyText: "这个{risk}结果基于你提供的症状、严重程度、持续时间、危险信号和就医等级线索。建议就医等级是 {care}，但具体就医决定应由持牌临床人员结合完整病史和检查作出。",
      possiblePrefix: "你的症状可能符合",
      risk: { Low: "低", Moderate: "中等", High: "高", Emergency: "急症" },
      careDescriptions: {
        Emergency: "立即寻求紧急医疗帮助",
        "Urgent Care": "今天就医",
        "Primary Care": "尽快看临床医生",
        Telehealth: "先从线上问诊开始",
        "Pharmacy/Self-care": "可咨询药剂师或适当自我护理",
        "Monitor at home": "在家观察，如有变化重新评估"
      },
      fallbackCare: "选择与你症状相匹配的就医方式。"
    },
    insurance: {
      eyebrow: "保险导航",
      title: "保险清单",
      description: "仅供教育参考。具体计划决策请咨询持牌保险代理人或经纪人。",
      items: ["Urgent care 是否覆盖？", "服务方是否在网络内？", "共付额是多少？", "是否适用免赔额？", "是否覆盖远程医疗？"],
      cta: "了解我的保障选择"
    }
  }
} as const;

type Copy = {
  languageName: string;
  nav: readonly string[];
  footerSummary: string;
  footerSafety: string;
  legal: readonly string[];
  banner: string;
  safety: string;
  home: {
    eyebrow: string;
    title: string;
    subtitle: string;
    start: string;
    careCta: string;
    previewKicker: string;
    previewSymptom: string;
    riskLevel: string;
    moderate: string;
    recommendedCare: string;
    previewCare: string;
    insuranceNote: string;
    symptomTitle: string;
    symptomDescription: string;
    symptomsLabel: string;
    symptomsPlaceholder: string;
    severityLabel: string;
    durationLabel: string;
    analyzing: string;
    careTitle: string;
    careDescription: string;
    prepTitle: string;
    prepDescription: string;
    insuranceTitle: string;
    insuranceDescription: string;
    safetyTitle: string;
    symptoms: readonly string[];
    careLevels: readonly (readonly [string, string])[];
    insuranceTopics: readonly string[];
    severity: Record<"mild" | "moderate" | "severe", string>;
    units: Record<"hours" | "days" | "weeks" | "months", string>;
    errors: Record<"symptoms" | "duration" | "unexpected", string>;
  };
  summary: {
    eyebrow: string;
    title: string;
    fields: readonly string[];
    cta: string;
    fullCta: string;
  };
  result: {
    unavailableText: string;
    title: string;
    reference: string;
    current: string;
    recommended: string;
    why: string;
    redFlags: string;
    causes: string;
    monitor: string;
    summaryDescription: string;
    insurance: string;
    whyText: string;
    possiblePrefix: string;
    risk: Record<"Low" | "Moderate" | "High" | "Emergency", string>;
    careDescriptions: Record<string, string>;
    fallbackCare: string;
  };
  insurance: {
    eyebrow: string;
    title: string;
    description: string;
    items: readonly string[];
    cta: string;
  };
};

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

const overrides: Partial<Record<Exclude<LanguageCode, "en" | "zh">, DeepPartial<Copy>>> = {
  es: {
    languageName: "Español",
    nav: ["Síntomas", "Opciones", "Seguro", "Registros", "Precios"],
    footerSummary: "Triaje de síntomas, opciones de atención, preparación para la consulta y navegación de seguros.",
    footerSafety: "HealthMatchAI no diagnostica, no receta, no reemplaza atención médica profesional ni vende seguros.",
    legal: ["Privacidad", "Términos", "Aviso médico", "Emergencia", "Cookies"],
    banner: "HealthMatchAI no diagnostica, no receta ni reemplaza atención médica profesional. La información de seguros es educativa. Para inscribirte en un plan, habla con un agente o broker autorizado.",
    home: { title: "Sepa qué atención necesita y cómo pagarla.", subtitle: "Revise sus síntomas, entienda su nivel de riesgo, elija la opción de atención adecuada y prepare un resumen claro para un clínico.", start: "Iniciar revisión", careCta: "Ver opciones de atención", symptomsLabel: "Síntomas principales", severityLabel: "Gravedad actual", durationLabel: "Duración", analyzing: "Revisando...", symptoms: ["Fiebre", "Tos", "Dolor de cabeza", "Dolor de estómago", "Sarpullido", "Molestia en el pecho", "Dolor al orinar", "Diarrea"], errors: { symptoms: "Describe tus síntomas.", duration: "La duración debe ser mayor que 0.", unexpected: "Error inesperado." } },
    summary: { eyebrow: "Preparación para la consulta", title: "Resumen para el clínico", fields: ["Síntomas principales", "Cronología", "Temperatura / dolor", "Medicamentos tomados", "Señales revisadas", "Preguntas"], cta: "Descargar informe PDF", fullCta: "Descargar informe PDF completo" },
    result: { title: "Resultado de revisión de síntomas", recommended: "Nivel de atención recomendado", why: "¿Por qué este resultado?", redFlags: "Señales de alarma revisadas", causes: "Posibles causas", monitor: "Qué vigilar", insurance: "Lista de seguro", current: "Resultado actual", reference: "ID de referencia", possiblePrefix: "Sus síntomas pueden ser compatibles con" },
    insurance: { eyebrow: "Navegación de seguros", title: "Lista de seguro", description: "Lista educativa. Para decisiones específicas, habla con un agente o broker autorizado.", items: ["¿Cubre urgent care?", "¿El proveedor está en red?", "¿Cuál es tu copago?", "¿Aplica el deducible?", "¿Cubre telehealth?"], cta: "Entender mis opciones de cobertura" }
  },
  pt: {
    languageName: "Português",
    nav: ["Sintomas", "Opções", "Seguro", "Registros", "Preços"],
    footerSummary: "Triagem de sintomas, opções de cuidado, preparo para consulta e navegação de seguros.",
    footerSafety: "HealthMatchAI não diagnostica, não prescreve, não substitui cuidados médicos e não vende seguros.",
    legal: ["Privacidade", "Termos", "Aviso médico", "Emergência", "Cookies"],
    banner: "HealthMatchAI não diagnostica, não prescreve nem substitui cuidados médicos. Informações de seguro são educativas. Para inscrição, fale com um agente ou corretor licenciado.",
    home: { title: "Saiba que cuidado você precisa e como pagar por ele.", subtitle: "Verifique sintomas, entenda o risco, escolha a opção certa e prepare um resumo claro para um clínico.", start: "Iniciar checagem", careCta: "Ver opção de cuidado", symptomsLabel: "Sintomas principais", severityLabel: "Gravidade atual", durationLabel: "Duração", analyzing: "Verificando...", symptoms: ["Febre", "Tosse", "Dor de cabeça", "Dor abdominal", "Erupção", "Desconforto no peito", "Dor ao urinar", "Diarreia"] },
    summary: { eyebrow: "Preparo para consulta", title: "Resumo para o clínico", fields: ["Sintomas principais", "Linha do tempo", "Temperatura / dor", "Medicamentos usados", "Sinais de alerta", "Perguntas"], cta: "Baixar relatório PDF", fullCta: "Baixar relatório PDF completo" },
    result: { title: "Resultado da checagem de sintomas", recommended: "Nível de cuidado recomendado", why: "Por que este resultado?", redFlags: "Sinais de alerta verificados", causes: "Possíveis causas", monitor: "O que monitorar", insurance: "Checklist de seguro", current: "Resultado atual", reference: "ID de referência", possiblePrefix: "Seus sintomas podem ser compatíveis com" },
    insurance: { eyebrow: "Navegação de seguros", title: "Checklist de seguro", description: "Checklist educativo. Para decisões de plano, fale com um agente ou corretor licenciado.", items: ["Urgent care é coberto?", "O provedor está na rede?", "Qual é seu copay?", "A franquia se aplica?", "Telehealth é coberto?"], cta: "Entender minhas opções de cobertura" }
  },
  fr: {
    languageName: "Français",
    nav: ["Symptômes", "Options", "Assurance", "Dossier", "Prix"],
    footerSummary: "Triage des symptômes, choix de soins, préparation de consultation et navigation assurance.",
    footerSafety: "HealthMatchAI ne diagnostique pas, ne prescrit pas, ne remplace pas les soins médicaux et ne vend pas d'assurance.",
    legal: ["Confidentialité", "Conditions", "Avis médical", "Urgence", "Cookies"],
    banner: "HealthMatchAI ne diagnostique pas, ne prescrit pas et ne remplace pas les soins médicaux. Les informations d'assurance sont éducatives. Pour souscrire, parlez à un agent ou courtier agréé.",
    home: { title: "Sachez quels soins chercher et comment les payer.", subtitle: "Vérifiez vos symptômes, comprenez le niveau de risque, choisissez l'option adaptée et préparez un résumé clair pour un clinicien.", start: "Commencer", careCta: "Voir mes options", symptomsLabel: "Symptômes principaux", severityLabel: "Gravité actuelle", durationLabel: "Durée", analyzing: "Analyse...", symptoms: ["Fièvre", "Toux", "Mal de tête", "Douleur abdominale", "Éruption", "Gêne thoracique", "Douleur urinaire", "Diarrhée"] },
    summary: { eyebrow: "Préparation de consultation", title: "Résumé pour le clinicien", fields: ["Symptômes principaux", "Chronologie", "Température / douleur", "Médicaments pris", "Signaux vérifiés", "Questions"], cta: "Télécharger le PDF", fullCta: "Télécharger le rapport PDF complet" },
    result: { title: "Résultat de vérification des symptômes", recommended: "Niveau de soins recommandé", why: "Pourquoi ce résultat ?", redFlags: "Signaux d'alerte vérifiés", causes: "Causes possibles", monitor: "À surveiller", insurance: "Liste assurance", current: "Résultat actuel", reference: "ID de référence", possiblePrefix: "Vos symptômes peuvent être compatibles avec" },
    insurance: { eyebrow: "Navigation assurance", title: "Liste assurance", description: "Liste éducative uniquement. Pour un choix de plan, parlez à un agent ou courtier agréé.", items: ["Urgent care est-il couvert ?", "Le prestataire est-il dans le réseau ?", "Quel est votre copay ?", "La franchise s'applique-t-elle ?", "La télésanté est-elle couverte ?"], cta: "Comprendre mes options de couverture" }
  },
  de: {
    languageName: "Deutsch",
    nav: ["Symptome", "Optionen", "Versicherung", "Unterlagen", "Preise"],
    footerSummary: "Symptom-Triage, Versorgungsoptionen, Arztgespräch-Vorbereitung und Versicherungsnavigation.",
    footerSafety: "HealthMatchAI diagnostiziert nicht, verschreibt nichts, ersetzt keine medizinische Versorgung und verkauft keine Versicherung.",
    legal: ["Datenschutz", "Bedingungen", "Medizinischer Hinweis", "Notfall", "Cookies"],
    banner: "HealthMatchAI diagnostiziert nicht, verschreibt nichts und ersetzt keine medizinische Versorgung. Versicherungsinformationen sind nur Bildungsinhalte. Für Anmeldung sprechen Sie mit einem lizenzierten Makler oder Agenten.",
    home: { title: "Wissen Sie, welche Versorgung Sie brauchen und wie Sie zahlen.", subtitle: "Prüfen Sie Symptome, verstehen Sie Ihr Risiko, wählen Sie die passende Versorgung und bereiten Sie eine klare Zusammenfassung vor.", start: "Symptomcheck starten", careCta: "Versorgungsoption finden", symptomsLabel: "Hauptsymptome", severityLabel: "Aktuelle Schwere", durationLabel: "Dauer", analyzing: "Prüfung...", symptoms: ["Fieber", "Husten", "Kopfschmerz", "Bauchschmerz", "Ausschlag", "Brustbeschwerden", "Schmerz beim Wasserlassen", "Durchfall"] },
    summary: { eyebrow: "Arztgespräch vorbereiten", title: "Zusammenfassung für Behandler", fields: ["Hauptsymptome", "Zeitverlauf", "Temperatur / Schmerz", "Genommene Medikamente", "Warnzeichen geprüft", "Fragen"], cta: "PDF-Bericht laden", fullCta: "Vollständigen PDF-Bericht laden" },
    result: { title: "Ergebnis des Symptomchecks", recommended: "Empfohlenes Versorgungsniveau", why: "Warum dieses Ergebnis?", redFlags: "Warnzeichen geprüft", causes: "Mögliche Ursachen", monitor: "Was beobachten", insurance: "Versicherungs-Checkliste", current: "Aktuelles Ergebnis", reference: "Referenz-ID", possiblePrefix: "Ihre Symptome können vereinbar sein mit" },
    insurance: { eyebrow: "Versicherungsnavigation", title: "Versicherungs-Checkliste", description: "Nur Bildungsinhalt. Für konkrete Planentscheidungen sprechen Sie mit einem lizenzierten Agenten oder Makler.", items: ["Ist urgent care gedeckt?", "Ist der Anbieter im Netzwerk?", "Wie hoch ist der Copay?", "Gilt die Selbstbeteiligung?", "Ist Telehealth gedeckt?"], cta: "Meine Deckungsoptionen verstehen" }
  },
  ja: {
    languageName: "日本語",
    nav: ["症状チェック", "受診選択", "保険ガイド", "健康記録", "料金"],
    footerSummary: "症状トリアージ、受診レベル選択、受診準備、保険ナビゲーション。",
    footerSafety: "HealthMatchAI は診断・処方を行わず、専門医療の代替ではなく、保険販売もしません。",
    legal: ["プライバシー", "規約", "医療免責", "緊急時", "Cookie"],
    banner: "HealthMatchAI は診断や処方を行わず、専門医療に代わるものではありません。保険情報は教育目的のみです。加入は認可された代理人・ブローカーに相談してください。",
    home: { title: "必要なケアと支払い方を知る。", subtitle: "症状を確認し、リスクを理解し、適切な受診先を選び、医師に伝える要約を準備します。", start: "症状チェック開始", careCta: "受診先を探す", symptomsLabel: "主な症状", severityLabel: "現在の重症度", durationLabel: "期間", analyzing: "確認中...", symptoms: ["発熱", "咳", "頭痛", "腹痛", "発疹", "胸部不快感", "排尿痛", "下痢"] },
    summary: { eyebrow: "受診準備", title: "医療者向け要約", fields: ["主な症状", "経過", "体温 / 痛み", "服用薬", "危険サイン確認", "質問"], cta: "PDF レポートをダウンロード", fullCta: "完全な PDF レポートをダウンロード" },
    result: { title: "症状チェック結果", recommended: "推奨される受診レベル", why: "この結果の理由", redFlags: "確認した危険サイン", causes: "考えられる原因", monitor: "観察すること", insurance: "保険チェックリスト", current: "現在の結果", reference: "参照ID", possiblePrefix: "あなたの症状は次と一致する可能性があります：" },
    insurance: { eyebrow: "保険ナビゲーション", title: "保険チェックリスト", description: "教育目的のみです。具体的な加入判断は認可された代理人・ブローカーに相談してください。", items: ["Urgent care は対象？", "提供者はネットワーク内？", "自己負担額は？", "免責額は適用？", "遠隔診療は対象？"], cta: "保障選択肢を理解する" }
  },
  ko: {
    languageName: "한국어",
    nav: ["증상 확인", "진료 선택", "보험 안내", "건강 기록", "요금"],
    footerSummary: "증상 분류, 진료 단계 선택, 진료 준비, 보험 안내.",
    footerSafety: "HealthMatchAI는 진단하거나 처방하지 않으며 전문 의료를 대체하거나 보험을 판매하지 않습니다.",
    legal: ["개인정보", "약관", "의료 고지", "응급", "쿠키"],
    banner: "HealthMatchAI는 진단하거나 처방하지 않으며 전문 의료를 대체하지 않습니다. 보험 정보는 교육용입니다. 가입은 면허가 있는 보험 대리인 또는 브로커와 상담하세요.",
    home: { title: "어떤 진료가 필요한지, 어떻게 부담할지 알아보세요.", subtitle: "증상을 확인하고 위험도를 이해하며 적절한 진료 옵션을 고르고 의료진에게 전달할 요약을 준비하세요.", start: "증상 확인 시작", careCta: "진료 옵션 찾기", symptomsLabel: "주요 증상", severityLabel: "현재 심각도", durationLabel: "기간", analyzing: "확인 중...", symptoms: ["열", "기침", "두통", "복통", "발진", "가슴 불편감", "배뇨통", "설사"] },
    summary: { eyebrow: "진료 준비", title: "의료진용 요약", fields: ["주요 증상", "타임라인", "체온 / 통증", "복용 약", "위험 신호 확인", "질문"], cta: "PDF 보고서 다운로드", fullCta: "전체 PDF 보고서 다운로드" },
    result: { title: "증상 확인 결과", recommended: "권장 진료 단계", why: "이 결과의 이유", redFlags: "확인한 위험 신호", causes: "가능한 원인", monitor: "관찰할 항목", insurance: "보험 체크리스트", current: "현재 결과", reference: "참조 ID", possiblePrefix: "증상은 다음과 관련될 수 있습니다:" },
    insurance: { eyebrow: "보험 안내", title: "보험 체크리스트", description: "교육용 체크리스트입니다. 구체적인 보험 결정은 면허가 있는 보험 대리인 또는 브로커와 상담하세요.", items: ["Urgent care가 보장되나요?", "제공자가 네트워크 내인가요?", "Copay는 얼마인가요?", "Deductible이 적용되나요?", "Telehealth가 보장되나요?"], cta: "보장 옵션 이해하기" }
  },
  hi: {
    languageName: "हिन्दी",
    nav: ["लक्षण जांच", "देखभाल विकल्प", "बीमा गाइड", "रिकॉर्ड", "मूल्य"],
    footerSummary: "लक्षण ट्रायेज, देखभाल स्तर, डॉक्टर विजिट तैयारी और बीमा नेविगेशन.",
    footerSafety: "HealthMatchAI निदान/दवा नहीं देता, चिकित्सा देखभाल का विकल्प नहीं है और बीमा नहीं बेचता.",
    legal: ["गोपनीयता", "शर्तें", "चिकित्सा सूचना", "आपात", "कुकी"],
    banner: "HealthMatchAI निदान या दवा नहीं देता और पेशेवर देखभाल का विकल्प नहीं है। बीमा जानकारी केवल शिक्षा के लिए है। नामांकन के लिए लाइसेंस प्राप्त एजेंट/ब्रोकर से बात करें।"
    ,
    home: { title: "जानें आपको कौन सी देखभाल चाहिए और भुगतान कैसे होगा।", subtitle: "लक्षण जांचें, जोखिम स्तर समझें, सही देखभाल विकल्प चुनें और clinician के लिए साफ सारांश तैयार करें।", start: "लक्षण जांच शुरू करें", careCta: "देखभाल विकल्प खोजें", symptomsLabel: "मुख्य लक्षण", severityLabel: "वर्तमान गंभीरता", durationLabel: "अवधि", analyzing: "जांच हो रही है...", symptoms: ["बुखार", "खांसी", "सिरदर्द", "पेट दर्द", "रैश", "सीने में असुविधा", "पेशाब में दर्द", "दस्त"] },
    summary: { eyebrow: "डॉक्टर विजिट तैयारी", title: "Clinician-ready सारांश", fields: ["मुख्य लक्षण", "समयरेखा", "तापमान / दर्द", "ली गई दवाएं", "रेड फ्लैग जांचे", "पूछने वाले सवाल"], cta: "PDF रिपोर्ट डाउनलोड करें", fullCta: "पूरी PDF रिपोर्ट डाउनलोड करें" },
    result: { title: "आपकी लक्षण जांच का परिणाम", recommended: "सुझाया गया देखभाल स्तर", why: "यह परिणाम क्यों?", redFlags: "जांचे गए रेड फ्लैग", causes: "संभावित कारण", monitor: "क्या देखें", insurance: "बीमा चेकलिस्ट", current: "वर्तमान परिणाम", reference: "संदर्भ ID", possiblePrefix: "आपके लक्षण इससे मेल खा सकते हैं" },
    insurance: { eyebrow: "बीमा नेविगेशन", title: "बीमा चेकलिस्ट", description: "केवल शैक्षिक चेकलिस्ट। योजना संबंधी निर्णय के लिए लाइसेंस प्राप्त एजेंट/ब्रोकर से बात करें।", items: ["क्या urgent care कवर है?", "क्या provider in-network है?", "आपका copay क्या है?", "क्या deductible लागू है?", "क्या telehealth कवर है?"], cta: "मेरे coverage विकल्प समझें" }
  },
  ar: {
    languageName: "العربية",
    nav: ["فحص الأعراض", "خيارات الرعاية", "دليل التأمين", "السجلات", "الأسعار"],
    footerSummary: "فرز الأعراض، اختيار مستوى الرعاية، التحضير للطبيب، وتوجيه التأمين.",
    footerSafety: "لا يشخص HealthMatchAI ولا يصف ولا يحل محل الرعاية الطبية ولا يبيع التأمين.",
    legal: ["الخصوصية", "الشروط", "تنبيه طبي", "الطوارئ", "ملفات الارتباط"],
    banner: "لا يقوم HealthMatchAI بالتشخيص أو الوصف ولا يحل محل الرعاية الطبية. معلومات التأمين تعليمية فقط. للتسجيل تحدث مع وكيل أو وسيط تأمين مرخص."
    ,
    home: { title: "اعرف نوع الرعاية التي تحتاجها وكيف تدفع تكلفتها.", subtitle: "افحص الأعراض، افهم مستوى الخطورة، اختر خيار الرعاية المناسب، وجهز ملخصا واضحا للطبيب.", start: "ابدأ فحص الأعراض", careCta: "اعرف خيار الرعاية", symptomsLabel: "الأعراض الرئيسية", severityLabel: "الشدة الحالية", durationLabel: "المدة", analyzing: "جار الفحص...", symptoms: ["حمى", "سعال", "صداع", "ألم معدة", "طفح", "انزعاج صدري", "ألم عند التبول", "إسهال"] },
    summary: { eyebrow: "التحضير للطبيب", title: "ملخص جاهز للطبيب", fields: ["الأعراض الرئيسية", "الجدول الزمني", "الحرارة / الألم", "الأدوية المستخدمة", "علامات الخطر", "أسئلة للطبيب"], cta: "تنزيل تقرير PDF", fullCta: "تنزيل تقرير PDF كامل" },
    result: { title: "نتيجة فحص الأعراض", recommended: "مستوى الرعاية المقترح", why: "لماذا هذه النتيجة؟", redFlags: "علامات الخطر التي تم فحصها", causes: "أسباب محتملة", monitor: "ما الذي يجب مراقبته", insurance: "قائمة التأمين", current: "النتيجة الحالية", reference: "رقم المرجع", possiblePrefix: "قد تكون أعراضك متوافقة مع" },
    insurance: { eyebrow: "توجيه التأمين", title: "قائمة التأمين", description: "قائمة تعليمية فقط. لقرارات الخطة تحدث مع وكيل أو وسيط تأمين مرخص.", items: ["هل urgent care مغطى؟", "هل المزود داخل الشبكة؟", "ما قيمة copay؟", "هل ينطبق deductible؟", "هل telehealth مغطى؟"], cta: "فهم خيارات التغطية" }
  }
};

function mergeCopy(base: Copy, override?: DeepPartial<Copy>): Copy {
  return {
    ...base,
    ...override,
    home: { ...base.home, ...override?.home, errors: { ...base.home.errors, ...override?.home?.errors }, severity: { ...base.home.severity, ...override?.home?.severity }, units: { ...base.home.units, ...override?.home?.units } },
    summary: { ...base.summary, ...override?.summary },
    result: { ...base.result, ...override?.result, risk: { ...base.result.risk, ...override?.result?.risk }, careDescriptions: { ...base.result.careDescriptions, ...override?.result?.careDescriptions } },
    insurance: { ...base.insurance, ...override?.insurance }
  } as Copy;
}

export function getCopy(languageCode: LanguageCode): Copy {
  if (languageCode === "en" || languageCode === "zh") return copy[languageCode];
  return mergeCopy(copy.en, overrides[languageCode]);
}
