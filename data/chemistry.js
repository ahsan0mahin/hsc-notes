(function (notes) {
  const { t, section, p, list, steps, formula, tip, warning, info, example, table, qa } = notes;

  notes.register({
    id: 'chemistry',
    order: 2,
    icon: '⚗',
    accent: '#10b981',
    title: t('রসায়ন', 'Chemistry'),
    description: t(
      'পরমাণু, বন্ধন ও বিক্রিয়ার মূল ধারণা—HSC সিলেবাস অনুযায়ী সাজানো।',
      'Atoms, bonding and reactions—organised around the HSC syllabus.'
    ),
    chapters: [
      {
        id: 'atomic-structure',
        order: 1,
        title: t('পরমাণুর গঠন', 'Atomic structure'),
        description: t(
          'ইলেকট্রনের অবস্থান বোঝার চারটি কোয়ান্টাম সংখ্যা ও অরবিটাল ধারণক্ষমতা।',
          'The four quantum numbers that describe an electron and orbital capacity.'
        ),
        topics: [
          {
            id: 'quantum-numbers',
            order: 1,
            readingTime: 8,
            updated: '2026-11-15',
            tags: ['quantum numbers', 'orbital', 'electron', 'atomic structure'],
            title: t('কোয়ান্টাম সংখ্যা', 'Quantum numbers'),
            summary: t(
              '`n`, `ℓ`, `mℓ`, `ms` এর মান, অর্থ, অনুমোদিত সীমা ও পাউলি নীতি।',
              'Values, meaning, allowed ranges for `n`, `ℓ`, `mℓ`, `ms`, and the Pauli principle.'
            ),
            sections: [
              section(t('চারটি সংখ্যা', 'The four numbers'), [
                p(t(
                  'একটি পরমাণুতে কোনো ইলেকট্রনের “ঠিকানা” বলতে তার শক্তিস্তর, উপস্তর, অরবিটাল ও স্পিন বোঝায়। এই চারটি তথ্য দেয় চারটি কোয়ান্টাম সংখ্যা।',
                  'An electron’s “address” in an atom means its shell, subshell, orbital and spin. Four quantum numbers describe exactly that.'
                )),
                table(
                  [
                    t('সংখ্যা', 'Number'),
                    t('নাম', 'Name'),
                    t('অনুমোদিত মান', 'Allowed values'),
                    t('বোঝায়', 'Describes')
                  ],
                  [
                    [t('`n`', '`n`'), t('প্রধান', 'Principal'), t('`1, 2, 3, …`', '`1, 2, 3, …`'), t('শক্তিস্তর / আকার', 'Shell / size')],
                    [t('`ℓ`', '`ℓ`'), t('সহকারী / অ্যাজিমুথাল', 'Azimuthal'), t('`0 … n−1`', '`0 … n−1`'), t('উপস্তর / আকৃতি', 'Subshell / shape')],
                    [t('`mℓ`', '`mℓ`'), t('চৌম্বকীয়', 'Magnetic'), t('`−ℓ … +ℓ`', '`−ℓ … +ℓ`'), t('অরবিটালের দিক', 'Orbital orientation')],
                    [t('`ms`', '`ms`'), t('স্পিন', 'Spin'), t('`+½, −½`', '`+½, −½`'), t('ইলেকট্রনের স্পিন', 'Electron spin')]
                  ]
                ),
                formula('ℓ = 0 → s   |   ℓ = 1 → p   |   ℓ = 2 → d   |   ℓ = 3 → f', t(
                  'উপস্তরের নাম।',
                  'Subshell labels.'
                )),
                list([
                  t('একটি উপস্তরে অরবিটাল সংখ্যা `2ℓ + 1`।', 'A subshell contains `2ℓ + 1` orbitals.'),
                  t('একটি অরবিটালে সর্বোচ্চ ২টি ইলেকট্রন থাকে, স্পিন বিপরীত হতে হয়।', 'An orbital holds at most 2 electrons with opposite spins.'),
                  t('একটি শক্তিস্তরে সর্বোচ্চ ইলেকট্রন `2n²`।', 'A shell holds at most `2n²` electrons.')
                ])
              ]),
              section(t('পাউলি নীতি ও ধারণক্ষমতা', 'Pauli principle and capacity'), [
                p(t(
                  '**পাউলির বর্জন নীতি:** একই পরমাণুতে দুটি ইলেকট্রনের চারটি কোয়ান্টাম সংখ্যা কখনোই এক হতে পারে না। তাই এক অরবিটালে দুটি ইলেকট্রন থাকলেই তাদের `ms` আলাদা হবে।',
                  '**Pauli exclusion principle:** no two electrons in the same atom can share all four quantum numbers. So two electrons in one orbital must have different `ms`.'
                )),
                formula('উপস্তরের ধারণক্ষমতা = 2(2ℓ + 1)', t('Maximum electrons in a subshell.', 'Maximum electrons in a subshell.')),
                formula('শক্তিস্তরের ধারণক্ষমতা = 2n²', t('Maximum electrons in a shell.', 'Maximum electrons in a shell.')),
                example(t('`n = 3`, `ℓ = 2` বিশ্লেষণ', 'Analyse `n = 3`, `ℓ = 2`'), [
                  steps([
                    t('`ℓ = 2` মানে `3d` উপস্তর।', '`ℓ = 2` means the `3d` subshell.'),
                    t('`mℓ = −2, −1, 0, +1, +2` — মোট ৫টি অরবিটাল।', '`mℓ = −2, −1, 0, +1, +2` — 5 orbitals.'),
                    t('প্রতিটিতে ২টি করে ইলেকট্রন, তাই ধারণক্ষমতা `10`।', '2 electrons each, so capacity is `10`.')
                  ])
                ]),
                info(t('হুন্ডের নীতি', "Hund's rule"), t(
                  'সমান শক্তির অরবিটালে ইলেকট্রন প্রথমে আলাদা আলাদাভাবে সমান্তরাল স্পিনে বসে, তারপর জোড়া হয়।',
                  'In equal-energy orbitals, electrons occupy singly with parallel spins before pairing.'
                ))
              ]),
              section(t('দ্রুত পরীক্ষা', 'Quick check'), [
                qa(t('`n = 2` হলে `ℓ` এর মান কী কী হতে পারে?', 'For `n = 2`, which `ℓ` values are allowed?'), t(
                  '`ℓ = 0` (`2s`) ও `ℓ = 1` (`2p`)। `ℓ = 2` অবৈধ, কারণ `ℓ` সর্বোচ্চ `n−1 = 1`।',
                  '`ℓ = 0` (`2s`) and `ℓ = 1` (`2p`). `ℓ = 2` is invalid because `ℓ` can be at most `n−1 = 1`.'
                )),
                qa(t('`4p` উপস্তরে কটি অরবিটাল ও কটি ইলেকট্রন?', 'How many orbitals/electrons in a `4p` subshell?'), t(
                  '`p` মানে `ℓ = 1`; অরবিটাল `2(1)+1 = 3`, ইলেকট্রন `2×3 = 6`।',
                  '`p` means `ℓ = 1`; orbitals `= 2(1)+1 = 3`, electrons `= 2×3 = 6`.'
                ))
              ])
            ]
          }
        ]
      },
      {
        id: 'chemical-bonding',
        order: 2,
        title: t('রাসায়নিক বন্ধন', 'Chemical bonding'),
        description: t(
          'আয়নীয়, সমযোজী ও পোলার বন্ধনের গঠন ও বৈশিষ্ট্য।',
          'Formation and properties of ionic, covalent and polar bonds.'
        ),
        topics: [
          {
            id: 'ionic-and-covalent-bonds',
            order: 1,
            readingTime: 7,
            updated: '2026-11-13',
            tags: ['bonding', 'ionic', 'covalent', 'electronegativity'],
            title: t('আয়নীয় ও সমযোজী বন্ধন', 'Ionic and covalent bonds'),
            summary: t(
              'ইলেকট্রন স্থানান্তর বনাম ভাগাভাগি, এবং ফলে তৈরি যৌগের ধর্ম।',
              'Electron transfer versus sharing, and the properties each produces.'
            ),
            sections: [
              section(t('আয়নীয় বন্ধন', 'Ionic bond'), [
                p(t(
                  'ধাতু ইলেকট্রন ত্যাগ করে ধনাত্মক আয়ন (`cation`) এবং অধাতু ইলেকট্রন গ্রহণ করে ঋণাত্মক আয়ন (`anion`) তৈরি করে। বিপরীত আধানের **স্থির-বৈদ্যুতিক আকর্ষণ**-ই আয়নীয় বন্ধন।',
                  'A metal loses electrons to form a cation; a non-metal gains them to form an anion. The **electrostatic attraction** between opposite ions is the ionic bond.'
                )),
                formula('Na → Na⁺ + e⁻   |   Cl + e⁻ → Cl⁻   |   Na⁺ + Cl⁻ → NaCl', t(
                  'NaCl গঠনের সরল ধাপ।',
                  'Simplified formation of NaCl.'
                )),
                list([
                  t('সাধারণত গলনাঙ্ক ও স্ফুটনাঙ্ক বেশি।', 'Usually high melting and boiling points.'),
                  t('কঠিন অবস্থায় বিদ্যুৎ পরিবাহী নয়, কিন্তু গলিত বা জলীয় দ্রবণে পরিবাহী।', 'Do not conduct as solids, but conduct when molten or dissolved.'),
                  t('আয়নগুলো নির্দিষ্ট দিক নির্ভর না করে ত্রিমাত্রিক জালিকায় সাজে।', 'Ions form a 3D lattice rather than a directional single pair.')
                ])
              ]),
              section(t('সমযোজী বন্ধন', 'Covalent bond'), [
                p(t(
                  'দুটি পরমাণু এক বা একাধিক ইলেকট্রন জোড়া **ভাগাভাগি** করে সমযোজী বন্ধন গড়ে। ভাগাভাগি সমান হলে অপোলার, অসমান হলে পোলার সমযোজী বন্ধন হয়।',
                  'Two atoms **share** one or more electron pairs in a covalent bond. Equal sharing is non-polar; unequal sharing is polar covalent.'
                )),
                formula('H· + ·H → H:H  (H–H)', t('হাইড্রোজেন অণুতে এক জোড়া ভাগাভাগি।', 'One shared pair in a hydrogen molecule.')),
                list([
                  t('বন্ধন দিকনির্ভর (directional); অণুর আকৃতি নির্ধারণ করে।', 'Bonds are directional and determine molecular shape.'),
                  t('অনেক সমযোজী যৌগের গলনাঙ্ক তুলনামূলক কম।', 'Many covalent compounds have comparatively low melting points.'),
                  t('সাধারণত বিদ্যুৎ পরিবাহী নয়, কারণ চলমান আয়ন থাকে না।', 'Usually poor conductors because there are no mobile ions.')
                ]),
                warning(t('তড়িৎঋণাত্মকতার নিয়ম', 'Electronegativity rule'), t(
                  '`ΔEN > 1.7` মানে আয়নীয়—এটা একটা **rule of thumb**, কঠোর নিয়ম নয়। `HF`-এর মতো বড় পার্থক্যেও পোলার সমযোজী বন্ধন থাকতে পারে।',
                  '`ΔEN > 1.7` suggests ionic, but it is only a **rule of thumb**, not a hard rule. Large differences such as `HF` can still be polar covalent.'
                ))
              ]),
              section(t('তুলনা ও অনুশীলন', 'Comparison and practice'), [
                table(
                  [t('বৈশিষ্ট্য', 'Property'), t('আয়নীয়', 'Ionic'), t('সমযোজী', 'Covalent')],
                  [
                    [t('ইলেকট্রন', 'Electrons'), t('স্থানান্তর', 'Transferred'), t('ভাগাভাগি', 'Shared')],
                    [t('একক', 'Unit'), t('আয়ন জালিকা', 'Ion lattice'), t('অণু', 'Molecule')],
                    [t('দিকনির্ভরতা', 'Directional'), t('না', 'No'), t('হ্যাঁ', 'Yes')],
                    [t('পরিবাহিতা', 'Conductivity'), t('গলিত/দ্রবণে', 'Molten / solution'), t('সাধারণত কম', 'Usually low')]
                  ]
                ),
                tip(t('মনে রাখুন', 'Memory aid'), t(
                  '“Transfer → ions → lattice” = আয়নীয়; “Share → pair → molecule” = সমযোজী।',
                  '“Transfer → ions → lattice” = ionic; “Share → pair → molecule” = covalent.'
                )),
                qa(t('`HCl` কি আয়নীয় না পোলার সমযোজী?', 'Is `HCl` ionic or polar covalent?'), t(
                  'গ্যাসীয় `HCl`-এ পোলার সমযোজী বন্ধন; পানিতে দ্রবীভূত হলে আয়নে বিচ্ছিন্ন হয়। অবস্থা উল্লেখ করা জরুরি।',
                  'Gaseous `HCl` has a polar covalent bond; in water it ionises. Always mention the state.'
                ))
              ])
            ]
          }
        ]
      }
    ]
  });
})(window.HSC_NOTES);
