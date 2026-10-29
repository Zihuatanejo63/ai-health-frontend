"use client";
import {useState} from 'react';
import {usePathname} from 'next/navigation';
import {localeOf} from '@/lib/public-i18n';
import {createCheckout} from '@/lib/api-client';
const copy={
 en:['Subscription checkout','Subscriptions are not available in this preview.','Continue to checkout','Checkout is unavailable. Please try again later.'],
 zh:['订阅结算','预览期间不提供订阅购买。','继续结算','暂时无法结算，请稍后再试。'],
 es:['Pago de suscripción','Las suscripciones no están disponibles en esta vista previa.','Continuar al pago','El pago no está disponible. Inténtalo más tarde.'],
 hi:['सदस्यता भुगतान','इस पूर्वावलोकन में सदस्यता उपलब्ध नहीं है।','भुगतान पर जाएँ','भुगतान उपलब्ध नहीं है। बाद में पुनः प्रयास करें।'],
 ar:['إتمام الاشتراك','الاشتراكات غير متاحة في هذه المعاينة.','متابعة الدفع','الدفع غير متاح. حاول لاحقًا.'],
 pt:['Pagamento da assinatura','As assinaturas não estão disponíveis nesta prévia.','Continuar para o pagamento','O pagamento não está disponível. Tente mais tarde.'],
 fr:['Paiement de l’abonnement','Les abonnements ne sont pas disponibles dans cet aperçu.','Continuer vers le paiement','Le paiement est indisponible. Réessayez plus tard.'],
 ru:['Оплата подписки','В этом обзоре подписки недоступны.','Перейти к оплате','Оплата недоступна. Повторите попытку позже.'],
 ja:['サブスクリプションの決済','このプレビューでは購入できません。','決済へ進む','決済を利用できません。後でもう一度お試しください。'],
 de:['Abonnement bezahlen','Abonnements sind in dieser Vorschau nicht verfügbar.','Zur Zahlung','Die Zahlung ist nicht verfügbar. Bitte versuchen Sie es später.']
} as const;
export function SubscriptionCTA(){
 const locale=localeOf(usePathname()),[busy,setBusy]=useState(false),[error,setError]=useState('');
 const enabled=process.env.NEXT_PUBLIC_ENABLE_CHECKOUT==='true'&&process.env.NEXT_PUBLIC_HEALTHMATCH_PREVIEW!=='1';
 async function checkout(){setBusy(true);setError('');try{const result=await createCheckout('plus_monthly');if(!result.checkoutUrl)throw Error('No checkout URL');window.location.assign(result.checkoutUrl)}catch{setError(copy[locale][3]);setBusy(false)}}
 return <section className="hm-subscription-preview"><h2>{copy[locale][0]}</h2>{!enabled&&<p>{copy[locale][1]}</p>}<button className="hm-button" disabled={!enabled||busy} onClick={checkout}>{copy[locale][2]}</button>{error&&<p role="alert">{error}</p>}</section>;
}
