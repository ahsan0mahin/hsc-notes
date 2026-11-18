/*
 * HSC Physics 1st Paper — Chapter 2: Vector
 * Book-faithful, bilingual study notes.
 * Loaded after data/physics.js; registers the chapter into the physics subject.
 */
(function (notes) {
  const {
    t, section, p, list, steps, formula, tip, warning, info, activity,
    example, table, qa, figure, term, glossary, outcome, outcomes,
    equation, formulaGrid
  } = notes;

  const keyTerms = [
    t('ভেক্টর রাশি', 'Vector quantity'), t('স্কেলার রাশি', 'Scalar quantity'),
    t('সমান ভেক্টর', 'Equal vectors'), t('ঋণাত্মক ভেক্টর', 'Negative vector'),
    t('নাল ভেক্টর', 'Null / zero vector'), t('একক ভেক্টর', 'Unit vector'),
    t('আয়ত একক ভেক্টর', 'Rectangular unit vector'), t('অবস্থান ভেক্টর', 'Position vector'),
    t('ভেক্টরের বিভাজন', 'Resolution of a vector'), t('উপাংশ', 'Component'),
    t('স্কেলার গুণফল', 'Scalar / dot product'), t('ভেক্টর গুণফল', 'Vector / cross product'),
    t('অপারেটর', 'Operator'), t('গ্রেডিয়েন্ট', 'Gradient'),
    t('ডাইভারজেন্স', 'Divergence'), t('কার্ল', 'Curl'),
    t('স্কেলার ক্ষেত্র', 'Scalar field'), t('ভেক্টর ক্ষেত্র', 'Vector field')
  ];

  const learningOutcomes = [
    outcome(1, t('ভেক্টরের ধর্ম ব্যাখ্যা করতে পারবে।', 'Explain the properties of vectors.'), t('২.১', '2.1')),
    outcome(2, t('পদার্থবিজ্ঞানের বিভিন্ন ভৌত রাশি ভেক্টররূপে প্রকাশ করতে পারবে।', 'Express physical quantities as vectors.'), t('২.২', '2.2')),
    outcome(3, t('কতিপয় বিশেষ ভেক্টর ব্যাখ্যা করতে পারবে।', 'Explain special types of vectors.'), t('২.৪', '2.4')),
    outcome(4, t('ভেক্টর রাশির জ্যামিতিক যোজন নিয়ম ব্যাখ্যা করতে পারবে।', 'Explain geometrical vector addition.'), t('২.৫, ২.৬', '2.5, 2.6')),
    outcome(5, t('লম্বাংশের সাহায্যে যোগ ও বিয়োজন বিশ্লেষণ করতে পারবে।', 'Analyse addition/subtraction using perpendicular components.'), t('২.৭', '2.7')),
    outcome(6, t('ত্রিমাত্রিক আয়তাকার বিস্তারে লম্বাংশে বিভাজন করতে পারবে।', 'Resolve a vector into 3D rectangular components.'), t('২.৭', '2.7')),
    outcome(7, t('স্কেলার ও ভেক্টর গুণের সংজ্ঞার্থ ও ব্যবহার করতে পারবে।', 'Define and use dot and cross products.'), t('২.৯, ২.১০', '2.9, 2.10')),
    outcome(8, t('পদার্থবিজ্ঞানে ক্যালকুলাসের ব্যবহার ও গুরুত্ব ব্যাখ্যা করতে পারবে।', 'Explain the role of calculus in physics.'), t('২.১১', '2.11')),
    outcome(9, t('ভেক্টর ক্যালকুলাসের ধারণা ব্যাখ্যা করতে পারবে।', 'Explain the idea of vector calculus.'), t('২.১২', '2.12')),
    outcome(10, t('ভেক্টর অপারেটর ব্যবহার করতে পারবে।', 'Use the vector operator del.'), t('২.১২', '2.12'))
  ];

  const quickFormulas = [
    equation('2.1', 'R = √[P² + Q² + 2PQ cos α]', t('সামান্তরিক সূত্রে লব্ধির মান।', 'Resultant magnitude by parallelogram law.')),
    equation('2.2', 'tan θ = (Q sin α)/(P + Q cos α)', t('লব্ধির দিক।', 'Direction of the resultant.')),
    equation('2.7', 'A = |A⃗| = √[Aₓ² + Aᵧ² + Aᶻ²]', t('ত্রিমাত্রিক ভেক্টরের মান।', 'Magnitude in 3D.')),
    equation('2.8', 'â = A⃗/A', t('সমান্তরাল একক ভেক্টর।', 'Parallel unit vector.')),
    equation('2.14', 'A⃗ · B⃗ = AB cos θ', t('ডট গুণফল।', 'Dot product.')),
    equation('2.17', '|A⃗ × B⃗| = AB sin θ', t('ক্রস গুণফলের মান।', 'Cross product magnitude.')),
    equation('2.31', '∇φ = î ∂φ/∂x + ĵ ∂φ/∂y + k̂ ∂φ/∂z', t('গ্রেডিয়েন্ট।', 'Gradient.')),
    equation('2.33', '∇ × V⃗ = determinant [î ĵ k̂; ∂/∂x ∂/∂y ∂/∂z; Vₓ Vᵧ Vᶻ]', t('কার্ল।', 'Curl.'))
  ];

  const summaryEquations = [
    equation('2.1', 'R = √[P² + Q² + 2PQ cos α]', t('লব্ধির মান।', 'Resultant magnitude.')),
    equation('2.2', 'tan θ = (Q sin α)/(P + Q cos α)', t('P⃗-এর সাথে লব্ধির কোণ।', 'Angle of R with P.')),
    equation('2.3', 'X = R cos α', t('অনুভূমিক লম্বাংশ।', 'Horizontal rectangular component.')),
    equation('2.4', 'Y = R sin α', t('উল্লম্ব লম্বাংশ।', 'Vertical rectangular component.')),
    equation('2.7', 'A = √[Aₓ² + Aᵧ² + Aᶻ²]', t('ভেক্টরের মান।', 'Magnitude of a vector.')),
    equation('2.8', 'â = (Aₓî + Aᵧĵ + Aᶻk̂)/√[Aₓ² + Aᵧ² + Aᶻ²]', t('একক ভেক্টর।', 'Unit vector.')),
    equation('2.9', 'A⃗ + B⃗ = (Aₓ+Bₓ)î + (Aᵧ+Bᵧ)ĵ + (Aᶻ+Bᶻ)k̂', t('উপাংশে যোগ।', 'Component-wise addition.')),
    equation('2.14', 'A⃗ · B⃗ = AB cos θ', t('স্কেলার গুণফল।', 'Scalar product.')),
    equation('2.15', 'A⃗ · B⃗ = AₓBₓ + AᵧBᵧ + AᶻBᶻ', t('উপাংশে ডট গুণ।', 'Dot product in components.')),
    equation('2.17', 'C = |A⃗ × B⃗| = AB sin θ', t('ক্রস গুণফলের মান।', 'Cross product magnitude.')),
    equation('2.18', 'A⃗ × B⃗ = | î ĵ k̂ ; Aₓ Aᵧ Aᶻ ; Bₓ Bᵧ Bᶻ |', t('নির্ণায়ক রূপ।', 'Determinant form.')),
    equation('2.21', 'A⃗ · (B⃗ × C⃗) = | Aₓ Aᵧ Aᶻ ; Bₓ Bᵧ Bᶻ ; Cₓ Cᵧ Cᶻ |', t('স্কেলার ত্রিগুণফল / আয়তন।', 'Scalar triple product / volume.')),
    equation('2.31', '∇φ = î ∂φ/∂x + ĵ ∂φ/∂y + k̂ ∂φ/∂z', t('গ্রেডিয়েন্ট।', 'Gradient.')),
    equation('2.32', '∇ · V⃗ = ∂Vₓ/∂x + ∂Vᵧ/∂y + ∂Vᶻ/∂z', t('ডাইভারজেন্স।', 'Divergence.')),
    equation('2.33', '∇ × V⃗ = | î ĵ k̂ ; ∂/∂x ∂/∂y ∂/∂z ; Vₓ Vᵧ Vᶻ |', t('কার্ল।', 'Curl.'))
  ];

  notes.registerChapter('physics', {
    id: 'vectors',
    order: 1,
    featured: true,
    title: t('ভেক্টর', 'Vector'),
    description: t(
      'HSC পদার্থবিজ্ঞান ১ম পত্রের ২ নম্বর অধ্যায়: স্কেলার/ভেক্টর, বিশেষ ভেক্টর, যোগ-বিয়োগ, বিভাজন, ত্রিমাত্রিক উপাংশ, ডট/ক্রস গুণ, ক্যালকুলাস ও ∇ অপারেটর।',
      'HSC Physics 1st Paper, Chapter 2: scalars/vectors, special vectors, addition, resolution, 3D components, dot/cross products, calculus and the del operator.'
    ),
    meta: {
      bookChapter: t('অধ্যায় ২', 'Chapter 2'),
      bookTitle: t('পদার্থবিজ্ঞান — প্রথম পত্র', 'Physics — First Paper'),
      sourceNote: t(
        'মূল পাঠ্যবইয়ের ২ নম্বর অধ্যায়ের ধারা, শিখনফল, প্রধান শব্দ ও সমীকরণ অনুসরণ করে তৈরি study notes; চিত্রগুলো শিক্ষামূলকভাবে পুনর্নির্মিত।',
        'Study notes following the sequence, learning outcomes, key terms and equations of Chapter 2; diagrams are redrawn for learning.'
      ),
      intro: t(
        'বস্তুজগতের যত পরিমেয় রাশি আছে, দিক বিবেচনা করে সেগুলোকে সদিক (ভেক্টর) ও নির্দিক (স্কেলার)—এই দুই ভাগে ভাগ করা যায়। দুটি বল আনতভাবে ক্রিয়া করলে বস্তু তৃতীয় দিকে যায়; এই আচরণ বোঝতেই ভেক্টর বীজগণিত।',
        'Measurable quantities split into directed (vector) and direction-free (scalar) quantities. Two oblique forces produce a third direction—vector algebra explains why.'
      ),
      bigIdea: t(
        'পদার্থবিজ্ঞানের ভাষা গণিত; ক্যালকুলাস পরিবর্তন, আর ভেক্টর দিক ও মান—একসঙ্গে হিসাব-নিকাশকে সহজ করে।',
        'Mathematics is the language of physics: calculus handles change, vectors handle magnitude with direction, and together they simplify calculation.'
      ),
      keyTerms,
      outcomes: learningOutcomes,
      quickFormulas,
      figure: {
        src: 'assets/vector/3d-components.svg',
        caption: t('চিত্র ২.২৮-এর ধাঁচে: ত্রিমাত্রিক আয়ত স্থানাঙ্কে ভেক্টর ও তার উপাংশ।', 'After Fig. 2.28: a vector and its components in a 3D rectangular coordinate system.'),
        alt: t('X, Y, Z অক্ষ, î ĵ k̂ একক ভেক্টর এবং A⃗ ভেক্টরের Aₓ, Aᵧ, Aᶻ উপাংশসহ আয়তকার ঘনক।', 'X, Y, Z axes with î, ĵ, k̂ unit vectors and a rectangular box showing Aₓ, Aᵧ, Aᶻ components of A⃗.')
      }
    },
    topics: [
      {
        id: 'chapter-orientation',
        order: 1,
        sectionNo: t('ভূমিকা', 'Intro'),
        readingTime: 5,
        updated: '2026-11-18',
        tags: ['chapter 2', 'orientation', 'learning outcomes', 'key terms'],
        title: t('অধ্যায় পরিচিতি ও শিখনফল', 'Chapter orientation & learning outcomes'),
        summary: t('বইয়ের ২ নম্বর অধ্যায়ের ভূমিকা, প্রধান শব্দসমূহ, ১০টি শিখনফল ও পড়ার রোডম্যাপ।', 'Introduction, key terms, 10 learning outcomes and a reading roadmap for Chapter 2.'),
        sections: [
          section(t('কেন ভেক্টর পড়ি?', 'Why study vectors?'), [
            p(t('দুটি বল কোনো বস্তুর ওপর আনতভাবে ক্রিয়া করলে বস্তুটি দুটির কোনোটির দিকে না গিয়ে তৃতীয় একটা দিকে যায়। এ কারণেই পরিমাপের পাশাপাশি দিক জানা জরুরি।', 'When two forces act obliquely, a body moves in a third direction rather than along either force. Direction is as important as magnitude.')),
            figure('assets/vector/3d-components.svg', t('চিত্র ১ / ২.২৮-এর ধাঁচে পুনর্নির্মিত 3D ভেক্টর চিত্র।', 'Redrawn after Fig. 1 / 2.28: a 3D vector diagram.'), t('মূলবিন্দু থেকে স্থানে নির্দেশিত A⃗ ভেক্টর ও তিনটি অক্ষ বরাবর উপাংশ।', 'Vector A⃗ from the origin with its three axis components.')),
            info(t('মূল ভাবনা', 'Big idea'), t('পদার্থবিজ্ঞানের ভাষা হচ্ছে গণিত। ভেক্টর ও ক্যালকুলাসের ব্যবহার হিসাব-নিকাশকে সহজ করে দিয়েছে।', 'Mathematics is the language of physics; vectors and calculus make calculations easier.'))
          ]),
          section(t('প্রধান শব্দসমূহ', 'Key terms'), [
            glossary([
              term(t('সদিক রাশি', 'Directed quantity'), t('মান ও দিক দুটোই লাগে—একেই ভেক্টর বলি।', 'Needs both magnitude and direction; called a vector.')),
              term(t('নির্দিক রাশি', 'Undirected quantity'), t('শুধু মান দিয়ে সম্পূর্ণ—স্কেলার।', 'Fully described by magnitude only; a scalar.')),
              term(t('লব্ধি', 'Resultant'), t('একাধিক ভেক্টর যোগ করে পাওয়া একক ভেক্টর।', 'The single vector obtained by adding several vectors.')),
              term(t('উপাংশ', 'Component'), t('কোনো ভেক্টরকে ভাঙলে পাওয়া অংশ।', 'A part obtained by resolving a vector.')),
              term(t('আয়ত একক ভেক্টর', 'Rectangular unit vector'), t('ধনাত্মক X, Y, Z অক্ষ বরাবর î, ĵ, k̂।', 'î, ĵ, k̂ along the positive X, Y, Z axes.')),
              term(t('অপারেটর', 'Operator'), t('একটি রাশিকে অন্য রাশিতে রূপান্তরকারী গাণিতিক ক্রিয়া, যেমন d/dx বা ∇।', 'A mathematical action transforming one quantity into another, e.g. d/dx or ∇.')),
              term(t('স্কেলার ক্ষেত্র', 'Scalar field'), t('অঞ্চলের প্রতিটি বিন্দুতে একটি স্কেলার মান, যেমন তাপমাত্রা φ(x,y,z)।', 'A scalar value at every point, e.g. temperature φ(x,y,z).')),
              term(t('ভেক্টর ক্ষেত্র', 'Vector field'), t('অঞ্চলের প্রতিটি বিন্দুতে একটি ভেক্টর মান, যেমন বেগ V⃗(x,y,z)।', 'A vector value at every point, e.g. velocity V⃗(x,y,z).'))
            ]),
            p(t('বইয়ের তালিকায় আরও আছে: সমান ভেক্টর, ঋণাত্মক ভেক্টর, নাল ভেক্টর, একক ভেক্টর, অবস্থান ভেক্টর, ভেক্টরের বিভাজন, স্কেলার/ভেক্টর গুণফল, গ্রেডিয়েন্ট, ডাইভারজেন্স ও কার্ল।', 'The book also lists equal, negative, null, unit and position vectors; resolution; scalar/vector products; gradient, divergence and curl.'))
          ]),
          section(t('শিখনফল', 'Learning outcomes'), [
            outcomes(learningOutcomes),
            tip(t('কীভাবে পড়বেন', 'How to read this chapter'), t('২.১–২.৪ ধারণা, ২.৫–২.৭ যোগ/বিভাজন, ২.৮–২.১০ গুণন, ২.১১–২.১২ ক্যালকুলাস—এই ক্রমে এগোলে সূত্রগুলো নিজে থেকে যুক্ত হয়।', 'Move 2.1–2.4 concepts → 2.5–2.7 addition/resolution → 2.8–2.10 products → 2.11–2.12 calculus; the formulas then connect naturally.'))
          ]),
          section(t('নিজে করো', 'Try it yourself'), [
            activity(t('দুই হাতে বই ঠেলা', 'Push a book with two hands'), t('টেবিলে বই রেখে ডান হাতে একদিক, বাম হাতে অন্যদিকে, তারপর একই সাথে ঠেলুন। বই মাঝামাঝি দিকে যাবে—এটিই লব্ধি বল।', 'Push a book right, then left, then with both hands at once. It moves in between: that is the resultant force.')),
            steps([
              t('প্রথমে শুধু ডান হাতের দিকে ঠেলুন।', 'Push with the right hand only.'),
              t('এরপর শুধু বাম হাতের দিকে ঠেলুন।', 'Then push with the left hand only.'),
              t('একই সময়ে দুই দিকে ঠেলে গতির দিক লক্ষ্য করুন।', 'Push both ways together and observe the new direction.')
            ])
          ])
        ]
      },
      {
        id: 'scalars-and-vectors',
        order: 2,
        sectionNo: t('২.১', '2.1'),
        readingTime: 7,
        updated: '2026-11-18',
        tags: ['scalar', 'vector', 'properties', 'hsc', '2.1'],
        title: t('ভেক্টর রাশি ও স্কেলার রাশি', 'Vector and scalar quantities'),
        summary: t('রাশির সংজ্ঞা, সদিক/নির্দিক ভাগ, ভেক্টরের ৫টি ধর্ম ও পদার্থবিজ্ঞানের উদাহরণ।', 'Definitions, directed/undirected classification, five vector properties and physics examples.'),
        sections: [
          section(t('সংজ্ঞা ও শ্রেণিবিভাগ', 'Definition and classification'), [
            p(t('বস্তুজগতে যা কিছু পরিমাপ করা যায় তাকেই **রাশি** বলে—দৈর্ঘ্য, ভর, বেগ, ত্বরণ ইত্যাদি। দিক নির্দেশের প্রয়োজন আছে কি না, তার ওপর ভিত্তিতে রাশি দুই ধরনের: **সদিক বা ভেক্টর** ও **নির্দিক বা স্কেলার**।', 'Anything measurable is a **quantity**—length, mass, velocity, acceleration. Depending on whether direction is needed, quantities are **directed (vector)** or **direction-free (scalar)**.')),
            formula('রাশি = মান (+ কখনো দিক)', t('Quantity = magnitude (+ direction when needed)', 'Quantity = magnitude (+ direction when needed)')),
            table(
              [t('ধরন', 'Type'), t('সংজ্ঞা', 'Definition'), t('উদাহরণ', 'Examples')],
              [
                [t('ভেক্টর / সদিক', 'Vector / directed'), t('মান ও দিক উভয়ই লাগে।', 'Needs both magnitude and direction.'), t('সরণ, ওজন, বেগ, ত্বরণ, বল', 'Displacement, weight, velocity, acceleration, force')],
                [t('স্কেলার / নির্দিক', 'Scalar / undirected'), t('শুধু মান দিয়েই সম্পূর্ণ।', 'Fully described by magnitude only.'), t('দৈর্ঘ্য, ভর, দ্রুতি, কাজ', 'Length, mass, speed, work')]
              ]
            ),
            figure('assets/vector/representation.svg', t('চিত্র ২.১-এর ধাঁচে: তীরচিহ্নিত OP⃗ ভেক্টর, পাদবিন্দু O ও শীর্ষবিন্দু P।', 'After Fig. 2.1: arrow OP⃗ with tail O and head P.'), t('O বিন্দু থেকে P বিন্দুর দিকে আঁকা তীরযুক্ত সরলরেখা এবং ভেক্টর প্রকাশের তিনটি handwritten notation।', 'An arrowed line from O to P with three handwritten vector notations.'))
          ]),
          section(t('ভেক্টর রাশির ধর্ম', 'Properties of vectors'), [
            list([
              t('**মান ও দিক:** সম্পূর্ণরূপে প্রকাশ করতে দুটোই আবশ্যক।', '**Magnitude and direction:** both are required for a complete description.'),
              t('**পরিবর্তন:** মান, দিক বা দুটোরই পরিবর্তনে ভেক্টর বদলায়।', '**Change:** changing magnitude, direction or both changes the vector.'),
              t('**বীজগণিত:** যোগ/বিয়োগ/গুণ সাধারণ গাণিতিক নিয়মে হয় না।', '**Algebra:** addition, subtraction and multiplication do not follow ordinary arithmetic.'),
              t('**শূন্য গুণফল:** দুটি অশূন্য ভেক্টরের গুণফলও শূন্য হতে পারে।', '**Zero product:** two non-zero vectors can still have a zero product.'),
              t('**ফলের ধরন:** গুণের প্রকৃতিভেদে ফল স্কেলার বা ভেক্টর হয়।', '**Result type:** a product may be scalar or vector depending on its nature.')
            ]),
            formula('A⃗ ≠ A  |  A = |A⃗|', t('A⃗ হলো ভেক্টর; A বা |A⃗| হলো শুধু মান।', 'A⃗ is the vector; A or |A⃗| is only its magnitude.')),
            warning(t('সাধারণ ভুল', 'Common mistake'), t('`3 + 4 = 7` সবসময় ভেক্টর যোগফল নয়; মধ্যবর্তী কোণও নির্ধারক।', '`3 + 4 = 7` is not always a vector sum; the included angle also matters.'))
          ]),
          section(t('ভৌত রাশি চেনা', 'Identifying physical quantities'), [
            table(
              [t('রাশি', 'Quantity'), t('ধরন', 'Type'), t('কেন', 'Why')],
              [
                [t('দূরত্ব', 'Distance'), t('স্কেলার', 'Scalar'), t('শুধু পথের দৈর্ঘ্য', 'Path length only')],
                [t('সরণ', 'Displacement'), t('ভেক্টর', 'Vector'), t('শুরু → শেষ দিকসহ', 'Start → end with direction')],
                [t('দ্রুতি', 'Speed'), t('স্কেলার', 'Scalar'), t('কত দ্রুত, দিক নয়', 'How fast, not which way')],
                [t('বেগ', 'Velocity'), t('ভেক্টর', 'Vector'), t('দ্রুতি + দিক', 'Speed + direction')],
                [t('কাজ', 'Work'), t('স্কেলার', 'Scalar'), t('F⃗ · S⃗ এর ডট গুণ', 'Dot product F⃗ · S⃗')],
                [t('টর্ক', 'Torque'), t('ভেক্টর', 'Vector'), t('r⃗ × F⃗ এর ক্রস গুণ', 'Cross product r⃗ × F⃗')]
              ]
            ),
            info(t('বইয়ের ভাষায়', 'In the book’s words'), t('ভেক্টর বীজগণিত না জানলে দুটি আনত বলের ফল বোঝা যায় না; তাই পদার্থবিজ্ঞানে গাণিতিক ভাষা অপরিহার্য।', 'Without vector algebra, the effect of two oblique forces cannot be explained; hence mathematics is essential in physics.'))
          ]),
          section(t('দ্রুত অনুশীলন', 'Quick practice'), [
            qa(t('ওজন কেন ভেক্টর?', 'Why is weight a vector?'), t('পৃথিবী বস্তুকে কেন্দ্রের দিকে টানে—মানের সাথে নির্দিষ্ট দিক থাকে।', 'The Earth pulls a body toward its centre: magnitude plus a fixed direction.')),
            qa(t('কাজ স্কেলার হলো কীভাবে?', 'How is work a scalar?'), t('`W = F⃗ · S⃗ = FS cos θ`—ডট গুণের ফল স্কেলার।', '`W = F⃗ · S⃗ = FS cos θ`; a dot product returns a scalar.'))
          ])
        ]
      },
      {
        id: 'special-vector-examples',
        order: 3,
        sectionNo: t('২.২', '2.2'),
        readingTime: 6,
        updated: '2026-11-17',
        tags: ['force', 'area vector', 'torque', 'angular momentum', '2.2'],
        title: t('ভেক্টর রাশির কয়েকটি বিশেষ উদাহরণ', 'Special examples of vectors'),
        summary: t('তল, বল, কেন্দ্রমুখী বল, টর্ক ও কৌণিক ভরবেগ—কীভাবে দিক নির্ধারিত হয়।', 'Area element, force, centripetal force, torque and angular momentum—how their directions are fixed.'),
        sections: [
          section(t('তল ও ক্ষেত্র', 'Surface and field'), [
            p(t('কোনো পৃষ্ঠের ক্ষেত্রফল সাধারণত স্কেলার; কিন্তু মহাকর্ষ, তড়িৎ বা চৌম্বকক্ষেত্রের হিসাবে ক্ষুদ্র তল উপাদানকে **ভেক্টর** ধরা হয়। দিক হয় ঐ বিন্দুতে তলের অভিলম্ব বরাবর।', 'An area is normally a scalar, but in gravitation, electric or magnetic field calculations a small surface element is treated as a **vector** normal to the surface at that point.')),
            formula('da⃗ = n̂ da', t('ক্ষুদ্র তল ভেক্টর; n̂ অভিলম্ব একক ভেক্টর।', 'Small area vector; n̂ is the normal unit vector.'))
          ]),
          section(t('বলজাতীয় ভেক্টর', 'Force-related vectors'), [
            table(
              [t('রাশি', 'Quantity'), t('সংজ্ঞা / ভূমিকা', 'Definition / role'), t('দিক', 'Direction')],
              [
                [t('বল F⃗', 'Force F⃗'), t('ঠেলা বা টানা; মান ও দিক আছে।', 'A push or pull with magnitude and direction.'), t('যেদিকে ঠেলা/টানা হয়', 'Along the push/pull')],
                [t('কেন্দ্রমুখী বল', 'Centripetal force'), t('বৃত্তাকার পথে ঘোরায়।', 'Keeps a body on a circular path.'), t('ব্যাসার্ধ বরাবর কেন্দ্রের দিকে', 'Along radius toward centre')],
                [t('টর্ক τ⃗', 'Torque τ⃗'), t('ঘূর্ণনের জন্য দায়ী বলের ভ্রামক।', 'Moment of force responsible for rotation.'), t('বল ও অবস্থান ভেক্টরের সমতলের অভিলম্ব', 'Normal to the plane of r⃗ and F⃗')],
                [t('কৌণিক ভরবেগ L⃗', 'Angular momentum L⃗'), t('ঘূর্ণন গতিতে রৈখিক ভরবেগের অনুরূপ।', 'Rotational analogue of linear momentum.'), t('r⃗ ও p⃗-এর সমতলের অভিলম্ব', 'Normal to the plane of r⃗ and p⃗')]
              ]
            ),
            formula('τ⃗ = r⃗ × F⃗   |   L⃗ = r⃗ × p⃗', t('ক্রস গুণ বলেই এরা ভেক্টর এবং দিক ডানহাতি নিয়মে পাওয়া যায়।', 'Cross products make these vectors; direction follows the right-hand rule.'))
          ]),
          section(t('দৈনন্দিন সংযোগ', 'Everyday link'), [
            p(t('পৃথিবী বস্তুকে নিজ কেন্দ্রের দিকে টানে বলে ওজন একটি ভেক্টর। আবার লন রোলার ঠেলা/টানার সময় হাতলের নির্দিষ্ট বিন্দু থেকে বল আঁকতে হয়—তখন সেটি সীমাবদ্ধ ভেক্টর।', 'Weight is a vector because the Earth pulls toward its centre. When pushing or pulling a lawn roller, the force is drawn from a fixed handle point—a localized vector.')),
            tip(t('মনে রাখুন', 'Remember'), t('“কোন বিন্দু থেকে ক্রিয়া করছে?” প্রশ্নটিই স্বাধীন ও সীমাবদ্ধ ভেক্টরের পার্থক্য বোঝায়।', 'Asking “from which point does it act?” separates free vectors from localized ones.'))
          ])
        ]
      },
      {
        id: 'representation-of-vectors',
        order: 4,
        sectionNo: t('২.৩', '2.3'),
        readingTime: 5,
        updated: '2026-11-17',
        tags: ['notation', 'tail', 'head', 'magnitude', '2.3'],
        title: t('ভেক্টর রাশির প্রকাশ', 'Representation of vectors'),
        summary: t('তীরচিহ্নিত রেখা, পাদবিন্দু/শীর্ষবিন্দু, হাতে লেখা ও ছাপার সংকেত, মান প্রকাশ।', 'Arrowed line, tail/head, handwritten and printed notation, and magnitude notation.'),
        sections: [
          section(t('জ্যামিতিক প্রকাশ', 'Geometrical representation'), [
            p(t('ভেক্টরকে একটি **তীরচিহ্নিত সরলরেখা** দিয়ে আঁকা হয়: রেখার দৈর্ঘ্য = মান, তীর = দিক। `OP⃗`-এ O হলো পাদবিন্দু/সূচনাবিন্দু, P হলো শীর্ষবিন্দু/প্রান্তিক বিন্দু।', 'A vector is drawn as an **arrowed straight line**: length = magnitude, arrow = direction. In `OP⃗`, O is the tail/initial point and P is the head/terminal point.')),
            figure('assets/vector/representation.svg', t('চিত্র ২.১: OP⃗ ভেক্টর ও প্রচলিত তিনটি লেখনরীতি।', 'Fig. 2.1: vector OP⃗ and three common written notations.'), t('O থেকে P পর্যন্ত তীর, A⃗/A̅/A̠ notation এবং |OP⃗| = OP মান প্রকাশ।', 'Arrow O→P, A⃗/A̅/A̠ notations and |OP⃗| = OP magnitude.')),
            formula('OP⃗ = A⃗   |   |OP⃗| = OP = A', t('ভেক্টর ও তার মান আলাদা করে লেখা হয়।', 'The vector and its magnitude are written separately.'))
          ]),
          section(t('লেখনরীতি', 'Notation styles'), [
            table(
              [t('পদ্ধতি', 'Style'), t('উদাহরণ', 'Example'), t('ব্যবহার', 'Use')],
              [
                [t('ওপরে তীর', 'Arrow above'), t('`A⃗`', '`A⃗`'), t('এই বইয়ের প্রধান রীতি', 'Main style in this book')],
                [t('ওপরে রেখা', 'Overbar'), t('`A̅`', '`A̅`'), t('হাতে লেখা', 'Handwritten')],
                [t('নিচে রেখা', 'Underline'), t('`A̠`', '`A̠`'), t('হাতে লেখা', 'Handwritten')],
                [t('মোটা হরফ', 'Bold type'), t('`A`', '`A`'), t('ছাপায় ভেক্টর', 'Printed vector')],
                [t('সরু হরফ', 'Thin type'), t('`A` বা `|A⃗|`', '`A` or `|A⃗|`'), t('ছাপায় মান', 'Printed magnitude')]
              ]
            ),
            info(t('এই সাইটে', 'On this site'), t('পড়ার সুবিধার্থে ভেক্টর সবসময় `A⃗` আকারে এবং মান `A` বা `|A⃗|` আকারে দেখানো হয়েছে।', 'For readability, vectors are shown as `A⃗` and magnitudes as `A` or `|A⃗|`.'))
          ])
        ]
      },
      {
        id: 'types-of-vectors',
        order: 5,
        sectionNo: t('২.৪', '2.4'),
        readingTime: 10,
        updated: '2026-11-16',
        tags: ['free vector', 'null vector', 'unit vector', 'position vector', '2.4'],
        title: t('কতিপয় ভেক্টর', 'Special types of vectors'),
        summary: t('স্বাধীন থেকে বিপ্রতীপ পর্যন্ত বইয়ের ১৪ ধরনের ভেক্টর—সংজ্ঞা, চিত্র ও উদাহরণসহ।', 'The book’s 14 vector types from free to reciprocal—definitions, diagram and examples.'),
        sections: [
          section(t('অবস্থানভেদে ভেক্টর', 'Vectors by position'), [
            figure('assets/vector/types.svg', t('চিত্র ২.২–২.৯-এর ধাঁচে: সমান, ঋণাত্মক, সমরেখ ও সমতলীয় ভেক্টর।', 'After Figs. 2.2–2.9: equal, negative, collinear and coplanar vectors.'), t('চারটি প্যানেলে একই দিকের সমান্তরাল তীর, বিপরীতমুখী তীর, সমান্তরাল তীরসমূহ ও একই সমতলে তীরসমূহ।', 'Four panels showing parallel equal arrows, opposite arrows, collinear arrows and coplanar arrows.')),
            glossary([
              term(t('স্বাধীন ভেক্টর', 'Free vector'), t('পাদবিন্দু ইচ্ছেমতো বেছে নেওয়া যায়; যেমন 5 N পূর্বমুখী বল।', 'Its tail can be chosen freely; e.g. a 5 N eastward force.')),
              term(t('সীমাবদ্ধ ভেক্টর', 'Localized vector'), t('পাদবিন্দু নির্দিষ্ট; যেমন মূলবিন্দু থেকে আঁকা অবস্থান ভেক্টর বা লন রোলারের হাতলের টান।', 'Its tail is fixed; e.g. a position vector from the origin or a pull at a roller handle.')),
              term(t('সদৃশ ভেক্টর', 'Like vectors'), t('সমজাতীয় ও একই দিকে ক্রিয়াশীল।', 'Same kind, acting in the same direction.')),
              term(t('বিসদৃশ ভেক্টর', 'Unlike vectors'), t('সমজাতীয় কিন্তু বিপরীত দিকে।', 'Same kind but opposite directions.')),
              term(t('সমরেখ ভেক্টর', 'Collinear vectors'), t('একই রেখায় বা পরস্পর সমান্তরালে ক্রিয়া করে।', 'Act along the same line or parallel lines.')),
              term(t('সমতলীয় ভেক্টর', 'Coplanar vectors'), t('একই সমতলে অবস্থিত।', 'Lie in the same plane.'))
            ])
          ]),
          section(t('মান ও দিকভেদে', 'By magnitude and direction'), [
            table(
              [t('নাম', 'Name'), t('শর্ত', 'Condition'), t('প্রকাশ', 'Notation / example')],
              [
                [t('সমান ভেক্টর', 'Equal vectors'), t('সমান মান + একই দিক; পাদবিন্দু নির্ভর নয়।', 'Equal magnitude + same direction; tail irrelevant.'), t('`A⃗ = B⃗`', '`A⃗ = B⃗`')],
                [t('ঋণাত্মক ভেক্টর', 'Negative vector'), t('সমমান, ঠিক বিপরীত দিক।', 'Same magnitude, exactly opposite direction.'), t('`PQ⃗ = A⃗`, `QP⃗ = −A⃗`', '`PQ⃗ = A⃗`, `QP⃗ = −A⃗`')],
                [t('সঠিক ভেক্টর', 'Proper vector'), t('মান শূন্য নয়।', 'Non-zero magnitude.'), t('`A ≠ 0`', '`A ≠ 0`')],
                [t('নাল ভেক্টর', 'Null vector'), t('মান শূন্য; পাদবিন্দু ও শীর্ষবিন্দু একই; নির্দিষ্ট দিক নেই।', 'Zero magnitude; tail = head; no definite direction.'), t('`0⃗ = A⃗ + (−A⃗)`', '`0⃗ = A⃗ + (−A⃗)`')],
                [t('একক ভেক্টর', 'Unit vector'), t('মান 1; `â = A⃗/A`।', 'Magnitude 1; `â = A⃗/A`.'), t('`A⃗ = 5â`', '`A⃗ = 5â`')],
                [t('বিপ্রতীপ ভেক্টর', 'Reciprocal vector'), t('সমান্তরাল; একটির মান অন্যটির বিপরীত সংখ্যা।', 'Parallel; one magnitude is the reciprocal of the other.'), t('`A⃗ = 7î`, `B⃗ = (1/7)î`', '`A⃗ = 7î`, `B⃗ = (1/7)î`')]
              ]
            ),
            formula('â = A⃗/A   |   |â| = 1', t('কোনো অশূন্য ভেক্টরকে তার মান দিয়ে ভাগ করলে তার দিকে একক ভেক্টর পাওয়া যায়।', 'Dividing a non-zero vector by its magnitude gives a unit vector along it.'))
          ]),
          section(t('অবস্থান ও সরণ', 'Position and displacement'), [
            glossary([
              term(t('অবস্থান ভেক্টর', 'Position vector'), t('মূলবিন্দুর সাপেক্ষে কোনো বিন্দুর অবস্থান; `OP⃗ = r⃗`।', 'Position of a point relative to the origin; `OP⃗ = r⃗`.')),
              term(t('ব্যাসার্ধ ভেক্টর', 'Radius vector'), t('অবস্থান ভেক্টরেরই আরেক নাম `r⃗`।', 'Another name for the position vector `r⃗`.')),
              term(t('সরণ ভেক্টর', 'Displacement vector'), t('শেষ ও আদি অবস্থান ভেক্টরের পার্থক্য।', 'Difference between final and initial position vectors.'))
            ]),
            formula('Δr⃗ = r⃗𝒻 − r⃗ᵢ', t('চিত্র ২.১২-এ দেখানো সরণ ভেক্টর।', 'Displacement vector shown in Fig. 2.12.')),
            qa(t('নাল ভেক্টরের দিক কী?', 'What is the direction of a null vector?'), t('নাল ভেক্টরের কোনো সুনির্দিষ্ট দিক নেই; পাদবিন্দু ও শীর্ষবিন্দু একই বিন্দুতে হয়।', 'A null vector has no definite direction; its tail and head coincide.'))
          ])
        ]
      },
      {
        id: 'vector-addition-subtraction',
        order: 6,
        sectionNo: t('২.৫', '2.5'),
        readingTime: 9,
        updated: '2026-11-16',
        tags: ['triangle law', 'polygon law', 'subtraction', 'vector algebra', '2.5'],
        title: t('ভেক্টরের যোগ ও বিয়োগ', 'Vector addition and subtraction'),
        summary: t('একজাতীয় ভেক্টর, ত্রিভুজ/বহুভুজ নিয়ম, বিয়োগ এবং বিনিময়/সংযোগ/বন্টন সূত্র।', 'Like quantities, triangle/polygon laws, subtraction and commutative/associative/distributive laws.'),
        sections: [
          section(t('যোগের শর্ত ও ত্রিভুজ নিয়ম', 'Conditions and triangle law'), [
            p(t('দু বা ততোধিক **একজাতীয়** ভেক্টর যোগ করলে নতুন ভেক্টর **লব্ধি** পাওয়া যায়; যোগ করা ভেক্টরগুলো লব্ধির **উপাংশ**। বেগের সাথে বেগ যোগ হয়, বেগের সাথে ত্বরণ নয়।', 'Adding two or more **like** vectors gives a new **resultant** vector; the addends are its **components**. Velocity adds to velocity, not to acceleration.')),
            p(t('`3 m` ও `4 m` সরণের যোগফল `7 m` নাও হতে পারে—মধ্যবর্তী কোণের ওপর ভিত্তি করে `1 m` থেকে `7 m` পর্যন্ত হতে পারে।', 'A `3 m` and a `4 m` displacement need not sum to `7 m`; depending on the included angle the resultant ranges from `1 m` to `7 m`.')),
            figure('assets/vector/triangle-polygon.svg', t('চিত্র ২.১৪–২.১৫-এর ধাঁচে ত্রিভুজ ও বহুভুজ নিয়ম।', 'After Figs. 2.14–2.15: triangle and polygon laws.'), t('A⃗ ও B⃗ কে শীর্ষ-লেজ বসিয়ে C⃗ লব্ধি, এবং A⃗+B⃗+C⃗+D⃗ এর বহুভুজ লব্ধি R⃗।', 'Tip-to-tail A⃗ and B⃗ giving C⃗, plus a polygon resultant R⃗ for four vectors.')),
            formula('OP⃗ + PR⃗ = OR⃗   ⇔   A⃗ + B⃗ = C⃗', t('প্রথম পাদবিন্দু থেকে শেষ শীর্ষবিন্দু পর্যন্ত আঁকাই লব্ধি।', 'The line from first tail to last head is the resultant.'))
          ]),
          section(t('বহুভুজ নিয়ম ও বিয়োগ', 'Polygon law and subtraction'), [
            steps([
              t('যেকোনো একটি ভেক্টর দিয়ে শুরু করুন।', 'Start with any one vector.'),
              t('পরের ভেক্টরের পাদবিন্দু আগেরটির শীর্ষবিন্দুতে বসান।', 'Place each next tail at the previous head.'),
              t('প্রথম পাদবিন্দু → শেষ শীর্ষবিন্দু যোগ করুন; এটি লব্ধি।', 'Join first tail to last head; that is the resultant.')
            ]),
            formula('R⃗ = A⃗ + B⃗ + C⃗ + D⃗ = PT⃗', t('চিত্র ২.১৫-এর লব্ধি।', 'Resultant in Fig. 2.15.')),
            formula('A⃗ − B⃗ = A⃗ + (−B⃗)', t('বিয়োগ মানে বিপরীত ভেক্টর যোগ।', 'Subtraction means adding the opposite vector.'))
          ]),
          section(t('বীজগণিতের সূত্র', 'Laws of vector algebra'), [
            table(
              [t('সূত্র', 'Law'), t('সমীকরণ', 'Equation'), t('অর্থ', 'Meaning')],
              [
                [t('বিনিময়', 'Commutative'), t('`A⃗ + B⃗ = B⃗ + A⃗`', '`A⃗ + B⃗ = B⃗ + A⃗`'), t('ক্রম বদলালেও লব্ধি একই', 'Order does not change the sum')],
                [t('সংযোগ', 'Associative'), t('`(A⃗ + B⃗) + C⃗ = A⃗ + (B⃗ + C⃗)`', '`(A⃗ + B⃗) + C⃗ = A⃗ + (B⃗ + C⃗)`'), t('বন্ধনী বদলালেও একই', 'Grouping does not change the sum')],
                [t('বন্টন', 'Distributive'), t('`m(A⃗ + B⃗) = mA⃗ + mB⃗`', '`m(A⃗ + B⃗) = mA⃗ + mB⃗`'), t('স্কেলার গুণ ছড়িয়ে দেওয়া যায়', 'Scalar multiplication distributes')]
              ]
            ),
            formula('(2.19)  m(A⃗ + B⃗) = mA⃗ + mB⃗', t('সদৃশ ত্রিভুজের বর্ধিতাংশ থেকে প্রমাণিত।', 'Proved from similar enlarged triangles.'))
          ]),
          section(t('অনুশীলন', 'Practice'), [
            qa(t('বেগের সাথে ত্বরণ যোগ করা যায় কি?', 'Can velocity be added to acceleration?'), t('না। ভেক্টর যোগে রাশিগুলো একজাতীয় হতে হয়; স্কেলারের ক্ষেত্রেও তাপমাত্রার সাথে তাপ যোগ হয় না।', 'No. Vector addition requires like quantities; likewise temperature cannot be added to heat.')),
            qa(t('`A⃗ − B⃗` আঁকতে কী করবেন?', 'How do you draw `A⃗ − B⃗`?'), t('`B⃗`-এর বিপরীত `−B⃗` বানিয়ে `A⃗`-এর শীর্ষবিন্দুতে বসিয়ে ত্রিভুজ নিয়ম প্রয়োগ করুন।', 'Reverse `B⃗` to `−B⃗`, place it at the head of `A⃗`, then apply the triangle law.'))
          ])
        ]
      },
      {
        id: 'parallelogram-law',
        order: 7,
        sectionNo: t('২.৫', '2.5'),
        readingTime: 10,
        updated: '2026-11-15',
        tags: ['parallelogram', 'resultant', 'max min', '2.1', '2.2'],
        title: t('সামান্তরিকের সূত্র ও লব্ধি', 'Parallelogram law and resultant'),
        summary: t('R ও θ নির্ণয়, প্রমাণের রূপরেখা, সর্বোচ্চ/সর্বনিম্ন মান এবং দুই হাতে বই ঠেলার ব্যাখ্যা।', 'Deriving R and θ, proof outline, maximum/minimum resultant and the two-hand book push.'),
        sections: [
          section(t('সূত্রটি', 'The law'), [
            p(t('একই বিন্দুতে একই সময়ে ক্রিয়াশীল দুটি একজাতীয় ভেক্টরকে সামান্তরিকের সন্নিহিত বাহু ধরলে, সেই বিন্দু থেকে আঁকা **কর্ণ** তাদের লব্ধির মান ও দিক নির্দেশ করে।', 'If two like vectors acting at a point are adjacent sides of a parallelogram, the **diagonal** from that point gives their resultant in magnitude and direction.')),
            figure('assets/vector/parallelogram.svg', t('চিত্র ২.২০–২.২১-এর ধাঁচে সামান্তরিক OACB ও লব্ধি OC⃗।', 'After Figs. 2.20–2.21: parallelogram OACB and resultant OC⃗.'), t('P⃗ ও Q⃗ সন্নিহিত বাহু, α অন্তর্ভুক্ত কোণ, R⃗ কর্ণ, θ লব্ধির কোণ এবং Q sin α / Q cos α উপাংশ।', 'P⃗ and Q⃗ as adjacent sides, included angle α, diagonal R⃗, angle θ and Q sin α / Q cos α components.')),
            formula('P⃗ + Q⃗ = R⃗   |   OA⃗ + OB⃗ = OC⃗', t('কর্ণই লব্ধি।', 'The diagonal is the resultant.'))
          ]),
          section(t('মান ও দিক নির্ণয়', 'Magnitude and direction'), [
            steps([
              t('C থেকে OA-এর বর্ধিতাংশে CD লম্ব টানুন।', 'Drop perpendicular CD from C to the extension of OA.'),
              t('`CD = Q sin α` ও `AD = Q cos α` লিখুন।', 'Write `CD = Q sin α` and `AD = Q cos α`.'),
              t('সমকোণী ত্রিভুজ ODC-তে `OC² = (P + Q cos α)² + (Q sin α)²`।', 'In right triangle ODC, `OC² = (P + Q cos α)² + (Q sin α)²`.'),
              t('`cos²α + sin²α = 1` ব্যবহার করে সরল করুন।', 'Simplify using `cos²α + sin²α = 1`.')
            ]),
            formula('(2.1)  R = √[P² + Q² + 2PQ cos α]', t('লব্ধির মান।', 'Magnitude of the resultant.')),
            formula('(2.2)  tan θ = (Q sin α)/(P + Q cos α)', t('P⃗-এর সাথে লব্ধির কোণ।', 'Angle of the resultant with P⃗.')),
            info(t('Q⃗-এর সাপেক্ষে', 'Relative to Q⃗'), t('`tan β = (P sin α)/(Q + P cos α)`—একই ধরনের সম্পর্ক।', '`tan β = (P sin α)/(Q + P cos α)`—the analogous relation.'))
          ]),
          section(t('সর্বোচ্চ ও সর্বনিম্ন', 'Maximum and minimum'), [
            table(
              [t('অবস্থা', 'Case'), t('কোণ', 'Angle'), t('লব্ধি', 'Resultant')],
              [
                [t('একই দিকে', 'Same direction'), t('`α = 0°`, `cos α = +1`', '`α = 0°`, `cos α = +1`'), t('`R_max = P + Q`', '`R_max = P + Q`')],
                [t('বিপরীত দিকে', 'Opposite direction'), t('`α = 180°`, `cos α = −1`', '`α = 180°`, `cos α = −1`'), t('`R_min = |P − Q|`', '`R_min = |P − Q|`')],
                [t('সমকোণে', 'Perpendicular'), t('`α = 90°`, `cos α = 0`', '`α = 90°`, `cos α = 0`'), t('`R = √(P² + Q²)`', '`R = √(P² + Q²)`')]
              ]
            ),
            example(t('P = 3 N, Q = 4 N, α = 60°', 'P = 3 N, Q = 4 N, α = 60°'), [
              p(t('`R = √(9 + 16 + 2·3·4·½) = √37 ≈ 6.08 N`।', '`R = √(9 + 16 + 2·3·4·½) = √37 ≈ 6.08 N`.')),
              p(t('`tan θ = (4 sin60°)/(3 + 4 cos60°) = (2√3)/5 ≈ 0.693`, তাই `θ ≈ 34.7°`।', '`tan θ = (4 sin60°)/(3 + 4 cos60°) = (2√3)/5 ≈ 0.693`, so `θ ≈ 34.7°`.'))
            ])
          ]),
          section(t('বাস্তব প্রয়োগ', 'Real-life link'), [
            activity(t('দুই হাতে বই', 'Two hands on a book'), t('একই সাথে ডান ও বাম হাতে দুই দিকে ঠেললে বই মাঝামাঝি দিকে যায়—দুই বলের লব্ধি সামান্তরিকের কর্ণ বরাবর ক্রিয়া করে।', 'Pushing a book with both hands makes it move between the two directions: the resultant acts along the parallelogram diagonal.')),
            warning(t('কোণ ভুলবেন না', 'Do not miss the angle'), t('`α` হলো P⃗ ও Q⃗-এর **অন্তর্ভুক্ত কোণ**; `θ` হলো লব্ধির সাথে P⃗-এর কোণ—দুটো আলাদা।', '`α` is the **included angle** between P⃗ and Q⃗; `θ` is the angle of the resultant with P⃗—do not confuse them.'))
          ])
        ]
      },
      {
        id: 'resolution-of-vectors',
        order: 8,
        sectionNo: t('২.৬', '2.6'),
        readingTime: 10,
        updated: '2026-11-15',
        tags: ['resolution', 'components', 'lawn roller', 'boat', 'trolley', '2.6'],
        title: t('ভেক্টরের বিভাজন', 'Resolution of vectors'),
        summary: t('লম্বাংশ, যেকোনো দুই দিকে উপাংশ, লন রোলার, নৌকা টানা ও ট্রলিব্যাগের হাতল।', 'Rectangular components, oblique components, lawn roller, boat towing and trolley handle.'),
        sections: [
          section(t('লম্ব উপাংশ', 'Rectangular components'), [
            p(t('একটি ভেক্টরকে দুই বা ততোধিক ভেক্টরে ভাঙাকে **বিভাজন** এবং ভাঙা অংশগুলোকে **উপাংশ** বলে। উপাংশ দুটি পরস্পর লম্ব হলে তাদের **লম্বাংশ** বলে।', 'Splitting a vector into two or more vectors is **resolution**; the parts are **components**. If the components are perpendicular they are **rectangular components**.')),
            figure('assets/vector/resolution.svg', t('চিত্র ২.২২(ক)-এর ধাঁচে R⃗ কে X⃗ ও Y⃗ তে বিভাজন।', 'After Fig. 2.22(a): resolving R⃗ into X⃗ and Y⃗.'), t('আয়তক্ষেত্র OACB-তে কর্ণ R⃗, ভূমি X = R cos α ও উচ্চতা Y = R sin α।', 'Rectangle OACB with diagonal R⃗, base X = R cos α and height Y = R sin α.')),
            formula('(2.3)  X = R cos α', t('R⃗-এর সাথে α কোণে উপাংশ।', 'Component making angle α with R⃗.')),
            formula('(2.4)  Y = R sin α', t('X⃗-এর লম্ব উপাংশ।', 'Component perpendicular to X⃗.')),
            formula('R² = X² + Y²', t('পিথাগোরাস থেকে মান ফেরত পাওয়া যায়।', 'Pythagoras recovers the magnitude.'))
          ]),
          section(t('লম্ব নয় এমন দুই দিকে', 'Two non-perpendicular directions'), [
            p(t('উপাংশ দুটি পরস্পর লম্ব না হলে, R⃗-এর সাথে যথাক্রমে α ও β কোণে X⃗ ও Y⃗ নিলে সাইন সূত্র থেকে পাওয়া যায়—', 'When components are not perpendicular and make angles α, β with R⃗, the sine rule gives—')),
            formula('(2.5a)  X = [R sin β]/[sin(α + β)]', t('প্রথম উপাংশ।', 'First component.')),
            formula('(2.5b)  Y = [R sin α]/[sin(α + β)]', t('দ্বিতীয় উপাংশ।', 'Second component.')),
            tip(t('বিশেষ কেস', 'Special case'), t('`α + β = 90°` হলে `sin(α+β)=1` এবং সূত্র দুটি `R cos α`, `R sin α`-তে ফিরে যায়।', 'If `α + β = 90°`, `sin(α+β)=1` and the formulas reduce to `R cos α`, `R sin α`.'))
          ]),
          section(t('লন রোলার: টানা সহজ কেন?', 'Why pulling a lawn roller is easier'), [
            figure('assets/vector/lawn-roller.svg', t('চিত্র ২.২৩-এর ধাঁচে ঠেলা বনাম টানায় Fₓ ও Fᵧ।', 'After Fig. 2.23: Fₓ and Fᵧ while pushing vs pulling.'), t('বাঁ প্যানেলে নিচমুখী Fᵧ আপাত ওজন W+Fᵧ বাড়ায়; ডান প্যানেলে ওপরমুখী Fᵧ আপাত ওজন W−Fᵧ কমায়।', 'Left: downward Fᵧ raises apparent weight to W+Fᵧ; right: upward Fᵧ lowers it to W−Fᵧ.')),
            steps([
              t('ঠেলার সময় F⃗-এর খাড়া উপাংশ নিচের দিকে: আপাত ওজন `W + Fᵧ`।', 'While pushing, the vertical component points down: apparent weight `W + Fᵧ`.'),
              t('ওজন বাড়ায় ঘর্ষণ বল বাড়ে, তাই চলা কঠিন হয়।', 'Greater apparent weight increases friction, so motion is harder.'),
              t('টানার সময় Fᵧ ওপরের দিকে: আপাত ওজন `W − Fᵧ`।', 'While pulling, Fᵧ points up: apparent weight `W − Fᵧ`.'),
              t('ঘর্ষণ কমে, অনুভূমিক Fₓ সহজে রোলারকে এগিয়ে নেয়।', 'Friction drops, so horizontal Fₓ moves the roller easily.')
            ]),
            formula('ঠেলা → W + Fᵧ   |   টানা → W − Fᵧ', t('আপাত ওজনের পার্থক্যই মূল কারণ।', 'The apparent-weight difference is the key.'))
          ]),
          section(t('নৌকা ও ট্রলিব্যাগ', 'Boat and trolley bag'), [
            figure('assets/vector/boat-rope.svg', t('চিত্র ২.২৪-এর ধাঁচে দড়ির টান F⃗ কে Fₓ ও Fᵧ তে ভাগ।', 'After Fig. 2.24: resolving rope tension F⃗ into Fₓ and Fᵧ.'), t('নৌকার দৈর্ঘ্য OA বরাবর Fₓ = F cos θ ও লম্ব দিকে Fᵧ = F sin θ, কোণ θ সহ।', 'Fₓ = F cos θ along boat axis OA and Fᵧ = F sin θ perpendicular to it, with angle θ.')),
            formula('Fₓ = F cos θ   |   Fᵧ = F sin θ', t('Fₓ নৌকাকে সামনে নেয়; Fᵧ তীরের দিকে টানে, হাল/পানি তা প্রশমিত করে।', 'Fₓ drives the boat forward; Fᵧ pulls toward the shore and is balanced by rudder/water.')),
            activity(t('ট্রলিব্যাগের হাতল', 'Trolley-bag handle'), t('হাতল বের করে লম্বা করলে টান অনুভূমিকের সাথে ছোট কোণ করে; Fₓ বড় হয় বলে ব্যাগ টানা সহজ হয়। একবার ঠেলে, একবার টেনে দেখুন।', 'Extend the handle: the pull makes a smaller angle with the horizontal, so Fₓ grows and pulling is easier. Try pushing once, then pulling.')),
            figure('assets/vector/trolley-handle.svg', t('চিত্র ২.২৭-এর ধাঁচে ছোট ও লম্বা হাতলে টানের কোণ ও অনুভূমিক উপাংশ।', 'After Fig. 2.27: pull angle and horizontal component for short vs long handles.'), t('দুটি ট্রলিব্যাগে θ₁ > θ₂ এবং লম্বা হাতলে Fₓ = F cos θ₂ বেশি।', 'Two trolley bags with θ₁ > θ₂; the longer handle gives a larger Fₓ = F cos θ₂.')),
            qa(t('দড়ি লম্বা হলে সুবিধা কী?', 'Why use a long tow rope?'), t('দড়ি লম্বা হলে θ ছোট হয়, `cos θ` বড় হয়, তাই একই টানে Fₓ বেশি পাওয়া যায়।', 'A longer rope makes θ smaller, `cos θ` larger, so the same tension gives a bigger Fₓ.'))
          ])
        ]
      },
      {
        id: 'three-dimensional-components',
        order: 9,
        sectionNo: t('২.৭', '2.7'),
        readingTime: 12,
        updated: '2026-11-14',
        tags: ['i j k', '3d', 'direction cosines', 'radius vector', '2.7'],
        title: t('ত্রিমাত্রিক উপাংশ ও ভেক্টর বীজগণিত', '3D components and vector algebra'),
        summary: t('আয়ত একক ভেক্টর, 2D/3D উপাংশ, মান, একক ভেক্টর, দিক কোসাইন ও উপাংশে যোগ/বিয়োগ।', 'Rectangular unit vectors, 2D/3D components, magnitude, unit vector, direction cosines and component algebra.'),
        sections: [
          section(t('আয়ত একক ভেক্টর', 'Rectangular unit vectors'), [
            p(t('X, Y, Z অক্ষ পরস্পর লম্ব হলে ত্রিমাত্রিক কার্তেসীয়/আয়ত স্থানাঙ্ক ব্যবস্থা পাওয়া যায়। ডানহাতি স্ক্রুকে X থেকে Y-এর দিকে ঘোরালে Z বরাবর অগ্রসর হলে ব্যবস্থাটি **ডানহাতি**।', 'Mutually perpendicular X, Y, Z axes form a 3D Cartesian/rectangular system. If a right-handed screw turned X→Y advances along Z, the system is **right-handed**.')),
            figure('assets/vector/3d-components.svg', t('চিত্র ২.২৬/২.২৮-এর ধাঁচে î, ĵ, k̂ ও A⃗-এর আয়ত ঘনক।', 'After Figs. 2.26/2.28: î, ĵ, k̂ and the rectangular box of A⃗.'), t('মূলবিন্দু O থেকে A⃗, XY-তলে অভিক্ষেপ এবং Aₓî, Aᵧĵ, Aᶻk̂ উপাংশসহ 3D ঘনক।', '3D box from origin O showing A⃗, its XY projection and Aₓî, Aᵧĵ, Aᶻk̂ components.')),
            table(
              [t('অক্ষ', 'Axis'), t('একক ভেক্টর', 'Unit vector'), t('উদাহরণ', 'Example')],
              [
                [t('ধনাত্মক X', 'Positive X'), t('`î`', '`î`'), t('`4î` = X বরাবর 4 একক', '`4î` = 4 units along X')],
                [t('ধনাত্মক Y', 'Positive Y'), t('`ĵ`', '`ĵ`'), t('`−10ĵ` = ঋণাত্মক Y বরাবর 10', '`−10ĵ` = 10 units along −Y')],
                [t('ধনাত্মক Z', 'Positive Z'), t('`k̂`', '`k̂`'), t('`6k̂` = Z বরাবর 6 একক', '`6k̂` = 6 units along Z')]
              ]
            )
          ]),
          section(t('2D থেকে 3D', 'From 2D to 3D'), [
            p(t('2D-তে `P(Aₓ, Aᵧ)` হলে `OP⃗ = OM⃗ + ON⃗ = Aₓî + Aᵧĵ`। 3D-তে `P(Aₓ, Aᵧ, Aᶻ)` হলে `OP⃗ = OL⃗ + OQ⃗ + OS⃗`।', 'In 2D, `P(Aₓ, Aᵧ)` gives `OP⃗ = OM⃗ + ON⃗ = Aₓî + Aᵧĵ`. In 3D, `P(Aₓ, Aᵧ, Aᶻ)` gives `OP⃗ = OL⃗ + OQ⃗ + OS⃗`.')),
            formula('(2.6)  A⃗ = Aₓî + Aᵧĵ + Aᶻk̂', t('ত্রিমাত্রিক উপাংশ রূপ।', '3D component form.')),
            formula('(2.7)  A = |A⃗| = √[Aₓ² + Aᵧ² + Aᶻ²]', t('ORP ও OLR সমকোণী ত্রিভুজ থেকে প্রমাণিত।', 'Proved from right triangles ORP and OLR.')),
            formula('(2.8)  â = A⃗/A = (Aₓî + Aᵧĵ + Aᶻk̂)/√[Aₓ² + Aᵧ² + Aᶻ²]', t('সমান্তরাল একক ভেক্টর।', 'Parallel unit vector.'))
          ]),
          section(t('ব্যাসার্ধ ভেক্টর ও দিক কোসাইন', 'Radius vector and direction cosines'), [
            formula('r⃗ = OP⃗ = xî + yĵ + zk̂   |   r = √[x² + y² + z²]', t('স্থানাঙ্ক (x,y,z)-এর অবস্থান ভেক্টর।', 'Position vector of point (x,y,z).')),
            p(t('A⃗ ধনাত্মক X, Y, Z অক্ষের সাথে α, β, γ কোণ করলে `l = cos α`, `m = cos β`, `n = cos γ` হলো দিক কোসাইন।', 'If A⃗ makes angles α, β, γ with the positive X, Y, Z axes, then `l = cos α`, `m = cos β`, `n = cos γ` are direction cosines.')),
            formula('l = Aₓ/A   |   m = Aᵧ/A   |   n = Aᶻ/A   |   l² + m² + n² = 1', t('দিক কোসাইন ও তাদের বর্গের সমষ্টি।', 'Direction cosines and the sum of their squares.')),
            example(t('A⃗ = 3î + 4ĵ + 12k̂', 'A⃗ = 3î + 4ĵ + 12k̂'), [
              p(t('`A = √(9+16+144) = 13`; তাই `l = 3/13`, `m = 4/13`, `n = 12/13` এবং `9+16+144 = 169 = 13²`।', '`A = √(9+16+144) = 13`; hence `l = 3/13`, `m = 4/13`, `n = 12/13` and `9+16+144 = 169 = 13²`.'))
            ])
          ]),
          section(t('উপাংশে যোগ ও বিয়োগ', 'Component-wise addition/subtraction'), [
            formula('(2.9)  A⃗ + B⃗ = (Aₓ+Bₓ)î + (Aᵧ+Bᵧ)ĵ + (Aᶻ+Bᶻ)k̂', t('একই অক্ষের উপাংশ আলাদাভাবে যোগ হয়।', 'Add corresponding components along each axis.')),
            formula('(2.10)  R⃗ = Rₓî + Rᵧĵ + Rᶻk̂', t('লব্ধির উপাংশ রূপ।', 'Resultant in component form.')),
            formula('|R⃗| = √[(Aₓ+Bₓ)² + (Aᵧ+Bᵧ)² + (Aᶻ+Bᶻ)²]', t('যোগফলের মান।', 'Magnitude of the sum.')),
            formula('(2.11)  r̂ = R⃗/|R⃗|', t('লব্ধির দিকে একক ভেক্টর।', 'Unit vector along the resultant.')),
            formula('(2.12)  A⃗ − B⃗ = (Aₓ−Bₓ)î + (Aᵧ−Bᵧ)ĵ + (Aᶻ−Bᶻ)k̂', t('উপাংশে বিয়োগ।', 'Component-wise subtraction.')),
            formula('(2.13)  |A⃗ − B⃗| = √[(Aₓ−Bₓ)² + (Aᵧ−Bᵧ)² + (Aᶻ−Bᶻ)²]', t('বিয়োগফলের মান।', 'Magnitude of the difference.')),
            warning(t(' quadrant নয়, অক্ষ মেলান', 'Match axes, not quadrants'), t('প্রতিটি উপাংশ তার নিজ অক্ষের সাথেই যোগ/বিয়োগ হবে; x-এর সাথে y নয়।', 'Add or subtract each component with the same axis only; never mix x with y.'))
          ])
        ]
      },
      {
        id: 'multiplication-overview',
        order: 10,
        sectionNo: t('২.৮', '2.8'),
        readingTime: 5,
        updated: '2026-11-13',
        tags: ['scalar multiplication', 'dot', 'cross', '2.8'],
        title: t('ভেক্টরের গুণন', 'Multiplication of vectors'),
        summary: t('স্কেলার দ্বারা গুণ, ভেক্টর × স্কেলার/ভেক্টর এবং ফলের ধরন নির্ধারণ।', 'Multiplication by a scalar, vector × vector, and how the result type is decided.'),
        sections: [
          section(t('দুটি পথ', 'Two routes'), [
            table(
              [t('গুণ', 'Product'), t('লিখন', 'Notation'), t('ফল', 'Result')],
              [
                [t('স্কেলার × ভেক্টর', 'Scalar × vector'), t('`mA⃗`', '`mA⃗`'), t('ভেক্টর; মান `|m|A`, দিক `m>0` হলে A⃗-এর দিকে, `m<0` হলে বিপরীতে', 'Vector; magnitude `|m|A`, same direction if `m>0`, opposite if `m<0`')],
                [t('ভেক্টর · ভেক্টর', 'Vector · vector'), t('`A⃗ · B⃗`', '`A⃗ · B⃗`'), t('স্কেলার / ডট গুণফল', 'Scalar / dot product')],
                [t('ভেক্টর × ভেক্টর', 'Vector × vector'), t('`A⃗ × B⃗`', '`A⃗ × B⃗`'), t('ভেক্টর / ক্রস গুণফল', 'Vector / cross product')]
              ]
            ),
            formula('F⃗ = ma⃗', t('ভর (স্কেলার) × ত্বরণ (ভেক্টর) = বল (ভেক্টর)।', 'Mass (scalar) × acceleration (vector) = force (vector).')),
            info(t('বইয়ের মূল কথা', 'Key line from the book'), t('দুটি অশূন্য ভেক্টরের গুণফল শূন্য হতে পারে; আবার গুণের প্রকৃতিভেদে ফল স্কেলার বা ভেক্টর হয়।', 'Two non-zero vectors can have a zero product; depending on the product, the result can be scalar or vector.'))
          ]),
          section(t('দ্রুত পরীক্ষা', 'Quick check'), [
            qa(t('`−2A⃗`-এর দিক কী?', 'What is the direction of `−2A⃗`?'), t('A⃗-এর বিপরীত দিকে, মান দ্বিগুণ।', 'Opposite to A⃗ with twice the magnitude.')),
            qa(t('`A⃗ · B⃗` আর `A⃗ × B⃗` একই কি?', 'Are dot and cross products the same?'), t('না; প্রথমটি স্কেলার, দ্বিতীয়টি ভেক্টর এবং দিক ডানহাতি নিয়মে নির্ধারিত।', 'No; the first is scalar, the second is a vector whose direction follows the right-hand rule.'))
          ])
        ]
      },
      {
        id: 'dot-product',
        order: 11,
        sectionNo: t('২.৯', '2.9'),
        readingTime: 10,
        updated: '2026-11-12',
        tags: ['dot product', 'projection', 'work', 'orthogonal', '2.9'],
        title: t('স্কেলার গুণফল বা ডট গুণফল', 'Scalar / dot product'),
        summary: t('AB cos θ, অভিক্ষেপ, উপাংশ রূপ, îĵk̂ গুণফল, লম্বতার শর্ত ও কাজ W = F⃗·S⃗।', 'AB cos θ, projection, component form, unit-vector products, orthogonality test and work.'),
        sections: [
          section(t('সংজ্ঞা ও জ্যামিতিক অর্থ', 'Definition and geometry'), [
            p(t('দুটি ভেক্টরের গুণনে স্কেলার পেলে তাকে **স্কেলার/ডট গুণফল** বলে। মান = দুই মানের গুণ × অন্তর্ভুক্ত ক্ষুদ্রতর কোণের cosine।', 'A product of two vectors that yields a scalar is the **scalar/dot product**. Its value = product of magnitudes × cosine of the smaller included angle.')),
            figure('assets/vector/dot-product.svg', t('চিত্র ২.২৯-এর ধাঁচে A⃗-এর ওপর B⃗-এর লম্ব অভিক্ষেপ B cos θ।', 'After Fig. 2.29: perpendicular projection B cos θ of B⃗ on A⃗.'), t('A⃗ অনুভূমিক, B⃗ কোণে, ছায়া B cos θ এবং ডট গুণের সূত্র।', 'Horizontal A⃗, angled B⃗, shadow B cos θ and the dot-product formula.')),
            formula('(2.14)  A⃗ · B⃗ = |A⃗||B⃗| cos θ = AB cos θ,  0 ≤ θ ≤ π', t('সংজ্ঞা।', 'Definition.')),
            p(t('`B cos θ` হলো A⃗-এর দিকে B⃗-এর উপাংশ বা লম্ব অভিক্ষেপ; তাই ডট গুণ = একটি ভেক্টর × অপরটির ওপর অভিক্ষেপ।', '`B cos θ` is the component/projection of B⃗ along A⃗; so dot product = one vector × the projection of the other on it.')),
            formula('W = F⃗ · S⃗ = FS cos θ', t('কাজ একটি স্কেলার রাশি।', 'Work is a scalar quantity.'))
          ]),
          section(t('ধর্ম ও একক ভেক্টর', 'Properties and unit vectors'), [
            table(
              [t('ধর্ম', 'Property'), t('সমীকরণ', 'Equation')],
              [
                [t('বিনিময়', 'Commutative'), t('`A⃗ · B⃗ = B⃗ · A⃗`', '`A⃗ · B⃗ = B⃗ · A⃗`')],
                [t('বন্টন', 'Distributive'), t('`A⃗ · (B⃗ + C⃗) = A⃗ · B⃗ + A⃗ · C⃗`', '`A⃗ · (B⃗ + C⃗) = A⃗ · B⃗ + A⃗ · C⃗`')],
                [t('সমান অক্ষ', 'Same unit vector'), t('`î·î = ĵ·ĵ = k̂·k̂ = 1`', '`î·î = ĵ·ĵ = k̂·k̂ = 1`')],
                [t('ভিন্ন অক্ষ', 'Different unit vectors'), t('`î·ĵ = ĵ·k̂ = k̂·î = 0`', '`î·ĵ = ĵ·k̂ = k̂·î = 0`')]
              ]
            ),
            formula('(2.15)  A⃗ · B⃗ = AₓBₓ + AᵧBᵧ + AᶻBᶻ', t('উপাংশে ডট গুণ; বন্টন সূত্র ও একক ভেক্টরের গুণফল থেকে প্রমাণিত।', 'Component form, proved by distribution and unit-vector products.'))
          ]),
          section(t('লম্বতা ও কোণ', 'Orthogonality and angle'), [
            formula('A⃗ · B⃗ = 0  ⇔  θ = 90°  (A,B ≠ 0)', t('অশূন্য ভেক্টরদ্বয় লম্ব হলে ডট গুণ শূন্য; বিপরীতও সত্য।', 'For non-zero vectors, dot product is zero iff they are perpendicular; converse also holds.')),
            formula('θ = cos⁻¹[(A⃗ · B⃗)/(AB)]', t('দুটি ভেক্টরের মধ্যবর্তী কোণ।', 'Angle between two vectors.')),
            example(t('A⃗ = (1, 2, 3), B⃗ = (−2, 0, 1)', 'A⃗ = (1, 2, 3), B⃗ = (−2, 0, 1)'), [
              p(t('`A⃗·B⃗ = 1(−2)+2(0)+3(1) = 1`। ধনাত্মক বলে কোণ 90°-এর চেয়ে ছোট।', '`A⃗·B⃗ = 1(−2)+2(0)+3(1) = 1`. Positive, so the angle is less than 90°.'))
            ]),
            warning(t('শূন্য ভেক্টর', 'Zero vector'), t('`A⃗·B⃗ = 0` থেকে লম্বতা বলতে হলে আগে নিশ্চিত হোন A ও B দুটোই অশূন্য।', 'Before concluding perpendicularity from `A⃗·B⃗ = 0`, ensure both vectors are non-zero.'))
          ])
        ]
      },
      {
        id: 'cross-product',
        order: 12,
        sectionNo: t('২.১০', '2.10'),
        readingTime: 12,
        updated: '2026-11-11',
        tags: ['cross product', 'right hand rule', 'torque', 'triple product', '2.10'],
        title: t('ভেক্টর গুণফল বা ক্রস গুণফল', 'Vector / cross product'),
        summary: t('AB sin θ, ডানহাতি স্ক্রু নিয়ম, ক্ষেত্রফল, টর্ক, îĵk̂ চক্র, নির্ণায়ক রূপ ও ত্রিগুণফল।', 'AB sin θ, right-hand screw rule, area, torque, îĵk̂ cycle, determinant form and triple product.'),
        sections: [
          section(t('সংজ্ঞা ও দিক', 'Definition and direction'), [
            p(t('দুটি ভেক্টরের গুণনে ভেক্টর পেলে তাকে **ভেক্টর/ক্রস গুণফল** বলে। মান = `AB sin θ`; দিক হয় উভয় ভেক্টরের সমতলের অভিলম্ব বরাবর, **ডানহাতি স্ক্রু নিয়মে**।', 'A product of two vectors that yields a vector is the **vector/cross product**. Magnitude = `AB sin θ`; direction is normal to their plane by the **right-hand screw rule**.')),
            figure('assets/vector/cross-product.svg', t('চিত্র ২.৩০–২.৩১-এর ধাঁচে A⃗ × B⃗ = C⃗ ও সামান্তরিকের ক্ষেত্রফল।', 'After Figs. 2.30–2.31: A⃗ × B⃗ = C⃗ and parallelogram area.'), t('A⃗ ও B⃗ সন্নিহিত বাহু, θ কোণ, n̂ দিকে C⃗ এবং উচ্চতা B sin θ।', 'A⃗ and B⃗ as adjacent sides, angle θ, C⃗ along n̂ and height B sin θ.')),
            formula('(2.16)  C⃗ = A⃗ × B⃗ = n̂|A⃗||B⃗| sin θ', t('n̂ হলো ফলাফলের দিকে একক ভেক্টর।', 'n̂ is the unit vector along the result.')),
            formula('(2.17)  C = |A⃗ × B⃗| = AB sin θ', t('মান = সামান্তরিকের ভূমি × উচ্চতা = ক্ষেত্রফল।', 'Magnitude = base × height = parallelogram area.')),
            activity(t('দুই কলমের খেলা', 'Two-pen experiment'), t('বাম হাতে একটি কলম ওপরমুখী (A⃗), অন্যটি উত্তরমুখী (B⃗) ধরুন। ডান হাতে তাদের সমতলে লম্ব কলমটি A⃗ থেকে B⃗-এর দিকে ঘোরালে যেদিকে এগোয়, সেদিকই A⃗ × B⃗। B⃗ × A⃗ করলে দিক উল্টে যাবে।', 'Hold one pen up (A⃗), one north (B⃗). Rotate a third right-hand pen from A⃗ to B⃗; its advance is A⃗ × B⃗. Reversing to B⃗ × A⃗ flips the direction.'))
          ]),
          section(t('অ-বিনিময়যোগ্যতা ও টর্ক', 'Non-commutativity and torque'), [
            formula('A⃗ × B⃗ = −(B⃗ × A⃗)', t('মান এক, দিক বিপরীত—ক্রস গুণ বিনিময় সূত্র মানে না।', 'Same magnitude, opposite direction—cross product is not commutative.')),
            formula('τ⃗ = r⃗ × F⃗ = n̂ rF sin θ   |   τ = rF sin θ', t('ঘূর্ণন অক্ষের সাপেক্ষে টর্ক।', 'Torque about a rotation axis.')),
            warning(t('ক্রম বদলাবেন না', 'Keep the order'), t('`A⃗ × B⃗` আর `B⃗ × A⃗` আলাদা; টর্ক, কৌণিক ভরবেগ ও চৌম্বক বলে এটি সরাসরি প্রভাব ফেলে।', '`A⃗ × B⃗` and `B⃗ × A⃗` differ; this directly affects torque, angular momentum and magnetic force.'))
          ]),
          section(t('î, ĵ, k̂ চক্র', 'The î, ĵ, k̂ cycle'), [
            figure('assets/vector/unit-vector-cycle.svg', t('চিত্র ২.৩৩-এর ধাঁচে ধনাত্মক ও ঋণাত্মক ক্রস-চক্র।', 'After Fig. 2.33: positive and reverse cross-product cycles.'), t('î→ĵ→k̂→î ঘূর্ণনে ধনাত্মক ফল, বিপরীত ক্রমে ঋণাত্মক ফল।', 'Cycle î→ĵ→k̂→î gives positive results; reverse order gives negative results.')),
            table(
              [t('ধনাত্মক', 'Positive'), t('ঋণাত্মক', 'Negative'), t('সমান ভেক্টর', 'Same vector')],
              [
                [t('`î × ĵ = k̂`', '`î × ĵ = k̂`'), t('`ĵ × î = −k̂`', '`ĵ × î = −k̂`'), t('`î × î = 0⃗`', '`î × î = 0⃗`')],
                [t('`ĵ × k̂ = î`', '`ĵ × k̂ = î`'), t('`k̂ × ĵ = −î`', '`k̂ × ĵ = −î`'), t('`ĵ × ĵ = 0⃗`', '`ĵ × ĵ = 0⃗`')],
                [t('`k̂ × î = ĵ`', '`k̂ × î = ĵ`'), t('`î × k̂ = −ĵ`', '`î × k̂ = −ĵ`'), t('`k̂ × k̂ = 0⃗`', '`k̂ × k̂ = 0⃗`')]
              ]
            )
          ]),
          section(t('নির্ণায়ক ও ত্রিগুণফল', 'Determinant and triple product'), [
            formula('(2.18)  A⃗ × B⃗ = | î ĵ k̂ ; Aₓ Aᵧ Aᶻ ; Bₓ Bᵧ Bᶻ |', t('উপাংশে ক্রস গুণ।', 'Cross product in component form.')),
            formula('A⃗ × B⃗ = (AᵧBᶻ − AᶻBᵧ)î + (AᶻBₓ − AₓBᶻ)ĵ + (AₓBᵧ − AᵧBₓ)k̂', t('নির্ণায়ক প্রসারিত রূপ।', 'Expanded determinant form.')),
            formula('A⃗ × B⃗ = 0⃗  ⇔  θ = 0° বা 180°  (A,B ≠ 0)', t('অশূন্য ভেক্টরদ্বয় সমান্তরাল।', 'Non-zero vectors are parallel.')),
            formula('(2.20)  V = A⃗ · (B⃗ × C⃗)', t('স্কেলার ত্রিগুণফল = প্যারালেলেপাইপডের আয়তন।', 'Scalar triple product = parallelepiped volume.')),
            figure('assets/vector/parallelepiped.svg', t('চিত্র ২.৩২-এর ধাঁচে A⃗, B⃗, C⃗ দিয়ে গঠিত প্যারালেলেপাইপড।', 'After Fig. 2.32: a parallelepiped formed by A⃗, B⃗ and C⃗.'), t('ভূমির ক্ষেত্রফল B⃗ × C⃗ এবং উচ্চতা A⃗-এর অভিক্ষেপ; আয়তন স্কেলার ত্রিগুণফল।', 'Base area B⃗ × C⃗ and height as projection of A⃗; the volume is the scalar triple product.')),
            formula('(2.21)  A⃗ · (B⃗ × C⃗) = | Aₓ Aᵧ Aᶻ ; Bₓ Bᵧ Bᶻ ; Cₓ Cᵧ Cᶻ |', t('নির্ণায়ক রূপ; মান 0 হলে তিনটি ভেক্টর সমতলীয়।', 'Determinant form; zero means the three vectors are coplanar.')),
            qa(t('`î × ĵ` কত?', 'What is `î × ĵ`?'), t('`k̂`। আর `ĵ × î = −k̂`।', '`k̂`. And `ĵ × î = −k̂`.'))
          ])
        ]
      },
      {
        id: 'calculus-in-physics',
        order: 13,
        sectionNo: t('২.১১', '2.11'),
        readingTime: 11,
        updated: '2026-11-10',
        tags: ['calculus', 'derivative', 'integration', 'operator', 'partial derivative', '2.11'],
        title: t('ক্যালকুলাস : গণিতের একটি শাখা', 'Calculus in physics'),
        summary: t('পরিবর্তনের গণিত, ধ্রুবক/চলক/ফাংশন/অপারেটর, অন্তরক ও যোগজ সূত্র, আংশিক অন্তরীকরণ।', 'Mathematics of change, constants/variables/functions/operators, derivative and integral formulas, partial differentiation.'),
        sections: [
          section(t('ক্যালকুলাস কী?', 'What is calculus?'), [
            p(t('জ্যামিতি আকৃতি, বীজগণিত ক্রিয়া ও সমীকরণ নিয়ে কাজ করে; **ক্যালকুলাস হচ্ছে পরিবর্তনের গাণিতিক অধ্যয়ন**। দুই প্রধান শাখা: অন্তরকলন (পরিবর্তনের হার, ঢাল) ও যোগজ কলন (সংকলন, ক্ষেত্রফল/আয়তন)।', 'Geometry studies shape and algebra studies operations/equations; **calculus is the mathematical study of change**. Its two branches are differential calculus (rate, slope) and integral calculus (accumulation, area/volume).')),
            formula('dP⃗/dt ∝ F⃗', t('নিউটনের ২য় সূত্রকে ক্যালকুলাসে প্রকাশ।', "Newton's second law expressed with calculus.")),
            glossary([
              term(t('ধ্রুবক', 'Constant'), t('অপরিবর্তনশীল: 2, π, e ইত্যাদি।', 'Unchanging: 2, π, e, etc.')),
              term(t('চলক', 'Variable'), t('বিভিন্ন মান নিতে পারে: x, y, z, t।', 'Can take different values: x, y, z, t.')),
              term(t('অপেক্ষক', 'Function'), t('এক চলক বদললে অন্যটি বদলে: y(x)।', 'One variable changes with another: y(x).')),
              term(t('অপারেটর', 'Operator'), t('রাশিকে অন্য রাশিতে রূপান্তর করে: ², √, log, d/dx, ∇।', 'Transforms a quantity: ², √, log, d/dx, ∇.'))
            ]),
            info(t('ইতিহাস', 'History'), t('ক্ষুদ্রাতিক্ষুদ্রের ক্যালকুলাস হিসেবে পরিচিত এই শাখার চূড়ান্ত রূপ দেন নিউটন ও লাইবনিজ।', 'Once called the calculus of infinitesimals, it was finalised by Newton and Leibniz.'))
          ]),
          section(t('অন্তরীকরণ', 'Differentiation'), [
            formula('dy/dx = lim(Δx→0) [y(x+Δx) − y(x)]/Δx', t('x-এর সাপেক্ষে y-এর পরিবর্তনের হার; এটি dy/dx ভাগফল নয়।', 'Rate of change of y w.r.t. x; dy/dx is not a simple fraction.')),
            table(
              [t('ফাংশন', 'Function'), t('অন্তরক', 'Derivative'), t('ফাংশন', 'Function'), t('অন্তরক', 'Derivative')],
              [
                [t('`x`', '`x`'), t('`1`', '`1`'), t('`xᵐ`', '`xᵐ`'), t('`mxᵐ⁻¹`', '`mxᵐ⁻¹`')],
                [t('`au`', '`au`'), t('`a du/dx`', '`a du/dx`'), t('`u+v`', '`u+v`'), t('`du/dx + dv/dx`', '`du/dx + dv/dx`')],
                [t('`uv`', '`uv`'), t('`u dv/dx + v du/dx`', '`u dv/dx + v du/dx`'), t('`sin x`', '`sin x`'), t('`cos x`', '`cos x`')],
                [t('`cos x`', '`cos x`'), t('`−sin x`', '`−sin x`'), t('`tan x`', '`tan x`'), t('`sec² x`', '`sec² x`')],
                [t('`log x`', '`log x`'), t('`1/x`', '`1/x`'), t('`eᵐˣ`', '`eᵐˣ`'), t('`meᵐˣ`', '`meᵐˣ`')]
              ]
            ),
            warning(t('পড়ার নিয়ম', 'How to read it'), t('`dy/dx` পড়া হয় “y-এর ডি ডি x”; কখনো “dy বাই dx” নয়।', 'Read `dy/dx` as “d dx of y”, never “dy by dx”.'))
          ]),
          section(t('আংশিক অন্তরীকরণ', 'Partial differentiation'), [
            p(t('`f(x,y,z)`-এর মতো একাধিক চলকের অপেক্ষকের ক্ষেত্রে অন্য চলকগুলো ধ্রুব ধরে একটির সাপেক্ষে অন্তরীকরণ করলে `∂/∂x` ব্যবহার হয়।', 'For a function of several variables `f(x,y,z)`, hold the others constant and differentiate w.r.t. one: use `∂/∂x`.')),
            example(t('A = 3x²yz + 4xyz³ + 2xy', 'A = 3x²yz + 4xyz³ + 2xy'), [
              formula('∂A/∂x = 6xyz + 4yz³ + 2y', t('x-এর সাপেক্ষে।', 'With respect to x.')),
              formula('∂A/∂y = 3x²z + 4xz³ + 2x', t('y-এর সাপেক্ষে।', 'With respect to y.')),
              formula('∂A/∂z = 3x²y + 12xyz²', t('z-এর সাপেক্ষে; শেষ পদে z নেই বলে 0।', 'With respect to z; the last term gives 0.'))
            ])
          ]),
          section(t('যোগজীকরণ', 'Integration'), [
            p(t('`v(t)` পরিবর্তনশীল বেগ হলে সময়কে ক্ষুদ্র `Δt` অংশে ভাগ করে `S ≈ Σ vₖΔt`। `Δt→0` ও `N→∞` করলে সঠিক দূরত্ব হয় যোগজ।', 'For changing velocity `v(t)`, split time into tiny `Δt` strips: `S ≈ Σ vₖΔt`. As `Δt→0` and `N→∞`, the exact distance becomes an integral.')),
            formula('(2.24–2.25)  S = lim(Δt→0) Σ vₖΔt = ∫ₜᵢᵗᶠ v(t) dt', t('∫ হলো Summation-এর দীর্ঘ S; dx মানে x-এর সাপেক্ষে যোগজ।', '∫ is a stretched S for Summation; dx means integration w.r.t. x.')),
            figure('assets/vector/velocity-time-graph.svg', t('চিত্র ২.৩৪-এর ধাঁচে v–t লেখচিত্রের নিচের ক্ষেত্রফলই দূরত্ব।', 'After Fig. 2.34: area under a v–t graph is distance.'), t('বেগ-সময় লেখচিত্রে ক্ষুদ্র আয়তক্ষেত্রগুলোর ক্ষেত্রফল যোগ করে ∫v(t)dt পাওয়া যায়।', 'A velocity–time graph with thin rectangles whose summed area becomes ∫v(t)dt.')),
            table(
              [t('যোগজ', 'Integral'), t('ফল', 'Result'), t('যোগজ', 'Integral'), t('ফল', 'Result')],
              [
                [t('`∫xⁿ dx`', '`∫xⁿ dx`'), t('`xⁿ⁺¹/(n+1), n≠−1`', '`xⁿ⁺¹/(n+1), n≠−1`'), t('`∫dx/x`', '`∫dx/x`'), t('`log x`', '`log x`')],
                [t('`∫sin x dx`', '`∫sin x dx`'), t('`−cos x`', '`−cos x`'), t('`∫cos x dx`', '`∫cos x dx`'), t('`sin x`', '`sin x`')],
                [t('`∫sin ax dx`', '`∫sin ax dx`'), t('`−(1/a)cos ax`', '`−(1/a)cos ax`'), t('`∫cos ax dx`', '`∫cos ax dx`'), t('`(1/a)sin ax`', '`(1/a)sin ax`')],
                [t('`∫eᵃˣ dx`', '`∫eᵃˣ dx`'), t('`(1/a)eᵃˣ`', '`(1/a)eᵃˣ`'), t('`∫log x dx`', '`∫log x dx`'), t('`x log x − x`', '`x log x − x`')]
              ]
            ),
            tip(t('log মানে ln', 'log means ln'), t('এই সূত্রগুলোতে `log x` আসলে `logₑ x = ln x`, অর্থাৎ natural logarithm।', 'Here `log x` means `logₑ x = ln x`, the natural logarithm.'))
          ])
        ]
      },
      {
        id: 'vector-calculus',
        order: 14,
        sectionNo: t('২.১২', '2.12'),
        readingTime: 13,
        updated: '2026-11-09',
        tags: ['del', 'gradient', 'divergence', 'curl', 'fields', '2.12'],
        title: t('ভেক্টর ক্যালকুলাস', 'Vector calculus'),
        summary: t('ভেক্টর অন্তরক/যোগজ, রেখা-তল-আয়তন যোগজ, স্কেলার/ভেক্টর ক্ষেত্র ও ∇ দিয়ে grad/div/curl।', 'Vector differentiation/integration, line-surface-volume integrals, fields and grad/div/curl via ∇.'),
        sections: [
          section(t('ভেক্টরের অন্তরক ও যোগজ', 'Differentiating and integrating vectors'), [
            p(t('অবস্থান `r⃗(t)`, বেগ `v⃗(t)`—ভেক্টরও স্কেলার চলকের ওপর নির্ভর করতে পারে। সাধারণ সূত্র প্রযোজ্য, তবে গুণে ভেক্টরের **ক্রম** বজায় রাখতে হয়।', 'Position `r⃗(t)` and velocity `v⃗(t)` show that vectors can depend on a scalar variable. Ordinary rules apply, but the **order** of vectors must be preserved in products.')),
            figure('assets/vector/vector-calculus.svg', t('চিত্র ২.৩৪–২.৩৬-এর ভাবনায় ∇, ক্ষেত্র ও ঘূর্ণনের দৃশ্যায়ন।', 'Visualising ∇, fields and rotation after Figs. 2.34–2.36.'), t('বাঁ প্যানেলে স্কেলার ক্ষেত্রে gradient, মাঝে source/sink divergence, ডানে curl ঘূর্ণন।', 'Left: gradient in a scalar field; middle: source/sink divergence; right: curl rotation.')),
            formula('(2.26)  dR⃗/du = lim(Δu→0) [R⃗(u+Δu) − R⃗(u)]/Δu', t('ভেক্টর অন্তরক।', 'Derivative of a vector.')),
            table(
              [t('নিয়ম', 'Rule'), t('সমীকরণ', 'Equation')],
              [
                [t('যোগ', 'Sum'), t('`d(A⃗+B⃗)/du = dA⃗/du + dB⃗/du`', '`d(A⃗+B⃗)/du = dA⃗/du + dB⃗/du`')],
                [t('ডট', 'Dot'), t('`d(A⃗·B⃗)/du = dA⃗/du·B⃗ + A⃗·dB⃗/du`', '`d(A⃗·B⃗)/du = dA⃗/du·B⃗ + A⃗·dB⃗/du`')],
                [t('ক্রস', 'Cross'), t('`d(A⃗×B⃗)/du = dA⃗/du×B⃗ + A⃗×dB⃗/du`', '`d(A⃗×B⃗)/du = dA⃗/du×B⃗ + A⃗×dB⃗/du`')],
                [t('স্কেলার গুণ', 'Scalar multiple'), t('`d(QA⃗)/du = (dQ/du)A⃗ + Q dA⃗/du`', '`d(QA⃗)/du = (dQ/du)A⃗ + Q dA⃗/du`')]
              ]
            ),
            formula('∫ₐᵇ R⃗(u) du = S⃗(b) − S⃗(a),  if  R⃗ = dS⃗/du', t('ভেক্টরের নির্দিষ্ট যোগজ; ধ্রুবকও ভেক্টর C⃗ হতে পারে।', 'Definite vector integral; the constant can be a vector C⃗.'))
          ]),
          section(t('তিন ধরনের যোগজ', 'Three kinds of integrals'), [
            table(
              [t('ধরন', 'Type'), t('সংকেত', 'Notation'), t('অর্থ', 'Meaning')],
              [
                [t('রেখা যোগজ', 'Line integral'), t('`(2.27) ∫ₐᵇ A⃗·dl⃗ = ∫(Aₓdx + Aᵧdy + Aᶻdz)`', '`(2.27) ∫ₐᵇ A⃗·dl⃗ = ∫(Aₓdx + Aᵧdy + Aᶻdz)`'), t('বক্ররেখা বরাবর', 'Along a curve')],
                [t('তল যোগজ', 'Surface integral'), t('`(2.28) ∫ₛ A⃗·da⃗ = ∫(Aₓdaₓ + Aᵧdaᵧ + Aᶻdaᶻ)`', '`(2.28) ∫ₛ A⃗·da⃗ = ∫(Aₓdaₓ + Aᵧdaᵧ + Aᶻdaᶻ)`'), t('তলব্যাপী', 'Over a surface')],
                [t('আয়তন যোগজ', 'Volume integral'), t('`(2.29) ∫ᵥ A⃗dV = î∫AₓdV + ĵ∫AᵧdV + k̂∫AᶻdV`', '`(2.29) ∫ᵥ A⃗dV = î∫AₓdV + ĵ∫AᵧdV + k̂∫AᶻdV`'), t('আয়তনব্যাপী', 'Over a volume')]
              ]
            )
          ]),
          section(t('ক্ষেত্র ও ∇ অপারেটর', 'Fields and the del operator'), [
            glossary([
              term(t('স্কেলার ক্ষেত্র', 'Scalar field'), t('প্রতিটি বিন্দুতে স্কেলার মান; যেমন ঢাকার তাপমাত্রা বা তড়িৎ বিভব φ(x,y,z)।', 'A scalar at every point; e.g. Dhaka temperature or electric potential φ(x,y,z).')),
              term(t('ভেক্টর ক্ষেত্র', 'Vector field'), t('প্রতিটি বিন্দুতে ভেক্টর মান; যেমন প্রবহমান তরলের বেগ V⃗(x,y,z)।', 'A vector at every point; e.g. velocity V⃗(x,y,z) in a flowing fluid.')),
              term(t('∇ (ডেল/নাবলা)', '∇ (del/nabla)'), t('স্যার হ্যামিল্টনের ভেক্টর অপারেটর; আগে নাবলা নামে পরিচিত ছিল।', "Sir Hamilton's vector operator; formerly called nabla."))
            ]),
            formula('(2.30)  ∇ = î ∂/∂x + ĵ ∂/∂y + k̂ ∂/∂z', t('ডেল অপারেটর।', 'The del operator.')),
            example(t('ক্ষেত্রের উদাহরণ', 'Field examples'), [
              p(t('`φ(x,y,z) = 5x²y − 3yz` একটি স্কেলার ক্ষেত্র; `V⃗ = 3xyz²î + 4xy³ĵ − 2xz⁴k̂` একটি ভেক্টর ক্ষেত্র।', '`φ(x,y,z) = 5x²y − 3yz` is a scalar field; `V⃗ = 3xyz²î + 4xy³ĵ − 2xz⁴k̂` is a vector field.'))
            ])
          ]),
          section(t('গ্রেডিয়েন্ট, ডাইভারজেন্স, কার্ল', 'Gradient, divergence, curl'), [
            formula('(2.31)  ∇φ = î ∂φ/∂x + ĵ ∂φ/∂y + k̂ ∂φ/∂z', t('স্কেলার ক্ষেত্র → ভেক্টর ক্ষেত্র; দিক = সর্বোচ্চ বৃদ্ধির দিক।', 'Scalar field → vector field; direction = steepest increase.')),
            formula('(2.32)  ∇ · V⃗ = ∂Vₓ/∂x + ∂Vᵧ/∂y + ∂Vᶻ/∂z', t('ভেক্টর ক্ষেত্র → স্কেলার; ধনাত্মক = উৎস/প্রসারণ, ঋণাত্মক = সিঙ্ক/সংকোচন, 0 = সলিনয়ডাল।', 'Vector field → scalar; positive = source/expansion, negative = sink/compression, zero = solenoidal.')),
            formula('(2.33)  ∇ × V⃗ = | î ĵ k̂ ; ∂/∂x ∂/∂y ∂/∂z ; Vₓ Vᵧ Vᶻ |', t('ভেক্টর; ঘূর্ণন নির্দেশ করে।', 'A vector; indicates rotation.')),
            formula('∇ × V⃗ = (∂Vᶻ/∂y − ∂Vᵧ/∂z)î + (∂Vₓ/∂z − ∂Vᶻ/∂x)ĵ + (∂Vᵧ/∂x − ∂Vₓ/∂y)k̂', t('প্রসারিত রূপ।', 'Expanded form.')),
            info(t('পদার্থবিজ্ঞানে অর্থ', 'Physics meaning'), t('`∇ × v⃗ = 2ω⃗`; `∇ × V⃗ = 0⃗` হলে ক্ষেত্র অঘূর্ণনশীল ও সংরক্ষণশীল। সবসময় `∇ · (∇ × V⃗) = 0`।', '`∇ × v⃗ = 2ω⃗`; `∇ × V⃗ = 0⃗` means irrotational and conservative. Always `∇ · (∇ × V⃗) = 0`.')),
            warning(t('বিনিময় নয়', 'Not commutative'), t('`A⃗·B⃗ = B⃗·A⃗` হলেও `∇·V⃗ = V⃗·∇` নয়; ∇ একটি অপারেটর, সাধারণ ভেক্টর নয়।', 'Although `A⃗·B⃗ = B⃗·A⃗`, `∇·V⃗ ≠ V⃗·∇`; ∇ is an operator, not an ordinary vector.'))
          ])
        ]
      },
      {
        id: 'summary-and-equations',
        order: 15,
        sectionNo: t('সার-সংক্ষেপ', 'Summary'),
        readingTime: 9,
        updated: '2026-11-08',
        tags: ['summary', 'formula sheet', 'glossary', 'equations'],
        title: t('সার-সংক্ষেপ ও সমীকরণ তালিকা', 'Summary & equation sheet'),
        summary: t('বইয়ের সার-সংক্ষেপ, প্রয়োজনীয় ১৫টি সমীকরণ এবং পুরো অধ্যায়ের শব্দকোষ এক পাতায়।', 'Book summary, 15 essential equations and a full chapter glossary on one page.'),
        sections: [
          section(t('এক নজরে সংজ্ঞা', 'Definitions at a glance'), [
            glossary([
              term(t('ভেক্টর রাশি', 'Vector quantity'), t('সম্পূর্ণ প্রকাশে মান ও দিক উভয় লাগে।', 'Needs both magnitude and direction.')),
              term(t('স্কেলার রাশি', 'Scalar quantity'), t('শুধু মান দিয়েই সম্পূর্ণ।', 'Fully described by magnitude only.')),
              term(t('সমান ভেক্টর', 'Equal vectors'), t('সমান মান ও একই দিক; পাদবিন্দু নির্ভর নয়।', 'Equal magnitude and same direction; tail irrelevant.')),
              term(t('ঋণাত্মক ভেক্টর', 'Negative vector'), t('সমমান কিন্তু বিপরীত দিক।', 'Same magnitude, opposite direction.')),
              term(t('নাল ভেক্টর', 'Null vector'), t('মান শূন্য, নির্দিষ্ট দিক নেই।', 'Zero magnitude, no definite direction.')),
              term(t('একক ভেক্টর', 'Unit vector'), t('মান 1; `â = A⃗/A`।', 'Magnitude 1; `â = A⃗/A`.')),
              term(t('আয়ত একক ভেক্টর', 'Rectangular unit vector'), t('ধনাত্মক X,Y,Z অক্ষ বরাবর î,ĵ,k̂।', 'î,ĵ,k̂ along positive X,Y,Z axes.')),
              term(t('অবস্থান ভেক্টর', 'Position vector'), t('মূলবিন্দুর সাপেক্ষে বিন্দুর অবস্থান; `r⃗`।', 'Position relative to origin; `r⃗`.')),
              term(t('সরণ ভেক্টর', 'Displacement vector'), t('`Δr⃗ = r⃗𝒻 − r⃗ᵢ`।', '`Δr⃗ = r⃗𝒻 − r⃗ᵢ`.')),
              term(t('লব্ধি', 'Resultant'), t('সামান্তরিকের কর্ণ; একাধিক ভেক্টরের মিলিত ফল।', 'Parallelogram diagonal; combined effect of vectors.')),
              term(t('ভেক্টরের বিভাজন', 'Resolution'), t('এক ভেক্টরকে একাধিক উপাংশে ভাঙা।', 'Splitting a vector into components.')),
              term(t('উপাংশ', 'Component'), t('বিভাজনে পাওয়া প্রতিটি অংশ।', 'Each part obtained by resolution.')),
              term(t('ডট গুণফল', 'Dot product'), t('`A⃗·B⃗ = AB cos θ = AₓBₓ+AᵧBᵧ+AᶻBᶻ`।', '`A⃗·B⃗ = AB cos θ = AₓBₓ+AᵧBᵧ+AᶻBᶻ`.')),
              term(t('ক্রস গুণফল', 'Cross product'), t('মান `AB sin θ`, দিক ডানহাতি স্ক্রু নিয়মে অভিলম্ব।', 'Magnitude `AB sin θ`, direction normal by right-hand screw rule.')),
              term(t('অপারেটর', 'Operator'), t('এক রাশিকে অন্য রাশিতে রূপান্তরকারী ক্রিয়া।', 'An action transforming one quantity into another.')),
              term(t('∇, গ্রেডিয়েন্ট, ডাইভারজেন্স, কার্ল', '∇, gradient, divergence, curl'), t('`∇ = î∂/∂x+ĵ∂/∂y+k̂∂/∂z`; `∇φ`, `∇·V⃗`, `∇×V⃗`।', '`∇ = î∂/∂x+ĵ∂/∂y+k̂∂/∂z`; `∇φ`, `∇·V⃗`, `∇×V⃗`.'))
            ])
          ]),
          section(t('সমস্যা সমাধানে প্রয়োজনীয় সমীকরণসমূহ', 'Essential equations'), [
            formulaGrid(summaryEquations),
            info(t('মনে রাখার কৌশল', 'Memory map'), t('২.১–২.৪ লব্ধি/বিভাজন, ২.৭–২.৯ উপাংশ, ২.১৪–২.১৮ গুণন, ২.৩১–২.৩৩ ক্ষেত্র—এই চারটি ব্লকে ভাগ করে মনে রাখুন।', 'Group them in four blocks: 2.1–2.4 resultant/resolution, 2.7–2.9 components, 2.14–2.18 products, 2.31–2.33 fields.'))
          ]),
          section(t('শেষ অনুশীলন', 'Final practice'), [
            qa(t('`A⃗·B⃗ = 0` ও `A⃗×B⃗ = 0⃗` একই সাথে হতে পারে?', 'Can `A⃗·B⃗ = 0` and `A⃗×B⃗ = 0⃗` hold together?'), t('অশূন্য ভেক্টরের জন্য না—প্রথমটি লম্ব, দ্বিতীয়টি সমান্তরাল বোঝায়। কোনো একটি নাল ভেক্টর হলেই দুটোই শূন্য হতে পারে।', 'Not for non-zero vectors: the first means perpendicular, the second parallel. Both vanish only if one vector is null.')),
            qa(t('`l²+m²+n²` কত?', 'What is `l²+m²+n²`?'), t('`1`—দিক কোসাইনগুলোর বর্গের সমষ্টি সর্বদা 1।', '`1`—the sum of squared direction cosines is always 1.'))
          ])
        ]
      }
    ]
  });
})(window.HSC_NOTES);
