import Image from 'next/image';

const pillars = [
  {
    label: 'Balanced Nutrition',
    desc:  'Food as information for the body: personalised, practical, and sustainable.',
  },
  {
    label: 'Sustainable Exercise & Movement',
    desc:  'Movement that supports long-term physical and metabolic health.',
  },
  {
    label: 'Restorative Sleep',
    desc:  'The foundation of hormonal balance, recovery, and daily resilience.',
  },
  {
    label: 'Stress & Emotional Wellbeing',
    desc:  'Addressing the mind-body connection for lasting lifestyle change.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left: bio */}
          <div>
            <p className="section-label">About</p>
            <h2 className="section-heading text-4xl mb-2">
              Evidence-Based Nutrition with an Integrative Lifestyle Approach
            </h2>
            <p className="font-sans text-sage-400 text-base italic mb-6">
              Your lifestyle is the blueprint of your health.
            </p>

            <p className="font-sans text-sage-700 text-base leading-relaxed mb-5">
              I am Prachi, an HCPC-registered dietitian with over 12 years of experience in
              clinical nutrition, metabolic health, and integrative lifestyle medicine. My work
              combines evidence-based nutrition with a personalised, root-cause-informed approach
              to support long-term health outcomes.
            </p>
            <p className="font-sans text-sage-700 text-base leading-relaxed mb-5">
              I specialise in metabolic health, gut health, PCOS and women's health, weight
              management, autoimmune conditions, oncology nutrition, and chronic disease
              management, including diabetes, hypertension, cardiovascular health, thyroid
              dysfunction, and insulin resistance.
            </p>
            <p className="font-sans text-sage-700 text-base leading-relaxed mb-5">
              I have worked across hospital, clinical, and private healthcare settings, supporting
              individuals with complex and long-term conditions through personalised nutrition and
              lifestyle interventions. In a previous senior clinical role within an integrative
              healthcare setting, I managed a global caseload across the UK, US, Canada, Europe,
              UAE, Singapore, and India, leading the oncology nutrition and lifestyle vertical and
              supporting individuals through treatment, recovery, and survivorship as part of a
              multidisciplinary team.
            </p>
            <p className="font-sans text-sage-700 text-base leading-relaxed">
              Having worked extensively with South Asian and international populations, I
              understand the importance of culturally relevant, realistic guidance that fits into
              everyday life. My aim is to help individuals feel informed, supported, and empowered
              to make sustainable changes that improve both their health and quality of life.
            </p>

            <div className="mt-8 flex flex-col gap-2 font-sans text-base text-sage-600">
              {[
                '12+ years in clinical nutrition and integrative lifestyle medicine',
                'Specialist in oncology, metabolic, and chronic disease nutrition',
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage-400 flex-shrink-0" />
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-sage-100">
              <p className="font-sans text-xs uppercase tracking-widest text-sage-400 mb-4">
                Registered & Accredited With
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <Image src="/hcpc-logo.png"            alt="HCPC Health and Care Professions Council" width={100} height={40} className="h-9 w-auto object-contain" />
                <Image src="/bda-logo.png"             alt="BDA The Association of UK Dietitians"     width={100} height={40} className="h-9 w-auto object-contain" />
                <Image src="/trust-dietitian-logo.jpg" alt="Trust a Dietitian"                        width={60}  height={60} className="h-10 w-auto object-contain" />
              </div>
            </div>
          </div>

          {/* Right: approach + four pillars */}
          <div>
            <p className="section-label mb-4">My Approach</p>
            <p className="font-sans text-sage-700 text-base leading-relaxed mb-8">
              My approach goes beyond prescribing meal plans. I focus on identifying the
              underlying factors driving health conditions rather than solely managing symptoms.
              I integrate nutrition, movement, sleep, stress management, and emotional wellbeing
              into a strategy that is realistic and tailored to each individual's medical history,
              lifestyle, and cultural preferences.
            </p>

            <p className="font-sans text-xs uppercase tracking-widest text-sage-400 mb-4">
              The Four Pillars of Health
            </p>
            <div className="grid grid-cols-2 gap-4">
              {pillars.map((p, i) => (
                <div
                  key={i}
                  className="bg-sage-50 border border-sage-100 rounded-lg p-5 hover:border-sage-300 transition-colors"
                >
                  <p className="font-serif text-sage-800 text-base mb-2">{p.label}</p>
                  <p className="font-sans text-sage-600 text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
