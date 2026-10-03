import { useEffect, useState } from 'react';
export const LIVE_URL='https://lelyan-and-rama-invitation-production.up.railway.app/';
export const rsvpVideo=import.meta.env.VITE_RSVP_VIDEO_URL || '';
export const portfolioNamesApproved=import.meta.env.VITE_PORTFOLIO_NAMES_APPROVED!=='false';
export type Contact={whatsapp:string;instagram:string;email:string};
export function useContact(){
 const [contact,setContact]=useState<Contact>({whatsapp:import.meta.env.VITE_WHATSAPP_NUMBER||'',instagram:import.meta.env.VITE_INSTAGRAM_URL||'',email:import.meta.env.VITE_BUSINESS_EMAIL||''});
 useEffect(()=>{const controller=new AbortController();fetch('/api/public/config',{signal:controller.signal}).then(r=>r.ok?r.json():null).then(data=>{if(data?.contact)setContact(c=>({whatsapp:data.contact.whatsapp||c.whatsapp,instagram:data.contact.instagram||c.instagram,email:data.contact.email||c.email}));}).catch(()=>{});return()=>controller.abort();},[]);return contact;
}
export function safeUrl(value:string){try{const u=new URL(value);return u.protocol==='https:'||u.protocol==='http:'?u.href:'';}catch{return '';}}
