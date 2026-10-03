import {useId} from 'react';

/** Only generated artwork is painted; clipping lets the physical folds move independently. */
export default function EnvelopeSurface({face}:{face:'back'|'front'|'flap'|'lining'}){
 const clipId=`envelope-photo-${useId().replaceAll(':','')}`;
 const outline=face==='front'?'M0 0L234 159Q240 163 246 159L480 0V255H0Z':face==='flap'||face==='lining'?'M0 0H480L247 177Q240 183 233 177Z':'M0 0H480V255H0Z';
 const artwork=face==='flap'?'unsealed':face==='lining'?'lining':'pocket';
 return <svg className={`envelope-surface envelope-surface-${face}`} viewBox="0 0 480 255" preserveAspectRatio="none" fill="none" aria-hidden="true">
  <defs><clipPath id={clipId}><path d={outline}/></clipPath></defs>
  <image href={`/brand/envelope-v2/${artwork}.webp`} x="0" y="0" width="480" height={face==='lining'?183:255} preserveAspectRatio="none" clipPath={`url(#${clipId})`}/>
 </svg>;
}
