import {createElement, Fragment, type ReactNode} from 'react';
import {catalogs,localizedHref,source,textFor,type Locale} from '@/lib/public-i18n';
import {Audience, HomeIntro, PricingComparison, ReportAnatomy, TrendBand} from './design-sections';
type Node={tag:string;props:Record<string,string|{message:string}>;children:(Node|string)[];message?:string;parts?:Node[]};
const names:Record<string,string>={'tabindex':'tabIndex','stroke-width':'strokeWidth','text-anchor':'textAnchor','font-size':'fontSize','viewbox':'viewBox','colspan':'colSpan','rowspan':'rowSpan'};
export function MarketingPage({locale,page}:{locale:Locale;page:keyof typeof source.pages}){
 const propsFor=(node:Node)=>Object.fromEntries(Object.entries(node.props).map(([k,v])=>[names[k]||k,k==='href'?localizedHref(String(v),locale):typeof v==='object'?catalogs[locale][v.message]:v]));
 function format(value:string,parts:Node[]){const root:ReactNode[]=[];const stack:{index:number;children:ReactNode[]}[]=[{index:-1,children:root}];for(const token of value.split(/(<\/?x\d+>)/g)){const open=token.match(/^<x(\d+)>$/),close=token.match(/^<\/x(\d+)>$/);if(open)stack.push({index:Number(open[1]),children:[]});else if(close){const current=stack.pop();if(!current||current.index!==Number(close[1])||!stack.length||!parts[current.index])throw Error('Invalid translation markup');const part=parts[current.index];stack.at(-1)!.children.push(createElement(part.tag,{...propsFor(part),key:current.index},...(part.tag==='br'?[]:current.children)));}else stack.at(-1)!.children.push(token);}if(stack.length!==1)throw Error('Invalid translation markup');return root;}
 const render=(node:Node|string,key:number):ReactNode=>{if(typeof node==='string')return node;
  if(node.tag==='public-safety')return <section className="hm-card" key={key}><h2>{catalogs[locale].m0287}</h2><p>{catalogs[locale].m0288}</p></section>;
  const props=propsFor(node),children=node.message?format(catalogs[locale][node.message],node.parts||[]):node.children.map(render);
  if(String(props.className||'').includes('hm-editorial')){props.lang=locale;props.dir=locale==='ar'?'rtl':'ltr';if((page==='safety'||page==='privacy')&&locale!=='en')children.splice(1,0,<p key="precedence" className="hm-translation-note">{textFor(locale,'If a translation differs from the English version, the English version prevails.')} <a href={`/${page}`} lang="en">English</a></p>);if(page==='sample-report')children.splice(1,0,<ReportAnatomy locale={locale} guide key="report-guide"/>);if(page==='pricing')children.splice(2,0,<PricingComparison locale={locale} key="comparison"/>);}
  return createElement(node.tag,{...props,key},...children);};
 if(page==='home'){
  const nodes=(source.pages.home as unknown as Node).children;
  return <div className="hm-page hm-editorial hm-upgrade" lang={locale} dir={locale==='ar'?'rtl':'ltr'}>
   <HomeIntro locale={locale}/>{render(nodes[3],3)}<ReportAnatomy locale={locale}/><TrendBand locale={locale}/><Audience locale={locale}/>{render(nodes[5],5)}{render(nodes[6],6)}{render(nodes[8],8)}
  </div>;
 }
 return <Fragment>{render(source.pages[page] as unknown as Node,0)}</Fragment>;
}
