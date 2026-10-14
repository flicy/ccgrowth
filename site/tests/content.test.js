import test from 'node:test';
import assert from 'node:assert/strict';
import {chapters,projects,biography,ui} from '../src/content.js';
import {cameraStops,stickerSpecs} from '../src/scene.js';
test('each chapter has a camera and valid portfolio references in both languages',()=>{
  assert.equal(cameraStops.length,chapters.length);
  assert.equal(new Set(chapters.map(c=>c.id)).size,chapters.length);
  for(const c of chapters){for(const lang of ['zh','en']){for(const key of ['label','title','body'])assert.ok(c[key][lang]?.trim());}for(const id of c.projects)assert.ok(projects.some(p=>p.id===id),id);}
  for(const sticker of stickerSpecs)assert.ok(chapters.some(c=>c.id===sticker.id));
});
test('projects retain explicit stages and only HTTPS outbound links',()=>{
  for(const p of projects){for(const lang of ['zh','en']){assert.ok(p.status[lang]);assert.ok(p.role[lang]);}if(p.url)assert.equal(new URL(p.url).protocol,'https:');}
  assert.ok(biography.zh && biography.en);
  assert.deepEqual(Object.keys(ui.zh).sort(),Object.keys(ui.en).sort());
});
