// Same-origin transport only. All authentication, uploads, Drive access and database logic run on Railway.
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 const configured=process.env.RAILWAY_API_URL;
 if(!configured){res.status(503).json({error:{code:'BACKEND_NOT_CONFIGURED',message:'The studio connection is not configured yet.'}});return;}
 let origin;try{origin=new URL(configured);if(origin.protocol!=='https:'||origin.username||origin.password||origin.pathname!=='/')throw new Error();}catch{res.status(503).json({error:{message:'The studio connection is not configured correctly.'}});return;}
 const incoming=new URL(req.url,'https://invitea.invalid');
 if(!incoming.pathname.startsWith('/api/')){res.status(404).end();return;}
 // The rewrite supplies the original API path, regardless of whether the runtime preserves req.url.
 const routed=req.query?.__api_path??incoming.searchParams.get('__api_path');
 const path=routed===undefined||routed===null?incoming.pathname.slice(5):routed;
 if(typeof path!=='string'||! /^[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*$/.test(path)||path==='proxy'){res.status(404).end();return;}
 incoming.searchParams.delete('__api_path');
 const target=new URL('/api/'+path+incoming.search,origin);
 const headers={};
 for(const name of ['content-type','accept','cookie','origin','x-csrf-token','sec-fetch-site'])if(typeof req.headers[name]==='string')headers[name]=req.headers[name];
 try{
  let body;
  if(!['GET','HEAD'].includes(req.method)){
   if(req.body!==undefined)body=typeof req.body==='string'||Buffer.isBuffer(req.body)?req.body:JSON.stringify(req.body);
   else{const parts=[];let length=0;for await(const part of req){length+=part.length;if(length>4_000_000){res.status(413).json({error:{message:'Please choose a smaller photo.'}});return;}parts.push(part);}body=Buffer.concat(parts);}
  }
  if(body&&Buffer.byteLength(body)>4_000_000){res.status(413).json({error:{message:'Please choose a smaller photo.'}});return;}
  const response=await fetch(target,{method:req.method,headers,body,redirect:'manual',signal:AbortSignal.timeout(27000)});
  if(response.status>=300&&response.status<400){res.status(502).json({error:{message:'The studio connection needs attention.'}});return;}
  for(const name of ['content-type','content-disposition','retry-after','x-robots-tag']){const value=response.headers.get(name);if(value)res.setHeader(name,value);}
  const cookies=response.headers.getSetCookie();if(cookies.length)res.setHeader('Set-Cookie',cookies);
  res.status(response.status).send(Buffer.from(await response.arrayBuffer()));
 }catch{res.status(503).json({error:{code:'BACKEND_UNAVAILABLE',message:'The studio is temporarily unavailable. Please try again shortly.'}});}
}
