import {useEffect,useState,type FormEvent} from 'react';
import {Check} from 'lucide-react';
import {ArrowRight} from '../components/EditorialArrow';
import {useLanguage} from '../i18n';

const words={
 en:{name:'Your name',hint:'How should we welcome you?',reply:'Will you join us?',yes:'Joyfully accept',no:'Regretfully decline',guests:'Guests, including you',note:'A little note for the couple',optional:'Optional',consent:'I agree to share my reply with the hosts under the',privacy:'Privacy Policy',submit:'Send my reply',sending:'Sending…',thanks:'Your reply has arrived.',thankYou:'Thank you for letting us know.',error:'We could not confirm your reply. Please try again shortly.',soon:'Attendance confirmations will open soon.',closed:'Attendance confirmations are closed.'},
 ar:{name:'الاسم',hint:'بأي اسم نرحّب بكم؟',reply:'هل تشاركوننا الفرحة؟',yes:'بكل سرور، سنحضر',no:'نعتذر عن الحضور',guests:'عدد الحضور، بمن فيهم أنت',note:'كلمة لطيفة للعروسين',optional:'اختياري',consent:'أوافق على مشاركة ردّي مع أصحاب المناسبة وفق',privacy:'سياسة الخصوصية',submit:'أرسل الردّ',sending:'جارٍ الإرسال…',thanks:'وصل ردّك إلى العروسين.',thankYou:'شكراً لإخبارنا، تسعدنا مشاركتكم.',error:'تعذّر تأكيد وصول ردّك. يرجى المحاولة بعد قليل.',soon:'نفتح باب تأكيد الحضور قريباً.',closed:'انتهت فترة تأكيد الحضور.'}
};
export default function GuestReply({slug,labels}:{slug:string;labels?:Partial<Record<'en'|'ar',Partial<typeof words.en>>>}){
 const {lang}=useLanguage();const t={...words[lang],...labels?.[lang]};const [availability,setAvailability]=useState<'loading'|'ready'|'soon'|'closed'>('loading');
 const [maxGuests,setMaxGuests]=useState(5),[collectMessage,setCollectMessage]=useState(true),[attendance,setAttendance]=useState('yes'),[status,setStatus]=useState<'idle'|'sending'|'done'>('idle'),[error,setError]=useState('');
 useEffect(()=>{
  const controller=new AbortController();
  fetch(`/api/invitations/${slug}`,{signal:controller.signal,cache:'no-store'}).then(async response=>{
   if(!response.ok){if(!controller.signal.aborted)setAvailability('soon');return;}
   const {invitation}=await response.json();if(controller.signal.aborted)return;
   if(invitation?.slug!==slug||invitation.status!=='published'){setAvailability('soon');return;}
   setMaxGuests(Math.max(1,Math.min(20,Number(invitation.features?.maxGuests)||5)));setCollectMessage(invitation.features?.collectMessage===true);setAvailability(invitation.features?.rsvp===true?'ready':'closed');
  }).catch(()=>{if(!controller.signal.aborted)setAvailability('soon');});
  return()=>controller.abort();
 },[slug]);
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();if(availability!=='ready'||status==='sending')return;const data=new FormData(e.currentTarget);setError('');setStatus('sending');
  try{
   const response=await fetch(`/api/invitations/${slug}/rsvp`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({guestName:String(data.get('guestName')||'').trim(),attendance,guestCount:attendance==='yes'?Number(data.get('guestCount')):0,...(collectMessage?{message:String(data.get('message')||'')}:{}),privacyAccepted:data.get('privacy')==='on',website:String(data.get('website')||'')})});
   if(response.status===410){setAvailability('closed');setStatus('idle');return;}
   if(!response.ok)throw new Error();const result=await response.json();if(result.received!==true)throw new Error();setStatus('done');
  }catch{setStatus('idle');setError(t.error);}
 }
 if(status==='done')return <div className="tl-reply-success" role="status"><Check size={30} strokeWidth={1}/><h3>{t.thanks}</h3><p>{t.thankYou}</p></div>;
 return <form className="tl-reply-form" onSubmit={submit}><fieldset disabled={status==='sending'}>
  <label>{t.name}<input name="guestName" required maxLength={120} autoComplete="name" placeholder={t.hint}/></label>
  <fieldset className="tl-attendance"><legend>{t.reply}</legend>{[['yes',t.yes],['no',t.no]].map(([value,label])=><label key={value}><input type="radio" name="attendance" value={value} checked={attendance===value} onChange={()=>setAttendance(value)}/><span>{label}</span></label>)}</fieldset>
  {attendance==='yes'&&<label>{t.guests}<select name="guestCount" defaultValue="1">{Array.from({length:maxGuests},(_,i)=><option key={i+1} value={i+1}>{i+1}</option>)}</select></label>}
  {collectMessage&&<label>{t.note}<small>{t.optional}</small><textarea name="message" rows={3} maxLength={1000}/></label>}
  <label className="tl-consent"><input type="checkbox" name="privacy" required/><span>{t.consent} <a href={`/${lang}/privacy`} target="_blank" rel="noopener noreferrer">{t.privacy}</a>.</span></label>
  <label className="tl-screen-reader" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>
  <button type="submit" className="tl-button" disabled={availability!=='ready'||status==='sending'}>{status==='sending'?t.sending:t.submit}<ArrowRight size={23}/></button>
 </fieldset>{availability==='soon'||availability==='closed'?<p className="tl-form-notice" role="status">{availability==='closed'?t.closed:t.soon}</p>:null}{error&&<p className="tl-form-error" role="alert">{error}</p>}</form>;
}
