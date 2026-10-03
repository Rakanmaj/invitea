import {useRef,useState} from 'react';
import {motion,useReducedMotion} from 'motion/react';
import {ChevronLeft,ChevronRight} from 'lucide-react';
import type {Lang} from '../i18n';
import '@fontsource/pinyon-script/latin-400.css';
import './polaroid-gallery.css';

const memories=[
 {src:'portrait',alt:{en:'Wedding portrait of a couple in warm sunlight',ar:'صورة للعروسين في ضوء الشمس الدافئ'}},
 {src:'rings',alt:{en:'Wedding rings and hands resting together in golden light',ar:'خاتما الزواج ويدان متعانقتان في ضوء ذهبي'}},
 {src:'table',alt:{en:'White wedding flowers and candlelight on an elegantly set table',ar:'أزهار زفاف بيضاء وشموع على مائدة أنيقة'}}
];

export default function PolaroidGallery({lang,captions}:{lang:Lang;captions:string[]}){
 const [active,setActive]=useState(0),reduced=useReducedMotion();
 const touch=useRef<number|null>(null);
 const step=(delta:number)=>setActive(current=>(current+delta+memories.length)%memories.length);
 const rtl=lang==='ar';
 return <div className="tl-polaroid-album" role="region" aria-roledescription={rtl?'معرض صور':'carousel'} aria-label={rtl?'ذكريات العروسين':'Wedding memories'} tabIndex={0}
  onKeyDown={event=>{if(!['ArrowLeft','ArrowRight'].includes(event.key))return;event.preventDefault();step((event.key==='ArrowRight'?1:-1)*(rtl?-1:1));}}>
  <div className="tl-album-stage" onPointerDown={event=>{touch.current=event.clientX;}} onPointerCancel={()=>{touch.current=null;}} onPointerUp={event=>{if(touch.current===null)return;const distance=event.clientX-touch.current;touch.current=null;if(Math.abs(distance)>45)step((distance<0?1:-1)*(rtl?-1:1));}}>
   {memories.map((photo,index)=><motion.figure className="tl-album-photo" key={photo.src} aria-hidden={active!==index} initial={false} animate={{opacity:active===index?1:0,scale:reduced?1:active===index?1:.985,rotate:reduced?0:active===index?0:-1}} transition={{duration:reduced?.1:.5,ease:[.22,1,.36,1]}} style={{pointerEvents:active===index?'auto':'none'}}>
    <div><img src={`/invitations/tareq-layan/${photo.src}.webp`} alt={photo.alt[lang]} width="900" height="1200" loading="lazy" draggable={false}/></div>
    <figcaption>{captions[index]}</figcaption>
   </motion.figure>)}
  </div>
  <div className="tl-album-controls">
   <button className="tl-album-arrow" onClick={()=>step(-1)} aria-label={rtl?'الصورة السابقة':'Previous photo'}>{rtl?<ChevronRight size={20}/>:<ChevronLeft size={20}/>}</button>
   <div className="tl-album-dots">{memories.map((photo,index)=><button key={photo.src} onClick={()=>setActive(index)} aria-pressed={active===index} aria-label={rtl?`الصورة ${index+1}: ${captions[index]}`:`Photo ${index+1}: ${captions[index]}`}><span/></button>)}</div>
   <button className="tl-album-arrow" onClick={()=>step(1)} aria-label={rtl?'الصورة التالية':'Next photo'}>{rtl?<ChevronLeft size={20}/>:<ChevronRight size={20}/>}</button>
  </div>
  <span className="tl-screen-reader" aria-live="polite" aria-atomic="true">{captions[active]}</span>
 </div>;
}
