import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {projects} from '../src/content.js';
import {productHref,findProduct,filterProducts} from '../src/portfolio-data.js';
test('every product has a stable share URL and direct-link lookup',()=>{
 const ids=projects.map(p=>p.id);assert.equal(new Set(ids).size,ids.length);
 for(const p of projects){const url=new URL(productHref(p.id,'/ccgrowth/'),'https://flicy.github.io');assert.equal(url.searchParams.get('project'),p.id);assert.equal(url.pathname,'/ccgrowth/');assert.equal(findProduct(projects,p.id),p);}
 assert.equal(findProduct(projects,'unknown-product'),null);
});
test('dossiers explain audience, problem, use, features and availability in both languages',()=>{
 for(const p of projects){for(const lang of ['zh','en']){
  for(const key of ['title','description','audience','problem','workflow','availability'])assert.ok(p[key]?.[lang]?.trim(),`${p.id}.${key}.${lang}`);
  assert.ok(p.features?.[lang]?.length>=2,p.id);assert.ok(p.features[lang].every(f=>f.title&&f.detail));
 }
 for(const shot of p.screenshots||[]){assert.ok(existsSync(new URL('../public/'+shot.src,import.meta.url)),`${p.id}: missing screenshot`);assert.ok(shot.caption.zh&&shot.caption.en);}
 }
});
test('filtering finds real product information and categories',()=>{
 assert.ok(filterProducts(projects,{query:'FitCrew',group:'all'}).some(p=>p.id==='fitcrew'));
 assert.deepEqual(filterProducts(projects,{query:'something-absent-639182',group:'all'}),[]);
 assert.ok(filterProducts(projects,{query:'',group:'tools'}).every(p=>p.group==='tools'));
});
