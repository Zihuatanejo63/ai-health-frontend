"use client";

import { useState } from "react";
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
    subtitle: "Mock data for MVP. Doctors are matched by specialty and availability.",
    rating: "Rating",
    session: "session",
    available: "Available now",
    unavailable: "Next availability required",
    book: "Book Consultation"
  },
  zh: {
    title: "医生列表",
    subtitle: "MVP mock 数据。医生按科室和可预约状态进行匹配。",
    rating: "评分",
    session: "次咨询",
    available: "现在可预约",
    unavailable: "需查看下次可预约时间",
    book: "预约咨询"
  },
  es: {
    title: "Lista de doctores",
    subtitle: "Datos simulados para el MVP. Los doctores se emparejan por especialidad y disponibilidad.",
    rating: "Calificación",
    session: "sesión",
    available: "Disponible ahora",
    unavailable: "Requiere próxima disponibilidad",
    book: "Reservar consulta"
  },
  hi: {
    title: "डॉक्टर सूची",
    subtitle: "MVP के लिए mock डेटा। डॉक्टर विशेषज्ञता और उपलब्धता से मिलाए जाते हैं।",
    rating: "रेटिंग",
    session: "सत्र",
    available: "अभी उपलब्ध",
    unavailable: "अगली उपलब्धता आवश्यक",
    book: "परामर्श बुक करें"
  },
  ar: {
    title: "قائمة الأطباء",
    subtitle: "بيانات تجريبية للنسخة الأولية. تتم المطابقة حسب التخصص والتوفر.",
    rating: "التقييم",
    session: "جلسة",
    available: "متاح الآن",
    unavailable: "يتطلب موعدا لاحقا",
    book: "حجز استشارة"
  },
  pt: {
    title: "Lista de médicos",
    subtitle: "Dados mock para o MVP. Médicos são combinados por especialidade e disponibilidade.",
    rating: "Avaliação",
    session: "sessão",
    available: "Disponível agora",
    unavailable: "Próxima disponibilidade necessária",
    book: "Agendar consulta"
  },
  fr: {
    title: "Liste des médecins",
    subtitle: "Données simulées pour le MVP. Les médecins sont associés par spécialité et disponibilité.",
    rating: "Note",
    session: "séance",
    available: "Disponible maintenant",
    unavailable: "Prochaine disponibilité requise",
    book: "Réserver une consultation"
  },
  de: {
    title: "Ärzteliste",
    subtitle: "Mock-Daten für das MVP. Ärzte werden nach Fachgebiet und Verfügbarkeit zugeordnet.",
    rating: "Bewertung",
    session: "Sitzung",
    available: "Jetzt verfügbar",
    unavailable: "Nächste Verfügbarkeit erforderlich",
    book: "Beratung buchen"
  },
  ja: {
    title: "医師リスト",
    subtitle: "MVP 用のモックデータです。専門分野と空き状況で医師を表示します。",
    rating: "評価",
    session: "回",
    available: "現在予約可能",
    unavailable: "次回の空き確認が必要",
    book: "相談を予約"
  },
  ko: {
    title: "의사 목록",
    subtitle: "MVP용 mock 데이터입니다. 전문 분야와 예약 가능 여부로 매칭합니다.",
    rating: "평점",
    session: "회",
    available: "지금 가능",
    unavailable: "다음 가능 시간 확인 필요",
    book: "상담 예약"
  }
} as const;

type LanguageCode = (typeof LANGUAGES)[number]["code"];

export default function DoctorsPage() {
  const [languageCode, setLanguageCode] = useState<LanguageCode>("en");
  const copy = COPY[languageCode];

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

      <div className="doctor-grid" style={{ marginTop: 18 }}>
        {doctors.map((doctor) => (
          <article className="panel doctor-card" key={doctor.id}>
            <h2 className="doctor-name">{doctor.name}</h2>
            <p className="doctor-meta">{doctor.specialty}</p>
            <p className="doctor-meta">
              {copy.rating} {doctor.rating} · ${doctor.feeUsd}/{copy.session} ·{" "}
              {doctor.available ? copy.available : copy.unavailable}
            </p>
            <div className="doctor-tags">
              {doctor.tags.map((tag) => (
                <span className="doctor-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <button className="btn-primary" type="button">
              {copy.book}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
