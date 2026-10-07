import {useEffect,useRef,useState,type RefObject} from 'react';
import type {MotionValue} from 'motion/react';
import type * as THREEType from 'three';

type Props={progress:MotionValue<number>;enabled:boolean;panels:RefObject<(HTMLDivElement|null)[]>;onStatusChange:(status:'loading'|'ready'|'unavailable')=>void};
const smooth=(x:number)=>{const n=Math.max(0,Math.min(1,x));return n*n*(3-2*n);};
/** Real dolly travel and camera turns through four modeled rooms. */
export default function BassamLanaScene({progress,enabled,panels,onStatusChange}:Props){
 const mount=useRef<HTMLDivElement>(null),[ready,setReady]=useState(false);
 useEffect(()=>{
  if(!enabled||!mount.current)return;const host=mount.current;
  let cancelled=false,cleanup:undefined|(()=>void);
  void Promise.all([import('./bassamLanaWorld'),import('three/examples/jsm/environments/RoomEnvironment.js'),import('three/examples/jsm/objects/Reflector.js'),import('three/examples/jsm/postprocessing/EffectComposer.js'),import('three/examples/jsm/postprocessing/RenderPass.js'),import('three/examples/jsm/postprocessing/UnrealBloomPass.js'),import('three/examples/jsm/postprocessing/OutputPass.js')]).then(([{THREE,buildWeddingSalon},{RoomEnvironment},{Reflector},{EffectComposer},{RenderPass},{UnrealBloomPass},{OutputPass}])=>{
   if(cancelled)return;
   let renderer:THREEType.WebGLRenderer;
   try{renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'low-power'});}catch{onStatusChange('unavailable');return;}
   renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;
   renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;
   host.appendChild(renderer.domElement);
   const world=buildWeddingSalon(),{scene}=world,camera=new THREE.PerspectiveCamera(57,1,.08,120);
   const pmrem=new THREE.PMREMGenerator(renderer),environment=new RoomEnvironment(),env=pmrem.fromScene(environment,.045);scene.environment=env.texture;scene.environmentIntensity=.55;environment.dispose();pmrem.dispose();
   function stoneMapping(material:THREEType.MeshStandardMaterial,scale:number){
    material.onBeforeCompile=shader=>{
     shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vSalonPosition; varying vec3 vSalonNormal;').replace('#include <begin_vertex>','#include <begin_vertex>\nvSalonPosition=(modelMatrix*vec4(transformed,1.0)).xyz; vSalonNormal=normalize(mat3(modelMatrix)*normal);');
     shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vSalonPosition; varying vec3 vSalonNormal;').replace('#include <map_fragment>',`#ifdef USE_MAP\nvec3 weight=pow(abs(normalize(vSalonNormal)),vec3(4.0));weight/=max(weight.x+weight.y+weight.z,0.001);vec4 stoneSample=texture2D(map,vSalonPosition.yz*${scale})*weight.x+texture2D(map,vSalonPosition.xz*${scale})*weight.y+texture2D(map,vSalonPosition.xy*${scale})*weight.z;diffuseColor*=stoneSample;\n#endif`);
    };material.customProgramCacheKey=()=>`salon-stone-${scale}`;
   }
   const loader=new THREE.TextureLoader(),textures:THREEType.Texture[]=[];
   function materialTexture(file:string,material:THREEType.MeshStandardMaterial,scale:number){
    const texture=loader.load(`/invitations/bassam-lana/${file}.webp`,()=>{if(cancelled){texture.dispose();return;}texture.colorSpace=THREE.SRGBColorSpace;texture.wrapS=texture.wrapT=THREE.RepeatWrapping;material.map=texture;stoneMapping(material,scale);material.needsUpdate=true;},undefined,()=>{});textures.push(texture);
   }
   materialTexture('limestone',world.stone,.22);materialTexture('marble',world.marble,.28);
   // Generated relief artwork stays on real geometry as the camera travels past it.
   for(const [index,file] of ['ceremony-wall','salon-wall','salon-wall','evening-wall'].entries()){
    const texture=loader.load(`/invitations/bassam-lana/${file}.webp`,()=>{
     if(cancelled){texture.dispose();return;}
     texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
     const material=world.frameMaterials[index];material.color.set('#ffffff');material.map=texture;material.needsUpdate=true;
    },undefined,()=>{});textures.push(texture);
   }
   // Alpha-cut botanical art adds photographic petal detail to spatial arrangements.
   const floralMaterial=new THREE.MeshStandardMaterial({roughness:.85,alphaTest:.28,side:THREE.DoubleSide,color:'#fff9ec'}),floralGeometry=new THREE.PlaneGeometry(1,1),florals=new THREE.Group();florals.visible=false;scene.add(florals);
   function floralArrangement(x:number,y:number,z:number,w:number,h:number,rotation=0){
    const group=new THREE.Group();group.position.set(x,y,z);group.rotation.y=rotation;florals.add(group);
    for(const angle of [0,Math.PI/3,-Math.PI/3]){const plane=new THREE.Mesh(floralGeometry,floralMaterial);plane.scale.set(w,h,1);plane.rotation.y=angle;plane.castShadow=true;plane.receiveShadow=true;group.add(plane);}
   }
   for(const side of [-1,1]){floralArrangement(side*3.9,2.05,7.6,2.2,3.3);floralArrangement(side*3.35,2.15,-47,2.35,3.5);}
   floralArrangement(5.2,1.8,-19.3,2,3,-Math.PI/2);
   for(const [x,z] of [[-3.9,-35],[3.9,-35],[-3.9,-42],[3.9,-42]])floralArrangement(x,1.9,z,.83,1.25);
   const floralTexture=loader.load('/invitations/bassam-lana/florals.webp',texture=>{if(cancelled){texture.dispose();return;}texture.colorSpace=THREE.SRGBColorSpace;floralMaterial.map=texture;floralMaterial.needsUpdate=true;florals.visible=true;},undefined,()=>{});textures.push(floralTexture);
   const mirror=new Reflector(new THREE.PlaneGeometry(12.8,81),{color:0x705b43,clipBias:.004,textureWidth:768,textureHeight:768});mirror.rotation.x=-Math.PI/2;mirror.position.set(0,.028,-9);const mirrorMaterial=mirror.material as THREEType.ShaderMaterial;mirrorMaterial.transparent=true;mirrorMaterial.depthWrite=false;mirrorMaterial.fragmentShader=mirrorMaterial.fragmentShader.replace('1.0 );','0.13 );');scene.add(mirror);
   const composer=new EffectComposer(renderer),bloom=new UnrealBloomPass(new THREE.Vector2(1,1),.12,.3,2.2);composer.addPass(new RenderPass(scene,camera));composer.addPass(bloom);composer.addPass(new OutputPass());
   let width=1,height=1,frame=0,last=0,inView=true;
   // Start inside the salon; there is no separate entrance or timed camera lead-in.
   world.doors[0].rotation.y=-Math.PI*.52;world.doors[1].rotation.y=Math.PI*.52;
   const pointer={x:0,y:0},look=new THREE.Vector3(),position=new THREE.Vector3();
   // The holds are places in one connected interior, not image changes.
   const stops=[
    {p:0,position:[0,2.8,20.7],look:[0,3.8,8.4]},
    {p:.19,position:[0,2.8,20.7],look:[0,3.8,8.4]},
    {p:.24,position:[4.85,2.65,9],look:[0,3.3,-5]},
    {p:.28,position:[3.1,2.65,-3],look:[-2,3.3,-9]},
    {p:.32,position:[3.2,2.7,-9],look:[-6.12,3.65,-9]},
    {p:.425,position:[3.2,2.7,-9],look:[-6.12,3.65,-9]},
    {p:.48,position:[-1,2.7,-16],look:[1.5,3.2,-27]},
    {p:.54,position:[-3.3,2.8,-23],look:[6.12,3.7,-23]},
    {p:.69,position:[-3.3,2.8,-23],look:[6.12,3.7,-23]},
    {p:.755,position:[0,2.65,-32],look:[0,3.3,-46]},
    {p:.83,position:[0,2.8,-36],look:[0,3.65,-47]},
    {p:1,position:[0,2.8,-36],look:[0,3.65,-47]}
   ];
   const points=stops.map(s=>new THREE.Vector3(...s.position as [number,number,number])),targets=stops.map(s=>new THREE.Vector3(...s.look as [number,number,number]));
   const projected=new THREE.Vector3(),corners=[new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3()];
   // Measured safe areas inside each generated ornament, not the full panel edges.
   const letteringAreas=[
    {width:.70,height:.68,y:-.03,layoutHeight:500},
    {width:.66,height:.66,y:-.045,layoutHeight:500},
    {width:.66,height:.69,y:-.045,layoutHeight:580},
    {width:.64,height:.72,y:0,layoutHeight:530}
   ];
   function fitLettering(){
    panels.current.forEach(el=>{
     const copy=el?.querySelector<HTMLElement>('.bl-letter-copy');if(!el||!copy)return;
     const fit=Math.min(1,(el.clientHeight-16)/Math.max(1,copy.offsetHeight));
     el.style.setProperty('--bl-copy-fit',String(fit));
    });
   }
   const textResize=new ResizeObserver(fitLettering);
   panels.current.forEach(el=>{if(el){textResize.observe(el);const copy=el.querySelector('.bl-letter-copy');if(copy)textResize.observe(copy);}});
   function projectLettering(){
    world.frames.forEach((f,index)=>{
     const el=panels.current[index];if(!el)return;
     const area=letteringAreas[index],w=el.offsetWidth,h=el.offsetHeight,worldWidth=f.width*area.width*world.frameGroups[index].scale.x,worldHeight=f.height*area.height;
     const matrix=new THREE.Matrix4().makeRotationY(f.rotation);matrix.setPosition(new THREE.Vector3(f.position[0],f.position[1]+f.height*area.y,f.position[2]));
     const local=[[-worldWidth/2,worldHeight/2,.095],[worldWidth/2,worldHeight/2,.095],[worldWidth/2,-worldHeight/2,.095],[-worldWidth/2,-worldHeight/2,.095]];
     const pts=local.map((p,i)=>{corners[i].set(p[0],p[1],p[2]).applyMatrix4(matrix).project(camera);return {x:(corners[i].x+1)*width/2,y:(1-corners[i].y)*height/2};});
     projected.set(f.position[0],f.position[1],f.position[2]).project(camera);
     if(projected.z>1||projected.z< -1){el.style.visibility='hidden';return;}el.style.visibility='visible';
     // Projective transform maps the live HTML lettering onto the physical plaque.
     const [a,b,c,d]=pts,dx1=b.x-c.x,dx2=d.x-c.x,dx3=a.x-b.x+c.x-d.x,dy1=b.y-c.y,dy2=d.y-c.y,dy3=a.y-b.y+c.y-d.y;
     const denominator=dx1*dy2-dx2*dy1;
     if(Math.abs(denominator)<.001) return;
     const g=(dx3*dy2-dx2*dy3)/denominator,k=(dx1*dy3-dx3*dy1)/denominator;
     const m11=(b.x-a.x+g*b.x)/w,m12=(b.y-a.y+g*b.y)/w,m21=(d.x-a.x+k*d.x)/h,m22=(d.y-a.y+k*d.y)/h;
     el.style.transform=`matrix3d(${m11},${m12},0,${g/w},${m21},${m22},0,${k/h},0,0,1,0,${a.x},${a.y},0,1)`;
    });
   }
   const resize=()=>{
    width=host.clientWidth;height=host.clientHeight;if(!width||!height)return;renderer.setSize(width,height);camera.aspect=width/height;camera.fov=width<700?68:57;camera.updateProjectionMatrix();
    composer.setSize(width,height);mirror.visible=width>=700;world.key.shadow.mapSize.set(width<700?512:1024,width<700?512:1024);
    const portrait=width/height<.8,frameWidthScale=portrait?.68:1;world.frameGroups.forEach(group=>{group.scale.x=frameWidthScale;});
    world.frames.forEach((f,index)=>{
     const el=panels.current[index],area=letteringAreas[index];if(!el)return;
     el.style.height=`${area.layoutHeight}px`;
     el.style.width=`${area.layoutHeight*(f.width*frameWidthScale*area.width)/(f.height*area.height)}px`;
    });fitLettering();
    const placements=[0,0,-1,-1,1,1,-1,2,2,-1,3,3];
    stops.forEach((stop,i)=>{
     points[i].fromArray(stop.position);if(placements[i]<0)return;
     const f=world.frames[placements[i]],distance=Math.max(f.height/(portrait?.73:.6),f.width*frameWidthScale/(camera.aspect*(portrait?.94:.86)))/(2*Math.tan(THREE.MathUtils.degToRad(camera.fov/2)));
     points[i].sub(targets[i]).normalize().multiplyScalar(distance).add(targets[i]);
    });
   };
   const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);resize();
   const observer=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;if(inView&&!document.hidden)start();else stop();});observer.observe(host);
   const move=(event:PointerEvent)=>{if(event.pointerType!=='mouse')return;const rect=host.getBoundingClientRect();pointer.x=(event.clientX-rect.left)/rect.width-.5;pointer.y=(event.clientY-rect.top)/rect.height-.5;};host.parentElement?.addEventListener('pointermove',move,{passive:true});
   function render(now:number){
    frame=requestAnimationFrame(render);if(now-last<32)return;last=now;
    const p=progress.get();
    let index=0;while(index<stops.length-2&&p>stops[index+1].p)index++;
    const a=stops[index],b=stops[index+1],t=smooth((p-a.p)/(b.p-a.p));
    position.lerpVectors(points[index],points[index+1],t);look.lerpVectors(targets[index],targets[index+1],t);
    camera.position.copy(position);camera.position.x+=pointer.x*.075;camera.position.y+=pointer.y*.035;
    camera.lookAt(look);camera.updateMatrixWorld();
    const night=smooth((p-.71)/.2);world.ambient.intensity=.95-night*.63;world.key.intensity=2.3-night*1.7;scene.environmentIntensity=.55-night*.32;
    world.key.position.set(camera.position.x-5,12,camera.position.z+7);world.key.target.position.set(camera.position.x,0,camera.position.z-8);world.key.target.updateMatrixWorld();
    world.lights.forEach((light,i)=>{light.intensity=29+night*12+Math.sin(now*.001+i)*1.3;});world.accent.intensity=16-night*7;
    composer.render();projectLettering();
    if(!host.parentElement?.classList.contains('bl-room-ready')){host.parentElement?.classList.add('bl-room-ready');setReady(true);onStatusChange('ready');}
   }
   function start(){if(!frame)frame=requestAnimationFrame(render);}function stop(){cancelAnimationFrame(frame);frame=0;}
   const visibility=()=>{if(document.hidden)stop();else if(inView)start();};document.addEventListener('visibilitychange',visibility);start();
   const contextLost=(e:Event)=>{e.preventDefault();stop();setReady(false);onStatusChange('unavailable');host.parentElement?.classList.remove('bl-room-ready');panels.current.forEach(el=>{if(el){el.style.transform='';el.style.visibility='';el.style.width='';el.style.height='';el.style.removeProperty('--bl-copy-fit');}});};renderer.domElement.addEventListener('webglcontextlost',contextLost);
   cleanup=()=>{stop();resizeObserver.disconnect();textResize.disconnect();observer.disconnect();document.removeEventListener('visibilitychange',visibility);host.parentElement?.removeEventListener('pointermove',move);renderer.domElement.removeEventListener('webglcontextlost',contextLost);composer.passes.forEach(pass=>pass.dispose());composer.dispose();mirror.dispose();world.dispose();floralMaterial.dispose();textures.forEach(texture=>texture.dispose());env.dispose();renderer.dispose();renderer.domElement.remove();host.parentElement?.classList.remove('bl-room-ready');panels.current.forEach(el=>{if(el){el.style.transform='';el.style.visibility='';el.style.width='';el.style.height='';el.style.removeProperty('--bl-copy-fit');}});};
  }).catch(()=>{if(!cancelled){setReady(false);onStatusChange('unavailable');}});
  return()=>{cancelled=true;cleanup?.();};
 },[progress,enabled,panels,onStatusChange]);
 return <div ref={mount} className={`bl-world ${ready?'is-ready':''}`} aria-hidden="true"/>;
}
