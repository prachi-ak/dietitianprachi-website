import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Dietitian Prachi',
};

const sections = [
  {
    title: 'Who We Are',
    body: 'This website is operated by Prachi Acharekar, trading as Prachi | The Integrative Dietitian. Prachi Acharekar is the data controller responsible for your personal data under UK data protection law. If you have any questions about how your data is collected, stored, or used, please contact us at prachi@dietitianprachi.com.',
  },
  {
    title: 'What Data We Collect',
    body: 'When you book a consultation, we collect your name, email address, phone number, and any health information you choose to provide. In addition, before your appointment, we collect information you provide via intake forms relating to your nutrition, physical activity, sleep, and emotional wellbeing, as well as other lifestyle factors relevant to your care. We also collect information about your appointment, including service type, date, and time. This data is used to facilitate, manage, and personalise your consultation and nutrition support, and to maintain appropriate clinical records in line with professional and legal obligations.',
  },
  {
    title: 'How We Use Your Data',
    body: 'Your data is used to confirm and manage your booking, send appointment reminders and confirmations, and provide nutritional consultation services. We do not use your data for marketing purposes without your explicit consent. We do not sell your data. We may share your data only with trusted third-party service providers where necessary to deliver our services, such as payment processing (Stripe) and appointment management systems. These providers are required to handle your data securely and in compliance with data protection law.',
  },
  {
    title: 'Health Data',
    body: 'Any health or medical information you share is treated as special category data under UK GDPR. It is processed for the purpose of providing you with nutrition and lifestyle support, maintaining appropriate clinical records, and delivering our services. This data is stored securely and is not shared with third parties without your consent, except where required by law or where necessary to deliver the service.',
  },
  {
    title: 'Data Retention',
    body: 'Booking and consultation records are retained in accordance with professional and legal requirements. You may request access to, correction of, or deletion of your data at any time. However, deletion may not always be possible where we are required to retain information to comply with legal, regulatory, or professional obligations.',
  },
  {
    title: 'Lawful Basis for Processing',
    body: 'Personal data is processed for the purposes of providing dietetic services, managing appointments, maintaining clinical records, and complying with legal and professional obligations. Health information is processed as special category data for the provision of healthcare services.',
  },
  {
    title: 'Your Rights',
    body: 'Under UK GDPR, you have the right to access the personal data we hold about you, request correction of certain incomplete or inaccurate data, request restriction of processing in certain circumstances, object to certain types of processing, and request deletion of your personal data where legally appropriate. If you wish to exercise any of these rights, please contact us using the details provided in this Privacy Policy.',
  },
  {
    title: 'Cookies',
    body: 'This website may use cookies and analytics tools to improve website functionality, performance, and user experience. You can manage or disable cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of the website.',
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-36 pb-24 bg-white min-h-screen">
        <div className="max-w-2xl mx-auto px-6">
          <p className="section-label">Legal</p>
          <h1 className="font-serif text-4xl text-sage-900 mb-2">Privacy Policy</h1>
          <p className="font-sans text-sage-500 text-sm mb-12">Last updated: June 2025</p>

          <div className="space-y-10">
            {sections.map((s, i) => (
              <section key={i}>
                <h2 className="font-serif text-xl text-sage-800 mb-3">{s.title}</h2>
                <p className="font-sans text-sage-700 text-base leading-relaxed">{s.body}</p>
              </section>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-sage-100 flex gap-6 font-sans text-sm">
            <Link href="/terms" className="text-sage-500 hover:text-sage-700 transition-colors">Terms &amp; Conditions</Link>
            <Link href="/"      className="text-sage-500 hover:text-sage-700 transition-colors">Back to Home</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
