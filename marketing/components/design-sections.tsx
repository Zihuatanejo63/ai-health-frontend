import type {ReactNode} from 'react';
import {catalogs, localizedHref, type Locale} from '@/lib/public-i18n';
import {audienceDetails, designCopy} from './design-copy';

const plain = (locale:Locale, id:string) => (catalogs[locale][id] || '').replace(/<x\d+><\/x\d+>/g, ' ').replace(/<\/?x\d+>/g, '');
const sampleHref = (locale:Locale, hash='') => localizedHref('/sample-report' + hash, locale);

export function TrendGraphic({locale, dark=false}:{locale:Locale;dark?:boolean}) {
  return <div className={`hm-trend-graphic${dark?' is-dark':''}`} dir="ltr">
    <svg viewBox="0 0 430 176" role="img" aria-label={plain(locale,'m0012')}>
      <path className="hm-chart-grid" d="M18 32H410 M18 82H410 M18 132H410" />
      <path className="hm-chart-area" d="M28 107 L214 70 L400 51 L400 145 L28 145 Z" />
      <path className="hm-chart-line" d="M28 107 C90 95 152 80 214 70 S338 57 400 51" />
      <g className="hm-chart-points"><circle cx="28" cy="107" r="5"/><circle cx="214" cy="70" r="5"/><circle cx="400" cy="51" r="5"/></g>
      <g className="hm-chart-values"><text x="28" y="92" textAnchor="middle">5.4</text><text x="214" y="55" textAnchor="middle">5.8</text><text x="400" y="36" textAnchor="middle">6.0</text></g>
      <g className="hm-chart-years"><text x="28" y="169" textAnchor="middle">2024</text><text x="214" y="169" textAnchor="middle">2025</text><text x="400" y="169" textAnchor="middle">2026</text></g>
    </svg>
  </div>;
}

export function ReportVisual({locale,compact=false}:{locale:Locale;compact?:boolean}) {
  const rows=[['m0132','6.0 %','4.0–5.6 %','m0133'],['m0134','30 U/L','7–35 U/L','m0137'],['m0138','13.3 g/dL','12.0–15.5 g/dL','m0141']];
  return <div className={`hm-report-stage${compact?' is-compact':''}`}>
    <div className="hm-orbit hm-orbit-one" aria-hidden="true"/><div className="hm-orbit hm-orbit-two" aria-hidden="true"/>
    <article className="hm-report-card" aria-label={plain(locale,'m0127')}>
      <div className="hm-report-top"><div><span className="hm-report-mark" aria-hidden="true">✳</span><strong>HealthMatch <span>AI</span></strong></div><span className="hm-report-sample">{plain(locale,'m0102')}</span></div>
      <div className="hm-report-title"><div><span className="hm-eyebrow">{plain(locale,'m0118')}</span><h3>{plain(locale,'m0112')}</h3></div><span className="hm-report-date" dir="ltr">2026.09.18</span></div>
      <div className="hm-report-labels"><span>{plain(locale,'m0128')}</span><span>{plain(locale,'m0129')}</span></div>
      <div className="hm-report-rows">{rows.map(([marker,value,range,flag],i)=><div className="hm-report-line" key={marker}>
        <div><strong>{plain(locale,marker)}</strong><span>{plain(locale,'m0130')}: <bdi>{range}</bdi></span></div>
        <div><strong className={i===0?'is-attention':''}><bdi>{value}</bdi></strong><span className={`hm-status ${i===0?'is-attention':'is-normal'}`}>{i===0?'↑':'✓'} {plain(locale,flag)}</span></div>
      </div>)}</div>
      <div className="hm-report-spark-head"><span>{plain(locale,'m0158')} · <bdi>5.0–6.2 %</bdi></span><strong>HbA1c</strong></div>
      <TrendGraphic locale={locale}/>
    </article>
    {!compact && <div className="hm-reminder-card"><span className="hm-reminder-icon" aria-hidden="true">✳</span><div><span>{plain(locale,'m0102')}</span><strong>{plain(locale,'m0183')}</strong><small dir="ltr">2026.12.18</small><small>{plain(locale,'m0185')}</small></div></div>}
  </div>;
}

export function DashboardVisual({locale}:{locale:Locale}) {
 const t=(id:string)=>plain(locale,id);
 const items=[['m0132','6.0 %','m0133'],['m0134','30 U/L','m0137'],['m0138','13.3 g/dL','m0141']];
 return <div className="hm-dashboard-stage" aria-label={t('m0105')}>
  <div className="hm-dashboard-glow" aria-hidden="true"/>
  <div className="hm-dashboard-frame">
   <aside className="hm-dashboard-sidebar"><div className="hm-dashboard-brand"><span>✳</span> HealthMatch</div><span className="hm-dashboard-side-label">{t('m0008')}</span><div className="hm-dashboard-nav">{['m0107','m0108','m0109','m0110'].map((id,i)=><div className={i===0?'is-current':''} key={id}><span aria-hidden="true">{['◫','▤','⌁','◷'][i]}</span>{t(id)}</div>)}</div><div className="hm-dashboard-side-foot"><span>✳</span> {t('m0102')}</div></aside>
   <div className="hm-dashboard-main"><div className="hm-dashboard-top"><span>{t('m0112')}</span><span className="hm-dashboard-sample">{t('m0102')}</span></div>
    <div className="hm-dashboard-heading"><div><span className="hm-dashboard-eyebrow">{t('m0118')}</span><h2>{t('m0112')}</h2></div><span dir="ltr">2026.09.18</span></div>
    <div className="hm-dashboard-metrics">{items.map(([name,value,flag],i)=><div className="hm-dashboard-metric" key={name}><span>{t(name)}</span><strong><bdi>{value}</bdi></strong><small className={i===0?'is-attention':'is-normal'}>{i===0?'↑':'✓'} {t(flag)}</small></div>)}</div>
    <div className="hm-dashboard-lower"><div className="hm-dashboard-chart"><div><span>{t('m0158')}</span><strong>HbA1c</strong></div><TrendGraphic locale={locale}/><small>{t('m0157')}</small></div><div className="hm-dashboard-follow"><span className="hm-dashboard-follow-icon">✳</span><span>{t('m0182')}</span><strong>{t('m0183')}</strong><bdi>2026.12.18</bdi><small>{t('m0185')}</small></div></div>
   </div>
  </div>
 </div>;
}

export function HomeIntro({locale}:{locale:Locale}) {
 const t=(id:string)=>plain(locale,id),copy=designCopy[locale];
 return <>
   <section className="hm-hero hm-design-hero" data-reveal>
     <div className="hm-hero-copy"><p className="hm-overline hm-kicker"><span>✳</span>{t('m0001')}</p>
       <h1>{locale==='zh'?t('m0002').split('。').filter(Boolean).map(clause=><span className="hm-zh-clause" key={clause}>{clause}。</span>):t('m0002')}</h1><p className="hm-lead">{t('m0003')}</p>
       <div className="hm-actions"><a className="hm-button hm-hero-button" href={sampleHref(locale)}>{t('m0004')}</a><a className="hm-text-link" href={sampleHref(locale,'#results')}>{t('m0005')}</a></div>
       <p className="hm-hero-disclaimer">{t('m0006')}</p>
     </div><DashboardVisual locale={locale}/>
   </section>
   <section className="hm-design-stats" aria-label={t('m0001')} data-reveal>
     {[['65',copy.stats[0]],['10',copy.stats[1]],['05',copy.stats[2]]].map(([number,label])=><div key={number}><strong>{number}</strong><span>{label}</span></div>)}
     <p>{copy.statsNote}</p>
   </section>
   <section className="hm-design-section hm-problem" data-reveal><div><p className="hm-section-index"><span>01</span> {copy.problemLabel}</p><h2>{copy.problemTitle}</h2></div><div><p className="hm-lead">{copy.problemText}</p><span className="hm-problem-motif" aria-hidden="true">✳</span></div></section>
   <section className="hm-design-section hm-process" data-reveal><p className="hm-section-index"><span>02</span> {t('m0019')}</p><div className="hm-section-heading"><h2>{copy.stepsTitle}</h2><p>{copy.stepsIntro}</p></div>
     <ol className="hm-timeline">{copy.steps.map((label,i)=><li key={label}><span className="hm-timeline-number">0{i+1}</span><span className="hm-timeline-dot" aria-hidden="true"/><h3>{label}</h3><p>{copy.stepNotes[i]}</p></li>)}</ol>
   </section>
 </>;
}

export function ReportAnatomy({locale,guide=false}:{locale:Locale;guide?:boolean}) {
 const t=(id:string)=>plain(locale,id),copy=designCopy[locale];
 return <section className={`hm-design-section hm-anatomy${guide?' is-guide':''}`} data-reveal>
   <div className="hm-anatomy-copy"><p className="hm-section-index"><span>{guide?'01':'03'}</span> {copy.anatomyLabel}</p><h2>{copy.anatomyTitle}</h2><p className="hm-lead">{copy.anatomyText}</p>
     <div className="hm-anatomy-notes">{[['01',t('m0128'),t('m0124')],['02',t('m0130'),t('m0125')],['03',t('m0131'),t('m0123')]].map(([n,title,description])=><div key={n}><span>{n}</span><div><h3>{title}</h3><p>{description}</p></div></div>)}</div>
     {!guide&&<a href={sampleHref(locale)} className="hm-text-link">{t('m0015')}</a>}
   </div>{guide?<ReportVisual locale={locale} compact/>:<div className="hm-anatomy-diagram"><div className="hm-diagram-head"><span>{t('m0102')}</span><strong>HbA1c</strong></div><div className="hm-diagram-value"><span>{t('m0129')}</span><strong>6.0 <small>%</small></strong></div><div className="hm-diagram-range"><span>{t('m0130')}</span><bdi>4.0–5.6 %</bdi><div className="hm-diagram-bar"><i/></div></div><div className="hm-diagram-flag"><span>↗</span><div><strong>{t('m0133')}</strong><small>{t('m0102')}</small></div></div></div>}
 </section>;
}

export function TrendBand({locale}:{locale:Locale}) {
 const t=(id:string)=>plain(locale,id);
 return <section className="hm-design-section hm-trend-band" data-reveal>
  <div className="hm-trend-copy"><p className="hm-section-index"><span>04</span> {t('m0040')}</p><h2>{t('m0041')}</h2><p className="hm-lead">{t('m0042')}</p><p>{t('m0157')}</p><a href={sampleHref(locale,'#trends')} className="hm-trend-link">{t('m0044')}</a></div>
  <div className="hm-trend-panel"><div className="hm-trend-panel-top"><span>{t('m0158')}</span><span className="hm-dark-sample">{t('m0159')}</span></div><strong>HbA1c <bdi>6.0 %</bdi></strong><p>{t('m0162')}</p><TrendGraphic locale={locale} dark/></div>
 </section>;
}

export function Audience({locale}:{locale:Locale}) {
 const copy=designCopy[locale];
 return <section className="hm-design-section hm-audience" data-reveal><p className="hm-section-index"><span>05</span> {copy.audienceLabel}</p><div className="hm-section-heading"><h2>{copy.audienceTitle}</h2><p>{copy.audienceText}</p></div><div className="hm-audience-grid">{copy.audiences.map((text,i)=><article key={text}><span aria-hidden="true">{['◌','↗','✳'][i]}</span><h3>{text}</h3><p>{audienceDetails[locale][i]}</p></article>)}</div></section>;
}

export function PricingComparison({locale}:{locale:Locale}) {
 const t=(id:string)=>plain(locale,id),copy=designCopy[locale];
 const labels=[copy.compareRows[0],t('m0203'),t('m0204'),...copy.compareRows.slice(1)];
 const rows:ReactNode[][]=[
   [t('m0202'),t('m0210'),t('m0218')],
   [t('m0203'),copy.notListed,copy.notListed],
   [t('m0204'),copy.notListed,copy.notListed],
   [copy.notListed,<>{t('m0211')}<br/>{t('m0212')}</>,t('m0218')],
   [copy.notListed,t('m0213'),t('m0218')],
   [copy.notListed,copy.notListed,t('m0219')]
 ];
 return <section className="hm-design-section hm-comparison" data-reveal><p className="hm-section-index"><span>02</span> {t('m0195')}</p><h2>{copy.compareTitle}</h2><p>{t('m0198')}</p><span className="hm-table-scroll-cue" aria-hidden="true">↔</span><div className="hm-table-wrap" role="region" tabIndex={0} aria-label={copy.compareTitle}><table className="hm-table"><thead><tr><th scope="col">&nbsp;</th><th scope="col">{t('m0199')}</th><th scope="col" className="hm-compare-featured">{t('m0206')}</th><th scope="col">{t('m0215')}</th></tr></thead><tbody>{rows.map((cells,i)=><tr key={labels[i]}><th scope="row">{labels[i]}</th>{cells.map((cell,j)=><td key={j} className={j===1?'hm-compare-featured':undefined}>{cell}</td>)}</tr>)}</tbody></table></div></section>;
}
