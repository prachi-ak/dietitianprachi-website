'use client';

import { useState } from 'react';
import type { Booking } from '@/lib/bookings';
import { CreditCard, CheckCircle2, Clock } from 'lucide-react';

const STATUS_COLOURS: Record<string, string> = {
  awaiting_payment: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  confirmed:        'bg-sage-50 text-sage-700 border-sage-200',
  cancelled:        'bg-gray-50 text-gray-500 border-gray-200',
};

const STATUS_LABELS: Record<string, string> = {
  awaiting_payment: 'Awaiting payment',
  confirmed:        'Confirmed',
  cancelled:        'Cancelled',
};

type Filter = 'all' | 'confirmed' | 'awaiting_payment' | 'cancelled';

export default function AdminClient({ bookings }: { bookings: Booking[] }) {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);

  const counts = {
    all:              bookings.length,
    confirmed:        bookings.filter((b) => b.status === 'confirmed').length,
    awaiting_payment: bookings.filter((b) => b.status === 'awaiting_payment').length,
    cancelled:        bookings.filter((b) => b.status === 'cancelled').length,
  };

  return (
    <div className="min-h-screen bg-sage-50">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="font-serif text-2xl text-sage-900">Booking Dashboard</p>
          <p className="font-sans text-sm text-sage-500 mt-1">Dietitian Prachi Admin</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {(Object.entries(counts) as [Filter, number][]).map(([key, count]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`bg-white border rounded-lg p-4 text-left transition-colors ${
                filter === key ? 'border-sage-400' : 'border-sage-100 hover:border-sage-200'
              }`}
            >
              <p className="font-sans text-2xl font-semibold text-sage-800 mb-1">{count}</p>
              <p className="font-sans text-xs text-sage-400 capitalize">
                {key === 'awaiting_payment' ? 'Awaiting payment' : key}
              </p>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white border border-sage-100 rounded-lg p-12 text-center">
            <p className="font-sans text-sage-400 text-sm">No bookings found.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((booking) => (
              <div key={booking.id} className="bg-white border border-sage-100 rounded-lg p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="font-serif text-sage-800 text-lg mb-0.5">{booking.clientName}</p>
                    <p className="font-sans text-sm text-sage-500">
                      <a href={`mailto:${booking.clientEmail}`} className="hover:text-sage-700 transition-colors">
                        {booking.clientEmail}
                      </a>
                    </p>
                    {booking.clientPhone && (
                      <p className="font-sans text-sm text-sage-500">{booking.clientPhone}</p>
                    )}
                  </div>
                  <span
                    className={`font-sans text-xs border px-3 py-1 rounded-full flex-shrink-0 ${STATUS_COLOURS[booking.status]}`}
                  >
                    {STATUS_LABELS[booking.status]}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <div>
                    <p className="font-sans text-xs text-sage-400 mb-0.5">Service</p>
                    <p className="font-sans text-sm text-sage-700">{booking.serviceName}</p>
                  </div>
                  <div>
                    <p className="font-sans text-xs text-sage-400 mb-0.5">Date</p>
                    <p className="font-sans text-sm text-sage-700">{booking.date}</p>
                  </div>
                  <div>
                    <p className="font-sans text-xs text-sage-400 mb-0.5">Time</p>
                    <p className="font-sans text-sm text-sage-700">{booking.time} (UK)</p>
                  </div>
                  <div>
                    <p className="font-sans text-xs text-sage-400 mb-0.5">Payment</p>
                    <p className="font-sans text-sm text-sage-700 flex items-center gap-1.5">
                      <CreditCard size={12} className="text-sage-400" />
                      {booking.servicePrice === 0
                        ? 'Free'
                        : `£${booking.servicePrice} - ${booking.paymentStatus}`}
                    </p>
                  </div>
                </div>

                {booking.notes && (
                  <p className="font-sans text-sm text-sage-500 bg-sage-50 border border-sage-100 rounded p-3 mb-3">
                    {booking.notes}
                  </p>
                )}

                <div className="flex items-center gap-2 mt-1">
                  {booking.status === 'confirmed' ? (
                    <CheckCircle2 size={13} className="text-sage-400" />
                  ) : (
                    <Clock size={13} className="text-yellow-400" />
                  )}
                  <p className="font-sans text-xs text-sage-300">
                    Booked {new Date(booking.createdAt).toLocaleDateString('en-GB', { dateStyle: 'medium' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
