import {useCallback,useEffect,useState} from 'react';
import {ArrowUpRight,Camera,Download,RefreshCw,LockKeyhole} from 'lucide-react';
import '../admin/admin.css';
export type PhotoCollection={configured:boolean;enabled?:boolean;totalPhotos:number;contributingGuests:number;expiresAt?:string|null;photos:{id:string;fileName:string;uploadedAt:string}[];hasMore:boolean;driveUrl?:string};
export default function GuestPhotoPanel({invitationId,access='client'}:{invitationId:string;access?:'admin'|'client'}){
 const [collection,setCollection]=useState<PhotoCollection|null>(null),[error,setError]=useState(''),[open,setOpen]=useState(false),[page,setPage]=useState(1),[busy,setBusy]=useState(false);
 const base='/api/'+access+'/invitations/'+encodeURIComponent(invitationId)+'/guest-photos';
 const load=useCallback(async(p=1,append=false,signal?:AbortSignal)=>{
  setBusy(true);setError('');
  try{const response=await fetch(base+'?page='+p,{credentials:'same-origin',cache:'no-store',signal});if(!response.ok)throw new Error('The private collection could not be loaded. Please sign in again or try shortly.');const data:PhotoCollection=await response.json();if(!signal?.aborted){setCollection(old=>append&&old?{...data,photos:[...old.photos,...data.photos]}:data);setPage(p);}}
  catch(e){if(!signal?.aborted)setError(e instanceof Error?e.message:'Could not load photos.');}finally{if(!signal?.aborted)setBusy(false);}
 },[base]);
 useEffect(()=>{setCollection(null);setOpen(false);const controller=new AbortController();void load(1,false,controller.signal);return()=>controller.abort();},[load]);
 return <section className="admin-panel photo-owner-panel"><div className="admin-list-heading"><div><span className="admin-eyebrow"><Camera size={14}/> GUEST PHOTOS</span><h2>Your celebration, through their eyes.</h2></div><button className="admin-text-link" aria-label="Refresh guest photos" disabled={busy} onClick={()=>void load()}><RefreshCw size={16}/></button></div>
  {error?<p role="alert">{error}</p>:!collection?<p role="status">Opening your private collection…</p>:!collection.configured?<p>Guest Photo Collection has not been added to this invitation.</p>:<>
   <div className="admin-stats"><div><span>{collection.totalPhotos}</span><p>Total photos</p></div><div><span>{collection.contributingGuests}</span><p>Contributing guests</p></div><div><span className="photo-expiry">{collection.expiresAt?new Intl.DateTimeFormat('en-GB',{dateStyle:'medium',timeZone:'Asia/Amman'}).format(new Date(collection.expiresAt)):'—'}</span><p>Guest uploads close</p></div></div>
   <p className="admin-footnote"><LockKeyhole size={13}/> Private to this invitation. {collection.enabled?'Uploads close four days after the event unless your studio agreed another collection period.':'Guest uploads are currently disabled.'} Your saved photos remain private until the studio manually removes the Drive folder.</p>
   <div className="photo-owner-actions"><button className="admin-button admin-button-outline" onClick={()=>setOpen(!open)}>{open?'Close collection':'Open / download collection'} <Camera size={16}/></button>{access==='admin'&&collection.driveUrl&&<a className="admin-text-link" href={collection.driveUrl} target="_blank" rel="noopener noreferrer">Open Drive <ArrowUpRight size={16}/></a>}</div>
   {open&&<div>{collection.photos.length?<div className="photo-owner-grid">{collection.photos.map(photo=><figure key={photo.id}><img src={base+'/'+photo.id+'/file'} alt="Private guest photograph" loading="lazy"/><figcaption><span>{photo.fileName}</span><a href={base+'/'+photo.id+'/file?download=1'} download aria-label={'Download '+photo.fileName}><Download size={16}/></a></figcaption></figure>)}</div>:<p>No photos have been shared yet.</p>}{collection.hasMore&&<button className="admin-text-link" disabled={busy} onClick={()=>void load(page+1,true)}>{busy?'Loading…':'More photos'}</button>}</div>}
  </>}
 </section>;
}
