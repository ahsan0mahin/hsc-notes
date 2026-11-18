# Content Guide / কনটেন্ট গাইড

এই site-এ **content = data**. HTML হাতে লিখতে হয় না, Markdown build করতে হয় না। AI agent বা আপনি শুধু `data/*.js` edit করেন; `app.js` automatically menu, search, routes, cards আর article বানিয়ে নেয়।

---

## 1. Golden rules ✅

1. **প্রতিটা দৃশ্যমান string দ্বিভাষিক হতে হবে:** `t('বাংলা', 'English')`।
2. Plain string শুধু এখানে অনুমোদিত: `id`, `icon`, `accent`, `tags`, `math`, `updated`, `type`, `tone`।
3. `id` হবে lowercase kebab-case: `dot-and-cross-product`, `quantum-numbers`।
4. `id` unique হতে হবে নিজের parent-এর মধ্যে (subject / chapter / topic)।
5. `order` দিয়ে sidebar ও chapter-list sort হয়।
6. `updated` হবে `YYYY-MM-DD`, `readingTime` positive number, `tags` string array।
7. `draft: true` দিলে topic menu/search/library থেকে লুকানো থাকবে, কিন্তু direct link-এ খুলবে — লেখা চলাকালীন কাজে লাগে।
8. নতুন topic দেওয়ার পর **`npm run validate`** চালান; UI change দরকার নেই।

---

## 2. Structure

```text
subject
 └─ chapters[]
     └─ topics[]
         └─ sections[]
             └─ blocks[]
```

| Level | Required fields |
| --- | --- |
| subject | `id`, `order`, `icon`, `accent`, `title`, `description`, `chapters` |
| chapter | `id`, `order`, `title`, `description`, `topics` |
| topic | `id`, `order`, `readingTime`, `updated`, `tags`, `title`, `summary`, `sections` |
| section | `title`, `blocks` |
| block | `type` + type-specific fields |

`title`, `description`, `summary`, section `title`, `p.text`, list items, table cells, callout title/text, `qa.question/answer`, `example.title`, `formula.caption` — সব `t()` object।

`formula.math` একটা **plain string** (Unicode formula), কারণ গণিতের সূত্র ভাষা-নিরপেক্ষ।

---

## 3. Helpers (`data/registry.js`)

Subject file-এর ভিতরে এভাবে destructuring করুন:

```js
(function (notes) {
  const {
    t, section, p, list, steps, formula,
    tip, warning, info, example, table, qa
  } = notes;

  notes.register({ /* subject */ });
})(window.HSC_NOTES);
```

| Helper | ব্যবহার |
| --- | --- |
| `t(bn, en)` | যেকোনো দ্বিভাষিক text |
| `section(title, blocks)` | একটা article section |
| `p(text)` | paragraph |
| `list([t(), t()])` | bullet list |
| `steps([t(), t()])` | numbered step list |
| `formula('a² + b² = c²', t(...))` | formula box + optional caption |
| `tip(title, text)` | সবুজ callout |
| `warning(title, text)` | লাল callout |
| `info(title, text)` | নীল callout |
| `example(title, [blocks])` | nested example box |
| `table([head...], [[cells...], ...])` | responsive table |
| `qa(question, answer)` | collapsible Q&A |

Inline formatting supported inside `t()`: `**bold**` আর `` `code` ``। Raw HTML লিখবেন না — escaped হয়ে যাবে।

---

## 4. Copy-paste topic template

`data/physics.js` → কোনো chapter-এর `topics: [ ... ]` array-তে বসান:

```js
{
  id: 'vector-resolution',
  order: 4,
  readingTime: 7,
  updated: '2026-11-19',
  tags: ['vector', 'components', 'resolution'],
  // draft: true, // প্রকাশের আগে লুকিয়ে রাখতে চাইলে
  title: t('ভেক্টরের উপাংশে বিশ্লেষণ', 'Resolution of a vector'),
  summary: t(
    'কোনো ভেক্টরকে লম্ব অক্ষে ভাঙা ও আবার জোড়া লাগানো।',
    'Splitting a vector into perpendicular components and rebuilding it.'
  ),
  sections: [
    section(t('মূল ধারণা', 'Core idea'), [
      p(t(
        '`A⃗` কে x ও y অক্ষে ভাঙলে `Aₓ = A cosθ` ও `Aᵧ = A sinθ` পাওয়া যায়।',
        'Resolving `A⃗` along x and y gives `Aₓ = A cosθ` and `Aᵧ = A sinθ`.'
      )),
      formula('A⃗ = Aₓî + Aᵧĵ', t('উপাংশ আকারে ভেক্টর।', 'Vector in component form.')),
      list([
        t('`θ` সবসময় ধনাত্মক x-অক্ষ থেকে মাপুন।', 'Measure `θ` from the positive x-axis.'),
        t('Quadrant অনুযায়ী উপাংশের চিহ্ন বদলায়।', 'Component signs change by quadrant.')
      ]),
      tip(t('মনে রাখুন', 'Remember'), t(
        '`cos` পাশের উপাংশ, `sin` উল্লম্ব উপাংশ — যদি কোণ x-অক্ষ থেকে হয়।',
        '`cos` gives the adjacent component, `sin` the vertical one—when the angle is from x.'
      ))
    ]),
    section(t('ধাপে ধাপে', 'Step by step'), [
      steps([
        t('কোণটি কোন অক্ষ থেকে মাপা হচ্ছে তা ঠিক করুন।', 'Identify the reference axis for the angle.'),
        t('উপাংশ বের করুন ও চিহ্ন বসান।', 'Compute components and assign signs.'),
        t('`√(Aₓ² + Aᵧ²)` দিয়ে যাচাই করুন।', 'Verify with `√(Aₓ² + Aᵧ²)`.')
      ]),
      example(t('`A = 10`, `θ = 30°`', '`A = 10`, `θ = 30°`'), [
        p(t('`Aₓ = 10 cos30° = 5√3`, `Aᵧ = 10 sin30° = 5`।', '`Aₓ = 10 cos30° = 5√3`, `Aᵧ = 10 sin30° = 5`.'))
      ])
    ]),
    section(t('তুলনা ও প্রশ্ন', 'Comparison and practice'), [
      table(
        [t('রাশি', 'Quantity'), t('সূত্র', 'Formula')],
        [
          [t('x উপাংশ', 'x component'), t('`A cosθ`', '`A cosθ`')],
          [t('y উপাংশ', 'y component'), t('`A sinθ`', '`A sinθ`')]
        ]
      ),
      warning(t('সাধারণ ভুল', 'Common mistake'), t(
        'কোণ y-অক্ষ থেকে দেওয়া থাকলে `sin`/`cos` বদলে যাবে।',
        'If the angle is measured from y, `sin` and `cos` swap.'
      )),
      qa(t('উপাংশ দুটো লম্ব কেন?', 'Why are components perpendicular?'), t(
        'কারণ অক্ষ দুটো পরস্পর লম্ব; তাই পিথাগোরাস প্রযোজ্য।',
        'Because the axes are perpendicular, so Pythagoras applies.'
      ))
    ])
  ]
}
```

---

## 5. নতুন chapter add করা

একই subject-এর `chapters: [...]` array-তে:

```js
{
  id: 'newtonian-mechanics',
  order: 3,
  title: t('নিউটনীয় বলবিদ্যা', 'Newtonian mechanics'),
  description: t('গতির সূত্র ও প্রয়োগ।', 'Laws of motion and applications.'),
  topics: [
    /* উপরের template এখানে */
  ]
}
```

খালি রাখতে চাইলে `topics: []` দিলেও চলবে — sidebar-এ “শিগগিরই / Coming soon” দেখাবে।

---

## 6. নতুন subject add করা

1. `data/biology.js` এর মতো নতুন file বানান:

```js
(function (notes) {
  const { t } = notes;
  notes.register({
    id: 'biology',
    order: 4,
    icon: '🧬',
    accent: '#ec4899',
    title: t('জীববিজ্ঞান', 'Biology'),
    description: t('নতুন বিষয়ের নোট।', 'Notes for the new subject.'),
    chapters: []
  });
})(window.HSC_NOTES);
```

2. `index.html`-এ `app.js`-এর **আগে** script tag যোগ করুন:

```html
<script defer src="data/biology.js"></script>
<script defer src="app.js"></script>
```

3. `npm run validate` চালান। Sidebar, search, home card নিজে থেকে তৈরি হয়ে যাবে।

---

## 7. Validation / tests

```bash
npm run validate   # no dependency — schema, bilingual fields, unique ids, dates, block types
npm test           # optional — needs `npm install` for jsdom; 38+ runtime UI checks
```

Validator যা ধরে:

- `{ bn, en }` এর একটা ফাঁকা বা missing
- duplicate subject/chapter/topic id
- unknown block type / tone
- invalid date, invalid `accent`, missing `readingTime`
- plain string ব্যবহার হয়েছে এমন required bilingual field

---

## 8. AI agent prompt (copy-paste)

```text
You are editing the HSC Notes static site.

Read CONTENT_GUIDE.md, data/registry.js and the relevant subject file first.
Add ONE new topic under chapter "<chapter-id>" of subject "<subject-id>":
- id: "<kebab-case-id>", order: <next number>, readingTime: <minutes>, updated: "YYYY-MM-DD"
- tags: 3–5 relevant lowercase strings
- title, summary, every section title and EVERY visible block text MUST use t("বাংলা", "English")
- use only helpers from registry.js: section, p, list, steps, formula, tip, warning, info, example, table, qa
- write real HSC-level content: definitions, 2–4 formulas, one worked example, one common mistake, 2 Q&A
- formula math stays a plain Unicode string; captions are bilingual
- do not edit app.js, styles.css or index.html unless adding a new subject file
- keep IDs unique and do not break existing topics
- run `npm run validate` and `npm test`, then report what you added
```

আরও ছোট version:

> `CONTENT_GUIDE.md` follow kore `data/chemistry.js`-e `chemical-bonding` chapter-e `id: "coordinate-bond"` topic add koro; Bangla + English complete likho, helper chara raw HTML na, validate + test chalao.

---

## 9. Why this is efficient

- **No build step:** GitHub Pages directly serve করে।
- **One topic = one object:** diff ছোট, AI agent confuse হয় না।
- **One place for translations:** `t()` — ভাষা বদলালে আলাদা file sync করতে হয় না।
- **Auto everything:** নতুন topic দিলেই menu, search index, latest notes, prev/next, progress, library filter আপডেট হয়।
- **Safe:** validator + smoke test ভুল content/runtime আগেই ধরে।

Happy note-taking 📚
