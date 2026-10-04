import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import type {Plugin} from 'vite';
import {codedInvitationMetadata,injectShareMetadata,invitationRoute} from './src/share/metadata';

// Serve the same crawler-readable invitation head locally as the Vercel function.
const invitationHeads:Plugin={
 name:'invitation-share-heads',
 configureServer(server){
  server.middlewares.use(async(req,res,next)=>{
   const url=new URL(req.url||'/','http://127.0.0.1:5173');
   const route=invitationRoute(url.pathname,url.searchParams.get('lang')||undefined);
   const meta=route?codedInvitationMetadata(route.slug,route.lang,`http://${req.headers.host||'127.0.0.1:5173'}`):null;
   if(!meta||!['GET','HEAD'].includes(req.method||'GET'))return next();
   try{
    const html=injectShareMetadata(await readFile(resolve(server.config.root,'index.html'),'utf8'),meta);
    res.setHeader('Content-Type','text/html; charset=utf-8');res.setHeader('Cache-Control','no-store');
    res.end(req.method==='HEAD'?undefined:await server.transformIndexHtml(url.pathname,html,req.url));
   }catch(error){next(error);}
  });
 },
 configurePreviewServer(server){
  server.middlewares.use(async(req,res,next)=>{
   const url=new URL(req.url||'/','http://127.0.0.1:4173');
   const route=invitationRoute(url.pathname,url.searchParams.get('lang')||undefined);
   const meta=route?codedInvitationMetadata(route.slug,route.lang,`http://${req.headers.host||'127.0.0.1:4173'}`):null;
   if(!meta||!['GET','HEAD'].includes(req.method||'GET'))return next();
   try{
    const html=injectShareMetadata(await readFile(resolve(server.config.root,server.config.build.outDir,'index.html'),'utf8'),meta);
    res.setHeader('Content-Type','text/html; charset=utf-8');res.end(req.method==='HEAD'?undefined:html);
   }catch(error){next(error);}
  });
 }
};
export default defineConfig({ plugins: [react(),invitationHeads], server: { port: 5173, strictPort: true, proxy: { '/api': 'http://127.0.0.1:3001' } }, build: { chunkSizeWarningLimit: 600 } });
