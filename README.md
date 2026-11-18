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
- **Reader-friendly notes** — formula box, callout, example, table, step list, Q&A, table of contents, prev/next topic, copy link, mark as read।
- **No dependencies at runtime** — শুধু `index.html + styles.css + app.js + data/*.js`।
- **Content validator + smoke test** — ভুল bilingual field বা duplicate id ধরে দেয়।

---

## 📁 File map

| File | কাজ |
| --- | --- |
| `index.html` | Shell, SVG icon sprite, meta tags, script load order |
| `styles.css` | Design system, dark/light variables, responsive layout |
| `app.js` | Router, i18n dictionary, theme, search, sidebar, progress, rendering |
| `data/registry.js` | Content helpers: `t()`, `section()`, `p()`, `formula()`, `table()` … |
| `data/physics.js` | Physics chapters/topics |
| `data/chemistry.js` | Chemistry chapters/topics |
| `data/higher-math.js` | Higher Math chapters/topics |
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

`npm run dev` শুধু Node built-in modules ব্যবহার করে; `npm install` লাগে না।

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

**Rule:** একটা subject = একটা `data/*.js` file; একটা chapter = একটা object; একটা topic = একটা object।

নতুন টপিক add করতে:

1. সংশ্লিষ্ট file খুলুন, যেমন `data/physics.js`।
2. chapter-এর `topics: [...]` array-তে একটা নতুন topic object বসান।
3. **প্রতিটা দৃশ্যমান text** `t('বাংলা', 'English')` দিয়ে লিখুন।
4. `id`, `order`, `readingTime`, `updated`, `tags` দিন।
5. `npm run validate` চালান।

Details + copy-paste template + AI prompt: 👉 **[CONTENT_GUIDE.md](CONTENT_GUIDE.md)**

একটা নতুন **subject** add করতে হলে নতুন `data/my-subject.js` বানিয়ে `index.html`-এ `app.js`-এর আগে একটা `<script defer src="...">` যোগ করুন। Load order important (`registry.js` আগে, `app.js` সবার শেষে); sidebar ক্রম `order` field দিয়ে sort হয়।

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

- **Physics** — Vectors: scalars/vectors, addition/subtraction, dot/cross product; Motion: distance/displacement
- **Chemistry** — Atomic structure: quantum numbers; Chemical bonding: ionic/covalent bonds
- **Higher Math** — Matrices & determinants: 2×2 determinant, multiplication; 3D geometry: distance/midpoint/section

এগুলো real starter notes — এর ওপর ভিত্তি করে বাকি chapter/topic গুলো বাড়ানো যাবে।

---

## 🤖 AI agent-কে এক লাইনে বলুন

> `CONTENT_GUIDE.md` আর `data/physics.js` পড়ে, Physics → Vectors chapter-এ `id: "vector-resolution"` নামে একটা নতুন HSC-level topic যোগ করো। বাংলা + English দুটোই পূর্ণ লিখো, শুধু registry helpers ব্যবহার করো, ID unique রাখো, তারপর `npm run validate` আর `npm test` চালিয়ে দাও।

Made for HSC students · Static, fast, editable by humans and agents alike.
