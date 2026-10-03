import {ArrowRight} from './EditorialArrow';
import {useEffect,useRef,useState} from 'react';
import {ArrowDown,Plus,Minus} from 'lucide-react';
import {useMotionValueEvent,useReducedMotion,useScroll} from 'motion/react';
import {useLanguage} from '../i18n';
import {Lines,Reveal} from './Home';
import {ScrollVisual} from './ScrollExperience';
import EnvelopeVeins from './EnvelopeVeins';
import EnvelopeSurface from './EnvelopeSurface';

export default function BrandHero(){
 const {t}=useLanguage();
 const [open,setOpen]=useState(false);
 const [arriving,setArriving]=useState(true);
 const stage=useRef<HTMLDivElement>(null);
 const hero=useRef<HTMLElement>(null),chosen=useRef(false);
 const reduce=useReducedMotion();
 useEffect(()=>{if(reduce){setOpen(true);setArriving(false);return;}const timer=window.setTimeout(()=>{if(!chosen.current)setOpen(true);},1300);const finish=window.setTimeout(()=>setArriving(false),3800);return()=>{window.clearTimeout(timer);window.clearTimeout(finish);};},[reduce]);
 const {scrollYProgress}=useScroll({target:hero,offset:['start start','end start']});
 useMotionValueEvent(scrollYProgress,'change',value=>{if(!reduce&&!chosen.current&&!open&&value>.16)setOpen(true);});
 function toggleEnvelope(){chosen.current=true;setOpen(value=>!value);}
 function move(e:React.PointerEvent){if(reduce||e.pointerType!=='mouse')return;const rect=e.currentTarget.getBoundingClientRect();stage.current?.style.setProperty('--brand-x',`${((e.clientX-rect.left)/rect.width-.5)*8}px`);stage.current?.style.setProperty('--brand-y',`${((e.clientY-rect.top)/rect.height-.5)*8}px`);}
 return <section ref={hero} className={`brand-hero ${arriving?'is-arriving':''}`} onPointerMove={move} onPointerLeave={()=>{stage.current?.style.setProperty('--brand-x','0px');stage.current?.style.setProperty('--brand-y','0px');}}>
  <div className="brand-hero-top"><span className="eyebrow">{t.eyebrow}</span><span className="hero-studio-note">{t.brandOrigin}</span></div>
  <div className="brand-hero-body">
   <div className="brand-hero-copy"><h1><Lines lines={t.hero}/></h1><Reveal className="brand-hero-intro" delay={.2}><p>{t.intro}</p><div className="hero-buttons"><a href="#request" className="button primary"><span>{t.start}</span><ArrowRight size={22}/></a><a href="#invitations" className="button secondary"><span>{t.view}</span><ArrowRight size={21}/></a></div></Reveal></div>
   <ScrollVisual className="hero-art-scroll" distance={55} rotation={1}><div className={`brand-scene ${open?'is-open':''}`} ref={stage}>
    <div className="scene-line line-one" aria-hidden="true"/><div className="scene-line line-two" aria-hidden="true"/>
    <span className="scene-side-label">{t.edition}</span>
    <div className="stationery-composition">
     <div className="back-stationery" aria-hidden="true"><span>Invitéa</span><span>{t.brandPaperNote}</span></div>
     <button className="brand-envelope" onClick={toggleEnvelope} aria-expanded={open} aria-controls="brand-letter" aria-label={open?t.closeEnvelope:t.openEnvelope}>
      <span className="envelope-back"><EnvelopeSurface face="back"/></span>
      <span className="envelope-flap"><span className="envelope-flap-face"><EnvelopeSurface face="flap"/></span><span className="envelope-flap-lining"><EnvelopeSurface face="lining"/></span></span>
      <span className="invitation-letter" id="brand-letter" aria-hidden={!open}><img src="/brand/wordmark.png" alt="Invitéa"/><span className="letter-message">{t.brandLetter}</span><span className="letter-rule"/><span className="letter-description">{t.brandLetterNote}</span></span>
      <span className="envelope-front"><EnvelopeSurface face="front"/><span className="envelope-label">{t.brandEnvelopeLabel}</span></span>
      <img className="brand-envelope-closed-art" src="/brand/envelope-v2/closed.webp" alt="" width="1100" height="497"/>
      <span className="envelope-seal"><img className="seal-art" src="/brand/envelope-v2/seal.webp" alt=""/><img className="seal-mark" src="/brand/monogram.png" alt=""/></span>
      <EnvelopeVeins/>
     </button>
    </div>
    <button className="envelope-invitation" onClick={toggleEnvelope} aria-expanded={open} aria-controls="brand-letter"><span className="small-circle">{open?<Minus size={20}/>:<Plus size={20}/>}</span><span>{open?t.closeEnvelope:t.openEnvelope}</span></button>
    <span className="scene-caption">{t.brandSceneCaption}</span>
   </div></ScrollVisual>
  </div>
  <div className="brand-hero-bottom"><a href="#services">{t.scroll}<ArrowDown size={18}/></a><p>{t.heroNote}</p><span>INVITÉA — {t.brandSignature}</span></div>
 </section>;
}
