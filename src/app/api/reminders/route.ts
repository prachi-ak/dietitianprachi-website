import { NextResponse } from 'next/server';
import { getAllBookings, updateBooking } from '@/lib/bookings';
import { sendReminderEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function GET() {

  const now      = Date.now();
  const bookings = await getAllBookings();
  const sent: string[] = [];
  const errors: string[] = [];

  for (const booking of bookings) {
    if (booking.status !== 'confirmed') continue;
    if (booking.reminderSent) continue;

    // booking.date = "YYYY-MM-DD", booking.time = "HH:MM" (UK time)
    // Use UTC.UTC to avoid local-timezone drift; 22–26 hr window absorbs BST/GMT offset
    const [year, month, day]   = booking.date.split('-').map(Number);
    const [hours, mins]        = booking.time.split(':').map(Number);
    const appointmentMs        = Date.UTC(year, month - 1, day, hours, mins);
    const hoursUntil           = (appointmentMs - now) / 3_600_000;

    if (hoursUntil >= 22 && hoursUntil <= 26) {
      try {
        await sendReminderEmail(booking);
        await updateBooking(booking.id, { reminderSent: true });
        sent.push(booking.id);
      } catch (err) {
        console.error(`Reminder failed for booking ${booking.id}:`, err);
        errors.push(booking.id);
      }
    }
  }

  return NextResponse.json({ sent, errors, count: sent.length });
}
