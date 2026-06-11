'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '@/data/content';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  const prev = () => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section
      id="testimonials"
      className="py-16 md:py-24 bg-sage-800"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10 md:mb-14">
          <p className="font-sans text-xs uppercase tracking-widest text-sage-300 mb-3">
            Client Stories
          </p>
          <h2 className="font-serif text-4xl text-white">What Clients Say</h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="w-full flex-shrink-0 px-2">
                  <div className="bg-white/10 rounded-2xl p-10 md:p-14 text-center">
                    <Quote
                      size={32}
                      className="text-sage-300 mx-auto mb-6 opacity-60"
                      aria-hidden
                    />
                    <p className="font-serif text-white text-xl md:text-2xl leading-relaxed mb-8">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p className="font-sans text-sm text-sage-300 uppercase tracking-widest">
                      {t.client}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'bg-white w-6 h-2'
                  : 'bg-white/30 hover:bg-white/50 w-2 h-2'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
