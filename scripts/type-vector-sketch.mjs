// Oblique projection; use a common scale for every arrow in one sketch.
const vectors={
  3:{P:[4,-2,3],Q:[-2,4,5],R:[-1,2,-2]},8:{A:[9,1,-6],B:[4,-6,5]},
  11:{A:[3,4,-1],B:[1,-1,6]},12:{A:[2,3,5],B:[-1,2,7],C:[1,7,-1]},
  15:{A:[2,-3,1],B:[3,-1,5],C:[3,2,-4]},19:{P:[2,3,4],Q:[4,4,-1]},
  32:{A:[3,2,1],B:[1,2,3],C:[1,2,2]},35:{A:[1,1,-1],B:[2,-2,-3]},
  47:{A:[1,2,-1],B:[3,-1,2],C:[2,5,-4]},50:{P:[4,-4,1],Q:[2,-2,-1]},
  51:{A:[2,3,1],C:[5,5,3],B:[8,7,5]},54:{ω:[2,-3,1],r:[1,-2,2]},
  59:{A:[2,1,3],B:[1,2,-1],C:[1,3,2]},61:{'v₁':[2,1,-1],'v₂':[3,-2,-4],'v₃':[1,-3,5]},
  74:{A:[3,-2,1],B:[1,-3,5],C:[2,1,-3]},79:{'v₁':[40,0,0],'v₂':[0,80,0]},
  81:{'v₁':[2,1,-1],'v₂':[3,-2,4],'v₃':[1,-3,5]}
};
export function projected(id,bn){
  if(!vectors[id])return '';
  const project=([x,y,z])=>[x-.55*y,.32*x+.42*y-z];
  const points=Object.entries(vectors[id]).map(([key,v])=>[key,...project(v)]);
  const scale=84/Math.max(...points.map(([,x,y])=>Math.hypot(x,y)));
  const line=(x,y,X,Y,c)=>`<path d="M${x} ${y}L${X} ${Y}" stroke="${c}" fill="none"/>`;
  const axes=[[1,0,0],[0,1,0],[0,0,1]].map((v,i)=>{const [x,y]=project(v);return line(150,105,150+95*x,105+95*y,'#708396')+`<text x="${153+95*x}" y="${105+95*y}">${'xyz'[i]}</text>`}).join('');
  const arrows=points.map(([key,x,y],i)=>{const X=150+x*scale,Y=105+y*scale,c=['#62dece','#f8c076','#ad9cff'][i];return `<g stroke-width="2.5">${line(150,105,X,Y,c)}<path d="M0 0l-9 -4v8z" transform="translate(${X} ${Y}) rotate(${Math.atan2(y,x)*180/Math.PI})" fill="${c}"/><text x="${X+5}" y="${Y-5}">${key}</text></g>`}).join('');
  const caption=bn?'স্থানাঙ্ক অক্ষে ভেক্টরগুলোর তির্যক অভিক্ষেপ':'Oblique view of the given vectors';
  return `<svg viewBox="0 0 300 210" role="img" aria-label="${caption}">${axes}${arrows}</svg>`;
}
