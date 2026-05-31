export const services = [
  {
    id: 'discovery-call',
    group: 'discovery' as const,
    groupLabel: 'Free Discovery Call',
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
    id: 'general-initial',
    group: 'general' as const,
    groupLabel: 'Personalised Nutrition & Lifestyle Support',
    name: 'Initial Consultation',
    duration: '60 minutes',
    price: 135,
    currency: 'GBP',
    description:
      'A comprehensive assessment of your medical history, diet, and lifestyle, resulting in a fully personalised nutrition and lifestyle plan.',
    features: [
      'Full medical and dietary history',
      'Assessment of symptoms and lifestyle factors',
      'Identification of key nutritional priorities and contributing factors',
      'Personalised nutrition and lifestyle plan',
      'Plan review call (10–15 minutes)',
      'One email check-in within one week',
    ],
    conditions: [
      'Type 2 diabetes & insulin resistance (metabolic health)',
      'Cardiovascular health & high blood pressure',
      'Gut health concerns (IBS, GERD, other digestive symptoms)',
      'PCOS, thyroid dysfunction, perimenopause & menopause',
      'Weight management and related metabolic health concerns',
      'Autoimmune conditions',
    ],
  },
  {
    id: 'general-followup',
    group: 'general' as const,
    groupLabel: 'Personalised Nutrition & Lifestyle Support',
    name: 'Follow-Up Consultation',
    duration: '30 minutes',
    price: 50,
    currency: 'GBP',
    description:
      'A structured review to assess progress, refine your plan, and provide ongoing support for long-term results.',
    features: [
      'Review progress and symptoms',
      'Adjust nutrition and lifestyle plan based on outcomes',
      'Provide ongoing education and support',
      'Support behaviour change and long-term results',
    ],
  },
  {
    id: 'oncology-initial',
    group: 'oncology' as const,
    groupLabel: 'Specialist Cancer (Oncology) Nutrition & Lifestyle Support',
    name: 'Initial Consultation',
    duration: '60 minutes',
    price: 150,
    currency: 'GBP',
    description:
      'A specialist assessment providing evidence-based nutritional and lifestyle care for individuals undergoing cancer treatment, recovery, or survivorship.',
    features: [
      'Full clinical and treatment history review',
      'Symptom and nutritional risk assessment',
      'Personalised cancer nutrition and lifestyle plan',
      'Strategies for managing treatment side effects',
      'Follow-up review call (10–15 minutes)',
      'One email check-in within one week',
    ],
  },
  {
    id: 'oncology-followup',
    group: 'oncology' as const,
    groupLabel: 'Specialist Cancer (Oncology) Nutrition & Lifestyle Support',
    name: 'Follow-Up Consultation',
    duration: '45 minutes',
    price: 70,
    currency: 'GBP',
    description:
      'Ongoing specialist support to monitor nutrition status, manage symptoms, and adjust your plan throughout treatment and recovery.',
    features: [
      'Monitor nutrition status during treatment or recovery',
      'Manage ongoing symptoms and side effects',
      'Adjust nutrition and lifestyle strategies as needed',
      'Provide ongoing reassurance and clinical guidance',
      'Support quality of life and wellbeing',
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
    slug: 'four-pillars-of-health',
    title: 'The 4 Pillars of Health: Why Nutrition Alone Is Not Enough',
    date: '15 May 2025',
    readTime: '5 min read',
    excerpt:
      'While food plays a vital role in wellbeing, health is rarely shaped by nutrition alone. Sleep, movement, stress, and emotional wellbeing all interact to influence energy, hormones, immunity, and long-term disease risk.',
    content: `
<p>When people think about improving their health, nutrition is often the first focus. While food plays a vital role in wellbeing, health is rarely shaped by nutrition alone. Sleep, movement, stress, emotional wellbeing, and daily lifestyle habits all interact to influence energy levels, hormonal balance, metabolic health, immunity, and long-term disease risk.</p>

<p>Your lifestyle is the blueprint of your health. Sustainable wellbeing is built through the consistent interaction of several key lifestyle factors that support both physical and emotional health over time.</p>

<p>As a dietitian working across metabolic health, gut health, women's health, oncology support, and chronic disease management, I often see how addressing lifestyle as a whole creates more meaningful and lasting improvements than focusing on food in isolation. These are what I consider the four foundational pillars of health.</p>

<h2>1. Nutrition: Supporting Health Beyond Calories</h2>
<p>Nutrition is not simply about restriction, calorie counting, or following trends. Food provides the body with the nutrients required to support healthy cellular function, energy production, hormone regulation, gut health, immune function, metabolic balance, and recovery.</p>
<p>In many ways, food acts as information for our cells. Nourishing, balanced food supports healthy cellular function, while a poor-quality diet can negatively influence how the body functions over time.</p>
<p>A personalised approach to nutrition is essential because no single diet works for everyone. Medical history, lifestyle, stress levels, sleep, movement, cultural food preferences, and individual health conditions all influence nutritional needs. Rather than striving for perfection, sustainable nutrition is about building realistic habits that support long-term health and fit into everyday life.</p>

<h2>2. Movement &amp; Exercise: Supporting Physical and Metabolic Health</h2>
<p>Movement plays a vital role in both physical and mental wellbeing. Regular activity supports cardiovascular health, insulin sensitivity, muscle strength, digestion, mobility, stress regulation, energy levels, and healthy circulation, all of which contribute to overall health and wellbeing.</p>
<p>Importantly, movement does not always need to mean intense exercise. Walking, resistance training, stretching, mobility work, and consistent daily activity can all positively influence health outcomes. The goal is not punishment or simply "burning calories," but creating a sustainable relationship with movement that supports long-term wellbeing.</p>

<h2>3. Sleep: The Often Overlooked Pillar of Health</h2>
<p>Sleep is one of the most underestimated factors influencing health. Poor sleep can negatively affect appetite regulation, blood sugar balance, energy levels, mood, recovery, hormonal health, immunity, and stress resilience.</p>
<p>During sleep, the body carries out essential repair and restoration processes that support both physical and mental wellbeing. In clinical practice, I often see how disrupted sleep patterns contribute to cravings, emotional eating, fatigue, and metabolic health challenges. Improving sleep quality and establishing healthier routines can have a significant impact on overall wellbeing and daily functioning.</p>

<h2>4. Stress &amp; Emotional Wellbeing: Understanding the Mind-Body Connection</h2>
<p>Chronic stress affects far more than mental health alone. When the body remains in a prolonged fight-or-flight state, it prioritises short-term survival over long-term restoration and recovery. Over time, this can influence digestion, hormonal balance, inflammation, immunity, appetite, sleep, blood sugar regulation, and overall quality of life.</p>
<p>Many lifestyle habits are closely linked to emotional wellbeing, stress patterns, routines, and coping mechanisms. This is why sustainable health changes often require more than meal plans alone. Creating awareness around stress management, emotional health, boundaries, recovery, relaxation, and self-care can play an important role in supporting long-term lifestyle change.</p>

<h2>Health Is Built Through Consistency, Not Perfection</h2>
<p>There is no "perfect" lifestyle. Sustainable health is built through small, realistic, and consistent habits over time. Nutrition matters deeply, but food does not work in isolation. Movement, sleep, stress management, emotional wellbeing, and daily routines all interact together to influence health outcomes.</p>
<p>A personalised and holistic approach allows individuals to better understand the underlying factors contributing to their health, rather than simply managing symptoms alone. Because ultimately, your lifestyle is the blueprint of your health.</p>
    `.trim(),
  },
];

export const testimonials = [
  {
    quote:
      "Prachi's approach was supportive, knowledgeable, and highly personalised. She took the time to listen carefully and provided practical, realistic strategies tailored to our needs. Her guidance around nutrition, lifestyle, and long-term health felt both evidence-based and holistic. Since working with her, we have seen significant improvements in our health, including improvements in blood sugar levels, blood pressure and overall wellbeing.",
    client: 'Metabolic health client',
  },
  {
    quote:
      "After many years of struggling with painful menstrual symptoms, I felt genuinely supported through Prachi's personalised and holistic approach. Her guidance around nutrition, lifestyle, and wellbeing helped me feel more in control of my health and significantly improved my quality of life.",
    client: 'Hormonal health client',
  },
  {
    quote:
      "Prachi's guidance helped me make sustainable lifestyle and nutrition changes that significantly improved my overall health and wellbeing. Following years of struggling with multiple health concerns, including acid reflux, migraines, joint pain, poor sleep, and weight gain, I began to feel more energetic, healthier, and more confident in managing my health naturally. Her supportive and personalised approach helped me better understand my body and build long-term habits that felt realistic and achievable.",
    client: 'Gut & overall health client',
  },
  {
    quote:
      'Following a cancer diagnosis, I was looking for guidance and support to help me navigate treatment and recovery. Prachi provided compassionate, personalised nutrition and lifestyle support throughout my chemotherapy and radiotherapy journey. Her practical guidance helped me feel more supported, confident, and better able to manage my wellbeing during a very challenging time.',
    client: 'Oncology client',
  },
];
