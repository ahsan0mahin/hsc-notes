// Recompose the source geometry on the same grid as the hint labs. Titles and
// givens are HTML rather than tiny, fixed-position text inside the drawing.
import fs from 'node:fs';
const ink = {
  '#111':'#dcebf6','#1f6feb':'#62dece','#c1121f':'#f8aa82','#2a9d5c':'#b6a4ff',
  '#7b3fa0':'#f0abfc','#dceaf7':'#123c4b','#556':'#aac2d2','#2f4858':'#d2e6ee',
  '#445':'#abc2d3','#334':'#abc2d3','#eef4fa':'#244151','#e8edf3':'#244151',
  '#f5f9fc':'#244151','#7b8794':'#97adbf','#fff':'#dcebf6',
};
export function typeLabFigure(doc,folder,id,esc){
  const tpl=doc.createElement('template');
  tpl.innerHTML=fs.readFileSync(`${folder}/figures/q${id}.svg`,'utf8');
  const svg=tpl.content.firstElementChild;
  svg.querySelector(':scope > rect')?.remove();
  const title=svg.querySelector('text');
  const heading=esc(title.textContent); title.remove();
  const divider=svg.querySelector('line[stroke="#c9d6e2"]');
  const notes=[];
  while(divider.nextElementSibling){const node=divider.nextElementSibling;notes.push(esc(node.textContent.replace(/^•\s*/,'')));node.remove();}
  divider.remove();
  svg.querySelectorAll('g[clip-path],clipPath').forEach(node=>node.remove()); // omit the print hatching
  svg.removeAttribute('font-family');svg.setAttribute('viewBox','0 40 640 345');
  if(id===17){ // F₂ makes 60° above −x, not 30°; use a 1:2:3 force scale.
    const vectors=svg.querySelectorAll('line[stroke-width="2.3"]');
    [[342,240],[258,167.25],[237,349.12]].forEach(([x,y],i)=>{vectors[i].setAttribute('x2',x);vectors[i].setAttribute('y2',y);});
    const labels=[...svg.querySelectorAll('text')];
    const place=(node,x,y)=>{node.setAttribute('x',x);node.setAttribute('y',y);};
    place(labels.find(t=>t.getAttribute('fill')==='#2a9d5c'),250,155);
    place(labels.find(t=>t.getAttribute('fill')==='#1f6feb'),355,260);
    const arc=svg.querySelector('g > path');arc.setAttribute('d','M258 240 A42 42 0 0 1 279 203.63');
    place(labels.find(t=>t.textContent.includes('60')||t.textContent.includes('৬০')),249,220);
    svg.setAttribute('viewBox','115 103 365 280');
  }
  for(const node of svg.querySelectorAll('*')) for(const attr of ['stroke','fill']){
    const color=ink[node.getAttribute(attr)]; if(color)node.setAttribute(attr,color);
  }
  for(const text of svg.querySelectorAll('text')) text.style.fill=text.getAttribute('fill') || '#dcebf6';
  svg.setAttribute('role','img');svg.setAttribute('aria-label',title.textContent);
  return `<figure class="lab type-stem"><small>VECTOR LAB</small><h3>${heading}</h3>${svg.outerHTML}<figcaption><strong>${notes.shift()}</strong><ul>${notes.map(n=>`<li>${n}</li>`).join('')}</ul></figcaption></figure>`;
}
