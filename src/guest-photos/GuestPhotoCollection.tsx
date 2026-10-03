import {useCallback,useEffect,useRef,useState} from 'react';
import {Camera,ImagePlus,Check,LoaderCircle,LockKeyhole,Upload,X,RefreshCw} from 'lucide-react';
import type {Lang} from '../i18n';
import './guest-photos.css';
type Context={invitationId:string;state:'ready'|'disabled'|'expired'|'unavailable';maxPhotosPerGuest:number;uploaded:number;pending:number;remaining:number;expiresAt:string|null;contextToken?:string};
type Pick={key:string;file:File;url:string;status:'queued'|'uploading'|'done'|'error'};
const words={
 en:{label:'GUEST PHOTO COLLECTION',title:'Share a Moment',intro:'Your photos are part of our story.',camera:'Take a Photo',choose:'Choose Photos',send:'Share photos',sending:'Sharing your moments…',remove:'Remove photo',private:'Just for the hosts. Always private.',consent:'By uploading photos, you confirm that you have the right to share them with the event hosts and Invitéa for this event.',closed:'This collection has ended. Thank you for sharing your moments.',soon:'Photo sharing is not available for this invitation yet.',disabled:'Photo sharing is not included in this invitation.',size:'Please choose photos smaller than 10 MB each.',limit:'You can share up to',photos:'photos',remaining:'photos remaining',selected:'selected',error:'We could not confirm this photo. Retry it without selecting it again.',format:'This photo could not be read. Please choose a JPEG, PNG or WebP image.',thanks:'Your moments have arrived. Thank you for sharing.',retry:'Retry photo sharing',refresh:'Refresh collection',expires:'Share your moments until',saved:'Shared',queued:'Ready to share',failed:'Please retry',pending:'Earlier uploads are being confirmed. Retry them from the same selection.',loading:'Opening your photo collection…',denied:'Please refresh the collection before trying again.'},
 ar:{label:'مشاركة صور الضيوف',title:'شاركونا لحظاتكم',intro:'صوركم جزء من حكايتنا.',camera:'التقط صورة',choose:'اختر من الصور',send:'شارك الصور',sending:'نشارك لحظاتكم…',remove:'إزالة الصورة',private:'لحظاتكم لأصحاب المناسبة وحدهم.',consent:'برفع الصور، فإنك تؤكد أن لديك الحق في مشاركتها مع أصحاب المناسبة وInvitéa لأغراض هذه المناسبة.',closed:'انتهت فترة مشاركة الصور. شكراً لكل لحظة شاركتمونا إياها.',soon:'نفتح باب مشاركة الصور قريباً.',disabled:'مشاركة الصور غير متاحة في هذه الدعوة.',size:'يرجى اختيار صور بحجم أقل من ١٠ ميغابايت للصورة.',limit:'يمكنك مشاركة ما يصل إلى',photos:'صور',remaining:'صور متبقية',selected:'صور مختارة',error:'لم نتمكّن من تأكيد وصول هذه الصورة. أعد المحاولة دون اختيارها مجدداً.',format:'تعذّر قراءة الصورة. اختر صورة بصيغة JPEG أو PNG أو WebP.',thanks:'وصلت لحظاتكم الجميلة. شكراً لمشاركتنا الفرح.',retry:'أعد مشاركة الصور',refresh:'تحديث المجموعة',expires:'نستقبل صوركم حتى',saved:'تمت المشاركة',queued:'جاهزة للمشاركة',failed:'أعد المحاولة',pending:'بعض الصور السابقة قيد التأكيد. أعد إرسالها من الاختيار نفسه.',loading:'نفتح مجموعة صور المناسبة…',denied:'حدّث مجموعة الصور قبل المحاولة مجدداً.'}
};
async function encodePhoto(file:File){
 const url=URL.createObjectURL(file);
 try{
  const image=await new Promise<HTMLImageElement>((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src=url;});
  if(image.naturalWidth*image.naturalHeight>40_000_000)throw new Error('format');
  const ratio=Math.min(1,2000/Math.max(image.naturalWidth,image.naturalHeight)),canvas=document.createElement('canvas');
  canvas.width=Math.round(image.naturalWidth*ratio);canvas.height=Math.round(image.naturalHeight*ratio);
  const ctx=canvas.getContext('2d');if(!ctx)throw new Error('format');ctx.fillStyle='#ffffff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(image,0,0,canvas.width,canvas.height);
  let blob:Blob|null=null;
  for(const quality of [.84,.72,.6]){blob=await new Promise<Blob|null>(resolve=>canvas.toBlob(resolve,'image/jpeg',quality));if(blob&&blob.size<2_700_000)break;}
  if(!blob||blob.size>=2_700_000)throw new Error('size');
  return await new Promise<string>((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result).split(',')[1]||'');reader.onerror=reject;reader.readAsDataURL(blob);});
 }finally{URL.revokeObjectURL(url);}
}
export default function GuestPhotoCollection({invitationId,lang='en',className=''}:{invitationId:string;lang?:Lang;className?:string}){
 const t=words[lang],camera=useRef<HTMLInputElement>(null),gallery=useRef<HTMLInputElement>(null),urls=useRef(new Set<string>());
 const [context,setContext]=useState<Context|null>(null),[picks,setPicks]=useState<Pick[]>([]),[busy,setBusy]=useState(false),[consent,setConsent]=useState(false),[error,setError]=useState(''),[notice,setNotice]=useState('');
 const base='/api/guest-photos/'+encodeURIComponent(invitationId),number=(n:number)=>new Intl.NumberFormat(lang).format(n);
 const load=useCallback(async(signal?:AbortSignal)=>{
  try{const response=await fetch(base,{credentials:'same-origin',cache:'no-store',signal});if(!response.ok)throw new Error();const value:Context=await response.json();if(!signal?.aborted)setContext(value);}
  catch{if(!signal?.aborted)setContext({invitationId,state:'unavailable',maxPhotosPerGuest:10,uploaded:0,pending:0,remaining:10,expiresAt:null});}
 },[base,invitationId]);
 useEffect(()=>{const controller=new AbortController();void load(controller.signal);return()=>controller.abort();},[load]);
 useEffect(()=>()=>{urls.current.forEach(url=>URL.revokeObjectURL(url));},[]);
 const update=(key:string,status:Pick['status'])=>setPicks(old=>old.map(p=>p.key===key?{...p,status}:p));
 function select(files:FileList|null){
  if(!files||!context)return;setError('');setNotice('');
  const room=Math.max(0,context.remaining-picks.filter(p=>p.status!=='done').length),chosen=Array.from(files);
  if(chosen.length>room){setError(t.limit+' '+number(context.maxPhotosPerGuest)+' '+t.photos+'.');return;}
  if(chosen.some(f=>f.size>10*1024*1024)){setError(t.size);return;}
  if(chosen.some(f=>!f.type.startsWith('image/'))){setError(t.format);return;}
  setPicks(old=>[...old,...chosen.map(file=>{const url=URL.createObjectURL(file);urls.current.add(url);return {key:crypto.randomUUID(),file,url,status:'queued' as const};})]);
 }
 async function upload(){
  if(busy||!consent||context?.state!=='ready')return;setBusy(true);setError('');setNotice('');
  try{
   const session=await fetch(base+'/session',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:'{}'});const sessionData=await session.json();
   if(!session.ok){if(session.status===410)setContext(old=>old?{...old,state:'expired'}:old);throw new Error('denied');}
   setContext(sessionData);let any=false;
   for(const pick of picks.filter(p=>p.status==='queued'||p.status==='error')){
    update(pick.key,'uploading');
    try{
     const data=await encodePhoto(pick.file);
     const response=await fetch(base+'/upload',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({uploadKey:pick.key,contextToken:sessionData.contextToken,privacyAccepted:true,data})});
     const result=await response.json();
     if(!response.ok||result.received!==true){if(response.status===410){setContext(old=>old?{...old,state:'expired'}:old);throw new Error('closed');}if(result.error?.code==='PHOTO_LIMIT')throw new Error('limit');throw new Error('error');}
     update(pick.key,'done');setContext(result);any=true;
    }catch(e){update(pick.key,'error');setError(e instanceof Error&&e.message==='limit'?t.limit+' '+number(context.maxPhotosPerGuest)+' '+t.photos+'.':t[e instanceof Error&&['format','size','closed'].includes(e.message)?e.message as 'format'|'size'|'closed':'error']);}
   }
   if(any)setNotice(t.thanks);
  }catch{setError(t.denied);}finally{setBusy(false);}
 }
 const ready=context?.state==='ready',count=picks.filter(p=>p.status!=='done').length;
 return <section className={'guest-photo-collection '+className} dir={lang==='ar'?'rtl':'ltr'} lang={lang} aria-labelledby={'photos-'+invitationId}>
  <header><span className="gp-label">{t.label}</span><h2 id={'photos-'+invitationId}>{t.title}</h2><p>{t.intro}</p></header>
  <div className="gp-sheet"><div className="gp-meta"><span><LockKeyhole size={15}/>{t.private}</span>{context&&<strong dir="ltr">{number(context.uploaded)} / {number(context.maxPhotosPerGuest)}</strong>}</div>
   {!context?<p role="status">{t.loading}</p>:!ready?<div className="gp-unavailable" role="status"><p>{context.state==='expired'?t.closed:context.state==='disabled'?t.disabled:t.soon}</p>{context.state==='unavailable'&&<button className="gp-link" onClick={()=>void load()}><RefreshCw size={15}/>{t.refresh}</button>}</div>:<>
    <div className="gp-pickers"><button className="gp-button" onClick={()=>camera.current?.click()} disabled={busy||context.remaining<=count}><Camera size={19}/>{t.camera}</button><button className="gp-button gp-secondary" onClick={()=>gallery.current?.click()} disabled={busy||context.remaining<=count}><ImagePlus size={19}/>{t.choose}</button></div>
    <input ref={camera} className="gp-input" type="file" accept="image/*" capture="environment" onChange={e=>{select(e.target.files);e.target.value='';}} aria-label={t.camera}/>
    <input ref={gallery} className="gp-input" type="file" accept="image/*" multiple onChange={e=>{select(e.target.files);e.target.value='';}} aria-label={t.choose}/>
    <p className="gp-remaining">{number(context.remaining)} {t.remaining}{count>0?' · '+number(count)+' '+t.selected:''}</p>
    {context.pending>0&&<p className="gp-caption">{t.pending}</p>}
    {picks.length>0&&<div className="gp-previews">{picks.map(p=><figure key={p.key}><img src={p.url} alt={p.file.name}/>{p.status!=='done'&&<button aria-label={t.remove+' '+p.file.name} disabled={busy} onClick={()=>{URL.revokeObjectURL(p.url);urls.current.delete(p.url);setPicks(old=>old.filter(f=>f.key!==p.key));}}><X size={14}/></button>}<figcaption>{p.status==='done'?<Check size={14}/>:p.status==='uploading'?<LoaderCircle size={14} className="gp-spin"/>:null}{p.status==='done'?t.saved:p.status==='error'?t.failed:p.status==='uploading'?t.sending:t.queued}</figcaption></figure>)}</div>}
    <label className="gp-consent"><input type="checkbox" checked={consent} disabled={busy} onChange={e=>setConsent(e.target.checked)}/><span>{t.consent}</span></label>
    {count>0&&<button className="gp-button gp-upload" onClick={()=>void upload()} disabled={!consent||busy}>{busy?<LoaderCircle size={18} className="gp-spin"/>:<Upload size={18}/>} {busy?t.sending:picks.some(p=>p.status==='error')?t.retry:t.send}</button>}
    {context.expiresAt&&<p className="gp-caption">{t.expires} {new Intl.DateTimeFormat(lang==='ar'?'ar-JO':'en-GB',{dateStyle:'long',timeStyle:'short',timeZone:'Asia/Amman'}).format(new Date(context.expiresAt))}</p>}
   </>}
   {error&&<p className="gp-error" role="alert">{error}</p>}{notice&&<p className="gp-success" role="status"><Check size={17}/>{notice}</p>}
  </div>
 </section>;
}
