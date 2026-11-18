(function (notes) {
  const { t, section, p, list, steps, formula, tip, warning, info, example, table, qa } = notes;

  notes.register({
    id: 'higher-math',
    order: 3,
    icon: '∑',
    accent: '#f59e0b',
    title: t('উচ্চতর গণিত', 'Higher Math'),
    description: t(
      'ম্যাট্রিক্স, নির্ণায়ক ও স্থানাঙ্ক জ্যামিতি—সূত্র, উদাহরণ ও প্রয়োগ।',
      'Matrices, determinants and coordinate geometry—formulas, examples and applications.'
    ),
    chapters: [
      {
        id: 'matrices-and-determinants',
        order: 1,
        title: t('ম্যাট্রিক্স ও নির্ণায়ক', 'Matrices and determinants'),
        description: t(
          '২×২ ম্যাট্রিক্সের নির্ণায়ক, বিপরীত ম্যাট্রিক্স ও গুণের নিয়ম।',
          '2×2 determinants, inverses and matrix multiplication rules.'
        ),
        topics: [
          {
            id: 'determinant-2x2',
            order: 1,
            readingTime: 6,
            updated: '2026-11-12',
            tags: ['matrix', 'determinant', 'inverse', 'cramer'],
            title: t('২×২ নির্ণায়ক', '2×2 determinant'),
            summary: t(
              '`ad − bc`, singular ম্যাট্রিক্স, বিপরীত ম্যাট্রিক্স ও ক্ষেত্রফলের স্কেল।',
              '`ad − bc`, singular matrices, inverses and area scale factor.'
            ),
            sections: [
              section(t('সংজ্ঞা', 'Definition'), [
                p(t(
                  '`A = [[a, b], [c, d]]` হলে তার নির্ণায়ক একটি সংখ্যা, যা ম্যাট্রিক্সটির রৈখিক রূপান্তর সম্পর্কে গুরুত্বপূর্ণ তথ্য দেয়।',
                  'For `A = [[a, b], [c, d]]`, the determinant is a number that reveals key facts about the linear transformation.'
                )),
                formula('det(A) = |A| = ad − bc', t('২×২ নির্ণায়কের সূত্র।', '2×2 determinant formula.')),
                table(
                  [t('অবস্থা', 'Case'), t('অর্থ', 'Meaning'), t('ফল', 'Consequence')],
                  [
                    [t('`det(A) ≠ 0`', '`det(A) ≠ 0`'), t('non-singular', 'Non-singular'), t('`A⁻¹` থাকে', '`A⁻¹` exists')],
                    [t('`det(A) = 0`', '`det(A) = 0`'), t('singular', 'Singular'), t('`A⁻¹` নেই', '`A⁻¹` does not exist')]
                  ]
                ),
                formula('A⁻¹ = 1/(ad − bc) [[d, −b], [−c, a]]', t('বিপরীত ম্যাট্রিক্স; শর্ত `ad − bc ≠ 0`।', 'Inverse matrix; requires `ad − bc ≠ 0`.'))
              ]),
              section(t('জ্যামিতিক অর্থ', 'Geometric meaning'), [
                p(t(
                  '২D তে `|det(A)|` হলো একক বর্গের ছবির ক্ষেত্রফল; চিহ্ন দিক-উল্টানো (orientation) বোঝায়। তাই `det(A) = 0` মানে ছবিটি একটা রেখায় ভেঙে পড়েছে।',
                  'In 2D, `|det(A)|` is the area of the image of the unit square; the sign tells whether orientation flips. So `det(A) = 0` means the image collapsed onto a line.'
                )),
                formula('ক্ষেত্রফল নতুন = |det(A)| × ক্ষেত্রফল পুরনো', t(
                  'Area scale factor.',
                  'Area scale factor.'
                ))
              ]),
              section(t('উদাহরণ ও ক্রেমার', 'Example and Cramer’s rule'), [
                example(t('`A = [[3, 1], [2, 4]]`', '`A = [[3, 1], [2, 4]]`'), [
                  steps([
                    t('`det(A) = 3×4 − 1×2 = 10`।', '`det(A) = 3×4 − 1×2 = 10`.'),
                    t('`A⁻¹ = (1/10) [[4, −1], [−2, 3]]`।', '`A⁻¹ = (1/10) [[4, −1], [−2, 3]]`.'),
                    t('যাচাই: `A·A⁻¹ = I₂`।', 'Check: `A·A⁻¹ = I₂`.')
                  ])
                ]),
                formula('x = (ed − bf)/Δ   |   y = (af − ec)/Δ   |   Δ = ad − bc', t(
                  '`ax + by = e`, `cx + dy = f` সমীকরণদ্বয়ের ক্রেমার সমাধান, যখন `Δ ≠ 0`।',
                  'Cramer’s solution for `ax + by = e`, `cx + dy = f`, when `Δ ≠ 0`.'
                )),
                warning(t('সবচেয়ে সাধারণ ভুল', 'Most common slip'), t(
                  '`ad − bc` লিখতে গিয়ে `ad + bc` বা `ab − cd` লিখবেন না: প্রধান কর্ণের গুণ থেকে অপ্রধান কর্ণের গুণ বাদ।',
                  'Do not write `ad + bc` or `ab − cd`: subtract the off-diagonal product from the main-diagonal product.'
                ))
              ]),
              section(t('অনুশীলন', 'Practice'), [
                qa(t('`[[2, 4], [1, 2]]` কি singular?', 'Is `[[2, 4], [1, 2]]` singular?'), t(
                  'হ্যাঁ; `det = 2×2 − 4×1 = 0`, তাই বিপরীত ম্যাট্রিক্স নেই।',
                  'Yes; `det = 2×2 − 4×1 = 0`, so no inverse exists.'
                ))
              ])
            ]
          },
          {
            id: 'matrix-multiplication',
            order: 2,
            readingTime: 7,
            updated: '2026-11-11',
            tags: ['matrix', 'multiplication', 'dimension', 'identity'],
            title: t('ম্যাট্রিক্সের গুণ', 'Matrix multiplication'),
            summary: t(
              'মাত্রা মেলানো, সারি-কলাম ডট গুণ, অ-বিনিময়যোগ্যতা ও একক ম্যাট্রিক্স।',
              'Dimension matching, row-column dot products, non-commutativity and the identity matrix.'
            ),
            sections: [
              section(t('কখন গুণ সম্ভব?', 'When can we multiply?'), [
                p(t(
                  '`A` এর কলাম সংখ্যা `B` এর সারি সংখ্যার সমান হতে হয়। ফলাফলের মাত্রা হয় `A` এর সারি × `B` এর কলাম।',
                  'The number of columns of `A` must equal the number of rows of `B`. The result has `A`’s rows and `B`’s columns.'
                )),
                formula('(m × n)(n × p) = (m × p)', t('মাত্রার নিয়ম।', 'Dimension rule.')),
                formula('(AB)ᵢⱼ = Σₖ aᵢₖ bₖⱼ', t('`i`-তম সারি ও `j`-তম কলামের ডট গুণ।', 'Dot product of row `i` and column `j`.')),
                info(t('মনে রাখার উপায়', 'How to remember'), t(
                  '“ভেতরের দুই সংখ্যা মিললে বাইরের দুই সংখ্যা ফলাফলের মাত্রা হয়।”',
                  '“If the inner numbers match, the outer numbers give the output size.”'
                ))
              ]),
              section(t('গুরুত্বপূর্ণ ধর্ম', 'Important properties'), [
                list([
                  t('`AB ≠ BA` — সাধারণভাবে গুণ বিনিময়যোগ্য নয়।', '`AB ≠ BA` — multiplication is generally not commutative.'),
                  t('`(AB)C = A(BC)` — সহযোগী।', '`(AB)C = A(BC)` — associative.'),
                  t('`A(B + C) = AB + AC` — বণ্টনযোগ্য।', '`A(B + C) = AB + AC` — distributive.'),
                  t('`AI = IA = A` — `I` হলো একক ম্যাট্রিক্স।', '`AI = IA = A` — `I` is the identity matrix.')
                ]),
                warning(t('ক্রম বদলাবেন না', 'Keep the order'), t(
                  '`AB` সংজ্ঞায়িত হলেও `BA` সংজ্ঞায়িত নাও হতে পারে; দুটোই হলেও মান আলাদা হতে পারে।',
                  '`AB` may exist while `BA` does not; even when both exist, they can differ.'
                ))
              ]),
              section(t('কাজে দেখি', 'Worked example'), [
                example(t('`A = [[1, 2], [3, 4]]`, `B = [[5, 6], [7, 8]]`', '`A = [[1, 2], [3, 4]]`, `B = [[5, 6], [7, 8]]`'), [
                  p(t('`AB = [[1×5+2×7, 1×6+2×8], [3×5+4×7, 3×6+4×8]] = [[19, 22], [43, 50]]`।', '`AB = [[1×5+2×7, 1×6+2×8], [3×5+4×7, 3×6+4×8]] = [[19, 22], [43, 50]]`.')),
                  p(t('কিন্তু `BA = [[23, 34], [31, 46]]`; তাই `AB ≠ BA`।', 'But `BA = [[23, 34], [31, 46]]`; hence `AB ≠ BA`.'))
                ]),
                tip(t('দ্রুত যাচাই', 'Quick check'), t(
                  'প্রতিটি উপাদান = একটি সারি · একটি কলাম; উপাদানের সংখ্যা মিললে ভুল ধরা সহজ।',
                  'Each entry = one row · one column; matching counts makes mistakes easy to spot.'
                ))
              ]),
              section(t('অনুশীলন', 'Practice'), [
                qa(t('`A` `(2×3)`, `B` `(3×4)` হলে `AB` ও `BA` কী?', '`A` is `2×3`, `B` is `3×4`. What about `AB` and `BA`?'), t(
                  '`AB` সম্ভব ও মাত্রা `2×4`; `BA` সম্ভব নয় (`4 ≠ 2`)।',
                  '`AB` exists with size `2×4`; `BA` does not exist (`4 ≠ 2`).'
                ))
              ])
            ]
          }
        ]
      },
      {
        id: 'coordinate-geometry-3d',
        order: 2,
        title: t('ত্রিমাত্রিক স্থানাঙ্ক জ্যামিতি', '3D coordinate geometry'),
        description: t(
          'স্থানে দূরত্ব, মধ্যবিন্দু, বিভাজন সূত্র ও দিক-কোসাইন।',
          'Distance, midpoint, section formula and direction cosines in space.'
        ),
        topics: [
          {
            id: 'distance-and-section-3d',
            order: 1,
            readingTime: 7,
            updated: '2026-11-10',
            tags: ['3d geometry', 'distance', 'midpoint', 'direction cosines'],
            title: t('দূরত্ব, মধ্যবিন্দু ও বিভাজন সূত্র', 'Distance, midpoint and section formula'),
            summary: t(
              '`√((Δx)² + (Δy)² + (Δz)²)` থেকে শুরু করে অনুপাতে বিভাজন ও দিক-কোসাইন।',
              'From `√((Δx)² + (Δy)² + (Δz)²)` to ratio division and direction cosines.'
            ),
            sections: [
              section(t('দূরত্ব ও মধ্যবিন্দু', 'Distance and midpoint'), [
                p(t(
                  'দুটি বিন্দুর মধ্যে সরাসরি দূরত্ব বের করতে তিনটি অক্ষ বরাবর পার্থক্যের বর্গ যোগ করে বর্গমূল নেওয়া হয়।',
                  'For two points, square the differences along all three axes, add them, then take the square root.'
                )),
                formula('d = √((x₂−x₁)² + (y₂−y₁)² + (z₂−z₁)²)', t('ত্রিমাত্রিক দূরত্ব সূত্র।', '3D distance formula.')),
                formula('M = ((x₁+x₂)/2, (y₁+y₂)/2, (z₁+z₂)/2)', t('মধ্যবিন্দুর সূত্র।', 'Midpoint formula.')),
                example(t('`(1, −2, 3)` ও `(4, 2, −1)`', '`(1, −2, 3)` and `(4, 2, −1)`'), [
                  steps([
                    t('পার্থক্য `Δ = (3, 4, −4)`।', 'Differences `Δ = (3, 4, −4)`.'),
                    t('`d = √(9 + 16 + 16) = √41`।', '`d = √(9 + 16 + 16) = √41`.'),
                    t('`M = (5/2, 0, 1)`।', '`M = (5/2, 0, 1)`.')
                  ])
                ])
              ]),
              section(t('বিভাজন সূত্র', 'Section formula'), [
                p(t(
                  '`P` থেকে `Q` পর্যন্ত রেখাংশে `R` বিন্দুটি `PR : RQ = m : n` অনুপাতে ভাগ করলে নিচের সূত্রটি ব্যবহার হয়।',
                  'If `R` divides the segment from `P` to `Q` internally in the ratio `PR : RQ = m : n`, use the formula below.'
                )),
                formula('R = ((m x₂ + n x₁)/(m+n), (m y₂ + n y₁)/(m+n), (m z₂ + n z₁)/(m+n))', t(
                  'অন্তর্বিভাজনের সূত্র (`m+n ≠ 0`)।',
                  'Internal division formula (`m+n ≠ 0`).'
                )),
                tip(t('মধ্যবিন্দু হলো বিশেষ কেস', 'Midpoint is a special case'), t(
                  '`m = n = 1` বসালে উপরের সূত্রটি সরাসরি মধ্যবিন্দুর সূত্রে পরিণত হয়।',
                  'Putting `m = n = 1` turns the section formula into the midpoint formula.'
                ))
              ]),
              section(t('দিক-কোসাইন', 'Direction cosines'), [
                p(t(
                  'কোনো রেখা x, y, z অক্ষের সঙ্গে `α`, `β`, `γ` কোণ করলে `l = cos α`, `m = cos β`, `n = cos γ` কে দিক-কোসাইন বলে।',
                  'If a line makes angles `α`, `β`, `γ` with the x, y, z axes, then `l = cos α`, `m = cos β`, `n = cos γ` are its direction cosines.'
                )),
                formula('l = Δx/d   |   m = Δy/d   |   n = Δz/d   |   l² + m² + n² = 1', t(
                  'দূরত্ব `d` ও উপাংশের পার্থক্য থেকে দিক-কোসাইন।',
                  'Direction cosines from distance and component differences.'
                )),
                qa(t('উপরের উদাহরণে `l² + m² + n²` কত?', 'Find `l² + m² + n²` for the example above.'), t(
                  '`(3/√41)² + (4/√41)² + (−4/√41)² = (9+16+16)/41 = 1`।',
                  '`(3/√41)² + (4/√41)² + (−4/√41)² = (9+16+16)/41 = 1`.'
                ))
              ])
            ]
          }
        ]
      }
    ]
  });
})(window.HSC_NOTES);
