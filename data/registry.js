/*
 * HSC Notes content registry.
 *
 * This file runs before every subject file and before app.js.
 * Subject files call HSC_NOTES.register({...}) with chapters and topics.
 * Large chapters can call HSC_NOTES.registerChapter(subjectId, chapter).
 * Every visible string is written as t("বাংলা", "English").
 */
(function () {
  const t = (bn, en) => ({ bn, en });

  const section = (title, blocks) => ({ title, blocks });
  const p = text => ({ type: 'p', text });
  const list = items => ({ type: 'list', items });
  const steps = items => ({ type: 'steps', items });
  const formula = (math, caption) => ({ type: 'formula', math, caption });
  const callout = (tone, title, text) => ({ type: 'callout', tone, title, text });
  const tip = (title, text) => callout('tip', title, text);
  const warning = (title, text) => callout('warning', title, text);
  const info = (title, text) => callout('info', title, text);
  const activity = (title, text) => callout('activity', title, text);
  const example = (title, blocks) => ({ type: 'example', title, blocks });
  const table = (head, rows) => ({ type: 'table', head, rows });
  const qa = (question, answer) => ({ type: 'qa', question, answer });

  const figure = (src, caption, alt) => ({ type: 'figure', src, caption, alt });
  const term = (name, meaning) => ({ term: name, meaning });
  const glossary = items => ({ type: 'glossary', items });
  const outcome = (no, text, sectionRef) => ({ no, text, section: sectionRef });
  const outcomes = items => ({ type: 'outcomes', items });
  const equation = (no, math, note) => ({ no, math, note });
  const formulaGrid = items => ({ type: 'formulaGrid', items });

  const subjects = [];

  window.HSC_NOTES = {
    subjects,
    t,
    section,
    p,
    list,
    steps,
    formula,
    callout,
    tip,
    warning,
    info,
    activity,
    example,
    table,
    qa,
    figure,
    term,
    glossary,
    outcome,
    outcomes,
    equation,
    formulaGrid,
    register(subject) {
      if (!subject || !subject.id) throw new Error('A subject needs an id.');
      subjects.push(subject);
    },
    registerChapter(subjectId, chapter) {
      const subject = subjects.find(item => item.id === subjectId);
      if (!subject) throw new Error(`Unknown subject "${subjectId}" for chapter "${chapter && chapter.id}".`);
      if (!chapter || !chapter.id) throw new Error('A chapter needs an id.');
      subject.chapters = subject.chapters || [];
      subject.chapters.push(chapter);
    }
  };
})();
