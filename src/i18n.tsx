import React, { createContext, useContext, useEffect, useState } from 'react';
import { copy } from './content/copy';
import {invitationRoute} from './share/metadata';
export type Lang = 'en' | 'ar';
const LanguageContext = createContext<{lang:Lang; setLang:(value:Lang)=>void; t:typeof copy.en}>({lang:'en',setLang:()=>{},t:copy.en});
export function LanguageProvider({children}:{children:React.ReactNode}) {
 const [lang,setLanguage]=useState<Lang>(()=>location.pathname.startsWith('/ar')?'ar':invitationRoute(location.pathname,new URLSearchParams(location.search).get('lang')||undefined)?.lang||'en');
 const setLang=(next:Lang)=>{setLanguage(next); const url=new URL(location.href); url.pathname=url.pathname.replace(/^\/(en|ar)(?=\/|$)/,'')||'/'; url.pathname=`/${next}${url.pathname==='/'?'':url.pathname}`; history.replaceState(null,'',url);};
 useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';if(/^\/(?:en|ar)?\/?$/.test(location.pathname))document.title=lang==='ar'?'Invitéa — مواقع دعوات مصممة لك':'Invitéa — Custom Website Invitations';},[lang]);
 return <LanguageContext.Provider value={{lang,setLang,t:copy[lang]}}>{children}</LanguageContext.Provider>;
}
export const useLanguage=()=>useContext(LanguageContext);
