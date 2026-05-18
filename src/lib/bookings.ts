import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const DATA_DIR  = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'bookings.json');

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

function readAll(): Booking[] {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')) as Booking[];
  } catch {
    return [];
  }
}

function writeAll(bookings: Booking[]): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2), 'utf-8');
}

export function createBooking(
  data: Omit<Booking, 'id' | 'createdAt' | 'status'>
): Booking {
  const bookings = readAll();
  const booking: Booking = {
    ...data,
    id:        uuidv4(),
    status:    data.paymentStatus === 'not_required' ? 'confirmed' : 'awaiting_payment',
    createdAt: new Date().toISOString(),
  };
  bookings.push(booking);
  writeAll(bookings);
  return booking;
}

export function getBookingById(id: string): Booking | undefined {
  return readAll().find((b) => b.id === id);
}

export function getBookingByStripeSession(sessionId: string): Booking | undefined {
  return readAll().find((b) => b.stripeSessionId === sessionId);
}

export function updateBooking(id: string, updates: Partial<Booking>): Booking | undefined {
  const bookings = readAll();
  const index    = bookings.findIndex((b) => b.id === id);
  if (index === -1) return undefined;
  bookings[index] = { ...bookings[index], ...updates };
  writeAll(bookings);
  return bookings[index];
}

export function getAllBookings(): Booking[] {
  return readAll().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
