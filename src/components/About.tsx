import Image from 'next/image';

const blueprintPillars = [
  {
    icon:  '/icons/nutrition.png',
    title: 'Balanced Nutrition',
    desc:  'Nourishing your body with evidence-based nutrition tailored to your health needs, lifestyle and goals.',
  },
  {
    icon:  '/icons/exercise.png',
    title: 'Exercise & Movement',
    desc:  'Building realistic and enjoyable movement habits that support strength, mobility, metabolic health and long-term vitality.',
  },
  {
    icon:  '/icons/sleep.png',
    title: 'Restorative Sleep',
    desc:  'Supporting quality sleep to improve energy, recovery, hormone balance and overall wellbeing.',
  },
  {
    icon:  '/icons/wellbeing.png',
    title: 'Stress & Emotional Wellbeing',
    desc:  'Understanding how stress, emotions and daily pressures affect your health, and developing strategies to support resilience and balance.',
  },
  {
    icon:  '/icons/behaviour-change.png',
    title: 'Sustainable Behaviour Change',
    desc:  'Creating practical habits, building consistency and making meaningful lifestyle changes that support long-term success.',
  },
];

const conditions = [
  {
    category: 'Metabolic Health',
    items: ['Diabetes & Prediabetes', 'Insulin Resistance', 'Cardiovascular Health', 'High Blood Pressure', 'Thyroid Dysfunction'],
  },
  {
    category: 'Digestive Health',
    items: ['IBS', 'Reflux (GERD)', 'Bloating', 'Constipation', 'Diarrhoea'],
  },
  {
    category: "Women's Health",
    items: ['PCOS', 'Perimenopause', 'Menopause', 'Hormonal Health'],
  },
  { category: 'Weight Management',                      items: [] },
  { category: 'Cancer Nutrition & Lifestyle Support',   items: [] },
  { category: 'Autoimmune & Inflammatory Conditions',   items: [] },
  { category: 'Chronic Disease Management',             items: [] },
];

const whyChoose = [
  'HCPC Registered Dietitian',
  '12+ Years Clinical Experience',
  'Evidence-Based Nutrition Advice',
  'Integrative Lifestyle Approach',
  'Specialist Oncology Experience',
  'Personalised One-to-One Care',
  'South Asian Nutrition & Lifestyle Expertise',
  'Experience Supporting Clients Across the UK & Internationally',
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top grid: Meet Prachi | Approach + Blueprint */}
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* ── Left: Meet Prachi ── */}
          <div>
            <p className="section-label">About</p>
            <h2 className="section-heading text-4xl mb-1">Prachi Acharekar</h2>
            <p className="font-sans text-sage-600 text-base mb-1">HCPC Registered Dietitian</p>
            <p className="font-sans text-sage-500 text-sm mb-8">
              12+ Years Clinical Experience&nbsp;&nbsp;|&nbsp;&nbsp;Founder, The Integrative Dietitian
            </p>

            <div className="mb-8 rounded-2xl overflow-hidden border border-sage-100 shadow-sm">
              <Image
                src="/website-pic1.jpg"
                alt="Prachi Acharekar"
                width={600}
                height={800}
                className="w-full h-auto object-cover object-top"
              />
            </div>

            <p className="font-sans text-sage-700 text-base leading-relaxed mb-5">
              I am an HCPC Registered Dietitian with over 12 years of experience in clinical
              nutrition and integrative lifestyle medicine approaches, supporting individuals across
              a wide range of health conditions including metabolic health, gut health concerns,
              women's health, weight management, oncology (cancer) and chronic health conditions.
            </p>
            <p className="font-sans text-sage-700 text-base leading-relaxed mb-5">
              My approach combines evidence-based nutrition with practical lifestyle strategies,
              recognising that health is influenced by much more than food alone. Sleep, movement,
              stress, emotional wellbeing and daily habits all play an important role in achieving
              lasting health outcomes.
            </p>
            <p className="font-sans text-sage-700 text-base leading-relaxed mb-10">
              Through The Integrative Dietitian, my goal is to help individuals make sustainable
              changes that fit their lifestyle and support long-term wellbeing.
            </p>

            <h3 className="font-serif text-xl text-sage-800 mb-4">
              Clinical Experience &amp; Global Reach
            </h3>
            <p className="font-sans text-sage-700 text-base leading-relaxed mb-5">
              Throughout my career, I have worked across clinical nutrition, oncology care,
              metabolic health and integrative healthcare settings.
            </p>
            <p className="font-sans text-sage-700 text-base leading-relaxed mb-5">
              In a previous senior clinical role, I managed a global caseload through remote
              consultations and lifestyle coaching, supporting individuals across the UK, US, Canada,
              Europe, UAE, Singapore and India.
            </p>
            <p className="font-sans text-sage-700 text-base leading-relaxed mb-5">
              I also led the oncology nutrition and lifestyle service, supporting individuals through
              cancer treatment, recovery and long-term wellbeing as part of a multidisciplinary
              approach.
            </p>
            <p className="font-sans text-sage-700 text-base leading-relaxed">
              Working with clients from diverse cultural backgrounds has strengthened my ability to
              provide personalised, practical and culturally relevant nutrition support that fits
              real life, rather than restrictive diets or one-size-fits-all plans.
            </p>

            <div className="mt-10 pt-6 border-t border-sage-100">
              <p className="font-sans text-xs uppercase tracking-widest text-sage-400 mb-4">
                Registered &amp; Accredited With
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <Image src="/hcpc-logo.png"            alt="HCPC Health and Care Professions Council" width={100} height={40} className="h-9 w-auto object-contain" />
                <Image src="/bda-logo.png"             alt="BDA The Association of UK Dietitians"     width={100} height={40} className="h-9 w-auto object-contain" />
                <Image src="/trust-dietitian-logo.jpg" alt="Trust a Dietitian"                        width={60}  height={60} className="h-10 w-auto object-contain" />
              </div>
            </div>
          </div>

          {/* ── Right: Approach + Blueprint ── */}
          <div>
            <p className="section-label">My Approach</p>
            <h3 className="font-serif text-3xl text-sage-800 leading-snug mb-5">
              Your Lifestyle Is the Blueprint of Your Health
            </h3>
            <p className="font-sans text-sage-700 text-base leading-relaxed mb-8">
              Many health concerns are influenced by more than nutrition alone. Sleep quality,
              exercise and movement, stress levels, emotional wellbeing and daily habits all play
              a significant role in how we feel and function. As The Integrative Dietitian, I take
              a whole-person approach, exploring how these factors interact to influence your health
              and wellbeing. Together, we identify the key drivers affecting your symptoms and
              develop personalised, sustainable strategies that support lasting change. Because
              lasting health is not built on food alone, but shaped by the way we live every day.
            </p>

            {/* Blueprint image — between approach paragraph and blueprint heading */}
            <div className="rounded-xl overflow-hidden border border-sage-100 mb-10">
              <Image
                src="/health-blueprint.png"
                alt="The Integrative Health Blueprint"
                width={600}
                height={600}
                className="w-full h-auto object-contain"
              />
            </div>

            <h3 className="font-serif text-2xl text-sage-800 mb-4">
              The Integrative Health Blueprint
            </h3>
            <p className="font-sans text-sage-700 text-base leading-relaxed mb-8">
              The Integrative Health Blueprint is the framework that guides the way I work with
              clients. It recognises that lasting health is influenced by multiple interconnected
              factors and not nutrition alone. By addressing these key areas together, we can create
              a personalised and sustainable approach that supports long-term wellbeing.
            </p>

            {/* Blueprint pillars with icons */}
            <div className="grid grid-cols-2 gap-5 mb-8">
              {blueprintPillars.map((p) => (
                <div key={p.title} className="flex gap-3 items-start">
                  <Image src={p.icon} alt={p.title} width={40} height={40} className="w-10 h-10 flex-shrink-0 object-contain" />
                  <div>
                    <p className="font-serif text-sage-800 text-sm mb-0.5">{p.title}</p>
                    <p className="font-sans text-sage-600 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="font-sans text-sage-700 text-base leading-relaxed border-l-2 border-sage-300 pl-4 italic">
              When nutrition, exercise and movement, sleep and emotional wellbeing work together,
              supported by sustainable behaviour change, they create the foundation for better
              health, improved wellbeing and lasting results.
            </p>
          </div>
        </div>

        {/* ── Conditions I Support ── */}
        <div className="mt-24 pt-16 border-t border-sage-100">
          <div className="text-center mb-12">
            <h2 className="section-heading text-4xl">Conditions I Support</h2>
          </div>

          {/* Detailed categories */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
            {conditions.filter((c) => c.items.length > 0).map((c) => (
              <div key={c.category} className="bg-sage-50 border border-sage-100 rounded-lg p-5">
                <p className="font-serif text-sage-800 text-base mb-3">{c.category}</p>
                <ul className="space-y-1.5">
                  {c.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 font-sans text-sm text-sage-600">
                      <span className="text-sage-400 flex-shrink-0 mt-1 text-xs">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Standalone categories */}
          <div className="flex flex-wrap gap-3">
            {conditions.filter((c) => c.items.length === 0).map((c) => (
              <div key={c.category} className="bg-sage-50 border border-sage-100 rounded-lg px-5 py-3">
                <p className="font-serif text-sage-800 text-base">{c.category}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Why Clients Choose to Work With Me ── */}
        <div className="mt-20 pt-16 border-t border-sage-100">
          <div className="text-center mb-10">
            <h2 className="section-heading text-4xl">Why Clients Choose to Work With Me</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {whyChoose.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="text-sage-500 font-bold flex-shrink-0">✔</span>
                <span className="font-sans text-sage-700 text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
