import {buildEnglish} from "./board-english.mjs";
import fs from 'node:fs';
import MarkdownIt from 'markdown-it';
import katex from 'katex';
import {scenes,diagram} from './board-scenes.mjs';
import {guideFor} from './board-topics.mjs';
import {sketch} from './board-guides.mjs';
import {questionFigure} from './board-figures.mjs';
import {supplements} from './board-supplements.mjs';
import {velocityDiagram} from './board-velocity.mjs';
const md=new MarkdownIt({breaks:true});
const {questions}=JSON.parse(fs.readFileSync('board/questions.json','utf8'));
const firstBatch=fs.readFileSync('board/batch-1.md','utf8').replace(/^## পৃষ্ঠা .*$/gm,'').split(/^### প্রশ্ন /m);
const bn=n=>Number(n).toLocaleString('bn-BD');
const esc=md.utils.escapeHtml;
function render(s){const math=[];s=(s??'').trim().replace(/(`[^`\n]*`)|\$\$([\s\S]*?)\$\$|\$([^$\n]+)\$/g,(all,code,block,inline)=>{if(code)return code;const html=katex.renderToString(block??inline,{displayMode:block!==undefined,output:'mathml',strict:'ignore',throwOnError:false});return `MATHPLACE${math.push(html)-1}END`});return md.render(s).replace(/MATHPLACE(\d+)END/g,(_,i)=>math[i]);}
const shell=(title,body)=>`<!doctype html><html lang="bn"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} · HSC Notes</title><link rel="stylesheet" href="board.css"><script defer src="legacy.js"></script><main><nav><a href="../index.html#/chapter/physics/vectors">← ভেক্টর অধ্যায়</a><a href="index.html">প্রশ্নসূচি</a></nav>${body}</main></html>`;
function initialAnswer(n,label){const src=firstBatch[n]?.split(/^#### .+ নং প্রশ্নের উত্তর\s*$/m)[1];return src?.match(new RegExp(`^\\*\\*${label}\\.\\*\\*([\\s\\S]*?)(?=^\\*\\*[কখগঘ]\\.\\*\\*|(?![\\s\\S]))`,'m'))?.[1]?.replace(/^---$/gm,'').trim();}
const cards=[[],[]];
for(const q of questions){const n=q.id;const board=q.source_title;const group=n<=43?0:1;
 const subText=s=>s.text.split(/\n\s*\n\*\(/)[0];
 const hasFigure=q.figure_descriptions.length>0;
 const figure=hasFigure?questionFigure(n)+`<aside class="explain"><h3>চিত্রটি কীভাবে পড়বে</h3>${render(q.figure_descriptions[0].description)}</aside>`:'';
 const list=q.subquestions.map(s=>`<li><strong>${s.label}.</strong> ${render(subText(s))}<small>${bn(s.marks)} নম্বর</small></li>`).join('');
 const answers=q.subquestions.map((s,i)=>{
  const [key,hint,scene]=guideFor(n,i);const ref=q.answer_reference_to_question[s.label]??(n===65?7:null);
  const added=supplements[n]?.[s.label];const body=added??(n<=15?initialAnswer(n,s.label):null)??q.answer[s.label]??(n===65?questions[6].answer[s.label]:null);
  if(!body?.replace(/[-\s]/g,''))throw Error(`Missing ${n}${s.label}`);
  const figs=q.answer_figures.filter(f=>f.label.endsWith(s.label));
  const extras=q.extra_solutions_agent2.filter(x=>x.match(new RegExp(`${q.id_bn}-${s.label}`))||(!/[০-৯]-[কখগঘ]/.test(x)&&i>=2));
  const solutionFigure=scene!==undefined?diagram(scenes[n][scene]):(velocityDiagram(n,i)||sketch(key,''));
  return `<section class="part" id="part-${s.label}"><small>অংশ ${s.label}　·　${bn(s.marks)} নম্বর</small><h3>${md.renderInline(subText(s).includes('$')?'প্রশ্ন '+s.label:subText(s))}</h3>${subText(s).includes('$')?render(subText(s)):''}<details class="hint"><summary>হিন্ট <span>আগে নিজে চেষ্টা করো</span></summary>${sketch(key,hint)}</details><details class="answer"><summary>পূর্ণ উত্তর <span>চিত্র ও সমাধান</span></summary><article>${solutionFigure}${added?'<small>সম্পূরক সমাধান</small>':''}${render(body)}${figs.map(f=>render(f.description)).join('')}${extras.map(x=>'<h4>বাড়তি ব্যাখ্যা</h4>'+render(x)).join('')}${ref?`<a href="q${ref}.html#part-${s.label}">অনুরূপ প্রশ্ন ${bn(ref)}-এর সমাধান পদ্ধতি →</a>`:''}</article></details></section>`;
 }).join('');
 cards[group].push(`<a class="card" href="q${n}.html"><small>প্রশ্ন ${q.id_bn}　·　পৃষ্ঠা ${bn(q.source.printed_page)}</small><h2>${esc(q.board)}</h2><span>${q.year?bn(q.year)+'　·　':''}মূল প্রশ্ন ${bn(q.board_question_no)} →</span></a>`);
 const notes=q.verification_notes_agent2.map(x=>x.split(/\n---/)[0]).filter(x=>!x.includes('পুনরাবৃত্ত জলছাপ'));
 fs.writeFileSync(`board/q${n}.html`,shell(board,`<header><small>VECTOR　/　${group?'COLLEGE':'BOARD'} PRACTICE</small><h1>${esc(q.board)}</h1><p>${esc(board)}　·　সংকলনের প্রশ্ন ${q.id_bn}</p></header><section class="paper"><h2>প্রশ্ন ও উদ্দীপক</h2>${q.stem_type==='figure_only'?'চিত্র ও তার নিচের তথ্য অনুসরণ করো।':render(q.stem)}<ol class="asks">${list}</ol>${figure}</section><h2>নিজে সমাধান করো</h2>${answers}${notes.length?`<details><summary>উৎস যাচাই ও সংশোধনী</summary><article>${notes.map(render).join('')}</article></details>`:''}<nav>${n>1?`<a href="q${n-1}.html">← আগের প্রশ্ন</a>`:''}${n<questions.length?`<a href="q${n+1}.html">পরের প্রশ্ন →</a>`:'<a href="index.html">প্রশ্নসূচি →</a>'}</nav>`));
}
fs.writeFileSync('board/index.html',shell('ভেক্টর বোর্ড প্রশ্ন',`<header><small>PHYSICS 01　/　অধ্যায় ০২</small><h1>ভেক্টর বোর্ড প্রশ্ন</h1><p>৮৫টি সৃজনশীল প্রশ্ন · ৩৪০টি উপপ্রশ্ন</p></header><p>উৎস বেছে প্রশ্ন খোলো। আটকে গেলে হিন্ট দেখো; হিসাব শেষ করে পূর্ণ উত্তরের সঙ্গে মেলাও।</p><nav><a href="#board">বোর্ড প্রশ্ন (৪৩)</a><a href="#college">কলেজের প্রশ্ন (৪২)</a></nav>${cards.map((group,i)=>`<h2 id="${i?'college':'board'}">${i?'কলেজের প্রশ্ন':'বোর্ড প্রশ্ন'}</h2><div class="grid">${group.join('')}</div>`).join('')}<details><summary>২০১৫–২০২৫: বোর্ড প্রশ্নের সংখ্যাভিত্তিক বিশ্লেষণ</summary><article>${render(firstBatch[0].slice(firstBatch[0].indexOf('| সাল'),firstBatch[0].indexOf('#### ■ অধ্যায়ভিত্তিক')))}</article></details>`));
buildEnglish(questions,render,firstBatch[0]);
