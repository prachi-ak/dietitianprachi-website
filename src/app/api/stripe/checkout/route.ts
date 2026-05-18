import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getBookingById, updateBooking } from '@/lib/bookings';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function POST(req: NextRequest) {
  try {
    const { bookingId } = await req.json();

    if (!bookingId) {
      return NextResponse.json({ error: 'bookingId is required.' }, { status: 400 });
    }

    const booking = getBookingById(bookingId);
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found.' }, { status: 404 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency:     'gbp',
            unit_amount:  booking.servicePrice * 100,
            product_data: {
              name:        booking.serviceName,
              description: `Consultation with Prachi Acharekar on ${booking.date} at ${booking.time}`,
            },
          },
          quantity: 1,
        },
      ],
      mode:        'payment',
      success_url: `${siteUrl}/book/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${siteUrl}/book`,
      customer_email: booking.clientEmail,
      metadata: {
        bookingId: booking.id,
      },
    });

    updateBooking(booking.id, { stripeSessionId: session.id });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json({ error: 'Failed to create payment session.' }, { status: 500 });
  }
}
