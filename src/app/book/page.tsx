'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { services } from '@/data/content';
import { format, addDays, startOfDay, isWeekend } from 'date-fns';
import { ChevronLeft, Clock, CheckCircle2, CalendarDays, Loader2, X } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

const SERVICE_DURATION: Record<string, number> = {
  'discovery-call':     15,
  'general-initial':    60,
  'general-followup':   30,
  'oncology-initial':   75,
  'oncology-followup':  45,
};

const BOOKING_GROUPS = [
  { key: 'discovery', label: null },
  { key: 'general',   label: 'Personalised Nutrition & Lifestyle Support' },
  { key: 'oncology',  label: 'Specialist Cancer (Oncology) Nutrition & Lifestyle Support' },
] as const;

function generateAvailableDates(): Date[] {
  const dates: Date[] = [];
  let cursor = addDays(startOfDay(new Date()), 1);
  while (dates.length < 28) {
    if (!isWeekend(cursor)) dates.push(cursor);
    cursor = addDays(cursor, 1);
  }
  return dates;
}

type Step = 1 | 2 | 3 | 4;

interface FormData {
  serviceId: string;
  date:      string;
  time:      string;
  name:      string;
  email:     string;
  phone:     string;
  notes:     string;
}

function BookingContent() {
  const params  = useSearchParams();
  const router  = useRouter();

  const [step,            setStep]            = useState<Step>(1);
  const [loading,         setLoading]         = useState(false);
  const [error,           setError]           = useState('');
  const [availableSlots,  setAvailableSlots]  = useState<string[]>([]);
  const [slotsLoading,    setSlotsLoading]    = useState(false);
  const [showTerms,       setShowTerms]       = useState(false);
  const [form, setForm] = useState<FormData>({
    serviceId: params.get('service') || '',
    date:      '',
    time:      '',
    name:      '',
    email:     '',
    phone:     '',
    notes:     '',
  });

  const availableDates  = generateAvailableDates();
  const selectedService = services.find((s) => s.id === form.serviceId);

  // Fetch available slots whenever the date or service changes
  useEffect(() => {
    if (!form.date || !form.serviceId) return;

    const duration = SERVICE_DURATION[form.serviceId] ?? 60;
    setSlotsLoading(true);
    setAvailableSlots([]);

    fetch(`/api/availability?date=${form.date}&duration=${duration}`)
      .then((r) => r.json())
      .then((data) => setAvailableSlots(data.slots ?? []))
      .catch(() => setAvailableSlots([]))
      .finally(() => setSlotsLoading(false));
  }, [form.date, form.serviceId]);

  function update(field: keyof FormData, value: string) {
    setForm((prev) => {
      const next: FormData = { ...prev, [field]: value };
      // Clear time selection whenever the date changes
      if (field === 'date') next.time = '';
      return next;
    });
  }

  function canAdvance() {
    if (step === 1) return !!form.serviceId;
    if (step === 2) return !!form.date && !!form.time;
    if (step === 3) return !!form.name && !!form.email;
    return false;
  }

  async function handleSubmit() {
    setLoading(true);
    setError('');
    try {
      const res  = await fetch('/api/bookings', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');

      if (selectedService && selectedService.price > 0) {
        const checkoutRes  = await fetch('/api/stripe/checkout', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ bookingId: data.booking.id }),
        });
        const checkoutData = await checkoutRes.json();
        if (!checkoutRes.ok) throw new Error(checkoutData.error || 'Payment error.');

        if (stripePromise) {
          const stripe = await stripePromise;
          await stripe?.redirectToCheckout({ sessionId: checkoutData.sessionId });
        } else {
          window.location.href = checkoutData.url;
        }
      } else {
        router.push('/book/success?free=1');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  const stepLabels = ['Service', 'Date and Time', 'Your Details', 'Confirm'];

  return (
    <div className="min-h-screen bg-sage-50">
      <div className="max-w-2xl mx-auto px-6 py-12 pt-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-sans text-sm text-sage-500 hover:text-sage-700 mb-8 transition-colors"
        >
          <ChevronLeft size={14} /> Back to home
        </Link>

        <div className="mb-10">
          <p className="section-label">Book an Appointment</p>
          <h1 className="font-serif text-3xl text-sage-900">Schedule Your Consultation</h1>
        </div>

        {/* Progress stepper */}
        <div className="flex items-center gap-0 mb-10">
          {stepLabels.map((label, i) => {
            const num    = (i + 1) as Step;
            const done   = step > num;
            const active = step === num;
            return (
              <div key={label} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-sans font-medium transition-colors ${
                      done   ? 'bg-sage-400 text-white'  :
                      active ? 'bg-sage-800 text-white'  :
                               'bg-sage-100 text-sage-400'
                    }`}
                  >
                    {done ? <CheckCircle2 size={14} /> : num}
                  </div>
                  <span className={`font-sans text-xs hidden sm:block ${active ? 'text-sage-700' : 'text-sage-400'}`}>
                    {label}
                  </span>
                </div>
                {i < stepLabels.length - 1 && (
                  <div className={`flex-1 h-px mx-2 ${step > num ? 'bg-sage-400' : 'bg-sage-200'}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-white border border-sage-100 rounded-lg p-8">

          {/* Step 1: Service selection */}
          {step === 1 && (
            <div>
              <h2 className="font-serif text-sage-800 text-xl mb-6">Choose a Service</h2>
              <div className="flex flex-col gap-6">
                {BOOKING_GROUPS.map(({ key, label }) => {
                  const groupServices = services.filter((s) => s.group === key);
                  if (groupServices.length === 0) return null;
                  return (
                    <div key={key}>
                      {label && (
                        <p className="font-sans text-xs uppercase tracking-widest text-sage-400 mb-3 pb-2 border-b border-sage-100">
                          {label}
                        </p>
                      )}
                      <div className="flex flex-col gap-3">
                        {groupServices.map((s) => (
                          <label
                            key={s.id}
                            className={`flex items-start gap-4 border rounded-lg p-5 cursor-pointer transition-colors ${
                              form.serviceId === s.id
                                ? 'border-sage-400 bg-sage-50'
                                : 'border-sage-100 hover:border-sage-200'
                            }`}
                          >
                            <input
                              type="radio"
                              name="service"
                              value={s.id}
                              checked={form.serviceId === s.id}
                              onChange={() => update('serviceId', s.id)}
                              className="mt-1 accent-sage-500"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <p className="font-serif text-sage-800">{s.name}</p>
                                <p className="font-sans text-sage-700 text-sm font-medium">
                                  {s.price === 0 ? 'Free' : `£${s.price}`}
                                </p>
                              </div>
                              <div className="flex items-center gap-1.5 text-sage-400 mb-2">
                                <Clock size={12} />
                                <span className="font-sans text-xs">{s.duration}</span>
                              </div>
                              <p className="font-sans text-sage-600 text-sm leading-relaxed">{s.description}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Date and time */}
          {step === 2 && (
            <div>
              <h2 className="font-serif text-sage-800 text-xl mb-6">
                <CalendarDays size={18} className="inline mr-2 text-sage-400" />
                Select a Date and Time
              </h2>

              {/* Date grid */}
              <div className="mb-6">
                <p className="font-sans text-xs text-sage-400 uppercase tracking-widest mb-3">
                  Available Dates
                </p>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {availableDates.slice(0, 14).map((d) => {
                    const val = format(d, 'yyyy-MM-dd');
                    return (
                      <button
                        key={val}
                        onClick={() => update('date', val)}
                        className={`flex flex-col items-center py-2.5 rounded border text-center transition-colors ${
                          form.date === val
                            ? 'bg-sage-400 border-sage-400 text-white'
                            : 'border-sage-100 text-sage-700 hover:border-sage-300'
                        }`}
                      >
                        <span className="font-sans text-xs">{format(d, 'EEE')}</span>
                        <span className="font-serif text-sm font-medium">{format(d, 'd')}</span>
                        <span className="font-sans text-xs opacity-70">{format(d, 'MMM')}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time slots */}
              {form.date && (
                <div>
                  <p className="font-sans text-xs text-sage-400 uppercase tracking-widest mb-3">
                    Available Times (UK time)
                  </p>

                  {slotsLoading ? (
                    <div className="flex items-center gap-2 text-sage-400 py-4">
                      <Loader2 size={15} className="animate-spin" />
                      <span className="font-sans text-sm">Checking availability...</span>
                    </div>
                  ) : availableSlots.length === 0 ? (
                    <div className="bg-sage-50 border border-sage-100 rounded-lg p-4">
                      <p className="font-sans text-sm text-sage-500">
                        No available slots on this date. Please choose another day.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-2">
                      {availableSlots.map((t) => (
                        <button
                          key={t}
                          onClick={() => update('time', t)}
                          className={`py-2.5 rounded border text-center font-sans text-sm transition-colors ${
                            form.time === t
                              ? 'bg-sage-400 border-sage-400 text-white'
                              : 'border-sage-100 text-sage-700 hover:border-sage-300'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Client details */}
          {step === 3 && (
            <div>
              <h2 className="font-serif text-sage-800 text-xl mb-6">Your Details</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="font-sans text-xs text-sage-500 uppercase tracking-widest block mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    required
                    className="w-full border border-sage-200 rounded px-4 py-2.5 text-sm font-sans text-sage-800 bg-white focus:outline-none focus:border-sage-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="font-sans text-xs text-sage-500 uppercase tracking-widest block mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    required
                    className="w-full border border-sage-200 rounded px-4 py-2.5 text-sm font-sans text-sage-800 bg-white focus:outline-none focus:border-sage-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="font-sans text-xs text-sage-500 uppercase tracking-widest block mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    className="w-full border border-sage-200 rounded px-4 py-2.5 text-sm font-sans text-sage-800 bg-white focus:outline-none focus:border-sage-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="font-sans text-xs text-sage-500 uppercase tracking-widest block mb-1.5">
                    Any notes or health concerns (optional)
                  </label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => update('notes', e.target.value)}
                    className="w-full border border-sage-200 rounded px-4 py-2.5 text-sm font-sans text-sage-800 bg-white focus:outline-none focus:border-sage-400 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review and confirm */}
          {step === 4 && selectedService && (
            <div>
              <h2 className="font-serif text-sage-800 text-xl mb-6">Review and Confirm</h2>
              <div className="bg-sage-50 border border-sage-100 rounded-lg p-5 mb-6 space-y-3">
                {[
                  ['Service',  selectedService.name],
                  ['Date',     form.date ? format(new Date(form.date), 'EEEE, d MMMM yyyy') : ''],
                  ['Time',     `${form.time} (UK)`],
                  ['Duration', selectedService.duration],
                  ['Name',     form.name],
                  ['Email',    form.email],
                  ['Phone',    form.phone || 'Not provided'],
                  ['Total',    selectedService.price === 0 ? 'Free' : `£${selectedService.price}`],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between font-sans text-sm">
                    <span className="text-sage-400 font-medium">{label}</span>
                    <span className="text-sage-800">{value}</span>
                  </div>
                ))}
              </div>

              {selectedService.price > 0 ? (
                <p className="font-sans text-xs text-sage-500 leading-relaxed mb-4">
                  You will be redirected to Stripe to complete your payment securely. Once
                  payment is confirmed your appointment is set. A confirmation email with
                  your Google Meet link will be sent to you automatically.
                </p>
              ) : (
                <p className="font-sans text-xs text-sage-500 leading-relaxed mb-4">
                  Your appointment will be confirmed instantly. A confirmation email with
                  your Google Meet link will be sent to you straight away.
                </p>
              )}

              {error && (
                <p className="font-sans text-sm text-red-500 mb-4">{error}</p>
              )}
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button
                onClick={() => setStep((s) => (s - 1) as Step)}
                className="btn-outline py-2.5 px-5 text-sm"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                onClick={() => canAdvance() && setStep((s) => (s + 1) as Step)}
                disabled={!canAdvance()}
                className={`btn-primary py-2.5 px-7 text-sm ${!canAdvance() ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                Continue
              </button>
            ) : (
              <button
                onClick={() => setShowTerms(true)}
                disabled={loading}
                className={`btn-primary py-2.5 px-7 text-sm ${loading ? 'opacity-60 cursor-wait' : ''}`}
              >
                {loading
                  ? 'Processing...'
                  : selectedService && selectedService.price > 0
                    ? `Pay £${selectedService.price} and Book`
                    : 'Request Booking'}
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Terms & Conditions modal */}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-sage-100 flex-shrink-0">
              <h2 className="font-serif text-sage-900 text-xl">Terms &amp; Conditions</h2>
              <button
                onClick={() => setShowTerms(false)}
                className="text-sage-400 hover:text-sage-700 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto px-6 py-5 flex-1 space-y-5 font-sans text-sm text-sage-700 leading-relaxed">
              <p>By booking an appointment with Prachi Acharekar (HCPC Registered Dietitian), you agree to the following terms.</p>

              <div>
                <p className="font-medium text-sage-800 mb-1">Scope of Practice</p>
                <p>Advice provided is intended to support health and wellbeing through evidence-based nutrition and lifestyle guidance. Services are designed to complement, not replace, the care of your GP or other healthcare professionals.</p>
              </div>

              <div>
                <p className="font-medium text-sage-800 mb-1">Booking and Payment</p>
                <p>All bookings are subject to availability and confirmation. Payment for paid consultations is required at the time of booking at the prices stated on the website.</p>
              </div>

              <div>
                <p className="font-medium text-sage-800 mb-1">Cancellation and Refunds</p>
                <p>Cancellations more than 48 hours before your appointment are eligible for a full refund. Cancellations within 48 hours are non-refundable. Rescheduling is permitted with sufficient notice, subject to availability.</p>
              </div>

              <div>
                <p className="font-medium text-sage-800 mb-1">Client Responsibilities</p>
                <p>You agree to provide accurate and up-to-date information about your medical history, medications, and health concerns, and to inform Prachi of any significant changes to your health. Children under 16 must be accompanied by a parent or legal guardian.</p>
              </div>

              <div>
                <p className="font-medium text-sage-800 mb-1">Confidentiality and Data</p>
                <p>All personal and health information is treated confidentially in accordance with UK GDPR and professional standards. Data will only be shared with your consent, as required by law, or where necessary to deliver the service.</p>
              </div>

              <p>
                Read the full{' '}
                <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-sage-500 underline hover:text-sage-700">
                  Terms &amp; Conditions
                </a>{' '}
                and{' '}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-sage-500 underline hover:text-sage-700">
                  Privacy Policy
                </a>.
              </p>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 border-t border-sage-100 flex gap-3 justify-end flex-shrink-0">
              <button
                onClick={() => setShowTerms(false)}
                className="btn-outline py-2.5 px-5 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowTerms(false); handleSubmit(); }}
                className="btn-primary py-2.5 px-6 text-sm"
              >
                I Agree and Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-sage-50 flex items-center justify-center">
          <p className="font-sans text-sage-500">Loading...</p>
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
