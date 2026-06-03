import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions | Dietitian Prachi',
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-24 bg-white min-h-screen">
        <div className="max-w-2xl mx-auto px-6">
          <p className="section-label">Legal</p>
          <h1 className="font-serif text-4xl text-sage-900 mb-2">Terms & Conditions</h1>
          <p className="font-sans text-sage-500 text-sm mb-12">Last updated: June 2025</p>

          <div className="font-sans text-sage-700 text-sm leading-relaxed space-y-8">
            <section>
              <h2 className="font-serif text-xl text-sage-800 mb-3">1. Services</h2>
              <p>Dietitian Prachi provides online and in-person nutrition and lifestyle consultations delivered by Prachi Acharekar, an HCPC-registered dietitian. All consultations are conducted via secure video call or in person at selected London locations.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-sage-800 mb-3">2. Bookings and Payment</h2>
              <p>All bookings are subject to availability and confirmation by Prachi Acharekar. Payment for paid consultations is required at the time of booking. Prices are as stated on the website at the time of booking and are inclusive of VAT where applicable.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-sage-800 mb-3">3. Cancellation and Refund Policy</h2>
              <p>Cancellations made more than 48 hours before your appointment are eligible for a full refund. Cancellations made within 48 hours of the appointment are non-refundable. You may reschedule your appointment with sufficient notice, subject to availability. Please contact Prachi directly to arrange any changes.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-sage-800 mb-3">4. Professional Scope</h2>
              <p>The advice and recommendations provided through Dietitian Prachi are intended to support, not replace, the relationship between a patient and their registered medical practitioner. Clients with medical conditions are encouraged to share relevant information with their GP.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-sage-800 mb-3">5. Limitation of Liability</h2>
              <p>Dietitian Prachi shall not be liable for any indirect or consequential loss arising from the use of services or reliance on information provided. Liability is limited to the total fees paid for the specific service in question.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-sage-800 mb-3">6. Governing Law</h2>
              <p>These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
            </section>
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
