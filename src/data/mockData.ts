import {
  ChildRightArticle,
  CreativeSubmissionItem,
  QuizQuestionItem,
  SafeWebResource,
  ComicStory,
  OperationalDistrict
} from '../types';

export const ASSET_IMAGES = {
  heroChildren: '/src/assets/images/hero_children_rural_1791875891682.jpg',
  childrenArt: '/src/assets/images/children_art_workshop_1791875891982.jpg',
  storybookCover: '/src/assets/images/storybook_cover_coastal_1791875892637.jpg',
  volunteerWorker: '/src/assets/images/volunteer_field_worker_1791875892635.jpg',
};

export const CHILD_RIGHTS_ARTICLES: ChildRightArticle[] = [
  {
    id: 'right-education',
    articleNumber: 'UNCRC Art. 28 / BD Child Act Sec. 14',
    iconName: 'BookOpen',
    titleEn: 'Right to Free & Compulsory Primary Education',
    titleBn: 'বিনামূল্যে ও বাধ্যতামূলক প্রাথমিক শিক্ষার অধিকার',
    summaryEn: 'Every child across all 64 districts of Bangladesh has the constitutional right to attend school without cost, fear, or discrimination.',
    summaryBn: 'বাংলাদেশের ৬৪ জেলার প্রতিটি শিশুর ভয়হীন ও বৈষম্যহীনভাবে স্কুলে যাওয়ার এবং বিনামূল্যে মানসম্মত প্রাথমিক শিক্ষা লাভের সাংবিধানিক অধিকার রয়েছে।',
    legalReferenceEn: 'Bangladesh Constitution Art. 17 & Primary Education Act 1990',
    legalReferenceBn: 'বাংলাদেশ সংবিধানের ১৭ নং অনুচ্ছেদ এবং বাধ্যতামূলক প্রাথমিক শিক্ষা আইন ১৯৯০',
    actionAdviceEn: 'If a school denies admission or demands unauthorized fees anywhere in Bangladesh, notify local education officers or dial 1098.',
    actionAdviceBn: 'কোনো বিদ্যালয় ভর্তি নিতে অস্বীকার করলে বা অবৈধ ফি দাবি করলে স্থানীয় শিক্ষা কর্মকর্তা বা ১০৯৮ নম্বরে যোগাযোগ করো।',
    audioTextEn: 'Article 28: You have the right to free education across Bangladesh. No child should be forced to work instead of going to school.',
    audioTextBn: 'অনুচ্ছেদ ২৮: তোমার বিনামূল্যে স্কুলে পড়ার অধিকার আছে। পড়ালেখার বয়সে কাউকে কাজে বাধ্য করা যাবে না।'
  },
  {
    id: 'right-protection',
    articleNumber: 'UNCRC Art. 19 / BD Child Act Sec. 70',
    iconName: 'ShieldCheck',
    titleEn: 'Protection from Harm, Abuse & Early Marriage',
    titleBn: 'নির্যাতন, সহিংসতা ও বাল্যবিয়ে থেকে সুরক্ষার অধিকার',
    summaryEn: 'Children nationwide must be safeguarded from all forms of physical abuse, emotional harm, child labor, and marriage under age 18.',
    summaryBn: '১৮ বছর পূর্ণ হওয়ার পূর্বে বিয়ে নয়। দেশের সর্বত্র সকল প্রকার শারীরিক প্রহার, মানসিক নির্যাতন ও শোষণ থেকে শিশুকে পূর্ণ সুরক্ষা দেয়া রাষ্ট্রের দায়িত্ব।',
    legalReferenceEn: 'Child Marriage Restraint Act 2017 & Bangladesh Children Act 2013',
    legalReferenceBn: 'বাল্যবিয়ে নিরোধ আইন ২০১৭ এবং শিশু আইন ২০১৩ এর ৭০ ধারা',
    actionAdviceEn: 'Never keep child marriage or violence a secret. Talk to a trusted school teacher or dial 1098 immediately.',
    actionAdviceBn: 'বাল্যবিয়ে বা নির্যাতনের ঘটনা কখনো লুকিয়ে রাখবে না। অবিলম্বে বিশ্বস্ত শিক্ষক বা ১০৯৮ নম্বরে ফোন করে জানাও।',
    audioTextEn: 'Article 19: You have the right to be protected from violence and early marriage everywhere in Bangladesh.',
    audioTextBn: 'অনুচ্ছেদ ১৯: তোমাকে সবরকম সহিংসতা ও বাল্যবিয়ে থেকে সুরক্ষা দিতে হবে। তোমার জীবনের নিরাপত্তা সর্বাগ্রে।'
  },
  {
    id: 'right-health',
    articleNumber: 'UNCRC Art. 24 / BD Child Act Sec. 18',
    iconName: 'HeartPulse',
    titleEn: 'Right to Clean Water, Nutrition & Healthcare',
    titleBn: 'বিশুদ্ধ খাবার পানি, পুষ্টি ও স্বাস্থ্যসেবার অধিকার',
    summaryEn: 'Access to safe drinking water, essential immunization, and free village and community clinic healthcare is an inalienable right.',
    summaryBn: 'বিশুদ্ধ পানীয় জল, অত্যাবশ্যকীয় টিকা এবং সরকারি কমিউনিটি ক্লিনিক ও উপজেলা স্বাস্থ্য কমপ্লেক্স থেকে বিনামূল্যে ওষুধ পাওয়া প্রতিটি শিশুর অধিকার।',
    legalReferenceEn: 'National Children Policy 2011 Section 6.2',
    legalReferenceBn: 'জাতীয় শিশুনীতি ২০১১ এর স্বাস্থ্য সুরক্ষা অনুচ্ছেদ',
    actionAdviceEn: 'Visit your nearest Union Health & Family Welfare Centre or Community Clinic for free checkups and vitamins.',
    actionAdviceBn: 'টিকা এবং প্রাথমিক চিকিৎসার জন্য তোমার ইউনিয়ন স্বাস্থ্য কেন্দ্র বা কমিউনিটি ক্লিনিকে সম্পূর্ণ বিনামূল্যে সেবা নাও।',
    audioTextEn: 'Article 24: Good health, clean water, and nutritious food are every child’s natural birthright in Bangladesh.',
    audioTextBn: 'অনুচ্ছেদ ২৪: সুস্বাস্থ্য, বিশুদ্ধ পানীয় জল এবং পুষ্টিকর খাবার পাওয়া প্রতিটি শিশুর জন্মগত অধিকার।'
  },
  {
    id: 'right-voice',
    articleNumber: 'UNCRC Art. 12 / BD Child Act Sec. 11',
    iconName: 'Mic',
    titleEn: 'Right to Express Views & Be Heard',
    titleBn: 'মতামত প্রকাশ ও বক্তব্য শোনার অধিকার',
    summaryEn: 'Children have the right to express their thoughts on decisions affecting their life, school, local safety, and national community welfare.',
    summaryBn: 'পরিবার, বিদ্যালয় এবং সমাজ সম্পর্কিত যেকোনো বিষয়ে মতামত দেওয়ার এবং বড়দের তা মনোযোগ দিয়ে শোনার অধিকার শিশুর আছে।',
    legalReferenceEn: 'UN Convention on Rights of the Child Article 12',
    legalReferenceBn: 'জাতিসংঘ শিশু সনদ অনুচ্ছেদ ১২ - শিশুর মতামতের স্বাধীনতা',
    actionAdviceEn: 'Join child clubs or student forums in your area to share ideas for making schools and communities safer.',
    actionAdviceBn: 'তোমার বিদ্যালয়ের শিশু ক্লাব বা বিতর্ক সংসদে অংশ নিয়ে তোমার স্বপ্ন ও মতামত নির্ভয়ে তুলে ধরো।',
    audioTextEn: 'Article 12: Your voice matters. Adults across Bangladesh have a duty to listen to what you say.',
    audioTextBn: 'অনুচ্ছেদ ১২: তোমার কণ্ঠস্বর অত্যন্ত গুরুত্বপূর্ণ। তোমার কথা বড়দের শুনতে হবে।'
  },
  {
    id: 'right-play',
    articleNumber: 'UNCRC Art. 31 / BD Child Act Sec. 19',
    iconName: 'Sparkles',
    titleEn: 'Right to Play, Rest, Cultural Life & Joy',
    titleBn: 'খেলাধুলা, বিশ্রাম ও আনন্দময় শৈশবের অধিকার',
    summaryEn: 'Children must not be burdened with economic labor. They have the right to play in open fields, paint, sing, and experience an enjoyable childhood.',
    summaryBn: 'শিশুদের শৈশব কাজের বোঝার জন্য নয়। তাদের উন্মুক্ত মাঠে খেলাধুলা করা, ছবি আঁকা, গান গাওয়া ও আনন্দ করার পূর্ণ অধিকার রয়েছে।',
    legalReferenceEn: 'UNCRC Article 31: Leisure, play and culture',
    legalReferenceBn: 'জাতিসংঘ শিশু সনদ অনুচ্ছেদ ৩১ - খেলাধুলা ও সাংস্কৃতিক অধিকার',
    actionAdviceEn: 'Encourage schools and local councils to preserve open playgrounds and sports clubs for all children.',
    actionAdviceBn: 'প্রতিদিন বিকেলে মুক্ত বাতাসে খেলাধুলা ও সৃজনশীল চর্চায় অংশ নিয়ে শারীরিক ও মানসিক স্বাস্থ্য ভালো রাখো।',
    audioTextEn: 'Article 31: You have the right to relax, play, and take part in wide creative activities.',
    audioTextBn: 'অনুচ্ছেদ ৩১: তোমার বিশ্রাম নেওয়া, খেলাধুলা করা এবং আনন্দে অংশ নেওয়ার পূর্ণ অধিকার আছে।'
  },
  {
    id: 'right-disaster',
    articleNumber: 'UNCRC Art. 22 & 38 / BD Disaster Act',
    iconName: 'LifeBuoy',
    titleEn: 'Special Protection in Climate Disasters & Floods',
    titleBn: 'বন্যা, নদীভাঙন ও প্রাকৃতিক দুর্যোগে অগ্রাধিকারমূলক সুরক্ষা',
    summaryEn: 'During river floods, tidal storms, or flash floods across Bangladesh, children and mothers must receive priority evacuation and relief.',
    summaryBn: 'বন্যা, নদীভাঙন কিংবা পাহাড়ি ঢলের সময় শিশু ও তাদের পরিবারকে অগ্রাধিকার ভিত্তিতে নিরাপদ আশ্রয় ও খাদ্য সহায়তা নিশ্চিত করতে হবে।',
    legalReferenceEn: 'Disaster Management Act 2012 Child Evacuation Protocol',
    legalReferenceBn: 'দুর্যোগ ব্যবস্থাপনা আইন ২০১২ - শিশু সুরক্ষা গাইডলাইন',
    actionAdviceEn: 'Memorize your nearest disaster shelter route and keep emergency contact 1098 and 999 ready.',
    actionAdviceBn: 'তোমার এলাকার দুর্যোগ আশ্রয়কেন্দ্রের পথ জেনে রাখো এবং বিপদ সংকেত দিলে দ্রুত নিরাপদ আশ্রয়ে যাও।',
    audioTextEn: 'During natural disasters across Bangladesh, children must be evacuated first to safety.',
    audioTextBn: 'দুর্যোগের সময় শিশুদের সর্বপ্রথম নিরাপদ আশ্রয়কেন্দ্রে নিয়ে যেতে হবে।'
  }
];

export const CREATIVE_SUBMISSIONS: CreativeSubmissionItem[] = [
  {
    id: 'c-1',
    title: 'Our River Boat School in Sunamganj Haor (ভাসমান স্কুল)',
    category: 'drawing',
    author: 'Amina',
    age: 9,
    location: 'Sunamganj, Sylhet',
    imageUrl: ASSET_IMAGES.childrenArt,
    likes: 342,
    date: 'March 2026',
    tags: ['Sylhet Haor', 'Water School', 'Colors of Joy']
  },
  {
    id: 'c-2',
    title: 'Green Hills of Bandarban & My Classroom (সবুজ পাহাড় ও আমার স্কুল)',
    category: 'story',
    author: 'Mong Shwe',
    age: 12,
    location: 'Bandarban, Chattogram',
    textContent: 'Every morning we walk along the green mist of Chimbuk hill to reach our community primary school. I want all children in hill tracts to have solar lights and science books so we can build a smart Bangladesh together.',
    likes: 278,
    date: 'March 2026',
    tags: ['Hill Tracts', 'Education for All', 'Hope']
  },
  {
    id: 'c-3',
    title: 'Dhaka City Dreams: The Starlight Rooftop (শহরের স্বপ্ন)',
    category: 'poem',
    author: 'Farzana',
    age: 11,
    location: 'Mirpur, Dhaka',
    textContent: 'ইটের শহরে মেঘের মেলা,\nআমরাও চাই খেলার বেলা।\nবইয়ের পাতায় বিশ্ব দেখি,\nকলম দিয়ে স্বপ্ন আঁকি।\nপ্রতিটি শিশুর মুখে হাসি,\nআমরা দেশকে ভালোবাসি।',
    likes: 412,
    date: 'February 2026',
    tags: ['Urban Dreams', 'Bengali Poem', 'Child Voice']
  },
  {
    id: 'c-4',
    title: 'Harvest Festival in Bogura Plains (বগুড়ার সোনালী ধানের মাঠ)',
    category: 'drawing',
    author: 'Sabbir',
    age: 10,
    location: 'Bogura, Rajshahi',
    imageUrl: ASSET_IMAGES.storybookCover,
    likes: 195,
    date: 'January 2026',
    tags: ['Rural Bengal', 'Joyful Childhood', 'Northern Plains']
  }
];

export const QUIZ_QUESTIONS: QuizQuestionItem[] = [
  {
    id: 1,
    questionEn: 'Until what age is a person legally recognized and protected as a child in Bangladesh under the Children Act 2013?',
    questionBn: 'বাংলাদেশ শিশু আইন ২০১৩ অনুসারে কত বছর বয়স পর্যন্ত একজন ব্যক্তি শিশু হিসেবে গণ্য ও সুরক্ষিত?',
    optionsEn: ['Below 14 years', 'Below 16 years', 'Below 18 years', 'Below 21 years'],
    optionsBn: ['১৪ বছরের নিচে', '১৬ বছরের নিচে', '১৮ বছরের নিচে', '২১ বছরের নিচে'],
    correctIndex: 2,
    explanationEn: 'Under the Children Act 2013 and UNCRC, every person under the age of 18 in Bangladesh is legally recognized as a child.',
    explanationBn: 'শিশু আইন ২০১৩ এবং জাতিসংঘ শিশু সনদ অনুযায়ী ১৮ বছর পূর্ণ না হওয়া পর্যন্ত প্রত্যেকেই আইনিভাবে শিশু।',
    mascotTipEn: 'Remember! Up to age 18, family, society, and the state must guarantee your safety.',
    mascotTipBn: 'মনে রাখবে! ১৮ বছর পর্যন্ত পরিবার ও রাষ্ট্র তোমাকে সার্বিক সুরক্ষা দিতে দায়বদ্ধ।'
  },
  {
    id: 2,
    questionEn: 'What is the nationwide toll-free 24/7 emergency helpline number for child rescue and safety across Bangladesh?',
    questionBn: 'বাংলাদেশে শিশু নির্যাতন প্রতিরোধ ও তাৎক্ষণিক উদ্ধারে সার্বক্ষণিক ২৪ ঘণ্টা বিনামূল্যে সরকারি হেল্পলাইন নম্বর কোনটি?',
    optionsEn: ['1098', '999', '333', '106'],
    optionsBn: ['১০৯৮', '৯৯৯', '৩৩৩', '১০৬'],
    correctIndex: 0,
    explanationEn: '1098 is the specialized nationwide Child Helpline operated by the Ministry of Social Welfare. It is toll-free from any mobile or telephone in Bangladesh.',
    explanationBn: '১০৯৮ হলো সমাজসেবা অধিদপ্তরের জাতীয় শিশু হেল্পলাইন। দেশের যেকোনো প্রান্ত থেকে কোনো খরচ ছাড়াই এতে ফোন দেওয়া যায়।',
    mascotTipEn: 'Any child in trouble anywhere in Bangladesh can call 1098 directly for confidential counseling and rescue!',
    mascotTipBn: 'বিপদে পড়লে বা কাউকে বিপদে দেখলে সাথে সাথে ১০৯৮ এ ফোন দেবে।'
  },
  {
    id: 3,
    questionEn: 'What is the fundamental safety rule regarding "Safe Touch & Unsafe Touch" (Good Touch vs Bad Touch)?',
    questionBn: '"নিরাপদ স্পর্শ ও অনিরাপদ স্পর্শ" (গুড টাচ ও ব্যাড টাচ) সম্পর্কে কোনটি সঠিক?',
    optionsEn: [
      'Children should stay silent if touched uncomfortably',
      'Touches under clothing that make you feel uncomfortable or scared are wrong; say NO loudly and tell a trusted adult',
      'Only strangers can make unsafe touches',
      'You should keep uncomfortable secrets from parents'
    ],
    optionsBn: [
      'অস্বস্তিকর স্পর্শে শিশুর চুপ থাকা উচিত',
      'পোশাকের ভেতরের অংশে এমন কোনো স্পর্শ যা অস্বস্তি বা ভয় তৈরি করে তা ভুল; দৃঢ়ভাবে না বলো এবং বড়দের জানাও',
      'কেবল অচেনা মানুষই অনিরাপদ স্পর্শ করতে পারে',
      'খারাপ স্পর্শের কথা মা-বাবার কাছে গোপন রাখা উচিত'
    ],
    correctIndex: 1,
    explanationEn: 'Your body belongs to you. If anyone touches your private body parts or asks you to keep secrets, immediately say NO and tell a parent, teacher, or call 1098.',
    explanationBn: 'তোমার শরীর তোমার নিজের। কেউ অনিরাপদ স্পর্শ করতে চাইলে সরাসরি না বলো এবং কোনো দ্বিধা ছাড়াই মা-বাবা বা শিক্ষককে জানাও।',
    mascotTipEn: 'Three Golden Steps: 1. Say NO! 2. Move away to safety. 3. Tell a trusted elder immediately!',
    mascotTipBn: '৩টি মূল নিয়ম: ১. না বলো! ২. নিরাপদ দূরত্বে যাও! ৩. বিশ্বস্ত কাউকে নির্ভয়ে জানাও!'
  },
  {
    id: 4,
    questionEn: 'Can children under 14 be legally employed in factories or hazardous labor in Bangladesh?',
    questionBn: 'বাংলাদেশে ১৪ বছরের কম বয়সী শিশুকে কি কারখানা বা ইটভাটার মতো ঝুঁকিপূর্ণ কাজে নিয়োগ দেওয়া বৈধ?',
    optionsEn: [
      'Yes, if parents allow it',
      'Strictly prohibited and punishable by law',
      'Only during school vacation',
      'Yes, for half wages'
    ],
    optionsBn: [
      'হ্যাঁ, মা-বাবা অনুমতি দিলে',
      'সম্পূর্ণ নিষিদ্ধ এবং আইনে কঠোর শাস্তিযোগ্য অপরাধ',
      'শুধু স্কুলের ছুটির সময়ে সম্ভব',
      'হ্যাঁ, কম বেতনে'
    ],
    correctIndex: 1,
    explanationEn: 'The Bangladesh Labour Act strictly prohibits employing children under 14 and forbids engaging anyone under 18 in hazardous labor.',
    explanationBn: 'বাংলাদেশ শ্রম আইন অনুযায়ী ১৪ বছরের নিচে যেকোনো কাজ এবং ১৮ বছরের নিচে ঝুঁকিপূর্ণ কাজ সম্পূর্ণ দণ্ডনীয় অপরাধ।',
    mascotTipEn: 'Every child deserves books, play, and schools—not factory hammers or hazardous work.',
    mascotTipBn: 'শিশুর হাতে বই ও কলম শোভা পায়, ঝুঁকিপূর্ণ কাজের হাতিয়ার নয়।'
  },
  {
    id: 5,
    questionEn: 'What should you do if an unknown person on the internet asks for your home address or private photos?',
    questionBn: 'ইন্টারনেটে কোনো অচেনা ব্যক্তি তোমার বাড়ির ঠিকানা বা ব্যক্তিগত ছবি চাইলে তোমার কী করা উচিত?',
    optionsEn: [
      'Send them if they seem friendly',
      'Never send personal information, block the person, and inform parents/teachers immediately',
      'Ask them to exchange phone numbers first',
      'Keep it a secret'
    ],
    optionsBn: [
      'বন্ধুসুলভ কথা বললে দিয়ে দেওয়া উচিত',
      'কখনো কোনো ব্যক্তিগত তথ্য না দিয়ে ব্লক করা এবং সাথে সাথে মা-বাবা বা শিক্ষককে জানানো',
      'আগে ফোন নম্বর আদান-প্রদান করা',
      'কাউকে না জানিয়ে লুকিয়ে রাখা'
    ],
    correctIndex: 1,
    explanationEn: 'National safe browsing rule: Never share real names, addresses, phone numbers, or photos online with strangers.',
    explanationBn: 'নিরাপদ ইন্টারনেট নীতি: অনলাইনে অচেনা কাউকে কখনোই নিজের নাম, স্কুলের নাম, ঠিকানা বা ছবি শেয়ার করা যাবে না।',
    mascotTipEn: 'Be a smart cyber defender! Always protect your personal identity and privacy online.',
    mascotTipBn: 'সাইবার সুরক্ষা মানো! অনলাইনে নিজের তথ্য সুরক্ষিত রাখো।'
  }
];

export const SAFE_WEB_RESOURCES: SafeWebResource[] = [
  {
    id: 's-1',
    title: 'Khan Academy Bangla',
    titleBn: 'খান একাডেমি বাংলা',
    url: 'https://bn.khanacademy.org',
    category: 'education',
    minAge: 6,
    maxAge: 18,
    safetyScore: 100,
    descriptionEn: 'Free interactive video lessons and exercises in Mathematics, Science, and Computing in Bengali.',
    descriptionBn: 'বাংলা ভাষায় সম্পূর্ণ বিনামূল্যে গণিত, বিজ্ঞান ও কম্পিউটার প্রোগ্রামিং শেখার উন্মুক্ত জাতীয় পাঠশালা।',
    isVerified: true,
    badge: 'Official Open Ed'
  },
  {
    id: 's-2',
    title: 'MuktoPaath (মুক্তপাঠ)',
    titleBn: 'মুক্তপাঠ (বাংলাদেশ সরকার)',
    url: 'https://muktopaath.gov.bd',
    category: 'education',
    minAge: 10,
    maxAge: 18,
    safetyScore: 100,
    descriptionEn: 'National e-learning platform by a2i Government of Bangladesh with safe multimedia courses for students across the country.',
    descriptionBn: 'বাংলাদেশ সরকারের এটুআই পরিচালিত জাতীয় ই-লার্নিং প্ল্যাটফর্ম, সারাদেশের শিক্ষার্থীদের নিরাপদ শিক্ষামূলক কোর্স।',
    isVerified: true,
    badge: 'Govt. Verified'
  },
  {
    id: 's-3',
    title: 'National Geographic Kids',
    titleBn: 'ন্যাশনাল জিওগ্রাফিক কিডস',
    url: 'https://kids.nationalgeographic.com',
    category: 'science',
    minAge: 6,
    maxAge: 15,
    safetyScore: 99,
    descriptionEn: 'Engaging animal science, ocean life, climate guides, and educational games for young discoverers.',
    descriptionBn: 'প্রাণীজগৎ, সমুদ্রের জীববৈচিত্র্য ও জলবায়ু বিজ্ঞান নিয়ে শিশুদের জন্য আকর্ষণীয় তথ্য ও গেমস।',
    isVerified: true,
    badge: 'Safe Science'
  },
  {
    id: 's-4',
    title: 'Scratch MIT Coding for Kids',
    titleBn: 'স্ক্র্যাচ - শিশুদের কোডিং প্ল্যাটফর্ম',
    url: 'https://scratch.mit.edu',
    category: 'art',
    minAge: 8,
    maxAge: 16,
    safetyScore: 99,
    descriptionEn: 'Create friendly interactive animations, stories, and games with block-based visual programming.',
    descriptionBn: 'শিশুদের জন্য ব্লক কোডিং এর মাধ্যমে কার্টুন অ্যানিমেশন ও নিরাপদ শিক্ষামূলক গেম তৈরির বিশ্বমানের প্ল্যাটফর্ম।',
    isVerified: true,
    badge: 'MIT Creative'
  },
  {
    id: 's-5',
    title: 'UNICEF Bangladesh Kids & Youth Portal',
    titleBn: 'ইউনিসেফ বাংলাদেশ শিশু ও যুব পোর্টাল',
    url: 'https://www.unicef.org/bangladesh',
    category: 'safety',
    minAge: 6,
    maxAge: 18,
    safetyScore: 100,
    descriptionEn: 'Illustrated stories on child rights, water hygiene, education for all, and Meena cartoon animations.',
    descriptionBn: 'মীনা কার্টুন, শিশু অধিকার, দুর্যোগ প্রস্তুতি ও স্বাস্থ্যবিধি সংক্রান্ত রঙিন সচিত্র জাতীয় পোর্টাল।',
    isVerified: true,
    badge: 'UNICEF Safe'
  },
  {
    id: 's-6',
    title: 'Bangladesh Shishu Academy',
    titleBn: 'বাংলাদেশ শিশু একাডেমি সাহিত্য ও সংস্কৃতি',
    url: 'https://shishuacademy.gov.bd',
    category: 'bangla_books',
    minAge: 6,
    maxAge: 16,
    safetyScore: 100,
    descriptionEn: 'Curated national children literature, folk tales, rhymes, and historical books by Bangladesh Shishu Academy.',
    descriptionBn: 'বাংলাদেশ শিশু একাডেমি ও বাংলা একাডেমি কর্তৃক অনুমোদিত শিশু সাহিত্য, লোককাহিনী, ছড়া ও দেশের ইতিহাস।',
    isVerified: true,
    badge: 'National Heritage'
  }
];

export const COMIC_STORY: ComicStory = {
  id: 'story-bangladesh-children',
  titleEn: 'Children of Bangladesh: The Journey of Knowledge & Safety',
  titleBn: 'বাংলাদেশের সন্তান: জ্ঞান ও সুরক্ষার অভিযাত্রা',
  themeEn: 'Nationwide Child Rights, Schooling & Community Safety',
  themeBn: 'দেশব্যাপী শিশু অধিকার, বিদ্যালয়ে যাওয়ার স্বপ্ন ও নিরাপত্তা',
  pages: [
    {
      pageNumber: 1,
      titleEn: 'Chapter 1: The School Bell Rings Across the Nation',
      titleBn: 'প্রথম অধ্যায়: সারাদেশে স্কুলের ঘণ্টার ধ্বনি',
      narrationEn: 'From Dhaka to rural village unions, every morning children pack their schoolbags, excited to learn and grow in safe classrooms.',
      narrationBn: 'ঢাকার সকাল থেকে দেশের যেকোনো শান্ত গ্রামের মেঠোপথ—প্রতিদিন সকালে বইয়ের ব্যাগ কাঁধে তুলে নিয়ে শিক্ষার্থীরা হাসিমুখে স্কুলে যায়।',
      dialogueEn: [
        'Maya: "Hurry Rony! Today our teacher is explaining the Child Rights map of Bangladesh!"',
        'Rony: "I have my drawing crayons and notebook ready in my bag!"'
      ],
      dialogueBn: [
        'মায়া: "তাড়াতাড়ি চলো রনি! আজ ক্লাসে আপা আমাদের বাংলাদেশের শিশু অধিকারের রঙিন মানচিত্র দেখাবেন!"',
        'রনি: "আমার ব্যাগে ছবি আঁকার রংপেন্সিল প্রস্তুত আছে!"'
      ],
      safetyLessonEn: 'Every child across all 64 districts has the equal right to attend school safely.',
      safetyLessonBn: 'বাংলাদেশের প্রতিটি প্রান্তের প্রতিটি শিশুর নিরাপদে স্কুলে যাওয়ার মৌলিক অধিকার রয়েছে।',
      imageUrl: ASSET_IMAGES.storybookCover
    },
    {
      pageNumber: 2,
      titleEn: 'Chapter 2: Speaking Up Against Unsafe Situations',
      titleBn: 'দ্বিতীয় অধ্যায়: অস্বস্তিকর পরিস্থিতিতে নির্ভয়ে কথা বলা',
      narrationEn: 'Near a crowded bus terminal, a stranger tried to offer unknown candies to Rony and whispered to leave with him without telling anyone.',
      narrationBn: 'বাস টার্মিনালের কাছে এক অচেনা ব্যক্তি রনিকে অচেনা মিষ্টি দেখিয়ে ফিসফিস করে বলল, "কাউকে বলবে না, আমার সাথে এসো।"',
      dialogueEn: [
        'Stranger: "Come with me quietly, little boy! Do not tell your elders."',
        'Rony (stepping back immediately): "NO! My body and safety are mine! Maya, look!"'
      ],
      dialogueBn: [
        'অচেনা ব্যক্তি: "চুপচাপ এসো খোকা! কাউকে কিছু বলার দরকার নেই।"',
        'রনি (এক পা পিছিয়ে): "না! আমি অচেনা কারো সাথে কোথাও যাবো না! আপু, দেখো!"'
      ],
      safetyLessonEn: 'Golden Rule: Never accept rides or gifts from strangers. Say NO loudly and move to a crowd.',
      safetyLessonBn: 'সোনালী নিয়ম: অচেনা কারো মিষ্টি বা উপহার গ্রহণ করবে না। জোরে "না" বলে নিরাপদ স্থানে যাও।',
      imageUrl: ASSET_IMAGES.heroChildren
    },
    {
      pageNumber: 3,
      titleEn: 'Chapter 3: The Power of 1098 & Nationwide Community Defense',
      titleBn: 'তৃতীয় অধ্যায়: ১০৯৮ ও জাতীয় হেল্পলাইনের শক্তি',
      narrationEn: 'Maya immediately alerted their teacher and called 1098. The social welfare officers and local community arrived quickly to ensure all children were safe.',
      narrationBn: 'মায়া কোনো দেরি না করে তাদের স্কুল শিক্ষক এবং জাতীয় চাইল্ড হেল্পলাইন ১০৯৮ এ ফোন করে। সমাজসেবা কর্মকর্তারা দ্রুত উপস্থিত হয়ে নিরাপত্তা নিশ্চিত করেন।',
      dialogueEn: [
        'Teacher: "You did exactly the right thing by speaking up without fear!"',
        '1098 Officer: "1098 is available 24/7 across all of Bangladesh to shield every child."'
      ],
      dialogueBn: [
        'শিক্ষক: "ভয় না পেয়ে সাথে সাথে কথা বলে তোমরা অসাধারণ সাহসিকতা দেখিয়েছ!"',
        '১০৯৮ কর্মকর্তা: "১০৯৮ সার্বক্ষণিক সারাদেশের প্রতিটি শিশুর পাশে অতন্দ্র প্রহরীর মতো থাকবে।"'
      ],
      safetyLessonEn: 'Speaking up immediately protects not just you, but children throughout Bangladesh.',
      safetyLessonBn: 'তাৎক্ষণিক কথা বললে কেবল নিজের নয়, বরং অন্যান্য শিশুদেরও বড় বিপদ থেকে রক্ষা করা যায়।',
      imageUrl: ASSET_IMAGES.volunteerWorker
    }
  ]
};

export const OPERATIONAL_DISTRICTS: OperationalDistrict[] = [
  {
    id: 'd-dhaka',
    nameEn: 'Dhaka Central Hub',
    nameBn: 'ঢাকা কেন্দ্রীয় বিভাগ',
    zoneEn: 'Capital Urban & Industrial Belt',
    zoneBn: 'রাজধানী, শিল্প ও নগর অঞ্চল',
    schools: 540,
    volunteers: 1250,
    childrenReached: 88400,
    vulnerabilityFactorEn: 'Urban informal settlement dropouts, hazardous automobile garage labor, digital safety risks.',
    vulnerabilityFactorBn: 'বস্তি এলাকার স্কুল ড্রপআউট, গাড়ির গ্যারেজে বিপজ্জনক শিশুশ্রম ও সাইবার ঝুঁকি।',
    localHubLead: 'Tanvir Ahmed (National Coordinator)',
    leadPhone: '+880 1711-109801'
  },
  {
    id: 'd-chattogram',
    nameEn: 'Chattogram & CHT',
    nameBn: 'চট্টগ্রাম ও পার্বত্য অঞ্চল',
    zoneEn: 'Hill Tracts, Port & Industrial Belt',
    zoneBn: 'পার্বত্য জেলাসমূহ ও সমুদ্র বন্দর অঞ্চল',
    schools: 420,
    volunteers: 890,
    childrenReached: 64200,
    vulnerabilityFactorEn: 'Remote hilly terrain school access, ship breaking child labor risks, seasonal landslides.',
    vulnerabilityFactorBn: 'পাহাড়ি দুর্গম এলাকায় স্কুলের দূরত্ব, শিপ ব্রেকিং কারখানার ঝুঁকি ও বর্ষায় পাহাড়ি ঢল।',
    localHubLead: 'Ayesha Marma (Regional Lead)',
    leadPhone: '+880 1819-109802'
  },
  {
    id: 'd-sylhet',
    nameEn: 'Sylhet Haor Belt',
    nameBn: 'সিলেট হাওর অঞ্চল',
    zoneEn: 'Haor Wetlands & Tea Estates',
    zoneBn: 'হাওর নিম্নাঞ্চল ও চা বাগান জনপদ',
    schools: 310,
    volunteers: 640,
    childrenReached: 46800,
    vulnerabilityFactorEn: 'Monsoon flash floods disrupting schools, tea garden child labor, seasonal boat commute drops.',
    vulnerabilityFactorBn: 'আকস্মিক বন্যা, চা বাগানে শিশুশ্রমের ঝুঁকি ও বর্ষায় যাতায়াত সমস্যার কারণে স্কুল ড্রপআউট।',
    localHubLead: 'Mahbubur Rahman (Haor Specialist)',
    leadPhone: '+880 1723-109803'
  },
  {
    id: 'd-rajshahi',
    nameEn: 'Rajshahi & Rangpur',
    nameBn: 'রাজশাহী ও রংপুর বিভাগ',
    zoneEn: 'Northern Plains & Char Islands',
    zoneBn: 'উত্তরাঞ্চলের সমতল ও তিস্তা চর জনপদ',
    schools: 480,
    volunteers: 960,
    childrenReached: 71500,
    vulnerabilityFactorEn: 'Early child marriage social pressure in rural chars, seasonal agriculture child labor.',
    vulnerabilityFactorBn: 'চর এলাকায় বাল্যবিয়ের সামাজিক চাপ এবং কৃষি মৌসুমে শিশুদের মাঠে কাজের ঝুঁকি।',
    localHubLead: 'Nusrat Jahan (Northern Field Lead)',
    leadPhone: '+880 1914-109804'
  },
  {
    id: 'd-khulna-barishal',
    nameEn: 'Khulna & Barishal Delta',
    nameBn: 'খুলনা ও বরিশাল দক্ষিণাঞ্চল',
    zoneEn: 'Coastal Delta & Mangrove Belt',
    zoneBn: 'দক্ষিণ উপকূলীয় সুন্দরবন ও নদী মোহনা',
    schools: 460,
    volunteers: 920,
    childrenReached: 69800,
    vulnerabilityFactorEn: 'Salinity and cyclone surges affecting schools, dry fish and shrimp processing child work.',
    vulnerabilityFactorBn: 'ঘূর্ণিঝড় জলোচ্ছ্বাস, বাঁধভাঙন এবং শুঁটকি ও চিংড়ি শিল্পে শিশুশ্রমের ঝুঁকি।',
    localHubLead: 'Kazi Farhan (Delta Director)',
    leadPhone: '+880 1744-109805'
  },
  {
    id: 'd-mymensingh',
    nameEn: 'Mymensingh Division',
    nameBn: 'ময়মনসিংহ বিভাগ',
    zoneEn: 'Garo Foothills & River Basin',
    zoneBn: 'গারো পাহাড়ের পাদদেশ ও ব্রহ্মপুত্র অববাহিকা',
    schools: 280,
    volunteers: 540,
    childrenReached: 39300,
    vulnerabilityFactorEn: 'Border hilly area dropout rates, brickfield seasonal migration affecting children.',
    vulnerabilityFactorBn: 'সীমান্তবর্তী এলাকার স্কুল ড্রপআউট ও ইটভাটায় পরিবারের সাথে শিশুদের অভিবাসন।',
    localHubLead: 'Shamim Reza (Division Coordinator)',
    leadPhone: '+880 1611-109806'
  }
];

export const BLOCKED_KEYWORDS: string[] = [
  'adult', 'porn', 'xxx', 'gambling', 'casino', 'betting', 'violence', 'drugs',
  'weapon', 'suicide', 'dating', 'terror', 'bomb', 'alcohol', 'vape'
];
