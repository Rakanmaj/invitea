import {useEffect,useRef,useState,type ReactNode} from 'react';
import {motion,transform,useMotionValueEvent,useReducedMotion,useScroll,useSpring,useTransform,type MotionValue} from 'motion/react';
import {ArrowDown,ArrowUpRight,CalendarDays,Heart,MapPin,Music2,VolumeX} from 'lucide-react';
import {useLanguage,type Lang} from '../i18n';
import {useShareMetadata} from '../share/useShareMetadata';
import event from '../content/bassamLana.json';
import GuestReply from './GuestReply';
import BassamLanaScene from './BassamLanaScene';
import {useWeddingMusic} from './useWeddingMusic';
import '@fontsource/amiri/arabic-400.css';
import '@fontsource/aref-ruqaa/arabic-400.css';
import './bassam-lana.css';

const words={
 ar:{edition:'أمسية من نور',opening:'بكل الحب، نفتح لكم باب حكايتنا',enter:'افتح الدعوة مع الموسيقى',quiet:'الدخول بهدوء، دون موسيقى',touch:'المس الختم، وابدأ الأمسية',together:'بحضور أهلنا وأحبابنا',invite:'يسرّنا دعوتكم لمشاركتنا فرحة زفافنا',scroll:'مرّر برفق، وللحكاية بقيّة',chapters:['البداية','الدعوة','موعدنا','حتى نلتقي'],messageLabel:'لكم مكان في هذه الحكاية',messageTitle:'وبحضوركم،\nيكتمل نور ليلتنا.',message:'نتشرّف بدعوتكم للاحتفال معنا ببداية عمر جديد؛ أمسية يجمعنا فيها الحب، وتزيّنها وجوه من نحبّ.',messageEnd:'بعض الليالي لا تُنسى… لأنكم فيها.',details:'ليلة ننتظرها معكم',friday:'الجمعة',date:'١٥ يناير ٢٠٢٧',time:'٧:٣٠ مساءً',timezone:'بتوقيت عمّان',map:'عرض الموقع',calendar:'احفظ الموعد',until:'حتى تُضاء ليلتنا',units:['أيام','ساعات','دقائق'],today:'اليوم، تبدأ حكايتنا معاً.',night:'كل ضوء ينتظر لحظته.\nولحظتنا أجمل بكم.',nightNote:'بسّام ولانا · عمّان',evening:'تفاصيل أمسيتنا',eveningNote:'من أول ابتسامة، إلى آخر ذكرى جميلة.',dress:'إطلالة مسائية رسمية',dressNote:'أناقة كلاسيكية، وتفاصيل تشبهكم.',replyLabel:'أجمل مقعد، لمن نحبّ',reply:'هل تشاركوننا\nفرحتنا؟',replyText:'أخبرونا إن كنتم ستنضمّون إلينا. ننتظركم بكل المحبة.',closing:'باب حكايتنا\nيفتح بوجودكم.',closingNote:'نلتقي على الفرح، ونصنع ذكرى العمر.',credit:'دعوة من تصميم Invitéa',music:'موسيقى الأمسية',mute:'إيقاف الموسيقى',musicError:'تعذّر تشغيل الموسيقى. يمكنكم المحاولة مجدداً.',navDate:'موعدنا',navReply:'تأكيد الحضور',skip:'انتقل إلى تفاصيل الأمسية',musicCredits:'عن موسيقى الأمسية',chapterNav:'مشاهد الدعوة',return:'عد إلى البداية'},
 en:{edition:'THE GILDED HOUR',opening:'With love, we open the door to our story.',enter:'Open with music',quiet:'Enter quietly, without music',touch:'TOUCH THE SEAL. AN EVENING AWAITS.',together:'TOGETHER WITH OUR FAMILIES',invite:'We invite you to celebrate our wedding',scroll:'SCROLL GENTLY. THE EVENING UNFOLDS.',chapters:['The beginning','With love','Our evening','Until we meet'],messageLabel:'A PLACE IN OUR STORY',messageTitle:'Some evenings\nbecome forever.',message:'We would be honoured to welcome you to the beginning of our next chapter. An evening filled with love, candlelight, and the people who mean the most.',messageEnd:'The beautiful part is having you there.',details:'An evening to look forward to.',friday:'Friday',date:'15 January 2027',time:'7:30 PM',timezone:'Amman time',map:'Find our celebration',calendar:'Save the date',until:'UNTIL OUR EVENING BEGINS',units:['Days','Hours','Minutes'],today:'Today, our new chapter begins.',night:'Every light has its moment.\nThis one is ours.',nightNote:'BASSAM & LANA · AMMAN',evening:'The rhythm of our evening.',eveningNote:'From the first welcome to the last beautiful memory.',dress:'Formal evening attire',dressNote:'Timeless elegance. A little of you.',replyLabel:'A PLACE FOR OUR FAVOURITE PEOPLE',reply:'Will you share\nour evening?',replyText:'Let us know if you will join us. Your presence is our favourite detail.',closing:'Our story opens\nwith you.',closingNote:'A beautiful evening. The beginning of forever.',credit:'Invitation by Invitéa',music:'Evening music',mute:'Mute music',musicError:'The music could not play. Please try again.',navDate:'Our evening',navReply:'RSVP',skip:'Skip to evening details',musicCredits:'Music credits',chapterNav:'Invitation scenes',return:'Return to the beginning'}
};
const imageRoot='/invitations/bassam-lana';
const ease=[.22,1,.36,1] as const;
const bounds=[0,.285,.48,.755];
type SceneStatus='loading'|'ready'|'unavailable';
function range<T extends number|string>(p:MotionValue<number>,input:number[],output:T[]){return useTransform(p,value=>transform(value,input,output));}
function Lines({text}:{text:string}){return <>{text.split('\n').map((line,i)=><span key={i}>{line}</span>)}</>;}
function Ornament(){return <svg className="bl-ornament" viewBox="0 0 210 28" fill="none" aria-hidden="true"><path d="M0 14h76m58 0h76M88 14l17-10 17 10-17 10-17-10Zm17-7v14m-7-7h14M81 14h5m38 0h5" stroke="currentColor" strokeWidth=".75"/></svg>;}
function Monogram({className=''}:{className?:string}){return <span className={`bl-monogram ${className}`} dir="ltr">B <em>&</em> L</span>;}
function DoorIllumination(){
 return <svg className="bl-door-illumination" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
  <g className="bl-light-branches" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
   <path pathLength="1" d="M200 400C175 365 143 353 122 318S114 241 90 210"/>
   <path pathLength="1" d="M200 400C225 365 257 353 278 318S286 241 310 210"/>
   <path pathLength="1" d="M160 356C139 357 127 342 107 344M128 327C147 309 149 291 143 277M119 277C98 267 95 249 82 245M240 356C261 357 273 342 293 344M272 327C253 309 251 291 257 277M281 277C302 267 305 249 318 245"/>
   <path pathLength="1" d="M200 400C170 437 137 454 125 502S116 569 90 600M200 400C230 437 263 454 275 502S284 569 310 600"/>
   <path pathLength="1" d="M149 457C130 450 119 456 105 467M125 502C144 510 152 527 150 546M251 457C270 450 281 456 295 467M275 502C256 510 248 527 250 546"/>
  </g>
  <path className="bl-light-arch" pathLength="1" d="M48 705V250C48 132 122 65 200 38C278 65 352 132 352 250V705" stroke="currentColor" strokeWidth=".8"/>
 </svg>;
}
function Countdown({lang}:{lang:Lang}){
 const [now,setNow]=useState(Date.now),t=words[lang];
 useEffect(()=>{const timer=setInterval(()=>{if(!document.hidden)setNow(Date.now());},1000);return()=>clearInterval(timer);},[]);
 const seconds=Math.max(0,Math.floor((new Date(event.eventDate).getTime()-now)/1000));
 const values=[Math.floor(seconds/86400),Math.floor(seconds/3600)%24,Math.floor(seconds/60)%60];
 return <>{seconds?<div className="bl-clock" role="timer" aria-live="off" aria-label={t.until} dir="ltr">{values.map((value,index)=><span key={index}><strong>{String(value).padStart(2,'0')}</strong><small>{t.units[index]}</small></span>)}</div>:<p>{t.today}</p>}</>;
}
function StoryPanel({p,input,active,index,reduced,children,className='',panels}:{p:MotionValue<number>;input:number[];active:number;index:number;reduced:boolean;children:ReactNode;className?:string;panels:React.RefObject<(HTMLDivElement|null)[]>}){
 const opacity=range(p,input,[0,1,1,0]);
 return <div ref={element=>{panels.current[index]=element;}} className="bl-room-lettering"><motion.section className={`bl-panel ${className}`} style={reduced?undefined:{opacity}} aria-hidden={!reduced&&active!==index} inert={!reduced&&active!==index}><div className="bl-letter-copy">{children}</div></motion.section></div>;
}
function downloadCalendar(){
 const utc=(date:Date)=>date.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
 const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Invitea//Bassam and Lana//EN','BEGIN:VEVENT','UID:bassam-lana-20270115@invitea',`DTSTAMP:${utc(new Date())}`,`DTSTART:${utc(new Date(event.eventDate))}`,`DTEND:${utc(new Date(event.endDate))}`,'SUMMARY:Bassam & Lana - Wedding','LOCATION:Astor Ballroom\\, The St. Regis Amman\\, Shafiq Al Hayek Street','DESCRIPTION:We look forward to celebrating with you.','END:VEVENT','END:VCALENDAR',''];
 const url=URL.createObjectURL(new Blob([lines.join('\r\n')],{type:'text/calendar;charset=utf-8'})),link=document.createElement('a');link.href=url;link.download='bassam-lana-wedding.ics';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function goToChapter(index:number,reduced:boolean){
 const story=document.getElementById('bl-journey');if(!story)return;
 if(reduced){document.querySelectorAll('.bl-panel')[index]?.scrollIntoView({behavior:'auto',block:'start'});return;}
 const phases=[0,.37,.59,.9];
 const top=story.getBoundingClientRect().top+window.scrollY;
 window.scrollTo({top:top+(story.offsetHeight-window.innerHeight)*phases[index],behavior:'smooth'});
}
function Journey({lang,sceneStatus,onSceneStatusChange}:{lang:Lang;sceneStatus:SceneStatus;onSceneStatusChange:(status:SceneStatus)=>void}){
 const t=words[lang],reduced=!!useReducedMotion(),ref=useRef<HTMLElement>(null),panels=useRef<(HTMLDivElement|null)[]>([]),[active,setActive]=useState(0);
 const {scrollYProgress}=useScroll({target:ref,offset:['start start','end end']});
 // A gentle, non-bouncing camera settle keeps touch scrolling direct and cinematic.
 const p=useSpring(scrollYProgress,{stiffness:95,damping:24,restDelta:.0001});
 useMotionValueEvent(p,'change',value=>setActive(value<bounds[1]?0:value<bounds[2]?1:value<bounds[3]?2:3));
 const salonScale=range(p,[0,1],[1,1.18]),night=range(p,[.58,.83],[0,1]),light=range(p,[.52,.78],[1,0]),progressWidth=range(p,[0,1],['0%','100%']);
 const maps=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue.mapQuery)}`;
 return <section id="bl-journey" className="bl-journey" ref={ref} aria-label={t.edition}>
  <div className={`bl-stage ${!reduced&&sceneStatus==='loading'?'bl-scene-loading':''}`} aria-busy={!reduced&&sceneStatus==='loading'}>
   <div className="bl-scene-fallback" aria-hidden="true"><motion.img src={`${imageRoot}/salon.webp`} width="1672" height="941" alt="" fetchPriority="high" style={reduced?undefined:{scale:salonScale}}/><motion.img className="bl-evening-art" src={`${imageRoot}/evening.webp`} width="1672" height="941" alt="" style={reduced?{opacity:0}:{opacity:night,scale:salonScale}}/></div>
   <BassamLanaScene progress={p} enabled={!reduced} panels={panels} onStatusChange={onSceneStatusChange}/>
   {!reduced&&sceneStatus==='loading'&&<div className="bl-room-loading" role="status"><Monogram/><Ornament/><p>{lang==='ar'?'لحظة، وتبدأ أمسيتنا…':'Our evening is almost ready…'}</p></div>}
   <motion.div className="bl-light-veil" aria-hidden="true" style={reduced?undefined:{opacity:light}}/>
   <motion.div className="bl-night-veil" aria-hidden="true" style={reduced?{opacity:0}:{opacity:night}}/>
   <div className="bl-story-content">
    <StoryPanel p={p} panels={panels} input={[-.15,0,.18,.265]} active={active} index={0} reduced={reduced} className="bl-names-panel">
     <p className="bl-basmala" lang="ar" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p><span className="bl-label">{t.together}</span>
     <h1 lang="ar" dir="rtl">بسّام <span>و</span> لانا</h1><Ornament/>
     <p className="bl-invite-line">{t.invite}</p><time className="bl-hero-date" dateTime={event.eventDate} dir="ltr">15 <i>·</i> 01 <i>·</i> 2027</time>
    </StoryPanel>
    <StoryPanel p={p} panels={panels} input={[.28,.32,.425,.48]} active={active} index={1} reduced={reduced} className="bl-message-panel">
     <span className="bl-label">{t.messageLabel}</span><h2><Lines text={t.messageTitle}/></h2><Ornament/><p>{t.message}</p><small>{t.messageEnd}</small>
    </StoryPanel>
    <StoryPanel p={p} panels={panels} input={[.49,.54,.69,.755]} active={active} index={2} reduced={reduced} className="bl-details-panel">
     <span className="bl-label">{t.details}</span><h2><Lines text={lang==='ar'?event.venue.name.ar.replace(' عمّان','\nعمّان'):event.venue.name.en}/></h2><p className="bl-ballroom">{event.venue.room[lang]}</p><Ornament/>
     <div className="bl-date-engraving"><div><span>{t.friday}</span><strong>{t.date}</strong></div><div><strong dir="ltr">{t.time}</strong><span>{t.timezone}</span></div></div>
     <p className="bl-address">{event.venue.address[lang]}</p><div className="bl-scene-actions"><a href={maps} target="_blank" rel="noopener noreferrer"><MapPin size={16}/>{t.map}<ArrowUpRight size={17}/></a><button onClick={downloadCalendar}><CalendarDays size={16}/>{t.calendar}</button></div>
    </StoryPanel>
    <StoryPanel p={p} panels={panels} input={[.77,.83,1,1.15]} active={active} index={3} reduced={reduced} className="bl-countdown-panel">
     <span className="bl-label">{t.until}</span><Countdown lang={lang}/><Ornament/><h2><Lines text={t.night}/></h2><small>{t.nightNote}</small>
    </StoryPanel>
   </div>
   <div className="bl-journey-bottom"><span>{t.scroll}<ArrowDown size={15}/></span><nav aria-label={t.chapterNav}>{t.chapters.map((chapter,index)=><button key={chapter} aria-label={chapter} aria-current={index===active?'step':undefined} onClick={()=>goToChapter(index,reduced)}><span>0{index+1}</span><i>{chapter}</i></button>)}</nav></div>
   <div className="bl-scroll-track" aria-hidden="true"><motion.span style={{width:progressWidth}}/></div>
  </div>
 </section>;
}
function Evening({lang}:{lang:Lang}){
 const t=words[lang],ref=useRef<HTMLElement>(null),reduced=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
 const y=range(scrollYProgress,[0,1],['-7%','7%']);
 return <section className="bl-evening" id="bl-evening" ref={ref}>
  <div className="bl-evening-window" aria-hidden="true"><motion.img src={`${imageRoot}/evening.webp`} alt="" loading="lazy" width="1672" height="941" style={reduced?undefined:{y,scale:1.18}}/><div/></div>
  <div className="bl-evening-copy"><span className="bl-label">{t.edition}</span><h2>{t.evening}</h2><p>{t.eveningNote}</p><ol className="bl-timeline">{event.schedule.map((step,index)=><motion.li key={step.time} initial={reduced?false:{opacity:0,x:lang==='ar'?-26:26}} whileInView={{opacity:1,x:0}} viewport={{once:true,amount:.3}} transition={{duration:.75,ease}}><time>{new Intl.DateTimeFormat('ar-JO',{hour:'numeric',minute:'2-digit',timeZone:'UTC'}).format(new Date(`2000-01-01T${step.time}:00Z`))}</time><div><h3>{step.label[lang]}</h3><p>{step.detail[lang]}</p></div><span className="bl-step-number" aria-hidden="true">0{index+1}</span></motion.li>)}</ol><div className="bl-dress"><span className="bl-dress-mark" aria-hidden="true">✧</span><div><h3>{t.dress}</h3><p>{t.dressNote}</p></div></div></div>
 </section>;
}
export default function BassamLanaInvitation(){
 const {lang:siteLanguage,setLang}=useLanguage(),lang='ar' as const,t=words.ar,reduced=!!useReducedMotion();
 const [musicEnabled,setMusicEnabled]=useState(false),[opened,setOpened]=useState(false),[entryVisible,setEntryVisible]=useState(true),[doorsFinished,setDoorsFinished]=useState(false),[sceneStatus,setSceneStatus]=useState<SceneStatus>('loading');
 const audio=useRef<HTMLAudioElement>(null),sound=useWeddingMusic(audio,musicEnabled,.16);
 useShareMetadata('bassam-lana',lang);
 useEffect(()=>{if(siteLanguage!=='ar')setLang('ar');},[siteLanguage,setLang]);
 useEffect(()=>{
  if(!entryVisible)return;const old=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=old;};
 },[entryVisible]);
 useEffect(()=>{
  if(!opened)return;const timer=setTimeout(()=>setDoorsFinished(true),reduced?200:4300);return()=>clearTimeout(timer);
 },[opened,reduced]);
 useEffect(()=>{
  if(!doorsFinished||(!reduced&&sceneStatus==='loading'))return;
  setEntryVisible(false);document.getElementById('bl-main')?.focus({preventScroll:true});
 },[doorsFinished,reduced,sceneStatus]);
 function enter(){
  if(opened)return;
  // Play within the actual entry gesture so sound also works on phone browsers.
  void sound.start();setMusicEnabled(true);
  window.scrollTo({top:0,behavior:'instant'});setOpened(true);
 }
 function toggleMusic(){setMusicEnabled(true);void sound.toggle();}
 return <div className={`bassam-lana ${reduced?'bl-reduced':''}`} dir={lang==='ar'?'rtl':'ltr'} lang={lang}>
  <audio ref={audio} src={event.music.src} loop preload="metadata" onPlaying={sound.onPlaying} onPause={sound.onPause} onError={sound.onError}/>
  {entryVisible&&<section className={`bl-entry ${opened?'is-opening':''}`} aria-labelledby="bl-entry-title">
   <div className="bl-door-perspective" aria-hidden="true"><div className="bl-door bl-door-left"><img src={`${imageRoot}/threshold.webp`} alt="" width="1536" height="1024" fetchPriority="high"/></div><div className="bl-door bl-door-right"><img src={`${imageRoot}/threshold.webp`} alt="" width="1536" height="1024"/></div><div className="bl-door-light"/></div>
   <div className="bl-entry-shadow" aria-hidden="true"/><div className="bl-entry-halo" aria-hidden="true"/><DoorIllumination/>
   <div className="bl-entry-prologue" aria-hidden="true"><span>بعض الليالي…</span><span>تصبح حكاية عمر.</span><Ornament/></div>
   <div className="bl-entry-title"><span className="bl-label">{t.edition}</span><h2 id="bl-entry-title">{t.opening}</h2><span>عمّان · <bdi>15.01.2027</bdi></span></div>
   <button className="bl-door-seal" onClick={enter} disabled={opened} aria-label="افتح الدعوة"><Monogram/><span className="bl-seal-orbit"/></button>
   <div className="bl-entry-actions"><p>{t.touch}</p></div>
  </section>}
  <div inert={entryVisible} aria-hidden={entryVisible}>
   <a href="#bl-evening" className="bl-skip">{t.skip}</a>
   <header className="bl-nav"><a href="#bl-main" aria-label={t.return}><Monogram/></a><nav aria-label={t.chapterNav}><button onClick={()=>goToChapter(2,reduced)}>{t.navDate}</button><a href="#bl-rsvp">{t.navReply}</a></nav><div><button className="bl-music" data-music-control onClick={toggleMusic} aria-label={sound.playing?t.mute:t.music} aria-pressed={sound.playing}>{sound.playing?<Music2 size={18}/>:<VolumeX size={18}/>}</button></div></header>
   <main id="bl-main" tabIndex={-1}>
    <Journey lang={lang} sceneStatus={sceneStatus} onSceneStatusChange={setSceneStatus}/><Evening lang={lang}/>
    <section className="bl-rsvp" id="bl-rsvp"><div className="bl-rsvp-intro"><span className="bl-label">{t.replyLabel}</span><h2><Lines text={t.reply}/></h2><Ornament/><p>{t.replyText}</p><Monogram className="bl-rsvp-monogram"/></div><div className="bl-rsvp-form"><GuestReply slug={event.slug} labels={{ar:{submit:'تأكيد الحضور',thanks:'شكراً لكم، ننتظركم بكل الحب.',thankYou:'وصل ردّكم إلى بسّام ولانا.'},en:{submit:'Confirm attendance',thanks:'Thank you. We cannot wait to welcome you.',thankYou:'Your reply is with Bassam & Lana.'}}}/></div></section>
    <section className="bl-finale"><img src={`${imageRoot}/threshold.webp`} alt={lang==='ar'?'أبواب برونزية مضاءة من عالم الدعوة المولّد':'Original rendered bronze doors from the invitation setting'} width="1536" height="1024" loading="lazy"/><div><span className="bl-label">{event.names[lang]}</span><h2><Lines text={t.closing}/></h2><Ornament/><p>{t.closingNote}</p><time dateTime={event.eventDate} dir="ltr">15.01.2027</time><Heart size={18} strokeWidth={1}/></div></section>
   </main>
   <footer className="bl-footer"><a href={`/${lang}`}>{t.credit}</a><Monogram/><details><summary>{t.musicCredits}</summary><p>“{event.music.title}” · <a href={event.music.source} target="_blank" rel="noopener noreferrer">{event.music.artist}</a> · <a href={event.music.license} target="_blank" rel="noopener noreferrer">CC BY 4.0</a>. {lang==='ar'?'مقتطف صوتي مع تدرّج للبداية والنهاية، مضغوط للويب.':'Excerpt with opening and closing fades, compressed for the web.'}</p></details></footer>
  </div>
  <span className="bl-screen-reader" role="status">{sound.failed?t.musicError:''}</span>
 </div>;
}
