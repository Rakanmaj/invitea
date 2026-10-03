import {useRef} from 'react';
import {motion,useScroll,useTransform,useReducedMotion} from 'motion/react';
import {Camera,LockKeyhole,ImagePlus} from 'lucide-react';
import {ArrowRight} from './EditorialArrow';
import {useLanguage} from '../i18n';
import './guest-photo-feature.css';
const words={
 en:{label:'INVITÉA SIGNATURE FEATURE',name:'Guest Photo Collection',title:['See your celebration','through your guests’ eyes.'],body:'Let your guests capture and share their favorite moments directly through your invitation. Every photo is collected privately for you in one place.',caption:'The moments you lived. The moments you missed.',private:'A private collection, made for you.',steps:[['Capture','A photograph from the camera, or a favorite from their gallery.'],['Share','Up to ten photographs per guest, directly through your invitation.'],['Keep','One private collection, with four days after the event to share.']],cta:'Bring this to my invitation',note:'Available for your custom invitation · included by arrangement',visual:'Illustrative photo composition. No guest uploads are displayed.',tiny:'EVERY GUEST. A DIFFERENT PERSPECTIVE.'},
 ar:{label:'إحدى مزايا إنڤيتيا المميّزة',name:'مشاركة صور الضيوف',title:['شاهدوا مناسبتكم','بعيون ضيوفكم'],body:'يمكن لضيوفكم التقاط الصور ومشاركتها مباشرة من خلال الدعوة، لتجتمع أجمل لحظات المناسبة في مكان واحد خاص بكم.',caption:'لحظات عشتموها، وأخرى فاتتكم.',private:'ذكرياتكم في مجموعة خاصة بكم.',steps:[['لحظة تُلتقط','من كاميرا الضيف أو من الصور التي احتفظ بها في هاتفه.'],['فرحة تُشارك','حتى عشر صور لكل ضيف، من داخل الدعوة بكل سهولة.'],['ذكرى تبقى','مجموعة واحدة خاصة، وأربعة أيام بعد المناسبة لمشاركة الصور.']],cta:'أضف هذه الميزة إلى دعوتي',note:'متاحة للدعوات المخصّصة، بحسب الاتفاق',visual:'تكوين توضيحي للميزة. لا تُعرض صور ضيوف حقيقية.',tiny:'لكل ضيف، زاوية أخرى للفرح.'}
};
export default function GuestPhotoFeature(){
 const {lang}=useLanguage(),t=words[lang],ref=useRef<HTMLElement>(null),reduce=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
 const left=useTransform(scrollYProgress,[0,.45,1],[-35,0,15]),right=useTransform(scrollYProgress,[0,.45,1],[35,0,-15]),y=useTransform(scrollYProgress,[0,1],[45,-35]),rot=useTransform(scrollYProgress,[0,1],[-5,3]);
 return <section ref={ref} className="guest-photo-feature section-shell" id="guest-photos">
  <div className="gpf-intro"><span className="eyebrow">{t.label}</span><span className="gpf-name">{t.name}</span><h2>{t.title.map(line=><span key={line}>{line}</span>)}</h2></div>
  <div className="gpf-story"><div className="gpf-art" role="img" aria-label={t.visual}>
   <span className="gpf-orbit" aria-hidden="true"/>
   <motion.figure className="gpf-photo gpf-left" style={reduce?{}:{x:left,y,rotate:-13}}><img src="/invitations/omar-sara/garden-details.webp" alt="" loading="lazy" width="850" height="1275"/><figcaption><span>01</span><Camera size={15}/></figcaption></motion.figure>
   <motion.figure className="gpf-photo gpf-right" style={reduce?{}:{x:right,y,rotate:13}}><img src="/invitations/yousef-rama/memory-flowers.webp" alt="" loading="lazy" width="1024" height="1536"/><figcaption><span>03</span><ImagePlus size={15}/></figcaption></motion.figure>
   <motion.figure className="gpf-photo gpf-center" style={reduce?{}:{rotate:rot}}><img src="/invitations/tareq-layan/table.webp" alt="" loading="lazy" width="1086" height="1448"/><figcaption>{t.caption}</figcaption></motion.figure>
   <span className="gpf-private"><LockKeyhole size={15}/>{t.private}</span><span className="gpf-art-label">{t.tiny}</span>
  </div><div className="gpf-copy"><p className="gpf-body">{t.body}</p><ol>{t.steps.map(([title,text],i)=><li key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol><a href="#request" className="button primary">{t.cta}<ArrowRight size={22}/></a><small>{t.note}</small></div></div>
 </section>;
}
