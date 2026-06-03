import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Dietitian Prachi',
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-24 bg-white min-h-screen">
        <div className="max-w-2xl mx-auto px-6">
          <p className="section-label">Legal</p>
          <h1 className="font-serif text-4xl text-sage-900 mb-2">Privacy Policy</h1>
          <p className="font-sans text-sage-500 text-sm mb-12">Last updated: June 2025</p>

          <div className="font-sans text-sage-700 text-sm leading-relaxed space-y-8">
            <section>
              <h2 className="font-serif text-xl text-sage-800 mb-3">1. Who We Are</h2>
              <p>This website is operated by Prachi Acharekar trading as Dietitian Prachi. Prachi Acharekar is the data controller responsible for your personal data. If you have any questions about how your data is used, please contact us at prachi@dietitianprachi.com.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-sage-800 mb-3">2. What Data We Collect</h2>
              <p>When you book a consultation, we collect your name, email address, phone number, and any health information you choose to provide. We also collect information about your appointment (service type, date, and time). This data is used solely to facilitate and manage your consultation.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-sage-800 mb-3">3. How We Use Your Data</h2>
              <p>Your data is used to confirm and manage your booking, send appointment reminders and confirmations, and provide the consultation service. We do not use your data for marketing without your explicit consent, and we do not sell or share your data with third parties except where required to deliver the service (e.g. payment processing via Stripe).</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-sage-800 mb-3">4. Health Data</h2>
              <p>Any health or medical information you share is treated as special category data under UK GDPR. It is processed only for the purpose of providing you with nutrition and lifestyle support, stored securely, and never shared without your consent.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-sage-800 mb-3">5. Data Retention</h2>
              <p>Booking and consultation records are retained for a minimum of 8 years in line with NHS and professional guidelines for clinical records. You may request access to, correction, or deletion of your data at any time, subject to legal retention requirements.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-sage-800 mb-3">6. Your Rights</h2>
              <p>Under UK GDPR, you have the right to access your personal data, request correction or deletion, object to processing, and lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-sage-800 mb-3">7. Cookies</h2>
              <p>This website uses only essential cookies required for the booking system to function. No tracking or advertising cookies are used.</p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-sage-100 flex gap-6 font-sans text-sm">
            <Link href="/terms" className="text-sage-500 hover:text-sage-700 transition-colors">Terms & Conditions</Link>
            <Link href="/"      className="text-sage-500 hover:text-sage-700 transition-colors">Back to Home</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
