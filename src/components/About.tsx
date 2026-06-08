import Image from 'next/image';

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
            <p className="font-sans text-sage-700 text-base leading-relaxed mb-5">
              I am Prachi. My work combines evidence-based nutrition with a personalised,
              root-cause-informed approach to support long-term health outcomes.
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

          {/* Right: approach + blueprint */}
          <div>
            <h3 className="font-serif text-2xl text-sage-800 leading-snug mb-5">
              Your Lifestyle Is the Blueprint of Your Health
            </h3>
            <p className="font-sans text-sage-700 text-base leading-relaxed mb-8">
              Many health concerns are influenced by more than nutrition alone.
              Sleep quality, exercise and movement, stress levels, emotional wellbeing and daily
              habits all play a significant role in how we feel and function.
              As The Integrative Dietitian, I take a whole-person approach, exploring how these
              factors interact to influence your health and wellbeing. Together, we identify the key
              drivers affecting your symptoms and develop personalised, sustainable strategies that
              support lasting change.
              Because lasting health is not built on food alone, but shaped by the way we live every
              day.
            </p>

            <h3 className="font-serif text-xl text-sage-800 mb-3">
              The Integrative Health Blueprint
            </h3>
            <p className="font-sans text-sage-700 text-base leading-relaxed mb-6">
              The Integrative Health Blueprint is the framework that guides the way I work with
              clients. It recognises that lasting health is influenced by multiple interconnected
              factors and not nutrition alone. By addressing these key areas together, we can create
              a personalised and sustainable approach that supports long-term wellbeing.
            </p>

            <div className="rounded-xl overflow-hidden border border-sage-100">
              <Image
                src="/health-blueprint.png"
                alt="The Integrative Health Blueprint: Nutrition, Exercise and Movement, Sleep, Stress and Emotional Wellbeing"
                width={600}
                height={600}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
