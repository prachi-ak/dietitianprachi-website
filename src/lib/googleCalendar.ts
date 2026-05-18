import { google } from 'googleapis';
import { addMinutes } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';
import type { Booking } from './bookings';

const LONDON_TZ = 'Europe/London';

export const ALL_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
];

const SERVICE_DURATION: Record<string, number> = {
  'discovery-call':     15,
  'initial-assessment': 60,
  'follow-up':          60,
};

function getAuth() {
  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  );
  client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return client;
}

export function isGoogleCalendarConfigured(): boolean {
  return !!(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_REFRESH_TOKEN
  );
}

export async function getAvailableSlots(
  dateStr: string,
  durationMinutes: number
): Promise<string[]> {
  const calendar = google.calendar({ version: 'v3', auth: getAuth() });

  const dayStart = fromZonedTime(`${dateStr}T00:00:00`, LONDON_TZ);
  const dayEnd   = fromZonedTime(`${dateStr}T23:59:59`, LONDON_TZ);

  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin:  dayStart.toISOString(),
      timeMax:  dayEnd.toISOString(),
      items:    [{ id: process.env.GOOGLE_CALENDAR_ID || 'primary' }],
    },
  });

  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
  const busyTimes  = response.data.calendars?.[calendarId]?.busy ?? [];

  return ALL_SLOTS.filter((slot) => {
    const slotStart = fromZonedTime(`${dateStr}T${slot}:00`, LONDON_TZ);
    const slotEnd   = addMinutes(slotStart, durationMinutes);
    return !busyTimes.some(({ start, end }) => {
      const busyStart = new Date(start as string);
      const busyEnd   = new Date(end as string);
      return slotStart < busyEnd && slotEnd > busyStart;
    });
  });
}

// Returns the Google Meet URL generated for the event
export async function createCalendarEvent(booking: Booking): Promise<string> {
  const calendar = google.calendar({ version: 'v3', auth: getAuth() });

  const duration  = SERVICE_DURATION[booking.serviceId] ?? 60;
  const startTime = fromZonedTime(`${booking.date}T${booking.time}:00`, LONDON_TZ);
  const endTime   = addMinutes(startTime, duration);

  const description = [
    `Client: ${booking.clientName}`,
    `Email:  ${booking.clientEmail}`,
    `Phone:  ${booking.clientPhone || 'Not provided'}`,
    `Service: ${booking.serviceName}`,
    booking.servicePrice === 0
      ? 'Payment: Free'
      : `Payment: £${booking.servicePrice} (${booking.paymentStatus})`,
    booking.notes ? `\nNotes from client: ${booking.notes}` : '',
  ].filter(Boolean).join('\n');

  const response = await calendar.events.insert({
    calendarId:            process.env.GOOGLE_CALENDAR_ID || 'primary',
    conferenceDataVersion: 1,   // required for Meet link generation
    sendNotifications:     false,
    requestBody: {
      summary:     `${booking.serviceName} - ${booking.clientName}`,
      description,
      start: { dateTime: startTime.toISOString(), timeZone: LONDON_TZ },
      end:   { dateTime: endTime.toISOString(),   timeZone: LONDON_TZ },
      conferenceData: {
        createRequest: {
          requestId:             booking.id,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    },
  });

  // Extract the Meet link from the created event
  const entryPoints = response.data.conferenceData?.entryPoints ?? [];
  const meetEntry   = entryPoints.find((e) => e.entryPointType === 'video');
  return meetEntry?.uri ?? '';
}
