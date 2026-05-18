import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { free?: string; session_id?: string };
}) {
  const isFree = searchParams.free === '1';

  return (
    <div className="min-h-screen bg-sage-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-sage-100 border border-sage-200 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={32} className="text-sage-500" />
        </div>

        <h1 className="font-serif text-3xl text-sage-900 mb-4">
          {isFree ? 'Appointment Confirmed' : 'Payment Received'}
        </h1>

        <p className="font-sans text-sage-600 leading-relaxed mb-4">
          {isFree
            ? 'Your discovery call is confirmed. A confirmation email with your Google Meet link has been sent to you.'
            : 'Your payment is confirmed and your appointment is set. A confirmation email with your Google Meet link is on its way.'}
        </p>

        <p className="font-sans text-sage-500 text-sm leading-relaxed mb-8">
          Please check your inbox, including your spam folder, if it does not arrive within a few minutes.
        </p>

        <Link href="/" className="btn-primary">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
