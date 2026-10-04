import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import type {Plugin} from 'vite';
import {codedInvitationMetadata,injectShareMetadata,invitationRoute,invitationShares} from './src/share/metadata';

function publicShareOrigin(env:Record<string,string>) {
 const value=(name:string)=>process.env[name]||env[name];
 const configured=value('SITE_URL')||value('VITE_SITE_URL');
 const domain=value('RAILWAY_PUBLIC_DOMAIN')||value('VERCEL_PROJECT_PRODUCTION_URL')||value('VERCEL_URL');
 const url=new URL(configured||(domain?`https://${domain}`:'http://127.0.0.1:4173'));
 if(!['http:','https:'].includes(url.protocol)||url.username||url.password)throw new Error('Invitation sharing requires a public HTTP(S) origin.');
 return url.origin;
}

// Static hosts must send invitation metadata without executing React or Vercel functions.
function invitationHeads(origin:string):Plugin {
 let outputDirectory='';
 return {
 name:'invitation-share-heads',
 configResolved(config){outputDirectory=resolve(config.root,config.build.outDir);},
 async writeBundle(){
  const html=await readFile(resolve(outputDirectory,'index.html'),'utf8');
  const paths=Object.keys(invitationShares).flatMap(slug=>[
   `/en/invitations/${slug}`,`/ar/invitations/${slug}`,`/invite/${slug}`
  ]).concat('/en/templates/lumiere','/ar/templates/lumiere');
  await Promise.all(paths.map(async path=>{
   const route=invitationRoute(path);
   const meta=route?codedInvitationMetadata(route.slug,route.lang,origin):null;
   if(!meta)throw new Error(`Missing invitation sharing metadata: ${path}`);
   const directory=resolve(outputDirectory,`.${path}`);
   await mkdir(directory,{recursive:true});
   await writeFile(resolve(directory,'index.html'),injectShareMetadata(html,meta));
  }));
 },
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
}
export default defineConfig(({mode})=>({
 plugins:[react(),invitationHeads(publicShareOrigin(loadEnv(mode,process.cwd(),['VITE_','SITE_','RAILWAY_','VERCEL_'])))],
 server:{port:5173,strictPort:true,proxy:{'/api':'http://127.0.0.1:3001'}},
 build:{chunkSizeWarningLimit:600}
}));
