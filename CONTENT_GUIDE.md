# Content Guide / কনটেন্ট গাইড

এই site-এ **content = data**. HTML হাতে লিখতে হয় না, Markdown build করতে হয় না। AI agent বা আপনি শুধু `data/*.js` edit করেন; `app.js` automatically menu, search, routes, cards, chapter landing page আর article বানিয়ে নেয়।

Vector chapter-এর মতো বড় অধ্যায়ের জন্য `data/physics-vectors.js` একটা **chapter add-on file** — এটা মূল `data/physics.js`-এ `registerChapter('physics', …)` দিয়ে chapter যোগ করে।

---

## 1. Golden rules ✅

1. **প্রতিটা দৃশ্যমান string দ্বিভাষিক হতে হবে:** `t('বাংলা', 'English')`।
2. Plain string শুধু এখানে অনুমোদিত: `id`, `icon`, `accent`, `tags`, `math`, `updated`, `type`, `tone`, `src`, `no`, `order`, `readingTime`, `featured`। `sectionNo` সহ বাকি সব visible field `t()` object।
3. `id` হবে lowercase kebab-case: `dot-and-cross-product`, `quantum-numbers`।
4. `id` unique হতে হবে নিজের parent-এর মধ্যে (subject / chapter / topic)।
5. `order` দিয়ে sidebar ও chapter-list sort হয়; `updated` `YYYY-MM-DD`, `readingTime` positive number, `tags` string array।
6. `draft: true` দিলে topic menu/search/library থেকে লুকানো থাকবে, কিন্তু direct link-এ খুলবে।
7. `figure()` ব্যবহার করলে `src` হবে base `assets/.../name.svg`; সাথে `name.bn.svg` ও `name.en.svg` থাকতেই হবে এবং base SVG-র প্রতিটা `<text>`-এ `data-bn` / `data-en` attribute থাকতে হবে।
8. নতুন topic দেওয়ার পর **`npm run validate`** চালান; সাধারণত UI change দরকার নেই। নতুন data file দিলে `index.html` ও `scripts/validate-notes.mjs`-এ load order আপডেট করুন।

---

## 2. Structure

```text
subject
 └─ chapters[]
     ├─ meta{}                (optional: rich chapter landing page)
     └─ topics[]
         └─ sections[]
             └─ blocks[]
```

| Level | Required fields | Optional |
| --- | --- | --- |
| subject | `id`, `order`, `icon`, `accent`, `title`, `description`, `chapters` | — |
| chapter | `id`, `order`, `title`, `description`, `topics` | `featured`, `meta` |
| chapter.meta | `bookChapter`, `bookTitle`, `intro`, `bigIdea`, `sourceNote`, `keyTerms`, `outcomes`, `quickFormulas`, `figure` | — |
| topic | `id`, `order`, `readingTime`, `updated`, `tags`, `title`, `summary`, `sections` | `sectionNo`, `draft` |
| section | `title`, `blocks` | — |
| block | `type` + type-specific fields | — |

`chapter.meta` থাকলে `app.js` একটা polished chapter guide বানায়: hero diagram, key-term cloud, learning outcomes, quick formula sheet এবং section-wise roadmap। `featured: true` থাকলে home ও sidebar-এ shortcut আসে।

`title`, `description`, `summary`, `sectionNo`, section `title`, `p.text`, list items, table cells, callout title/text, `qa.question/answer`, `example.title`, `formula.caption`, `figure.caption/alt`, glossary term/meaning — সব `t()` object।

`formula.math`, `formulaGrid[].math` ও `figure.src` **plain string**: গণিত ও file path ভাষা-নিরপেক্ষ। `outcome.no` / `equation.no` ও plain label।

---

## 3. Helpers (`data/registry.js`)

Subject / chapter add-on file-এর ভিতরে এভাবে destructuring করুন:

```js
(function (notes) {
  const {
    t, section, p, list, steps, formula,
    tip, warning, info, activity, example, table, qa,
    figure, term, glossary, outcome, outcomes, equation, formulaGrid
  } = notes;

  notes.registerChapter('physics', { /* chapter */ });
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
| `activity(title, text)` | বেগুনি “নিজে করো / Try it” callout |
| `example(title, [blocks])` | nested example box |
| `table([head...], [[cells...], ...])` | responsive table |
| `qa(question, answer)` | collapsible Q&A |
| `figure(src, caption, alt)` | language-aware SVG diagram; caption/alt দ্বিভাষিক |
| `term(name, meaning)` | glossary entry |
| `glossary([term(), ...])` | definition card grid |
| `outcome(no, text, sectionRef)` | single learning outcome |
| `outcomes([...])` | compact outcome list |
| `equation(no, math, note)` | formula-sheet entry |
| `formulaGrid([...])` | equation card grid |
| `notes.register(subject)` | নতুন subject register |
| `notes.registerChapter(subjectId, chapter)` | আগে-registered subject-এ বড় chapter যোগ |

Inline formatting supported inside `t()`: `**bold**` আর `` `code` ``। Raw HTML লিখবেন না — escaped হয়ে যাবে।

### ভাষা-সচেতন diagram কীভাবে কাজ করে

`figure('assets/vector/name.svg', …)` দিলে app প্রথমে `name.bn.svg` বা `name.en.svg` কে `<img>` fallback হিসেবে দেখায়, তারপর base `name.svg` কে same-origin `fetch()` দিয়ে inline করে। Base SVG-তে এমন label থাকে:

```svg
<text x="40" y="60" data-bn="লম্ব উপাংশ" data-en="Rectangular components">লম্ব উপাংশ</text>
```

Language toggle-এ `data-bn` / `data-en` থেকে `textContent` বদলে যায়; inline SVG-র hardcoded hex রং `styles.css`-এর attribute selectors দিয়ে `--text`, `--muted`, `--primary`, `--primary-2`, `--warning` ইত্যাদিতে map হয়। তাই dark/light দুটোতেই diagram পরিষ্কার থাকে।

---

## 4. Copy-paste topic template

`data/physics-vectors.js` → Vector chapter-এর `topics: [ ... ]` array-তে বসান:

```js
{
  id: 'vector-applications',
  order: 16,
  sectionNo: t('২.৬', '2.6'),
  readingTime: 7,
  updated: '2026-11-19',
  tags: ['vector', 'components', 'applications'],
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
      figure(
        'assets/vector/resolution.svg',
        t('চিত্র: R⃗ কে X⃗ ও Y⃗ তে বিভাজন।', 'Figure: resolving R⃗ into X⃗ and Y⃗.'),
        t('আয়তক্ষেত্রে কর্ণ R⃗ ও লম্ব উপাংশ X, Y।', 'Rectangle with diagonal R⃗ and perpendicular components X, Y.')
      ),
      glossary([
        term(t('উপাংশ', 'Component'), t('ভেক্টর ভাঙলে পাওয়া অংশ।', 'A part obtained by resolving a vector.')),
        term(t('লম্বাংশ', 'Rectangular component'), t('উপাংশ দুটি পরস্পর লম্ব হলে।', 'Components that are perpendicular to each other.'))
      ]),
      activity(t('কাগজে আঁকো', 'Draw it on paper'), t(
        '`R = 10`, `α = 30°` ধরে X ও Y বের করে `√(X²+Y²)` দিয়ে যাচাই করো।',
        'Take `R = 10`, `α = 30°`, find X and Y, then verify with `√(X²+Y²)`.'
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

`formulaGrid()` ব্যবহার করলে `equation('2.1', 'R = √[P²+Q²+2PQ cos α]', t(…))` এর মতো item দিন; `no` ও `math` plain, `note` দ্বিভাষিক।

---

## 5. নতুন chapter add করা

ছোট chapter হলে একই subject-এর `chapters: [...]` array-তে:

```js
{
  id: 'newtonian-mechanics',
  order: 3,
  title: t('নিউটনীয় বলবিদ্যা', 'Newtonian mechanics'),
  description: t('গতির সূত্র ও প্রয়োগ।', 'Laws of motion and applications.'),
  topics: [ /* উপরের template */ ]
}
```

বড় chapter-কে আলাদা file-এ রাখতে (`data/physics-vectors.js`-এর মতো):

```js
(function (notes) {
  notes.registerChapter('physics', {
    id: 'new-chapter',
    order: 3,
    featured: true,
    title: t('নতুন অধ্যায়', 'New chapter'),
    description: t('অধ্যায়ের সংক্ষিপ্ত পরিচিতি।', 'Short chapter description.'),
    meta: {
      bookChapter: t('অধ্যায় ৩', 'Chapter 3'),
      bookTitle: t('পদার্থবিজ্ঞান — প্রথম পত্র', 'Physics — First Paper'),
      intro: t('…', '…'),
      bigIdea: t('…', '…'),
      sourceNote: t('…', '…'),
      keyTerms: [t('…', '…')],
      outcomes: [notes.outcome(1, t('…', '…'), t('৩.১', '3.1'))],
      quickFormulas: [notes.equation('3.1', 'F = ma', t('…', '…'))],
      figure: {
        src: 'assets/vector/resolution.svg',
        caption: t('…', '…'),
        alt: t('…', '…')
      }
    },
    topics: [ /* topic objects */ ]
  });
})(window.HSC_NOTES);
```

খালি রাখতে `topics: []` দিলেও চলবে। তবে add-on file হলে:

1. `index.html`-এ **মূল subject file-এর পরে, `app.js`-এর আগে** `<script defer src="data/new-chapter.js"></script>` যোগ করুন।
2. `scripts/validate-notes.mjs`-এর `dataFiles` array-তেও একই load order-এ file-টি যোগ করুন।
3. `npm run validate` ও `npm test` চালান।

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

3. Validator-এর `dataFiles`-এ file-টি যোগ করুন ও `npm run validate` চালান। Sidebar, search, home card নিজে থেকে তৈরি হয়ে যাবে।

---

## 7. Validation / tests

```bash
npm run validate   # no dependency — schema, bilingual fields, unique ids, dates, blocks, SVG variants
npm test           # optional — needs `npm install` for jsdom; 60 runtime UI checks
```

Validator যা ধরে:

- `{ bn, en }` এর একটা ফাঁকা বা missing
- duplicate subject/chapter/topic id
- unknown block type / tone
- invalid date, invalid `accent`, missing `readingTime`
- plain string ব্যবহার হয়েছে এমন required bilingual field
- `figure.src` path, `.bn.svg` / `.en.svg` fallback, base SVG-র `data-bn` / `data-en` label
- rich `chapter.meta` outcome / equation / key-term shape

Allowed blocks: `p`, `list`, `steps`, `formula`, `callout`, `example`, `table`, `qa`, `figure`, `glossary`, `outcomes`, `formulaGrid`।
Allowed tones: `tip`, `warning`, `info`, `activity`।

Smoke test additionally checks dark/light, BN⇄EN, rich Vector chapter, 15 roadmap notes, inline SVG label switching, glossary/outcomes/formula sheet, search, mobile menu, read progress, filters ও 404 — কোনো runtime JS error না থাকা পর্যন্ত।

---

## 8. AI agent prompt (copy-paste)

```text
You are editing the HSC Notes static site.

Read CONTENT_GUIDE.md, data/registry.js and the relevant subject / chapter add-on file first.
Add ONE new topic under chapter "<chapter-id>" of subject "<subject-id>":
- id: "<kebab-case-id>", order: <next number>, readingTime: <minutes>, updated: "YYYY-MM-DD"
- optional sectionNo: t("২.৬", "2.6") when it maps to a textbook section
- tags: 3–5 relevant lowercase strings
- title, summary, every section title and EVERY visible block text MUST use t("বাংলা", "English")
- use only helpers from registry.js: section, p, list, steps, formula, tip, warning, info, activity,
  example, table, qa, figure, term, glossary, outcome, outcomes, equation, formulaGrid
- write real HSC-level content: definitions, 2–4 formulas, one worked example,
  one common mistake, 2 Q&A, and a short hands-on activity where useful
- formula math, equation numbers and figure src stay plain Unicode/path strings;
  captions, alt text and notes are bilingual
- if using figure(), reference an existing base SVG plus its .bn.svg / .en.svg variants;
  do not invent a missing asset path
- do not edit app.js, styles.css or index.html unless adding a new data file
- keep IDs unique and do not break existing topics
- run `npm run validate` and `npm test`, then report what you added
```

আরও ছোট version:

> `CONTENT_GUIDE.md` follow kore `data/chemistry.js`-e `chemical-bonding` chapter-e `id: "coordinate-bond"` topic add koro; Bangla + English complete likho, helper chara raw HTML na, validate + test chalao.

Vector chapter-এ কাজ করলে ছোট version:

> `data/physics-vectors.js` পড়ে Vector chapter-এ একটা নতুন book-section topic যোগ করো; `t()` দিয়ে BN/EN complete likho, sectionNo দাও, প্রযোজ্য হলে বিদ্যমান `assets/vector/*.svg` diagram use koro, তারপর validate + test chalao।

---

## 9. Why this is efficient

- **No build step:** GitHub Pages directly serve করে।
- **One topic = one object:** diff ছোট, AI agent confuse হয় না।
- **Large chapter = add-on file:** মূল subject file ছোট থাকে; `registerChapter()` শুধু load order মানলেই চলে।
- **One place for translations:** `t()` — ভাষা বদলালে আলাদা file sync করতে হয় না।
- **Diagram-ও bilingual:** base SVG-র `data-bn` / `data-en` + static fallback; JS inline করে theme ও language live apply করে।
- **Auto everything:** নতুন topic দিলেই menu, search index, latest notes, prev/next, progress, library filter আপডেট হয়।
- **Safe:** validator + smoke test ভুল content/runtime আগেই ধরে।

Happy note-taking 📚
