import {useEffect,useState} from 'react';
import {Check,Copy} from 'lucide-react';
import {useLanguage} from '../i18n';
import {codedInvitationMetadata} from './metadata';

const words={
 en:{copy:'Copy invitation link',copied:'Invitation link copied',manual:'Select and copy this invitation link',label:'Invitation sharing link'},
 ar:{copy:'انسخ رابط الدعوة',copied:'نُسخ رابط الدعوة',manual:'حدّد رابط الدعوة وانسخه',label:'رابط مشاركة الدعوة'}
};
export default function CopyInvitationLink({slug}:{slug:string}) {
 const {lang}=useLanguage(),t=words[lang];
 const [state,setState]=useState<'idle'|'copied'|'manual'>('idle');
 const meta=codedInvitationMetadata(slug,lang,window.location.origin);
 useEffect(()=>{if(state!=='copied')return;const timer=setTimeout(()=>setState('idle'),2500);return()=>clearTimeout(timer);},[state]);
 if(!meta)return null;
 async function copy(){
  try{await navigator.clipboard.writeText(meta!.url);setState('copied');}catch{setState('manual');}
 }
 return <div className="portfolio-share">
  <button type="button" className="text-link portfolio-share-link" onClick={copy} aria-label={`${t.copy} — ${meta.title}`}>
   {state==='copied'?<Check size={15} aria-hidden="true"/>:<Copy size={15} aria-hidden="true"/>}<span aria-live="polite">{state==='copied'?t.copied:t.copy}</span>
  </button>
  {state==='manual'&&<label className="portfolio-share-manual"><span>{t.manual}</span><input aria-label={t.label} dir="ltr" type="text" readOnly value={meta.url} onFocus={event=>event.currentTarget.select()}/></label>}
 </div>;
}
