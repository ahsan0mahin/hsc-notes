import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Load order matters: registry → subject → chapter add-ons → app is last in index.html.
const dataFiles = [
  'data/registry.js',
  'data/physics.js',
  'data/physics-vectors.js',
  'data/chemistry.js',
  'data/higher-math.js'
];

const context = vm.createContext({ window: {}, console });
for (const file of dataFiles) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) throw new Error(`Missing ${file}`);
  vm.runInContext(fs.readFileSync(fullPath, 'utf8'), context, { filename: file });
}

const notes = context.window.HSC_NOTES;
const errors = [];
const allowedBlocks = new Set([
  'p', 'list', 'steps', 'formula', 'callout', 'example', 'table', 'qa',
  'figure', 'glossary', 'outcomes', 'formulaGrid'
]);
const allowedTones = new Set(['tip', 'warning', 'info', 'activity']);

const fail = (where, message) => errors.push(`${where}: ${message}`);
const isObject = value => value && typeof value === 'object' && !Array.isArray(value);
const isBi = value => isObject(value) && typeof value.bn === 'string' && value.bn.trim() && typeof value.en === 'string' && value.en.trim();
const isText = value => typeof value === 'string' && value.trim();
const isLabel = value => (typeof value === 'string' || typeof value === 'number') && String(value).trim();

function checkBiDeep(value, where) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => checkBiDeep(item, `${where}[${index}]`));
    return;
  }
  if (!isObject(value)) return;
  if ('bn' in value || 'en' in value) {
    if (!isBi(value)) fail(where, 'bn and en must both be non-empty strings');
    return;
  }
  for (const [key, child] of Object.entries(value)) checkBiDeep(child, `${where}.${key}`);
}

function requireBi(value, where) {
  if (!isBi(value)) fail(where, 'must be t("বাংলা", "English")');
}

function checkFigure(block, where) {
  requireBi(block.caption, `${where}.caption`);
  requireBi(block.alt, `${where}.alt`);
  if (!isText(block.src) || !/^assets\/[a-z0-9/_-]+\.svg$/i.test(block.src) || block.src.includes('..')) {
    fail(`${where}.src`, 'must be an existing local assets/*.svg path');
    return;
  }
  const base = path.join(root, block.src);
  const bn = base.replace(/\.svg$/, '.bn.svg');
  const en = base.replace(/\.svg$/, '.en.svg');
  if (!fs.existsSync(base) || !fs.existsSync(bn) || !fs.existsSync(en)) {
    fail(`${where}.src`, 'base SVG plus .bn.svg and .en.svg variants must all exist');
    return;
  }
  if (!fs.readFileSync(base, 'utf8').includes('data-bn=') || !fs.readFileSync(base, 'utf8').includes('data-en=')) {
    fail(`${where}.src`, 'base SVG must carry data-bn / data-en labels for live language switching');
  }
}

function validateOutcome(item, where) {
  if (!isObject(item)) { fail(where, 'must be an object'); return; }
  if (!isLabel(item.no)) fail(`${where}.no`, 'must be a non-empty label');
  requireBi(item.text, `${where}.text`);
  if (item.section !== undefined) requireBi(item.section, `${where}.section`);
}

function validateEquation(item, where) {
  if (!isObject(item)) { fail(where, 'must be an object'); return; }
  if (!isLabel(item.no)) fail(`${where}.no`, 'must be a non-empty label');
  if (!isText(item.math)) fail(`${where}.math`, 'must be a non-empty string');
  if (item.note !== undefined) requireBi(item.note, `${where}.note`);
}

function validateBlock(block, where, depth = 0) {
  if (depth > 4) {
    fail(where, 'nested blocks are too deep');
    return;
  }
  if (!isObject(block) || !allowedBlocks.has(block.type)) {
    fail(where, `unknown block type "${block?.type ?? 'missing'}"`);
    return;
  }

  switch (block.type) {
    case 'p':
      requireBi(block.text, `${where}.text`);
      break;
    case 'list':
    case 'steps':
      if (!Array.isArray(block.items) || !block.items.length) fail(where, 'items must be a non-empty array');
      else block.items.forEach((item, i) => requireBi(item, `${where}.items[${i}]`));
      break;
    case 'formula':
      if (!isText(block.math)) fail(`${where}.math`, 'must be a non-empty string');
      if (block.caption !== undefined) requireBi(block.caption, `${where}.caption`);
      break;
    case 'callout':
      if (!allowedTones.has(block.tone)) fail(`${where}.tone`, 'must be tip, warning, info or activity');
      requireBi(block.title, `${where}.title`);
      requireBi(block.text, `${where}.text`);
      break;
    case 'example':
      requireBi(block.title, `${where}.title`);
      if (!Array.isArray(block.blocks) || !block.blocks.length) fail(where, 'blocks must be a non-empty array');
      else block.blocks.forEach((child, i) => validateBlock(child, `${where}.blocks[${i}]`, depth + 1));
      break;
    case 'table':
      if (!Array.isArray(block.head) || !block.head.length) fail(`${where}.head`, 'must be a non-empty array');
      else block.head.forEach((cell, i) => requireBi(cell, `${where}.head[${i}]`));
      if (!Array.isArray(block.rows) || !block.rows.length) fail(`${where}.rows`, 'must be a non-empty array');
      else block.rows.forEach((row, r) => {
        if (!Array.isArray(row)) fail(`${where}.rows[${r}]`, 'must be an array');
        else row.forEach((cell, c) => requireBi(cell, `${where}.rows[${r}][${c}]`));
      });
      break;
    case 'qa':
      requireBi(block.question, `${where}.question`);
      requireBi(block.answer, `${where}.answer`);
      break;
    case 'figure':
      checkFigure(block, where);
      break;
    case 'glossary':
      if (!Array.isArray(block.items) || !block.items.length) fail(where, 'items must be a non-empty array');
      else block.items.forEach((item, i) => {
        requireBi(item?.term, `${where}.items[${i}].term`);
        requireBi(item?.meaning, `${where}.items[${i}].meaning`);
      });
      break;
    case 'outcomes':
      if (!Array.isArray(block.items) || !block.items.length) fail(where, 'items must be a non-empty array');
      else block.items.forEach((item, i) => validateOutcome(item, `${where}.items[${i}]`));
      break;
    case 'formulaGrid':
      if (!Array.isArray(block.items) || !block.items.length) fail(where, 'items must be a non-empty array');
      else block.items.forEach((item, i) => validateEquation(item, `${where}.items[${i}]`));
      break;
  }
}

function validateChapterMeta(meta, where) {
  if (!isObject(meta)) { fail(where, 'must be an object'); return; }
  requireBi(meta.bookChapter, `${where}.bookChapter`);
  requireBi(meta.bookTitle, `${where}.bookTitle`);
  requireBi(meta.intro, `${where}.intro`);
  requireBi(meta.bigIdea, `${where}.bigIdea`);
  requireBi(meta.sourceNote, `${where}.sourceNote`);
  if (!Array.isArray(meta.keyTerms) || !meta.keyTerms.length) fail(`${where}.keyTerms`, 'must be a non-empty array');
  else meta.keyTerms.forEach((term, i) => requireBi(term, `${where}.keyTerms[${i}]`));
  if (!Array.isArray(meta.outcomes) || !meta.outcomes.length) fail(`${where}.outcomes`, 'must be a non-empty array');
  else meta.outcomes.forEach((item, i) => validateOutcome(item, `${where}.outcomes[${i}]`));
  if (!Array.isArray(meta.quickFormulas) || !meta.quickFormulas.length) fail(`${where}.quickFormulas`, 'must be a non-empty array');
  else meta.quickFormulas.forEach((item, i) => validateEquation(item, `${where}.quickFormulas[${i}]`));
  checkFigure(meta.figure, `${where}.figure`);
  checkBiDeep(meta, where);
}

if (!notes || !Array.isArray(notes.subjects) || !notes.subjects.length) {
  errors.push('No subjects registered. Check data/registry.js load order.');
} else {
  const subjectIds = new Set();
  const topicKeys = new Set();
  let topicCount = 0;
  let chapterCount = 0;

  for (const subject of notes.subjects) {
    const sw = `subject(${subject?.id ?? '?'})`;
    if (!isText(subject.id) || !/^[a-z0-9-]+$/.test(subject.id)) fail(sw, 'id must be a lowercase kebab-case string');
    if (subjectIds.has(subject.id)) fail(sw, 'duplicate subject id');
    subjectIds.add(subject.id);
    if (!Number.isFinite(subject.order)) fail(sw, 'order must be a number');
    if (!isText(subject.icon)) fail(sw, 'icon must be a non-empty string');
    if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(subject.accent || '')) fail(sw, 'accent must be a hex color');
    requireBi(subject.title, `${sw}.title`);
    requireBi(subject.description, `${sw}.description`);
    if (!Array.isArray(subject.chapters) || !subject.chapters.length) fail(sw, 'chapters must be a non-empty array');

    const chapterIds = new Set();
    for (const chapter of subject.chapters || []) {
      chapterCount += 1;
      const cw = `${sw}.chapter(${chapter?.id ?? '?'})`;
      if (!isText(chapter.id) || !/^[a-z0-9-]+$/.test(chapter.id)) fail(cw, 'id must be a lowercase kebab-case string');
      if (chapterIds.has(chapter.id)) fail(cw, 'duplicate chapter id in this subject');
      chapterIds.add(chapter.id);
      if (!Number.isFinite(chapter.order)) fail(cw, 'order must be a number');
      if (chapter.featured !== undefined && typeof chapter.featured !== 'boolean') fail(cw, 'featured must be true or false');
      requireBi(chapter.title, `${cw}.title`);
      requireBi(chapter.description, `${cw}.description`);
      if (!Array.isArray(chapter.topics)) fail(cw, 'topics must be an array');
      if (chapter.meta !== undefined) validateChapterMeta(chapter.meta, `${cw}.meta`);

      const topicIds = new Set();
      for (const topic of chapter.topics || []) {
        topicCount += 1;
        const tw = `${cw}.topic(${topic?.id ?? '?'})`;
        if (!isText(topic.id) || !/^[a-z0-9-]+$/.test(topic.id)) fail(tw, 'id must be a lowercase kebab-case string');
        if (topicIds.has(topic.id)) fail(tw, 'duplicate topic id in this chapter');
        topicIds.add(topic.id);
        const key = `${subject.id}/${chapter.id}/${topic.id}`;
        if (topicKeys.has(key)) fail(tw, 'duplicate topic path');
        topicKeys.add(key);
        if (topic.draft !== undefined && typeof topic.draft !== 'boolean') fail(tw, 'draft must be true or false');
        if (!Number.isFinite(topic.order)) fail(tw, 'order must be a number');
        if (!Number.isFinite(topic.readingTime) || topic.readingTime <= 0) fail(tw, 'readingTime must be a positive number');
        if (!/^\d{4}-\d{2}-\d{2}$/.test(topic.updated || '') || Number.isNaN(Date.parse(`${topic.updated}T00:00:00Z`))) fail(tw, 'updated must be a valid YYYY-MM-DD date');
        if (topic.sectionNo !== undefined) requireBi(topic.sectionNo, `${tw}.sectionNo`);
        if (!Array.isArray(topic.tags)) fail(tw, 'tags must be an array');
        else topic.tags.forEach((tag, i) => { if (!isText(tag)) fail(`${tw}.tags[${i}]`, 'must be a non-empty string'); });
        requireBi(topic.title, `${tw}.title`);
        requireBi(topic.summary, `${tw}.summary`);
        if (!Array.isArray(topic.sections) || !topic.sections.length) fail(tw, 'sections must be a non-empty array');
        else topic.sections.forEach((section, s) => {
          const secw = `${tw}.sections[${s}]`;
          requireBi(section?.title, `${secw}.title`);
          if (!Array.isArray(section?.blocks) || !section.blocks.length) fail(secw, 'blocks must be a non-empty array');
          else section.blocks.forEach((block, b) => validateBlock(block, `${secw}.blocks[${b}]`));
        });
        checkBiDeep(topic, tw);
      }
    }
  }

  if (!errors.length) {
    console.log(`✓ Content valid: ${notes.subjects.length} subjects, ${chapterCount} chapters, ${topicCount} topics.`);
  }
}

if (errors.length) {
  console.error(`✗ ${errors.length} content problem(s):`);
  errors.forEach(error => console.error(`  - ${error}`));
  process.exitCode = 1;
}
