import Link from 'next/link';
import Image from 'next/image';
import { services } from '@/data/content';
import { Clock, CheckCircle2, Info } from 'lucide-react';

const paidGroups = [
  { key: 'general',  label: 'Personalised Nutrition & Lifestyle Support' },
  { key: 'oncology', label: 'Specialist Cancer (Oncology) Nutrition & Lifestyle Support' },
] as const;

export default function Services() {
  const discoveryCall = services.find((s) => s.group === 'discovery');

  return (
    <section id="services" className="py-16 md:py-24 bg-sage-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10 md:mb-16">
          <p className="section-label">Services</p>
          <h2 className="section-heading text-4xl mb-4">How We Work Together</h2>
          <p className="font-sans text-sage-600 max-w-xl mx-auto text-base leading-relaxed">
            Online Consultations Across the UK &amp; Internationally (where appropriate).
            Face-to-Face Consultations in Selected London Locations.
          </p>
        </div>

        {/* Free discovery call */}
        {discoveryCall && (
          <div className="bg-sage-800 rounded-lg p-6 md:p-8 mb-10 md:mb-14 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-1">
              <span className="inline-block font-sans text-xs tracking-widest uppercase bg-white/10 text-sage-100 px-3 py-1 rounded-full mb-3">
                Not sure where to begin?
              </span>
              <p className="font-serif text-white text-2xl mb-2">{discoveryCall.name}</p>
              <div className="flex items-center gap-1.5 text-sage-300 mb-3">
                <Clock size={13} />
                <span className="font-sans text-sm">{discoveryCall.duration}</span>
              </div>
              <p className="font-sans text-sage-200 text-base leading-relaxed max-w-lg">
                {discoveryCall.description}
              </p>
            </div>
            <Link
              href={`/book?service=${discoveryCall.id}`}
              className="flex-shrink-0 text-center py-3 px-8 rounded text-sm font-sans tracking-wide bg-white text-sage-800 hover:bg-sage-50 transition-colors"
            >
              Book Free Call
            </Link>
          </div>
        )}

        {/* Lifestyle visual break */}
        <div className="rounded-2xl overflow-hidden mb-10 md:mb-14 shadow-sm">
          <Image
            src="/lifestyle-pic.png"
            alt="Personalised nutrition and lifestyle support"
            width={1200}
            height={500}
            className="w-full h-56 md:h-72 object-cover object-center"
          />
        </div>

        {/* Paid service groups */}
        <div className="space-y-12 md:space-y-16">
          {paidGroups.map((group) => {
            const groupServices = services.filter((s) => s.group === group.key);
            const initialService = groupServices.find((s) => s.id.endsWith('-initial'));

            return (
              <div key={group.key}>
                <h3 className="font-serif text-2xl text-sage-800 mb-8 pb-4 border-b border-sage-200">
                  {group.label}
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {groupServices.map((s) => (
                    <div
                      key={s.id}
                      className="bg-white rounded-lg p-8 flex flex-col border border-sage-100 hover:shadow-md transition-shadow"
                    >
                      <p className="font-serif text-sage-800 text-xl mb-2">{s.name}</p>

                      <div className="flex items-center gap-1.5 text-sage-500 mb-4">
                        <Clock size={13} />
                        <span className="font-sans text-sm">{s.duration}</span>
                      </div>

                      <div className="mb-5">
                        <span className="font-serif text-3xl text-sage-700">£{s.price}</span>
                      </div>

                      <p className="font-sans text-sage-600 text-base leading-relaxed mb-6">
                        {s.description}
                      </p>

                      <ul className="space-y-2.5 mb-8 flex-1">
                        {s.features.map((f, fi) => (
                          <li key={fi} className="flex items-start gap-2.5">
                            <CheckCircle2 size={15} className="text-sage-400 flex-shrink-0 mt-0.5" />
                            <span className="font-sans text-sm text-sage-700">{f}</span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        href={`/book?service=${s.id}`}
                        className="text-center py-3 px-6 rounded text-sm font-sans tracking-wide transition-colors bg-sage-400 hover:bg-sage-500 text-white"
                      >
                        Book Now
                      </Link>
                    </div>
                  ))}
                </div>

                {'conditions' in (initialService ?? {}) && initialService?.conditions && (
                  <div className="mt-6 bg-white border border-sage-100 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Info size={15} className="text-sage-400 flex-shrink-0" />
                      <p className="font-sans text-base font-medium text-sage-700">
                        Conditions supported include:
                      </p>
                    </div>
                    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                      {initialService.conditions.map((c, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-sage-300 mt-1.5 text-xs">–</span>
                          <span className="font-sans text-sm text-sage-600">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
