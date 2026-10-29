import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {LocalizedPublicPage} from '@/components/localized-public-page';
import {languages,source,textFor,alternates,localizedHref,type Locale} from '@/lib/public-i18n';
export const dynamicParams=false;
export function generateStaticParams(){return languages.filter(([c])=>c!=='en').flatMap(([locale])=>Object.keys(source.pages).map(page=>({locale,slug:page==='home'?[]:[page]})));}
function resolve(params:{locale:string;slug?:string[]}) {const page=params.slug?.join('/')||'home';if(!languages.some(([c])=>c===params.locale&&c!=='en')||!Object.hasOwn(source.pages,page))notFound();return {locale:params.locale as Locale,page:page as keyof typeof source.pages};}
export function generateMetadata({params}:{params:{locale:string;slug?:string[]}}):Metadata {const {locale,page}=resolve(params);const [title,description]=source.meta[page];const path=page==='home'?'/':`/${page}`;return {title:{absolute:textFor(locale,title)+(page==='home'?'':' | HealthMatch AI')},description:textFor(locale,description),alternates:{...alternates(path),canonical:localizedHref(path,locale)},openGraph:{title:textFor(locale,title),description:textFor(locale,description),locale,url:localizedHref(path,locale)}};}
export default function Page({params}:{params:{locale:string;slug?:string[]}}){return <LocalizedPublicPage {...resolve(params)}/>;}
