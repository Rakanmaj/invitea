import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import type {IncomingMessage,ServerResponse} from 'node:http';
import {codedInvitationMetadata,injectShareMetadata,invitationRoute,publishedInvitationMetadata} from '../src/share/metadata.js';

let template:Promise<string>|undefined;
type Request=IncomingMessage&{query?:Record<string,string|string[]>};
export default async function handler(req:Request,res:ServerResponse) {
 if(!['GET','HEAD'].includes(req.method||'GET')){res.statusCode=405;res.setHeader('Allow','GET, HEAD');res.end();return;}
 const incoming=new URL(req.url||'/','https://invitea.invalid');
 const path=req.query?.__path||incoming.searchParams.get('__path')||incoming.pathname;
 const route=typeof path==='string'?invitationRoute(path,typeof req.query?.lang==='string'?req.query.lang:incoming.searchParams.get('lang')||undefined):null;
 if(!route){res.statusCode=404;res.end('Invitation not found');return;}
 res.setHeader('Content-Type','text/html; charset=utf-8');
 res.setHeader('Cache-Control','no-store');
 res.setHeader('X-Robots-Tag','noindex, nofollow');
 try {
  const configured=process.env.SITE_URL||process.env.VITE_SITE_URL;
  const host=String(req.headers['x-forwarded-host']||req.headers.host||'').split(',')[0].trim();
  const origin=new URL(configured||`https://${host}`).origin;
  let meta=codedInvitationMetadata(route.slug,route.lang,origin);
  if(!meta) {
   if(!/^\/invite\//.test(String(path))){res.statusCode=404;res.end('Invitation not found');return;}
   const backend=process.env.RAILWAY_API_URL;
   if(!backend){res.statusCode=503;res.end('<!doctype html><html><title>Invitation unavailable</title><p>The invitation is temporarily unavailable.</p></html>');return;}
   const backendUrl=new URL(backend);
   if(backendUrl.protocol!=='https:'||backendUrl.username||backendUrl.password||backendUrl.pathname!=='/')throw new Error('Invalid backend origin');
   // Only the published public endpoint is used. Draft/preview and dashboard data are never read.
   const response=await fetch(new URL(`/api/invitations/${encodeURIComponent(route.slug)}`,backendUrl),{signal:AbortSignal.timeout(8000),redirect:'error'});
   if(!response.ok){res.statusCode=[404,410].includes(response.status)?404:503;res.end('<!doctype html><html><title>Invitation unavailable</title><p>This invitation is unavailable.</p></html>');return;}
   const data=await response.json();
   if(!data.invitation||data.invitation.status!=='published'){res.statusCode=404;res.end('Invitation unavailable');return;}
   meta=publishedInvitationMetadata(data.invitation,route.slug,route.lang,origin);
  }
  template??=readFile(resolve(process.cwd(),'dist/index.html'),'utf8').catch(error=>{template=undefined;throw error;});
  const html=injectShareMetadata(await template,meta);
  res.statusCode=200;res.end(req.method==='HEAD'?undefined:html);
 } catch {res.statusCode=503;res.end('<!doctype html><html><title>Invitation unavailable</title><p>Please try again shortly.</p></html>');}
}
