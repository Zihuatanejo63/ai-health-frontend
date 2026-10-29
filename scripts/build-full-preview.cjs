// Isolated, fictional-only preview: no production API, D1, mail, AI or payment access.
// The full source remains untouched; only an allowlisted generated staging directory is edited.
const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const candidate=process.argv.includes('--candidate');
const root=process.cwd(),stage=path.join(root,candidate?'.full-candidate-build':'.full-preview-build'),out=path.join(root,candidate?'.full-candidate-out':'.full-preview-out');
if(fs.existsSync(stage)&&!fs.existsSync(path.join(stage,'.healthmatch-generated')))throw Error('Refusing to remove an unknown preview directory');
if(fs.existsSync(out)&&!fs.existsSync(path.join(out,'.healthmatch-generated')))throw Error('Refusing to remove an unknown preview output directory');
fs.rmSync(stage,{recursive:true,force:true});fs.mkdirSync(stage,{recursive:true});fs.writeFileSync(path.join(stage,'.healthmatch-generated'),'preview staging only\n');
for(const name of ['app','components','lib','shared','public','next.config.mjs','tsconfig.json'])fs.cpSync(path.join(root,name),path.join(stage,name),{recursive:true});
const english=path.join(stage,'app','(english)');
const allow=new Set(['layout.tsx','page.tsx','sample-report','pricing','safety','privacy','login','signup','dashboard',...(candidate?['forgot-password','payment-success','payment-cancelled']:[])]);
for(const name of fs.readdirSync(english))if(!allow.has(name))fs.rmSync(path.join(english,name),{recursive:true,force:true});
for(const part of ['page.tsx','sample-report/page.tsx','pricing/page.tsx','safety/page.tsx','privacy/page.tsx'])fs.copyFileSync(path.join(root,'marketing/app/(english)',part),path.join(english,part));
fs.copyFileSync(path.join(root,'marketing/app/[locale]/[[...slug]]/page.tsx'),path.join(stage,'app/[locale]/[[...slug]]/page.tsx'));
for(const name of ['marketing-page.tsx','design-sections.tsx','design-copy.ts','reveal-motion.tsx'])fs.copyFileSync(path.join(root,'marketing/components',name),path.join(stage,'components',name));
fs.copyFileSync(path.join(root,'marketing/components/site-footer.tsx'),path.join(stage,'components/site-footer.tsx'));
fs.copyFileSync(path.join(root,'preview/subscription-cta.tsx'),path.join(stage,'components/subscription-cta.tsx'));
const marketingPagePath=path.join(stage,'components/marketing-page.tsx');let marketingPage=fs.readFileSync(marketingPagePath,'utf8');
marketingPage='import {SubscriptionCTA} from "./subscription-cta";\n'+marketingPage;
const pricingHook="if(page==='pricing')children.splice(2,0,<PricingComparison locale={locale} key=\"comparison\"/>);";
if(!marketingPage.includes(pricingHook))throw Error('Subscription placement not found');
marketingPage=marketingPage.replace(pricingHook,pricingHook+"if(page==='pricing')children.splice(3,0,<SubscriptionCTA key=\"subscription\"/>);");fs.writeFileSync(marketingPagePath,marketingPage);
for(const name of ['upgrade.css','full-redesign.css'])fs.copyFileSync(path.join(root,'marketing/app',name),path.join(stage,'app',name));
if(!candidate){
 fs.copyFileSync(path.join(root,'preview/preview-banner.tsx'),path.join(stage,'components/preview-banner.tsx'));
 fs.copyFileSync(path.join(root,'preview/health-client.ts'),path.join(stage,'lib/health-client.ts'));
 fs.copyFileSync(path.join(root,'preview/login-page.tsx'),path.join(english,'login/page.tsx'));
 fs.writeFileSync(path.join(english,'signup/page.tsx'),'export {default, metadata} from "../login/page";\n');
}

const dir=path.join(stage,'lib/public-i18n'),sourcePath=path.join(dir,'source.json'),source=JSON.parse(fs.readFileSync(sourcePath)),en=JSON.parse(fs.readFileSync(path.join(root,'marketing/en.json'))),locales=['zh','es','hi','ar','pt','fr','ru','ja','de'];
for(const [key,value] of Object.entries(en)){if(!source.messages[key])throw Error('Unknown message '+key);source.messages[key]=value;}
for(const locale of locales){const file=path.join(dir,locale+'.json'),catalog=JSON.parse(fs.readFileSync(file)),overrides=JSON.parse(fs.readFileSync(path.join(root,'marketing',locale+'.json')));
 for(const [key,value] of Object.entries(en)){if(!overrides[key])throw Error(`Missing ${locale} ${key}`);let translated=overrides[key];if(key==='m0004')translated=translated.replace(/\s*<\/?x0>\s*/g,'').replace(/\s*↗\s*/g,'').trim()+' <x0>↗</x0>';const tags=s=>(s.match(/<\/?x\d+>/g)||[]).sort().join('|');if(tags(value)!==tags(translated))throw Error(`Invalid placeholders ${locale} ${key}`);catalog[key]=translated;}
 fs.writeFileSync(file,JSON.stringify(catalog,null,2));}
fs.writeFileSync(sourcePath,JSON.stringify(source,null,2));

const docPath=path.join(stage,'components/site-document.tsx');let doc=fs.readFileSync(docPath,'utf8');
doc=doc.replace('import "@/app/editorial.css";','import "@/app/editorial.css";\nimport "@/app/upgrade.css";\nimport "@/app/full-redesign.css";\n'+(!candidate?'import { PreviewBanner } from "@/components/preview-banner";\n':'')+'import { RevealMotion } from "@/components/reveal-motion";');
doc=doc.replace('<body>','<body className="full-experience">').replace('<SiteFooter />','<SiteFooter /><RevealMotion />');if(!candidate)doc=doc.replace('<SiteHeader />','<SiteHeader /><PreviewBanner />');
if((!candidate&&!doc.includes('<PreviewBanner />'))||!doc.includes('full-redesign.css'))throw Error('Full-site shell was not applied');fs.writeFileSync(docPath,doc);
if(!candidate){const headerPath=path.join(stage,'components/site-header.tsx');let header=fs.readFileSync(headerPath,'utf8').replace('href="/dashboard"','href="/dashboard?space=sample"');fs.writeFileSync(headerPath,header);}

if(!candidate){
const authPath=path.join(stage,'lib/auth-client.ts');let auth=fs.readFileSync(authPath,'utf8');const start=auth.indexOf('export async function fetchMe(): Promise<MeResponse> {'),end=auth.indexOf('export function getCachedMe()',start);
if(start<0||end<0)throw Error('Preview auth boundary not found');
auth=auth.slice(0,start)+'export async function fetchMe(): Promise<MeResponse> { return {user:{id:"fictional-preview",email:"sample@example.test",name:"Fictional sample",role:"user"},entitlement:{planId:"free",status:"inactive"}}; }\n\n'+auth.slice(end);fs.writeFileSync(authPath,auth);
const hpPath=path.join(stage,'components/health-app.tsx');let hp=fs.readFileSync(hpPath,'utf8');const logout=/const response = await fetch\(`\$\{API_BASE\}\/api\/auth\/logout`, \{[\s\S]*?if \(!response\.ok\) throw new Error\("Sign-out failed\. Retry\."\);/;
if(!logout.test(hp))throw Error('Preview logout boundary not found');hp=hp.replace(logout,'// Preview sign-out is local; no request is made.');
const replacements=[
 ['"Personal workspace"','"Fictional preview workspace"'],
 ['Personal data\n','Fictional test data\n'],
 ['Report confirmed and saved. Trends and follow-ups are updated.','Fictional report confirmed for this session. Nothing is saved.'],
 ['Profile saved. Readings and follow-ups recalculated with current context.','Fictional profile updated for this session; nothing is saved.'],
 ['Patient-confirmed','Fictional preview'],
 ['Use the fictional three-year example, or add your own\n                    report. Both sample import and manual entry work without AI.','Use the fictional three-year example or enter fictional test values. This preview does not read real reports.'],
 ['PDF, PNG or JPEG, up to 8 MB per report. Upload additional\n                reports one at a time. Original files are processed transiently\n                and not retained by this app; confirmed values and source text\n                are encrypted in the local database.','Preview only: choose fictional test files. No file is sent or read, and all entries disappear on refresh.'],
 ['I agree to send this file to the configured Gemini processor\n                    for extraction. For local testing, use fictional data.','I confirm this is a fictional test file. No file is sent in preview.'],
 ['Use configured Gemini to select relevant report evidence\n                        and answer topic. This sends my question and report\n                        values to the model provider.','Use the preview template. No question or report data is sent to an AI model.'],
 ['Rules and validated templates remain available, even if\n                        the model fails.','The preview uses a fictional template. Clinical review of the trial rules is pending.'],
 ['Leaving or refreshing this page restores the original saved\n                  draft; unsaved edits must be re-entered.','Refreshing this preview clears all fictional entries; nothing is saved.'],
 ['Applies only to the selected {space} workspace. Export\n                  includes profile, reports, original extraction, pending drafts\n                  and completed task IDs. Local database payloads are encrypted;\n                  the local preview uses loopback HTTP. No sale or advertising\n                  use.','Preview only: fictional entries remain in memory for this session and disappear on refresh. Export is disabled.'],
 ['AI key not configured.','Preview mode: no AI connection.']
];
for(const [oldText,newText] of replacements){if(!hp.includes(oldText))throw Error('Preview copy boundary not found: '+oldText.slice(0,45));hp=hp.replace(oldText,newText);}
hp=hp.replaceAll('Export doctor PDF','PDF export unavailable in preview').replace('Export all workspace data (JSON)','Data export unavailable in preview').replace('Saved reports','Fictional reports in this session').replace('Loading saved records…','Loading fictional preview…');
fs.writeFileSync(hpPath,hp);
fs.writeFileSync(path.join(stage,'lib/track.ts'),'export type TrackEventType = "result_viewed"|"partner_click"|"report_print"|"check_started"; export function trackEvent(_type:TrackEventType,_label?:string):void {}\n');
}
fs.writeFileSync(path.join(stage,'package.json'),JSON.stringify({name:'healthmatch-fictional-full-preview',private:true,version:'1.0.0',dependencies:{next:'^14.2.5',react:'^18.3.1','react-dom':'^18.3.1'}}));
const build=spawnSync(process.execPath,[require.resolve('next/dist/bin/next'),'build'],{cwd:stage,stdio:'inherit',env:{...process.env,HEALTHMATCH_LOCAL_API:'',NEXT_PUBLIC_API_BASE_URL:'/__preview_disabled__',NEXT_PUBLIC_HEALTHMATCH_PREVIEW:candidate?'0':'1',NEXT_PUBLIC_ENABLE_CHECKOUT:'',NEXT_TELEMETRY_DISABLED:'1'}});
if(build.status!==0)process.exit(build.status||1);
for(const locale of locales){const src=path.join(stage,'out',locale+'.html'),dest=path.join(stage,'out',locale,'index.html');fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(src,dest);}
fs.writeFileSync(path.join(stage,'out/_headers'),"/*\n  Cache-Control: no-store\n  X-Robots-Tag: noindex, nofollow\n  Content-Security-Policy: connect-src 'self'; form-action 'none'\n");
fs.writeFileSync(path.join(stage,'out/robots.txt'),'User-agent: *\nDisallow: /\n');
fs.rmSync(path.join(stage,'out/sitemap.xml'),{force:true});
fs.rmSync(out,{recursive:true,force:true});fs.cpSync(path.join(stage,'out'),out,{recursive:true});fs.writeFileSync(path.join(out,'.healthmatch-generated'),candidate?'local candidate; API disabled\n':'fictional preview output only\n');
console.log(candidate?'PASS: local full candidate exported with real client code, but network disabled.':'PASS: isolated fictional full preview exported to frontend/.full-preview-out');
