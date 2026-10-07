import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {GLTFExporter} from 'three/examples/jsm/exporters/GLTFExporter.js';
import {buildWeddingSalon} from '../src/invitation/bassamLanaWorld.ts';

// Node 22.18+ strips this model's TypeScript types. No Blender install is needed.
globalThis.FileReader=class {
 async readAsArrayBuffer(blob){this.result=await blob.arrayBuffer();this.onloadend?.();}
 async readAsDataURL(blob){this.result=`data:${blob.type};base64,${Buffer.from(await blob.arrayBuffer()).toString('base64')}`;this.onloadend?.();}
};
const world=buildWeddingSalon();
world.doors[0].rotation.y=-Math.PI*.52;world.doors[1].rotation.y=Math.PI*.52;
world.scene.name='Bassam and Lana - The Gilded Hour';
const lights=[];world.scene.traverse(object=>{if(object.isLight)lights.push(object);});lights.forEach(light=>light.removeFromParent());
world.scene.updateMatrixWorld(true);
const model=await new GLTFExporter().parseAsync(world.scene,{binary:true,onlyVisible:true});
const directory=fileURLToPath(new URL('../assets-source/bassam-lana/',import.meta.url));
await mkdir(directory,{recursive:true});
await writeFile(`${directory}salon.glb`,Buffer.from(model));
let triangles=0,meshes=0;
world.scene.traverse(object=>{if(object.isMesh){meshes++;triangles+=(object.geometry.index?.count??object.geometry.attributes.position.count)/3;}});
console.log(JSON.stringify({model:`${directory}salon.glb`,bytes:model.byteLength,meshes,triangles}));
world.dispose();
