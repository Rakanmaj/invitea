import {ArrowRight,ArrowUpRight} from './EditorialArrow';
import {useLanguage} from '../i18n';
import {useRequestPreferences} from '../RequestPreferences';
import {projects,portfolioWords} from '../content/portfolio';
import {Lines} from './Home';
import {useRef} from 'react';
import {motion,useScroll} from 'motion/react';
import {useScrollMotion} from './ScrollExperience';
import {useScrollMap} from './ScrollStory';
function PortfolioProject({project,index}:{project:typeof projects[number];index:number}){
 const {lang}=useLanguage(),words=portfolioWords[lang];const {setReferenceId}=useRequestPreferences();
 const ref=useRef<HTMLDivElement>(null),enabled=useScrollMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
 const y=useScrollMap(scrollYProgress,[0,1],[18,-18]);
 const direction=lang==='ar'?-1:1;
 const entranceX=useScrollMap(scrollYProgress,[0,.25],[index===0?-55*direction:index===2?55*direction:0,0]);
 const entranceY=useScrollMap(scrollYProgress,[0,.25],[index===1?75:0,0]);
 const entranceRotate=useScrollMap(scrollYProgress,[0,.25],[index===0?-1.5*direction:index===2?1.5*direction:0,0]);
 const entranceScale=useScrollMap(scrollYProgress,[0,.25],[index===2?.955:1,1]);
 const mask=useScrollMap(scrollYProgress,[0,.25],[index===3?'inset(26% 0 0% 0)':'inset(0% 0 0% 0)','inset(0% 0 0% 0)']);
 const href=project.externalHref||`/${lang}/invitations/${project.id}`;
 return <motion.div className="portfolio-piece" ref={ref} style={{x:enabled?entranceX:0,y:enabled?entranceY:0,rotate:enabled?entranceRotate:0,scale:enabled?entranceScale:1,clipPath:enabled?mask:'none'}}><div className={`template-card template-card-${project.id}`}>
  <a className="template-cover" href={href} target="_blank" rel="noopener noreferrer" aria-label={`${words.view} — ${project.name[lang]}`}><motion.div className="portfolio-media" style={{y:enabled?y:0,scale:enabled?1.07:1}}><img src={project.image} alt={project.imageAlt?.[lang]||project.description[lang]} loading="lazy" width="800" height="1067"/></motion.div><span className="template-badge">{project.badge?.[lang]||words.badge}</span>{project.id==='omar-sara'?<span className="portfolio-couple">{project.name[lang]}</span>:project.couple&&<span className="template-couple">{project.couple[lang]}</span>}<span className="template-cover-cta">{words.view}<ArrowUpRight/></span></a>
  <div className="template-card-body"><span className="tiny">{project.occasion[lang]}</span><div className="template-name-row"><h3>{project.name[lang]}</h3><span className="template-colors" aria-hidden="true">{project.colors.map(color=><i key={color} style={{background:color}}/>)}</span></div><p>{project.description[lang]}</p><div className="template-actions"><a className="button secondary" href={href} target="_blank" rel="noopener noreferrer">{words.view}<ArrowUpRight size={19}/></a><a className="button primary" href="#request" onClick={()=>setReferenceId(project.id)}>{words.order}<ArrowRight size={19}/></a></div></div>
 </div></motion.div>;
}
export default function Portfolio(){
 const {lang}=useLanguage();const words=portfolioWords[lang];const {setReferenceId}=useRequestPreferences();
 const ref=useRef<HTMLElement>(null),enabled=useScrollMotion();const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
 const background=useScrollMap(scrollYProgress,[0,.45,1],['#F1E7D9','#F6F0E7','#F8F3EC']);
 return <motion.section ref={ref} className="template-collection section-shell" id="invitations" style={{backgroundColor:enabled?background:'#F8F3EC'}}><div className="collection-heading"><div><span className="eyebrow">{words.label}</span><h2><Lines lines={words.title}/></h2></div><p>{words.intro}</p></div>
  <div className="template-grid portfolio-grid-four">{projects.map((project,index)=><PortfolioProject project={project} index={index} key={project.id}/>)}</div><div className="collection-end"><p>{words.note}</p><a className="text-link" href="#request" onClick={()=>setReferenceId(null)}>{words.custom}<ArrowRight/></a></div>
 </motion.section>;
}
