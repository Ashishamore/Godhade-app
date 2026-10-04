/* ---------------------------------------------------------------------------
   Demo catalogue for the Godhade Dairy training platform.

   Frontend-only prototype: this stands in for the API. Every screen reads from
   here, so swapping in real endpoints means replacing this one module.

   Prices in ₹. `unlocks` drives the "this course opens more doors" upsell —
   it lists products that use this course's output as their base.
--------------------------------------------------------------------------- */

export const ONLINE_COURSE_PRICE = 2000
export const RECIPE_PRICE = 500
export const OFFLINE_FEE = 10000 // admin-editable in the panel

/* --------------------------------------------------------------- courses --- */

export const courses = [
  {
    id: 'khawa',
    native: 'खवा',
    name: { en: 'Khawa making', hi: 'खवा बनाना', mr: 'खवा बनवणे' },
    tagline: {
      en: 'The base that unlocks pedha, barfi, kulfi and more',
      hi: 'पेढा, बर्फी, कुल्फी का आधार',
      mr: 'पेढा, बर्फी, कुल्फीचा पाया',
    },
    price: 2000,
    durationMin: 48,
    learners: 412,
    rating: 4.8,
    icon: 'Cookie',
    tint: '#8a5a08',
    isBase: true,
    published: true,
    unlocks: ['pedha', 'barfi', 'badam-shake', 'kulfi', 'mastani'],
    outcomes: {
      en: [
        'Choosing and testing milk for the right fat content',
        'Heat control — the single reason most batches fail',
        'Khawa for sweets vs. khawa for shakes',
        'Storage, shelf life and what spoils a batch',
      ],
      hi: [
        'सही फैट वाला दूध चुनना और जाँचना',
        'आँच पर नियंत्रण — ज़्यादातर बैच यहीं बिगड़ते हैं',
        'मिठाई का खवा बनाम शेक का खवा',
        'भंडारण, शेल्फ लाइफ़ और ख़राब होने के कारण',
      ],
      mr: [
        'योग्य फॅटचे दूध निवडणे व तपासणे',
        'आचेवर नियंत्रण — बहुतेक बॅच इथेच बिघडतात',
        'मिठाईचा खवा विरुद्ध शेकचा खवा',
        'साठवण, टिकाऊपणा आणि खराब होण्याची कारणे',
      ],
    },
    lessons: [
      { id: 'k1', title: { en: 'Milk selection & fat testing', hi: 'दूध चुनाव और फैट जाँच', mr: 'दूध निवड व फॅट तपासणी' }, min: 9 },
      { id: 'k2', title: { en: 'Heating & continuous stirring', hi: 'गरम करना और चलाते रहना', mr: 'गरम करणे व सतत ढवळणे' }, min: 14 },
      { id: 'k3', title: { en: 'Reading the texture change', hi: 'बनावट का बदलाव पहचानना', mr: 'पोत बदल ओळखणे' }, min: 11 },
      { id: 'k4', title: { en: 'Cooling, packing & shelf life', hi: 'ठंडा करना, पैकिंग, शेल्फ लाइफ़', mr: 'थंड करणे, पॅकिंग, टिकाऊपणा' }, min: 8 },
      { id: 'k5', title: { en: 'Costing & selling price', hi: 'लागत और बिक्री मूल्य', mr: 'खर्च व विक्री किंमत' }, min: 6 },
    ],
  },
  {
    id: 'dahi',
    native: 'दही',
    name: { en: 'Dahi making', hi: 'दही बनाना', mr: 'दही बनवणे' },
    tagline: {
      en: 'The base for lassi, taak and shrikhand',
      hi: 'लस्सी, ताक और श्रीखंड का आधार',
      mr: 'लस्सी, ताक आणि श्रीखंडाचा पाया',
    },
    price: 2000,
    durationMin: 38,
    learners: 356,
    rating: 4.7,
    icon: 'Soup',
    tint: '#1b4f8a',
    isBase: true,
    published: true,
    unlocks: ['malai-lassi', 'taak', 'straw-lassi', 'chakka'],
    outcomes: {
      en: [
        'Culture selection and how to keep a strong starter',
        'Setting temperature and timing by season',
        'Getting a firm set without sourness',
        'Cup packing that survives transport',
      ],
      hi: [
        'कल्चर चुनना और मज़बूत जामन बनाए रखना',
        'मौसम के हिसाब से तापमान और समय',
        'खट्टा हुए बिना जमा हुआ दही',
        'ढुलाई में टिकने वाली कप पैकिंग',
      ],
      mr: [
        'कल्चर निवड व विरजण टिकवणे',
        'ऋतूनुसार तापमान व वेळ',
        'आंबट न होता घट्ट दही',
        'वाहतुकीत टिकणारी कप पॅकिंग',
      ],
    },
    lessons: [
      { id: 'd1', title: { en: 'Culture & starter care', hi: 'कल्चर और जामन', mr: 'कल्चर व विरजण' }, min: 8 },
      { id: 'd2', title: { en: 'Boiling & cooling to set point', hi: 'उबालना और सही तापमान', mr: 'उकळणे व योग्य तापमान' }, min: 10 },
      { id: 'd3', title: { en: 'Setting, season by season', hi: 'मौसम के अनुसार जमाना', mr: 'ऋतूनुसार विरजणे' }, min: 12 },
      { id: 'd4', title: { en: 'Cup filling & cold chain', hi: 'कप भरना और कोल्ड चेन', mr: 'कप भरणे व कोल्ड चेन' }, min: 8 },
    ],
  },
  {
    id: 'paneer',
    native: 'पनीर',
    name: { en: 'Paneer making', hi: 'पनीर बनाना', mr: 'पनीर बनवणे' },
    tagline: {
      en: 'Highest demand, fastest cash cycle',
      hi: 'सबसे ज़्यादा माँग, सबसे तेज़ नकदी',
      mr: 'सर्वाधिक मागणी, सर्वात जलद रोकड',
    },
    price: 2000,
    durationMin: 42,
    learners: 508,
    rating: 4.9,
    icon: 'Blocks',
    tint: '#15724a',
    published: true,
    unlocks: [],
    outcomes: {
      en: [
        'Acid choice — citric, vinegar or whey',
        'Cutting temperature for soft vs. firm paneer',
        'Pressing, block size and yield per 100 litres',
        'Selling to hotels vs. retail counters',
      ],
      hi: [
        'एसिड का चुनाव — सिट्रिक, सिरका या व्हे',
        'नरम बनाम सख़्त पनीर का तापमान',
        'प्रेसिंग, ब्लॉक साइज़ और प्रति 100 लीटर उत्पादन',
        'होटल बनाम रिटेल में बेचना',
      ],
      mr: [
        'आम्ल निवड — सिट्रिक, व्हिनेगर की व्हे',
        'मऊ विरुद्ध घट्ट पनीरचे तापमान',
        'प्रेसिंग, ब्लॉक आकार व प्रति १०० लिटर उत्पादन',
        'हॉटेल विरुद्ध रिटेलमध्ये विक्री',
      ],
    },
    lessons: [
      { id: 'p1', title: { en: 'Milk standardisation', hi: 'दूध का मानकीकरण', mr: 'दुधाचे प्रमाणीकरण' }, min: 9 },
      { id: 'p2', title: { en: 'Curdling & whey separation', hi: 'फाड़ना और व्हे अलग करना', mr: 'नासवणे व व्हे वेगळे करणे' }, min: 13 },
      { id: 'p3', title: { en: 'Pressing & block cutting', hi: 'प्रेस और ब्लॉक कटिंग', mr: 'प्रेस व ब्लॉक कटिंग' }, min: 12 },
      { id: 'p4', title: { en: 'Packing, yield & pricing', hi: 'पैकिंग, उत्पादन, क़ीमत', mr: 'पॅकिंग, उत्पादन, किंमत' }, min: 8 },
    ],
  },
  {
    id: 'basundi',
    native: 'बासुंदी',
    name: { en: 'Basundi with flavours', hi: 'बासुंदी (फ्लेवर सहित)', mr: 'बासुंदी (फ्लेवरसह)' },
    tagline: {
      en: 'Festival seasons sell out — plan for it',
      hi: 'त्योहारों में पूरा स्टॉक बिकता है',
      mr: 'सणासुदीला संपूर्ण स्टॉक संपतो',
    },
    price: 2000,
    durationMin: 40,
    learners: 243,
    rating: 4.7,
    icon: 'Dessert',
    tint: '#8a3b8a',
    isBase: true,
    published: true,
    unlocks: ['rabdi'],
    outcomes: {
      en: [
        'Reduction ratio and how to hold consistency',
        'Three flavours customers come back for',
        'Bottle vs. pouch packing economics',
      ],
      hi: [
        'गाढ़ा करने का अनुपात और एकरूपता',
        'तीन फ्लेवर जिनके लिए ग्राहक लौटते हैं',
        'बोतल बनाम पाउच पैकिंग का गणित',
      ],
      mr: [
        'आटवण्याचे प्रमाण व सातत्य',
        'ग्राहक परत येतील असे तीन फ्लेवर',
        'बाटली विरुद्ध पाउच पॅकिंगचे गणित',
      ],
    },
    lessons: [
      { id: 'b1', title: { en: 'Reduction & consistency', hi: 'गाढ़ा करना', mr: 'आटवणे व सातत्य' }, min: 14 },
      { id: 'b2', title: { en: 'Flavour additions', hi: 'फ्लेवर मिलाना', mr: 'फ्लेवर मिसळणे' }, min: 10 },
      { id: 'b3', title: { en: 'Bottling & shelf life', hi: 'बॉटलिंग और शेल्फ लाइफ़', mr: 'बाटलीबंद व टिकाऊपणा' }, min: 9 },
      { id: 'b4', title: { en: 'Festival demand planning', hi: 'त्योहारी माँग की योजना', mr: 'सणासुदीची मागणी नियोजन' }, min: 7 },
    ],
  },
  {
    id: 'badam-shake',
    native: 'बादाम शेक',
    name: { en: 'Badam shake', hi: 'बादाम शेक', mr: 'बादाम शेक' },
    tagline: {
      en: 'Counter favourite with the best margin',
      hi: 'काउंटर का पसंदीदा, बेहतरीन मार्जिन',
      mr: 'काउंटरवरचा आवडता, उत्तम मार्जिन',
    },
    price: 1500,
    durationMin: 28,
    learners: 389,
    rating: 4.6,
    icon: 'GlassWater',
    tint: '#9a5b2a',
    published: true,
    unlocks: [],
    outcomes: {
      en: ['Almond paste that does not settle', 'Serving temperature and glass size', 'Margin per glass'],
      hi: ['न बैठने वाला बादाम पेस्ट', 'सर्विंग तापमान और गिलास साइज़', 'प्रति गिलास मार्जिन'],
      mr: ['न बसणारी बदाम पेस्ट', 'सर्व्हिंग तापमान व ग्लास आकार', 'प्रति ग्लास मार्जिन'],
    },
    lessons: [
      { id: 'bs1', title: { en: 'Almond prep & paste', hi: 'बादाम तैयारी', mr: 'बदाम तयारी' }, min: 10 },
      { id: 'bs2', title: { en: 'Blending & serving', hi: 'ब्लेंड और सर्विंग', mr: 'ब्लेंड व सर्व्हिंग' }, min: 10 },
      { id: 'bs3', title: { en: 'Counter costing', hi: 'काउंटर लागत', mr: 'काउंटर खर्च' }, min: 8 },
    ],
  },
  {
    id: 'shrikhand',
    native: 'श्रीखंड',
    name: { en: 'Shrikhand & Amrakhand', hi: 'श्रीखंड और आम्रखंड', mr: 'श्रीखंड आणि आम्रखंड' },
    tagline: {
      en: 'One base, three products, three price points',
      hi: 'एक बेस, तीन प्रोडक्ट, तीन क़ीमतें',
      mr: 'एक बेस, तीन प्रॉडक्ट, तीन किंमती',
    },
    price: 2500,
    durationMin: 52,
    learners: 298,
    rating: 4.8,
    icon: 'CakeSlice',
    tint: '#a8761a',
    published: true,
    unlocks: [],
    outcomes: {
      en: [
        'Chakka hanging and moisture control',
        'Sugar ratio that holds for a week',
        'Amrakhand and fruitkhand variants',
        'Festival pack sizes that move',
      ],
      hi: [
        'चक्का टाँगना और नमी नियंत्रण',
        'हफ़्ते भर टिकने वाला चीनी अनुपात',
        'आम्रखंड और फ्रुटखंड',
        'बिकने वाले त्योहारी पैक साइज़',
      ],
      mr: [
        'चक्का टांगणे व ओलावा नियंत्रण',
        'आठवडाभर टिकणारे साखरेचे प्रमाण',
        'आम्रखंड व फ्रुटखंड',
        'खपणारे सणाचे पॅक आकार',
      ],
    },
    lessons: [
      { id: 's1', title: { en: 'Chakka from dahi', hi: 'दही से चक्का', mr: 'दह्यापासून चक्का' }, min: 12 },
      { id: 's2', title: { en: 'Sugar ratio & texture', hi: 'चीनी अनुपात', mr: 'साखरेचे प्रमाण' }, min: 13 },
      { id: 's3', title: { en: 'Amrakhand & fruitkhand', hi: 'आम्रखंड, फ्रुटखंड', mr: 'आम्रखंड, फ्रुटखंड' }, min: 15 },
      { id: 's4', title: { en: 'Packing for festivals', hi: 'त्योहारी पैकिंग', mr: 'सणाची पॅकिंग' }, min: 12 },
    ],
  },
  {
    id: 'kulfi',
    native: 'कुल्फी',
    name: { en: 'Kulfi with flavours', hi: 'कुल्फी (फ्लेवर सहित)', mr: 'कुल्फी (फ्लेवरसह)' },
    tagline: {
      en: 'Summer product with a long storage window',
      hi: 'गर्मी का प्रोडक्ट, लंबा भंडारण',
      mr: 'उन्हाळी प्रॉडक्ट, दीर्घ साठवण',
    },
    price: 2000,
    durationMin: 36,
    learners: 267,
    rating: 4.7,
    icon: 'Popsicle',
    tint: '#1b6e7a',
    published: true,
    unlocks: [],
    outcomes: {
      en: ['Khawa-based kulfi mix', 'Mould filling without air gaps', 'Cold storage and distribution'],
      hi: ['खवा आधारित कुल्फी मिक्स', 'बिना हवा के मोल्ड भरना', 'कोल्ड स्टोरेज और वितरण'],
      mr: ['खवा आधारित कुल्फी मिक्स', 'हवेशिवाय मोल्ड भरणे', 'कोल्ड स्टोरेज व वितरण'],
    },
    lessons: [
      { id: 'ku1', title: { en: 'Mix preparation', hi: 'मिक्स तैयारी', mr: 'मिक्स तयारी' }, min: 12 },
      { id: 'ku2', title: { en: 'Moulding & freezing', hi: 'मोल्डिंग और फ्रीज़िंग', mr: 'मोल्डिंग व फ्रीझिंग' }, min: 14 },
      { id: 'ku3', title: { en: 'Storage & distribution', hi: 'भंडारण और वितरण', mr: 'साठवण व वितरण' }, min: 10 },
    ],
  },
  {
    id: 'pedha',
    native: 'पेढा',
    name: { en: 'Pedha making', hi: 'पेढा बनाना', mr: 'पेढा बनवणे' },
    tagline: {
      en: 'Needs khawa — learn that first',
      hi: 'खवा ज़रूरी — पहले वह सीखें',
      mr: 'खवा आवश्यक — आधी तो शिका',
    },
    price: 2000,
    durationMin: 34,
    learners: 221,
    rating: 4.6,
    icon: 'Candy',
    tint: '#8a5a08',
    published: true,
    requires: 'khawa',
    unlocks: [],
    outcomes: {
      en: ['Khawa roasting for colour', 'Shaping and uniform weight', 'Box packing and gifting packs'],
      hi: ['रंग के लिए खवा भूनना', 'आकार और एकसमान वज़न', 'बॉक्स पैकिंग और गिफ़्ट पैक'],
      mr: ['रंगासाठी खवा भाजणे', 'आकार व एकसमान वजन', 'बॉक्स पॅकिंग व गिफ्ट पॅक'],
    },
    lessons: [
      { id: 'pe1', title: { en: 'Roasting the khawa', hi: 'खवा भूनना', mr: 'खवा भाजणे' }, min: 12 },
      { id: 'pe2', title: { en: 'Shaping & weight control', hi: 'आकार और वज़न', mr: 'आकार व वजन' }, min: 12 },
      { id: 'pe3', title: { en: 'Boxing & shelf display', hi: 'बॉक्सिंग और डिस्प्ले', mr: 'बॉक्सिंग व डिस्प्ले' }, min: 10 },
    ],
  },
  {
    id: 'malai-lassi',
    native: 'मलई लस्सी',
    name: { en: 'Malai lassi', hi: 'मलई लस्सी', mr: 'मलई लस्सी' },
    tagline: {
      en: 'Dahi turns into daily cash flow',
      hi: 'दही से रोज़ की नकदी',
      mr: 'दह्यातून रोजची रोकड',
    },
    price: 1500,
    durationMin: 26,
    learners: 312,
    rating: 4.5,
    icon: 'CupSoda',
    tint: '#1b4f8a',
    published: true,
    requires: 'dahi',
    unlocks: [],
    outcomes: {
      en: ['Thickness that holds in a cup', 'Sweetness level for your market', 'Cup sealing and daily batch size'],
      hi: ['कप में टिकने वाला गाढ़ापन', 'बाज़ार के हिसाब से मिठास', 'कप सीलिंग और रोज़ाना बैच'],
      mr: ['कपमध्ये टिकणारा घट्टपणा', 'बाजारानुसार गोडवा', 'कप सीलिंग व रोजचा बॅच'],
    },
    lessons: [
      { id: 'ml1', title: { en: 'Dahi to lassi base', hi: 'दही से लस्सी बेस', mr: 'दह्यापासून लस्सी बेस' }, min: 9 },
      { id: 'ml2', title: { en: 'Malai layer & finish', hi: 'मलई परत', mr: 'मलई थर' }, min: 9 },
      { id: 'ml3', title: { en: 'Cup sealing & batching', hi: 'कप सीलिंग', mr: 'कप सीलिंग' }, min: 8 },
    ],
  },
  {
    id: 'tup',
    native: 'तूप',
    name: { en: 'Pure ghee (tup)', hi: 'शुद्ध घी (तूप)', mr: 'शुद्ध तूप' },
    tagline: {
      en: 'Highest value per litre of milk',
      hi: 'प्रति लीटर दूध सबसे ज़्यादा मूल्य',
      mr: 'प्रति लिटर दुधाचे सर्वाधिक मूल्य',
    },
    price: 2500,
    durationMin: 44,
    learners: 356,
    rating: 4.9,
    icon: 'Flame',
    tint: '#a8761a',
    published: true,
    unlocks: [],
    outcomes: {
      en: [
        'Bilona vs. cream route — cost and price difference',
        'Granule size that customers judge quality by',
        'Jar packing, labelling and FSSAI basics',
      ],
      hi: [
        'बिलोना बनाम क्रीम तरीका — लागत और क़ीमत',
        'दाने का आकार जिससे ग्राहक गुणवत्ता आँकते हैं',
        'जार पैकिंग, लेबलिंग और FSSAI',
      ],
      mr: [
        'बिलोना विरुद्ध क्रीम पद्धत — खर्च व किंमत',
        'ग्राहक दर्जा ठरवतात तो कणांचा आकार',
        'जार पॅकिंग, लेबलिंग व FSSAI',
      ],
    },
    lessons: [
      { id: 't1', title: { en: 'Cream collection', hi: 'क्रीम इकट्ठा करना', mr: 'क्रीम जमा करणे' }, min: 10 },
      { id: 't2', title: { en: 'Clarifying & granules', hi: 'पकाना और दाने', mr: 'कढवणे व कण' }, min: 14 },
      { id: 't3', title: { en: 'Filtering & jar packing', hi: 'छानना और जार पैकिंग', mr: 'गाळणे व जार पॅकिंग' }, min: 10 },
      { id: 't4', title: { en: 'Labelling & compliance', hi: 'लेबलिंग और अनुपालन', mr: 'लेबलिंग व नियम' }, min: 10 },
    ],
  },
  {
    id: 'mastani',
    native: 'मस्तानी',
    name: { en: 'Mastani', hi: 'मस्तानी', mr: 'मस्तानी' },
    tagline: {
      en: 'Premium glass, premium price',
      hi: 'प्रीमियम गिलास, प्रीमियम क़ीमत',
      mr: 'प्रीमियम ग्लास, प्रीमियम किंमत',
    },
    price: 2000,
    durationMin: 30,
    learners: 198,
    rating: 4.7,
    icon: 'IceCreamBowl',
    tint: '#8a3b8a',
    published: true,
    requires: 'khawa',
    unlocks: [],
    outcomes: {
      en: ['Layering that looks premium', 'Ice cream scoop economics', 'Pune-style finish'],
      hi: ['प्रीमियम दिखने वाली लेयरिंग', 'आइसक्रीम स्कूप का गणित', 'पुणे स्टाइल फ़िनिश'],
      mr: ['प्रीमियम दिसणारे थर', 'आइस्क्रीम स्कूपचे गणित', 'पुणेरी फिनिश'],
    },
    lessons: [
      { id: 'ma1', title: { en: 'Base & layering', hi: 'बेस और लेयरिंग', mr: 'बेस व थर' }, min: 11 },
      { id: 'ma2', title: { en: 'Toppings & presentation', hi: 'टॉपिंग और प्रस्तुति', mr: 'टॉपिंग व सादरीकरण' }, min: 10 },
      { id: 'ma3', title: { en: 'Pricing a premium glass', hi: 'प्रीमियम क़ीमत', mr: 'प्रीमियम किंमत' }, min: 9 },
    ],
  },
  {
    id: 'icecream',
    native: 'आइस्क्रीम',
    name: { en: 'Ice cream', hi: 'आइसक्रीम', mr: 'आइस्क्रीम' },
    tagline: {
      en: 'Coming soon — recording in progress',
      hi: 'जल्द आ रहा है',
      mr: 'लवकरच येत आहे',
    },
    price: 2500,
    durationMin: 0,
    learners: 0,
    rating: 0,
    icon: 'IceCreamCone',
    tint: '#1b6e7a',
    published: false,
    unlocks: [],
    outcomes: { en: [], hi: [], mr: [] },
    lessons: [],
  },
]

/* --------------------------------------------------------------- recipes --- */

export const recipes = [
  {
    id: 'r-khawa',
    courseId: 'khawa',
    native: 'खवा',
    title: { en: 'Khawa — full written recipe', hi: 'खवा — पूरी लिखित रेसिपी', mr: 'खवा — संपूर्ण लिखित रेसिपी' },
    price: 500,
    pages: 6,
    icon: 'Cookie',
    tint: '#8a5a08',
  },
  {
    id: 'r-basundi',
    courseId: 'basundi',
    native: 'बासुंदी',
    title: { en: 'Basundi — full written recipe', hi: 'बासुंदी — पूरी लिखित रेसिपी', mr: 'बासुंदी — संपूर्ण लिखित रेसिपी' },
    price: 500,
    pages: 5,
    icon: 'Dessert',
    tint: '#8a3b8a',
  },
  {
    id: 'r-paneer',
    courseId: 'paneer',
    native: 'पनीर',
    title: { en: 'Paneer — full written recipe', hi: 'पनीर — पूरी लिखित रेसिपी', mr: 'पनीर — संपूर्ण लिखित रेसिपी' },
    price: 500,
    pages: 7,
    icon: 'Blocks',
    tint: '#15724a',
  },
  {
    id: 'r-shrikhand',
    courseId: 'shrikhand',
    native: 'श्रीखंड',
    title: { en: 'Shrikhand — full written recipe', hi: 'श्रीखंड — पूरी लिखित रेसिपी', mr: 'श्रीखंड — संपूर्ण लिखित रेसिपी' },
    price: 500,
    pages: 6,
    icon: 'CakeSlice',
    tint: '#a8761a',
  },
  {
    id: 'r-tup',
    courseId: 'tup',
    native: 'तूप',
    title: { en: 'Pure ghee — full written recipe', hi: 'शुद्ध घी — पूरी लिखित रेसिपी', mr: 'शुद्ध तूप — संपूर्ण लिखित रेसिपी' },
    price: 500,
    pages: 8,
    icon: 'Flame',
    tint: '#a8761a',
  },
]

/* --------------------------------------------------- residential batches --- */

export const batches = [
  {
    id: 'B-18',
    code: 'Batch 18',
    start: '2026-10-14',
    end: '2026-10-16',
    seats: 16,
    filled: 11,
    fee: OFFLINE_FEE,
    venue: { en: 'Murgud, Kolhapur', hi: 'मुरगुड, कोल्हापुर', mr: 'मुरगुड, कोल्हापूर' },
    status: 'open',
  },
  {
    id: 'B-19',
    code: 'Batch 19',
    start: '2026-11-04',
    end: '2026-11-06',
    seats: 16,
    filled: 4,
    fee: OFFLINE_FEE,
    venue: { en: 'Murgud, Kolhapur', hi: 'मुरगुड, कोल्हापुर', mr: 'मुरगुड, कोल्हापूर' },
    status: 'open',
  },
  {
    id: 'B-17',
    code: 'Batch 17',
    start: '2026-09-16',
    end: '2026-09-18',
    seats: 16,
    filled: 16,
    fee: OFFLINE_FEE,
    venue: { en: 'Murgud, Kolhapur', hi: 'मुरगुड, कोल्हापुर', mr: 'मुरगुड, कोल्हापूर' },
    status: 'completed',
  },
]

export const offlineIncludes = {
  en: ['18+ products, hands on', '2 nights stay at the unit', 'All meals', 'Market & competition sessions', 'Supplier contact list'],
  hi: ['18+ प्रोडक्ट, ख़ुद करके', 'यूनिट पर 2 रात ठहरना', 'सभी भोजन', 'मार्केट और प्रतिस्पर्धा सत्र', 'सप्लायर संपर्क सूची'],
  mr: ['१८+ प्रॉडक्ट, स्वतः करून', 'युनिटवर २ रात्री मुक्काम', 'सर्व जेवण', 'मार्केट व स्पर्धा सत्रे', 'पुरवठादार संपर्क यादी'],
}

/* ------------------------------------------------- supplier contact list --- */
/* Unlocked for students who complete the residential batch. */

export const supplierContacts = [
  { id: 'c1', category: { en: 'Machinery', hi: 'मशीनरी', mr: 'मशिनरी' }, name: 'Khawa machine — Shree Engineering', place: 'Kolhapur', phone: '+91 90000 00001' },
  { id: 'c2', category: { en: 'Machinery', hi: 'मशीनरी', mr: 'मशिनरी' }, name: 'Pulverizer & boiler — Agro Tech', place: 'Sangli', phone: '+91 90000 00002' },
  { id: 'c3', category: { en: 'Ingredients', hi: 'सामग्री', mr: 'साहित्य' }, name: 'Essences & flavours — Rasayan Traders', place: 'Pune', phone: '+91 90000 00003' },
  { id: 'c4', category: { en: 'Ingredients', hi: 'सामग्री', mr: 'साहित्य' }, name: 'Custard powder — Shreeji Foods', place: 'Mumbai', phone: '+91 90000 00004' },
  { id: 'c5', category: { en: 'Packaging', hi: 'पैकेजिंग', mr: 'पॅकेजिंग' }, name: 'Plastic cups & lids — Varsha Polymers', place: 'Kolhapur', phone: '+91 90000 00005' },
  { id: 'c6', category: { en: 'Packaging', hi: 'पैकेजिंग', mr: 'पॅकेजिंग' }, name: 'Food grade containers — PPE Pack', place: 'Nashik', phone: '+91 90000 00006' },
  { id: 'c7', category: { en: 'Compliance', hi: 'अनुपालन', mr: 'नियम' }, name: 'FSSAI licensing consultant', place: 'Kolhapur', phone: '+91 90000 00007' },
]

/* ------------------------------------------------------------ home slider --- */
/* Admin-editable advertisement slides. Flat colour blocks, no imagery needed
   for the prototype — the admin panel swaps these for uploaded banners. */

export const adSlides = [
  {
    id: 'ad1',
    tint: '#c2410c',
    title: { en: 'Batch 18 — 5 seats left', hi: 'बैच 18 — 5 सीटें बाकी', mr: 'बॅच १८ — ५ जागा शिल्लक' },
    body: { en: '14–16 October, Murgud', hi: '14–16 अक्टूबर, मुरगुड', mr: '१४–१६ ऑक्टोबर, मुरगुड' },
    cta: 'batch',
  },
  {
    id: 'ad2',
    tint: '#1b4f8a',
    title: { en: 'Paneer course at ₹2,000', hi: 'पनीर कोर्स ₹2,000 में', mr: 'पनीर कोर्स ₹२,००० मध्ये' },
    body: { en: 'Highest demand, fastest returns', hi: 'सबसे ज़्यादा माँग', mr: 'सर्वाधिक मागणी' },
    cta: 'course:paneer',
  },
  {
    id: 'ad3',
    tint: '#8a5a08',
    title: { en: 'Start with just ₹2 lakh', hi: 'सिर्फ ₹2 लाख से शुरू', mr: 'फक्त ₹२ लाखात सुरुवात' },
    body: { en: 'See the full equipment list', hi: 'पूरी मशीन सूची देखें', mr: 'संपूर्ण मशीन यादी पाहा' },
    cta: 'batch',
  },
]

/* ------------------------------------------------------------ social links --- */

export const socialLinks = [
  { id: 'yt', label: 'YouTube', handle: '@godhadedairy', icon: 'youtube', url: '#' },
  { id: 'ig', label: 'Instagram', handle: '@godhade.dairy', icon: 'instagram', url: '#' },
  { id: 'fb', label: 'Facebook', handle: 'Godhade Dairy Farm', icon: 'facebook', url: '#' },
  { id: 'wa', label: 'WhatsApp', handle: '+91 90000 11111', icon: 'whatsapp', url: '#' },
]

/* ----------------------------------------------------------------- lookups --- */

export const courseById = (id) => courses.find((c) => c.id === id)
export const recipeById = (id) => recipes.find((r) => r.id === id)
export const batchById = (id) => batches.find((b) => b.id === id)

export const money = (n) => '₹' + Number(n).toLocaleString('en-IN')

export const formatDate = (iso, opts = {}) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    ...opts,
  })

export function dateRange(a, b) {
  const d1 = new Date(a + 'T00:00:00')
  const d2 = new Date(b + 'T00:00:00')
  const sameMonth = d1.getMonth() === d2.getMonth()
  return sameMonth
    ? `${d1.getDate()}–${d2.getDate()} ${d2.toLocaleDateString('en-IN', { month: 'short' })}`
    : `${formatDate(a)} – ${formatDate(b)}`
}
