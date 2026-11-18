# HSC Notes

একটা **zero-build, bilingual, dark/light, mobile-friendly** static site — HSC Physics, Chemistry আর Higher Math এর chapter-wise + topic-wise notes এর জন্য। GitHub Pages-এ directly চলে; bundler, framework বা database লাগে না।

> বাংলা/English content, theme, language, search, progress — সব client-side। Content থাকে সহজ JS data file-এ, তাই AI agent দিয়ে নোট add/edit করা সোজা।

---

## ✨ যা যা আছে

- **Dark default + Light toggle** — পছন্দ `localStorage`-এ save হয়।
- **বাংলা ⇄ English** — UI আর নোট দুটোই এক ক্লিকে বদলায়।
- **Mobile-friendly** — responsive grid, slide-in sidebar, floating search button।
- **Chapter → Topic structure** — `#/subject/...`, `#/chapter/...`, `#/topic/...` hash routes।
- **Instant search** — `Ctrl/⌘ + K` বা `/`; বাংলা ও English দুটোতেই খোঁজে, title/summary/tags/formula/section text মিলিয়ে।
- **Efficient menu** — collapsible subject/chapter tree, All notes library, subject filter, continue reading, read progress।
- **Reader-friendly notes** — formula box, callout, example, table, step list, glossary, outcomes, formula sheet, Q&A, table of contents, prev/next topic, copy link, mark as read।
- **Rich Vector chapter** — মূল পাঠ্যবইয়ের ২ নম্বর অধ্যায় অনুসরণ করে ১৫টি section-wise topic, ১৮টি keyword, ১০টি learning outcome, ১৫টি equation ও ১৫টি শিক্ষামূলক diagram।
- **ভাষা-সচেতন SVG diagram** — বাংলা/English toggle-এ চিত্রের label-ও বদলায়; dark/light theme-এ SVG রং CSS variable থেকে নেয়।
- **No dependencies at runtime** — শুধু `index.html + styles.css + app.js + data/*.js + assets/vector/*.svg`।
- **Content validator + smoke test** — ভুল bilingual field বা duplicate id ধরে দেয়।

---

## 📁 File map

| File | কাজ |
| --- | --- |
| `index.html` | Shell, SVG icon sprite, meta tags, script load order |
| `styles.css` | Design system, dark/light variables, responsive layout |
| `app.js` | Router, i18n dictionary, theme, search, sidebar, progress, rendering |
| `data/registry.js` | Content helpers: `t()`, `section()`, `figure()`, `glossary()`, `outcomes()`, `formulaGrid()` … |
| `data/physics.js` | Physics subject + starter Motion chapter |
| `data/physics-vectors.js` | বই-ভিত্তিক সম্পূর্ণ Vector chapter (`registerChapter('physics', …)`) |
| `data/chemistry.js` | Chemistry chapters/topics |
| `data/higher-math.js` | Higher Math chapters/topics |
| `assets/vector/*.svg` | ১৫টি base diagram + প্রতিটির `.bn.svg` / `.en.svg` fallback |
| `scripts/validate-notes.mjs` | Content schema check |
| `scripts/smoke-test.mjs` | Headless DOM runtime check |
| `scripts/serve.mjs` | Tiny local static server |
| `.github/workflows/pages.yml` | Optional GitHub Actions deploy |
| `CONTENT_GUIDE.md` | **AI agent / মানুষ — নোট add করার পুরো guide** |

---

## 🚀 Local preview

```bash
npm run dev
# http://localhost:4173
```

`npm run dev` শুধু Node built-in modules ব্যবহার করে; `npm install` লাগে না। আগের preview process চললে port `4173` ব্যস্ত থাকতে পারে — সেক্ষেত্রে পুরনো process বন্ধ করে আবার চালান।

Content check:

```bash
npm run validate
```

Optional full UI smoke test (needs dev dependency):

```bash
npm install
npm test
```

> Site চালাতে `npm install` লাগে না। শুধু `npm test` চালাতে `jsdom` লাগে।

---

## 🌐 GitHub Pages deploy

### Method A — included Actions workflow (recommended)

1. এই branch-এর কাজ `main`-এ merge/push করুন।
2. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**।
3. `.github/workflows/pages.yml` automatically `main`-এ push হলে site deploy করবে। Actions tab থেকে **Run workflow** দিয়ে manually-ও চালানো যায়।
4. URL হবে: `https://ahsan0mahin.github.io/hsc-notes/`

### Method B — simplest branch deploy

Actions ব্যবহার না করতে চাইলে:

1. `rm .github/workflows/pages.yml`
2. **Settings → Pages → Source: Deploy from a branch**
3. Branch `main`, folder `/ (root)` → Save

কোনো build command দিতে হবে না; root-এ `index.html` আছে আর `.nojekyll` আছে।

---

## 🧠 Efficient content workflow

**Rule:** একটা subject = একটা `data/*.js` file; একটা chapter = একটা object; একটা topic = একটা object। বড় অধ্যায়ের জন্য subject file-এর পরে আলাদা add-on file-ও রাখা যায় — যেমন `data/physics-vectors.js` `registerChapter('physics', …)` দিয়ে Vector chapter যোগ করে।

নতুন টপিক add করতে:

1. সংশ্লিষ্ট file খুলুন, যেমন Vector-এর ক্ষেত্রে `data/physics-vectors.js`।
2. chapter-এর `topics: [...]` array-তে একটা নতুন topic object বসান।
3. **প্রতিটা দৃশ্যমান text** `t('বাংলা', 'English')` দিয়ে লিখুন।
4. `id`, `order`, `readingTime`, `updated`, `tags` দিন।
5. `npm run validate` চালান।

Details + copy-paste template + AI prompt: 👉 **[CONTENT_GUIDE.md](CONTENT_GUIDE.md)**

একটা নতুন **subject** add করতে হলে নতুন `data/my-subject.js` বানিয়ে `index.html`-এ `app.js`-এর আগে একটা `<script defer src="...">` যোগ করুন। নতুন chapter add-on file হলে সেটিকে মূল subject file-এর **ঠিক পরে** রাখুন; নইলে `registerChapter()` subject খুঁজে পাবে না। Load order: `registry.js` → subject files → chapter add-ons → `app.js` (সবার শেষে)। Sidebar ক্রম `order` field দিয়ে sort হয়।

---

## ⌨️ Shortcuts / state

| Action | Shortcut |
| --- | --- |
| Search | `Ctrl/⌘ + K` বা `/` |
| Search result navigate | `↑` / `↓` |
| Open result | `Enter` |
| Close search / mobile menu | `Esc` |

Saved in `localStorage`: `hsc:lang`, `hsc:theme`, `hsc:read`, `hsc:lastTopic`।

---

## ✅ Current sample content

- **Physics** — **Vector (অধ্যায় ২)**: ভূমিকা/শিখনফল, scalar-vector, বিশেষ উদাহরণ, প্রকাশ, বিশেষ ভেক্টর, যোগ/বিয়োগ, সামান্তরিক, বিভাজন, 3D উপাংশ, গুণন, ডট/ক্রস, ক্যালকুলাস, ভেক্টর ক্যালকুলাস, সার-সংক্ষেপ — মোট ১৫টি নোট; **Motion**: distance/displacement
- **Chemistry** — Atomic structure: quantum numbers; Chemical bonding: ionic/covalent bonds
- **Higher Math** — Matrices & determinants: 2×2 determinant, multiplication; 3D geometry: distance/midpoint/section

এগুলো real starter notes — এর ওপর ভিত্তি করে বাকি chapter/topic গুলো বাড়ানো যাবে।

---

## 🤖 AI agent-কে এক লাইনে বলুন

> `CONTENT_GUIDE.md` আর `data/physics-vectors.js` পড়ে, Physics → Vectors chapter-এ `id: "vector-applications"` নামে একটা নতুন HSC-level topic যোগ করো। বাংলা + English দুটোই পূর্ণ লিখো, registry helpers ব্যবহার করো, figure দিলে `.svg + .bn.svg + .en.svg` তিনটি asset দাও, ID unique রাখো, তারপর `npm run validate` আর `npm test` চালিয়ে দাও।

Made for HSC students · Static, fast, editable by humans and agents alike.
