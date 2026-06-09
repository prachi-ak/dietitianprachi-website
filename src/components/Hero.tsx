import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-sage-50 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(150,164,130,0.18) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-36 pb-20 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="section-label mb-4">Prachi Acharekar · HCPC Registered Dietitian</p>

          <h1 className="font-serif text-5xl md:text-6xl text-sage-800 leading-[1.1] mb-3">
            The Integrative<br />
            <span className="text-sage-500">Dietitian</span>
          </h1>

          <p className="font-serif text-xl md:text-2xl text-sage-600 italic mb-7 leading-snug max-w-lg text-left">
            Evidence-Based Nutrition &amp; Lifestyle Support for Lasting Health
          </p>

          <p className="font-sans text-sage-700 text-base leading-relaxed mb-6 max-w-lg">
            Supporting individuals with metabolic health concerns, digestive health conditions,
            PCOS, menopause, weight management, cancer recovery and chronic health conditions
            through personalised nutrition and lifestyle strategies that fit real life.
          </p>

          <ul className="flex flex-col gap-2.5 mb-10">
            {[
              'HCPC Registered Dietitian',
              '12+ Years Clinical Experience',
              'Online Consultations Across the UK & Internationally (where appropriate)',
              'Face-to-Face Consultations in Selected London Locations',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 font-sans text-sm text-sage-700">
                <span className="text-sage-500 font-bold flex-shrink-0 mt-0.5">✔</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-4">
            <Link href="/book" className="btn-primary">
              Book a Consultation
            </Link>
            <a href="#about" className="btn-outline">
              Learn More
            </a>
          </div>
        </div>

        <div className="hidden md:flex justify-center">
          <div className="relative">
            <div className="w-72 h-[460px] rounded-3xl overflow-hidden border border-sage-200 shadow-lg">
              <Image
                src="/website-pic2.jpg"
                alt="Prachi Acharekar, The Integrative Dietitian"
                fill
                className="object-cover"
                style={{ objectPosition: '52% 20%' }}
                priority
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white border border-sage-100 rounded-2xl px-5 py-3 shadow-sm">
              <p className="font-serif text-sage-800 text-base leading-tight">Prachi Acharekar</p>
              <p className="font-sans text-sage-500 text-xs tracking-widest uppercase mt-0.5">The Integrative Dietitian</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
