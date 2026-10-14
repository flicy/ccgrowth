import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DecalGeometry } from 'three/addons/geometries/DecalGeometry.js';

export const cameraStops = [
  { position: [0.15, 0.8, 8.4], target: [0, 0.5, 0], tint: '#e4e3d7' },
  { position: [3.1, 1.6, 5.1], target: [0.1, 1.0, 0], tint: '#e4ddce' },
  { position: [-3.5, 2.15, 4.8], target: [-0.2, 1.25, 0], tint: '#dce2d7' },
  { position: [1.8, 0.65, 4.8], target: [0, 0.55, 0], tint: '#dedfe0' },
  { position: [-2.8, 0.75, 5.1], target: [0, 0.6, 0], tint: '#e8dacf' },
  { position: [3.6, 1.45, 6], target: [0, 0.9, 0], tint: '#dddcc5' },
  { position: [0.3, 0.75, 7.9], target: [0, 0.45, 0], tint: '#e4e3d7' },
];

export const stickerSpecs = [
  { id: 'build', text: 'AI BUILDER', color: '#b9362c', ink: '#fff9e8', shape: 'pill', anchor: [.52,1.56,.73], rotation: -.15, scale: [.72,.26,.38] },
  { id: 'data', text: 'DATA', color: '#dbe8ec', ink: '#24353a', shape: 'rect', anchor: [-.51,1.13,.74], rotation: .14, scale: [.44,.34,.36] },
  { id: 'workflow', text: '{ MAKE }', color: '#f6e8a8', ink: '#363427', shape: 'pill', anchor: [.53,.83,.6], rotation: -.22, scale: [.57,.29,.32] },
  { id: 'community', text: 'INLOOP', color: '#345248', ink: '#fff8e6', shape: 'pill', anchor: [-.57,-.57,.69], rotation: .14, scale: [.9,.34,.4] },
  { id: 'life', text: 'STAY\nCURIOUS', color: '#ed956b', ink: '#3e2e23', shape: 'circle', anchor: [.62,-1.0,.59], rotation: -.13, scale: [.65,.65,.38] },
];

function stickerTexture(s) {
  const c = document.createElement('canvas'); c.width = 1024; c.height = s.shape === 'circle' ? 1024 : 512;
  const g = c.getContext('2d'); const w=c.width,h=c.height;
  g.clearRect(0,0,w,h); g.fillStyle='#fffdf5';
  g.beginPath();g.roundRect(18,18,w-36,h-36,s.shape==='rect'?40:h/2);g.fill();
  g.fillStyle=s.color;g.beginPath();g.roundRect(40,40,w-80,h-80,s.shape==='rect'?25:h/2);g.fill();
  g.fillStyle=s.ink;g.textAlign='center';g.textBaseline='middle';g.font=`900 ${s.shape==='circle'?160:156}px Arial`;
  const lines=s.text.split('\n');lines.forEach((l,i)=>g.fillText(l,w/2,h/2+(i-(lines.length-1)/2)*178));
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;return t;
}

// A temporary studio maquette for developing the cameras; never represents Chris's likeness.
function createMaquette() {
  const root=new THREE.Group();const surfaces=[];
  const clay=new THREE.MeshStandardMaterial({color:'#c8967a',roughness:.57});
  const shirt=new THREE.MeshStandardMaterial({color:'#34433c',roughness:.83});
  const dark=new THREE.MeshStandardMaterial({color:'#38312b',roughness:.55});
  const cream=new THREE.MeshStandardMaterial({color:'#f8eedc',roughness:.35});
  const add=(geo,mat,pos,scale)=>{const m=new THREE.Mesh(geo,mat);m.position.set(...pos);if(scale)m.scale.set(...scale);m.castShadow=true;m.receiveShadow=true;root.add(m);return m;};
  const sphere=(mat,pos,scale)=>add(new THREE.SphereGeometry(1,56,40),mat,pos,scale);
  const head=sphere(clay,[0,1.12,0],[.91,1.24,.77]);
  // Sculpt the jaw rather than using a perfect sphere.
  const a=head.geometry.attributes.position;
  for(let i=0;i<a.count;i++){const y=a.getY(i);if(y<-.1)a.setX(i,a.getX(i)*(1-(-y-.1)*.2));}
  head.geometry.computeVertexNormals();surfaces.push(head);
  sphere(clay,[0,-.13,0],[.39,.7,.38]);
  const body=sphere(shirt,[0,-1.43,-.12],[1.42,1.12,.72]);surfaces.push(body);
  const seam=new THREE.Mesh(new THREE.TorusGeometry(.39,.045,14,80),dark);seam.rotation.x=Math.PI/2;seam.position.set(0,-.57,0);root.add(seam);
  for(const dir of [-1,1]){
    sphere(clay,[dir*.91,1.09,-.015],[.21,.34,.16]);
    sphere(clay,[dir*.86,1.1,.12],[.10,.19,.10]);
    sphere(cream,[dir*.34,1.39,.668],[.23,.20,.12]);
    sphere(dark,[dir*.34+.025,1.41,.773],[.077,.106,.043]);
    sphere(cream,[dir*.34+.001,1.443,.81],[.020,.024,.011]);
    const curve=new THREE.QuadraticBezierCurve3(new THREE.Vector3(dir*.57,1.71,.65),new THREE.Vector3(dir*.34,1.86,.79),new THREE.Vector3(dir*.16,1.73,.73));
    add(new THREE.TubeGeometry(curve,20,.034,8,false),dark,[0,0,0]);
  }
  sphere(clay,[0,1.11,.78],[.16,.25,.24]);
  const smile=new THREE.QuadraticBezierCurve3(new THREE.Vector3(-.29,.64,.70),new THREE.Vector3(0,.43,.80),new THREE.Vector3(.3,.67,.69));
  add(new THREE.TubeGeometry(smile,32,.025,10,false),dark,[0,0,0]);
  // No invented hairstyle: the maquette stays visibly unfinished until the actual model is supplied.
  const cap=sphere(new THREE.MeshStandardMaterial({color:'#c39879',roughness:.65}),[0,2.05,-.06],[.65,.4,.59]);
  root.updateMatrixWorld(true);return {root,surfaces};
}

export async function createScene({container,hotspots,onSelect,onState,modelUrl=null}) {
  let renderer;
  try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});}catch{return {available:false,goTo(){},setReduced(){},dispose(){},loadModel:async()=>{throw new Error('WebGL unavailable')}};}
  const reducedQuery=matchMedia('(prefers-reduced-motion: reduce)');let reduced=reducedQuery.matches;
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.35;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.domElement.setAttribute('aria-hidden','true');container.appendChild(renderer.domElement);
  const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(35,1,.1,70);
  camera.position.set(...cameraStops[0].position);const controls=new OrbitControls(camera,renderer.domElement);
  controls.target.set(...cameraStops[0].target);controls.enableDamping=true;controls.dampingFactor=.08;
  controls.enablePan=false;controls.enableZoom=false;controls.minPolarAngle=.75;controls.maxPolarAngle=1.9;controls.minAzimuthAngle=-1.4;controls.maxAzimuthAngle=1.4;
  scene.add(new THREE.HemisphereLight('#fff9e9','#6b7567',3.3));
  const key=new THREE.DirectionalLight('#fff5e5',4.2);key.position.set(-3,5,5);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-4;key.shadow.camera.right=4;key.shadow.camera.top=5;key.shadow.camera.bottom=-4;key.shadow.bias=-.0006;scene.add(key);
  const rim=new THREE.DirectionalLight('#eef1d8',3);rim.position.set(4,3,-4);scene.add(rim);
  const floor=new THREE.Mesh(new THREE.CircleGeometry(8,80),new THREE.ShadowMaterial({color:'#303b2e',opacity:.16}));floor.rotation.x=-Math.PI/2;floor.position.y=-2.35;floor.receiveShadow=true;scene.add(floor);
  let {root,surfaces}=createMaquette();scene.add(root);let decals=[];let markers=[];let transition=null;let frame;let visible=true;let active=0;let contextLost=false;let assetState='maquette';let disposed=false;
  const raycaster=new THREE.Raycaster();
  const cleanDecals=()=>{decals.forEach(m=>{m.parent?.remove(m);m.geometry.dispose();m.material.map?.dispose();m.material.dispose()});decals=[];markers.forEach(m=>m.button.remove());markers=[];};
  function attachStickers(){
    cleanDecals();root.updateMatrixWorld(true);
    for(const s of stickerSpecs){
      const anchor=new THREE.Vector3(...s.anchor);const origin=anchor.clone().add(new THREE.Vector3(0,0,3));
      raycaster.set(origin,new THREE.Vector3(0,0,-1));const hits=raycaster.intersectObjects(surfaces,false);const hit=hits[0];
      let position=anchor,normal=new THREE.Vector3(0,0,1),decal;
      if(hit){
        position=hit.point.clone();normal=hit.face.normal.clone().applyNormalMatrix(new THREE.Matrix3().getNormalMatrix(hit.object.matrixWorld));
        const aim=new THREE.Object3D();aim.position.copy(position);aim.lookAt(position.clone().add(normal));aim.rotateZ(s.rotation);
        const geo=new DecalGeometry(hit.object,position,aim.rotation,new THREE.Vector3(...s.scale));
        decal=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({map:stickerTexture(s),transparent:true,roughness:.72,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-4}));
        scene.add(decal);decals.push(decal);
      }
      const button=document.createElement('button');button.type='button';button.className='scene-pin';button.dataset.chapter=s.id;
      button.setAttribute('aria-label',s.text.replace('\n',' '));button.innerHTML='<span class="pin-dot"></span><span class="pin-name"></span>';
      button.querySelector('.pin-name').textContent=s.text.replace('\n',' ');button.addEventListener('click',()=>onSelect(s.id));hotspots.appendChild(button);
      markers.push({button,position:position.clone().addScaledVector(normal,.06),normal});
    }
  }
  attachStickers();
  let previousNarrow=null;
  function resize(){const w=container.clientWidth,h=container.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();const narrow=w<700;if(previousNarrow!==null&&narrow!==previousNarrow)goTo(active,{instant:true});previousNarrow=narrow;}
  const ro=new ResizeObserver(resize);ro.observe(container);resize();
  function stopFor(index){
    const s=cameraStops[index];const p=new THREE.Vector3(...s.position),t=new THREE.Vector3(...s.target);
    if(container.clientWidth<700){p.sub(t).multiplyScalar(1.3).add(t);t.y+=.1;}return {position:p,target:t};
  }
  function goTo(index,{instant=false}={}){
    active=index;const s=stopFor(index);controls.enabled=false;
    if(reduced||instant){camera.position.copy(s.position);controls.target.copy(s.target);camera.lookAt(s.target);transition=null;controls.enabled=true;}
    else transition={start:performance.now(),from:camera.position.clone(),to:s.position,fromTarget:controls.target.clone(),toTarget:s.target,duration:1250};
    document.documentElement.style.setProperty('--scene-tint',cameraStops[index].tint);
    markers.forEach(m=>m.button.classList.toggle('selected',m.button.dataset.chapter===['hello','build','data','workflow','community','life','contact'][index]));
  }
  function projectMarkers(){
    const v=new THREE.Vector3();const dir=new THREE.Vector3();
    for(const m of markers){
      v.copy(m.position).project(camera);dir.subVectors(camera.position,m.position).normalize();
      const inView=v.z<1&&v.x>-1.12&&v.x<1.12&&v.y>-1.12&&v.y<1.12&&dir.dot(m.normal)>.1;
      m.button.hidden=!inView;m.button.style.left=`${(v.x*.5+.5)*container.clientWidth}px`;m.button.style.top=`${(-v.y*.5+.5)*container.clientHeight}px`;
    }
  }
  const onVisibility=()=>{visible=!document.hidden;if(visible&&!contextLost){frame=requestAnimationFrame(tick);}else cancelAnimationFrame(frame);};
  function tick(now){
    if(disposed||!visible||contextLost)return;
    if(transition){const p=Math.min(1,(now-transition.start)/transition.duration);const e=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;
      camera.position.lerpVectors(transition.from,transition.to,e);controls.target.lerpVectors(transition.fromTarget,transition.toTarget,e);
      if(p===1){transition=null;controls.enabled=true;}
    }
    controls.update();projectMarkers();renderer.render(scene,camera);frame=requestAnimationFrame(tick);
  }
  renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();contextLost=true;cancelAnimationFrame(frame);hotspots.hidden=true;onState?.('lost');});
  renderer.domElement.addEventListener('webglcontextrestored',()=>{contextLost=false;hotspots.hidden=false;onState?.(assetState);cancelAnimationFrame(frame);if(visible)frame=requestAnimationFrame(tick);});
  document.addEventListener('visibilitychange',onVisibility);frame=requestAnimationFrame(tick);goTo(0,{instant:true});onState?.('maquette');
  async function loadModel(url){
    onState?.('loading');
    let gltf;
    try{gltf=await new GLTFLoader().loadAsync(url);}catch(e){onState?.('model-error');throw e;}
    const next=gltf.scene;const bounds=new THREE.Box3().setFromObject(next);const size=bounds.getSize(new THREE.Vector3());
    if(!Number.isFinite(size.y)||size.y===0){onState?.('model-error');throw new Error('Empty model');}
    next.scale.setScalar(4.7/size.y);bounds.setFromObject(next);const center=bounds.getCenter(new THREE.Vector3());next.position.sub(center);next.position.y+=.05;
    const nextSurfaces=[];next.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;nextSurfaces.push(o);}});
    cleanDecals();scene.remove(root);root.traverse(o=>{if(o.isMesh){o.geometry?.dispose();const mats=Array.isArray(o.material)?o.material:[o.material];mats.forEach(m=>m?.dispose());}});
    root=next;surfaces=nextSurfaces;scene.add(root);attachStickers();goTo(active);assetState='model-ready';onState?.(assetState);
  }
  if(modelUrl)loadModel(modelUrl).catch(()=>{});
  return {available:true,goTo,loadModel,setReduced(v){reduced=v;if(v&&transition)goTo(active,{instant:true})},get state(){return {chapter:active,camera:camera.position.toArray(),moving:!!transition,model:root.type};},dispose(){disposed=true;cancelAnimationFrame(frame);ro.disconnect();document.removeEventListener('visibilitychange',onVisibility);cleanDecals();controls.dispose();renderer.dispose();renderer.domElement.remove();}};
}
