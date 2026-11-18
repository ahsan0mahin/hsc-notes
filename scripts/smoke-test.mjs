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

await new Promise(resolve => {
  if (document.readyState === 'complete') resolve();
  else window.addEventListener('load', resolve, { once: true });
  setTimeout(resolve, 1500);
});
await new Promise(resolve => setTimeout(resolve, 120));

try {
  assert(document.querySelector('.hero'), 'home hero renders');
  assert(document.querySelectorAll('.subject-card').length === 3, '3 subject cards render');
  assert(document.querySelectorAll('.topic-link').length === 9, 'sidebar lists 9 published topics');
  assert(document.querySelectorAll('.note-card').length === 6, 'home shows 6 latest notes');
  assert(document.documentElement.dataset.theme === 'dark', 'dark theme is default');
  assert(document.documentElement.lang === 'bn', 'Bangla is default');

  click(document.querySelector('[data-lang="en"]'), 'EN language button');
  assert(document.documentElement.lang === 'en', 'language switches to English');
  assert(window.localStorage.getItem('hsc:lang') === 'en', 'language choice persists');
  assert(/Every HSC note/.test(document.querySelector('.hero h1').textContent), 'hero copy translates');

  click(document.querySelector('#themeBtn'), 'theme button');
  assert(document.documentElement.dataset.theme === 'light', 'theme switches to light');
  assert(window.localStorage.getItem('hsc:theme') === 'light', 'theme choice persists');

  go('#/subject/physics');
  assert(document.querySelector('.page-hero h1').textContent.trim() === 'Physics', 'subject route renders Physics');
  assert(document.querySelectorAll('.chapter-card').length === 2, 'Physics shows 2 chapters');

  go('#/topic/physics/vectors/scalars-and-vectors');
  assert(/Scalars and vectors/.test(document.querySelector('.article-header h1').textContent), 'topic route renders note');
  assert(document.querySelectorAll('.content-section').length === 4, 'topic renders 4 sections');
  assert(document.querySelectorAll('.formula-box').length >= 2, 'formula blocks render');
  assert(document.querySelectorAll('.toc-link').length === 4, 'table of contents renders');
  assert(window.localStorage.getItem('hsc:lastTopic') === 'physics/vectors/scalars-and-vectors', 'continue-reading state persists');

  click(document.querySelector('[data-action="mark-read"]'), 'mark read button');
  assert(document.querySelector('[data-action="mark-read"]').getAttribute('aria-pressed') === 'true', 'mark-read toggles pressed state');
  assert(/physics\/vectors\/scalars-and-vectors/.test(window.localStorage.getItem('hsc:read') || ''), 'read progress persists');

  click(document.querySelector('#searchTrigger'), 'search trigger');
  assert(document.querySelector('#searchModal').hidden === false, 'search modal opens');
  const input = document.querySelector('#searchInput');
  input.value = 'dot product';
  input.dispatchEvent(new window.Event('input', { bubbles: true }));
  assert(document.querySelectorAll('.search-result').length > 0, 'search returns results for "dot product"');
  document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  assert(document.querySelector('#searchModal').hidden === true, 'Escape closes search');

  click(document.querySelector('#menuBtn'), 'mobile menu button');
  assert(document.querySelector('#sidebar').classList.contains('is-open'), 'mobile sidebar opens');
  assert(document.querySelector('#sidebarBackdrop').hidden === false, 'sidebar backdrop appears');
  click(document.querySelector('#menuBtn'), 'mobile menu button again');
  assert(!document.querySelector('#sidebar').classList.contains('is-open'), 'mobile sidebar closes');

  go('#/notes');
  assert(document.querySelectorAll('.filter-chip').length === 4, 'library filter chips render');
  assert(document.querySelectorAll('.note-card').length === 9, 'library shows 9 notes');
  click(document.querySelector('[data-filter="physics"]'), 'physics filter chip');
  assert(document.querySelectorAll('.note-card').length === 4, 'subject filter narrows library to 4 Physics notes');

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
