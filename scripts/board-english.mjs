// Static English edition. The authored rows correspond to the source's stable question IDs.
import fs from 'node:fs';
import {guideFor} from './board-topics.mjs';
import {sketch} from './board-guides.mjs';
import {scenes,diagram} from './board-scenes.mjs';
import {questionFigure} from './board-figures.mjs';
import {velocityDiagram} from './board-velocity.mjs';
const dictionary = name => JSON.parse(fs.readFileSync(`board/translations/${name}.en.json`, 'utf8'));
const concepts = dictionary('concepts');
const rows = dictionary('questions');
const guideTitles={
  "rahim": "Rahim\u2019s crossing",
  "river": "Boat and current",
  "rain": "Rain in the moving frame",
  "resolve": "Resolving a force",
  "flux": "Flux through a small volume",
  "curl": "Local circulation",
  "field": "Spatial derivatives",
  "axes": "Cartesian axes",
  "position": "Position from the origin",
  "unit": "Length and direction",
  "projection": "Projection onto a direction",
  "triangle": "Head-to-tail construction",
  "area": "Base and perpendicular height",
  "circle": "Radius and tangent",
  "tangent": "Radius and tangent at contact",
  "volume": "A sample of air"
};
const labels={'ভিত্তি':'base','প্রথম':'first','উচ্চতা':'height','লম্ব':'normal','কেন্দ্র':'centre','একই দিক':'same direction','স্রোত':'current','দ্বিতীয়':'second','নৌকা':'boat','জলীয় বাষ্প':'vapour','নিরাপদ স্থান':'safe landing','গাড়ি':'car','বৃষ্টি':'rain','প্রবেশ':'inflow','বল':'force','ব্যাসার্ধ':'radius','উপাংশ':'component','নির্গমন':'outflow','বেগ':'velocity','১ম':'first','২য়':'second'};
const translateLabels=s=>s.replace(/জলীয় বাষ্প|একই দিক|নিরাপদ স্থান|[\u0980-\u09ff]+/gu,x=>{if(!labels[x])throw Error(`Missing figure label: ${x}`);return labels[x]});
const steps={
 river:['Draw the velocity relative to water. Resolve it along and across the banks.','Place the current arrow at its head, parallel to the bank.','Connect the first tail to the final head: this is the ground velocity. Divide the width by its across-bank component to find the time.'],
 rain:['Draw the ground-frame rain velocity downwards.','Reverse the observer’s horizontal velocity and add it head to tail.','The resultant is the apparent falling direction. Point the umbrella towards the incoming drops.'],
 resolve:['Draw the reaction at angle θ to the ground.','Its horizontal component acts in the walking direction.','Its vertical component supports the walker. Together the two components reconstruct the reaction.'],
 field:['Consider a small loop in the field.','Compare the tangential components around the loop.','Use the right-hand rule for the curl direction.'],
 triangle:['Draw the first directed side.','Place the next displacement at its head.','The closing displacement from the first tail to the last head is the sum.'],
 projection:['Choose the arrow defining the reference direction.','Draw the other vector from the same tail.','Drop a perpendicular from its tip. The signed distance along the reference line is the scalar projection.'],
 flux:['Compare flow through the two opposite x faces.','Repeat this for the other two pairs of faces.','Sum the three rates. Positive divergence means net outward flux.'],
 area:['Take A as the base.','Draw B from the same point.','The height is B sin θ. Base times height equals the cross-product magnitude.']};
function localizedFigure(html,title,notes){
 // Keep SVG geometry, colours, animation controls and mathematical symbols identical in both editions.
 return html.replace(/aria-label="[^"]*"/g,`aria-label="${title}"`).replace(/<h3>[^<]*<\/h3>/g,`<h3>${title}</h3>`)
 .replace(/<small>[^<]*<\/small>/g,'<small>VECTOR LAB / DIAGRAM</small>').replace(/<strong>[^<]*<\/strong>/g,`<strong>${title}</strong>`)
 .replace(/(<text\b[^>]*>)([^<]*)(<\/text>)/g,(_,open,text,end)=>open+translateLabels(text)+end)
 .replace(/(data-step="(\d)">)[^<]*/g,(_,open,i)=>open+'Step '+(+i+1))
 .replace(/(<p data-note="(\d)">).*?<\/p>/g,(original,open,i)=>notes ? open+`<b>${+i+1}.</b> ${notes[i]}</p>` : original.replace(/[১২৩]/,String(+i+1)))
 .replace(/<figcaption>[^<]+<\/figcaption>/g,'<figcaption>Stimulus diagram · not to scale</figcaption>');
}
function page(title,body){return `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><script defer src="../legacy.js"></script><title>${title} · HSC Notes</title><main><nav><a href="../index.html#/chapter/physics/vectors">← Vector chapter</a><a href="index.html">Question index</a></nav>${body}</main></html>`;}
export function buildEnglish(questions,render,statsSource){
 if(questions.length!==Object.keys(rows).length)throw Error('English coverage does not match source');
 const cards=[[],[]];fs.mkdirSync('board/en',{recursive:true});
 for(const q of questions){
  const n=q.id,group=n<=43?0:1;
  const {source,stem,a,b,c,d,figure,note}=rows[n];
  const parts=[concepts[a],concepts[b],c,d];
  const given=stem.replace('@eq',(q.stem.match(/\$[^$]*=[^$]*\$/g)||[]).join('; '));
  const boardInfo=`${q.year?q.year+' · ':''}Original question ${q.board_question_no} · Collection ${n}`;
  const asks=[],solutions=[];
  for(const [i,item] of parts.entries()){
   if(!item?.question || !item.hint || !item.solution) throw Error(`Missing English content in question ${n}, part ${i+1}`);
   const {question:prompt,hint,solution:answer,math}=item, letter='abcd'[i], [key,,scene]=guideFor(n,i),title=guideTitles[key];
   const fig=localizedFigure(sketch(key,''),title);
   const worked=scene!==undefined?diagram(scenes[n][scene]):velocityDiagram(n,i,'en');
   const solutionFig=worked?localizedFigure(worked,title,scene===undefined ? null : steps[key==='rahim'?'river':key]??steps.field):fig.replaceAll(/head-(\d+)/g,'answer-head-$1');
   const {marks,label}=q.subquestions[i];
   const ref=q.answer_reference_to_question[label]??(n===65?7:null);
   asks.push(`<li><strong>(${letter})</strong> ${render(prompt)} <small>${marks} mark${marks===1?'':'s'}</small></li>`);
   solutions.push(`<section class="part" id="part-${label}"><small>Part ${letter} · ${marks} mark${marks===1?'':'s'}</small><h3>${render(prompt).replace(/^<p>|<\/p>\s*$/g,'')}</h3><details class="hint"><summary>Hint <span>Try it first</span></summary>${fig}${render(hint)}</details><details class="answer"><summary>Full solution <span>Diagram and explanation</span></summary><article>${solutionFig}${math?render(`$$${math}$$`):''}${render(answer)}${ref?`<a href="q${ref}.html#part-${label}">Related method: question ${ref} →</a>`:''}</article></details></section>`);
  }
  cards[group].push(`<a class="card" href="q${n}.html"><small>Question ${n} · Page ${q.source.printed_page}</small><h2>${source}</h2><span>${boardInfo} →</span></a>`);
  const stimulus=q.figure_descriptions.length?localizedFigure(questionFigure(n),'Stimulus diagram'):'';
  fs.writeFileSync(`board/en/q${n}.html`,page(source,`<header><small>VECTOR / ${group?'COLLEGE':'BOARD'} PRACTICE</small><h1>${source}</h1><p>${boardInfo}</p></header><section class="paper"><h2>Question and stimulus</h2>${render(given)}<ol class="asks">${asks.join('')}</ol>${stimulus}${figure?`<aside class="explain"><h3>Reading the diagram</h3>${render(figure)}</aside>`:''}</section><h2>Try it yourself</h2>${solutions.join('')}${note?`<details><summary>Source notes and corrections</summary><article>${render(note)}</article></details>`:''}<nav>${n>1?`<a href="q${n-1}.html">← Previous question</a>`:''}${n<questions.length?`<a href="q${n+1}.html">Next question →</a>`:'<a href="index.html">Question index →</a>'}</nav>`));
 }
 const stats = statsSource.split('\n').filter(s=>s.startsWith('|')).map((s,i)=> i===0?'| Year | Dhaka | Mymensingh | Rajshahi | Dinajpur | Cumilla | Chattogram | Sylhet | Jashore | Barishal | Total |':s.replace('মোট প্রশ্ন','Total questions').replace(/[০-৯]/g,x=>String(x.charCodeAt(0)-0x9e6))).join('\n');
 fs.writeFileSync('board/en/index.html',page('Vector board questions',`<header><small>PHYSICS 01 / CHAPTER 02</small><h1>Vector board questions</h1><p>85 questions · 340 subquestions</p></header><p>Choose a question and try it first. Use a hint if needed, then compare your work with the solution.</p><nav><a href="#board">Board questions (43)</a><a href="#college">College questions (42)</a></nav>${cards.map((g,i)=>`<h2 id="${i?'college':'board'}">${i?'College':'Board'} questions</h2><div class="grid">${g.join('')}</div>`).join('')}<details><summary>Board question counts, 2015–2025</summary><article>${render(stats)}<p>The HSC examination was not held in 2020.</p></article></details>`));
}
