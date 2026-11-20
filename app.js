/*
 * HSC Notes — app logic
 * Zero dependencies: hash router, bilingual UI, theme, search, reading progress.
 */
(function () {
  'use strict';

  const notes = window.HSC_NOTES;
  const main = document.getElementById('main');
  const sidebar = document.getElementById('sidebar');
  const sidebarNav = document.getElementById('sidebarNav');
  const sidebarFooter = document.getElementById('sidebarFooter');
  const sidebarBackdrop = document.getElementById('sidebarBackdrop');
  const menuBtn = document.getElementById('menuBtn');
  const themeBtn = document.getElementById('themeBtn');
  const themeColorMeta = document.getElementById('themeColorMeta');
  const metaDescription = document.getElementById('metaDescription');
  const readingProgress = document.getElementById('readingProgress');
  const searchModal = document.getElementById('searchModal');
  const searchDialog = document.getElementById('searchDialog');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const toast = document.getElementById('toast');

  const ui = {
    bn: {
      metaDescription: "এইচএসসির পদার্থবিজ্ঞান, রসায়ন ও উচ্চতর গণিতের অধ্যায়ভিত্তিক দ্বিভাষিক নোট।",
      siteTagline: "বাংলা · English নোট",
      skipToContent: "মূল কনটেন্টে যান",
      searchPlaceholder: "নোট খুঁজুন...",
      searchCta: "নোট খুঁজুন",
      searchAria: "নোট খুঁজুন",
      openMenu: "মেনু খুলুন",
      closeMenu: "মেনু বন্ধ করুন",
      toggleTheme: "থিম বদলান",
      lightMode: "লাইট মোড",
      darkMode: "ডার্ক মোড",
      themeChangedLight: "লাইট মোড চালু",
      themeChangedDark: "ডার্ক মোড চালু",
      githubRepo: "GitHub রিপো",
      language: "ভাষা",
      home: "হোম",
      allNotes: "সব নোট",
      browse: "ব্রাউজ করুন",
      subjects: "বিষয়সমূহ",
      chapters: "অধ্যায়",
      topics: "টপিক",
      notes: "নোট",
      chapter: "অধ্যায়",
      topic: "টপিক",
      progress: "পড়ার অগ্রগতি",
      topicsRead: "{read}/{total} টপিক পড়া হয়েছে",
      continueReading: "পড়া চালিয়ে যান",
      latestNotes: "সর্বশেষ নোট",
      viewAll: "সব দেখুন",
      startSubject: "{subject} শুরু করুন",
      explore: "দেখুন",
      heroEyebrow: "HSC 2026 · সহজ, পরিচ্ছন্ন, দ্রুত",
      heroTitle: "এইচএসসির নোট,",
      heroHighlight: "এক জায়গায়।",
      heroText: "পদার্থবিজ্ঞান, রসায়ন ও উচ্চতর গণিতের নোট অধ্যায় ও টপিক অনুযায়ী সাজানো। যেকোনো সময় বাংলা বা English, ডার্ক বা লাইট—আপনার পছন্দ মনে রাখা হয়।",
      updatedOn: "সর্বশেষ হালনাগাদ {date}",
      featureStructureTitle: "অধ্যায় → টপিক",
      featureStructureText: "প্রতিটা নোট আলাদা টপিক পাতায়; আগের/পরের টপিকে যাওয়া এক ক্লিকে।",
      featureBilingualTitle: "বাংলা ⇄ English",
      featureBilingualText: "ইন্টারফেস ও নোট—দুটোই এক বাটনে ভাষা বদলায়।",
      featureSearchTitle: "তাৎক্ষণিক খোঁজ",
      featureSearchText: "Ctrl/⌘ + K বা / টিপে যেকোনো সূত্র, সংজ্ঞা বা টপিক খুঁজুন।",
      libraryTitle: "সব নোট",
      librarySubtitle: "বিষয় ধরে ফিল্টার করুন অথবা উপরের সার্চ ব্যবহার করুন।",
      filterAll: "সব",
      filter: "ফিল্টার",
      subjectOverview: "বিষয় ওভারভিউ",
      chapterOverview: "অধ্যায় ওভারভিউ",
      noteCount: "{count} টি নোট",
      chapterCount: "{count} টি অধ্যায়",
      topicCount: "{count} টি টপিক",
      totalSubjects: "মোট বিষয়",
      totalChapters: "মোট অধ্যায়",
      totalNotes: "মোট নোট",
      minRead: "{count} মিনিট",
      updated: "হালনাগাদ",
      startReading: "পড়া শুরু করুন",
      openChapter: "অধ্যায় খুলুন",
      readTopic: "নোট পড়ুন",
      chapterTopics: "এই অধ্যায়ের টপিক",
      markRead: "পড়া হিসেবে চিহ্নিত করুন",
      markedRead: "পড়া হয়েছে ✓",
      readMarked: "পড়া হিসেবে সেভ হয়েছে",
      readUnmarked: "পড়ার চিহ্ন সরানো হয়েছে",
      copyLink: "লিংক কপি",
      copied: "লিংক কপি হয়েছে",
      copyFailed: "লিংক কপি করা যায়নি",
      onThisPage: "এই পাতায়",
      backToTop: "উপরে যান",
      prevTopic: "আগের টপিক",
      nextTopic: "পরের টপিক",
      backToChapter: "অধ্যায়ে ফিরুন",
      relatedTopics: "একই অধ্যায়ে আরও",
      topicNavigation: "টপিক নেভিগেশন",
      formula: "সূত্র",
      example: "উদাহরণ",
      tip: "টিপস",
      warning: "সাবধান",
      info: "মনে রাখুন",
      activity: "নিজে করো",
      glossary: "শব্দকোষ",
      outcomes: "শিখনফল",
      formulaSheet: "সূত্রতালিকা",
      chapterGuide: "অধ্যায় গাইড",
      featuredChapter: "বিশেষ অধ্যায়",
      bookSource: "মূল পাঠ্যবই ভিত্তিক",
      keyTerms: "প্রধান শব্দসমূহ",
      learningOutcomes: "এই অধ্যায়ে যা শিখবেন",
      quickFormulas: "দ্রুত সূত্রতালিকা",
      chapterMap: "পাঠ-রোডম্যাপ",
      startChapter: "অধ্যায় শুরু করুন",
      equation: "সমীকরণ",
      figure: "চিত্র",
      sourceNote: "উৎস-নোট",
      exploreChapter: "অধ্যায়ের নোট দেখুন",
      sectionNo: "ধারা",
      question: "প্রশ্ন",
      answer: "উত্তর",
      draft: "ড্রাফট",
      draftNotice: "এই নোটটি এখনো ড্রাফট; মেনু ও সার্চ থেকে লুকানো আছে।",
      comingSoon: "শিগগিরই",
      emptyLibrary: "এই ফিল্টারে এখনো কোনো নোট নেই।",
      emptyChapter: "এই অধ্যায়ে এখনো প্রকাশিত নোট নেই।",
      notFoundTitle: "পাতাটি পাওয়া যায়নি",
      notFoundText: "লিংকটি পুরনো হতে পারে। হোম থেকে আবার শুরু করুন অথবা সার্চ ব্যবহার করুন।",
      goHome: "হোমে যান",
      searchModalTitle: "নোট খোঁজা",
      searchHint: "টাইপ করুন: ভেক্টর, dot product, কোয়ান্টাম সংখ্যা, determinant…",
      noResults: "কিছু পাওয়া যায়নি",
      noResultsText: "অন্য শব্দ দিয়ে চেষ্টা করুন বা বিষয়গুলো ব্রাউজ করুন।",
      quickLinks: "দ্রুত লিংক",
      resultCount: "{count} টি ফলাফল",
      navigate: "ঘুরুন",
      select: "খুলুন",
      closeKey: "বন্ধ",
      escLabel: "Esc",
      breadcrumb: "ব্রেডক্রাম্ব",
      footerLine: "স্ট্যাটিক সাইট · বিল্ড স্টেপ নেই · GitHub Pages-এ সরাসরি চলে",
      viewSource: "সোর্স দেখুন",
      allSubjects: "সব বিষয়",
      close: "বন্ধ করুন"
    },
    en: {
      metaDescription: "Chapter-wise bilingual notes for HSC Physics, Chemistry and Higher Math.",
      siteTagline: "Bangla · English notes",
      skipToContent: "Skip to main content",
      searchPlaceholder: "Search notes...",
      searchCta: "Search notes",
      searchAria: "Search notes",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      toggleTheme: "Change theme",
      lightMode: "Light mode",
      darkMode: "Dark mode",
      themeChangedLight: "Light mode on",
      themeChangedDark: "Dark mode on",
      githubRepo: "GitHub repository",
      language: "Language",
      home: "Home",
      allNotes: "All notes",
      browse: "Browse",
      subjects: "Subjects",
      chapters: "Chapters",
      topics: "Topics",
      notes: "notes",
      chapter: "Chapter",
      topic: "Topic",
      progress: "Reading progress",
      topicsRead: "{read}/{total} topics read",
      continueReading: "Continue reading",
      latestNotes: "Latest notes",
      viewAll: "View all",
      startSubject: "Start {subject}",
      explore: "Explore",
      heroEyebrow: "HSC 2026 · simple, clean, fast",
      heroTitle: "Every HSC note,",
      heroHighlight: "one clean place.",
      heroText: "Physics, Chemistry and Higher Math notes organised by chapter and topic. Switch Bangla/English or dark/light any time—your choice is remembered.",
      updatedOn: "Last updated {date}",
      featureStructureTitle: "Chapter → Topic",
      featureStructureText: "Every note gets its own topic page; previous and next are one click away.",
      featureBilingualTitle: "Bangla ⇄ English",
      featureBilingualText: "The interface and the notes both change language with one button.",
      featureSearchTitle: "Instant search",
      featureSearchText: "Press Ctrl/⌘ + K or / to find any formula, definition or topic.",
      libraryTitle: "All notes",
      librarySubtitle: "Filter by subject or use the search bar above.",
      filterAll: "All",
      filter: "Filter",
      subjectOverview: "Subject overview",
      chapterOverview: "Chapter overview",
      noteCount: "{count} notes",
      chapterCount: "{count} chapters",
      topicCount: "{count} topics",
      totalSubjects: "Subjects",
      totalChapters: "Chapters",
      totalNotes: "Notes",
      minRead: "{count} min",
      updated: "Updated",
      startReading: "Start reading",
      openChapter: "Open chapter",
      readTopic: "Read note",
      chapterTopics: "Topics in this chapter",
      markRead: "Mark as read",
      markedRead: "Read ✓",
      readMarked: "Saved as read",
      readUnmarked: "Read mark removed",
      copyLink: "Copy link",
      copied: "Link copied",
      copyFailed: "Could not copy link",
      onThisPage: "On this page",
      backToTop: "Back to top",
      prevTopic: "Previous topic",
      nextTopic: "Next topic",
      backToChapter: "Back to chapter",
      relatedTopics: "More in this chapter",
      topicNavigation: "Topic navigation",
      formula: "Formula",
      example: "Example",
      tip: "Tip",
      warning: "Careful",
      info: "Remember",
      activity: "Try it",
      glossary: "Glossary",
      outcomes: "Outcomes",
      formulaSheet: "Formula sheet",
      chapterGuide: "Chapter guide",
      featuredChapter: "Featured chapter",
      bookSource: "Based on the main textbook",
      keyTerms: "Key terms",
      learningOutcomes: "What you'll learn",
      quickFormulas: "Quick formula sheet",
      chapterMap: "Reading roadmap",
      startChapter: "Start chapter",
      equation: "Equation",
      figure: "Figure",
      sourceNote: "Source note",
      exploreChapter: "Browse chapter notes",
      sectionNo: "Section",
      question: "Question",
      answer: "Answer",
      draft: "Draft",
      draftNotice: "This note is still a draft; it is hidden from the menu and search.",
      comingSoon: "Coming soon",
      emptyLibrary: "No notes in this filter yet.",
      emptyChapter: "No published notes in this chapter yet.",
      notFoundTitle: "Page not found",
      notFoundText: "The link may be old. Start again from home or use search.",
      goHome: "Go home",
      searchModalTitle: "Search notes",
      searchHint: "Try: vector, dot product, কোয়ান্টাম সংখ্যা, determinant…",
      noResults: "No matches found",
      noResultsText: "Try another word or browse the subjects instead.",
      quickLinks: "Quick links",
      resultCount: "{count} results",
      navigate: "Navigate",
      select: "Open",
      closeKey: "Close",
      escLabel: "Esc",
      breadcrumb: "Breadcrumb",
      footerLine: "Static site · no build step · runs directly on GitHub Pages",
      viewSource: "View source",
      allSubjects: "All subjects",
      close: "Close"
    }
  };

  const state = {
    lang: 'bn',
    theme: 'dark',
    read: new Set(),
    lastTopic: '',
    route: { view: 'home' },
    libraryFilter: 'all',
    sidebarOpen: false,
    searchOpen: false,
    searchQuery: '',
    searchActiveIndex: -1,
    searchReturnFocus: null,
    searchIndex: []
  };

  let toastTimer;
  let scrollTicking = false;

  /* ---------- helpers ---------- */
  function storageGet(key) {
    try { return localStorage.getItem(key); } catch (error) { return null; }
  }
  function storageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (error) {}
  }
  function loadSet(key) {
    try {
      const parsed = JSON.parse(storageGet(key) || '[]');
      return new Set(Array.isArray(parsed) ? parsed.filter(item => typeof item === 'string') : []);
    } catch (error) { return new Set(); }
  }
  function saveSet(key, set) { storageSet(key, JSON.stringify([...set])); }

  function tr(key, vars = {}) {
    let value = (ui[state.lang] && ui[state.lang][key]) || ui.en[key] || key;
    for (const [name, replacement] of Object.entries(vars)) {
      value = value.split(`{${name}}`).join(String(replacement));
    }
    return value;
  }
  function pick(value) {
    if (value == null) return '';
    if (typeof value === 'string' || typeof value === 'number') return String(value);
    if (typeof value === 'object') return value[state.lang] || value.en || value.bn || '';
    return String(value);
  }
  function escapeHtml(value) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return String(value == null ? '' : value).replace(/[&<>"']/g, char => map[char]);
  }
  const escapeAttr = escapeHtml;
  function escapeRegExp(value) { return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function safeAccent(value) { return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value || '') ? value : '#8b5cf6'; }
  function icon(name) { return `<svg class="icon" aria-hidden="true"><use href="#i-${name}"></use></svg>`; }
  // Draw one continuous arrow across the whole symbol (including point pairs like OP).
  function vectorNotation(escaped) {
    return escaped.replace(/([A-Z]{2}|[A-Za-z0ωτα])⃗/gu, '<span class="vector-symbol">$1<span class="vector-mark">⃗</span></span>');
  }
  function inline(value) {
    return vectorNotation(escapeHtml(pick(value)))
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
  }
  function formatDate(iso) {
    try {
      return new Intl.DateTimeFormat(state.lang === 'bn' ? 'bn-BD' : 'en-US', {
        year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'
      }).format(new Date(`${iso}T00:00:00Z`));
    } catch (error) { return iso; }
  }
  function normalize(value) {
    return String(value == null ? '' : value)
      .toLowerCase()
      .replace(/[\u200c\u200d\u09bc]/g, '')
      .replace(/[^\p{L}\p{N}\s]/gu, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  function tokensFrom(value) { return normalize(value).split(' ').filter(Boolean); }
  function collectText(value, out) {
    if (value == null || typeof value === 'boolean') return;
    if (typeof value === 'string' || typeof value === 'number') { out.push(String(value)); return; }
    if (Array.isArray(value)) { value.forEach(item => collectText(item, out)); return; }
    if (typeof value === 'object') {
      if ('bn' in value || 'en' in value) { out.push(value.bn || '', value.en || ''); return; }
      Object.values(value).forEach(child => collectText(child, out));
    }
  }
  function flattenText(value) {
    const out = [];
    collectText(value, out);
    return out.join(' ');
  }

  /* ---------- language-aware SVG diagrams ---------- */
  const figureCache = new Map();
  function variantFigureSrc(src) {
    return String(src || '').replace(/\.svg$/, `.${state.lang}.svg`);
  }
  function figureAlt(block) {
    return pick(block.alt || block.caption) || tr('figure');
  }
  function renderFigure(block, extraClass = '') {
    const src = String(block.src || '');
    if (!src) return '';
    const alt = figureAlt(block);
    return `<figure class="figure-frame ${extraClass}" data-figure-src="${escapeAttr(src)}" data-figure-alt="${escapeAttr(alt)}">
      <div class="figure-canvas">
        <img src="${escapeAttr(variantFigureSrc(src))}" alt="${escapeAttr(alt)}" loading="lazy" decoding="async">
      </div>
      ${block.caption ? `<figcaption><span class="figure-label">${icon('image')} ${tr('figure')}</span>${inline(block.caption)}</figcaption>` : ''}
    </figure>`;
  }
  function applyFigureLanguage(svg, lang) {
    svg.querySelectorAll('text[data-bn], text[data-en]').forEach(node => {
      const value = node.getAttribute(`data-${lang}`) || node.getAttribute('data-en') || node.getAttribute('data-bn');
      if (value != null) node.textContent = value;
    });
  }
  function sanitizeFigureSvg(svg) {
    svg.querySelectorAll('script, foreignObject, image, iframe, object, embed').forEach(node => node.remove());
    svg.querySelectorAll('*').forEach(node => {
      [...node.attributes].forEach(attr => {
        const name = attr.name.toLowerCase();
        const unsafeUrl = (name === 'href' || name === 'xlink:href') && /^(javascript|data):/i.test(attr.value);
        if (name.startsWith('on') || unsafeUrl) node.removeAttribute(attr.name);
      });
    });
    svg.setAttribute('class', 'inline-figure');
    svg.setAttribute('role', 'img');
    svg.setAttribute('focusable', 'false');
    svg.removeAttribute('width');
    svg.removeAttribute('height');
    return svg;
  }
  function loadFigureSvg(src) {
    if (!figureCache.has(src)) {
      figureCache.set(src, window.fetch(new URL(src, document.baseURI).href)
        .then(response => {
          if (!response.ok) throw new Error(`Could not load ${src}`);
          return response.text();
        }));
    }
    return figureCache.get(src);
  }
  function hydrateFigures() {
    if (typeof window.fetch !== 'function' || typeof DOMParser === 'undefined') return;
    main.querySelectorAll('.figure-frame[data-figure-src]:not([data-figure-hydrated])').forEach(figure => {
      const src = figure.dataset.figureSrc;
      const canvas = figure.querySelector('.figure-canvas');
      if (!src || !canvas) return;
      loadFigureSvg(src).then(raw => {
        if (!figure.isConnected) return;
        const parsed = new DOMParser().parseFromString(raw, 'image/svg+xml');
        const root = parsed.documentElement;
        if (!root || root.localName !== 'svg') throw new Error(`Invalid SVG: ${src}`);
        const svg = sanitizeFigureSvg(document.importNode(root, true));
        svg.setAttribute('aria-label', figure.dataset.figureAlt || '');
        applyFigureLanguage(svg, state.lang);
        canvas.replaceChildren(svg);
        canvas.classList.add('is-hydrated');
        figure.dataset.figureHydrated = 'true';
      }).catch(() => {
        /* Keep the language-specific <img> fallback. */
      });
    });
  }

  /* ---------- data ---------- */
  function getSubjects() { return [...notes.subjects].sort((a, b) => (a.order || 99) - (b.order || 99)); }
  function getChapters(subject) { return [...(subject.chapters || [])].sort((a, b) => (a.order || 99) - (b.order || 99)); }
  function getTopics(subject, chapter, includeDrafts = false) {
    return [...(chapter.topics || [])]
      .filter(topic => includeDrafts || !topic.draft)
      .sort((a, b) => (a.order || 99) - (b.order || 99));
  }
  function allTopics() {
    const entries = [];
    getSubjects().forEach(subject => {
      getChapters(subject).forEach(chapter => {
        getTopics(subject, chapter).forEach(topic => entries.push({ subject, chapter, topic }));
      });
    });
    return entries;
  }
  function findSubject(id) { return getSubjects().find(subject => subject.id === id) || null; }
  function findChapter(subject, id) { return subject ? getChapters(subject).find(chapter => chapter.id === id) || null : null; }
  function findTopic(subjectId, chapterId, topicId, includeDrafts = true) {
    const subject = findSubject(subjectId);
    const chapter = findChapter(subject, chapterId);
    if (!subject || !chapter) return null;
    const topic = (chapter.topics || []).find(item => item.id === topicId && (includeDrafts || !item.draft));
    return topic ? { subject, chapter, topic } : null;
  }
  function keyOf(subjectId, chapterId, topicId) { return `${subjectId}/${chapterId}/${topicId}`; }
  function entryKey(entry) { return keyOf(entry.subject.id, entry.chapter.id, entry.topic.id); }
  function findByKey(key) {
    const parts = String(key || '').split('/');
    return parts.length === 3 ? findTopic(parts[0], parts[1], parts[2], false) : null;
  }
  function homeUrl() { return '#/'; }
  function notesUrl() { return '#/notes'; }
  function subjectUrl(subject) { return `#/subject/${encodeURIComponent(subject.id)}`; }
  function chapterUrl(subject, chapter) { return `#/chapter/${encodeURIComponent(subject.id)}/${encodeURIComponent(chapter.id)}`; }
  function topicUrl(subject, chapter, topic) {
    return `#/topic/${encodeURIComponent(subject.id)}/${encodeURIComponent(chapter.id)}/${encodeURIComponent(topic.id)}`;
  }
  function byUpdated(a, b) { return String(b.topic.updated || '').localeCompare(String(a.topic.updated || '')); }

  function parseHash() {
    const raw = location.hash.replace(/^#/, '');
    const decode = part => { try { return decodeURIComponent(part); } catch (error) { return part; } };
    const parts = raw.split('/').filter(Boolean).map(decode);
    if (!parts.length) return { view: 'home' };
    if (parts[0] === 'notes') return { view: 'notes' };
    if (parts[0] === 'subject' && parts[1]) return { view: 'subject', subjectId: parts[1] };
    if (parts[0] === 'chapter' && parts[1] && parts[2]) return { view: 'chapter', subjectId: parts[1], chapterId: parts[2] };
    if (parts[0] === 'topic' && parts[1] && parts[2] && parts[3]) {
      return { view: 'topic', subjectId: parts[1], chapterId: parts[2], topicId: parts[3] };
    }
    return { view: 'notFound', path: raw };
  }

  /* ---------- theme + language ---------- */
  function setKbdLabels() {
    const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent || '');
    document.querySelectorAll('[data-shortcut]').forEach(el => { el.textContent = isMac ? '⌘ K' : 'Ctrl K'; });
  }
  function updateThemeButton() {
    const goingLight = state.theme === 'dark';
    themeBtn.innerHTML = icon(goingLight ? 'sun' : 'moon');
    const label = goingLight ? tr('lightMode') : tr('darkMode');
    themeBtn.setAttribute('aria-label', label);
    themeBtn.title = label;
  }
  function applyTheme(persist = true) {
    document.documentElement.dataset.theme = state.theme;
    themeColorMeta.setAttribute('content', state.theme === 'dark' ? '#080b12' : '#f6f8fc');
    if (persist) storageSet('hsc:theme', state.theme);
    updateThemeButton();
  }
  function applyI18n() {
    document.documentElement.lang = state.lang === 'bn' ? 'bn' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = tr(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', tr(el.dataset.i18nAria)); });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.setAttribute('placeholder', tr(el.dataset.i18nPlaceholder)); });
    document.querySelectorAll('[data-i18n-title]').forEach(el => { el.title = tr(el.dataset.i18nTitle); });
    document.querySelectorAll('.lang-switch button').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.lang === state.lang));
    });
    if (state.sidebarOpen) menuBtn.setAttribute('aria-label', tr('closeMenu'));
    setKbdLabels();
    updateThemeButton();
  }
  function applyLanguage(persist = true) {
    if (persist) storageSet('hsc:lang', state.lang);
    applyI18n();
  }
  function setLanguage(lang) {
    if ((lang !== 'bn' && lang !== 'en') || lang === state.lang) return;
    const y = window.scrollY;
    state.lang = lang;
    applyLanguage();
    renderRoute(false);
    if (state.searchOpen) renderSearchResults(state.searchQuery);
    requestAnimationFrame(() => window.scrollTo(0, y));
  }
  function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme();
    showToast(state.theme === 'light' ? tr('themeChangedLight') : tr('themeChangedDark'));
  }
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  /* ---------- sidebar ---------- */
  function openSidebar() {
    if (state.sidebarOpen) return;
    state.sidebarOpen = true;
    sidebar.classList.add('is-open');
    sidebarBackdrop.hidden = false;
    document.body.classList.add('sidebar-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.setAttribute('aria-label', tr('closeMenu'));
    requestAnimationFrame(() => document.getElementById('sidebarClose').focus());
  }
  function closeSidebar() {
    if (!state.sidebarOpen) return;
    const hadFocus = sidebar.contains(document.activeElement);
    state.sidebarOpen = false;
    sidebar.classList.remove('is-open');
    sidebarBackdrop.hidden = true;
    document.body.classList.remove('sidebar-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', tr('openMenu'));
    if (hadFocus) menuBtn.focus();
  }
  function renderContinueCard(entry) {
    return `<a class="continue-card" href="${topicUrl(entry.subject, entry.chapter, entry.topic)}">
      <span class="continue-label">${icon('clock')} ${tr('continueReading')}</span>
      <span class="continue-title">${escapeHtml(pick(entry.topic.title))}</span>
      <span class="continue-path">${escapeHtml(pick(entry.subject.title))} · ${escapeHtml(pick(entry.chapter.title))}</span>
    </a>`;
  }
  function renderSidebarSubject(subject, index, route, activeSubjectId) {
    const chapters = getChapters(subject);
    const topicCount = chapters.reduce((sum, chapter) => sum + getTopics(subject, chapter).length, 0);
    const open = activeSubjectId === subject.id ? 'open' : '';
    return `<details class="subject-group" data-subject="${escapeAttr(subject.id)}" ${open}>
      <summary class="subject-summary">
        <span class="subject-mini" style="--accent:${safeAccent(subject.accent)}">${escapeHtml(subject.icon)}</span>
        <span class="subject-name">${escapeHtml(pick(subject.title))}</span>
        <span class="subject-count">${topicCount}</span>
        ${icon('chevron').replace('class="icon"', 'class="icon chevron"')}
      </summary>
      <div class="chapter-list">
        ${chapters.map(chapter => {
          const topics = getTopics(subject, chapter);
          const chapterOpen = route.subjectId === subject.id && route.chapterId === chapter.id ? 'open' : '';
          return `<details class="chapter-group" data-chapter="${escapeAttr(chapter.id)}" ${chapterOpen}>
            <summary class="chapter-summary">
              ${icon('chevron').replace('class="icon"', 'class="icon chevron"')}
              <span class="subject-name">${escapeHtml(pick(chapter.title))}</span>
              <span class="chapter-count">${topics.length}</span>
            </summary>
            <div class="topic-list">
              ${topics.map(topic => {
                const active = route.view === 'topic' && route.subjectId === subject.id && route.chapterId === chapter.id && route.topicId === topic.id;
                const read = state.read.has(keyOf(subject.id, chapter.id, topic.id));
                return `<a class="topic-link ${active ? 'active' : ''} ${read ? 'is-read' : ''}" href="${topicUrl(subject, chapter, topic)}">
                  <span class="topic-dot"></span><span>${escapeHtml(pick(topic.title))}</span>${read ? icon('check') : ''}
                </a>`;
              }).join('') || `<span class="empty-chapter">${tr('comingSoon')}</span>`}
            </div>
          </details>`;
        }).join('')}
      </div>
    </details>`;
  }
  function featuredChapters() {
    const found = [];
    getSubjects().forEach(subject => {
      getChapters(subject).forEach(chapter => {
        if (chapter.featured) found.push({ subject, chapter });
      });
    });
    return found;
  }
  function renderFeaturedShortcut() {
    const items = featuredChapters();
    if (!items.length) return '';
    return `<div class="featured-nav">
      <p class="side-label">${tr('featuredChapter')}</p>
      ${items.map(({ subject, chapter }) => `<a class="featured-link" href="${chapterUrl(subject, chapter)}">
        <span class="featured-link-icon">${icon('sparkles')}</span>
        <span><strong>${escapeHtml(pick(chapter.title))}</strong><small>${getTopics(subject, chapter).length} ${tr('topics')}</small></span>
        ${icon('arrow-right')}
      </a>`).join('')}
    </div>`;
  }
  function renderSidebar() {
    const subjects = getSubjects();
    const topics = allTopics();
    const readCount = topics.filter(entry => state.read.has(entryKey(entry))).length;
    const percent = topics.length ? Math.round((readCount / topics.length) * 100) : 0;
    const last = findByKey(state.lastTopic);
    const route = state.route || { view: 'home' };
    const activeSubjectId = route.subjectId || (route.view === 'home' && subjects[0] ? subjects[0].id : '');

    sidebarNav.innerHTML = `
      <div class="side-section">
        <a class="side-link ${route.view === 'home' ? 'active' : ''}" href="${homeUrl()}">${icon('home')}<span>${tr('home')}</span></a>
        <a class="side-link ${route.view === 'notes' ? 'active' : ''}" href="${notesUrl()}">${icon('layers')}<span>${tr('allNotes')}</span><span class="side-count">${topics.length}</span></a>
      </div>
      ${last ? renderContinueCard(last) : ''}
      ${renderFeaturedShortcut()}
      <p class="side-label">${tr('subjects')}</p>
      <div class="side-section">
        ${subjects.map((subject, index) => renderSidebarSubject(subject, index, route, activeSubjectId)).join('')}
      </div>`;

    sidebarFooter.innerHTML = `<div class="progress-card">
      <div class="progress-head"><span>${icon('sparkles')} ${tr('progress')}</span><strong>${percent}%</strong></div>
      <div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}" aria-label="${escapeAttr(tr('progress'))}">
        <span style="width:${percent}%"></span>
      </div>
      <p class="progress-label">${tr('topicsRead', { read: readCount, total: topics.length })}</p>
    </div>`;
  }

  /* ---------- shared render pieces ---------- */
  function renderFooter() {
    return `<footer class="site-footer">
      <div class="footer-copy"><strong>HSC Notes</strong><span>${tr('footerLine')}</span></div>
      <div class="footer-links">
        <a href="https://github.com/ahsan0mahin/hsc-notes" target="_blank" rel="noopener noreferrer">${icon('github')} ${tr('viewSource')}</a>
        <button type="button" data-action="scroll-top">${icon('arrow-up-right')} ${tr('backToTop')}</button>
      </div>
    </footer>`;
  }
  function renderBreadcrumb(items, current) {
    return `<nav class="breadcrumb" aria-label="${escapeAttr(tr('breadcrumb'))}">
      ${items.map((item, index) => `${index ? '<span class="crumb-sep">›</span>' : ''}<a href="${escapeAttr(item.href)}">${escapeHtml(item.label)}</a>`).join('')}
      ${current ? `<span class="crumb-sep">›</span><strong>${escapeHtml(current)}</strong>` : ''}
    </nav>`;
  }
  function renderEmpty(title, text, iconName = 'layers') {
    return `<div class="empty-state">${icon(iconName)}<h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></div>`;
  }
  function renderTopicCard(entry) {
    const { subject, chapter, topic } = entry;
    return `<a class="note-card" href="${topicUrl(subject, chapter, topic)}" style="--accent:${safeAccent(subject.accent)}">
      <div class="note-card-top">
        <span class="subject-dot"></span>
        <span>${escapeHtml(pick(subject.title))}</span>
        <span class="dot-sep">·</span>
        <span>${escapeHtml(pick(chapter.title))}</span>
      </div>
      <h3>${escapeHtml(pick(topic.title))}</h3>
      <p>${escapeHtml(pick(topic.summary))}</p>
      <div class="note-card-bottom">
        <span>${icon('clock')} ${tr('minRead', { count: topic.readingTime })}</span>
        <span>${formatDate(topic.updated)}</span>
        ${topic.draft ? `<span class="badge">${tr('draft')}</span>` : ''}
      </div>
      <span class="card-arrow">${icon('arrow-up-right')}</span>
    </a>`;
  }
  function renderSubjectCard(subject) {
    const chapters = getChapters(subject);
    const topicCount = chapters.reduce((sum, chapter) => sum + getTopics(subject, chapter).length, 0);
    const pills = chapters.slice(0, 3).map(chapter => `<span class="pill">${escapeHtml(pick(chapter.title))}</span>`).join('');
    const extra = chapters.length > 3 ? `<span class="pill">+${chapters.length - 3}</span>` : '';
    return `<article class="subject-card" style="--accent:${safeAccent(subject.accent)}">
      <div class="card-top">
        <span class="subject-icon">${escapeHtml(subject.icon)}</span>
        <span class="side-count">${topicCount} ${tr('notes')}</span>
      </div>
      <h3>${escapeHtml(pick(subject.title))}</h3>
      <p>${escapeHtml(pick(subject.description))}</p>
      <div class="chapter-pills">${pills}${extra}</div>
      <div class="card-meta">
        <span>${tr('chapterCount', { count: chapters.length })}</span>
        <span>${tr('topicCount', { count: topicCount })}</span>
      </div>
      <a class="card-action" href="${subjectUrl(subject)}">${tr('explore')} ${icon('arrow-right')}</a>
    </article>`;
  }

  /* ---------- views ---------- */
  function renderHero(subjects, topics, chapterCount, latest) {
    const first = subjects[0];
    const updated = latest[0] ? `<span>${tr('updatedOn', { date: formatDate(latest[0].topic.updated) })}</span>` : '';
    return `<section class="hero">
      <div class="hero-grid">
        <div class="hero-copy">
          <div class="hero-badge">${tr('heroEyebrow')}</div>
          <h1>${tr('heroTitle')} <span>${tr('heroHighlight')}</span></h1>
          <p class="hero-lead">${tr('heroText')}</p>
          <div class="hero-actions">
            ${first ? `<a class="btn btn-primary" href="${subjectUrl(first)}">${icon('book')} ${tr('startSubject', { subject: pick(first.title) })}</a>` : ''}
            <button class="btn btn-soft" type="button" data-open-search>${icon('search')} ${tr('searchCta')}</button>
          </div>
          <div class="hero-stats">
            <div class="stat"><strong>${subjects.length}</strong><span>${tr('totalSubjects')}</span></div>
            <div class="stat"><strong>${chapterCount}</strong><span>${tr('totalChapters')}</span></div>
            <div class="stat"><strong>${topics.length}</strong><span>${tr('totalNotes')}</span></div>
            ${updated ? `<div class="stat">${updated}</div>` : ''}
          </div>
        </div>
        <svg class="hero-art" viewBox="0 0 430 320" role="img" aria-label="Vector addition illustration">
          <defs>
            <linearGradient id="heroGradient" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" style="stop-color: var(--primary)"></stop>
              <stop offset="1" style="stop-color: var(--primary-2)"></stop>
            </linearGradient>
            <pattern id="heroGrid" width="26" height="26" patternUnits="userSpaceOnUse">
              <path d="M26 0H0V26" fill="none" stroke="var(--border-strong)" stroke-width="1" opacity=".55"></path>
            </pattern>
            <marker id="heroArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="var(--primary-2)"></path>
            </marker>
          </defs>
          <rect x="18" y="18" width="394" height="284" rx="22" fill="var(--surface-solid)" opacity=".55"></rect>
          <rect class="art-grid" x="18" y="18" width="394" height="284" rx="22" fill="url(#heroGrid)"></rect>
          <circle class="art-orbit" cx="215" cy="160" r="128"></circle>
          <line class="art-axis" x1="64" y1="252" x2="376" y2="252"></line>
          <line class="art-axis" x1="64" y1="252" x2="64" y2="52"></line>
          <text x="372" y="274">x</text><text x="42" y="54">y</text>
          <line class="art-vector thin" x1="64" y1="252" x2="206" y2="164" marker-end="url(#heroArrow)"></line>
          <line class="art-vector thin" x1="206" y1="164" x2="330" y2="82" marker-end="url(#heroArrow)"></line>
          <line class="art-vector" x1="64" y1="252" x2="330" y2="82" marker-end="url(#heroArrow)"></line>
          <line class="art-guide" x1="330" y1="82" x2="330" y2="252"></line>
          <line class="art-guide" x1="64" y1="82" x2="330" y2="82"></line>
          <circle class="art-node" cx="64" cy="252" r="6"></circle>
          <circle class="art-node-secondary" cx="206" cy="164" r="5"></circle>
          <circle class="art-node" cx="330" cy="82" r="6"></circle>
          <text x="124" y="222">A⃗</text>
          <text x="250" y="118">B⃗</text>
          <text x="252" y="68">R⃗ = A⃗ + B⃗</text>
          <text x="336" y="176">Δy</text>
          <text x="188" y="270">Δx</text>
        </svg>
      </div>
    </section>`;
  }
  function renderHome() {
    const subjects = getSubjects();
    const topics = allTopics();
    const chapterCount = subjects.reduce((sum, subject) => sum + getChapters(subject).length, 0);
    const latest = [...topics].sort(byUpdated).slice(0, 6);
    const last = findByKey(state.lastTopic);
    return `<div class="content-wrap">
      ${renderHero(subjects, topics, chapterCount, latest)}
      ${last ? `<a class="continue-strip" href="${topicUrl(last.subject, last.chapter, last.topic)}">
        <span class="continue-icon">${icon('clock')}</span>
        <span class="continue-text"><small>${tr('continueReading')}</small><strong>${escapeHtml(pick(last.topic.title))}</strong></span>
        ${icon('arrow-right')}
      </a>` : ''}
      ${renderFeaturedSpotlight()}
      <section class="section-block">
        <div class="section-head">
          <div><h2 class="section-title">${tr('subjects')}</h2><p class="section-subtitle">${tr('librarySubtitle')}</p></div>
          <a class="section-link" href="${notesUrl()}">${tr('viewAll')} ${icon('arrow-right')}</a>
        </div>
        <div class="subject-grid">${subjects.map(renderSubjectCard).join('')}</div>
      </section>
      <section class="section-block">
        <div class="section-head">
          <div><h2 class="section-title">${tr('latestNotes')}</h2><p class="section-subtitle">${tr('updatedOn', { date: latest[0] ? formatDate(latest[0].topic.updated) : '—' })}</p></div>
          <a class="section-link" href="${notesUrl()}">${tr('viewAll')} ${icon('arrow-right')}</a>
        </div>
        <div class="note-grid">${latest.map(renderTopicCard).join('') || renderEmpty(tr('comingSoon'), tr('emptyChapter'))}</div>
      </section>
      <section class="section-block">
        <div class="feature-grid">
          <article class="feature-card"><span class="feature-icon">${icon('layers')}</span><h3>${tr('featureStructureTitle')}</h3><p>${tr('featureStructureText')}</p></article>
          <article class="feature-card"><span class="feature-icon">${icon('globe')}</span><h3>${tr('featureBilingualTitle')}</h3><p>${tr('featureBilingualText')}</p></article>
          <article class="feature-card"><span class="feature-icon">${icon('command')}</span><h3>${tr('featureSearchTitle')}</h3><p>${tr('featureSearchText')}</p></article>
        </div>
      </section>
      ${renderFooter()}
    </div>`;
  }
  function renderFilterChip(id, label, count, iconHtml) {
    const active = state.libraryFilter === id;
    return `<button class="filter-chip ${active ? 'active' : ''}" type="button" data-action="library-filter" data-filter="${escapeAttr(id)}">
      ${iconHtml}<span>${escapeHtml(label)}</span><span class="count">${count}</span>
    </button>`;
  }
  function renderLibrary() {
    const subjects = getSubjects();
    const topics = [...allTopics()].sort(byUpdated);
    const visible = state.libraryFilter === 'all' ? topics : topics.filter(entry => entry.subject.id === state.libraryFilter);
    return `<div class="content-wrap">
      <section class="page-hero" style="--accent:var(--primary)">
        <div class="page-hero-top"><span class="page-icon">${icon('layers')}</span><div><span class="page-kicker">${tr('allNotes')}</span><h1>${tr('libraryTitle')}</h1></div></div>
        <p class="page-lead">${tr('librarySubtitle')}</p>
        <div class="page-stats"><span class="page-stat"><strong>${topics.length}</strong> ${tr('notes')}</span><span class="page-stat"><strong>${subjects.length}</strong> ${tr('subjects')}</span></div>
      </section>
      <div class="filter-bar" role="group" aria-label="${escapeAttr(tr('filter'))}">
        ${renderFilterChip('all', tr('filterAll'), topics.length, icon('filter'))}
        ${subjects.map(subject => renderFilterChip(subject.id, pick(subject.title), topics.filter(entry => entry.subject.id === subject.id).length, `<span>${escapeHtml(subject.icon)}</span>`)).join('')}
      </div>
      <div class="note-grid">${visible.map(renderTopicCard).join('') || renderEmpty(tr('comingSoon'), tr('emptyLibrary'))}</div>
      ${renderFooter()}
    </div>`;
  }
  function renderChapterCard(subject, chapter, index) {
    const topics = getTopics(subject, chapter);
    return `<article class="chapter-card" style="--accent:${safeAccent(subject.accent)}">
      <div class="chapter-card-head">
        <div>
          <span class="chapter-index">${tr('chapter')} ${String(index + 1).padStart(2, '0')}</span>
          <h3><a href="${chapterUrl(subject, chapter)}">${escapeHtml(pick(chapter.title))}</a></h3>
          <p>${escapeHtml(pick(chapter.description))}</p>
        </div>
        <a class="round-link" href="${chapterUrl(subject, chapter)}" aria-label="${escapeAttr(tr('openChapter'))}">${icon('arrow-up-right')}</a>
      </div>
      <div class="chapter-topic-list">
        ${topics.map(topic => {
          const read = state.read.has(keyOf(subject.id, chapter.id, topic.id));
          return `<a class="chapter-topic ${read ? 'is-read' : ''}" href="${topicUrl(subject, chapter, topic)}">
            <span class="topic-check">${read ? icon('check') : ''}</span>
            <span>${escapeHtml(pick(topic.title))}</span>
            <span class="chapter-topic-meta">${topic.readingTime}′</span>
          </a>`;
        }).join('') || `<span class="empty-chapter">${tr('comingSoon')}</span>`}
      </div>
    </article>`;
  }
  function renderSubjectView(subject) {
    const chapters = getChapters(subject);
    const topicCount = chapters.reduce((sum, chapter) => sum + getTopics(subject, chapter).length, 0);
    const first = allTopics().find(entry => entry.subject.id === subject.id);
    return `<div class="content-wrap">
      ${renderBreadcrumb([{ label: tr('home'), href: homeUrl() }, { label: tr('allNotes'), href: notesUrl() }], pick(subject.title))}
      <section class="page-hero" style="--accent:${safeAccent(subject.accent)}">
        <div class="page-hero-top"><span class="page-icon">${escapeHtml(subject.icon)}</span><div><span class="page-kicker">${tr('subjectOverview')}</span><h1>${escapeHtml(pick(subject.title))}</h1></div></div>
        <p class="page-lead">${escapeHtml(pick(subject.description))}</p>
        <div class="page-stats">
          <span class="page-stat"><strong>${chapters.length}</strong> ${tr('chapters')}</span>
          <span class="page-stat"><strong>${topicCount}</strong> ${tr('topics')}</span>
          ${first ? `<a class="btn btn-primary" href="${topicUrl(first.subject, first.chapter, first.topic)}">${icon('book')} ${tr('startReading')}</a>` : ''}
        </div>
      </section>
      <div class="chapter-stack">${chapters.map((chapter, index) => renderChapterCard(subject, chapter, index)).join('')}</div>
      ${renderFooter()}
    </div>`;
  }
  function renderFeaturedSpotlight() {
    const item = featuredChapters()[0];
    if (!item) return '';
    const { subject, chapter } = item;
    const meta = chapter.meta || {};
    const terms = (meta.keyTerms || []).slice(0, 6);
    return `<section class="vector-spotlight" style="--accent:${safeAccent(subject.accent)}">
      <div class="vector-spotlight-copy">
        <span class="spotlight-kicker">${icon('sparkles')} ${tr('featuredChapter')} · ${escapeHtml(pick(meta.bookChapter))}</span>
        <h2>${escapeHtml(pick(chapter.title))} <span>VECTOR</span></h2>
        <p>${escapeHtml(pick(chapter.description))}</p>
        <div class="spotlight-terms">${terms.map(term => `<span>${escapeHtml(pick(term))}</span>`).join('')}</div>
        <div class="spotlight-actions">
          <a class="btn btn-primary" href="${chapterUrl(subject, chapter)}">${icon('book')} ${tr('exploreChapter')}</a>
          <span class="spotlight-meta">${icon('layers')} ${getTopics(subject, chapter).length} ${tr('topics')}</span>
        </div>
      </div>
      ${meta.figure ? renderFigure({ src: meta.figure.src, alt: meta.figure.alt }, 'vector-spotlight-figure') : ''}
    </section>`;
  }
  function renderRoadmapCard(entry, index) {
    const { subject, chapter, topic } = entry;
    const read = state.read.has(entryKey(entry));
    const no = topic.sectionNo ? pick(topic.sectionNo) : String(index + 1).padStart(2, '0');
    return `<a class="roadmap-card ${read ? 'is-read' : ''}" href="${topicUrl(subject, chapter, topic)}" style="--accent:${safeAccent(subject.accent)}">
      <div class="roadmap-top"><span class="roadmap-no">${escapeHtml(no)}</span><span class="roadmap-min">${icon('clock')} ${tr('minRead', { count: topic.readingTime })}</span></div>
      <h3>${escapeHtml(pick(topic.title))}</h3>
      <p>${escapeHtml(pick(topic.summary))}</p>
      <span class="roadmap-cta">${read ? icon('check') : icon('book')} ${read ? tr('markedRead') : tr('readTopic')} ${icon('arrow-right')}</span>
    </a>`;
  }
  function renderRichChapterView(subject, chapter) {
    const meta = chapter.meta || {};
    const topics = getTopics(subject, chapter).map(topic => ({ subject, chapter, topic }));
    const first = topics[0];
    const figureSet = new Set();
    if (meta.figure && meta.figure.src) figureSet.add(meta.figure.src);
    topics.forEach(({ topic }) => (topic.sections || []).forEach(section => {
      (section.blocks || []).forEach(block => {
        if (block.type === 'figure' && block.src) figureSet.add(block.src);
      });
    }));
    const terms = meta.keyTerms || [];
    const outcomeItems = meta.outcomes || [];
    const formulas = meta.quickFormulas || [];
    return `<div class="content-wrap vector-chapter">
      ${renderBreadcrumb([
        { label: tr('home'), href: homeUrl() },
        { label: pick(subject.title), href: subjectUrl(subject) }
      ], pick(chapter.title))}
      <section class="vector-hero" style="--accent:${safeAccent(subject.accent)}">
        <div class="vector-hero-grid">
          <div class="vector-hero-copy">
            <div class="vector-hero-badge"><span>${icon('book')} ${escapeHtml(pick(meta.bookChapter))}</span><span>${escapeHtml(pick(meta.bookTitle))}</span></div>
            <h1>${escapeHtml(pick(chapter.title))}<span>VECTOR</span></h1>
            <p class="vector-lead">${inline(meta.intro)}</p>
            <div class="vector-big-idea">${icon('sparkles')}<span>${inline(meta.bigIdea)}</span></div>
            <div class="vector-hero-actions">
              ${first ? `<a class="btn btn-primary" href="${topicUrl(first.subject, first.chapter, first.topic)}">${icon('book')} ${tr('startChapter')}</a>` : ''}
              <button class="btn btn-soft" type="button" data-open-search>${icon('search')} ${tr('searchCta')}</button>
            </div>
            <div class="vector-stats">
              <div><strong>${topics.length}</strong><span>${tr('topics')}</span></div>
              <div><strong>${outcomeItems.length}</strong><span>${tr('outcomes')}</span></div>
              <div><strong>${figureSet.size}</strong><span>${tr('figure')}</span></div>
              <div><strong>${formulas.length}</strong><span>${tr('quickFormulas')}</span></div>
            </div>
          </div>
          ${meta.figure ? renderFigure(meta.figure, 'vector-hero-figure') : ''}
        </div>
        ${meta.sourceNote ? `<p class="vector-source-note">${icon('info')} ${inline(meta.sourceNote)}</p>` : ''}
      </section>
      <section class="vector-panel vector-terms">
        <div class="vector-panel-head"><span>${icon('globe')}</span><div><p class="vector-eyebrow">${tr('bookSource')}</p><h2>${tr('keyTerms')}</h2></div></div>
        <div class="term-cloud">${terms.map(term => `<span class="term-chip">${escapeHtml(pick(term))}</span>`).join('')}</div>
      </section>
      <div class="vector-split">
        <section class="vector-panel outcomes-panel">
          <div class="vector-panel-head"><span>${icon('target')}</span><div><p class="vector-eyebrow">${tr('sectionNo')} ২.১–২.১২</p><h2>${tr('learningOutcomes')}</h2></div></div>
          <ol class="outcome-list">${outcomeItems.map(item => `<li>
            <span class="outcome-no">${escapeHtml(item.no)}</span>
            <span class="outcome-text">${inline(item.text)}</span>
            <span class="outcome-section">§ ${inline(item.section)}</span>
          </li>`).join('')}</ol>
        </section>
        <section class="vector-panel formula-panel">
          <div class="vector-panel-head"><span>${icon('sparkles')}</span><div><p class="vector-eyebrow">${tr('formulaSheet')}</p><h2>${tr('quickFormulas')}</h2></div></div>
          <div class="quick-formula-list">${formulas.map(item => `<div class="quick-formula">
            <span class="equation-no">${tr('equation')} ${escapeHtml(item.no)}</span>
            <code>${vectorNotation(escapeHtml(item.math))}</code>
            <p>${inline(item.note)}</p>
          </div>`).join('')}</div>
        </section>
      </div>
      <section class="section-block">
        <div class="section-head"><div><h2 class="section-title">${tr('chapterMap')}</h2><p class="section-subtitle">${escapeHtml(pick(chapter.description))}</p></div></div>
        <div class="roadmap-grid">${topics.map(renderRoadmapCard).join('') || renderEmpty(tr('comingSoon'), tr('emptyChapter'))}</div>
      </section>
      ${renderFooter()}
    </div>`;
  }
  function renderChapterView(subject, chapter) {
    if (chapter.meta) return renderRichChapterView(subject, chapter);
    const topics = getTopics(subject, chapter).map(topic => ({ subject, chapter, topic }));
    return `<div class="content-wrap">
      ${renderBreadcrumb([
        { label: tr('home'), href: homeUrl() },
        { label: pick(subject.title), href: subjectUrl(subject) }
      ], pick(chapter.title))}
      <section class="page-hero" style="--accent:${safeAccent(subject.accent)}">
        <div class="page-hero-top"><span class="page-icon">${icon('layers')}</span><div><span class="page-kicker">${tr('chapterOverview')}</span><h1>${escapeHtml(pick(chapter.title))}</h1></div></div>
        <p class="page-lead">${escapeHtml(pick(chapter.description))}</p>
        <div class="page-stats">
          <span class="page-stat"><strong>${topics.length}</strong> ${tr('topics')}</span>
          <a class="btn btn-soft" href="${subjectUrl(subject)}">${icon('arrow-left')} ${escapeHtml(pick(subject.title))}</a>
        </div>
      </section>
      <section class="section-block">
        <div class="section-head"><div><h2 class="section-title">${tr('chapterTopics')}</h2></div></div>
        <div class="note-grid">${topics.map(renderTopicCard).join('') || renderEmpty(tr('comingSoon'), tr('emptyChapter'))}</div>
      </section>
      ${renderFooter()}
    </div>`;
  }
  function renderBlock(block) {
    if (!block) return '';
    switch (block.type) {
      case 'p':
        return `<p>${inline(block.text)}</p>`;
      case 'list':
        return `<ul>${(block.items || []).map(item => `<li>${inline(item)}</li>`).join('')}</ul>`;
      case 'steps':
        return `<ol class="step-list">${(block.items || []).map(item => `<li>${inline(item)}</li>`).join('')}</ol>`;
      case 'formula':
        return `<div class="formula-box">
          <div class="formula-label">${icon('sparkles')} ${tr('formula')}</div>
          <code>${vectorNotation(escapeHtml(block.math))}</code>
          ${block.caption ? `<p>${inline(block.caption)}</p>` : ''}
        </div>`;
      case 'callout': {
        const tone = ['tip', 'warning', 'info', 'activity'].includes(block.tone) ? block.tone : 'info';
        const meta = { tip: ['sparkles', tr('tip')], warning: ['alert', tr('warning')], info: ['info', tr('info')], activity: ['flask', tr('activity')] }[tone];
        return `<div class="callout callout-${tone}" aria-label="${escapeAttr(meta[1])}">
          <span class="callout-icon">${icon(meta[0])}</span>
          <div><strong>${inline(block.title)}</strong><p>${inline(block.text)}</p></div>
        </div>`;
      }
      case 'example':
        return `<div class="example">
          <div class="example-head">${icon('sparkles')} ${tr('example')} · ${inline(block.title)}</div>
          <div class="example-body">${(block.blocks || []).map(renderBlock).join('')}</div>
        </div>`;
      case 'table':
        return `<div class="table-wrap"><table class="data-table">
          <thead><tr>${(block.head || []).map(cell => `<th>${inline(cell)}</th>`).join('')}</tr></thead>
          <tbody>${(block.rows || []).map(row => `<tr>${(row || []).map(cell => `<td>${inline(cell)}</td>`).join('')}</tr>`).join('')}</tbody>
        </table></div>`;
      case 'qa':
        return `<details class="qa">
          <summary>${inline(block.question)}</summary>
          <div class="qa-body"><p><strong>${tr('answer')}:</strong> ${inline(block.answer)}</p></div>
        </details>`;
      case 'figure':
        return renderFigure(block);
      case 'glossary':
        return `<div class="glossary-block">
          <p class="block-label">${icon('globe')} ${tr('glossary')}</p>
          <dl class="glossary-list">${(block.items || []).map(item => `<div class="glossary-item">
            <dt>${inline(item.term)}</dt><dd>${inline(item.meaning)}</dd>
          </div>`).join('')}</dl>
        </div>`;
      case 'outcomes':
        return `<div class="outcomes-block">
          <p class="block-label">${icon('target')} ${tr('outcomes')}</p>
          <ol class="compact-outcomes">${(block.items || []).map(item => `<li>
            <span class="outcome-no">${escapeHtml(item.no)}</span>
            <span class="outcome-text">${inline(item.text)}</span>
            ${item.section ? `<span class="outcome-section">§ ${inline(item.section)}</span>` : ''}
          </li>`).join('')}</ol>
        </div>`;
      case 'formulaGrid':
        return `<div class="formula-sheet">
          <p class="block-label">${icon('sparkles')} ${tr('formulaSheet')}</p>
          <div class="formula-grid">${(block.items || []).map(item => `<article class="formula-card">
            <span class="equation-no">${tr('equation')} ${escapeHtml(item.no)}</span>
            <code>${vectorNotation(escapeHtml(item.math))}</code>
            ${item.note ? `<p>${inline(item.note)}</p>` : ''}
          </article>`).join('')}</div>
        </div>`;
      default:
        return `<p>${inline(block.text || '')}</p>`;
    }
  }
  function renderToc(sections) {
    return `<aside class="toc"><div class="toc-inner">
      <p class="toc-title">${icon('list')} ${tr('onThisPage')}</p>
      <ol>${sections.map((section, index) => `<li><button class="toc-link ${index === 0 ? 'active' : ''}" type="button" data-scroll-target="section-${index + 1}">${escapeHtml(pick(section.title))}</button></li>`).join('')}</ol>
      <button class="toc-top" type="button" data-action="scroll-top">${icon('arrow-right')} ${tr('backToTop')}</button>
    </div></aside>`;
  }
  function renderTopicPager(prev, next) {
    const prevHtml = prev
      ? `<a class="pager-link prev" href="${topicUrl(prev.subject, prev.chapter, prev.topic)}"><span class="pager-label">${icon('arrow-left')} ${tr('prevTopic')}</span><span class="pager-title">${escapeHtml(pick(prev.topic.title))}</span></a>`
      : `<span class="pager-disabled"><span class="pager-label">${icon('arrow-left')} ${tr('prevTopic')}</span><span class="pager-title">—</span></span>`;
    const nextHtml = next
      ? `<a class="pager-link next" href="${topicUrl(next.subject, next.chapter, next.topic)}"><span class="pager-label">${tr('nextTopic')} ${icon('arrow-right')}</span><span class="pager-title">${escapeHtml(pick(next.topic.title))}</span></a>`
      : `<span class="pager-disabled"><span class="pager-label">${tr('nextTopic')} ${icon('arrow-right')}</span><span class="pager-title">—</span></span>`;
    return `<nav class="topic-pager" aria-label="${escapeAttr(tr('topicNavigation'))}">${prevHtml}${nextHtml}</nav>`;
  }
  function renderTopicView(entry) {
    const { subject, chapter, topic } = entry;
    const sections = topic.sections || [];
    const isRead = state.read.has(entryKey(entry));
    const list = allTopics();
    const index = list.findIndex(item => entryKey(item) === entryKey(entry));
    const prev = index > 0 ? list[index - 1] : null;
    const next = index >= 0 && index < list.length - 1 ? list[index + 1] : null;
    const related = getTopics(subject, chapter)
      .filter(item => item.id !== topic.id)
      .slice(0, 3)
      .map(item => ({ subject, chapter, topic: item }));
    const tags = (topic.tags || []).slice(0, 5).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('');

    return `<div class="content-wrap article-wrap">
      ${renderBreadcrumb([
        { label: tr('home'), href: homeUrl() },
        { label: pick(subject.title), href: subjectUrl(subject) },
        { label: pick(chapter.title), href: chapterUrl(subject, chapter) }
      ], pick(topic.title))}
      ${chapter.meta ? `<a class="chapter-ribbon" href="${chapterUrl(subject, chapter)}">${icon('book')}<span>${tr('chapterGuide')} · ${escapeHtml(pick(chapter.title))}</span>${icon('arrow-right')}</a>` : ''}
      <div class="article-layout">
        <article class="article">
          <header class="article-header" style="--accent:${safeAccent(subject.accent)}">
            <div class="article-kicker">${escapeHtml(subject.icon)} ${escapeHtml(pick(subject.title))} · ${escapeHtml(pick(chapter.title))}${topic.sectionNo ? `<span class="section-chip">${escapeHtml(pick(topic.sectionNo))}</span>` : ''}</div>
            <h1>${escapeHtml(pick(topic.title))}</h1>
            <p class="lead">${escapeHtml(pick(topic.summary))}</p>
            <div class="article-meta">
              <span class="meta-item">${icon('clock')} ${tr('minRead', { count: topic.readingTime })}</span>
              <span class="meta-item">${icon('sparkles')} ${tr('updated')} ${formatDate(topic.updated)}</span>
              <span class="meta-item">${icon('layers')} ${escapeHtml(pick(chapter.title))}</span>
            </div>
            ${tags ? `<div class="tag-row">${tags}</div>` : ''}
            ${topic.draft ? `<div class="draft-banner">${icon('alert')} ${tr('draftNotice')}</div>` : ''}
            <div class="article-actions">
              <button class="btn ${isRead ? 'btn-soft' : 'btn-primary'}" type="button" data-action="mark-read" aria-pressed="${isRead}">
                ${icon(isRead ? 'check' : 'book')} ${isRead ? tr('markedRead') : tr('markRead')}
              </button>
              <button class="btn btn-soft" type="button" data-action="copy-link">${icon('copy')} ${tr('copyLink')}</button>
              <a class="btn btn-ghost" href="${chapterUrl(subject, chapter)}">${icon('layers')} ${tr('backToChapter')}</a>
            </div>
          </header>
          <div class="article-body">
            ${sections.map((section, sectionIndex) => `<section class="content-section" id="section-${sectionIndex + 1}">
              <h2><span class="section-number">${String(sectionIndex + 1).padStart(2, '0')}</span>${inline(section.title)}</h2>
              ${(section.blocks || []).map(renderBlock).join('')}
            </section>`).join('')}
          </div>
          ${renderTopicPager(prev, next)}
          ${related.length ? `<section class="related"><h2 class="section-title">${tr('relatedTopics')}</h2><div class="note-grid">${related.map(renderTopicCard).join('')}</div></section>` : ''}
        </article>
        ${renderToc(sections)}
      </div>
      ${renderFooter()}
    </div>`;
  }
  function renderNotFound() {
    return `<div class="content-wrap"><div class="not-found">
      ${icon('alert')}
      <h1>${tr('notFoundTitle')}</h1>
      <p>${tr('notFoundText')}</p>
      <div class="hero-actions" style="justify-content:center">
        <a class="btn btn-primary" href="${homeUrl()}">${icon('home')} ${tr('goHome')}</a>
        <button class="btn btn-soft" type="button" data-open-search>${icon('search')} ${tr('searchCta')}</button>
      </div>
    </div>${renderFooter()}</div>`;
  }

  /* ---------- router ---------- */
  function renderRoute(resetScroll = true) {
    const route = parseHash();
    state.route = route;
    let html = '';
    let title = '';
    let description = tr('metaDescription');

    if (route.view === 'home') {
      html = renderHome();
      title = `HSC Notes · ${tr('siteTagline')}`;
    } else if (route.view === 'notes') {
      html = renderLibrary();
      title = `${tr('allNotes')} · HSC Notes`;
      description = tr('librarySubtitle');
    } else if (route.view === 'subject') {
      const subject = findSubject(route.subjectId);
      if (subject) {
        html = renderSubjectView(subject);
        title = `${pick(subject.title)} · HSC Notes`;
        description = pick(subject.description);
      } else { html = renderNotFound(); title = `${tr('notFoundTitle')} · HSC Notes`; }
    } else if (route.view === 'chapter') {
      const subject = findSubject(route.subjectId);
      const chapter = findChapter(subject, route.chapterId);
      if (subject && chapter) {
        html = renderChapterView(subject, chapter);
        title = `${pick(chapter.title)} · ${pick(subject.title)} · HSC Notes`;
        description = pick(chapter.description);
      } else { html = renderNotFound(); title = `${tr('notFoundTitle')} · HSC Notes`; }
    } else if (route.view === 'topic') {
      const entry = findTopic(route.subjectId, route.chapterId, route.topicId, true);
      if (entry) {
        state.lastTopic = entryKey(entry);
        storageSet('hsc:lastTopic', state.lastTopic);
        html = renderTopicView(entry);
        title = `${pick(entry.topic.title)} · HSC Notes`;
        description = pick(entry.topic.summary);
      } else { html = renderNotFound(); title = `${tr('notFoundTitle')} · HSC Notes`; }
    } else {
      html = renderNotFound();
      title = `${tr('notFoundTitle')} · HSC Notes`;
    }

    main.innerHTML = html;
    document.title = title;
    metaDescription.setAttribute('content', description);
    renderSidebar();
    hydrateFigures();
    if (resetScroll) window.scrollTo(0, 0);
    requestAnimationFrame(() => { updateReadingProgress(); updateTocActive(); });
  }

  /* ---------- search ---------- */
  function buildSearchIndex() {
    state.searchIndex = allTopics().map(entry => {
      const meta = entry.chapter.meta || {};
      const fields = {
        title: normalize(flattenText([entry.topic.title, entry.topic.tags, entry.topic.sectionNo])),
        subject: normalize(flattenText([entry.subject.title, entry.subject.description])),
        chapter: normalize(flattenText([
          entry.chapter.title, entry.chapter.description, meta.bookChapter, meta.bookTitle,
          meta.intro, meta.bigIdea, meta.sourceNote, meta.keyTerms, meta.outcomes, meta.quickFormulas
        ])),
        summary: normalize(flattenText(entry.topic.summary)),
        body: normalize(flattenText([entry.topic.sections, entry.topic.sectionNo]))
      };
      return { entry, fields, haystack: Object.values(fields).join(' ') };
    });
  }
  function searchNotes(query) {
    const q = normalize(query);
    const tokens = tokensFrom(query);
    if (!tokens.length) return [];
    const results = [];
    for (const item of state.searchIndex) {
      let score = 0;
      if (item.fields.title.includes(q)) score += 24;
      let matchesAll = true;
      for (const token of tokens) {
        if (!item.haystack.includes(token)) { matchesAll = false; break; }
        if (item.fields.title.includes(token)) score += 9;
        if (item.fields.chapter.includes(token)) score += 4;
        if (item.fields.subject.includes(token)) score += 3;
        if (item.fields.summary.includes(token)) score += 3;
        if (item.fields.body.includes(token)) score += 1;
      }
      if (matchesAll && score > 0) results.push({ ...item, score });
    }
    return results.sort((a, b) => b.score - a.score || byUpdated(a.entry, b.entry)).slice(0, 12);
  }
  function makeSnippet(entry, query) {
    const summary = pick(entry.topic.summary);
    const body = flattenText(entry.topic.sections);
    const source = summary || body;
    const token = tokensFrom(query)[0] || '';
    const index = token ? source.toLowerCase().indexOf(token) : -1;
    if (index < 0) return source.length > 150 ? `${source.slice(0, 150)}…` : source;
    const start = Math.max(0, index - 45);
    const end = Math.min(source.length, start + 175);
    return `${start ? '…' : ''}${source.slice(start, end)}${end < source.length ? '…' : ''}`;
  }
  function highlight(text, query) {
    const safe = escapeHtml(text == null ? '' : text);
    const tokens = [...new Set(tokensFrom(query).filter(token => token.length >= 2))]
      .sort((a, b) => b.length - a.length);
    if (!tokens.length) return safe;
    const pattern = tokens.map(token => escapeRegExp(escapeHtml(token))).join('|');
    return safe.replace(new RegExp(`(${pattern})`, 'gi'), '<mark>$1</mark>');
  }
  function renderQuickLinks() {
    const subjects = getSubjects().slice(0, 4);
    return `<div class="search-empty">
      <p class="result-count">${tr('quickLinks')}</p>
      <div class="quick-grid">
        <a class="quick-link" href="${notesUrl()}">${icon('layers')} ${tr('allNotes')}</a>
        ${subjects.map(subject => `<a class="quick-link" href="${subjectUrl(subject)}">${icon('arrow-right')} ${escapeHtml(pick(subject.title))}</a>`).join('')}
      </div>
      <p class="search-hint">${tr('searchHint')}</p>
    </div>`;
  }
  function renderSearchResults(query) {
    state.searchQuery = query;
    if (!normalize(query)) {
      searchResults.innerHTML = renderQuickLinks();
      state.searchActiveIndex = -1;
      return;
    }
    const matches = searchNotes(query);
    state.searchActiveIndex = matches.length ? 0 : -1;
    if (!matches.length) {
      searchResults.innerHTML = `<div class="no-results">${icon('search')}<h3>${tr('noResults')}</h3><p>${tr('noResultsText')}</p></div>`;
      return;
    }
    searchResults.innerHTML = `<p class="result-count">${tr('resultCount', { count: matches.length })}</p>` + matches.map((match, index) => {
      const { subject, chapter, topic } = match.entry;
      return `<a class="search-result ${index === 0 ? 'is-active' : ''}" href="${topicUrl(subject, chapter, topic)}" data-index="${index}">
        <span class="result-icon" style="--accent:${safeAccent(subject.accent)}">${escapeHtml(subject.icon)}</span>
        <span class="result-main">
          <span class="result-path">${escapeHtml(pick(subject.title))} / ${escapeHtml(pick(chapter.title))}</span>
          <strong>${highlight(pick(topic.title), query)}</strong>
          <span class="result-snippet">${highlight(makeSnippet(match.entry, query), query)}</span>
        </span>
        <span class="result-enter">${icon('arrow-right')}</span>
      </a>`;
    }).join('');
  }
  function openSearch() {
    if (state.searchOpen) return;
    state.searchOpen = true;
    state.searchReturnFocus = document.activeElement;
    searchModal.hidden = false;
    document.body.classList.add('modal-open');
    searchInput.value = '';
    renderSearchResults('');
    requestAnimationFrame(() => searchInput.focus());
  }
  function closeSearch(restoreFocus = true) {
    if (!state.searchOpen) return;
    state.searchOpen = false;
    searchModal.hidden = true;
    document.body.classList.remove('modal-open');
    searchInput.value = '';
    state.searchQuery = '';
    state.searchActiveIndex = -1;
    if (restoreFocus && state.searchReturnFocus && typeof state.searchReturnFocus.focus === 'function') {
      state.searchReturnFocus.focus();
    }
  }
  function moveSearchSelection(delta) {
    const items = [...searchResults.querySelectorAll('.search-result')];
    if (!items.length) return;
    state.searchActiveIndex = (state.searchActiveIndex + delta + items.length) % items.length;
    items.forEach((item, index) => item.classList.toggle('is-active', index === state.searchActiveIndex));
    items[state.searchActiveIndex].scrollIntoView({ block: 'nearest' });
  }
  function trapSearchFocus(event) {
    const focusables = [...searchDialog.querySelectorAll('button, input, a[href]')]
      .filter(el => !el.disabled && el.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  /* ---------- interactions ---------- */
  function toggleRead() {
    const route = state.route;
    if (route.view !== 'topic') return;
    const entry = findTopic(route.subjectId, route.chapterId, route.topicId, true);
    if (!entry) return;
    const key = entryKey(entry);
    let message;
    if (state.read.has(key)) { state.read.delete(key); message = tr('readUnmarked'); }
    else { state.read.add(key); message = tr('readMarked'); }
    saveSet('hsc:read', state.read);
    const y = window.scrollY;
    renderRoute(false);
    requestAnimationFrame(() => window.scrollTo(0, y));
    showToast(message);
  }
  async function copyCurrentLink() {
    const text = window.location.href;
    try {
      await navigator.clipboard.writeText(text);
      showToast(tr('copied'));
    } catch (error) {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (copyError) {}
      area.remove();
      showToast(ok ? tr('copied') : tr('copyFailed'));
    }
  }
  function isTypingTarget(target) {
    return target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
  }
  function handleDocumentClick(event) {
    const openSearchEl = event.target.closest('[data-open-search]');
    if (openSearchEl) { event.preventDefault(); openSearch(); return; }

    const closeSearchEl = event.target.closest('[data-close-search]');
    if (closeSearchEl) { closeSearch(); return; }

    if (searchModal.contains(event.target) && event.target.closest('a[href]')) { closeSearch(false); return; }
    if (sidebar.contains(event.target) && event.target.closest('a[href]')) { closeSidebar(); }

    const scrollTarget = event.target.closest('[data-scroll-target]');
    if (scrollTarget) {
      event.preventDefault();
      const target = document.getElementById(scrollTarget.dataset.scrollTarget);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.querySelectorAll('.toc-link').forEach(link => link.classList.toggle('active', link === scrollTarget));
      return;
    }

    const actionEl = event.target.closest('[data-action]');
    if (!actionEl) return;
    const action = actionEl.dataset.action;
    if (action === 'skip-to-content') {
      event.preventDefault();
      main.focus();
      return;
    }
    if (action === 'close-sidebar') { closeSidebar(); return; }
    if (action === 'scroll-top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    if (action === 'library-filter') {
      state.libraryFilter = actionEl.dataset.filter || 'all';
      renderRoute(false);
      return;
    }
    if (action === 'mark-read') { toggleRead(); return; }
    if (action === 'copy-link') { copyCurrentLink(); return; }
  }
  function handleKeydown(event) {
    if (event.isComposing) return;
    const key = event.key;
    const mod = event.metaKey || event.ctrlKey;
    if (mod && key.toLowerCase() === 'k') {
      event.preventDefault();
      state.searchOpen ? closeSearch() : openSearch();
      return;
    }
    if (key === '/' && !isTypingTarget(event.target) && !state.searchOpen) {
      event.preventDefault();
      if (state.sidebarOpen) closeSidebar();
      openSearch();
      return;
    }
    if (key === 'Escape') {
      if (state.searchOpen) { event.preventDefault(); closeSearch(); }
      else if (state.sidebarOpen) { event.preventDefault(); closeSidebar(); }
      return;
    }
    if (!state.searchOpen) return;
    if (key === 'ArrowDown') { event.preventDefault(); moveSearchSelection(1); return; }
    if (key === 'ArrowUp') { event.preventDefault(); moveSearchSelection(-1); return; }
    if (key === 'Enter') {
      const active = searchResults.querySelector('.search-result.is-active');
      if (active) { event.preventDefault(); active.click(); }
      return;
    }
    if (key === 'Tab') trapSearchFocus(event);
  }
  function updateReadingProgress() {
    const body = document.querySelector('.article-body');
    if (!body) { readingProgress.style.width = '0%'; return; }
    const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) || 68;
    const rect = body.getBoundingClientRect();
    const start = window.scrollY + rect.top - headerHeight - 20;
    const total = Math.max(body.offsetHeight - window.innerHeight * 0.65, 1);
    const passed = window.scrollY - start + window.innerHeight * 0.18;
    const percent = Math.min(1, Math.max(0, passed / total));
    readingProgress.style.width = `${percent * 100}%`;
  }
  function updateTocActive() {
    const sections = [...document.querySelectorAll('.content-section')];
    const links = [...document.querySelectorAll('.toc-link')];
    if (!sections.length || !links.length) return;
    let active = 0;
    sections.forEach((section, index) => { if (section.getBoundingClientRect().top < 150) active = index; });
    links.forEach((link, index) => link.classList.toggle('active', index === active));
  }
  function onScrollFrame() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      updateReadingProgress();
      updateTocActive();
      scrollTicking = false;
    });
  }
  function bindEvents() {
    menuBtn.addEventListener('click', () => state.sidebarOpen ? closeSidebar() : openSidebar());
    sidebarBackdrop.addEventListener('click', closeSidebar);
    themeBtn.addEventListener('click', toggleTheme);
    document.querySelectorAll('.lang-switch button').forEach(button => {
      button.addEventListener('click', () => setLanguage(button.dataset.lang));
    });
    searchInput.addEventListener('input', event => renderSearchResults(event.target.value));
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleKeydown);
    window.addEventListener('hashchange', () => {
      closeSidebar();
      closeSearch(false);
      renderRoute(true);
    });
    window.addEventListener('scroll', onScrollFrame, { passive: true });
    window.addEventListener('resize', onScrollFrame);
  }

  /* ---------- boot ---------- */
  function init() {
    if (!notes || !Array.isArray(notes.subjects) || !notes.subjects.length) {
      main.innerHTML = `<div class="content-wrap"><div class="empty-state"><h3>Content missing</h3><p>Check that data/registry.js and the subject files load before app.js.</p></div></div>`;
      return;
    }
    state.lang = storageGet('hsc:lang') === 'en' ? 'en' : 'bn';
    state.theme = storageGet('hsc:theme') === 'light' ? 'light' : 'dark';
    state.read = loadSet('hsc:read');
    state.lastTopic = storageGet('hsc:lastTopic') || '';
    buildSearchIndex();
    applyTheme(false);
    applyLanguage(false);
    bindEvents();
    renderRoute(true);
  }

  init();
})();
