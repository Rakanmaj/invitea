import {useEffect,useRef,useState,type ReactNode} from 'react';
import {animate,motion,transform,useMotionValue,useMotionValueEvent,useScroll,useTransform,type MotionValue} from 'motion/react';
import {useLanguage} from '../i18n';
import {ArrowRight,ArrowUpRight} from './EditorialArrow';
import {Lines} from './Home';
import EnvelopeVeins from './EnvelopeVeins';
import EnvelopeSurface from './EnvelopeSurface';
import {useScrollMotion} from './ScrollExperience';
import './envelope-depth.css';
import './scroll-story.css';

// Function mapping preserves the holds at each end of a partial scroll range.
export function useScrollMap<T extends number|string>(progress:MotionValue<number>,input:number[],output:T[]){return useTransform(progress,value=>transform(value,input,output));}
const segment=(value:number,start:number,end:number)=>Math.min(1,Math.max(0,(value-start)/(end-start)));

// Every screen shares the choreography. Only the visitor's reduced-motion preference disables it.
export function useStoryMotion(){return useScrollMotion();}
function useCompactStory(){
 const query='(max-width: 1049px), (max-height: 639px)';
 const [compact,setCompact]=useState(()=>window.matchMedia(query).matches);
 useEffect(()=>{const media=window.matchMedia(query);const update=()=>setCompact(media.matches);media.addEventListener('change',update);return()=>media.removeEventListener('change',update);},[]);
 return compact;
}

export function HeroProductStory({fallback}:{fallback:ReactNode}){
 const {t,lang}=useLanguage(),enabled=useStoryMotion(),compact=useCompactStory();
 const ref=useRef<HTMLDivElement>(null);
 const {scrollYProgress:p}=useScroll({target:ref,offset:['start start','end end']});
 const entry=useMotionValue(window.scrollY>20?1:0);
 const [arriving,setArriving]=useState(enabled&&window.scrollY<20);
 useEffect(()=>{
  if(!enabled||window.scrollY>20){entry.set(1);setArriving(false);return;}
  const animation=animate(entry,1,{delay:1.3,duration:.95,ease:[.22,1,.36,1]});
  const timer=window.setTimeout(()=>setArriving(false),3800);
  const stop=p.on('change',value=>{if(value>.015){animation.stop();entry.set(1);setArriving(false);}});
  return()=>{animation.stop();window.clearTimeout(timer);stop();};
 },[enabled,entry,p]);
 const [product,setProduct]=useState(false),[active,setActive]=useState(0);
 useMotionValueEvent(p,'change',value=>{if(!enabled)return;setProduct(value>.42);setActive(Math.min(5,Math.max(0,Math.floor((value-.5)/.5*6))));});
 const background=useScrollMap(p,[0,.4,1],['#F8F3EC','#F4EDE2','#F1E7D9']);
 const headlineY=useScrollMap(p,[0,.2,.42],[0,-35,-155]);
 const headlineOpacity=useScrollMap(p,[0,.12,.28],[1,.85,0]);
 const introOpacity=useScrollMap(p,[0,.1,.24],[1,.85,0]);
 const productY=useScrollMap(p,[.3,.56],[85,0]);
 const productOpacity=useScrollMap(p,[.38,.55],[0,1]);
 const previewX=useScrollMap(p,[0,.24,.56],['0vw','0vw',compact?'0vw':lang==='ar'?'11vw':'-11vw']);
 const previewScale=useScrollMap(p,[0,.3,.61],[1,1,compact?1.16:1.12]);
 const previewY=useScrollMap(p,[0,.3,.61],[0,0,compact?-20:75]);
 const opening=useTransform(()=>Math.max(entry.get(),segment(p.get(),.13,.32)));
 const [unsealed,setUnsealed]=useState(()=>opening.get()>.55);
 useMotionValueEvent(opening,'change',value=>setUnsealed(value>.55));
 const letterY=useTransform(()=>p.get()<.4?75-140*segment(opening.get(),.3,1):-65+10*segment(p.get(),.4,.61));
 const letterOpacity=useTransform(opening,value=>segment(value,.28,.55));
 const envelopeY=useTransform(()=>(compact?45:55)*entry.get()*(1-segment(p.get(),.32,.61))+190*segment(p.get(),.32,.61));
 const objectY=useTransform(()=>compact?0:55*entry.get()*(1-segment(p.get(),.35,.61)));
 const envelopeOpacity=useScrollMap(p,[.46,.54],[1,0]);
 const flapTurn=useTransform(opening,value=>value*-175);
 const flapDepth=useTransform(opening,value=>10-18*segment(value,.4,.65));
 const sealOpacity=useTransform(opening,value=>1-segment(value,0,.45));
 const closedArtworkOpacity=useTransform(opening,value=>1-segment(value,0,.12));
 const sealY=useTransform(opening,value=>value*25);
 const brandOpacity=useScrollMap(p,[.28,.38],[1,0]);
 const messageMask=useScrollMap(entry,[.25,.92],['inset(0% 0% 100% 0%)','inset(0% 0% 0% 0%)']);
 const orbitScale=useScrollMap(p,[.43,.7],[.8,1]);
 const objectTiltX=useScrollMap(p,[0,.22,.42],[8,8,0]);
 const objectTiltY=useScrollMap(p,[0,.22,.42],[lang==='ar'?12:-12,lang==='ar'?12:-12,0]);
 const objectTiltZ=useScrollMap(p,[0,.22,.42],[lang==='ar'?4:-4,lang==='ar'?4:-4,0]);
 if(!enabled)return <div ref={ref} className="story-fallback">{fallback}</div>;
 return <div ref={ref} className="hero-product-story">
  <span id="services" className="story-product-anchor"/>
  <motion.div className={`hero-product-stage ${arriving?'is-arriving':''}`} style={{backgroundColor:background}}>
   <motion.div className="story-topline" style={{opacity:headlineOpacity}}><span className="eyebrow">{t.eyebrow}</span></motion.div>
   <motion.section className="story-hero-copy" aria-hidden={product} inert={product} style={{y:headlineY,opacity:headlineOpacity}}>
    <h1><Lines lines={t.hero}/></h1>
    <motion.div className="story-hero-intro" style={{opacity:introOpacity}}><p>{t.intro}</p><div className="hero-buttons"><a href="#request" className="button primary">{t.start}<ArrowRight size={22}/></a><a href="#invitations" className="button secondary">{t.view}<ArrowRight size={21}/></a></div></motion.div>
   </motion.section>
   <motion.section className="story-product-copy" aria-hidden={!product} inert={!product} style={{y:productY,opacity:productOpacity}}>
    <span className="eyebrow">{t.productLabel}</span><h2><Lines lines={t.productTitle}/></h2><p>{t.productBody}</p><span className="story-product-note tiny">{t.available}</span>
   </motion.section>
   <div className="story-arrival"><motion.div className={`shared-invitation ${unsealed?'is-unsealed':''}`} style={{x:previewX,y:previewY,scale:previewScale}}>
    <motion.div className="story-preview-orbit" aria-hidden="true" style={{opacity:productOpacity,scale:orbitScale}}/>
    <div className="story-preview-geometry" aria-hidden="true"><i/><i/></div>
    <motion.div className="story-invitation-object" style={{y:objectY,rotateX:objectTiltX,rotateY:objectTiltY,rotateZ:objectTiltZ}}>
    <motion.div className="story-envelope-back" aria-hidden="true" style={{y:envelopeY,opacity:envelopeOpacity}}><EnvelopeSurface face="back"/></motion.div>
    <motion.div className="story-invitation-paper" style={{y:letterY,opacity:letterOpacity,z:3}}>
     <img src="/brand/wordmark.png" alt="Invitéa" width="2048" height="683"/><span className="story-paper-rule"/>
     <motion.div className="story-letter-brand" aria-hidden={product} style={{opacity:brandOpacity}}><motion.h3 style={{clipPath:messageMask}}>{t.brandLetter}</motion.h3><p>{t.brandLetterNote}</p></motion.div>
     <motion.div className="story-letter-feature" aria-hidden={!product} style={{opacity:productOpacity}}><span className="tiny">{t.explore}</span><h3>{t.features[active]}</h3><p>{t.featureDescriptions[active]}</p><span className="tiny">0{active+1} / 06</span></motion.div>
    </motion.div>
    <motion.div className="story-envelope-front" aria-hidden="true" style={{y:envelopeY,opacity:envelopeOpacity,z:8}}><EnvelopeSurface face="front"/><span>{t.brandEnvelopeLabel}</span></motion.div>
    <motion.div className="story-envelope-flap" aria-hidden="true" style={{rotateX:flapTurn,opacity:envelopeOpacity,y:envelopeY,z:flapDepth}}><span className="envelope-flap-face"><EnvelopeSurface face="flap"/></span><span className="envelope-flap-lining"><EnvelopeSurface face="lining"/></span></motion.div>
    <motion.img className="story-envelope-closed-art" src="/brand/envelope-v2/closed.webp" alt="" width="1100" height="497" style={{y:envelopeY,opacity:closedArtworkOpacity,z:14}}/>
    <motion.a className="story-envelope-seal" href="#services" aria-label={t.openEnvelope} aria-hidden={product||unsealed} style={{opacity:sealOpacity,y:sealY,z:16}} tabIndex={product||unsealed?-1:0}><img className="seal-art" src="/brand/envelope-v2/seal.webp" alt="" width="220" height="220"/><img className="seal-mark" src="/brand/monogram.png" alt="" width="1254" height="1254"/></motion.a>
    <motion.div className="story-envelope-veins" style={{y:envelopeY,z:17}} aria-hidden="true"><EnvelopeVeins/></motion.div>
    </motion.div>
    {!compact&&<motion.div className="story-feature-labels" role="group" aria-label={t.explore} aria-hidden={!product} inert={!product} style={{opacity:productOpacity}}>
     {t.features.map((feature,i)=><button key={feature} className={`story-feature-label story-label-${i} ${active===i?'active':''}`} onClick={()=>setActive(i)} aria-pressed={active===i}><i/>{feature}<span/></button>)}
    </motion.div>}
   </motion.div></div>
   {compact&&<motion.div className="story-mobile-features" role="group" aria-label={t.explore} aria-hidden={!product} inert={!product} style={{opacity:productOpacity}}>{t.features.map((feature,i)=><button key={feature} className={active===i?'active':''} onClick={()=>setActive(i)} aria-pressed={active===i}><i/>{feature}</button>)}</motion.div>}
   <div className="story-arrival-veil" aria-hidden="true"/>
   <motion.div className="story-scroll-note" style={{opacity:introOpacity}}><a href="#services">{t.scroll}<ArrowRight size={18}/></a><span className="tiny">{t.brandSignature}</span></motion.div>
   <motion.div className="story-feature-progress" style={{opacity:productOpacity}} aria-hidden="true"><span>0{active+1}</span><i/><span>06</span></motion.div>
  </motion.div>
 </div>;
}

export function OccasionsStory({fallback}:{fallback:ReactNode}){
 const {t,lang}=useLanguage(),enabled=useStoryMotion();const ref=useRef<HTMLDivElement>(null),rail=useRef<HTMLDivElement>(null);
 const [travel,setTravel]=useState(0),[active,setActive]=useState(0),[centres,setCentres]=useState<number[]>([]);
 const {scrollYProgress:p}=useScroll({target:ref,offset:['start start','end end']});
 useEffect(()=>{if(!enabled||!rail.current)return;const update=()=>{const bounds=rail.current!.getBoundingClientRect();setTravel(Math.max(0,rail.current!.scrollWidth-window.innerWidth+window.innerWidth*.12));setCentres(Array.from(rail.current!.children).map(child=>{const item=child.getBoundingClientRect();return (lang==='ar'?bounds.right-item.right:item.left-bounds.left)+item.width/2;}));};const observer=new ResizeObserver(update);observer.observe(rail.current);window.addEventListener('resize',update);update();return()=>{observer.disconnect();window.removeEventListener('resize',update);};},[enabled,lang]);
 useMotionValueEvent(p,'change',value=>{const centre=value*travel+window.innerWidth/2;setActive(centres.reduce((closest,position,index)=>Math.abs(position-centre)<Math.abs(centres[closest]-centre)?index:closest,0));});
 const x=useScrollMap(p,[0,1],[0,lang==='ar'?travel:-travel]);
 const background=useScrollMap(p,[0,.5,1],['#F8F3EC','#EFE3D3','#F8F3EC']);
 if(!enabled)return <div ref={ref}>{fallback}</div>;
 return <div className="occasion-story" ref={ref}><motion.section className="occasion-story-stage" style={{backgroundColor:background}}><div className="occasion-story-heading"><span className="eyebrow">{t.occasionsLabel}</span><h2><Lines lines={t.occasionsTitle}/></h2></div>
  <motion.div className="occasion-rail" ref={rail} style={{x}}>{t.occasions.map((occasion,i)=><a href="#request" className={active===i?'active':''} key={occasion}><span className="tiny">0{i+1}</span><span>{occasion}</span><ArrowUpRight size={38}/></a>)}</motion.div>
  <div className="occasion-story-bottom"><p>{t.occasionsNote}</p><span className="tiny">{String(active+1).padStart(2,'0')} / {String(t.occasions.length).padStart(2,'0')}</span></div>
 </motion.section></div>;
}

function ProcessCard({index,progress,title,body}:{index:number;progress:MotionValue<number>;title:string;body:string}){
 const y=useScrollMap(progress,index===0?[0,.35,.55,1]:index===1?[0,.2,.49,.75,1]:[0,.57,.87,1],index===0?[0,0,-30,-48]:index===1?[470,470,0,0,-25]:[485,485,0,0]);
 const scale=useScrollMap(progress,index===0?[.32,.56,1]:index===1?[.7,.91,1]:[0,1],index===0?[1,.94,.92]:index===1?[1,.96,.96]:[1,1]);
 return <motion.article className={`process-story-card process-story-card-${index}`} style={{y,scale,zIndex:index+1}}><span className="story-step-number">0{index+1}</span><div><h3>{title}</h3><p>{body}</p></div><span className="story-step-line" aria-hidden="true"/></motion.article>;
}

export function ProcessStory({fallback}:{fallback:ReactNode}){
 const {t}=useLanguage(),enabled=useStoryMotion();const ref=useRef<HTMLDivElement>(null);const [active,setActive]=useState(0);
 const {scrollYProgress:p}=useScroll({target:ref,offset:['start start','end end']});
 useMotionValueEvent(p,'change',value=>setActive(value<.37?0:value<.74?1:2));
 if(!enabled)return <div ref={ref}>{fallback}</div>;
 return <div className="process-story" ref={ref} id="how-it-works"><section className="process-story-stage"><div className="process-story-copy"><span className="eyebrow">{t.processLabel}</span><h2><Lines lines={t.processTitle}/></h2><span className="process-counter">0{active+1}<span>/ 03</span></span></div><div className="process-story-stack"><div className="story-stack-track" aria-hidden="true"><motion.span style={{scaleY:p}}/></div>{t.steps.map((step,index)=><ProcessCard key={step.title} index={index} progress={p} title={step.title} body={step.body}/>)}</div></section></div>;
}

function FinaleLine({index,progress,children}:{index:number;progress:MotionValue<number>;children:string}){
 const start=.2+index*.17;
 const y=useScrollMap(progress,[start,start+.2],['110%','0%']);
 const opacity=useScrollMap(progress,[start,start+.14],[0,1]);
 return <span className="finale-line-mask"><motion.span style={{y,opacity}}>{children}</motion.span></span>;
}

export function FinalStory(){
 const {t}=useLanguage(),enabled=useStoryMotion();const ref=useRef<HTMLDivElement>(null);
 const {scrollYProgress:p}=useScroll({target:ref,offset:['start end','end end']});
 const panelY=useScrollMap(p,[0,.4],['100%','0%']);
 const panelCorners=useScrollMap(p,[0,.4],['48% 48% 0% 0% / 12% 12% 0% 0%','0% 0% 0% 0% / 0% 0% 0% 0%']);
 const introOpacity=useScrollMap(p,[.17,.38],[0,1]);
 const buttonOpacity=useScrollMap(p,[.64,.85],[0,1]);
 if(!enabled)return <div ref={ref}><section className="final-cta"><span className="eyebrow">{t.finalSmall}</span><h2><Lines lines={t.final}/></h2><a className="button light" href="#request">{t.start}<ArrowRight size={22}/></a><div className="final-orbit" aria-hidden="true"/></section></div>;
 return <div ref={ref} className="finale-story"><section className="finale-stage"><motion.div className="finale-burgundy" aria-hidden="true" style={{y:panelY,borderRadius:panelCorners}}/><div className="finale-content"><motion.span className="eyebrow" style={{opacity:introOpacity}}>{t.finalSmall}</motion.span><h2>{t.final.map((line,index)=><FinaleLine index={index} progress={p} key={line}>{line}</FinaleLine>)}</h2><motion.a className="button light" href="#request" style={{opacity:buttonOpacity}}>{t.start}<ArrowRight size={22}/></motion.a></div><div className="finale-orbit" aria-hidden="true"/></section></div>;
}
