import {useEffect} from 'react';
import {useLanguage} from '../i18n';
import {legalContent,legalVersion,privacyVersion} from '../content/legal';
import {Footer,Logo} from './Home';
export default function Legal({type}:{type:'terms'|'privacy'}){const {lang,t,setLang}=useLanguage();const doc=legalContent[lang][type];useEffect(()=>{document.title=`${doc.title} · Invitéa`;},[doc.title]);return <><header className="legal-header"><a href={`/${lang}`}><Logo/></a><a href={`/${lang}`}>{t.back}</a><button onClick={()=>setLang(lang==='en'?'ar':'en')}>EN / عربي</button></header><main className="legal-page"><span className="eyebrow">INVITÉA</span><h1>{doc.title}</h1><p className="legal-version">{t.legalUpdated}: {type==='privacy'?privacyVersion:legalVersion}</p><p>{doc.intro}</p>{doc.sections.map(s=><section key={s.title}><h2>{s.title}</h2>{s.paragraphs.map(p=><p key={p}>{p}</p>)}</section>)}</main><Footer/></>;}
