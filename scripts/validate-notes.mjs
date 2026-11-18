import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataFiles = [
  'data/registry.js',
  'data/physics.js',
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
const allowedBlocks = new Set(['p', 'list', 'steps', 'formula', 'callout', 'example', 'table', 'qa']);
const allowedTones = new Set(['tip', 'warning', 'info']);

const fail = (where, message) => errors.push(`${where}: ${message}`);
const isObject = value => value && typeof value === 'object' && !Array.isArray(value);
const isBi = value => isObject(value) && typeof value.bn === 'string' && value.bn.trim() && typeof value.en === 'string' && value.en.trim();
const isText = value => typeof value === 'string' && value.trim();

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
      if (!allowedTones.has(block.tone)) fail(`${where}.tone`, 'must be tip, warning or info');
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
  }
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
      requireBi(chapter.title, `${cw}.title`);
      requireBi(chapter.description, `${cw}.description`);
      if (!Array.isArray(chapter.topics)) fail(cw, 'topics must be an array');

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
