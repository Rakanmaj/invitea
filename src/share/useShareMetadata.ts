import {useEffect} from 'react';
import {codedInvitationMetadata,type ShareLanguage,type ShareMetadata} from './metadata';

export function applyDocumentMetadata(meta:ShareMetadata) {
 const selector='title,meta[name="description"],meta[name="robots"],meta[property^="og:"],meta[name^="twitter:"],link[rel="canonical"]';
 const previous=[...document.head.querySelectorAll(selector)].map(node=>node.cloneNode(true));
 document.head.querySelectorAll(selector).forEach(node=>node.remove());
 const title=document.createElement('title');title.textContent=meta.title;document.head.append(title);
 const canonical=document.createElement('link');canonical.rel='canonical';canonical.href=meta.url;document.head.append(canonical);
 const values=[['name','description',meta.description],['name','robots','noindex,nofollow'],['property','og:title',meta.title],['property','og:description',meta.description],['property','og:type','website'],['property','og:site_name','Invitéa'],['property','og:url',meta.url],['property','og:locale',meta.lang==='ar'?'ar_JO':'en_US'],['property','og:image',meta.image],['property','og:image:alt',meta.imageAlt],['name','twitter:card','summary_large_image'],['name','twitter:title',meta.title],['name','twitter:description',meta.description],['name','twitter:image',meta.image],['name','twitter:image:alt',meta.imageAlt]];
 if(meta.width&&meta.height)values.push(['property','og:image:width',String(meta.width)],['property','og:image:height',String(meta.height)]);
 if(meta.image.endsWith('.jpg'))values.push(['property','og:image:type','image/jpeg']);
 values.forEach(([attribute,key,value])=>{const element=document.createElement('meta');element.setAttribute(attribute,key);element.content=value;document.head.append(element);});
 return ()=>{document.head.querySelectorAll(selector).forEach(node=>node.remove());previous.forEach(node=>document.head.append(node));};
}

export function useShareMetadata(slug:string,lang:ShareLanguage) {
 useEffect(()=>{const meta=codedInvitationMetadata(slug,lang,window.location.origin);if(meta)return applyDocumentMetadata(meta);},[slug,lang]);
}
