import {useId} from 'react';
/** Fine engraved branches are drawn once across the paper before unsealing. */
export default function EnvelopeVeins(){const glowId=`envelope-vein-${useId().replaceAll(':','')}`;return <svg className="envelope-vein-art" viewBox="0 0 480 255" preserveAspectRatio="none" fill="none" aria-hidden="true">
 <defs><filter id={glowId} x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.7"/></filter></defs>
 <g className="vein-warmth" stroke="#F3DFC0" strokeWidth="2.1" strokeLinecap="round" filter={`url(#${glowId})`} opacity=".75">
  <path pathLength="1" d="M240 160C216 136 204 96 176 78S125 56 92 30 65 15 46 7"/>
  <path pathLength="1" d="M240 160C267 135 280 97 307 78S355 53 383 29 410 13 433 7"/>
  <path pathLength="1" d="M239 161C217 171 197 173 175 191S130 215 104 231 75 239 49 246"/>
  <path pathLength="1" d="M241 161C264 174 283 176 307 193S351 214 377 232 405 241 432 247"/>
 </g>
 <g stroke="#E5CEAA" strokeWidth=".95" strokeLinecap="round" strokeLinejoin="round">
  <path pathLength="1" d="M240 160C216 136 204 96 176 78S125 56 92 30 65 15 46 7"/>
  <path pathLength="1" d="M240 160C267 135 280 97 307 78S355 53 383 29 410 13 433 7"/>
  <path pathLength="1" d="M239 161C217 171 197 173 175 191S130 215 104 231 75 239 49 246"/>
  <path pathLength="1" d="M241 161C264 174 283 176 307 193S351 214 377 232 405 241 432 247"/>
  <path pathLength="1" className="vein-branch" d="M176 78C169 60 166 50 173 30L169 12M126 54C102 58 87 56 71 44L50 38M202 99C185 100 175 108 166 121L151 131"/>
  <path pathLength="1" className="vein-branch" d="M308 78C314 61 319 47 310 28L314 12M354 54C377 58 393 54 411 43L432 38M280 100C298 100 309 108 319 121L335 130"/>
  <path pathLength="1" className="vein-fine" d="M175 181C155 178 142 181 126 195L107 202M143 201C135 218 133 226 140 243M198 163C194 178 195 192 207 204L218 220"/>
  <path pathLength="1" className="vein-fine" d="M306 183C326 177 343 182 356 196L376 204M339 203C347 219 350 229 343 244M282 166C286 180 285 193 273 207L262 222"/>
 </g>
 <g stroke="#F8F3EC" strokeWidth=".3" strokeLinecap="round" opacity=".55"><path pathLength="1" className="vein-fine" d="M177 80L164 88 146 88M309 78L321 86 338 87M126 56L111 42 109 29M355 55L372 42 373 29M174 181L166 197 161 214M307 182L316 198 321 216"/></g>
 </svg>;}
