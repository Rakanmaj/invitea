import {useEffect,useRef,useState,type PointerEvent} from 'react';
import {Sparkles,Check} from 'lucide-react';

type Props={date:string;stamp:string;time:string;instruction:string;revealLabel:string;revealedLabel:string;onReveal:()=>void};
const width=380,height=190,columns=38,rows=19,radius=25;

/** A small canvas surface; the date remains accessible through the reveal button. */
export default function ScratchDate({date,stamp,time,instruction,revealLabel,revealedLabel,onReveal}:Props){
 const canvas=useRef<HTMLCanvasElement>(null),last=useRef<{x:number;y:number}|null>(null),coverage=useRef(new Uint8Array(columns*rows)),erased=useRef(0);
 const [revealed,setRevealed]=useState(false),[started,setStarted]=useState(false);
 useEffect(()=>{
  const element=canvas.current;if(!element)return;
  const dpr=Math.min(window.devicePixelRatio||1,2);element.width=width*dpr;element.height=height*dpr;
  const context=element.getContext('2d');if(!context)return;context.scale(dpr,dpr);
  context.fillStyle='#828971';context.fillRect(0,0,width,height);
  context.strokeStyle='#d7c99d';context.lineWidth=.65;context.strokeRect(11,11,width-22,height-22);context.strokeRect(15,15,width-30,height-30);
  context.fillStyle='#efe5c530';
  for(let i=0;i<640;i++){const x=(i*37.71)%width,y=(i*23.17)%height;context.beginPath();context.arc(x,y,.5,0,Math.PI*2);context.fill();}
  coverage.current.fill(0);erased.current=0;
 },[]);
 function reveal(){if(revealed)return;setRevealed(true);last.current=null;onReveal();}
 function point(e:PointerEvent<HTMLCanvasElement>){const box=e.currentTarget.getBoundingClientRect();return{x:(e.clientX-box.left)*width/box.width,y:(e.clientY-box.top)*height/box.height};}
 function brush(from:{x:number;y:number},to:{x:number;y:number}){
  const context=canvas.current?.getContext('2d');if(!context)return;
  context.globalCompositeOperation='destination-out';context.fillStyle='#000';context.strokeStyle='#000';context.lineWidth=radius*2;context.lineCap='round';
  context.beginPath();context.moveTo(from.x,from.y);context.lineTo(to.x,to.y);context.stroke();
  context.beginPath();context.arc(to.x,to.y,radius,0,Math.PI*2);context.fill();
  const steps=Math.max(1,Math.ceil(Math.hypot(to.x-from.x,to.y-from.y)/12));
  for(let s=0;s<=steps;s++){
   const x=from.x+(to.x-from.x)*s/steps,y=from.y+(to.y-from.y)*s/steps;
   for(let r=Math.max(0,Math.floor((y-radius)*rows/height));r<Math.min(rows,Math.ceil((y+radius)*rows/height));r++){
    for(let c=Math.max(0,Math.floor((x-radius)*columns/width));c<Math.min(columns,Math.ceil((x+radius)*columns/width));c++){
     const index=r*columns+c;if(!coverage.current[index]&&Math.hypot((c+.5)*width/columns-x,(r+.5)*height/rows-y)<radius){coverage.current[index]=1;erased.current++;}
    }
   }
  }
  if(erased.current/coverage.current.length>.42)reveal();
 }
 function start(e:PointerEvent<HTMLCanvasElement>){if(revealed||e.button!==0)return;e.currentTarget.setPointerCapture(e.pointerId);setStarted(true);last.current=point(e);brush(last.current,last.current);}
 function move(e:PointerEvent<HTMLCanvasElement>){if(!last.current||revealed)return;const next=point(e);brush(last.current,next);last.current=next;}
 function end(e:PointerEvent<HTMLCanvasElement>){last.current=null;if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);}
 return <div className={`tl-scratch ${revealed?'is-revealed':''}`}>
  <div className="tl-scratch-card" role="group" aria-label={instruction}>
   <div className="tl-scratch-date" aria-hidden={!revealed}><span>{stamp}</span><strong>{date}</strong><small>{time}</small></div>
   <canvas ref={canvas} className="tl-scratch-foil" aria-hidden="true" onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end}/>
   <span className={`tl-scratch-caption ${started?'is-started':''}`} aria-hidden="true"><Sparkles size={28} strokeWidth={1}/><span>{instruction}</span><i/></span>
  </div>
  <button className="tl-text-link tl-reveal-button" onClick={reveal} disabled={revealed}>{revealed?<Check size={16}/>:<Sparkles size={16}/>} {revealed?revealedLabel:revealLabel}</button>
  <span className="tl-screen-reader" role="status">{revealed?`${date}, ${time}`:''}</span>
 </div>;
}
