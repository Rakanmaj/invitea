import {useEffect,useState} from 'react';
import {motion,useReducedMotion} from 'motion/react';
import {Music2} from 'lucide-react';
import {ArrowRight} from '../components/EditorialArrow';
import type {Lang} from '../i18n';
import '@fontsource/pinyon-script/latin-400.css';
import './omar-envelope.css';

const copy={
 en:{label:'AN EVENING IN THE GARDEN',names:'Omar & Sara',note:'A little light. The beginning of forever.',open:'Open our invitation',opening:'Our evening is unfolding…',hint:'Touch the seal to begin.',music:'Music begins when you open.'},
 ar:{label:'أمسية تزهر بالمحبة',names:'عمر وسارة',note:'بين طيّات هذه الدعوة، تبدأ فرحتنا.',open:'افتح دعوتنا',opening:'نفتح لكم باب فرحتنا…',hint:'المس الختم، وابدأ الحكاية.',music:'تبدأ موسيقى الأمسية عند فتح الدعوة.'}
};
const veins=[
 'M500 315 C448 288 395 260 339 229 S202 160 112 132 Q65 110 0 0',
 'M500 315 C554 289 605 261 661 229 S798 160 888 132 Q935 110 1000 0',
 'M339 229 Q309 198 316 169 T280 119 Q269 90 291 56',
 'M316 169 Q280 168 259 145 T210 130',
 'M280 119 Q319 110 341 83 T365 58',
 'M202 176 Q204 143 180 121 T159 70',
 'M661 229 Q691 198 684 169 T720 119 Q731 90 709 56',
 'M684 169 Q720 168 741 145 T790 130',
 'M720 119 Q681 110 659 83 T635 58',
 'M798 176 Q796 143 820 121 T841 70',
 'M364 247 Q319 283 266 324 T117 404 Q69 430 7 455',
 'M636 247 Q681 283 734 324 T883 404 Q931 430 993 455',
 'M266 324 Q257 347 220 359 T171 392',
 'M734 324 Q743 347 780 359 T829 392'
];
const closed='/invitations/omar-sara/envelope-midnight-closed.webp';
const opened='/invitations/omar-sara/envelope-midnight-open.webp';

export default function OmarEnvelopeEntrance({lang,onOpen,onOpened,onLanguage}:{lang:Lang;onOpen:()=>void;onOpened:()=>void;onLanguage:()=>void}){
 const [opening,setOpening]=useState(false),[artReady,setArtReady]=useState(false);
 const reduced=!!useReducedMotion(),t=copy[lang];
 useEffect(()=>{
  if(!opening)return;
  const timer=window.setTimeout(onOpened,reduced?140:3750);
  return()=>window.clearTimeout(timer);
 },[opening,onOpened,reduced]);
 const open=()=>{if(opening)return;onOpen();setOpening(true);};
 return <motion.section className={`os-envelope-entrance ${opening?'is-opening':''} ${reduced?'is-still':''}`} aria-labelledby="os-envelope-title" initial={false} exit={reduced?{opacity:0}:{opacity:0,scale:1.025}} transition={{duration:reduced?.15:.8,ease:[.22,1,.36,1]}}>
  <img className="os-envelope-garden" src="/invitations/omar-sara/garden-hero.webp" alt="" width="1536" height="1024"/>
  <div className="os-envelope-vignette" aria-hidden="true"/>
  <span className="os-envelope-frame" aria-hidden="true"/>
  <button className="os-envelope-language" onClick={onLanguage} disabled={opening}>{lang==='en'?'عربي':'EN'}</button>
  <div className="os-envelope-heading"><span className="os-label">{t.label}</span><h1 id="os-envelope-title">{t.names}</h1><p>{t.note}</p></div>
  <button className="os-envelope-trigger" onClick={open} disabled={opening} aria-label={t.open} aria-describedby="os-envelope-hint">
   <span className="os-envelope-stage" aria-hidden="true">
    <span className="os-envelope-aura"/>
    <img className="os-envelope-open-art" src={opened} alt="" width="1200" height="854" loading="eager" onLoad={()=>setArtReady(true)} onError={()=>setArtReady(false)}/>
    <span className={`os-envelope-letter-message ${artReady?'has-art':''}`}><span>O <em>&</em> S</span><small>{lang==='ar'?'بكل المحبة، ننتظركم':'With love, we await you.'}</small></span>
    <svg className="os-envelope-closed-art" viewBox="0 0 1000 457" fill="none"><defs><mask id="os-pocket-mask"><path d="M0 0H1000V457H0Z" fill="white"/><circle cx="500" cy="315" r="73" fill="black"/></mask></defs><circle cx="500" cy="315" r="74" fill="#1a303d"/><image href={closed} width="1000" height="457" mask="url(#os-pocket-mask)"/></svg>
    <span className="os-envelope-turning-flap"><svg viewBox="0 0 1000 457" fill="none"><defs><mask id="os-flap-mask"><path d="M0 0H1000L500 326Z" fill="white"/><circle cx="500" cy="315" r="73" fill="black"/></mask></defs><image href={closed} width="1000" height="457" mask="url(#os-flap-mask)"/></svg></span>
    <span className="os-envelope-seal"><img src={closed} alt="" width="1200" height="548"/><span className="os-seal-initials" dir="ltr">O<em>&</em>S</span></span>
    <svg className="os-envelope-veins" viewBox="0 0 1000 457" fill="none"><defs><filter id="os-vein-light" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur in="SourceGraphic" stdDeviation="2.5"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>{veins.map((d,i)=><motion.path key={d} d={d} stroke={i<2?'#ffe7ad':'#f3d5a0'} strokeWidth={i<2?1.55:1} strokeLinecap="round" filter="url(#os-vein-light)" initial={{pathLength:0,opacity:0}} animate={opening&&!reduced?{pathLength:1,opacity:[0,1,1,0]}:{pathLength:0,opacity:0}} transition={{duration:1.9,delay:i<2?0:.08+(i%6)*.045,ease:[.22,1,.36,1],opacity:{times:[0,.12,.72,1]}}}/>)}</svg>
   </span>
   <span className="os-envelope-action">{opening?t.opening:t.open}<ArrowRight size={24}/></span>
  </button>
  <div className="os-envelope-hint" id="os-envelope-hint"><p>{t.hint}</p><small><Music2 size={13}/>{t.music}</small></div>
  <span className="os-envelope-announcement" role="status">{opening?t.opening:''}</span>
 </motion.section>;
}
