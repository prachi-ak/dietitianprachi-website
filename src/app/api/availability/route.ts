import { NextRequest, NextResponse } from 'next/server';
import { parseISO, isWeekend, isBefore, startOfDay } from 'date-fns';
import { getAvailableSlots, isGoogleCalendarConfigured, ALL_SLOTS, SERVICE_DURATION } from '@/lib/googleCalendar';
import { getAllBookings } from '@/lib/bookings';

function slotsAvailableFromBookings(
  dateStr: string,
  duration: number,
  existingBookings: Awaited<ReturnType<typeof getAllBookings>>
): string[] {
  const dayBookings = existingBookings.filter(
    (b) => b.date === dateStr && b.status !== 'cancelled'
  );

  return ALL_SLOTS.filter((slot) => {
    const [h, m] = slot.split(':').map(Number);
    const slotStart = h * 60 + m;
    const slotEnd   = slotStart + duration;

    if (slotEnd > 14 * 60) return false; // must finish by 2pm

    return !dayBookings.some((booking) => {
      const [bh, bm] = booking.time.split(':').map(Number);
      const bookingStart    = bh * 60 + bm;
      const bookingDuration = SERVICE_DURATION[booking.serviceId] ?? 60;
      const bookingEnd      = bookingStart + bookingDuration;
      return slotStart < bookingEnd && slotEnd > bookingStart;
    });
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dateStr  = searchParams.get('date');
  const duration = parseInt(searchParams.get('duration') || '60');

  if (!dateStr) {
    return NextResponse.json({ error: 'date is required.' }, { status: 400 });
  }

  const date = parseISO(dateStr);
  if (isWeekend(date) || isBefore(date, startOfDay(new Date()))) {
    return NextResponse.json({ slots: [] });
  }

  if (!isGoogleCalendarConfigured()) {
    try {
      const bookings = await getAllBookings();
      const slots    = slotsAvailableFromBookings(dateStr, duration, bookings);
      return NextResponse.json({ slots, calendarConnected: false });
    } catch {
      // Redis unavailable — fall back to all slots filtered by end time only
      const slots = ALL_SLOTS.filter((slot) => {
        const [h, m] = slot.split(':').map(Number);
        return h * 60 + m + duration <= 14 * 60;
      });
      return NextResponse.json({ slots, calendarConnected: false });
    }
  }

  try {
    const slots = await getAvailableSlots(dateStr, duration);
    return NextResponse.json({ slots, calendarConnected: true });
  } catch (err) {
    console.error('Google Calendar error:', err);
    const slots = ALL_SLOTS.filter((slot) => {
      const [h, m] = slot.split(':').map(Number);
      return h * 60 + m + duration <= 14 * 60;
    });
    return NextResponse.json({ slots, calendarConnected: false });
  }
}
