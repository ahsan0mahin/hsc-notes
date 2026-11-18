(function (notes) {
  const { t, section, p, list, steps, formula, tip, warning, info, example, table, qa } = notes;

  notes.register({
    id: 'physics',
    order: 1,
    icon: '⚛',
    accent: '#8b5cf6',
    title: t('পদার্থবিজ্ঞান', 'Physics'),
    description: t(
      'ভেক্টর, গতি, বল ও শক্তি—ধারণা থেকে অঙ্ক পর্যন্ত অধ্যায়ভিত্তিক নোট।',
      'Vectors, motion, force and energy—chapter-wise notes from concepts to problems.'
    ),
    chapters: [
      {
        id: 'vectors',
        order: 1,
        title: t('ভেক্টর', 'Vectors'),
        description: t(
          'যে রাশির মান ও দিক দুটোই আছে, তার গণনা ও প্রয়োগ।',
          'Quantities with both magnitude and direction, and how to work with them.'
        ),
        topics: [
          {
            id: 'scalars-and-vectors',
            order: 1,
            readingTime: 6,
            updated: '2026-11-18',
            tags: ['vector', 'scalar', 'basics', 'hsc'],
            title: t('স্কেলার ও ভেক্টর রাশি', 'Scalars and vectors'),
            summary: t(
              'স্কেলার, ভেক্টর, উপাংশ, একক ভেক্টর ও মান বের করার মূল ধারণা।',
              'Scalars, vectors, components, unit vectors and magnitude—the core ideas.'
            ),
            sections: [
              section(t('সংজ্ঞা ও পার্থক্য', 'Definition and difference'), [
                p(t(
                  '**স্কেলার রাশির** শুধু মান থাকে, দিক থাকে না; যেমন ভর, সময়, তাপমাত্রা বা দূরত্ব। **ভেক্টর রাশির** মান ও দিক দুটোই থাকে; যেমন সরণ, বেগ, ত্বরণ বা বল।',
                  '**A scalar** has magnitude only—mass, time, temperature or distance. **A vector** has both magnitude and direction—displacement, velocity, acceleration or force.'
                )),
                table(
                  [
                    t('বৈশিষ্ট্য', 'Feature'),
                    t('স্কেলার', 'Scalar'),
                    t('ভেক্টর', 'Vector')
                  ],
                  [
                    [t('মান', 'Magnitude'), t('থাকে', 'Yes'), t('থাকে', 'Yes')],
                    [t('দিক', 'Direction'), t('থাকে না', 'No'), t('থাকে', 'Yes')],
                    [t('যোগ', 'Addition'), t('সাধারণ গাণিতিক যোগ', 'Ordinary arithmetic'), t('ত্রিভুজ/সামান্তরিক নিয়ম', 'Triangle/parallelogram law')],
                    [t('উদাহরণ', 'Example'), t('৫ কেজি', '5 kg'), t('৫ মি/সে পূর্বদিকে', '5 m/s east')]
                  ]
                ),
                tip(t('মনে রাখার কৌশল', 'Memory trick'), t(
                  'প্রশ্নে “কতদূর” এলে সাধারণত দূরত্ব (স্কেলার); “কোন দিকে কতদূর” এলে সরণ (ভেক্টর)।',
                  '“How far” usually means distance (scalar); “how far and which way” means displacement (vector).'
                ))
              ]),
              section(t('উপাংশ ও মান', 'Components and magnitude'), [
                p(t(
                  'একটি ভেক্টরকে পারস্পরিক লম্ব অক্ষ বরাবর ভাঙা যায়। ত্রিমাত্রিকভাবে `î`, `ĵ`, `k̂` হলো x, y, z অক্ষের একক ভেক্টর।',
                  'A vector can be split along mutually perpendicular axes. In 3D, `î`, `ĵ` and `k̂` are the unit vectors along x, y and z.'
                )),
                formula('A⃗ = Aₓî + Aᵧĵ + A_zk̂', t(
                  'উপাংশ আকারে ভেক্টরের উপস্থাপন।',
                  'A vector written in component form.'
                )),
                formula('|A⃗| = √(Aₓ² + Aᵧ² + A_z²)', t(
                  'পিথাগোরাস ব্যবহার করে ভেক্টরের মান।',
                  'Magnitude from Pythagoras.'
                )),
                list([
                  t('`Aₓ`, `Aᵧ`, `A_z` যথাক্রমে x, y, z অক্ষের উপাংশ।', '`Aₓ`, `Aᵧ`, `A_z` are the x, y and z components.'),
                  t('উপাংশ ধনাত্মক বা ঋণাত্মক হতে পারে; মান কখনো ঋণাত্মক হয় না।', 'Components may be positive or negative; magnitude never is.'),
                  t('দিক কোণ বের করতে `tan θ = Aᵧ / Aₓ` ব্যবহার করা হয়, তবে quadrant দেখতে হয়।', 'Use `tan θ = Aᵧ / Aₓ` for direction, but always check the quadrant.')
                ]),
                formula('Â = A⃗ / |A⃗|', t(
                  'ভেক্টরকে তার মান দিয়ে ভাগ করলে একই দিকের একক ভেক্টর পাওয়া যায়।',
                  'Dividing a vector by its magnitude gives a unit vector in the same direction.'
                ))
              ]),
              section(t('সমান ও বিপরীত ভেক্টর', 'Equal and opposite vectors'), [
                p(t(
                  'দুটি ভেক্টর সমান হবে যদি তাদের মান ও দিক এক হয়; অবস্থান বদলালেও ভেক্টর বদলায় না। `-A⃗` একই মানের কিন্তু ঠিক বিপরীত দিকের ভেক্টর।',
                  'Two vectors are equal when their magnitudes and directions match; shifting position does not change a vector. `-A⃗` has the same magnitude but the exact opposite direction.'
                )),
                info(t('পরীক্ষায় কাজে লাগে', 'Useful in exams'), t(
                  'বিয়োগ মানে বিপরীত ভেক্টর যোগ: `A⃗ − B⃗ = A⃗ + (−B⃗)`।',
                  'Subtraction means adding the opposite: `A⃗ − B⃗ = A⃗ + (−B⃗)`.'
                ))
              ]),
              section(t('দ্রুত অনুশীলন', 'Quick practice'), [
                qa(t('৫ মি পূর্বদিকে ও ৫ মি পশ্চিমদিকে—দুটো কি একই ভেক্টর?', 'Are 5 m east and 5 m west the same vector?'), t(
                  'না। মান এক হলেও দিক আলাদা, তাই ভেক্টর আলাদা; এদের যোগফল শূন্য ভেক্টর।',
                  'No. The magnitude is the same but the direction differs, so the vectors differ; their sum is the zero vector.'
                )),
                qa(t('`A⃗ = (3, 4)` হলে মান ও দিক কত?', 'If `A⃗ = (3, 4)`, find magnitude and direction.'), t(
                  '`|A⃗| = √(3² + 4²) = 5`; `θ = tan⁻¹(4/3) ≈ 53.1°` (প্রথম quadrant)।',
                  '`|A⃗| = √(3² + 4²) = 5`; `θ = tan⁻¹(4/3) ≈ 53.1°` in the first quadrant.'
                ))
              ])
            ]
          },
          {
            id: 'vector-addition-subtraction',
            order: 2,
            readingTime: 8,
            updated: '2026-11-17',
            tags: ['vector', 'addition', 'resultant', 'components'],
            title: t('ভেক্টরের যোগ ও বিয়োগ', 'Vector addition and subtraction'),
            summary: t(
              'ত্রিভুজ ও সামান্তরিক নিয়ম, উপাংশ দিয়ে লব্ধি এবং দিক নির্ণয়।',
              'Triangle and parallelogram laws, resultants by components, and direction.'
            ),
            sections: [
              section(t('যোগের নিয়ম', 'Rules of addition'), [
                p(t(
                  'দুটি ভেক্টর যোগ করতে **ত্রিভুজ নিয়মে** প্রথম ভেক্টরের মাথায় দ্বিতীয়টির লেজ বসানো হয়; প্রথমটির লেজ থেকে দ্বিতীয়টির মাথা পর্যন্ত আঁকা ভেক্টরই লব্ধি `R⃗`।',
                  'In the **triangle rule**, place the tail of the second vector at the head of the first. The vector from the first tail to the second head is the resultant `R⃗`.'
                )),
                p(t(
                  '**সামান্তরিক নিয়মে** দুটি ভেক্টরকে একই বিন্দু থেকে আঁকা হয়; সেই বিন্দু থেকে বিপরীত কোণে আঁকা কর্ণই লব্ধি।',
                  'In the **parallelogram rule**, draw both vectors from the same point; the diagonal from that point is the resultant.'
                )),
                formula('R⃗ = A⃗ + B⃗ = B⃗ + A⃗', t(
                  'ভেক্টর যোগ বিনিময়যোগ্য (commutative)।',
                  'Vector addition is commutative.'
                )),
                formula('(A⃗ + B⃗) + C⃗ = A⃗ + (B⃗ + C⃗)', t(
                  'ভেক্টর যোগ সহযোগী (associative)।',
                  'Vector addition is associative.'
                )),
                warning(t('সাধারণ ভুল', 'Common mistake'), t(
                  'মানগুলো সরাসরি যোগ করবেন না (`3 + 4 = 7` সবসময় লব্ধি নয়)। দিক বা উপাংশ ধরে যোগ করতে হয়।',
                  'Do not just add magnitudes (`3 + 4 = 7` is not always the resultant). Add directions or components.'
                ))
              ]),
              section(t('উপাংশ পদ্ধতি', 'Component method'), [
                steps([
                  t('প্রতিটি ভেক্টরকে x ও y উপাংশে ভাঙুন।', 'Resolve each vector into x and y components.'),
                  t('একই অক্ষের উপাংশগুলো আলাদাভাবে যোগ করুন।', 'Add components along the same axis.'),
                  t('লব্ধির মান বের করুন পিথাগোরাস দিয়ে।', 'Find the resultant magnitude with Pythagoras.'),
                  t('`tan⁻¹` দিয়ে কোণ বের করুন এবং quadrant যাচাই করুন।', 'Find the angle with `tan⁻¹` and verify the quadrant.')
                ]),
                formula('Rₓ = Aₓ + Bₓ   |   Rᵧ = Aᵧ + Bᵧ', t('লব্ধির উপাংশ।', 'Resultant components.')),
                formula('|R⃗| = √(Rₓ² + Rᵧ²)   |   θ = tan⁻¹(Rᵧ / Rₓ)', t('লব্ধির মান ও দিক।', 'Resultant magnitude and direction.')),
                example(t('উদাহরণ: `A⃗ = (3, 4)`, `B⃗ = (1, −2)`', 'Example: `A⃗ = (3, 4)`, `B⃗ = (1, −2)`'), [
                  p(t('`R⃗ = (3+1, 4−2) = (4, 2)`; `|R⃗| = √(16+4) = √20 = 2√5`; `θ = tan⁻¹(2/4) ≈ 26.6°`।', '`R⃗ = (3+1, 4−2) = (4, 2)`; `|R⃗| = √(16+4) = √20 = 2√5`; `θ = tan⁻¹(2/4) ≈ 26.6°`.')),
                  p(t('`Rₓ` ও `Rᵧ` দুটোই ধনাত্মক, তাই কোণটি প্রথম quadrant-এ সঠিক।', 'Both `Rₓ` and `Rᵧ` are positive, so the angle correctly lies in the first quadrant.'))
                ])
              ]),
              section(t('বিয়োগ', 'Subtraction'), [
                p(t(
                  '`A⃗ − B⃗` মানে `A⃗` এর সঙ্গে `B⃗` এর বিপরীত ভেক্টর যোগ। উপাংশে `Rₓ = Aₓ − Bₓ` ও `Rᵧ = Aᵧ − Bᵧ`।',
                  '`A⃗ − B⃗` means adding the opposite of `B⃗` to `A⃗`. In components, `Rₓ = Aₓ − Bₓ` and `Rᵧ = Aᵧ − Bᵧ`.'
                )),
                formula('A⃗ − B⃗ = A⃗ + (−B⃗)', t('বিয়োগের অর্থ।', 'Meaning of subtraction.'))
              ]),
              section(t('অনুশীলন', 'Practice'), [
                qa(t('দুটি সমান মানের ভেক্টর পরস্পর লম্ব হলে লব্ধির মান কত?', 'Two equal vectors are perpendicular. Find the resultant magnitude.'), t(
                  '`|R⃗| = √(A² + A²) = A√2`; দিক মাঝামাঝি, অর্থাৎ প্রতিটির সঙ্গে `45°`।',
                  '`|R⃗| = √(A² + A²) = A√2`; the direction is halfway, `45°` from each.'
                )),
                qa(t('`Rₓ = −3`, `Rᵧ = 3` হলে `θ = −45°` বলা কি ঠিক?', 'If `Rₓ = −3`, `Rᵧ = 3`, is `θ = −45°` correct?'), t(
                  'না। এটি দ্বিতীয় quadrant, তাই x-অক্ষের ধনাত্মক দিক থেকে `θ = 135°`।',
                  'No. It is in the second quadrant, so `θ = 135°` from the positive x-axis.'
                ))
              ])
            ]
          },
          {
            id: 'dot-and-cross-product',
            order: 3,
            readingTime: 9,
            updated: '2026-11-16',
            tags: ['dot product', 'cross product', 'projection', 'angle'],
            title: t('স্কেলার গুণ ও ভেক্টর গুণ', 'Dot product and cross product'),
            summary: t(
              '`A⃗ · B⃗`, `A⃗ × B⃗`, অভিক্ষেপ, কোণ নির্ণয় ও ডান-হাত নিয়ম।',
              '`A⃗ · B⃗`, `A⃗ × B⃗`, projection, angle between vectors and the right-hand rule.'
            ),
            sections: [
              section(t('স্কেলার গুণ (Dot product)', 'Scalar / dot product'), [
                p(t(
                  'দুটি ভেক্টরের ডট গুণ একটি **স্কেলার** রাশি। কোনো ভেক্টরের উপর আরেকটির অভিক্ষেপ বা দুটির মধ্যবর্তী কোণ বের করতে এটি ব্যবহার হয়।',
                  'The dot product of two vectors is a **scalar**. It gives a projection or the angle between two vectors.'
                )),
                formula('A⃗ · B⃗ = AB cosθ = AₓBₓ + AᵧBᵧ + A_zB_z', t('সংজ্ঞা ও উপাংশ রূপ।', 'Definition and component form.')),
                formula('θ = cos⁻¹( (A⃗ · B⃗) / (|A⃗||B⃗|) )', t('দুটি ভেক্টরের মধ্যবর্তী কোণ।', 'Angle between two vectors.')),
                list([
                  t('লম্ব ভেক্টরের জন্য `θ = 90°`, তাই `A⃗ · B⃗ = 0`।', 'For perpendicular vectors `θ = 90°`, so `A⃗ · B⃗ = 0`.'),
                  t('সমদিকের জন্য `θ = 0°`, তাই ডট গুণ `AB`।', 'For the same direction `θ = 0°`, so the dot product is `AB`.'),
                  t('বিপরীত দিকের জন্য `θ = 180°`, তাই ডট গুণ `−AB`।', 'For opposite directions `θ = 180°`, so the dot product is `−AB`.')
                ]),
                info(t('কাজ ও ক্ষমতায়', 'In work and power'), t(
                  '`W = F⃗ · s⃗`—বল ও সরণ একই দিকে না হলে শুধু বলের অভিক্ষেপই কাজ করে।',
                  '`W = F⃗ · s⃗`—when force and displacement differ in direction, only the projected force does work.'
                ))
              ]),
              section(t('ভেক্টর গুণ (Cross product)', 'Vector / cross product'), [
                p(t(
                  'ক্রস গুণের ফল একটি **ভেক্টর**, যা `A⃗` ও `B⃗` দুটোরই লম্ব। দিক বের হয় ডান-হাত নিয়ম দিয়ে।',
                  'The cross product is a **vector** perpendicular to both `A⃗` and `B⃗`; its direction follows the right-hand rule.'
                )),
                formula('|A⃗ × B⃗| = AB sinθ', t('ক্রস গুণের মান; সমান্তরাল ভেক্টরের জন্য শূন্য।', 'Magnitude; zero for parallel vectors.')),
                formula('A⃗ × B⃗ = (AᵧB_z − A_zBᵧ)î + (A_zBₓ − AₓB_z)ĵ + (AₓBᵧ − AᵧBₓ)k̂', t('নির্ণায়ক/উপাংশ রূপ।', 'Determinant / component form.')),
                formula('A⃗ × B⃗ = −(B⃗ × A⃗)', t('ক্রস গুণ বিনিময়যোগ্য নয়।', 'The cross product is not commutative.')),
                warning(t('দিক ভুলবেন না', 'Do not miss the direction'), t(
                  '`A⃗ × B⃗` আর `B⃗ × A⃗` এর মান এক কিন্তু দিক বিপরীত। টর্ক ও চৌম্বক বলে এটি গুরুত্বপূর্ণ।',
                  '`A⃗ × B⃗` and `B⃗ × A⃗` have equal magnitude but opposite direction. This matters in torque and magnetic force.'
                ))
              ]),
              section(t('তুলনা', 'Comparison'), [
                table(
                  [t('বিষয়', 'Property'), t('ডট গুণ', 'Dot product'), t('ক্রস গুণ', 'Cross product')],
                  [
                    [t('ফল', 'Result'), t('স্কেলার', 'Scalar'), t('ভেক্টর', 'Vector')],
                    [t('ত্রিকোণমিতি', 'Trig'), t('`AB cosθ`', '`AB cosθ`'), t('`AB sinθ`', '`AB sinθ`')],
                    [t('শূন্য হয় যখন', 'Zero when'), t('`θ = 90°`', '`θ = 90°`'), t('`θ = 0°` বা `180°`', '`θ = 0°` or `180°`')],
                    [t('বিনিময়', 'Commutative'), t('হ্যাঁ', 'Yes'), t('না', 'No')]
                  ]
                )
              ]),
              section(t('অনুশীলন', 'Practice'), [
                qa(t('`A⃗ = (1, 2, 3)`, `B⃗ = (−2, 0, 1)` হলে `A⃗ · B⃗` কত?', 'Find `A⃗ · B⃗` for `A⃗ = (1, 2, 3)`, `B⃗ = (−2, 0, 1)`.'), t(
                  '`1(−2) + 2(0) + 3(1) = 1`। মান ধনাত্মক, তাই কোণ `90°` এর চেয়ে ছোট।',
                  '`1(−2) + 2(0) + 3(1) = 1`. It is positive, so the angle is less than `90°`.'
                )),
                qa(t('`î × ĵ` কত?', 'What is `î × ĵ`?'), t(
                  '`k̂`। আর `ĵ × î = −k̂`।', '`k̂`. And `ĵ × î = −k̂`.'
                ))
              ])
            ]
          }
        ]
      },
      {
        id: 'motion',
        order: 2,
        title: t('গতি', 'Motion'),
        description: t(
          'সরলরেখায় গতির মৌলিক রাশি ও গ্রাফভিত্তিক ধারণা।',
          'Fundamental quantities of straight-line motion and graph-based ideas.'
        ),
        topics: [
          {
            id: 'distance-and-displacement',
            order: 1,
            readingTime: 5,
            updated: '2026-11-14',
            tags: ['motion', 'distance', 'displacement', 'kinematics'],
            title: t('দূরত্ব ও সরণ', 'Distance and displacement'),
            summary: t(
              'পথের দৈর্ঘ্য বনাম প্রারম্ভ ও শেষ বিন্দুর মধ্যে সরাসরি ভেক্টর।',
              'Path length versus the straight vector from start to finish.'
            ),
            sections: [
              section(t('মূল পার্থক্য', 'Core difference'), [
                p(t(
                  '**দূরত্ব** হলো বস্তু যত পথ অতিক্রম করেছে—এটি স্কেলার ও সবসময় অঋণাত্মক। **সরণ** হলো প্রারম্ভিক অবস্থান থেকে শেষ অবস্থান পর্যন্ত সরাসরি ভেক্টর।',
                  '**Distance** is the total path travelled—a scalar, never negative. **Displacement** is the direct vector from the initial to the final position.'
                )),
                formula('Δr⃗ = r⃗₂ − r⃗₁', t('সরণের ভেক্টর রূপ।', 'Displacement in vector form.')),
                table(
                  [t('রাশি', 'Quantity'), t('ধরন', 'Type'), t('নির্ভর করে', 'Depends on')],
                  [
                    [t('দূরত্ব', 'Distance'), t('স্কেলার', 'Scalar'), t('সম্পূর্ণ পথ', 'Whole path')],
                    [t('সরণ', 'Displacement'), t('ভেক্টর', 'Vector'), t('শুধু শুরু ও শেষ', 'Only start and end')]
                  ]
                )
              ]),
              section(t('উদাহরণ', 'Example'), [
                example(t('৪ কিমি পূর্ব, তারপর ৪ কিমি পশ্চিম', '4 km east, then 4 km west'), [
                  p(t('দূরত্ব `= 4 + 4 = 8 কিমি`; শুরুতে ফিরে আসায় সরণ `= 0`।', 'Distance `= 4 + 4 = 8 km`; returning to the start makes displacement `= 0`.')),
                  p(t('গড় দ্রুতি ও গড় বেগ আলাদা হবে—এই পার্থক্যটি পরীক্ষায় প্রায়ই আসে।', 'Average speed and average velocity will differ—a common exam trap.'))
                ]),
                formula('গড় দ্রুতি = মোট দূরত্ব / মোট সময়   |   গড় বেগ = মোট সরণ / মোট সময়', t(
                  'Average speed vs average velocity.',
                  'Average speed vs average velocity.'
                ))
              ]),
              section(t('মনে রাখুন', 'Remember'), [
                tip(t('এক-মাত্রিক সমস্যা', 'One-dimensional problems'), t(
                  'একটি দিককে `+` ধরুন, বিপরীত দিক `−`। তারপর সরণগুলোর বীজগাণিতিক যোগ করুন।',
                  'Choose one direction as `+` and the opposite as `−`, then add displacements algebraically.'
                )),
                qa(t('৩ মি পূর্ব ও ৪ মি উত্তর গেলে সরণের মান কত?', 'Move 3 m east and 4 m north. Find displacement magnitude.'), t(
                  '`√(3² + 4²) = 5 মি`, দিক `tan⁻¹(4/3) ≈ 53.1°` উত্তর-পূর্ব কোণে।',
                  '`√(3² + 4²) = 5 m`, at `tan⁻¹(4/3) ≈ 53.1°` north of east.'
                ))
              ])
            ]
          }
        ]
      }
    ]
  });
})(window.HSC_NOTES);
