import { google } from 'googleapis';
import { addMinutes } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';
import type { Booking } from './bookings';

const LONDON_TZ = 'Europe/London';

export const ALL_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30','20:06'
];

export const SERVICE_DURATION: Record<string, number> = {
  'discovery-call':    15,
  'general-initial':   60,
  'general-followup':  30,
  'oncology-initial':  75,
  'oncology-followup': 45,
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
  const calendar   = google.calendar({ version: 'v3', auth: getAuth() });
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

  const dayStart = fromZonedTime(`${dateStr}T00:00:00`, LONDON_TZ);
  const dayEnd   = fromZonedTime(`${dateStr}T23:59:59`, LONDON_TZ);

  // Run freebusy and events list in parallel
  const [freebusyRes, eventsRes] = await Promise.all([
    calendar.freebusy.query({
      requestBody: {
        timeMin: dayStart.toISOString(),
        timeMax: dayEnd.toISOString(),
        items:   [{ id: calendarId }],
      },
    }),
    calendar.events.list({
      calendarId,
      timeMin:      dayStart.toISOString(),
      timeMax:      dayEnd.toISOString(),
      singleEvents: true,
    }),
  ]);

  // Busy periods from freebusy API
  const freeBusy = (freebusyRes.data.calendars?.[calendarId]?.busy ?? []).map(
    ({ start, end }) => ({ start: new Date(start as string), end: new Date(end as string) })
  );

  // Also treat Out of Office events and any opaque (busy) timed events as blocked,
  // since Out of Office events are often excluded from the freebusy response.
  const eventBusy = (eventsRes.data.items ?? [])
    .filter((e) => {
      const isOutOfOffice   = e.eventType === 'outOfOffice';
      const isOpaque        = e.transparency !== 'transparent'; // default is opaque/busy
      const hasTiming       = !!(e.start?.dateTime || e.start?.date);
      return hasTiming && (isOutOfOffice || isOpaque);
    })
    .map((e) => {
      // Handle timed events and all-day events
      const start = e.start?.dateTime
        ? new Date(e.start.dateTime)
        : fromZonedTime(`${e.start!.date}T00:00:00`, LONDON_TZ);
      const end = e.end?.dateTime
        ? new Date(e.end.dateTime)
        : fromZonedTime(`${e.end!.date}T23:59:59`, LONDON_TZ);
      return { start, end };
    });

  const allBusy = [...freeBusy, ...eventBusy];

  return ALL_SLOTS.filter((slot) => {
    const slotStart = fromZonedTime(`${dateStr}T${slot}:00`, LONDON_TZ);
    const slotEnd   = addMinutes(slotStart, durationMinutes);
    return !allBusy.some(({ start, end }) => slotStart < end && slotEnd > start);
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
