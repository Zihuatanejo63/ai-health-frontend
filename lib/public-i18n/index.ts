import source from './source.json';
import zh from './zh.json';
import es from './es.json';
import hi from './hi.json';
import ar from './ar.json';
import pt from './pt.json';
import fr from './fr.json';
import ru from './ru.json';
import ja from './ja.json';
import de from './de.json';
export const languages = [['en','English'],['zh','简体中文'],['es','Español'],['hi','हिन्दी'],['ar','العربية'],['pt','Português'],['fr','Français'],['ru','Русский'],['ja','日本語'],['de','Deutsch']] as const;
export type Locale = typeof languages[number][0];
export const catalogs: Record<Locale, Record<string,string>> = {en:source.messages,zh,es,hi,ar,pt,fr,ru,ja,de};
export const publicPaths=['/','/sample-report','/pricing','/safety','/privacy'];
export function localeOf(path:string):Locale {const code=path.split('/')[1];return languages.some(([c])=>c===code)?code as Locale:'en';}
export function basePath(path:string) {return path.replace(/^\/(zh|es|hi|ar|pt|fr|ru|ja|de)(?=\/|$)/,'').replace(/\/$/,'')||'/';}
export function localizedHref(path:string,locale:Locale) {const [base,hash]=path.split('#');return (publicPaths.includes(base)?(locale==='en'?base:`/${locale}${base==='/'?'/':base}`):base)+(hash?'#'+hash:'');}
export function textFor(locale:Locale,text:string) {const key=(source.extra as Record<string,string>)[text];return key?catalogs[locale][key]:text;}
export function alternates(path:string){return {canonical:localizedHref(path,'en'),languages:Object.fromEntries([...languages.map(([code])=>[code,localizedHref(path,code)]),['x-default',path]])};}
export {source};
