import './style.css';
import {socialLinks} from './social.js';
import {createElement, Mail} from 'lucide';
import {profile,chapters,projects,biography,formalBio,credentials,ui} from './content.js';

import {mountPortfolio} from './portfolio-view.js';
const route=location.pathname.slice(import.meta.env.BASE_URL.length).replace(/^\/+|\/+$/g,'').split('/');
const query=new URL(location.href).searchParams;
if(route[0]==='projects'||query.has('project')||query.has('portfolio')){
 mountPortfolio({id:query.get('project')||(route[1]?decodeURIComponent(route[1]):null),base:import.meta.env.BASE_URL});
}else{
let language='zh',current=0,scene,sceneStatus='loading';
const text=value=>typeof value==='string'?value:value[language];
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const app=document.querySelector('#app');
const asset=path=>`${import.meta.env.BASE_URL}${path.replace(/^\//,'')}`;
app.innerHTML=`
<header><a class="identity" href="#hello" aria-label="Chris 首页"><img src="${asset('/assets/mark.svg')}" alt=""/><span>Chris <small>崔莹</small></span></a><nav aria-label="Main"><button id="work"></button><button id="reader"></button><button id="language"></button></nav></header>
<main id="story">
  <div class="back-type" aria-hidden="true">CHRIS.</div>
  <div id="stage" class="stage"><div id="hotspots" class="hotspots"></div><div id="fallback" class="fallback" hidden><span>C.</span><p></p></div></div>
  <div class="edition">AN ONGOING EXPLORATION<br><span>PRODUCTS · COMMUNITIES · LIFE</span></div>
  <section class="story-panel" aria-labelledby="chapter-title"><p id="eyebrow" class="eyebrow"></p><h1 id="chapter-title" tabindex="-1"></h1><p id="intro" class="intro"></p><div id="notes" class="notes"></div><div id="actions" class="actions"></div><div id="related" class="related"></div></section>
  <div class="stage-caption"><span class="status-dot"></span><span id="model-status"></span></div>
  <div class="stage-hint" id="stage-hint"></div>
</main>
<footer><div class="chapter-count"><strong id="chapter-count">01</strong><span>/ 07</span></div><nav id="chapters" aria-label="Chapters"></nav><div class="arrows"><button id="previous" aria-label="上一章">←</button><button id="next" aria-label="下一章">→</button></div></footer>
<dialog id="details" aria-labelledby="dialog-label"><div class="dialog-bar"><span id="dialog-label"></span><button id="close-dialog"></button></div><div id="dialog-body"></div></dialog>
<div class="sr-only" id="announcement" aria-live="polite"></div>`;
const $=id=>document.getElementById(id);
function status(){
  const words={loading:['正在布置场景','Setting the scene'],maquette:['交互预览 · 人物为造型草模','INTERACTION PREVIEW · SCULPTURE STUDY'],'model-ready':['3D 人物 · 拖动可环绕','3D PORTRAIT · DRAG TO ORBIT'],lost:['3D 暂停 · 仍可浏览全部内容','3D paused · All stories remain available'],unavailable:['文字浏览模式','Reading mode'],'model-error':['模型未载入 · 使用造型草模','Model unavailable · Showing sculpture study']};
  $('model-status').textContent=(words[sceneStatus]||words.maquette)[language==='zh'?0:1];
  $('stage-hint').textContent=language==='zh'?'拖动人物，或点击贴纸探索 ↗':'Drag to orbit. Pick a sticker to explore ↗';
  $('fallback').querySelector('p').textContent=language==='zh'?'用下面的章节，认识我的不同侧面。':'Explore the chapters to discover the different sides of my work.';
}
function projectMarkup(p){return `<article class="project"><div class="project-meta"><span>${esc(text(p.category))}</span><span>${esc(text(p.status))}</span></div><h3>${esc(text(p.title))}</h3><p>${esc(text(p.description))}</p><small>${esc(text(p.role))}</small><div class="project-links">${[...(p.url?[{url:p.url,label:p.linkLabel}]:[]),...(p.links||[])].map(link=>`<a href="${esc(link.url)}" target="_blank" rel="noopener noreferrer">${esc(text(link.label))} ↗</a>`).join('')}</div></article>`;}
function openDialog(kind,id){
  const body=$('dialog-body');$('details').dataset.kind=kind;body.dataset.kind=kind;body.dataset.project=id||'';
  if(kind==='wechat'){
    $('dialog-label').textContent=language==='zh'?'微信':'WeChat';
    body.innerHTML=`<section class="wechat-card"><img src="${asset('/assets/wechat-official.jpg')}" width="430" height="430" alt="${language==='zh'?'CCGrowth 微信二维码':'CCGrowth WeChat QR code'}"/><p>${language==='zh'?'视频号 / 公众号：CCGrowth在出海':'WeChat Channels / Official Account: CCGrowth在出海'}</p></section>`;
  }else if(kind==='work'){
    $('dialog-label').textContent=ui[language].work;
    body.innerHTML=`<p class="eyebrow">SELECTED WORK</p><h2>${language==='zh'?'想法，正在发生。':'Ideas in motion.'}</h2><div class="project-list">${projects.map(projectMarkup).join('')}</div>`;
  }else if(kind==='project'){
    const p=projects.find(p=>p.id===id);$('dialog-label').textContent=text(p.category);body.innerHTML=projectMarkup(p);
  }else{
    $('dialog-label').textContent=ui[language].about;
    const fb=formalBio[language];
    body.innerHTML=`<p class="eyebrow">CHRIS CUI / A FEW DIFFERENT SIDES</p><h2>${language==='zh'?'关于我，也关于我在做的事。':'A little about me. And what I make.'}</h2><section class="reader-section formal-bio"><span>${esc(fb.heading)}</span><p>${esc(fb.paragraph)}</p><span>${esc(fb.experienceHeading)}</span><ul>${fb.experience.map(item=>`<li>${esc(item)}</li>`).join('')}</ul><span>${esc(fb.educationHeading)}</span><ul>${fb.education.map(item=>`<li>${esc(item)}</li>`).join('')}</ul></section>${credentials.length?`<section class="reader-section credentials"><span>${language==='zh'?'认证':'Credentials'}</span><ul>${credentials.map(cr=>`<li><strong>${esc(text(cr.title))}</strong> · ${esc(text(cr.issuer))} · ${esc(cr.date)}<br><small>${esc(text(cr.detail))}</small></li>`).join('')}</ul></section>`:''}<section class="reader-section biography"><p>${esc(text(biography))}</p></section>${chapters.filter(c=>['build','community','life'].includes(c.id)).map(c=>`<section class="reader-section"><span>${esc(text(c.eyebrow))}</span><h3>${esc(text(c.title).replace('\n',''))}</h3><p>${esc(text(c.body))}</p></section>`).join('')}<a class="contact-link" href="mailto:${profile.email}">${profile.email} ↗</a>`;
  }
  if(!$('details').open)$('details').showModal();$('details').scrollTop=0;
}
function contactActions(){
  const copyLabel=language==='zh'?'复制邮箱地址':'Copy email address';
  const mail=createElement(Mail);mail.setAttribute('aria-hidden','true');
  return `<button class="contact-button contact-email" data-copy aria-label="${copyLabel}" aria-describedby="email-tip">${mail.outerHTML}<span class="contact-tip" id="email-tip" role="tooltip">${copyLabel}</span></button>${socialLinks.map(s=>{
    const label=esc(text(s.label));
    const image=`<img src="${asset(s.image)}" alt="" aria-hidden="true" draggable="false"/>`;
    return s.action==='wechat'?`<button class="contact-button social-wechat" data-wechat-qr aria-label="${label}" aria-haspopup="dialog">${image}</button>`:`<a class="contact-button social-${s.id}" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${label}" title="${label}">${image}</a>`;
  }).join('')}`;
}
let copyTipTimer;
function render(){
  const focusedIndex=document.activeElement?.closest('#chapters button')?.dataset.index;
  document.documentElement.lang=language==='zh'?'zh-CN':'en';
  document.title=language==='zh'?'Chris 崔莹 — 把想法做出来，把 AI 用起来':'Chris Cui — Build ideas. Put AI to work.';
  ['work','language'].forEach(id=>$(id).textContent=ui[language][id]);$('reader').textContent=ui[language].about;$('close-dialog').textContent=`${ui[language].close} ×`;
  $('previous').setAttribute('aria-label',ui[language].previous);$('next').setAttribute('aria-label',ui[language].next);
  const c=chapters[current];$('story').dataset.chapter=c.id;
  $('eyebrow').textContent=`0${current+1} / ${text(c.eyebrow)}`;
  $('chapter-title').textContent=text(c.title);$('intro').textContent=current===0?ui[language].tagline:text(c.body);
  $('notes').innerHTML=current===0?`<span>${language==='zh'?'AI Builder':'AI Builder'}</span><span>${language==='zh'?'产品 · 增长 · 社区':'Product · Growth · Community'}</span><span>${language==='zh'?'Datawhale 认证讲师':'Datawhale Certified Instructor'}</span>`:c.notes.map(n=>`<span>${esc(text(n))}</span>`).join('');
  $('actions').classList.toggle('contact-actions',c.id==='contact');
  $('actions').innerHTML=current===0?`<button class="primary" data-next>${ui[language].explore} <span>↗</span></button>`:current===6?contactActions():`<button class="text-button" data-reader>${ui[language].read} ↗</button>`;
  $('related').innerHTML=current===0?'':c.projects.slice(0,3).map(id=>{const p=projects.find(p=>p.id===id);return `<button data-project="${id}">${esc(text(p.title))}<span>↗</span></button>`;}).join('');
  $('chapters').innerHTML=chapters.map((c,i)=>`<button data-index="${i}" ${i===current?'aria-current="step"':''}><span class="chapter-dot"></span><span>${esc(text(c.label))}</span></button>`).join('');
  $('chapter-count').textContent=`0${current+1}`;$('previous').disabled=current===0;$('next').disabled=current===6;
  status();
  if(focusedIndex!==undefined)$('chapters').querySelector(`[data-index="${focusedIndex}"]`)?.focus({preventScroll:true});
  if($('details').open)openDialog($('dialog-body').dataset.kind,$('dialog-body').dataset.project);
}
function navigate(index,updateHash=true){
  if(index<0||index>=chapters.length)return;
  current=index;scene?.goTo(index);render();
  if(updateHash)history.replaceState(null,'',`#${chapters[index].id}`);
  $('announcement').textContent=`${index+1} / 7. ${text(chapters[index].title).replace('\n',' ')}`;
}
app.addEventListener('click',async e=>{
  const button=e.target.closest('button,a');if(!button)return;
  if(button.dataset.index!==undefined)navigate(Number(button.dataset.index));
  if(button.hasAttribute('data-next')){navigate(current+1);$('chapter-title').focus({preventScroll:true});}
  if(button.hasAttribute('data-reader'))openDialog('reader');
  if(button.hasAttribute('data-wechat-qr'))openDialog('wechat');
  if(button.dataset.project)location.assign(asset('projects/'+encodeURIComponent(button.dataset.project)+'/')+(language==='en'?'?lang=en':''));
  if(button.hasAttribute('data-copy')){
    clearTimeout(copyTipTimer);
    const tip=button.querySelector('.contact-tip');
    try{await navigator.clipboard.writeText(profile.email);tip.textContent=language==='zh'?'邮箱地址已复制':'Email address copied';$('announcement').textContent=tip.textContent;}
    catch{tip.textContent=profile.email;$('announcement').textContent=ui[language].copyFailed;}
    button.classList.add('show-tip');
    copyTipTimer=setTimeout(()=>{button.classList.remove('show-tip');tip.textContent=language==='zh'?'复制邮箱地址':'Copy email address';},2500);
  }
});
$('previous').onclick=()=>navigate(current-1);$('next').onclick=()=>navigate(current+1);
$('work').onclick=()=>location.assign(asset('projects/')+(language==='en'?'?lang=en':''));$('reader').onclick=()=>openDialog('reader');
$('language').onclick=()=>{language=language==='zh'?'en':'zh';render();};
$('close-dialog').onclick=()=>$('details').close();
$('details').addEventListener('click',e=>{if(e.target===$('details')){const r=$('details').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('details').close();}});
window.addEventListener('hashchange',()=>{const i=chapters.findIndex(c=>`#${c.id}`===location.hash);if(i>=0)navigate(i,false);});
$('chapters').addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();navigate(Math.max(0,Math.min(6,Number(e.target.closest('button')?.dataset.index??current)+(e.key==='ArrowRight'?1:-1))));$('chapters').querySelector('[aria-current]').focus();}});
render();
async function initializeScene(){
try {
const {createScene}=await import('./scene.js');
scene=await createScene({container:$('stage'),hotspots:$('hotspots'),onSelect:id=>navigate(chapters.findIndex(c=>c.id===id)),onState:s=>{sceneStatus=s;status();},modelUrl:import.meta.env.VITE_MODEL_URL||null});
if(!scene.available){sceneStatus='unavailable';$('fallback').hidden=false;status();}
const motion=matchMedia('(prefers-reduced-motion: reduce)');motion.addEventListener('change',e=>scene.setReduced(e.matches));
const initial=chapters.findIndex(c=>`#${c.id}`===location.hash);if(initial>=0)navigate(initial,false);
// Development diagnostics are absent from production builds.
if(import.meta.env.DEV)window.__portfolio={get chapter(){return chapters[current].id;},get scene(){return scene.state;},loadModel:scene.loadModel};

} catch { sceneStatus='unavailable';$('fallback').hidden=false;status(); }
}
initializeScene();

}
