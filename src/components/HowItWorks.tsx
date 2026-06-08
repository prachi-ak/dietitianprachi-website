const steps = [
  {
    number: '01',
    title:  'Comprehensive Assessment',
    desc:   'We explore your health history, symptoms, nutrition, lifestyle and personal goals in depth.',
  },
  {
    number: '02',
    title:  'Identify Key Drivers',
    desc:   'Together we explore the underlying factors and lifestyle influences contributing to your current health concerns.',
  },
  {
    number: '03',
    title:  'Personalised Nutrition & Lifestyle Plan',
    desc:   'Receive a tailored plan built around your needs, preferences and lifestyle.',
  },
  {
    number: '04',
    title:  'Plan Review & Next Steps',
    desc:   'We review your personalised plan and provide guidance to help you confidently implement your recommendations. An email check-in is included to support you as you get started.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="section-label">The Process</p>
          <h2 className="section-heading text-4xl mb-4">Your Consultation Journey</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-6 items-start">
              <span className="font-serif text-5xl text-sage-200 leading-none select-none flex-shrink-0">
                {step.number}
              </span>
              <div>
                <p className="font-serif text-sage-800 text-xl mb-2">{step.title}</p>
                <p className="font-sans text-sage-600 text-base leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
