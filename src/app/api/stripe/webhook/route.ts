import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getBookingByStripeSession, updateBooking } from '@/lib/bookings';
import { sendClientReceiptEmail, sendAdminNotificationEmail } from '@/lib/email';
import { createCalendarEvent, isGoogleCalendarConfigured } from '@/lib/googleCalendar';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body      = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature or webhook secret.' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const booking = await getBookingByStripeSession(session.id);

    if (booking) {
      const confirmed = await updateBooking(booking.id, {
        status:        'confirmed',
        paymentStatus: 'paid',
      });

      if (confirmed) {
        let meetUrl = '';
        if (isGoogleCalendarConfigured()) {
          try {
            meetUrl = await createCalendarEvent(confirmed);
          } catch (err) {
            console.error('Calendar/Meet creation failed:', err);
          }
        }
        const finalBooking = meetUrl
          ? (await updateBooking(confirmed.id, { meetUrl })) ?? confirmed
          : confirmed;
        await Promise.allSettled([
          sendClientReceiptEmail(finalBooking, meetUrl),
          sendAdminNotificationEmail(finalBooking, meetUrl),
        ]);
      }
    }
  }

  return NextResponse.json({ received: true });
}
