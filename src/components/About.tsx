const pillars = [
  { label: 'Balanced Nutrition',    desc: 'Food as medicine, tailored to you.' },
  { label: 'Quality Sleep',         desc: 'The foundation of recovery and resilience.' },
  { label: 'Adequate Exercise',     desc: 'Movement as a tool for long-term health.' },
  { label: 'Emotional Well-being',  desc: 'Treating the whole person, not just symptoms.' },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="section-label">About</p>
            <h2 className="section-heading text-4xl mb-6">
              Where Clinical Expertise Meets Holistic Care
            </h2>
            <p className="font-sans text-sage-700 leading-relaxed mb-5">
              Prachi Acharekar is an HCPC Registered Dietitian (No. DT035388) and British
              Dietetic Association member (No. 1031144) with a rare blend of hospital-level
              clinical expertise and deep holistic wellness training.
            </p>
            <p className="font-sans text-sage-700 leading-relaxed mb-5">
              Having worked at Tata Memorial Hospital in Paediatric Oncology and then as Head
              Nutritionist at Luke Coutinho's renowned practice, she brings unmatched depth to
              nutrition care. Now based in the United Kingdom, she approaches every client's
              health through the lens of four interconnected pillars, treating root causes, not
              just symptoms.
            </p>
            <p className="font-sans text-sage-700 leading-relaxed">
              Through her independent practice Dietitian Prachi, she offers deeply personalised
              nutrition programmes for individuals, families, and corporates. Available online
              worldwide and in-person in the UK.
            </p>

            <div className="mt-8 flex flex-col gap-2 text-sm font-sans text-sage-600">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sage-400 flex-shrink-0" />
                HCPC Registered Dietitian No. DT035388
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sage-400 flex-shrink-0" />
                British Dietetic Association Member No. 1031144
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sage-400 flex-shrink-0" />
                Former Head Nutritionist at Luke Coutinho's Practice
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sage-400 flex-shrink-0" />
                Tata Memorial Hospital, Paediatric Oncology
              </span>
            </div>
          </div>

          <div>
            <p className="section-label mb-6">The Four Pillars</p>
            <div className="grid grid-cols-2 gap-4">
              {pillars.map((p, i) => (
                <div
                  key={i}
                  className="bg-sage-50 border border-sage-100 rounded-lg p-5 hover:border-sage-300 transition-colors"
                >
                  <p className="font-serif text-sage-800 text-base mb-2">{p.label}</p>
                  <p className="font-sans text-sage-600 text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
