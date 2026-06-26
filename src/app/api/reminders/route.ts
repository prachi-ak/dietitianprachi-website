import { NextResponse } from 'next/server';
import { getAllBookings, updateBooking } from '@/lib/bookings';
import { sendReminderEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Get tomorrow's date in UK time
  const ukNow = new Date(new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }));
  ukNow.setDate(ukNow.getDate() + 1);
  const tomorrow = `${ukNow.getFullYear()}-${String(ukNow.getMonth() + 1).padStart(2, '0')}-${String(ukNow.getDate()).padStart(2, '0')}`;

  const bookings = await getAllBookings();
  const sent: string[] = [];
  const errors: string[] = [];

  for (const booking of bookings) {
    if (booking.status !== 'confirmed') continue;
    if (booking.reminderSent) continue;
    if (booking.date !== tomorrow) continue;

    try {
      await sendReminderEmail(booking);
      await updateBooking(booking.id, { reminderSent: true });
      sent.push(booking.id);
    } catch (err) {
      console.error(`Reminder failed for booking ${booking.id}:`, err);
      errors.push(booking.id);
    }
  }

  return NextResponse.json({ sent, errors, count: sent.length });
}
