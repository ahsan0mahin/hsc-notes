// Preserve bookmarks to the original static pages, including subquestion anchors.
const page = location.pathname.split('/').pop();
const number = /^q(\d+)\.html$/.exec(page)?.[1];
const anchor = location.hash.slice(1);
const english = document.documentElement.lang === 'en';
if (english) { try { localStorage.setItem('hsc:lang','en'); } catch {} }
location.replace((english ? '../../' : '../') + 'index.html#/board/physics/vectors' + (number ? '/' + number : '') + (anchor ? '/' + anchor : ''));
