import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM, VirtualConsole, ResourceLoader } from 'jsdom';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const errors = [];
const results = [];

class LocalLoader extends ResourceLoader {
  fetch(url, options) {
    const parsed = new URL(url);
    if (parsed.hostname === 'example.test') {
      let pathname = decodeURIComponent(parsed.pathname);
      if (!pathname || pathname === '/') pathname = '/index.html';
      const file = path.resolve(root, `.${pathname}`);
      if (!file.startsWith(root)) return Promise.resolve(Buffer.from(''));
      try { return Promise.resolve(fs.readFileSync(file)); }
      catch { return Promise.resolve(Buffer.from('')); }
    }
    return super.fetch(url, options);
  }
}

const virtualConsole = new VirtualConsole();
virtualConsole.on('jsdomError', error => {
  if (!/Could not parse CSS/i.test(error.message)) errors.push(error.message);
});
virtualConsole.on('error', (...args) => errors.push(args.map(String).join(' ')));

const dom = new JSDOM(html, {
  url: 'http://example.test/',
  runScripts: 'dangerously',
  resources: new LocalLoader(),
  pretendToBeVisual: true,
  virtualConsole,
  beforeParse(window) {
    window.scrollTo = () => {};
    window.HTMLElement.prototype.scrollIntoView = () => {};
    window.navigator.clipboard = { writeText: async () => {} };
    // The app uses fetch() to inline language-aware SVG diagrams.
    window.fetch = url => {
      try {
        const parsed = new URL(String(url), window.location.href);
        const file = path.resolve(root, `.${decodeURIComponent(parsed.pathname)}`);
        if (!file.startsWith(root) || !fs.existsSync(file)) {
          return Promise.resolve({ ok: false, text: async () => '' });
        }
        return Promise.resolve({ ok: true, text: async () => fs.readFileSync(file, 'utf8') });
      } catch {
        return Promise.resolve({ ok: false, text: async () => '' });
      }
    };
    window.addEventListener('error', event => errors.push(event.message || 'window error'));
    window.addEventListener('unhandledrejection', event => errors.push(String(event.reason)));
  }
});

const { window } = dom;
const { document } = window;

function assert(condition, message) {
  if (!condition) throw new Error(message);
  results.push(`✓ ${message}`);
}
function click(element, label) {
  assert(element, `element exists: ${label}`);
  element.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true }));
}
function go(hash) {
  window.history.replaceState(null, '', hash);
  window.dispatchEvent(new window.Event('hashchange'));
}
const settle = () => new Promise(resolve => setTimeout(resolve, 90));

await new Promise(resolve => {
  if (document.readyState === 'complete') resolve();
  else window.addEventListener('load', resolve, { once: true });
  setTimeout(resolve, 1500);
});
await settle();

try {
  assert(document.querySelector('.hero'), 'home hero renders');
  assert(document.querySelectorAll('.subject-card').length === 3, '3 subject cards render');
  assert(document.querySelectorAll('.topic-link').length === 21, 'sidebar lists 21 published topics');
  assert(document.querySelectorAll('.note-card').length === 6, 'home shows 6 latest notes');
  assert(document.querySelector('.vector-spotlight'), 'Vector spotlight appears on home');
  assert(document.querySelectorAll('.featured-link').length === 1, 'featured chapter shortcut appears in menu');
  assert(document.querySelector('.vector-spotlight-figure svg.inline-figure'), 'home SVG diagram is inlined for live theming and language');
  assert(document.documentElement.dataset.theme === 'dark', 'dark theme is default');
  assert(document.documentElement.lang === 'bn', 'Bangla is default');

  click(document.querySelector('[data-lang="en"]'), 'EN language button');
  await settle();
  assert(document.documentElement.lang === 'en', 'language switches to English');
  assert(window.localStorage.getItem('hsc:lang') === 'en', 'language choice persists');
  assert(/Every HSC note/.test(document.querySelector('.hero h1').textContent), 'hero copy translates');
  assert(/VECTOR/.test(document.querySelector('.vector-spotlight h2').textContent), 'Vector spotlight remains visible in English');
  assert(/Projection on the XY-plane/.test(document.querySelector('.vector-spotlight-figure svg').textContent), 'inline diagram labels switch to English');

  click(document.querySelector('#themeBtn'), 'theme button');
  assert(document.documentElement.dataset.theme === 'light', 'theme switches to light');
  assert(window.localStorage.getItem('hsc:theme') === 'light', 'theme choice persists');

  go('#/subject/physics');
  assert(document.querySelector('.page-hero h1').textContent.trim() === 'Physics', 'subject route renders Physics');
  assert(document.querySelectorAll('.chapter-card').length === 2, 'Physics shows 2 chapters');

  go('#/chapter/physics/vectors');
  await settle();
  assert(document.querySelector('.vector-hero'), 'rich Vector chapter landing page renders');
  assert(document.querySelectorAll('.term-chip').length === 18, 'chapter key-term cloud renders 18 terms');
  assert(document.querySelectorAll('.outcome-list li').length === 10, 'chapter renders 10 learning outcomes');
  assert(document.querySelectorAll('.quick-formula').length === 8, 'chapter renders 8 quick formulas');
  assert(document.querySelectorAll('.roadmap-card').length === 15, 'chapter roadmap renders 15 section-wise notes');
  assert(document.querySelector('.vector-stats > div:nth-child(3) strong').textContent.trim() === '31', 'chapter counts 31 unique diagrams');
  assert(document.querySelector('.vector-hero-figure svg.inline-figure'), 'chapter hero SVG is inlined');

  click(document.querySelector('[data-lang="bn"]'), 'BN language button');
  await settle();
  assert(document.documentElement.lang === 'bn', 'language switches back to Bangla');
  assert(/XY-তলে অভিক্ষেপ/.test(document.querySelector('.vector-hero-figure svg').textContent), 'inline diagram labels switch back to Bangla');
  click(document.querySelector('[data-lang="en"]'), 'EN language button again');
  await settle();
  assert(document.documentElement.lang === 'en', 'language returns to English');

  go('#/topic/physics/vectors/scalars-and-vectors');
  await settle();
  assert(/Vector and scalar quantities/.test(document.querySelector('.article-header h1').textContent), 'topic route renders book-faithful note');
  assert(document.querySelectorAll('.content-section').length === 4, 'topic renders 4 sections');
  assert(document.querySelectorAll('.formula-box').length >= 2, 'formula blocks render');
  assert(document.querySelectorAll('.toc-link').length === 4, 'table of contents renders');
  assert(document.querySelectorAll('.figure-frame').length >= 1, 'figure blocks render');
  assert(document.querySelector('.chapter-ribbon'), 'topic links back to the chapter guide');
  assert(window.localStorage.getItem('hsc:lastTopic') === 'physics/vectors/scalars-and-vectors', 'continue-reading state persists');

  click(document.querySelector('[data-action="mark-read"]'), 'mark read button');
  assert(document.querySelector('[data-action="mark-read"]').getAttribute('aria-pressed') === 'true', 'mark-read toggles pressed state');
  assert(/physics\/vectors\/scalars-and-vectors/.test(window.localStorage.getItem('hsc:read') || ''), 'read progress persists');

  go('#/topic/physics/vectors/types-of-vectors');
  await settle();
  assert(document.querySelectorAll('.figure-frame[data-figure-src*="kind-"]').length === 16, 'all sixteen vector types have diagrams');
  assert([...document.querySelectorAll('.formula-box .vector-symbol')].some(el => el.textContent === 'OP⃗'), 'one arrow spans the point pair OP');

  go('#/topic/physics/vectors/chapter-orientation');
  await settle();
  assert(document.querySelector('.glossary-block'), 'glossary block renders');
  assert(document.querySelectorAll('.compact-outcomes li').length === 10, 'outcomes block renders 10 goals');

  go('#/topic/physics/vectors/summary-and-equations');
  await settle();
  assert(document.querySelectorAll('.formula-card').length === 15, 'formula sheet renders 15 equations');

  go('#/topic/physics/vectors/calculus-in-physics');
  await settle();
  assert(document.querySelector('.figure-frame[data-figure-src*="velocity-time-graph.svg"]'), 'v–t integration diagram renders');

  click(document.querySelector('#searchTrigger'), 'search trigger');
  assert(document.querySelector('#searchModal').hidden === false, 'search modal opens');
  const input = document.querySelector('#searchInput');
  input.value = 'dot product';
  input.dispatchEvent(new window.Event('input', { bubbles: true }));
  assert(document.querySelectorAll('.search-result').length > 0, 'search returns results for "dot product"');
  input.value = 'gradient';
  input.dispatchEvent(new window.Event('input', { bubbles: true }));
  assert(document.querySelectorAll('.search-result').length > 0, 'chapter metadata and vector calculus are searchable');
  document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  assert(document.querySelector('#searchModal').hidden === true, 'Escape closes search');

  click(document.querySelector('#menuBtn'), 'mobile menu button');
  assert(document.querySelector('#sidebar').classList.contains('is-open'), 'mobile sidebar opens');
  assert(document.querySelector('#sidebarBackdrop').hidden === false, 'sidebar backdrop appears');
  click(document.querySelector('#menuBtn'), 'mobile menu button again');
  assert(!document.querySelector('#sidebar').classList.contains('is-open'), 'mobile sidebar closes');

  go('#/notes');
  assert(document.querySelectorAll('.filter-chip').length === 4, 'library filter chips render');
  assert(document.querySelectorAll('.note-card').length === 21, 'library shows 21 notes');
  click(document.querySelector('[data-filter="physics"]'), 'physics filter chip');
  assert(document.querySelectorAll('.note-card').length === 16, 'subject filter narrows library to 16 Physics notes');

  assert(!document.querySelector('link[href*="board/"]'), 'library uses only the main site styles');
  go('#/board/physics/vectors');
  await settle();
  assert(document.querySelectorAll('.board-reader .card').length === 85, 'board index renders all questions inside the shell');
  assert(document.querySelector('.board-reader a[href="#/board/physics/vectors/4"]'), 'board cards use app routes');
  assert(document.querySelector('link[href="board/reader-scoped.css"]'), 'board uses a separate scoped stylesheet');
  go('#/board/physics/vectors/4');
  await settle();
  assert(document.querySelectorAll('.board-reader .part').length === 4, 'question renders in shared reading pane');
  assert(document.querySelector('.board-branch.active') && document.querySelector('.vector-book .topic-link'), 'board and main-book branches stay accessible');
  assert(document.querySelector('.board-reader .answer summary').textContent.includes('Full solution'), 'English reading controls follow site language');
  const boardHash=window.location.hash;
  document.querySelector('.board-reader .answer').open=true;
  assert(document.querySelector('.board-reader .paper').textContent.includes('motorboat'), 'English includes the translated stimulus');
  click(document.querySelector('[data-lang="bn"]'), 'switch the same question to Bengali');
  await settle();
  assert(document.querySelector('.board-reader').lang==='bn' && document.querySelector('.board-reader .paper').textContent.includes('নৌকা'), 'original Bengali content restored');
  click(document.querySelector('[data-lang="en"]'), 'switch the same question back to English');
  await settle();
  assert(window.location.hash===boardHash && document.querySelector('.board-reader .answer').open && document.querySelector('.board-reader').lang==='en','language switch preserves question and open solution');
  click(document.querySelector('.board-reader [data-step="2"]'), 'board diagram step');
  assert(document.querySelector('.board-reader [data-step="2"]').getAttribute('aria-pressed') === 'true', 'mounted board diagram responds');
  go('#/notes');
  assert(!document.querySelector('link[href*="board/"]') && document.querySelectorAll('.note-card').length === 16, 'returning to notes restores an isolated library');
  go('#/does-not-exist');
  assert(document.querySelector('.not-found'), 'unknown hash shows not-found view');

  assert(errors.length === 0, `no runtime JS errors${errors.length ? `: ${errors.join(' | ')}` : ''}`);
  console.log(results.join('\n'));
  console.log(`\n✓ Smoke test passed (${results.length} checks).`);
} catch (error) {
  console.error(results.join('\n'));
  console.error(`\n✗ ${error.message}`);
  if (errors.length) console.error('Runtime errors:\n  - ' + errors.join('\n  - '));
  process.exitCode = 1;
} finally {
  window.close();
}
