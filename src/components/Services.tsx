import Link from 'next/link';
import { services } from '@/data/content';
import { Clock, CheckCircle2 } from 'lucide-react';

export default function Services() {
  return (
    <section id="services" className="py-24 bg-sage-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="section-label">Services</p>
          <h2 className="section-heading text-4xl mb-4">How We Work Together</h2>
          <p className="font-sans text-sage-600 max-w-xl mx-auto text-base leading-relaxed">
            Choose the programme that fits where you are right now. Every service is available
            online worldwide and in-person in the UK.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.id}
              className={`bg-white rounded-lg p-8 flex flex-col border transition-shadow hover:shadow-md ${
                i === 1 ? 'border-sage-300 ring-1 ring-sage-200' : 'border-sage-100'
              }`}
            >
              {i === 1 && (
                <span className="self-start mb-4 font-sans text-xs tracking-widest uppercase bg-sage-100 text-sage-600 px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <p className="font-serif text-sage-800 text-xl mb-2">{s.name}</p>

              <div className="flex items-center gap-1.5 text-sage-500 mb-4">
                <Clock size={13} />
                <span className="font-sans text-xs">{s.duration}</span>
              </div>

              <div className="mb-6">
                {s.price === 0 ? (
                  <span className="font-serif text-3xl text-sage-700">Free</span>
                ) : (
                  <span className="font-serif text-3xl text-sage-700">
                    £{s.price}
                  </span>
                )}
              </div>

              <p className="font-sans text-sage-600 text-sm leading-relaxed mb-6 flex-1">
                {s.description}
              </p>

              <ul className="space-y-2.5 mb-8">
                {s.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2.5">
                    <CheckCircle2 size={15} className="text-sage-400 flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-sm text-sage-700">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/book?service=${s.id}`}
                className={`text-center py-3 px-6 rounded text-sm font-sans tracking-wide transition-colors ${
                  i === 1
                    ? 'bg-sage-400 hover:bg-sage-500 text-white'
                    : 'border border-sage-300 text-sage-600 hover:bg-sage-50'
                }`}
              >
                {s.price === 0 ? 'Book Free Call' : 'Book Now'}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
