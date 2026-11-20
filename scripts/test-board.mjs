import assert from 'node:assert/strict';
import fs from 'node:fs';
import {JSDOM} from 'jsdom';
const read=file=>fs.readFileSync(`board/${file}`,'utf8');
const cards=new JSDOM(read('index.html')).window.document.querySelectorAll('.card');
assert.equal(cards.length,15);
for(const card of cards){
 const dom=new JSDOM(read(card.getAttribute('href')),{runScripts:'outside-only'});
 const doc=dom.window.document;
 assert.equal(doc.querySelectorAll('details').length,4);
 assert.ok(doc.querySelector('math'));
 dom.window.eval(read('lab.js'));
 for(const lab of doc.querySelectorAll('.lab:has(button)')){
  lab.querySelector('[data-step="2"]').click();
  assert.equal(lab.querySelector('[data-note="2"]').hidden,false);
  assert.equal(lab.querySelector('[data-stage="2"]').style.visibility,'visible');
 }
 dom.window.close();
}
console.log('Board practice: 15 pages, 60 solutions, MathML and diagram controls verified.');
