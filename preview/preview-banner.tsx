"use client";
import {usePathname} from 'next/navigation';
import {localeOf} from '@/lib/public-i18n';
const copy={
 en:'Isolated preview · fictional data only. No real accounts, uploads, AI, email or payments. Nothing is saved.',
 zh:'隔离预览 · 仅限虚构数据。真实账户、上传、AI、邮件和支付均未连接，内容不会保存。',
 es:'Vista previa aislada · solo datos ficticios. Sin cuentas reales, cargas, IA, correo ni pagos. No se guarda nada.',
 hi:'अलग पूर्वावलोकन · केवल काल्पनिक डेटा। असली खाते, अपलोड, AI, ईमेल या भुगतान जुड़े नहीं हैं। कुछ भी सहेजा नहीं जाता।',
 ar:'معاينة معزولة · بيانات خيالية فقط. لا حسابات حقيقية أو رفع أو ذكاء اصطناعي أو بريد أو مدفوعات. لا يُحفظ شيء.',
 pt:'Prévia isolada · apenas dados fictícios. Sem contas reais, uploads, IA, e-mail ou pagamentos. Nada é salvo.',
 fr:'Aperçu isolé · données fictives uniquement. Aucun compte réel, envoi, IA, courriel ni paiement. Rien n’est enregistré.',
 ru:'Изолированный обзор · только вымышленные данные. Реальные аккаунты, загрузка, ИИ, почта и платежи не подключены. Данные не сохраняются.',
 ja:'隔離プレビュー・架空データのみ。実際のアカウント、アップロード、AI、メール、決済は接続されず、内容は保存されません。',
 de:'Isolierte Vorschau · nur fiktive Daten. Keine echten Konten, Uploads, KI, E-Mails oder Zahlungen. Nichts wird gespeichert.'
};
export function PreviewBanner(){const locale=localeOf(usePathname());return <div className="hm-preview-banner" role="note">{copy[locale]}</div>}
