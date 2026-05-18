import { NextRequest, NextResponse } from 'next/server';
import { parseISO, isWeekend, isBefore, startOfDay } from 'date-fns';
import { getAvailableSlots, isGoogleCalendarConfigured, ALL_SLOTS } from '@/lib/googleCalendar';

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
    // Google Calendar not yet connected — return all slots
    return NextResponse.json({ slots: ALL_SLOTS, calendarConnected: false });
  }

  try {
    const slots = await getAvailableSlots(dateStr, duration);
    return NextResponse.json({ slots, calendarConnected: true });
  } catch (err) {
    console.error('Google Calendar error:', err);
    // Graceful fallback so the booking page still works
    return NextResponse.json({ slots: ALL_SLOTS, calendarConnected: false });
  }
}
