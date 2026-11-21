import assert from 'node:assert/strict';
import fs from 'node:fs';
import {JSDOM} from 'jsdom';
const read=file=>fs.readFileSync(`board/${file}`,'utf8');
const cards=new JSDOM(read('index.html')).window.document.querySelectorAll('.card');
assert.equal(cards.length,85);
for(const card of cards){
 const dom=new JSDOM(read(card.getAttribute('href')),{runScripts:'outside-only'});
 const doc=dom.window.document;
 assert.equal(doc.querySelectorAll('section.part').length,4);
 for(const part of doc.querySelectorAll('.part')){
   for(const kind of ['hint','answer']){
     const disclosure=part.querySelector(`details.${kind}`);
     assert.ok(disclosure && !disclosure.open && disclosure.querySelector('svg[role=img]'));
     assert.ok(disclosure.textContent.trim().length>30);
   }
   assert.equal(part.querySelector('.hint .answer'),null);
 }
 assert.equal(doc.querySelector('.katex-error'),null);
 assert.ok(doc.querySelector('math'));
 dom.window.eval(read('lab.js')+';initializeBoardLabs(document)');
 for(const lab of doc.querySelectorAll('.lab:has(button)')){
  lab.querySelector('[data-step="2"]').click();
  assert.equal(lab.querySelector('[data-note="2"]').hidden,false);
  assert.equal(lab.querySelector('[data-stage="2"]').style.visibility,'visible');
 }
 dom.window.close();
}
console.log('Board practice: 85 pages, 340 independent hint/solution pairs, MathML and diagram controls verified.');
