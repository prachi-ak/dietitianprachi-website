import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions | Dietitian Prachi',
};

const sections = [
  {
    title: 'About the Service',
    body: 'Prachi Acharekar is an HCPC Registered Dietitian providing evidence-based nutrition and lifestyle consultations to adults and children through online consultations and face-to-face appointments in selected London locations. By booking an appointment, you agree to these Terms and Conditions.',
  },
  {
    title: 'Scope of Practice',
    body: 'The advice and personalised recommendations provided by Prachi Acharekar are intended to support health and wellbeing through evidence-based nutrition and lifestyle guidance. Services are designed to complement, not replace, the relationship between a client and their GP, consultant, or other healthcare professionals.',
  },
  {
    title: 'Booking and Payment',
    body: 'All bookings are subject to availability and confirmation by Prachi Acharekar. Payment for paid consultations is required at the time of booking. Prices are as stated on the website at the time of booking.',
  },
  {
    title: 'Consultation Services',
    intro: 'Services may include:',
    list: [
      'Initial assessments',
      'Follow-up consultations',
      'Personalised nutrition and lifestyle plans',
      'Nutrition and lifestyle education',
      'Oncology nutrition and lifestyle support',
      'Metabolic health support',
      'Women\'s health support',
      'Gut health support',
      'Weight management support',
    ],
    body: 'All recommendations are based on the information provided by the client and current evidence available at the time of consultation. Advice is tailored to individual circumstances and may be updated as new information becomes available.',
  },
  {
    title: 'Client Responsibilities',
    intro: 'Clients agree to:',
    list: [
      'Provide accurate and up-to-date information regarding their medical history, medications, supplements, symptoms, and relevant health concerns.',
      'Inform Prachi Acharekar of any significant changes to their health status.',
      'Seek advice from their GP or healthcare team where appropriate, particularly regarding diagnosis, medical conditions, or medication changes.',
    ],
    body: 'Children under 16 years of age must be accompanied by a parent or legal guardian at all appointments.',
  },
  {
    title: 'Cancellation and Refund Policy',
    body: 'Cancellations made more than 48 hours before your appointment are eligible for a full refund or rescheduling. Cancellations made within 48 hours of the appointment are non-refundable. You may reschedule your appointment with sufficient notice, subject to availability. Please contact Prachi directly to arrange any changes.',
    secondList: {
      intro: 'Refunds are not available for:',
      items: [
        'Completed consultations',
        'Personalised nutrition and lifestyle plans',
        'Written recommendations',
        'Follow-up calls',
      ],
    },
    footer: 'Exceptional circumstances will be considered on an individual basis.',
  },
  {
    title: 'Confidentiality',
    body: 'All client information is treated confidentially and managed in accordance with UK GDPR and professional standards. Information will only be shared where you have provided explicit consent, it is required by law, or there is a safeguarding concern or a need to protect your safety or the safety of others.',
  },
  {
    title: 'Limitation of Liability',
    body: 'Every effort is made to provide accurate, evidence-based nutrition and lifestyle advice. However, individual results may vary, and no guarantee can be made regarding specific health outcomes. Prachi Acharekar shall not be liable for any indirect or consequential loss arising from the use of information, advice, or recommendations provided through consultations or this website.',
  },
  {
    title: 'Intellectual Property',
    body: 'All content on this website, including text, blog articles, resources, guides, nutrition and lifestyle plans, images, and downloadable materials, is the intellectual property of Prachi Acharekar unless otherwise stated. Content may not be copied, reproduced, distributed, modified, published, or shared without prior written permission.',
  },
  {
    title: 'Governing Law',
    body: 'These Terms and Conditions shall be governed by the laws of England and Wales.',
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-36 pb-24 bg-white min-h-screen">
        <div className="max-w-2xl mx-auto px-6">
          <h1 className="font-serif text-4xl text-sage-900 mb-2">Terms &amp; Conditions</h1>
          <p className="font-sans text-sage-500 text-sm mb-12">Last updated: June 2026</p>

          <div className="space-y-10">
            {sections.map((s, i) => (
              <section key={i}>
                <h2 className="font-serif text-xl text-sage-800 mb-3">{s.title}</h2>
                {s.intro && (
                  <p className="font-sans text-sage-700 text-base leading-relaxed mb-2">{s.intro}</p>
                )}
                {s.list && (
                  <ul className="mb-3 space-y-1">
                    {s.list.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 font-sans text-base text-sage-700">
                        <span className="text-sage-400 mt-1.5 text-xs flex-shrink-0">–</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {s.body && (
                  <p className="font-sans text-sage-700 text-base leading-relaxed">{s.body}</p>
                )}
                {s.secondList && (
                  <>
                    <p className="font-sans text-sage-700 text-base leading-relaxed mt-3 mb-2">{s.secondList.intro}</p>
                    <ul className="mb-3 space-y-1">
                      {s.secondList.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 font-sans text-base text-sage-700">
                          <span className="text-sage-400 mt-1.5 text-xs flex-shrink-0">–</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {s.footer && (
                  <p className="font-sans text-sage-700 text-base leading-relaxed mt-2">{s.footer}</p>
                )}
              </section>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-sage-100 flex gap-6 font-sans text-sm">
            <Link href="/privacy" className="text-sage-500 hover:text-sage-700 transition-colors">Privacy Policy</Link>
            <Link href="/"        className="text-sage-500 hover:text-sage-700 transition-colors">Back to Home</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
