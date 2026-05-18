import { Redis } from '@upstash/redis';
import { v4 as uuidv4 } from 'uuid';

const kv = new Redis({
  url:   process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export type BookingStatus = 'awaiting_payment' | 'confirmed' | 'cancelled';

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  date: string;
  time: string;
  notes: string;
  status: BookingStatus;
  stripeSessionId?: string;
  paymentStatus: 'not_required' | 'pending' | 'paid';
  createdAt: string;
}

export async function createBooking(
  data: Omit<Booking, 'id' | 'createdAt' | 'status'>
): Promise<Booking> {
  const booking: Booking = {
    ...data,
    id:        uuidv4(),
    status:    data.paymentStatus === 'not_required' ? 'confirmed' : 'awaiting_payment',
    createdAt: new Date().toISOString(),
  };
  await Promise.all([
    kv.set(`booking:${booking.id}`, booking),
    kv.lpush('booking:list', booking.id),
  ]);
  return booking;
}

export async function getBookingById(id: string): Promise<Booking | undefined> {
  return (await kv.get<Booking>(`booking:${id}`)) ?? undefined;
}

export async function getBookingByStripeSession(sessionId: string): Promise<Booking | undefined> {
  const bookingId = await kv.get<string>(`stripe:${sessionId}`);
  if (!bookingId) return undefined;
  return getBookingById(bookingId);
}

export async function linkStripeSession(sessionId: string, bookingId: string): Promise<void> {
  await kv.set(`stripe:${sessionId}`, bookingId);
}

export async function updateBooking(
  id: string,
  updates: Partial<Booking>
): Promise<Booking | undefined> {
  const existing = await getBookingById(id);
  if (!existing) return undefined;
  const updated = { ...existing, ...updates };
  await kv.set(`booking:${id}`, updated);
  return updated;
}

export async function getAllBookings(): Promise<Booking[]> {
  const ids = await kv.lrange<string>('booking:list', 0, -1);
  if (!ids.length) return [];
  const bookings = await Promise.all(ids.map((id) => getBookingById(id)));
  return (bookings.filter(Boolean) as Booking[]).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
