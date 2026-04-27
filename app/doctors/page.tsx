"use client";

import { useMemo, useState } from "react";
import { createCheckoutSession } from "@/lib/api";
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
    availability: "Availability",
    availableOnly: "Available now only",
    rating: "Rating",
    session: "session",
    available: "Available now",
    unavailable: "Next availability required",
    book: "Book Consultation",
    booking: "Opening secure payment...",
    noResults: "No doctors match these filters.",
    paymentNotice: "Payments use a hosted merchant-of-record checkout link such as Paddle or Lemon Squeezy."
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
    availability: "可预约状态",
    availableOnly: "仅显示现在可预约",
    rating: "评分",
    session: "次咨询",
    available: "现在可预约",
    unavailable: "需查看下次可预约时间",
    book: "预约咨询",
    booking: "正在打开安全支付...",
    noResults: "没有符合筛选条件的医生。",
    paymentNotice: "支付将使用 Paddle 或 Lemon Squeezy 这类代收款平台的托管付款链接。"
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
    availability: "Disponibilidad",
    availableOnly: "Solo disponibles ahora",
    rating: "Calificación",
    session: "sesión",
    available: "Disponible ahora",
    unavailable: "Requiere próxima disponibilidad",
    book: "Reservar consulta",
    booking: "Abriendo pago seguro...",
    noResults: "No hay doctores con estos filtros.",
    paymentNotice: "Los pagos usan un enlace alojado de un proveedor merchant-of-record como Paddle o Lemon Squeezy."
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
    availability: "उपलब्धता",
    availableOnly: "केवल अभी उपलब्ध",
    rating: "रेटिंग",
    session: "सत्र",
    available: "अभी उपलब्ध",
    unavailable: "अगली उपलब्धता आवश्यक",
    book: "परामर्श बुक करें",
    booking: "सुरक्षित भुगतान खुल रहा है...",
    noResults: "इन फ़िल्टर से कोई डॉक्टर नहीं मिला।",
    paymentNotice: "भुगतान Paddle या Lemon Squeezy जैसे merchant-of-record hosted payment link से होगा।"
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
    availability: "التوفر",
    availableOnly: "المتاحون الآن فقط",
    rating: "التقييم",
    session: "جلسة",
    available: "متاح الآن",
    unavailable: "يتطلب موعدا لاحقا",
    book: "حجز استشارة",
    booking: "جار فتح الدفع الآمن...",
    noResults: "لا يوجد أطباء يطابقون هذه الفلاتر.",
    paymentNotice: "تستخدم المدفوعات رابط دفع مستضافا من مزود مثل Paddle أو Lemon Squeezy."
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
    availability: "Disponibilidade",
    availableOnly: "Apenas disponíveis agora",
    rating: "Avaliação",
    session: "sessão",
    available: "Disponível agora",
    unavailable: "Próxima disponibilidade necessária",
    book: "Agendar consulta",
    booking: "Abrindo pagamento seguro...",
    noResults: "Nenhum médico corresponde aos filtros.",
    paymentNotice: "Os pagamentos usam um link hospedado por um merchant of record, como Paddle ou Lemon Squeezy."
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
    availability: "Disponibilité",
    availableOnly: "Disponibles maintenant seulement",
    rating: "Note",
    session: "séance",
    available: "Disponible maintenant",
    unavailable: "Prochaine disponibilité requise",
    book: "Réserver une consultation",
    booking: "Ouverture du paiement sécurisé...",
    noResults: "Aucun médecin ne correspond aux filtres.",
    paymentNotice: "Les paiements utilisent un lien hébergé par un merchant of record comme Paddle ou Lemon Squeezy."
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
    availability: "Verfügbarkeit",
    availableOnly: "Nur jetzt verfügbar",
    rating: "Bewertung",
    session: "Sitzung",
    available: "Jetzt verfügbar",
    unavailable: "Nächste Verfügbarkeit erforderlich",
    book: "Beratung buchen",
    booking: "Sichere Zahlung wird geöffnet...",
    noResults: "Keine Ärzte passen zu diesen Filtern.",
    paymentNotice: "Zahlungen nutzen einen gehosteten Merchant-of-Record-Link wie Paddle oder Lemon Squeezy."
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
    availability: "空き状況",
    availableOnly: "現在予約可能のみ",
    rating: "評価",
    session: "回",
    available: "現在予約可能",
    unavailable: "次回の空き確認が必要",
    book: "相談を予約",
    booking: "安全な決済を開いています...",
    noResults: "条件に一致する医師がいません。",
    paymentNotice: "支払いは Paddle や Lemon Squeezy などの代行販売者によるホスト型決済リンクを使用します。"
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
    availability: "예약 가능 여부",
    availableOnly: "지금 가능한 의사만",
    rating: "평점",
    session: "회",
    available: "지금 가능",
    unavailable: "다음 가능 시간 확인 필요",
    book: "상담 예약",
    booking: "보안 결제를 여는 중...",
    noResults: "조건에 맞는 의사가 없습니다.",
    paymentNotice: "결제는 Paddle 또는 Lemon Squeezy 같은 merchant-of-record 호스팅 결제 링크를 사용합니다."
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
  const [checkoutDoctorId, setCheckoutDoctorId] = useState<string | null>(null);
  const [error, setError] = useState("");
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

  async function startCheckout(doctor: (typeof doctors)[number]) {
    setError("");
    setCheckoutDoctorId(doctor.id);
    try {
      const response = await createCheckoutSession({
        doctorId: doctor.id,
        doctorName: doctor.name,
        amountUsd: doctor.feeUsd
      });
      window.location.href = response.checkoutUrl;
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Unable to start checkout.");
      setCheckoutDoctorId(null);
    }
  }

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
      {error ? <p className="inline-error">{error}</p> : null}

      <div className="doctor-grid" style={{ marginTop: 18 }}>
        {filteredDoctors.map((doctor) => (
          <article className="panel doctor-card" key={doctor.id}>
            <h2 className="doctor-name">{doctor.name}</h2>
            <p className="doctor-meta">
              {doctor.specialty} · {doctor.country}
            </p>
            <p className="doctor-meta">
              {copy.rating} {doctor.rating} · ${doctor.feeUsd}/{copy.session} ·{" "}
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
              disabled={checkoutDoctorId === doctor.id}
              onClick={() => startCheckout(doctor)}
              type="button"
            >
              {checkoutDoctorId === doctor.id ? copy.booking : copy.book}
            </button>
          </article>
        ))}
      </div>

      {filteredDoctors.length === 0 ? <p className="page-subtitle">{copy.noResults}</p> : null}
    </section>
  );
}
