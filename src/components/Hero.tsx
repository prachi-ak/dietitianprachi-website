import Link from 'next/link';

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

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="section-label">HCPC Registered Dietitian</p>
          <h1 className="font-serif text-5xl md:text-6xl text-sage-900 leading-[1.1] mb-6">
            Nourish Your Body.<br />
            <span className="text-sage-500">Elevate Your Life.</span>
          </h1>
          <p className="font-sans text-sage-700 text-lg leading-relaxed mb-10 max-w-md">
            Deeply personalised nutrition programmes built on evidence, delivered
            with care. Online worldwide and in-person in the United Kingdom.
          </p>
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
          <div
            className="relative w-80 h-80 rounded-full bg-sage-100 border border-sage-200 flex items-center justify-center"
          >
            <div className="absolute inset-6 rounded-full bg-sage-200/60 border border-sage-300/40" />
            <div className="relative text-center">
              <p className="font-serif text-sage-800 text-2xl">Prachi Acharekar</p>
              <p className="font-sans text-sage-500 text-xs mt-1 tracking-widest uppercase">Dietitian</p>
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
