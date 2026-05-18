import { NextRequest, NextResponse } from 'next/server';
import { createBooking } from '@/lib/bookings';
import { sendClientReceiptEmail, sendAdminNotificationEmail } from '@/lib/email';
import { createCalendarEvent, isGoogleCalendarConfigured } from '@/lib/googleCalendar';
import { services } from '@/data/content';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { serviceId, date, time, name, email, phone, notes } = body;

    if (!serviceId || !date || !time || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const service = services.find((s) => s.id === serviceId);
    if (!service) {
      return NextResponse.json({ error: 'Invalid service.' }, { status: 400 });
    }

    const booking = await createBooking({
      serviceId,
      serviceName:   service.name,
      servicePrice:  service.price,
      clientName:    name,
      clientEmail:   email,
      clientPhone:   phone  || '',
      date,
      time,
      notes:         notes  || '',
      paymentStatus: service.price === 0 ? 'not_required' : 'pending',
    });

    if (service.price === 0) {
      let meetUrl = '';
      if (isGoogleCalendarConfigured()) {
        try {
          meetUrl = await createCalendarEvent(booking);
        } catch (err) {
          console.error('Calendar/Meet creation failed:', err);
        }
      }
      await Promise.allSettled([
        sendClientReceiptEmail(booking, meetUrl),
        sendAdminNotificationEmail(booking, meetUrl),
      ]);
    }

    return NextResponse.json({ booking }, { status: 201 });
  } catch (err) {
    console.error('Booking error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
