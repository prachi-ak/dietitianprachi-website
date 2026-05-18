export const services = [
  {
    id: 'discovery-call',
    name: 'Free Discovery Call',
    duration: '15 minutes',
    price: 0,
    currency: 'GBP',
    description:
      'A complimentary introductory call to understand your health goals and explore how we might work together. There is no commitment required.',
    features: [
      'Introduction to the Dietitian Prachi approach',
      'Discussion of your health goals',
      'Overview of available programmes',
      'Any questions answered',
    ],
  },
  {
    id: 'initial-assessment',
    name: 'Initial Assessment and Lifestyle Plan',
    duration: '60 minutes',
    price: 150,
    currency: 'GBP',
    description:
      'A thorough review of your dietary habits, health history, and lifestyle, culminating in a fully personalised nutrition and wellness plan built around you.',
    features: [
      'In-depth dietary and lifestyle assessment',
      'Review of medical history and health goals',
      'Personalised nutrition plan',
      'Sleep and exercise recommendations',
      'Written summary and resources',
    ],
  },
  {
    id: 'follow-up',
    name: 'Follow-Up Consultation',
    duration: '60 minutes',
    price: 60,
    currency: 'GBP',
    description:
      'A progress review to see how your plan is working, address any challenges, and refine your recommendations as your needs evolve.',
    features: [
      'Progress and outcome review',
      'Plan adjustments',
      'Addressing barriers and questions',
      'Updated recommendations',
    ],
  },
];

export const faqs = [
  {
    question: 'What is the difference between a dietitian and a nutritionist?',
    answer:
      'A dietitian is a protected legal title in the United Kingdom. Only individuals registered with the Health and Care Professions Council (HCPC) may use it. This means a dietitian has completed an accredited degree programme, met strict clinical competency standards, and is bound by a professional code of conduct. Nutritionist is an unprotected title and does not carry the same regulatory requirements.',
  },
  {
    question: 'Do you offer online consultations?',
    answer:
      'Yes. All consultations are available online via video call, making it possible to work with clients worldwide. In-person consultations are also available for those based in the United Kingdom.',
  },
  {
    question: 'How do I know which service is right for me?',
    answer:
      'If you are new to working with a dietitian or are unsure where to begin, the Free Discovery Call is the ideal starting point. It costs nothing and gives you the opportunity to ask questions before committing. If you are ready to begin, the Initial Assessment is the natural first step. Follow-Up sessions are for existing clients continuing their programme.',
  },
  {
    question: 'What happens after I book my appointment?',
    answer:
      'Once your booking is received, Prachi will review it and send you a confirmation by email. For paid appointments, payment is collected at the time of booking. You will receive a calendar invitation with a video call link once confirmed.',
  },
  {
    question: 'Do you work with specific medical conditions?',
    answer:
      'Yes. With a background in clinical dietetics, including paediatric oncology at Tata Memorial Hospital, Prachi has experience across a wide range of conditions. Common areas include digestive health, weight management, hormonal health, diabetes, and general wellbeing. Please use the Discovery Call to discuss your specific situation.',
  },
  {
    question: 'How should I prepare for my first appointment?',
    answer:
      'It helps to keep a rough record of what you eat and drink in the two to three days before your consultation. If you have any recent blood test results or a summary from your GP, those can also be useful to share. Most importantly, come with an open mind and your questions.',
  },
  {
    question: 'What is the cancellation policy?',
    answer:
      'Cancellations made more than 48 hours before the appointment will receive a full refund. Cancellations within 48 hours are non-refundable, though you are welcome to reschedule with advance notice. Please contact Prachi directly to arrange any changes.',
  },
  {
    question: 'Are your services covered by health insurance?',
    answer:
      'Some private health insurance providers in the UK do cover dietitian consultations. It is best to check directly with your insurer before booking. Prachi is an HCPC Registered Dietitian, which is typically the requirement insurers specify.',
  },
];

export const blogs = [
  {
    slug: 'four-pillars-of-optimal-health',
    title: 'The Four Pillars of Optimal Health',
    date: '12 April 2025',
    readTime: '5 min read',
    excerpt:
      'Good health is not a single variable. It is the sum of four interconnected pillars, and neglecting any one of them limits the potential of the others.',
    content: `
<p>Good health is rarely the product of one single change. You can follow the most carefully constructed nutrition plan in the world, but if you are sleeping four hours a night, your body's ability to regulate hunger hormones, recover from exercise, and manage inflammation is significantly compromised. Health is not a single variable. It is the sum of four interconnected pillars, and neglecting any one of them limits the potential of the others.</p>

<p>Those four pillars are Balanced Nutrition, Quality Sleep, Adequate Exercise, and Emotional Well-being. They form the foundation of my practice at Dietitian Prachi, and understanding why each one matters is the first step towards building a life where you feel genuinely well.</p>

<h2>Balanced Nutrition</h2>
<p>Nutrition is the most visible pillar, and the one most people focus on first. But balanced nutrition is not about restriction or perfection. It is about giving the body a consistent supply of the macro and micronutrients it needs to function well, while building a relationship with food that is sustainable over the long term. Protein for tissue repair and satiety, complex carbohydrates for steady energy, healthy fats for hormone production and brain function, and an abundance of plants for fibre, phytonutrients, and gut diversity. There is no single diet that works for everyone, which is precisely why individualised assessment matters.</p>

<h2>Quality Sleep</h2>
<p>Sleep is when the body does most of its repair work. During deep sleep, growth hormone is released, memories are consolidated, and the immune system carries out much of its housekeeping. Chronic poor sleep is associated with increased levels of the hunger hormone ghrelin and reduced leptin, the satiety hormone, which creates a physiological pull towards overeating. It is also linked to insulin resistance, elevated cortisol, and impaired cognitive function. If sleep is consistently disrupted, addressing it is not optional. It is foundational.</p>

<h2>Adequate Exercise</h2>
<p>Exercise does not need to be extreme to be effective. What the evidence consistently supports is regular movement that raises the heart rate, builds or maintains muscle mass, and fits into a lifestyle that makes it sustainable. Walking, swimming, resistance training, cycling, yoga: the form matters less than the consistency. Movement improves insulin sensitivity, supports bone density, reduces anxiety, and contributes directly to better sleep. It is also one of the most powerful tools for long-term metabolic health.</p>

<h2>Emotional Well-being</h2>
<p>The link between psychological state and physical health is well established. Chronic stress elevates cortisol, which promotes fat storage around the abdomen, disrupts sleep, and suppresses immune function. Emotional eating, food restriction cycles, and disordered patterns around eating are rarely purely about food. They are often rooted in emotional experience. Addressing well-being, stress, and mindset is not a supplement to nutrition work. In many cases, it is the work.</p>

<p>Understanding how these four pillars interact in your own life is the beginning of a genuinely personalised approach to health. That is the lens through which I work with every client.</p>
    `.trim(),
  },
  {
    slug: 'nutrition-myths-what-science-says',
    title: 'Common Nutrition Myths: What the Evidence Actually Shows',
    date: '28 March 2025',
    readTime: '6 min read',
    excerpt:
      'From cutting out carbohydrates to the idea that detox diets cleanse the body, nutrition is one of the most myth-laden fields in health. Here is what the evidence actually says.',
    content: `
<p>Few areas of health communication are as riddled with misinformation as nutrition. Social media, wellness culture, and a constant cycle of headline-grabbing studies have produced a landscape where genuinely harmful advice sits alongside genuinely useful guidance, and most people struggle to tell them apart. Here are some of the most persistent myths, and what the evidence actually shows.</p>

<h2>Myth: Carbohydrates Make You Gain Weight</h2>
<p>Weight gain is driven by a sustained caloric surplus over time, not by any single macronutrient. Carbohydrates are the body's primary and preferred energy source, particularly for brain function and high-intensity exercise. The quality and quantity of carbohydrates matters enormously: refined sugars and highly processed foods behave very differently in the body compared to legumes, wholegrains, and vegetables. Eliminating carbohydrates entirely is neither necessary nor, for most people, sustainable over the long term.</p>

<h2>Myth: Detox Diets Cleanse the Body</h2>
<p>The liver, kidneys, lungs, and skin perform continuous, highly sophisticated detoxification as part of their normal function. There is no clinical evidence that any commercially available detox product or juice cleanse enhances this process. What these products often do is create a significant caloric deficit for a short period, which may produce rapid initial weight loss that is primarily water and glycogen, not fat. The weight typically returns as soon as normal eating resumes. Supporting the body's natural detoxification systems involves adequate hydration, sufficient fibre, minimising alcohol, and eating a varied whole-food diet.

<h2>Myth: Eating Fat Makes You Fat</h2>
<p>This myth has its roots in the low-fat dietary guidance that dominated the 1980s and 1990s, which was not well supported by the evidence and contributed to a surge in consumption of low-fat processed foods high in refined sugar. Dietary fat is essential: it supports hormone production, fat-soluble vitamin absorption, cell membrane integrity, and satiety. The type of fat matters more than the quantity. Unsaturated fats from olive oil, avocados, nuts, and oily fish are associated with positive cardiovascular outcomes. Trans fats and excessive saturated fats from highly processed sources are the ones worth limiting.</p>

<h2>Myth: You Must Eat Six Small Meals a Day to Keep Your Metabolism Running</h2>
<p>The idea that eating frequency significantly affects metabolic rate is not well supported by the evidence. Total caloric intake and food quality over the course of a day are far more important than how frequently that intake is distributed. What does matter is finding an eating pattern that works for your lifestyle, supports stable energy levels, and makes it easier to eat nutritious food consistently. For some people, that is three meals. For others, it is two. Neither is inherently superior.</p>

<h2>Myth: Supplements Can Replace a Poor Diet</h2>
<p>Isolated nutrients rarely behave in the body the same way that nutrients in whole food do. Nutrients in food exist within a complex matrix of fibre, phytonutrients, and cofactors that affect how they are absorbed and utilised. Some supplementation has genuine clinical applications, particularly in cases of deficiency or specific health conditions, and certain groups have increased needs. But a multivitamin is not a shortcut past a diet that is consistently lacking in vegetables, variety, and minimally processed food.</p>

<p>Navigating nutrition well requires sorting signal from noise. If you are unsure which advice applies to your situation, a consultation with a registered dietitian is the most reliable way to get evidence-based guidance tailored to your individual health picture.</p>
    `.trim(),
  },
];
