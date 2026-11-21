// Preserve bookmarks to the original static pages, including subquestion anchors.
const page = location.pathname.split('/').pop();
const number = /^q(\d+)\.html$/.exec(page)?.[1];
const anchor = location.hash.slice(1);
location.replace('../index.html#/board/physics/vectors' + (number ? '/' + number : '') + (anchor ? '/' + anchor : ''));
