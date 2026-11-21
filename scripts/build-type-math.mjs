import {projected} from './type-vector-sketch.mjs';
// Build reader fragments from the supplied bilingual collection. Stable IDs let
// us reuse the corresponding board lab and verified solution for each subpart.
import fs from 'node:fs';
import {JSDOM} from 'jsdom';
import MarkdownIt from 'markdown-it';
import katex from 'katex';
const md=new MarkdownIt({breaks:true});
const esc=md.utils.escapeHtml;
function render(s){const math=[];s=(s??'').trim().replace(/(`[^`\n]*`)|\$\$([\s\S]*?)\$\$|\$([^$\n]+)\$/g,(all,code,block,inline)=>{if(code)return code;const html=katex.renderToString(block??inline,{displayMode:block!==undefined,output:'mathml',strict:'ignore',throwOnError:false});return `MATHPLACE${math.push(html)-1}END`});return md.render(s).replace(/MATHPLACE(\d+)END/g,(_,i)=>math[i]);}
for(const lang of ['bn','en']) {
  const bn=lang==='bn', label=bn?'ধরনভিত্তিক গণিত':'Type Wise Math';
  const number=n=>n.toLocaleString(bn?'bn-BD':'en');
  const folder=`type-math/${lang}`, groups=JSON.parse(fs.readFileSync(`type-math/source/${lang}.json`));
  const page=(name,body)=>fs.writeFileSync(`${folder}/${name}.html`,`<!doctype html><html lang="${lang}"><meta charset="utf-8"><main>${body}</main></html>`);
  let index=`<header><h1>${label}</h1></header>`;
  for(const {title,questions} of Object.values(groups)) {
    index+=`<section class="paper"><h2>${esc(title)} · ${number(questions.length)}</h2><ol>`;
    for(const {id,source,stem,figure,parts} of questions) {
      const heading=`${bn?'প্রশ্ন':'Question'} ${number(id)}`;
      index+=`<li><a href="q${id}.html">${heading} — ${esc(source)}</a></li>`;
      const dom=new JSDOM(fs.readFileSync(`board/${bn?'':'en/'}q${id}.html`));
      const doc=dom.window.document;
      const panels=['গ','ঘ'].map(c=>doc.getElementById(`part-${c}`));
      const sketch=projected(id,bn) || panels[0].querySelector('.hint svg').outerHTML.replaceAll('head-','stem-head-');
      const graphic=figure?`<img src="${folder}/figures/q${id}.svg" alt="${heading} · ${esc(title)}" style="display:block;width:100%;max-width:640px;height:auto">`:`<figure class="lab guide">${sketch}<figcaption>${bn?'ধারণাচিত্র':'Concept sketch'}</figcaption></figure>`;
      let body=`<nav><a href="index.html">← ${label}</a></nav><header><small>${esc(title)}</small><h1>${heading}</h1><p>${esc(source)}</p></header><section class="paper">${render(stem.replace(/^\*(?:This question has no figure|এই প্রশ্নে চিত্র নেই).*\*$/gm,''))}${graphic}</section>`;
      panels.forEach((panel,i)=>{
        const {prompt,answer}=parts[i];
        panel.querySelector('h3').innerHTML=render(prompt.replace(/\s*\([34৩৪]\)\*\*$/,''));
        // Keep the board derivation when the printed answer is only a cross-reference.
        if(answer.length>30 && !/\*\*(Answer|উত্তর):\*\*|ব্যাচ|Batch|অনুরূপ|Similar to/i.test(answer)) {
          const article=panel.querySelector('.answer article');
          const figures=[...article.querySelectorAll('figure')];
          article.innerHTML=render(answer);
          article.prepend(...figures);
        }
        body+=panel.outerHTML;
      });
      page(`q${id}`,body); dom.window.close();
    }
    index+='</ol></section>';
  }
  page('index',index);
}
