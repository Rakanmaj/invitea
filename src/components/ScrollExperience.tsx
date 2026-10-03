import {useEffect,useRef,useState,type ReactNode} from 'react';
import {motion,useReducedMotion,useScroll,useTransform} from 'motion/react';
import {useLanguage} from '../i18n';
import './scroll-experience.css';

export function useScrollMotion(){
 const [enabled,setEnabled]=useState(()=>matchMedia('(prefers-reduced-motion: no-preference)').matches);
 useEffect(()=>{const query=matchMedia('(prefers-reduced-motion: no-preference)');const update=()=>setEnabled(query.matches);query.addEventListener('change',update);return()=>query.removeEventListener('change',update);},[]);
 return enabled;
}

/** Native document scrolling supplies the choreography; no scroll interception. */
export function ScrollVisual({children,className='',distance=38,rotation=0}:{children:ReactNode;className?:string;distance?:number;rotation?:number}){
 const ref=useRef<HTMLDivElement>(null),enabled=useScrollMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
 const y=useTransform(scrollYProgress,[0,1],[distance,-distance]);
 const turn=useTransform(scrollYProgress,[0,1],[-rotation,rotation]);
 return <motion.div ref={ref} className={className} style={{y:enabled?y:0,rotate:enabled?turn:0}}>{children}</motion.div>;
}

export function SectionSeam({from='ivory',to='burgundy',reverse=false}:{from?:'ivory'|'burgundy';to?:'ivory'|'burgundy';reverse?:boolean}){
 const ref=useRef<HTMLDivElement>(null),reduced=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start end','end center']});
 const y=useTransform(scrollYProgress,[0,1],[30,0]);
 const line=useTransform(scrollYProgress,[0,.85],[0,1]);
 const shape='M0 92 C240 145 385 16 660 34 S1120 122 1440 40';
 return <div ref={ref} className={`section-seam seam-from-${from} seam-to-${to} ${reverse?'seam-reverse':''}`} aria-hidden="true">
  <motion.svg viewBox="0 0 1440 180" preserveAspectRatio="none" style={{y:reduced?0:y}}><path d={`${shape} V180 H0 Z`} fill={to==='burgundy'?'#6E2F3A':'#F8F3EC'}/><motion.path d={shape} fill="none" stroke="#D8C2A8" strokeWidth="1.5" vectorEffect="non-scaling-stroke" style={{pathLength:reduced?1:line}}/></motion.svg>
 </div>;
}

export function PageThread(){
 const {lang}=useLanguage(),reduced=useReducedMotion();const {scrollYProgress}=useScroll();
 return <><motion.div className="studio-scroll-progress" aria-hidden="true" style={{scaleX:reduced?1:scrollYProgress,transformOrigin:lang==='ar'?'right':'left'}}/>
 <div className="studio-thread" aria-hidden="true"><svg viewBox="0 0 240 900" fill="none" preserveAspectRatio="xMidYMid slice"><path d="M170-40C15 130 215 250 175 388S30 585 110 722 205 842 165 955" stroke="currentColor" strokeWidth=".7"/><path d="M173-40C32 140 225 250 189 389S46 581 125 723 215 839 177 955" stroke="currentColor" strokeWidth=".35"/></svg></div></>;
}
