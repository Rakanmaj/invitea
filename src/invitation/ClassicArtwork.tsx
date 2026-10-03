import {motion,useReducedMotion,useScroll,useTransform} from 'motion/react';

/** Original botanical line drawings, kept as vectors for crisp, lightweight ornament. */
function Rose({x,y,scale=1}:{x:number;y:number;scale?:number}){
 return <g transform={`translate(${x} ${y}) scale(${scale})`}>
  <path d="M-7-2c-13-23 5-31 18-22 19-8 32 8 21 22 15 15-3 34-18 25-19 13-40-5-28-21-15-12-5-31 7-27"/>
  <path d="M-7-2c-6-12 4-24 16-13 12-7 23 6 13 16 10 12-3 22-14 14-13 9-27-3-17-14M-2-3c3-12 17-11 17 0s-13 15-17 3c-3-7 4-10 9-6"/>
  <path d="M-19-10l8 3M-16 12l9-5M4 26l3-9M27 12l-9-5M27-17l-9 6M0-27l4 8" strokeWidth=".6"/>
 </g>;
}
function Leaf({x,y,rotate=0,scale=1}:{x:number;y:number;rotate?:number;scale?:number}){
 return <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
  <path d="M0 0C-17-15-13-36 0-53 15-35 18-16 0 0Zm0-2v-43M0-13l-9-9m9-2 10-11M0-31l-6-8"/>
 </g>;
}
export function BotanicalDrawing({className=''}:{className?:string}){
 return <svg className={`tl-botanical ${className}`} viewBox="0 0 430 680" fill="none" stroke="currentColor" strokeWidth="1.05" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  <path className="tl-drawn-stem" pathLength="1" d="M111 648C163 551 165 456 185 364c23-98 33-185 85-270M167 453c-58-32-87-77-98-134M188 355c69-24 117-52 142-110M211 268c-67-26-93-62-95-114M251 134c48-5 75-35 86-68"/>
  <path d="M108 646c36-78 56-165 67-256M159 476c43-5 73-28 91-62M143 535c-29-8-59-34-68-69M196 321c-1-48-19-89-49-106" strokeWidth=".6"/>
  <Leaf x={154} y={504} rotate={-54} scale={1.15}/><Leaf x={164} y={443} rotate={46} scale={1.3}/><Leaf x={181} y={384} rotate={-35} scale={1.12}/>
  <Leaf x={193} y={337} rotate={59} scale={1.25}/><Leaf x={212} y={272} rotate={-40}/><Leaf x={230} y={206} rotate={49}/><Leaf x={257} y={129} rotate={-26} scale={.9}/>
  <Leaf x={85} y={367} rotate={-34} scale={.9}/><Leaf x={111} y={410} rotate={-60}/><Leaf x={276} y={301} rotate={46}/><Leaf x={317} y={258} rotate={-14} scale={.85}/>
  <Leaf x={151} y={232} rotate={-70} scale={.85}/><Leaf x={129} y={192} rotate={30} scale={.75}/><Leaf x={305} y={105} rotate={57} scale={.75}/>
  <Rose x={68} y={299} scale={1.18}/><Rose x={116} y={133} scale={1.04}/><Rose x={338} y={229} scale={1.32}/><Rose x={280} y={69} scale={1.05}/><Rose x={344} y={52} scale={.68}/>
  <path d="M246 413c-4-20 18-28 30-17-18 5-23 10-26 20M75 465c-18-17-37-6-33 8 10-9 22-11 33-8M104 583c-25-3-30-22-21-34 6 17 11 23 21 34M184 547c23-12 40-1 37 16-14-7-28-10-37-16"/>
 </svg>;
}
export function ClassicBackdrop(){
 const reduced=useReducedMotion();const {scrollYProgress}=useScroll();const rise=useTransform(scrollYProgress,[0,1],[0,-65]);
 return <div className="tl-classic-backdrop" aria-hidden="true">
  <svg className="tl-wallpaper" width="100%" height="100%"><defs><pattern id="tl-toile" width="130" height="160" patternUnits="userSpaceOnUse"><g fill="none" stroke="currentColor" strokeWidth=".65"><path d="M65 18c-11 15-9 29 0 37 9-8 11-22 0-37Zm0 36v58m0-20c-23-2-27-18-23-26 13 0 24 13 23 26Zm0 0c23-2 27-18 23-26-13 0-24 13-23 26ZM54 123l11-10 11 10-11 10-11-10Z"/><circle cx="65" cy="123" r="2"/></g></pattern></defs><rect width="100%" height="100%" fill="url(#tl-toile)"/></svg>
  <motion.div className="tl-backdrop-left" style={{y:reduced?0:rise}}><BotanicalDrawing/></motion.div>
  <motion.div className="tl-backdrop-right" style={{y:reduced?0:rise}}><BotanicalDrawing/></motion.div>
  <div className="tl-edge-rule"/><div className="tl-edge-rule tl-edge-rule-end"/>
 </div>;
}
export function WeddingCrest(){
 const reduced=useReducedMotion();
 return <div className="tl-wedding-crest" aria-hidden="true"><svg viewBox="0 0 230 150" fill="none" stroke="currentColor" strokeWidth="1">
  <motion.path d="M110 132C29 102 37 39 75 20M120 132c81-30 73-93 35-112" initial={reduced?false:{pathLength:0}} animate={{pathLength:1}} transition={{duration:1.8,ease:'easeOut'}}/>
  {[0,1,2,3,4].map(i=><g key={i}><Leaf x={62+i*5} y={54+i*15} rotate={-60+i*5} scale={.42}/><Leaf x={168-i*5} y={54+i*15} rotate={60-i*5} scale={.42}/></g>)}
  <path d="M102 130c8-8 18-8 26 0m-13-1-11 11m11-11 11 11M95 16h40M108 10h14" strokeWidth=".7"/>
 </svg><span dir="ltr">T<em>&</em>L</span></div>;
}
export function FrameCorner({className=''}:{className?:string}){
 return <svg className={`tl-frame-corner ${className}`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth=".8" aria-hidden="true"><path d="M4 96V4h92M12 96V12h84M20 85V20h65M4 47c28 0 20-27 38-29 22-2 17 24-2 20-14-3-4-16 5-11M47 4c0 28-27 20-29 38-2 22 24 17 20-2-3-14-16-4-11 5M20 63c19-1 38-20 43-43M20 63c1-20 15-28 23-22-7 1-10 8-11 14M63 20c-20 1-28 15-22 23 1-7 8-10 14-11"/><circle cx="24" cy="24" r="3"/></svg>;
}
export function MusicRecord(){
 return <svg className="tl-music-record" viewBox="0 0 40 40" fill="none" aria-hidden="true"><circle cx="20" cy="20" r="18" fill="#424d3e" stroke="#aa8960"/><circle cx="20" cy="20" r="14" stroke="#d1c2a2" strokeWidth=".4"/><circle cx="20" cy="20" r="11" stroke="#d1c2a2" strokeWidth=".4"/><circle cx="20" cy="20" r="6" fill="#dbc7a0"/><path d="M20 17v6m-3-3h6" stroke="#424d3e" strokeWidth=".7"/><path d="M6 20a14 14 0 0 1 14-14M20 34a14 14 0 0 0 14-14" stroke="#f4ead1" strokeWidth=".8"/></svg>;
}
