import {useEffect,useState} from 'react';
import {motion,useReducedMotion} from 'motion/react';
import {ArrowRight} from '../components/EditorialArrow';
import {FrameCorner,WeddingCrest} from './ClassicArtwork';
import type {Lang} from '../i18n';
import '@fontsource/pinyon-script/latin-400.css';
import './envelope-entrance.css';

const words={
 en:{label:'AN EVENING TO REMEMBER',names:'Tareq & Layan',note:'A little envelope. A beautiful beginning.',open:'Click here to open',opening:'Opening your invitation…',hint:'Open the envelope to enter our celebration.',music:'Wedding music begins when you open.'},
 ar:{label:'فرحة نشاركها مع من نحبّ',names:'طارق وليان',note:'بين طيّات هذه الدعوة، حكايتنا.',open:'افتح الدعوة',opening:'نفتح لك باب فرحتنا…',hint:'لك مكان في فرحتنا، وقلب هذه الدعوة.',music:'تبدأ موسيقى الأمسية عند فتح الدعوة.'}
};

export default function EnvelopeEntrance({lang,onOpen,onOpened}:{lang:Lang;onOpen:()=>void;onOpened:()=>void}){
 const [opening,setOpening]=useState(false);
 const reduced=useReducedMotion();
 const t=words[lang];
 useEffect(()=>{
  if(!opening)return;
  const timer=window.setTimeout(onOpened,reduced?120:1650);
  return()=>window.clearTimeout(timer);
 },[opening,onOpened,reduced]);
 const open=()=>{if(opening)return;onOpen();setOpening(true);};
 return <motion.section className={`tl-envelope-entrance ${opening?'is-opening':''}`} aria-labelledby="tl-entry-title"
  initial={false} exit={reduced?{opacity:0}:{clipPath:'inset(0 0 100% 0)',opacity:0}}
  transition={{duration:reduced?.12:.8,ease:[.22,1,.36,1]}}>
  <div className="tl-entry-border" aria-hidden="true"><FrameCorner/><FrameCorner className="tl-corner-ne"/><FrameCorner className="tl-corner-se"/><FrameCorner className="tl-corner-sw"/></div>
  <div className="tl-entry-heading"><span className="tl-label">{t.label}</span><h1 id="tl-entry-title">{t.names}</h1><p>{t.note}</p></div>
  <button className="tl-envelope-trigger" onClick={open} disabled={opening} aria-label={t.open}>
   <span className="tl-envelope-stage" aria-hidden="true">
    <img className="tl-envelope-open-art" src="/invitations/tareq-layan/envelope-open.webp" alt="" width="1200" height="970" fetchPriority="high"/>
    <span className="tl-envelope-letter"><WeddingCrest/><span>{t.names}</span><small>{lang==='ar'?'بكل المحبة، ندعوكم':'With love, you are invited'}</small></span>
    <img className="tl-envelope-pocket" src="/invitations/tareq-layan/envelope-closed.webp" alt="" width="1200" height="655" fetchPriority="high"/>
    <span className="tl-envelope-flap"><img src="/invitations/tareq-layan/envelope-closed.webp" alt="" width="1200" height="655"/></span>
    <img className="tl-envelope-seal" src="/invitations/tareq-layan/envelope-closed.webp" alt="" width="1200" height="655"/>
   </span>
   <span className="tl-entry-action">{opening?t.opening:t.open}<ArrowRight size={26}/></span>
  </button>
  <p className="tl-entry-hint">{t.hint}<span>{t.music}</span></p>
 </motion.section>;
}
