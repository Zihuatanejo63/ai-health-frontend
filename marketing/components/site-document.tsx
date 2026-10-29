import type {Metadata} from 'next';
import {SiteHeader} from '@/components/site-header';
import {SiteFooter} from '@/components/site-footer';
import {RevealMotion} from '@/components/reveal-motion';
import '@/app/globals.css';import '@/app/editorial.css';import '@/app/upgrade.css';import '@/app/full-redesign.css';
export const metadata:Metadata={metadataBase:new URL('https://healthmatchai.com'),title:{default:'HealthMatch AI | Know your numbers. Catch changes early.',template:'%s | HealthMatch AI'},description:'Explore the HealthMatch AI report-reading preview and fictional sample.'};
export default function RootLayout({children,params}:{children:React.ReactNode;params:{locale?:string}}){return <html lang={params.locale||'en'} dir={params.locale==='ar'?'rtl':'ltr'}><body><div className="site-shell"><SiteHeader/><main className="page-main" id="main-content"><div className="container">{children}</div></main><SiteFooter/><RevealMotion/></div></body></html>;}
