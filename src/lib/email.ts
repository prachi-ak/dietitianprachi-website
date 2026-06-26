import nodemailer from 'nodemailer';
import type { Booking } from './bookings';

function getTransporter() {
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
    port:   Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

const siteUrl    = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const adminEmail = process.env.ADMIN_EMAIL          || 'prachi@dietitianprachi.com';

function baseStyle() {
  return `font-family:Georgia,serif;max-width:580px;margin:0 auto;background:#ffffff;border:1px solid #cce6c5;border-radius:8px;overflow:hidden;`;
}

function header() {
  return `<div style="background:#a8d0a0;padding:28px 32px;">
    <p style="margin:0;color:#254325;font-size:22px;letter-spacing:0.5px;">The Integrative Dietitian</p>
    <p style="margin:4px 0 0;color:#376537;font-size:13px;">Prachi Acharekar, HCPC Registered Dietitian</p>
  </div>`;
}

function footer() {
  return `<div style="padding:20px 32px;background:#f4f9f1;border-top:1px solid #cce6c5;">
    <p style="margin:0;color:#5a6b5b;font-size:12px;">The Integrative Dietitian &bull; Prachi Acharekar, HCPC Registered Dietitian</p>
  </div>`;
}

const INTAKE_FORMS: Record<string, string> = {
  'discovery-call':   'https://forms.gle/HwDbrgqtakYCTyWf9',
  'general-initial':  'https://forms.gle/WS8941vh5RcSZx3ZA',
  'oncology-initial': 'https://forms.gle/9P5wz1Pzg76CeTFX7',
};

function intakeFormBlock(serviceId: string) {
  const formUrl = INTAKE_FORMS[serviceId];
  if (!formUrl) return '';
  return `
    <div style="background:#f4f9f1;border:2px solid #a8d0a0;border-radius:6px;padding:20px 24px;margin:24px 0;">
      <p style="margin:0 0 6px;font-family:system-ui,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#7cb97a;">Action Required: Intake Form</p>
      <p style="margin:0 0 10px;font-family:system-ui,sans-serif;font-size:14px;color:#2c3e2d;line-height:1.7;">
        To make the most of your consultation, please complete the intake form before your appointment.
        This allows Prachi to review your information in advance so that your session can focus entirely
        on your health, goals, and next steps.
      </p>
      <p style="margin:0 0 14px;font-family:system-ui,sans-serif;font-size:13px;color:#5a6b5b;line-height:1.6;">
        <strong>Please aim to submit the form at least 48 hours before your appointment.</strong>
      </p>
      <a href="${formUrl}"
         style="display:inline-block;background:#768c62;color:#ffffff;padding:11px 24px;text-decoration:none;border-radius:4px;font-size:13px;font-family:system-ui,sans-serif;font-weight:600;">
        Complete Intake Form
      </a>
    </div>`;
}

function meetBlock(meetUrl: string) {
  if (!meetUrl) return '';
  return `
    <div style="background:#f4f9f1;border:1px solid #cce6c5;border-radius:6px;padding:16px 20px;margin:20px 0;">
      <p style="margin:0 0 8px;font-family:system-ui,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#7cb97a;">Google Meet Link</p>
      <a href="${meetUrl}" style="font-family:system-ui,sans-serif;font-size:14px;color:#5a9e5a;word-break:break-all;">${meetUrl}</a>
      <p style="margin:8px 0 0;font-family:system-ui,sans-serif;font-size:12px;color:#5a6b5b;">Click this link at the time of your appointment to join the video call.</p>
    </div>`;
}

function bookingTable(booking: Booking) {
  const rows: [string, string][] = [
    ['Service',  booking.serviceName],
    ['Date',     booking.date],
    ['Time',     `${booking.time} (UK time)`],
    ['Payment',  booking.servicePrice === 0 ? 'Free' : `GBP ${booking.servicePrice} - paid`],
  ];
  if (booking.clientPhone) rows.splice(1, 0, ['Phone', booking.clientPhone]);
  if (booking.notes)       rows.push(['Notes', booking.notes]);

  return `<table style="width:100%;border-collapse:collapse;font-size:14px;color:#2c3e2d;">
    ${rows.map(([label, value]) => `
      <tr style="border-bottom:1px solid #e8f3e2;">
        <td style="padding:9px 0;font-weight:600;width:38%;">${label}</td>
        <td style="padding:9px 0;">${value}</td>
      </tr>`).join('')}
  </table>`;
}

function formatBookingDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dayNames   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const d = new Date(year, month - 1, day);
  return `${dayNames[d.getDay()]}, ${day} ${monthNames[month - 1]} ${year}`;
}

function intakeFormReminderBlock(serviceId: string) {
  const formUrl = INTAKE_FORMS[serviceId];
  if (!formUrl) return '';
  return `
    <div style="background:#fff8e7;border:2px solid #e8c84a;border-radius:6px;padding:20px 24px;margin:24px 0;">
      <p style="margin:0 0 6px;font-family:system-ui,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#b58a00;">Reminder: Intake Form</p>
      <p style="margin:0 0 10px;font-family:system-ui,sans-serif;font-size:14px;color:#2c3e2d;line-height:1.7;">
        If you have not already done so, please complete your intake form before your appointment.
        This helps Prachi prepare for your session and ensures your time together is focused
        entirely on your health, goals, and next steps.
      </p>
      <p style="margin:0 0 14px;font-family:system-ui,sans-serif;font-size:13px;color:#5a6b5b;line-height:1.6;">
        <strong>Please aim to submit the form before your appointment tomorrow.</strong>
      </p>
      <a href="${formUrl}"
         style="display:inline-block;background:#768c62;color:#ffffff;padding:11px 24px;text-decoration:none;border-radius:4px;font-size:13px;font-family:system-ui,sans-serif;font-weight:600;">
        Complete Intake Form
      </a>
    </div>`;
}

// Reminder sent by the cron job ~24 hours before the appointment
export async function sendReminderEmail(booking: Booking) {
  const firstName     = booking.clientName.split(' ')[0];
  const formattedDate = formatBookingDate(booking.date);
  const hasForm       = !!INTAKE_FORMS[booking.serviceId];

  const videoBlock = booking.meetUrl
    ? `<div style="background:#f4f9f1;border:1px solid #cce6c5;border-radius:6px;padding:16px 20px;margin:20px 0;">
        <p style="margin:0 0 6px;font-family:system-ui,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#7cb97a;">Your Video Call Link</p>
        <a href="${booking.meetUrl}" style="font-family:system-ui,sans-serif;font-size:14px;color:#5a9e5a;word-break:break-all;">${booking.meetUrl}</a>
        <p style="margin:8px 0 0;font-family:system-ui,sans-serif;font-size:12px;color:#5a6b5b;">Click this link at the time of your appointment to join the call.</p>
      </div>`
    : `<p style="font-family:system-ui,sans-serif;font-size:13px;color:#5a6b5b;margin:16px 0;">
        Your video call link was included in your original confirmation email. Please refer to that email for the link.
      </p>`;

  const detailRows: [string, string][] = [
    ['Date',    formattedDate],
    ['Time',    `${booking.time} (UK time)`],
    ['Service', booking.serviceName],
  ];

  const detailTable = `<table style="width:100%;border-collapse:collapse;font-size:14px;color:#2c3e2d;margin:0;">
    ${detailRows.map(([label, value]) => `
      <tr style="border-bottom:1px solid #e8f3e2;">
        <td style="padding:9px 0;font-weight:600;width:38%;font-family:system-ui,sans-serif;">${label}</td>
        <td style="padding:9px 0;font-family:system-ui,sans-serif;">${value}</td>
      </tr>`).join('')}
  </table>`;

  const html = `<div style="${baseStyle()}">
    ${header()}
    <div style="padding:32px;">
      <h2 style="margin:0 0 8px;color:#254325;font-size:20px;">Your Appointment is Tomorrow</h2>
      <p style="color:#5a6b5b;margin:0 0 20px;font-size:14px;line-height:1.7;font-family:system-ui,sans-serif;">
        Hello ${firstName}, this is a friendly reminder that your consultation with Prachi is scheduled for tomorrow.
      </p>

      <div style="background:#f4f9f1;border:1px solid #cce6c5;border-radius:6px;padding:20px 24px;margin-bottom:4px;">
        ${detailTable}
      </div>

      ${videoBlock}

      ${hasForm ? intakeFormReminderBlock(booking.serviceId) : ''}

      <p style="color:#5a6b5b;font-size:14px;line-height:1.7;margin:20px 0 0;font-family:system-ui,sans-serif;">
        If you need to reschedule or cancel, please contact Prachi at the earliest opportunity.
      </p>

      <p style="color:#2c3e2d;font-size:14px;margin-top:28px;font-family:system-ui,sans-serif;">
        Warm regards,<br/>
        <strong>Prachi Acharekar</strong><br/>
        HCPC Registered Dietitian, The Integrative Dietitian
      </p>
    </div>
    ${footer()}
  </div>`;

  await getTransporter().sendMail({
    from:    `"Prachi Acharekar - The Integrative Dietitian" <${process.env.SMTP_USER}>`,
    to:      booking.clientEmail,
    subject: `Reminder: Your ${booking.serviceName} Tomorrow at ${booking.time} (UK time)`,
    html,
  });
}

// Receipt sent to the client immediately on confirmation
export async function sendClientReceiptEmail(booking: Booking, meetUrl: string) {
  const firstName = booking.clientName.split(' ')[0];

  const html = `<div style="${baseStyle()}">
    ${header()}
    <div style="padding:32px;">
      <h2 style="margin:0 0 8px;color:#254325;font-size:20px;">Your Appointment is Confirmed</h2>
      <p style="color:#5a6b5b;margin:0 0 24px;font-size:14px;line-height:1.7;">
        Hello ${firstName}, your consultation with Prachi is booked and confirmed. Here are your details.
      </p>

      <div style="background:#f4f9f1;border:1px solid #cce6c5;border-radius:6px;padding:20px 24px;margin-bottom:4px;">
        ${bookingTable(booking)}
      </div>

      ${meetBlock(meetUrl)}

      ${intakeFormBlock(booking.serviceId)}

      <p style="color:#5a6b5b;font-size:14px;line-height:1.7;margin:0 0 10px;">
        To prepare, it also helps to keep a note of what you eat and drink in the two to three days before
        your consultation, and to bring any recent blood test results if you have them.
      </p>
      <p style="color:#5a6b5b;font-size:14px;line-height:1.7;margin:0;">
        If you need to reschedule, please get in touch at least 48 hours before your appointment.
      </p>

      <p style="color:#2c3e2d;font-size:14px;margin-top:28px;">
        Warm regards,<br/>
        <strong>Prachi Acharekar</strong><br/>
        HCPC Registered Dietitian, The Integrative Dietitian
      </p>
    </div>
    ${footer()}
  </div>`;

  await getTransporter().sendMail({
    from:    `"Prachi Acharekar - The Integrative Dietitian" <${process.env.SMTP_USER}>`,
    to:      booking.clientEmail,
    subject: `Confirmed: ${booking.serviceName} on ${booking.date} at ${booking.time}`,
    html,
  });
}

// Notification sent to Prachi immediately on confirmation
export async function sendAdminNotificationEmail(booking: Booking, meetUrl: string) {
  const html = `<div style="${baseStyle()}">
    ${header()}
    <div style="padding:32px;">
      <h2 style="margin:0 0 8px;color:#254325;font-size:20px;">New Booking Confirmed</h2>
      <p style="color:#5a6b5b;margin:0 0 20px;font-size:14px;">
        A new appointment has been booked and added to your Google Calendar automatically.
      </p>

      <div style="margin-bottom:20px;">
        <p style="font-size:12px;color:#7cb97a;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.1em;font-family:system-ui,sans-serif;">Client</p>
        <p style="font-size:16px;color:#254325;margin:0 0 2px;">${booking.clientName}</p>
        <p style="font-size:13px;color:#5a6b5b;margin:0;font-family:system-ui,sans-serif;">
          <a href="mailto:${booking.clientEmail}" style="color:#5a9e5a;">${booking.clientEmail}</a>
          ${booking.clientPhone ? ` &bull; ${booking.clientPhone}` : ''}
        </p>
      </div>

      ${bookingTable(booking)}
      ${meetBlock(meetUrl)}

      <a href="${siteUrl}/admin"
         style="display:inline-block;margin-top:20px;background:#7cb97a;color:#ffffff;padding:11px 24px;text-decoration:none;border-radius:4px;font-size:13px;font-family:system-ui,sans-serif;">
        View All Bookings
      </a>
    </div>
    ${footer()}
  </div>`;

  await getTransporter().sendMail({
    from:    `"The Integrative Dietitian Bookings" <${process.env.SMTP_USER}>`,
    to:      adminEmail,
    subject: `New booking: ${booking.clientName} - ${booking.serviceName} on ${booking.date}`,
    html,
  });
}
