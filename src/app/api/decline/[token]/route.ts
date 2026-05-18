import { NextRequest, NextResponse } from 'next/server';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// Decline links are no longer used — bookings confirm automatically.
export function GET(_req: NextRequest) {
  return NextResponse.redirect(`${siteUrl}/admin`);
}
