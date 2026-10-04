import invitations from '../../public/social/invitations.json' with {type:'json'};

export type ShareLanguage = 'en' | 'ar';
type Localized = {en:string;ar:string};
export type InvitationShare = {title:Localized;description:Localized;image:string;imageAlt:Localized;width:number;height:number;defaultLanguage:string;externalUrl?:string};
export type ShareMetadata = {title:string;description:string;image:string;imageAlt:string;url:string;lang:ShareLanguage;width?:number;height?:number};
export const invitationShares:Record<string,InvitationShare> = invitations;
export const escapeHtml = (value:string) => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');

export function invitationRoute(path:string,language?:string) {
 const clean=path.replace(/\/+$/,'');
 const localized=/^\/(en|ar)\/invitations\/([a-z0-9]+(?:-[a-z0-9]+)*)$/.exec(clean);
 const alias=/^\/invite\/([a-z0-9]+(?:-[a-z0-9]+)*)$/.exec(clean);
 const legacy=/^\/(en|ar)\/templates\/lumiere$/.exec(clean);
 const slug=localized?.[2]||alias?.[1]||(legacy?'omar-sara':'');
 if(!slug||slug.length>100)return null;
 const lang:ShareLanguage=localized?.[1]==='ar'||legacy?.[1]==='ar' ? 'ar' : localized||legacy ? 'en' : language==='ar'||language==='en' ? language : invitationShares[slug]?.defaultLanguage==='ar' ? 'ar' : 'en';
 return {slug,lang};
}

export function codedInvitationMetadata(slug:string,lang:ShareLanguage,origin:string):ShareMetadata|null {
 if(!Object.hasOwn(invitationShares,slug))return null;
 const item=invitationShares[slug];
 return {title:item.title[lang],description:item.description[lang],image:new URL(item.image,origin).href,imageAlt:item.imageAlt[lang],width:item.width,height:item.height,url:new URL(`/${lang}/invitations/${slug}`,origin).href,lang};
}

function text(value:unknown,lang:ShareLanguage):string {
 if(typeof value==='string')return value;
 if(value&&typeof value==='object') {
  const localized=value as Record<string,unknown>;
  return typeof localized[lang]==='string'?localized[lang] as string:typeof localized.en==='string'?localized.en:typeof localized.ar==='string'?localized.ar:'';
 }
 return '';
}
function publicImage(value:unknown,origin:string) {
 try {const url=new URL(typeof value==='string'&&value?value:'/brand/social.png',origin);if(['https:','http:'].includes(url.protocol)&&!url.username&&!url.password)return url.href;}catch { /* Use the studio image if the configured cover is invalid. */ }
 return new URL('/brand/social.png',origin).href;
}

/** Only call this with the public API's published invitation response. */
export function publishedInvitationMetadata(invitation:Record<string,unknown>,slug:string,preferred:ShareLanguage,origin:string):ShareMetadata {
 const lang:ShareLanguage=invitation.language==='ar'?'ar':invitation.language==='en'?'en':preferred;
 const content=(invitation.content&&typeof invitation.content==='object'?invitation.content:{}) as Record<string,unknown>;
 const translation=(content[lang]&&typeof content[lang]==='object'?content[lang]:{}) as Record<string,unknown>;
 const name=(text(translation.title||content.title||invitation.title,lang)||'Invitéa').slice(0,200);
 const wedding=String(invitation.eventType).toLowerCase()==='wedding';
 const title=lang==='ar'?`${wedding?'دعوة زفاف':'دعوة'} ${name}`:`${name} — ${wedding?'Wedding Invitation':'Invitation'}`;
 const description=(text(translation.description||content.description,lang)||(lang==='ar'?'بحضوركم تكتمل فرحتنا. افتحوا الدعوة للاطّلاع على الموعد والمكان وتفاصيل المناسبة.':'We would love to celebrate with you. Open the invitation for the date, venue and details.')).slice(0,600);
 const hero=Array.isArray(invitation.sections)?invitation.sections.find(section=>section&&typeof section==='object'&&section.type==='hero'&&section.enabled!==false):null;
 const heroContent=hero?.content&&typeof hero.content==='object'?hero.content:{};
 const cover=invitation.ogImage||heroContent.coverImage||heroContent.image||translation.coverImage||translation.image||content.coverImage||content.image;
 return {title,description,lang,image:publicImage(cover,origin),imageAlt:lang==='ar'?`صورة ${title}`:`Cover for ${title}`,url:new URL(`/invite/${slug}${invitation.language==='bilingual'?`?lang=${lang}`:''}`,origin).href};
}

export function shareTags(meta:ShareMetadata) {
 const tags=[['property','og:title',meta.title],['property','og:description',meta.description],['property','og:type','website'],['property','og:site_name','Invitéa'],['property','og:url',meta.url],['property','og:locale',meta.lang==='ar'?'ar_JO':'en_US'],['property','og:image',meta.image],['property','og:image:alt',meta.imageAlt],['name','twitter:card','summary_large_image'],['name','twitter:title',meta.title],['name','twitter:description',meta.description],['name','twitter:image',meta.image],['name','twitter:image:alt',meta.imageAlt]];
 if(meta.image.endsWith('.jpg'))tags.push(['property','og:image:type','image/jpeg']);
 if(meta.width&&meta.height)tags.push(['property','og:image:width',String(meta.width)],['property','og:image:height',String(meta.height)]);
 return `<title>${escapeHtml(meta.title)}</title><meta name="description" content="${escapeHtml(meta.description)}"><meta name="robots" content="noindex,nofollow"><link rel="canonical" href="${escapeHtml(meta.url)}">`+tags.map(([attribute,name,content])=>`<meta ${attribute}="${name}" content="${escapeHtml(content)}">`).join('');
}

export function injectShareMetadata(html:string,meta:ShareMetadata) {
 return html.replace(/<title>[\s\S]*?<\/title>/gi,'')
  .replace(/<meta\s[^>]*(?:name|property)=["'](?:description|robots|og:[^"']*|twitter:[^"']*)["'][^>]*>/gi,'')
  .replace(/<link\s[^>]*rel=["']canonical["'][^>]*>/gi,'')
  .replace(/<html\b[^>]*>/i,`<html lang="${meta.lang}" dir="${meta.lang==='ar'?'rtl':'ltr'}">`)
  .replace(/<\/head>/i,`${shareTags(meta)}</head>`);
}
