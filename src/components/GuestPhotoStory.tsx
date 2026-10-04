import {useRef,useState} from 'react';
import {motion,useMotionValueEvent,useReducedMotion,useScroll,useTransform} from 'motion/react';
import {LockKeyhole} from 'lucide-react';
import {ArrowRight} from './EditorialArrow';
import {useLanguage} from '../i18n';
import {guestPhotoAddon} from '../content/addons';
import './guest-photo-feature.css';
import './guest-photo-story.css';

const illustrations = ['capture','upload','receive'] as const;
const compactViewport = '(max-height:620px), (min-width:761px) and (max-height:680px)';
const words = {
 en: {
  label:'AN INVITÉA DETAIL', name:'Guest Photo Collection',
  title:['See your celebration','through your guests’ eyes.'],
  story:'From their camera, to your keepsakes.', scroll:'Scroll to follow the story', controls:'Scroll or tap a step to explore', compactControls:'Tap a step to follow the story',
  steps:[
   {nav:'Capture',title:'A moment, captured.',body:'Each guest captures or selects up to 10 photos from their camera or gallery.',alt:'An olive line drawing of a guest photographing a wedding couple.'},
   {nav:'Upload',title:'A few taps, shared.',body:'They upload the photos directly through your invitation. No account needed.',alt:'An olive line drawing of a wedding guest sending photos from their phone to a private collection.'},
   {nav:'Receive',title:'Your memories, received.',body:'As soon as the upload finishes, the photos reach your private collection.',alt:'An olive line drawing of a wedding couple receiving and enjoying their guests’ photos.'}
  ],
  privacy:'A private collection, made for you.', note:'Sharing stays open for four days after your event.', cta:'Add to my invitation'
 },
 ar: {
  label:'تفصيلة من إنڤيتيا',name:'مشاركة صور الضيوف',
  title:['شاهدوا مناسبتكم','بعيون ضيوفكم.'],
  story:'من كاميرا ضيوفكم، إلى ذكرياتكم.',scroll:'مرّر لتتابع الحكاية',controls:'مرّر أو المس إحدى الخطوات لتتابع الحكاية',compactControls:'المس إحدى الخطوات لتتابع الحكاية',
  steps:[
   {nav:'التقاط',title:'لقطات من قلب الفرح.',body:'يلتقط ضيفك صوراً للمناسبة، أو يختار حتى عشر صور من هاتفه.',alt:'رسم بخطوط زيتونية لضيف يلتقط صورة للعروسين.'},
   {nav:'مشاركة',title:'وبلمسة، تُشارك.',body:'يرفع الضيف صوره من رابط الدعوة مباشرة، من دون إنشاء حساب.',alt:'رسم بخطوط زيتونية لضيف يرفع الصور من هاتفه إلى المجموعة الخاصة.'},
   {nav:'استلام',title:'ذكريات تصل إليك.',body:'ما إن يكتمل الرفع، تصل الصور إلى مجموعتك الخاصة لتحتفظ بكل زاوية من الفرح.',alt:'رسم بخطوط زيتونية للعروسين وهما يتصفّحان صور الضيوف.'}
  ],
  privacy:'ذكرياتكم في مجموعة خاصة بكم.',note:'تبقى المشاركة متاحة لأربعة أيام بعد المناسبة.',cta:'أضف هذه الميزة إلى دعوتي'
 }
};

export default function GuestPhotoStory() {
 const {lang} = useLanguage();
 const t = words[lang];
 const reduce = useReducedMotion();
 const scene = useRef<HTMLElement>(null);
 const stage = useRef<HTMLDivElement>(null);
 const selectionOrigin = useRef<number | null>(null);
 const [active,setActive] = useState(0);
 const [chosen,setChosen] = useState<number | null>(null);
 const {scrollY,scrollYProgress:progress} = useScroll({target:scene,offset:['start start','end end']});
 const backdropY = useTransform(progress,[0,1],[32,-32]);
 const threadLength = useTransform(progress,[0,1],[.1,1]);
 useMotionValueEvent(progress,'change',value => {
  if (reduce || window.matchMedia(compactViewport).matches) return;
  // Small finger movements around a boundary should not flicker between scenes.
  setActive(previous => {
   if (value >= .72) return 2;
   if (value <= .28) return 0;
   if (previous === 0 && value >= .36) return 1;
   if (previous === 2 && value <= .64) return 1;
   return previous;
  });
 });
 useMotionValueEvent(scrollY,'change',value => {
  if (selectionOrigin.current === null || window.matchMedia(compactViewport).matches) return;
  // Preserve tapped steps through tiny scroll / browser-toolbar adjustments.
  if (Math.abs(value - selectionOrigin.current) > 48) {
   selectionOrigin.current = null;
   setChosen(null);
  }
 });
 function selectStep(index:number) {
  setChosen(index);
  setActive(index);
  const element = scene.current;
  const runway = element ? element.offsetHeight - window.innerHeight : 0;
  if (element && stage.current && runway > 0 && getComputedStyle(stage.current).position === 'sticky') {
   // Align the native scroll position with the chosen scene. The pinned frame
   // stays still; only the illustration and words animate, without scroll locking.
   const top = window.scrollY + element.getBoundingClientRect().top;
   const destination = top + runway * [.08,.5,.92][index];
   selectionOrigin.current = destination;
   window.scrollTo({top:destination,behavior:'instant'});
  } else {
   selectionOrigin.current = window.scrollY;
  }
 }
 const current = chosen ?? active;
 const transition = {duration:.65,ease:[.22,1,.36,1] as [number,number,number,number]};

 return <section ref={scene} className={`guest-photo-feature gpf-story-section ${reduce ? 'gpf-story-static' : ''}`} id="guest-photos" aria-label={t.name}>
  <div ref={stage} className="gpf-cinematic-stage">
   <motion.div className="gpf-memory-backdrop" aria-hidden="true" style={reduce ? {} : {y:backdropY}}>
    <div className="gpf-backdrop-pictures"><figure><img src="/invitations/omar-sara/garden-details.webp" alt="" loading="lazy"/></figure><figure><img src="/invitations/tareq-layan/table.webp" alt="" loading="lazy"/></figure><figure><img src="/invitations/yousef-rama/memory-flowers.webp" alt="" loading="lazy"/></figure></div>
    <div className="gpf-backdrop-copy"><p>{t.story}</p>{t.steps.map(step => <div key={step.nav}><h3>{step.nav}</h3><p>{step.body}</p></div>)}</div>
   </motion.div>
   <div className="gpf-story-vellum" aria-hidden="true"/>
   <header className="gpf-story-heading"><span className="eyebrow">{t.label}<i/>{t.name}</span><h2>{t.title.map(line => <span key={line}>{line}</span>)}</h2></header>

   {reduce ? <ol className="gpf-static-scenes">{t.steps.map((step,index) => <li key={step.nav}><img src={`/brand/guest-photo-story/${illustrations[index]}.png`} alt={step.alt} width="1280" height="1280" loading="lazy"/><div><span className="gpf-scene-index">0{index+1} / 03</span><h3>{step.title}</h3><p>{step.body}</p></div></li>)}</ol> : <div className="gpf-narrative">
    <div className="gpf-illustration-stage">
     <svg className="gpf-story-thread" viewBox="0 0 600 500" fill="none" aria-hidden="true"><motion.path d="M10 395C70 460 210 470 240 398S118 273 142 183 347 98 454 159 592 295 536 412" stroke="#B49A68" strokeWidth="1" strokeLinecap="round" style={{pathLength:threadLength}}/></svg>
     {t.steps.map((step,index) => <motion.figure key={illustrations[index]} className={`gpf-line-illustration ${current === index ? 'is-current' : ''}`} aria-hidden={current !== index} initial={false} animate={{opacity:current === index ? 1 : 0,x:current === index ? 0 : index === 1 ? 38 : -28,y:current === index ? 0 : index === 2 ? 22 : -12,rotate:current === index ? 0 : index === 1 ? 3 : -2,scale:current === index ? 1 : .97}} transition={transition}><img src={`/brand/guest-photo-story/${illustrations[index]}.png`} alt={step.alt} width="1280" height="1280" loading="lazy" decoding="async"/></motion.figure>)}
    </div>
    <div className="gpf-narrative-copy"><span className="gpf-scene-index" dir="ltr">0{current+1} <i/> 03</span><div className="gpf-scene-words">
     {t.steps.map((step,index) => <motion.article key={illustrations[index]} className={current === index ? 'is-current' : ''} aria-hidden={current !== index} inert={current !== index} initial={false} animate={{opacity:current === index ? 1 : 0,clipPath:current === index ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',x:current === index ? 0 : lang === 'ar' ? -18 : 18}} transition={transition}><h3>{step.title}</h3><p>{step.body}</p></motion.article>)}
    </div>
     <nav className="gpf-story-navigation" aria-label={t.story}>{t.steps.map((step,index) => <button type="button" key={step.nav} aria-pressed={current === index} onClick={() => selectStep(index)}><span dir="ltr">0{index+1}</span>{step.nav}<i/></button>)}</nav>
     <span className="gpf-scroll-hint"><span className="gpf-desktop-hint">{t.scroll}</span><span className="gpf-mobile-hint">{t.controls}</span><span className="gpf-compact-hint">{t.compactControls}</span><ArrowRight size={18}/></span>
    </div>
   </div>}

   <footer className="gpf-story-footer"><div className="gpf-collection-note"><span><LockKeyhole size={16} aria-hidden="true"/>{t.privacy}</span><small>{t.note}</small></div><div className="gpf-story-order"><span className="gpf-story-price">{guestPhotoAddon.optional[lang]}<strong dir="ltr">{guestPhotoAddon.fee[lang]}</strong></span><a href="#request" className="button primary">{t.cta}<ArrowRight size={22}/></a></div></footer>
  </div>
 </section>;
}
