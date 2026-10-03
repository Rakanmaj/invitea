import {useEffect,useRef,useState,type RefObject} from 'react';

/** Attempt entry playback, then retry on a real gesture if browser policy requires it. */
export function useWeddingMusic(audio:RefObject<HTMLAudioElement|null>,enabled=true,volume=.22){
 const [playing,setPlaying]=useState(false),[blocked,setBlocked]=useState(false),[failed,setFailed]=useState(false);
 const userPaused=useRef(false),needsGesture=useRef(false);
 useEffect(()=>{
  const element=audio.current;if(!element||!enabled)return;let cancelled=false,resumeWhenVisible=false;
  element.volume=volume;
  element.autoplay=true;
  let pending=false;
  const attempt=()=>{
   if(cancelled||pending||userPaused.current||document.hidden||!element.paused)return;
   pending=true;
   void element.play().then(()=>{if(!cancelled){needsGesture.current=false;setBlocked(false);setFailed(false);}}).catch(error=>{
    if(cancelled||userPaused.current||error?.name==='AbortError')return;
    if(error?.name==='NotAllowedError'){needsGesture.current=true;setBlocked(true);}else{setFailed(true);}
   }).finally(()=>{pending=false;});
  };
  const gesture=(event:Event)=>{
   if(userPaused.current||!element.paused)return;
   if(event.target instanceof Element&&event.target.closest('[data-music-control]'))return;
   if(event instanceof KeyboardEvent&&!['Enter',' '].includes(event.key))return;
   attempt();
  };
  const visibility=()=>{
   if(document.hidden){resumeWhenVisible=!element.paused&&!userPaused.current;element.pause();}
   else if(resumeWhenVisible){resumeWhenVisible=false;attempt();}
  };
  document.addEventListener('pointerdown',gesture,{capture:true,passive:true});
  // Touch browsers grant activation on release; click also covers assistive controls.
  document.addEventListener('pointerup',gesture,{capture:true,passive:true});
  document.addEventListener('click',gesture,true);
  document.addEventListener('keydown',gesture,true);
  document.addEventListener('visibilitychange',visibility);
  // Retry once ready if the initial play request was interrupted while loading.
  element.addEventListener('canplay',attempt);
  attempt();
  return()=>{cancelled=true;document.removeEventListener('pointerdown',gesture,true);document.removeEventListener('pointerup',gesture,true);document.removeEventListener('click',gesture,true);document.removeEventListener('keydown',gesture,true);document.removeEventListener('visibilitychange',visibility);element.removeEventListener('canplay',attempt);element.pause();};
 },[audio,enabled,volume]);
 async function start(){
  const element=audio.current;if(!element)return;
  userPaused.current=false;element.volume=volume;setFailed(false);
  try{await element.play();setBlocked(false);needsGesture.current=false;}
  catch(error){if(error instanceof DOMException&&error.name==='AbortError')return;if(error instanceof DOMException&&error.name==='NotAllowedError'){setBlocked(true);needsGesture.current=true;}else setFailed(true);}
 }
 async function toggle(){
  const element=audio.current;if(!element)return;setFailed(false);needsGesture.current=false;setBlocked(false);
  if(!element.paused){userPaused.current=true;element.pause();return;}
  userPaused.current=false;element.volume=volume;
  try{await element.play();}catch(error){if(error instanceof DOMException&&error.name==='AbortError')return;setFailed(true);}
 }
 return {playing,blocked,failed,start,toggle,onPlaying:()=>{setPlaying(true);setBlocked(false);setFailed(false);needsGesture.current=false;},onPause:()=>setPlaying(false),onError:()=>{setPlaying(false);setFailed(true);}};
}
