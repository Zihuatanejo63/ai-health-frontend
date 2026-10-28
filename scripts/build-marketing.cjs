// Production output is a separate allowlisted project. Full application sources are not copied.
const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const root=process.cwd(),build=path.join(root,'.marketing-build'),out=path.join(root,'out');
if(fs.existsSync(build)&&!fs.existsSync(path.join(build,'.healthmatch-generated')))throw Error('Refusing to remove unknown build directory');
fs.rmSync(build,{recursive:true,force:true});fs.mkdirSync(build,{recursive:true});fs.writeFileSync(path.join(build,'.healthmatch-generated'),'generated only\n');
for(const part of ['app','components','next.config.mjs','tsconfig.json'])fs.cpSync(path.join(root,'marketing',part),path.join(build,part),{recursive:true});
for(const name of ['globals.css','editorial.css'])fs.copyFileSync(path.join(root,'app',name),path.join(build,'app',name));
fs.mkdirSync(path.join(build,'lib'),{recursive:true});fs.cpSync(path.join(root,'lib/public-i18n'),path.join(build,'lib/public-i18n'),{recursive:true});
fs.mkdirSync(path.join(build,'public'),{recursive:true});for(const name of ['favicon.ico','apple-touch-icon.png','robots.txt','sitemap.xml'])if(fs.existsSync(path.join(root,'public',name)))fs.copyFileSync(path.join(root,'public',name),path.join(build,'public',name));
const dir=path.join(build,'lib/public-i18n'),src=JSON.parse(fs.readFileSync(path.join(dir,'source.json'))),en=JSON.parse(fs.readFileSync(path.join(root,'marketing/en.json'))),locales=['zh','es','hi','ar','pt','fr','ru','ja','de'];
for(const [k,v]of Object.entries(en)){if(!src.messages[k])throw Error('Unknown message '+k);src.messages[k]=v;}
// Materialize only identifiers used by the five public pages and navigation.
const used=new Set(['m0287','m0288']);
function visit(node){if(!node||typeof node==='string')return;if(node.message)used.add(node.message);for(const [k,v]of Object.entries(node.props||{})){if(k==='href'&&v==='/dashboard')node.props[k]='/sample-report';if(v&&typeof v==='object'&&v.message)used.add(v.message);}for(const item of [...(node.children||[]),...(node.parts||[])])visit(item);}
for(const page of Object.values(src.pages))visit(page);
const extraNames=['Home','Sample Report','Pricing','Safety & Limits','Privacy','Skip to content','Language','Main navigation','Footer navigation','Know your numbers. Catch changes early.','Health information and self-management. Not a substitute for professional care.','Product preview · Built around a longer view.','If a translation differs from the English version, the English version prevails.',...Object.values(src.meta).flat()];
src.extra=Object.fromEntries(extraNames.filter(k=>src.extra[k]).map(k=>[k,src.extra[k]]));for(const k of Object.values(src.extra))used.add(k);
for(const locale of locales){const p=path.join(dir,locale+'.json'),old=JSON.parse(fs.readFileSync(p)),overrides=JSON.parse(fs.readFileSync(path.join(root,'marketing',locale+'.json')));for(const [k,v]of Object.entries(en)){if(!overrides[k])throw Error('Missing '+locale+' '+k);let translated=overrides[k];if(k==='m0004'){translated=translated.replace(/\s*<\/?x0>\s*/g,'').replace(/\s*↗\s*/g,'').trim()+' <x0>↗</x0>';}
 const tags=x=>(x.match(/<\/?x\d+>/g)||[]).sort().join('|');if(tags(v)!==tags(translated))throw Error('Invalid placeholders '+locale+' '+k);old[k]=translated;}
 fs.writeFileSync(p,JSON.stringify(Object.fromEntries(Object.entries(old).filter(([k])=>used.has(k))),null,2));}
src.messages=Object.fromEntries(Object.entries(src.messages).filter(([k])=>used.has(k)));fs.writeFileSync(path.join(dir,'source.json'),JSON.stringify(src,null,2));
const index=path.join(build,'lib/public-i18n/index.ts');if(!fs.existsSync(index))throw Error('Missing localization framework');
fs.writeFileSync(path.join(build,'package.json'),JSON.stringify({name:'healthmatch-marketing-only',private:true,version:'1.0.0',dependencies:{next:'^14.2.5',react:'^18.3.1','react-dom':'^18.3.1'}}));
const r=spawnSync(process.execPath,[require.resolve('next/dist/bin/next'),'build'],{cwd:build,stdio:'inherit',env:{...process.env,HEALTHMATCH_LOCAL_API:''}});if(r.status!==0)process.exit(r.status||1);
for(const code of locales){const f=path.join(build,'out',code+'.html'),p=path.join(build,'out',code,'index.html');fs.mkdirSync(path.dirname(p),{recursive:true});fs.copyFileSync(f,p);}
// A generated Next export is disposable output; no user documents or credentials live here.
fs.rmSync(out,{recursive:true,force:true});fs.cpSync(path.join(build,'out'),out,{recursive:true});console.log('PASS: isolated marketing export written to frontend/out');
