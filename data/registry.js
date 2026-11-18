/*
 * HSC Notes content registry.
 *
 * This file runs before every subject file and before app.js.
 * Subject files call HSC_NOTES.register({...}) with chapters and topics.
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
  const example = (title, blocks) => ({ type: 'example', title, blocks });
  const table = (head, rows) => ({ type: 'table', head, rows });
  const qa = (question, answer) => ({ type: 'qa', question, answer });

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
    example,
    table,
    qa,
    register(subject) {
      if (!subject || !subject.id) throw new Error('A subject needs an id.');
      subjects.push(subject);
    }
  };
})();
