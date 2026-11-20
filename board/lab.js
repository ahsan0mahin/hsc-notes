try { document.documentElement.dataset.theme = localStorage.getItem("hsc:theme") || "dark"; } catch {}
for(const lab of document.querySelectorAll('.lab')){
 const buttons=[...lab.querySelectorAll('button')];
 function step(n){buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===n)));lab.querySelectorAll('[data-stage]').forEach((g,i)=>{g.style.visibility=i<=n?'visible':'hidden';g.classList.toggle('active',i===n)});lab.querySelectorAll('[data-note]').forEach((p,i)=>p.hidden=i!==n)}
 buttons.forEach((b,i)=>b.onclick=()=>step(i));step(0);
}
