(function (notes) {
  const { t, section, p, formula, tip, example, table, qa } = notes;

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
