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
            'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(168,208,160,0.22) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-36 pb-20 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="font-serif text-4xl md:text-5xl text-sage-700 mb-5 leading-tight">
            The Integrative<br className="hidden sm:block" /> Dietitian
          </h2>
          <h1 className="font-serif text-5xl md:text-6xl text-sage-900 leading-[1.1] mb-6">
            Nourish Your Body.<br />
            <span className="text-sage-500">Elevate Your Life.</span>
          </h1>
          <p className="font-sans text-sage-700 text-base leading-relaxed mb-6 max-w-lg">
            Supporting individuals with metabolic health concerns, digestive health conditions,
            PCOS, menopause, weight management, cancer recovery and chronic health
            conditions through personalised nutrition and lifestyle strategies that fit real life.
          </p>
          <ul className="flex flex-col gap-2 mb-10">
            {[
              'HCPC Registered Dietitian',
              '12+ Years Clinical Experience',
              'Online Consultations Across the UK & Internationally (where appropriate)',
              'Face-to-Face Consultations in Selected London Locations',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 font-sans text-sm text-sage-700">
                <span className="text-sage-500 font-bold flex-shrink-0">✔</span>
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
            <div className="w-72 h-[420px] rounded-3xl overflow-hidden border border-sage-200 shadow-lg">
              <Image
                src="/professional-pic.jpg"
                alt="Prachi Acharekar — The Integrative Dietitian"
                fill
                className="object-cover object-top"
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

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50">
        <span className="font-sans text-xs text-sage-500 tracking-widest uppercase">Scroll</span>
        <span className="w-px h-8 bg-sage-400 block" />
      </div>
    </section>
  );
}
