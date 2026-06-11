'use client';

import { useState } from 'react';
import { faqs } from '@/data/content';
import { Plus, Minus } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="section-label">FAQ</p>
          <h2 className="section-heading text-4xl mb-4">Frequently Asked Questions</h2>
          <p className="font-sans text-sage-600 text-base leading-relaxed">
            If your question is not answered here, please get in touch via the contact section.
          </p>
        </div>

        <div className="divide-y divide-sage-100">
          {faqs.map((item, i) => (
            <div key={i} className="py-5">
              <button
                className="w-full text-left flex items-start justify-between gap-4 group"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="font-serif text-sage-800 text-base leading-snug group-hover:text-sage-600 transition-colors">
                  {item.question}
                </span>
                <span className="flex-shrink-0 mt-0.5 text-sage-400 group-hover:text-sage-600 transition-colors">
                  {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              {openIndex === i && (
                <p className="font-sans text-sage-600 text-base leading-relaxed mt-3 pr-8">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
