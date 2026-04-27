"use client";

import { useMemo, useState } from "react";
import { doctors } from "@/lib/mock-doctors";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "zh", name: "中文" },
  { code: "es", name: "Español" },
  { code: "hi", name: "हिन्दी" },
  { code: "ar", name: "العربية" },
  { code: "pt", name: "Português" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" }
] as const;

const COPY = {
  en: {
    title: "Doctor List",
    subtitle: "Mock data for MVP. Filter by specialty, country, language, price, and availability.",
    filters: "Filters",
    all: "All",
    specialty: "Specialty",
    country: "Country",
    language: "Doctor language",
    price: "Max price",
    requestFee: "Consultation request fee",
    availability: "Availability",
    availableOnly: "Available now only",
    rating: "Rating",
    session: "session",
    available: "Available now",
    unavailable: "Next availability required",
    book: "Request Consultation",
    booking: "Opening secure payment...",
    paused: "Consultation requests are temporarily paused while provider verification, pricing, and refund workflows are finalized.",
    pausedButton: "Requests Paused",
    noResults: "No doctors match these filters.",
    paymentNotice: "Platform-collected payment: the doctor is arranged after confirmation. If we cannot match an appropriate provider, refunds are handled according to policy."
  },
  zh: {
    title: "医生列表",
    subtitle: "MVP mock 数据。可按科室、国家、语言、价格和可预约状态筛选。",
    filters: "筛选",
    all: "全部",
    specialty: "科室",
    country: "国家",
    language: "医生语言",
    price: "最高价格",
    requestFee: "咨询预约费",
    availability: "可预约状态",
    availableOnly: "仅显示现在可预约",
    rating: "评分",
    session: "次咨询",
    available: "现在可预约",
    unavailable: "需查看下次可预约时间",
    book: "提交咨询请求",
    booking: "正在打开安全支付...",
    paused: "医生咨询请求暂时暂停开放，我们正在完善医生资质审核、价格和退款流程。",
    pausedButton: "请求暂未开放",
    noResults: "没有符合筛选条件的医生。",
    paymentNotice: "平台代收款：医生确认后安排服务；若无法匹配合适医生，将按退款政策处理。"
  },
  es: {
    title: "Lista de doctores",
    subtitle: "Datos simulados para el MVP. Filtra por especialidad, país, idioma, precio y disponibilidad.",
    filters: "Filtros",
    all: "Todos",
    specialty: "Especialidad",
    country: "País",
    language: "Idioma",
    price: "Precio máximo",
    requestFee: "Tarifa de solicitud de consulta",
    availability: "Disponibilidad",
    availableOnly: "Solo disponibles ahora",
    rating: "Calificación",
    session: "sesión",
    available: "Disponible ahora",
    unavailable: "Requiere próxima disponibilidad",
    book: "Solicitar consulta",
    booking: "Abriendo pago seguro...",
    paused: "Las solicitudes de consulta están pausadas mientras finalizamos verificación, precios y reembolsos.",
    pausedButton: "Solicitudes pausadas",
    noResults: "No hay doctores con estos filtros.",
    paymentNotice: "Pago cobrado por la plataforma: el médico se coordina tras la confirmación. Si no podemos encontrar un proveedor adecuado, el reembolso se gestiona según la política."
  },
  hi: {
    title: "डॉक्टर सूची",
    subtitle: "MVP mock डेटा। विशेषज्ञता, देश, भाषा, कीमत और उपलब्धता से फ़िल्टर करें।",
    filters: "फ़िल्टर",
    all: "सभी",
    specialty: "विशेषता",
    country: "देश",
    language: "भाषा",
    price: "अधिकतम कीमत",
    requestFee: "परामर्श अनुरोध शुल्क",
    availability: "उपलब्धता",
    availableOnly: "केवल अभी उपलब्ध",
    rating: "रेटिंग",
    session: "सत्र",
    available: "अभी उपलब्ध",
    unavailable: "अगली उपलब्धता आवश्यक",
    book: "परामर्श अनुरोध भेजें",
    booking: "सुरक्षित भुगतान खुल रहा है...",
    paused: "Provider verification, pricing और refund workflow पूरा होने तक consultation requests अस्थायी रूप से रुकी हैं।",
    pausedButton: "Requests paused",
    noResults: "इन फ़िल्टर से कोई डॉक्टर नहीं मिला।",
    paymentNotice: "Platform-collected payment: पुष्टि के बाद डॉक्टर की व्यवस्था की जाती है। उपयुक्त provider न मिलने पर refund policy के अनुसार 처리 होगा।"
  },
  ar: {
    title: "قائمة الأطباء",
    subtitle: "بيانات تجريبية للنسخة الأولية. يمكنك التصفية حسب التخصص والبلد واللغة والسعر والتوفر.",
    filters: "الفلاتر",
    all: "الكل",
    specialty: "التخصص",
    country: "البلد",
    language: "اللغة",
    price: "أعلى سعر",
    requestFee: "رسوم طلب الاستشارة",
    availability: "التوفر",
    availableOnly: "المتاحون الآن فقط",
    rating: "التقييم",
    session: "جلسة",
    available: "متاح الآن",
    unavailable: "يتطلب موعدا لاحقا",
    book: "إرسال طلب استشارة",
    booking: "جار فتح الدفع الآمن...",
    paused: "طلبات الاستشارة متوقفة مؤقتا حتى اكتمال التحقق من مقدمي الخدمة والتسعير وسياسة الاسترداد.",
    pausedButton: "الطلبات متوقفة مؤقتا",
    noResults: "لا يوجد أطباء يطابقون هذه الفلاتر.",
    paymentNotice: "دفع يتم تحصيله عبر المنصة: يتم ترتيب الطبيب بعد التأكيد. إذا تعذر匹配 مزود مناسب، تتم معالجة الاسترداد حسب السياسة."
  },
  pt: {
    title: "Lista de médicos",
    subtitle: "Dados mock para o MVP. Filtre por especialidade, país, idioma, preço e disponibilidade.",
    filters: "Filtros",
    all: "Todos",
    specialty: "Especialidade",
    country: "País",
    language: "Idioma",
    price: "Preço máximo",
    requestFee: "Taxa de solicitação de consulta",
    availability: "Disponibilidade",
    availableOnly: "Apenas disponíveis agora",
    rating: "Avaliação",
    session: "sessão",
    available: "Disponível agora",
    unavailable: "Próxima disponibilidade necessária",
    book: "Solicitar consulta",
    booking: "Abrindo pagamento seguro...",
    paused: "As solicitações de consulta estão pausadas enquanto finalizamos verificação, preços e reembolsos.",
    pausedButton: "Solicitações pausadas",
    noResults: "Nenhum médico corresponde aos filtros.",
    paymentNotice: "Pagamento cobrado pela plataforma: o médico é organizado após confirmação. Se não for possível encontrar um provedor adequado, o reembolso segue a política."
  },
  fr: {
    title: "Liste des médecins",
    subtitle: "Données simulées pour le MVP. Filtrez par spécialité, pays, langue, prix et disponibilité.",
    filters: "Filtres",
    all: "Tous",
    specialty: "Spécialité",
    country: "Pays",
    language: "Langue",
    price: "Prix max",
    requestFee: "Frais de demande de consultation",
    availability: "Disponibilité",
    availableOnly: "Disponibles maintenant seulement",
    rating: "Note",
    session: "séance",
    available: "Disponible maintenant",
    unavailable: "Prochaine disponibilité requise",
    book: "Demander une consultation",
    booking: "Ouverture du paiement sécurisé...",
    paused: "Les demandes de consultation sont temporairement suspendues pendant la finalisation de la vérification, des prix et des remboursements.",
    pausedButton: "Demandes suspendues",
    noResults: "Aucun médecin ne correspond aux filtres.",
    paymentNotice: "Paiement collecté par la plateforme : le médecin est organisé après confirmation. Si aucun prestataire adapté ne peut être trouvé, le remboursement suit la politique."
  },
  de: {
    title: "Ärzteliste",
    subtitle: "Mock-Daten für das MVP. Nach Fachgebiet, Land, Sprache, Preis und Verfügbarkeit filtern.",
    filters: "Filter",
    all: "Alle",
    specialty: "Fachgebiet",
    country: "Land",
    language: "Sprache",
    price: "Maximalpreis",
    requestFee: "Gebühr für Beratungsanfrage",
    availability: "Verfügbarkeit",
    availableOnly: "Nur jetzt verfügbar",
    rating: "Bewertung",
    session: "Sitzung",
    available: "Jetzt verfügbar",
    unavailable: "Nächste Verfügbarkeit erforderlich",
    book: "Beratung anfragen",
    booking: "Sichere Zahlung wird geöffnet...",
    paused: "Beratungsanfragen sind vorübergehend pausiert, während Verifizierung, Preise und Erstattungen finalisiert werden.",
    pausedButton: "Anfragen pausiert",
    noResults: "Keine Ärzte passen zu diesen Filtern.",
    paymentNotice: "Von der Plattform eingezogene Zahlung: Der Arzt wird nach Bestätigung koordiniert. Wenn kein passender Anbieter gefunden wird, erfolgt die Erstattung gemäß Richtlinie."
  },
  ja: {
    title: "医師リスト",
    subtitle: "MVP 用のモックデータです。専門分野、国、言語、価格、空き状況で絞り込みできます。",
    filters: "フィルター",
    all: "すべて",
    specialty: "専門分野",
    country: "国",
    language: "言語",
    price: "上限価格",
    requestFee: "相談依頼料",
    availability: "空き状況",
    availableOnly: "現在予約可能のみ",
    rating: "評価",
    session: "回",
    available: "現在予約可能",
    unavailable: "次回の空き確認が必要",
    book: "相談を依頼",
    booking: "安全な決済を開いています...",
    paused: "医師確認、価格、返金フローの確定まで相談依頼は一時停止中です。",
    pausedButton: "依頼は一時停止中",
    noResults: "条件に一致する医師がいません。",
    paymentNotice: "プラットフォームが代金を回収します。医師は確認後に手配され、適切な提供者を手配できない場合は返金ポリシーに従います。"
  },
  ko: {
    title: "의사 목록",
    subtitle: "MVP용 mock 데이터입니다. 전문 분야, 국가, 언어, 가격, 예약 가능 여부로 필터링합니다.",
    filters: "필터",
    all: "전체",
    specialty: "전문 분야",
    country: "국가",
    language: "언어",
    price: "최대 가격",
    requestFee: "상담 요청 수수료",
    availability: "예약 가능 여부",
    availableOnly: "지금 가능한 의사만",
    rating: "평점",
    session: "회",
    available: "지금 가능",
    unavailable: "다음 가능 시간 확인 필요",
    book: "상담 요청",
    booking: "보안 결제를 여는 중...",
    paused: "의료 제공자 검증, 가격, 환불 절차가 확정될 때까지 상담 요청은 일시 중지됩니다.",
    pausedButton: "요청 일시 중지",
    noResults: "조건에 맞는 의사가 없습니다.",
    paymentNotice: "플랫폼이 결제를 수령합니다. 의사는 확인 후 배정되며, 적절한 제공자를 매칭할 수 없는 경우 환불 정책에 따라 처리됩니다."
  }
} as const;

type LanguageCode = (typeof LANGUAGES)[number]["code"];

const unique = (values: string[]) => Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));

export default function DoctorsPage() {
  const [languageCode, setLanguageCode] = useState<LanguageCode>("en");
  const [specialty, setSpecialty] = useState("All");
  const [country, setCountry] = useState("All");
  const [doctorLanguage, setDoctorLanguage] = useState("All");
  const [maxPrice, setMaxPrice] = useState("200");
  const [availableOnly, setAvailableOnly] = useState(false);
  const copy = COPY[languageCode];

  const specialties = useMemo(() => unique(doctors.map((doctor) => doctor.specialty)), []);
  const countries = useMemo(() => unique(doctors.map((doctor) => doctor.country)), []);
  const doctorLanguages = useMemo(
    () => unique(doctors.flatMap((doctor) => doctor.languages)),
    []
  );

  const filteredDoctors = doctors.filter((doctor) => {
    if (specialty !== "All" && doctor.specialty !== specialty) return false;
    if (country !== "All" && doctor.country !== country) return false;
    if (doctorLanguage !== "All" && !doctor.languages.includes(doctorLanguage)) return false;
    if (availableOnly && !doctor.available) return false;
    return doctor.feeUsd <= Number(maxPrice);
  });

  return (
    <section>
      <div className="language-toolbar" aria-label="Language selector">
        {LANGUAGES.map((language) => (
          <button
            className={language.code === languageCode ? "language-chip active" : "language-chip"}
            key={language.code}
            onClick={() => setLanguageCode(language.code)}
            type="button"
          >
            {language.name}
          </button>
        ))}
      </div>

      <h1 className="page-title">{copy.title}</h1>
      <p className="page-subtitle">{copy.subtitle}</p>

      <div className="panel filter-panel">
        <strong>{copy.filters}</strong>
        <div className="filter-grid">
          <label>
            {copy.specialty}
            <select value={specialty} onChange={(event) => setSpecialty(event.target.value)}>
              <option value="All">{copy.all}</option>
              {specialties.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            {copy.country}
            <select value={country} onChange={(event) => setCountry(event.target.value)}>
              <option value="All">{copy.all}</option>
              {countries.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            {copy.language}
            <select
              value={doctorLanguage}
              onChange={(event) => setDoctorLanguage(event.target.value)}
            >
              <option value="All">{copy.all}</option>
              {doctorLanguages.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            {copy.price}: ${maxPrice}
            <input
              max="250"
              min="80"
              onChange={(event) => setMaxPrice(event.target.value)}
              step="10"
              type="range"
              value={maxPrice}
            />
          </label>
          <label className="checkbox-row">
            <input
              checked={availableOnly}
              onChange={(event) => setAvailableOnly(event.target.checked)}
              type="checkbox"
            />
            {copy.availableOnly}
          </label>
        </div>
      </div>

      <p className="page-subtitle payment-note">{copy.paymentNotice}</p>
      <p className="inline-error">{copy.paused}</p>

      <div className="doctor-grid" style={{ marginTop: 18 }}>
        {filteredDoctors.map((doctor) => (
          <article className="panel doctor-card" key={doctor.id}>
            <h2 className="doctor-name">{doctor.name}</h2>
            <p className="doctor-meta">
              {doctor.specialty} · {doctor.country}
            </p>
            <p className="doctor-meta">
              {copy.rating} {doctor.rating} · {copy.requestFee}: ${doctor.feeUsd}/{copy.session} ·{" "}
              {doctor.available ? copy.available : copy.unavailable}
            </p>
            <p className="doctor-meta">{doctor.languages.join(", ")}</p>
            <div className="doctor-tags">
              {doctor.tags.map((tag) => (
                <span className="doctor-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <button
              className="btn-primary"
              disabled
              type="button"
            >
              {copy.pausedButton}
            </button>
          </article>
        ))}
      </div>

      {filteredDoctors.length === 0 ? <p className="page-subtitle">{copy.noResults}</p> : null}
    </section>
  );
}
