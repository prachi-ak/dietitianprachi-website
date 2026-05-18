import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// One-time route — visit http://localhost:3000/api/auth/google to start the
// OAuth flow and obtain your GOOGLE_REFRESH_TOKEN for .env.local
export function GET() {
  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:3000/api/auth/callback',
  );

  const url = client.generateAuthUrl({
    access_type: 'offline',
    prompt:      'consent',
    scope:       ['https://www.googleapis.com/auth/calendar'],
  });

  return NextResponse.redirect(url);
}
