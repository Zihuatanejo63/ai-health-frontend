// Preview-only client: fictional data stays in memory and never reaches a server.
import {emptyWorkspace, type Action, type Draft, type Evaluation, type Report, type Space, type Workspace} from '../shared/health';
import {actionsFor, evaluateReports, latestEvaluations, RULE_REVIEW, RULE_VERSION} from '../shared/health-rules';

export type HealthState={workspace:Workspace;space:Space;evaluations:Evaluation[];latest:Evaluation[];actions:Action[];modelConfigured:boolean;model:string;ruleVersion:string;ruleReview:string;emailStatus:string};
export type Answer={answer:string;urgent:boolean;channel:string;citations:{marker:string;value:number|string;unit:string;date:string}[];ruleVersion:string};
const stores:Record<Space,Workspace>={personal:emptyWorkspace(),sample:emptyWorkspace()};
const clone=<T,>(value:T):T=>structuredClone(value);
const id=()=>crypto.randomUUID();
function sampleDraft():Draft {
 const values=[[5.4,48,13.2],[5.8,42,13.4],[6,30,13.3]];
 const reports:Report[]=values.map((row,i)=>({id:id(),date:`${2024+i}-09-18`,lab:'Sample Lab A',method:'Sample method',title:`Sample / fictional checkup ${2024+i}`,results:[['HbA1c','%',4,5.6],['ALT','U/L',7,35],['Hemoglobin','g/dL',12,15.5]].map(([marker,unit,low,high],j)=>({id:id(),marker:String(marker),unit:String(unit),value:row[j],low:Number(low),high:Number(high),confidence:null,comparator:'=',source:`Fictional sample: ${marker} ${row[j]} ${unit}`,reviewed:false}))}));
 return {id:id(),space:'sample',source:'sample',reports,createdAt:new Date().toISOString()};
}
function state(space:Space):HealthState {
 const workspace=stores[space];
 return {workspace:clone(workspace),space,evaluations:evaluateReports(workspace.reports,workspace.profile),latest:latestEvaluations(workspace.reports,workspace.profile),actions:actionsFor(workspace),modelConfigured:false,model:'Preview only · no model connected',ruleVersion:RULE_VERSION,ruleReview:RULE_REVIEW,emailStatus:'Preview only · no email sent'};
}
export async function healthApi<T>(space:Space,path='',method='GET',body?:unknown):Promise<T>{
 const w=stores[space],b=(body||{}) as Record<string,unknown>;
 if(!path&&method==='GET') return state(space) as T;
 if(path==='/extract') return {fallback:true,message:'Preview only: no file was sent or read. Use the fictional sample or enter fictional test values.'} as T;
 if(path==='/drafts'&&method==='POST'){
  let draft:Draft;
  if(b.kind==='sample'){
   if(space!=='sample') throw new Error('The fictional sample belongs in the sample workspace.');
   draft=sampleDraft();w.profile={age:44,sex:'female',heightCm:165,weightKg:64,history:'Fictional preview profile.',familyHistory:'Fictional sample history.'};
  } else {
   draft={id:id(),space,source:'manual',createdAt:new Date().toISOString(),reports:[{id:id(),date:'2026-09-18',lab:'Fictional test laboratory',method:'Fictional method',title:'Fictional preview report',results:[{id:id(),marker:'',value:0,unit:'',low:null,high:null,comparator:'=',confidence:null,source:'Fictional preview entry',reviewed:false}]}]};
  }
  w.drafts.push(draft);w.revision++;return {draft:clone(draft)} as T;
 }
 if(path==='/confirm'&&method==='POST'){
  const draft=w.drafts.find(d=>d.id===b.draftId), reports=b.reports as Report[];
  if(!draft||!Array.isArray(reports)||reports.some(r=>r.results.some(v=>!v.reviewed)))throw new Error('Review every fictional row before confirming.');
  if(b.revision!==w.revision)throw new Error('Preview changed; reload before confirming.');
  w.reports.push(...clone(reports));w.drafts=w.drafts.filter(d=>d.id!==draft.id);w.revision++;return {ok:true,reportId:reports.at(-1)!.id} as T;
 }
 if(path==='/drafts'&&method==='DELETE'){w.drafts=w.drafts.filter(d=>d.id!==b.id);w.revision++;return {ok:true} as T;}
 if(path==='/profile'&&method==='PUT'){w.profile=clone(b.profile as Workspace['profile']);w.revision++;return {ok:true} as T;}
 if(path==='/reminders'&&method==='PUT'){w.completed=w.completed.filter(x=>x!==b.id);if(b.done)w.completed.push(String(b.id));w.revision++;return {ok:true} as T;}
 if(path==='/reminder-settings'&&method==='PUT'){w.reminders={enabled:!!b.enabled,deliveries:[]};w.revision++;return {ok:true} as T;}
 if(path==='/reminders/send')return {status:'disabled in fictional preview',transport:'none'} as T;
 if(path==='/qa'&&method==='POST'){
  const rows=evaluateReports(w.reports,w.profile).filter(r=>!b.reportId||r.reportId===b.reportId);const row=rows.find(r=>r.marker==='HbA1c')||rows[0];
  if(!row)throw new Error('Confirm a fictional sample before asking a preview question.');
  return {answer:`Fictional preview only: ${row.marker} is ${row.value} ${row.unit} in the sample. Discuss real reports with a clinician. No AI model was called.`,urgent:false,channel:'preview-template',citations:[{marker:row.marker,value:row.value,unit:row.unit,date:row.date}],ruleVersion:RULE_VERSION} as T;
 }
 throw new Error('This action is unavailable in the isolated fictional preview.');
}
export async function downloadHealth(_space:Space,_kind:'pdf'|'export') {throw new Error('Export is disabled in this isolated preview. The existing server export requires a configured backend.');}
