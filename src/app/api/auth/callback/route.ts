import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Google redirects here after the user authorises the app.
// This page displays the refresh token — copy it into GOOGLE_REFRESH_TOKEN in .env.local
export async function GET(req: NextRequest) {
  const code = new URL(req.url).searchParams.get('code');

  if (!code) {
    return new NextResponse(page('Error', 'No authorisation code received. Please try again.', ''), {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  try {
    const client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'http://localhost:3000/api/auth/callback',
    );

    const { tokens } = await client.getToken(code);
    const refreshToken = tokens.refresh_token;

    if (!refreshToken) {
      return new NextResponse(
        page(
          'No Refresh Token',
          'Google did not return a refresh token. This usually means the app was already authorised. Go to <a href="https://myaccount.google.com/permissions" target="_blank" style="color:#5a9e5a;">myaccount.google.com/permissions</a>, remove access for your app, then try again.',
          '',
        ),
        { headers: { 'Content-Type': 'text/html' } }
      );
    }

    return new NextResponse(page('Success', 'Copy the token below into your <code>.env.local</code> file:', refreshToken), {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (err) {
    console.error('OAuth callback error:', err);
    return new NextResponse(page('Error', 'Something went wrong exchanging the authorisation code.', ''), {
      headers: { 'Content-Type': 'text/html' },
    });
  }
}

function page(title: string, message: string, token: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title} | Dietitian Prachi Setup</title>
  <style>
    body { font-family: Georgia, serif; background: #f4f9f1; margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; box-sizing: border-box; }
    .card { background: #fff; border: 1px solid #cce6c5; border-radius: 8px; padding: 40px; max-width: 600px; width: 100%; }
    h1 { color: #254325; font-size: 22px; margin: 0 0 16px; }
    p  { color: #5a6b5b; font-family: system-ui, sans-serif; font-size: 14px; line-height: 1.7; margin: 0 0 20px; }
    .label { font-family: system-ui, sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #7cb97a; margin: 0 0 8px; display: block; }
    .token { display: block; background: #f4f9f1; border: 1px solid #cce6c5; border-radius: 4px; padding: 14px 16px; font-family: monospace; font-size: 12px; color: #254325; word-break: break-all; margin-bottom: 16px; }
    .step { background: #f4f9f1; border-left: 3px solid #a8d0a0; padding: 12px 16px; font-family: system-ui, sans-serif; font-size: 13px; color: #2c3e2d; margin-top: 20px; line-height: 1.6; }
    code { background: #e8f3e2; padding: 2px 5px; border-radius: 3px; font-size: 12px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${title}</h1>
    <p>${message}</p>
    ${token ? `
      <span class="label">GOOGLE_REFRESH_TOKEN</span>
      <span class="token">${token}</span>
      <div class="step">
        <strong>Next steps:</strong><br/>
        1. Open <code>.env.local</code> in your Prachi_Website folder<br/>
        2. Add this line: <code>GOOGLE_REFRESH_TOKEN=${token}</code><br/>
        3. Save the file and restart the dev server with <code>npm run dev</code><br/>
        4. You can now close this tab
      </div>
    ` : ''}
  </div>
</body>
</html>`;
}
