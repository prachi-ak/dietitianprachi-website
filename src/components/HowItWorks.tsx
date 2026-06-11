const steps = [
  {
    number: '01',
    title:  'Choose Your Service',
    desc:   'Select the programme that matches your current needs, from a free introductory call to a full initial consultation.',
  },
  {
    number: '02',
    title:  'Select a Date and Time',
    desc:   'Pick a time that works for you. All consultations are available online via video call, or in-person at selected locations in London',
  },
  {
    number: '03',
    title:  'Secure Your Booking',
    desc:   'Complete your details and, where applicable, pay securely via Stripe. You will receive a confirmation once Prachi approves your booking.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-white border-t border-sage-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="section-heading text-4xl mb-4">How It Works</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-start">
              <span className="font-serif text-5xl text-sage-200 leading-none mb-4 select-none">
                {step.number}
              </span>
              <p className="font-serif text-sage-800 text-lg mb-3">{step.title}</p>
              <p className="font-sans text-sage-600 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
