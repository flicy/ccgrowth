import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {projects} from '../src/content.js';
const template=readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
const esc=v=>String(v).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function write(path,title,description,product){
 let html=template.replace(/<title>[^<]*<\/title>/,`<title>${esc(title)}</title>`).replace(/(<meta name="description" content=")[^"]*/,`$1${esc(description)}`);
 const url='https://flicy.github.io/ccgrowth/'+path;
 html=html.replace('</head>',`<link rel="canonical" href="${url}"/><meta property="og:title" content="${esc(title)}"/><meta property="og:description" content="${esc(description)}"/><meta property="og:type" content="website"/><meta property="og:url" content="${url}"/>${product?.screenshots?.length?`<meta property="og:image" content="https://flicy.github.io/ccgrowth/${product.screenshots[0].src}"/>`:''}</head>`);
 if(product)html=html.replace(/<noscript>[\s\S]*?<\/noscript>/,`<noscript><main><h1>${esc(product.title.zh)}</h1><p>${esc(product.description.zh)}</p><h2>适合谁 / Audience</h2><p>${esc(product.audience.zh)}</p><p>${esc(product.audience.en)}</p><h2>怎么用 / How it works</h2><p>${esc(product.workflow.zh)}</p><p>${esc(product.workflow.en)}</p><p>${esc(product.availability.zh)}</p>${product.url?`<a href="${esc(product.url)}">打开产品 / Open product</a>`:''}</main></noscript>`);
 const dir=new URL('../dist/'+path,import.meta.url);mkdirSync(dir,{recursive:true});writeFileSync(new URL('index.html',dir),html);
}
write('projects/','作品集 · Chris 崔莹','产品、工具、原型与社区，逐件介绍它的用途、功能、界面和当前阶段。');
for(const p of projects)write('projects/'+p.id+'/',p.title.zh+' · Chris 崔莹',p.description.zh,p);
writeFileSync(new URL('../dist/.nojekyll',import.meta.url),'');
console.log('Generated '+projects.length+' individual product pages and the catalog.');
