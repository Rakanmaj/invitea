import * as THREE from 'three';
import {mergeGeometries} from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import {RoundedBoxGeometry} from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

export {THREE};
export const ROOM_FRAMES = [
 {position:[0,3.8,8.4],rotation:0,width:5.5,height:5.9},
 {position:[-6.12,3.65,-9],rotation:Math.PI/2,width:6.2,height:5.4},
 {position:[6.12,3.7,-23],rotation:-Math.PI/2,width:6.4,height:5.9},
 {position:[0,3.65,-47],rotation:0,width:5.8,height:5.6}
] as const;

/** Original, modeled architecture and furnishings; no photograph is the room. */
export function buildWeddingSalon(stoneTexture?:THREE.Texture){
 const scene=new THREE.Scene();scene.background=new THREE.Color('#f0e2cc');
 scene.fog=new THREE.Fog('#d3bea0',36,95);
 const stone=new THREE.MeshStandardMaterial({color:'#e8dbc6',roughness:.8,...(stoneTexture?{map:stoneTexture}:{})});
 const pearl=new THREE.MeshStandardMaterial({color:'#f8efde',roughness:.67});
 const bronze=new THREE.MeshStandardMaterial({color:'#ac8a56',metalness:.82,roughness:.36});
 const darkBronze=new THREE.MeshStandardMaterial({color:'#72532c',metalness:.78,roughness:.36});
 const espresso=new THREE.MeshStandardMaterial({color:'#34281f',roughness:.5,metalness:.12});
 const marble=new THREE.MeshPhysicalMaterial({color:'#766253',roughness:.47,metalness:.04,clearcoat:.22,clearcoatRoughness:.5});
 const paper=new THREE.MeshStandardMaterial({color:'#f9f0dd',roughness:.94});
 const silk=new THREE.MeshStandardMaterial({color:'#efe3cf',roughness:.87,side:THREE.DoubleSide});
 const velvet=new THREE.MeshStandardMaterial({color:'#a89480',roughness:.97});
 const foliage=new THREE.MeshStandardMaterial({color:'#595142',roughness:.94});
 const petals=new THREE.MeshStandardMaterial({color:'#fff5e1',roughness:.82});
 const glass=new THREE.MeshPhysicalMaterial({color:'#ffefd2',metalness:.12,roughness:.08,transparent:true,opacity:.42,clearcoat:1});
 const flame=new THREE.MeshBasicMaterial({color:new THREE.Color('#ffd79f').multiplyScalar(2.8),toneMapped:false});
 const glow=new THREE.MeshBasicMaterial({color:'#ffc66f',transparent:true,opacity:.25,depthWrite:false});
 const primitives={box:new THREE.BoxGeometry(1,1,1),sphere:new THREE.SphereGeometry(1,10,7),cylinder:new THREE.CylinderGeometry(1,1,1,18),cone:new THREE.ConeGeometry(1,1,12)};
 const decorations=new THREE.Group();scene.add(decorations);
 const originals=new Set<THREE.BufferGeometry>(Object.values(primitives));
 function mesh(geometry:THREE.BufferGeometry,material:THREE.Material,position:number[],scale:number[]=[1,1,1],parent:THREE.Object3D=decorations,rotation:number[]=[0,0,0]){
  originals.add(geometry);const object=new THREE.Mesh(geometry,material);object.position.set(position[0],position[1],position[2]);object.scale.set(scale[0],scale[1],scale[2]);object.rotation.set(rotation[0],rotation[1],rotation[2]);object.castShadow=true;object.receiveShadow=true;parent.add(object);return object;
 }
 const box=(mat:THREE.Material,p:number[],s:number[],parent?:THREE.Object3D,r?:number[])=>mesh(primitives.box,mat,p,s,parent,r);
 const cushion=(p:number[],size:number[],parent:THREE.Object3D=decorations)=>mesh(new RoundedBoxGeometry(size[0],size[1],size[2],3,.085),velvet,p,[1,1,1],parent);
 const sphere=(mat:THREE.Material,p:number[],s:number[],parent?:THREE.Object3D)=>mesh(primitives.sphere,mat,p,s,parent);
 const cylinder=(mat:THREE.Material,p:number[],s:number[],parent?:THREE.Object3D,r?:number[])=>mesh(primitives.cylinder,mat,p,s,parent,r);
 function torus(radius:number,tube:number,mat:THREE.Material,p:number[],parent:THREE.Object3D=decorations,r:number[]=[0,0,0],arc=Math.PI*2){return mesh(new THREE.TorusGeometry(radius,tube,7,40,arc),mat,p,[1,1,1],parent,r);}
 function rod(a:number[],b:number[],radius:number,mat:THREE.Material,parent:THREE.Object3D=decorations){
  const start=new THREE.Vector3(...a as [number,number,number]),end=new THREE.Vector3(...b as [number,number,number]),delta=end.clone().sub(start);
  const object=cylinder(mat,start.clone().add(end).multiplyScalar(.5).toArray(),[radius,delta.length(),radius],parent);object.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());return object;
 }
 function arch(radius:number,border:number,bottom=0,spring=5){
  const shape=new THREE.Shape(),inner=radius-border;
  shape.moveTo(-radius,bottom);shape.lineTo(-radius,spring);shape.absarc(0,spring,radius,Math.PI,0,true);shape.lineTo(radius,bottom);
  shape.lineTo(inner,bottom);shape.lineTo(inner,spring);shape.absarc(0,spring,inner,0,Math.PI,false);shape.lineTo(-inner,bottom);shape.closePath();
  return new THREE.ExtrudeGeometry(shape,{depth:.4,bevelEnabled:true,bevelSize:.035,bevelThickness:.035,bevelSegments:1,curveSegments:36});
 }
 // A continuous, sixty-metre interior. Floor inlays make the camera's travel visible.
 box(marble,[0,-.12,-9],[13,.24,82]);box(pearl,[0,9.25,-9],[13,.25,82]);
 for(const side of [-1,1]){
  box(stone,[side*6.5,4.55,-9],[.55,9.1,82]);
  box(darkBronze,[side*6.17,.3,-9],[.12,.4,82]);
  box(bronze,[side*6.15,.58,-9],[.06,.04,82]);
  box(pearl,[side*6.08,8.5,-9],[.27,.18,82]);box(bronze,[side*6.06,8.35,-9],[.07,.05,82]);
  for(const z of [25,13,1,-17,-31,-47]){
   box(pearl,[side*6.08,4.6,z],[.3,8.2,.38]);box(bronze,[side*5.92,1,z],[.34,.14,.42]);box(bronze,[side*5.92,8.15,z],[.4,.18,.46]);
  }
  // Raised picture-frame moldings, with a dark edge and two fine bronze outlines.
  for(const z of [18,6,-6,-18,-30,-42]){
   for(const zz of [-3.7,3.7]){box(pearl,[side*6.16,4.2,z+zz],[.11,6.6,.085]);box(bronze,[side*6.09,4.2,z+zz+.09],[.035,6.6,.025]);}
   for(const y of [.9,7.5]){box(pearl,[side*6.16,y,z],[.11,.085,7.5]);box(bronze,[side*6.09,y+.08,z],[.035,.025,7.45]);}
  }
  for(const x of [1.52,1.59])box(bronze,[side*x,.016,-9],[.017,.012,82]);
 }
 // Coffered ceiling: visible above the doorway and during each camera turn.
 for(const z of [19,7,-5,-17,-29,-41])for(const x of [-3.35,0,3.35]){
  box(stone,[x,9.08,z],[2.8,.06,9.8]);
  for(const side of [-1,1]){box(pearl,[x+side*1.43,8.99,z],[.12,.11,10]);box(bronze,[x+side*1.34,8.96,z],[.025,.025,9.75]);box(pearl,[x,8.99,z+side*5],[2.96,.11,.12]);}
 }
 for(let z=29;z>=-49;z-=3){
  box(pearl,[0,.006,z],[3.03,.012,.023]);
  for(const side of [-1,1])box(bronze,[side*4,.01,z],[4.1,.014,.016]);
 }
 // Fluted columns and brass-lined portals are genuinely passed by the camera.
 function portal(z:number,radius=5.15){
  const parent=new THREE.Group();parent.position.z=z;decorations.add(parent);
  mesh(arch(radius,.24,0,3.8),stone,[0,0,0],[1,1,1],parent);
  mesh(arch(radius-.25,.035,0,3.8),bronze,[0,0,.45],[1,1,1],parent);
  for(const side of [-1,1]){
   cylinder(stone,[side*(radius-.04),2.1,.24],[.22,4.2,.22],parent);
   for(let n=0;n<12;n++){const angle=n*Math.PI/6;rod([side*(radius-.04)+Math.cos(angle)*.223,.25,.24+Math.sin(angle)*.223],[side*(radius-.04)+Math.cos(angle)*.223,3.95,.24+Math.sin(angle)*.223],.018,pearl,parent);}
   cylinder(bronze,[side*(radius-.04),.17,.24],[.34,.25,.34],parent);cylinder(bronze,[side*(radius-.04),4.1,.24],[.3,.22,.3],parent);
  }
 }
 for(const z of [25,13,-3,-17,-31,-45])portal(z,z===25?3.5:5.15);
 // Entrance leaves, with actual thickness, recessed panels and modeled brass hardware.
 const doors:THREE.Group[]=[];
 for(const side of [-1,1]){
  const hinge=new THREE.Group();hinge.position.set(side*3.17,0,25.25);hinge.userData.moving=true;scene.add(hinge);doors.push(hinge);
  const center=-side*1.58;
  box(darkBronze,[center,3.45,0],[3.13,6.9,.18],hinge);
  for(const y of [1.25,3.45,5.65]){
   box(espresso,[center,y,.1],[2.55,1.7,.035],hinge);
   for(const dx of [-1.3,1.3])box(bronze,[center+dx,y,.14],[.045,1.77,.055],hinge);
   for(const dy of [-.89,.89])box(bronze,[center,y+dy,.14],[2.64,.045,.055],hinge);
   torus(.5,.019,bronze,[center,y,.18],hinge);rod([center-.35,y-.35,.18],[center+.35,y+.35,.18],.014,bronze,hinge);rod([center+.35,y-.35,.18],[center-.35,y+.35,.18],.014,bronze,hinge);
  }
  cylinder(bronze,[-side*.13,3.1,.22],[.06,.8,.06],hinge);sphere(bronze,[-side*.13,3.1,.28],[.09,.15,.06],hinge);
 }
 // A center ceremony arch and pearl plaque. The lettering is projected onto this object.
 const frameGroups:THREE.Group[]=[];
 // Independent materials keep each generated wall skin local to its display.
 const frameMaterials=ROOM_FRAMES.map((_,index)=>new THREE.MeshStandardMaterial({color:index===3?'#34281f':'#f9f0dd',roughness:.88}));
 function displayFrame(index:number){
  const frame=ROOM_FRAMES[index],group=new THREE.Group();group.position.fromArray(frame.position);group.rotation.y=frame.rotation;scene.add(group);frameGroups.push(group);
  const w=frame.width,h=frame.height,mat=frameMaterials[index];
  if(index===0){
   const shape=new THREE.Shape(),radius=w/2+.3,spring=h/2-radius+.8;
   shape.moveTo(-radius,-h/2-.35);shape.lineTo(-radius,spring);shape.absarc(0,spring,radius,Math.PI,0,true);shape.lineTo(radius,-h/2-.35);shape.closePath();
   const geometry=new THREE.ExtrudeGeometry(shape,{depth:.16,bevelEnabled:true,bevelThickness:.025,bevelSize:.025,bevelSegments:2,curveSegments:40});
   // Extruded cap UVs use world units by default. Normalize them for one complete image.
   geometry.computeBoundingBox();const bounds=geometry.boundingBox!,positions=geometry.attributes.position,uv=geometry.attributes.uv;
   for(let i=0;i<positions.count;i++)uv.setXY(i,(positions.getX(i)-bounds.min.x)/(bounds.max.x-bounds.min.x),(positions.getY(i)-bounds.min.y)/(bounds.max.y-bounds.min.y));
   mesh(geometry,mat,[0,0,0],[1,1,1],group);
   mesh(arch(radius+.12,.045,-h/2-.35,spring),bronze,[0,0,.18],[1,1,1],group);
   for(const side of [-1,1])cylinder(stone,[side*(radius+.25),-1.1,-.1],[.21,4.1,.21],group);
  }else{
   box(mat,[0,0,0],[w,h,.14],group);
   for(const side of [-1,1]){box(bronze,[side*(w/2+.045),0,.06],[.085,h+.15,.09],group);box(bronze,[0,side*(h/2+.045),.06],[w+.17,.085,.09],group);}
   for(const side of [-1,1])box(darkBronze,[side*(w/2+.16),0,-.05],[.09,h+.5,.19],group);
  }
 }
 ROOM_FRAMES.forEach((_,index)=>displayFrame(index));
 function curtain(x:number,z:number,width:number,height:number){
  const geometry=new THREE.PlaneGeometry(width,height,32,10),positions=geometry.attributes.position;
  for(let i=0;i<positions.count;i++){const px=positions.getX(i),py=positions.getY(i);positions.setZ(i,Math.sin(px*14)*.11+Math.cos(py*.35)*.04);}
  geometry.computeVertexNormals();mesh(geometry,silk,[x,height/2,z]);
  box(bronze,[x,height+.09,z],[width+.2,.07,.1]);
 }
 curtain(-3.5,8.05,1.3,7.8);curtain(3.5,8.05,1.3,7.8);
 torus(3.15,.055,bronze,[0,4.3,8.15],decorations,[0,0,0],Math.PI);
 for(const side of [-1,1])rod([side*3.15,.2,8.15],[side*3.15,4.3,8.15],.055,bronze);
 // Chandeliers: curved bronze arms, individual crystal pendants and candle bulbs.
 const lights:THREE.PointLight[]=[];
 function chandelier(z:number,y=6.65,x=0,scale=1){
  const group=new THREE.Group();group.position.set(x,y,z);group.scale.setScalar(scale);decorations.add(group);
  rod([x,9.15,z],[x,y+.3*scale,z],.025,bronze);sphere(bronze,[0,.25,0],[.2,.3,.2],group);
  torus(1.05,.035,bronze,[0,-.08,0],group,[Math.PI/2,0,0]);torus(.56,.025,bronze,[0,.35,0],group,[Math.PI/2,0,0]);
  for(let i=0;i<10;i++){
   const angle=i*Math.PI/5,x=Math.cos(angle),v=Math.sin(angle);
   const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(0,.2,0),new THREE.Vector3(x*.5,-.22,v*.5),new THREE.Vector3(x*1.1,-.16,v*1.1),new THREE.Vector3(x*1.15,.11,v*1.15)]);
   mesh(new THREE.TubeGeometry(curve,14,.025,6,false),bronze,[0,0,0],[1,1,1],group);
   cylinder(pearl,[x*1.15,.3,v*1.15],[.055,.36,.055],group);sphere(flame,[x*1.15,.51,v*1.15],[.05,.1,.05],group);
   for(let j=0;j<3;j++){const a=angle+j*.065,drop=.25+j*.14;rod([Math.cos(a)*.98,-.1,Math.sin(a)*.98],[Math.cos(a)*.85,-drop-.13,Math.sin(a)*.85],.006,bronze,group);mesh(primitives.cone,glass,[Math.cos(a)*.85,-drop-.23,Math.sin(a)*.85],[.09,.24,.065],group,[0,0,Math.PI]);}
  }
  sphere(glass,[0,-.65,0],[.15,.32,.15],group);
  const light=new THREE.PointLight('#ffdeaa',38,20,2);light.position.set(x,y-.6*scale,z);scene.add(light);lights.push(light);
 }
 chandelier(11,5.6,-1.9,.65);chandelier(11,5.6,1.9,.65);for(const z of [-7,-22,-38])chandelier(z);
 // Soft wall lamps and physical candle sconces beside every scene.
 for(const z of [20,2,-12,-26,-40])for(const side of [-1,1]){
  const x=side*6.03;box(bronze,[x,4.1,z],[.1,.8,.22]);rod([x,4.15,z],[x-side*.34,4.15,z],.035,bronze);
  cylinder(pearl,[x-side*.37,4.42,z],[.055,.55,.055]);sphere(flame,[x-side*.37,4.74,z],[.065,.12,.065]);
  sphere(glow,[x-side*.39,4.74,z],[.2,.3,.2]);
 }
 function bouquet(x:number,y:number,z:number,size=1){
  cylinder(bronze,[x,y+.22*size,z],[.21*size,.44*size,.21*size]);
  for(let i=0;i<13;i++){
   const a=i*2.399,rad=.13+Math.sqrt(i/13)*.44,fx=x+Math.cos(a)*rad*size,fz=z+Math.sin(a)*rad*size,fy=y+(.8+Math.cos(i*1.7)*.17)*size;
   rod([x,y+.4*size,z],[fx,fy,fz],.014*size,foliage);sphere(petals,[fx,fy,fz],[.14*size,.12*size,.14*size]);
   for(let petal=0;petal<5;petal++){const angle=petal*Math.PI*2/5;sphere(petals,[fx+Math.cos(angle)*.095*size,fy+.025*size,fz+Math.sin(angle)*.095*size],[.1*size,.065*size,.1*size]);}
   sphere(foliage,[x+Math.cos(a)*.32*size,y+.56*size,z+Math.sin(a)*.32*size],[.22*size,.035*size,.085*size]);
  }
 }
 for(const side of [-1,1]){cylinder(stone,[side*3.9,.5,7.6],[.48,1,.48]);bouquet(side*3.9,1,7.6,1.3);}
 // Classic drawing-room furniture in the second room; modeled, never a flat photo.
 function chair(x:number,z:number,angle:number,parent:THREE.Object3D=decorations){
  const group=new THREE.Group();group.position.set(x,0,z);group.rotation.y=angle;parent.add(group);
  cushion([0,.62,0],[.62,.16,.62],group);cushion([0,1.03,-.29],[.63,.8,.14],group);
  torus(.32,.035,bronze,[0,1.33,-.28],group,[0,0,0],Math.PI);
  for(const sx of [-1,1])for(const sz of [-1,1])rod([sx*.25,.6,sz*.24],[sx*.3,.025,sz*.3],.028,bronze,group);
  for(const side of [-1,1])rod([side*.32,.6,-.28],[side*.32,1.34,-.28],.024,bronze,group);
 }
 const lounge=new THREE.Group();lounge.position.set(-4.3,0,-9);lounge.rotation.y=Math.PI/2;decorations.add(lounge);
 cushion([0,.7,0],[2.35,.32,.95],lounge);cushion([0,1.15,-.44],[2.42,1.05,.2],lounge);
 for(const side of [-1,1]){cushion([side*1.16,.94,0],[.18,.68,1],lounge);for(const sz of [-1,1])rod([side*1.02,.7,sz*.33],[side*1.08,.05,sz*.38],.045,bronze,lounge);sphere(silk,[side*.63,1.03,-.15],[.42,.26,.15],lounge);}
 for(let i=-3;i<=3;i++)sphere(darkBronze,[i*.29,1.21,-.328],[.024,.024,.009],lounge);
 cylinder(bronze,[0,.58,1.2],[.55,1.15,.55],lounge);cylinder(espresso,[0,1.2,1.2],[.9,.07,.58],lounge);bouquet(-3.1,1.25,-9,.65);
 chair(-4.1,-12,-Math.PI/6);chair(-4.1,-5,-Math.PI*5/6);
 // An inlaid drawing-room rug, editorial gold details and freestanding lamps.
 box(velvet,[-3.6,.025,-9],[4.35,.025,8.2]);
 for(const side of [-1,1]){box(bronze,[-3.6+side*2.03,.044,-9],[.023,.01,7.9]);box(bronze,[-3.6,.044,-9+side*3.94],[4.06,.01,.023]);}
 for(const z of [-13.5,-4.5]){cylinder(bronze,[-5.25,1.35,z],[.025,2.7,.025]);cylinder(bronze,[-5.25,.08,z],[.3,.12,.3]);mesh(new THREE.CylinderGeometry(.38,.55,.55,24,1,true),silk,[-5.25,2.8,z]);sphere(flame,[-5.25,2.65,z],[.06,.12,.06]);}
 // Paired bronze botanical panels opposite the lounge.
 for(const z of [-8,-11]){
  const panel=new THREE.Group();panel.position.set(6.12,4.3,z);panel.rotation.y=-Math.PI/2;decorations.add(panel);box(espresso,[0,0,0],[1.6,2.9,.1],panel);
  for(const side of [-1,1]){box(bronze,[side*.85,0,.08],[.05,3,.07],panel);box(bronze,[0,side*1.5,.08],[1.75,.05,.07],panel);}
  const stemCurve=new THREE.CatmullRomCurve3([new THREE.Vector3(-.3,-1.2,.1),new THREE.Vector3(0,-.2,.12),new THREE.Vector3(.18,.8,.12),new THREE.Vector3(.4,1.2,.1)]);mesh(new THREE.TubeGeometry(stemCurve,16,.012,6,false),bronze,[0,0,0],[1,1,1],panel);
  for(let i=0;i<6;i++){const side=i%2?-1:1,s=sphere(bronze,[side*.24,-.7+i*.3,.13],[.24,.055,.025],panel);s.rotation.z=side*.5;}
 }
 // Banquet tables with draped linen, porcelain, glasses, flowers and taper candles.
 function candle(x:number,y:number,z:number,height=.52){
  cylinder(bronze,[x,y+.07,z],[.12,.14,.12]);cylinder(bronze,[x,y+.28,z],[.022,.4,.022]);cylinder(bronze,[x,y+.5,z],[.09,.055,.09]);
  cylinder(pearl,[x,y+.52+height/2,z],[.042,height,.042]);sphere(flame,[x,y+.55+height,z],[.028,.065,.028]);
 }
 function table(x:number,z:number){
  cylinder(espresso,[x,.55,z],[.24,1.1,.24]);cylinder(pearl,[x,1.12,z],[1.38,.075,1.38]);
  const linenGeometry=new THREE.CylinderGeometry(1.38,1.52,.98,56,1,true),pos=linenGeometry.attributes.position;
  for(let i=0;i<pos.count;i++){const a=Math.atan2(pos.getZ(i),pos.getX(i)),fold=1+Math.sin(a*18)*.025;pos.setX(i,pos.getX(i)*fold);pos.setZ(i,pos.getZ(i)*fold);}linenGeometry.computeVertexNormals();mesh(linenGeometry,silk,[x,.66,z]);
  bouquet(x,1.18,z,.62);
  for(let i=0;i<6;i++){
   const a=i*Math.PI/3,px=x+Math.cos(a)*1.02,pz=z+Math.sin(a)*1.02;
   cylinder(bronze,[px,1.17,pz],[.24,.022,.24]);cylinder(pearl,[px,1.19,pz],[.21,.018,.21]);
   box(silk,[px,1.21,pz],[.24,.018,.14],undefined,[0,-a,0]);
   const gx=x+Math.cos(a+.25)*.87,gz=z+Math.sin(a+.25)*.87;
   cylinder(glass,[gx,1.24,gz],[.055,.013,.055]);cylinder(glass,[gx,1.34,gz],[.011,.18,.011]);sphere(glass,[gx,1.48,gz],[.063,.08,.063]);
   if(i%2===0)candle(x+Math.cos(a)*.5,1.17,z+Math.sin(a)*.5,.33+i*.06);
   chair(x+Math.cos(a)*1.8,z+Math.sin(a)*1.8,-a-Math.PI/2);
  }
 }
 for(const p of [[-3.9,-35],[3.9,-35],[-3.9,-42],[3.9,-42]])table(p[0],p[1]);
 // Warm limestone Amman silhouettes are outside the back windows, beyond the room.
 box(stone,[0,4.55,-51.2],[13,9.1,.4]);
 for(const side of [-1,1]){
  const windowGroup=new THREE.Group();windowGroup.position.set(side*4.6,0,-50.85);decorations.add(windowGroup);
  box(espresso,[0,4,0],[2.85,6.4,.08],windowGroup);mesh(arch(1.5,.1,1,5.7),bronze,[0,0,.09],[1,1,1],windowGroup);
  // This distant city is visible through a glass aperture rather than a full-screen backdrop.
  for(let i=0;i<9;i++){const bx=(i%3-1)*.86,by=1.4+Math.sin(i*1.4)*.22,h=.7+(i%4)*.28;box(stone,[bx,by+h/2,-.03],[.73,h,.06],windowGroup);for(let n=0;n<3;n++)box(flame,[bx+(n-1)*.18,by+h*.55,.014],[.06,.075,.012],windowGroup);}
  box(glass,[0,4,.18],[2.75,6.1,.024],windowGroup);rod([0,1,.22],[0,7,.22],.02,bronze,windowGroup);
 }
 // Contact shadows support the furniture on the floor even on a small phone.
 const shadowMat=new THREE.MeshBasicMaterial({color:'#090604',transparent:true,opacity:.15,depthWrite:false});
 for(const p of [[-3.9,-35],[3.9,-35],[-3.9,-42],[3.9,-42],[-4.3,-9]])mesh(new THREE.CircleGeometry(1.9,24),shadowMat,[p[0],.022,p[1]],[1,1,1],decorations,[-Math.PI/2,0,0]);
 // Merge stationary geometry by material: the complete room stays practical on phones.
 scene.updateMatrixWorld(true);
 const batches=new Map<THREE.Material,THREE.BufferGeometry[]>();
 decorations.traverse(object=>{if(!(object instanceof THREE.Mesh)||Array.isArray(object.material))return;const g=(object.geometry.index?object.geometry.toNonIndexed():object.geometry.clone()).applyMatrix4(object.matrixWorld);g.deleteAttribute('uv1');const list=batches.get(object.material)||[];list.push(g);batches.set(object.material,list);});
 for(const [material,list] of batches){const geometry=mergeGeometries(list,false);list.forEach(g=>g.dispose());if(!geometry)continue;const combined=new THREE.Mesh(geometry,material);combined.castShadow=!material.transparent;combined.receiveShadow=true;scene.add(combined);}
 scene.remove(decorations);originals.forEach(g=>g.dispose());
 const ambient=new THREE.HemisphereLight('#fff0d4','#80684d',.95);scene.add(ambient);
 const key=new THREE.DirectionalLight('#fff1d7',2.3);key.position.set(-3,9,20);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-13;key.shadow.camera.right=13;key.shadow.camera.top=13;key.shadow.camera.bottom=-13;key.shadow.camera.near=.1;key.shadow.camera.far=65;key.shadow.bias=-.0007;key.shadow.normalBias=.03;scene.add(key,key.target);
 const fill=new THREE.DirectionalLight('#c6ab7e',1.3);fill.position.set(4,5,-35);scene.add(fill);
 const accent=new THREE.PointLight('#ffddaa',48,25,2);accent.position.set(0,5,5);scene.add(accent);
 const materials=[stone,pearl,bronze,darkBronze,espresso,marble,paper,silk,velvet,foliage,petals,glass,flame,glow,shadowMat,...frameMaterials];
 return {scene,doors,lights,ambient,key,accent,stone,marble,frames:ROOM_FRAMES,frameGroups,frameMaterials,dispose(){const geometries=new Set<THREE.BufferGeometry>();scene.traverse(o=>{if(o instanceof THREE.Mesh)geometries.add(o.geometry);});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());}};
}
