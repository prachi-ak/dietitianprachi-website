# NourishWise Website — Setup Guide

## Step 1: Install Node.js

Download and install Node.js (LTS) from https://nodejs.org/
After installing, restart your terminal.

Verify it worked:
```
node --version
npm --version
```

## Step 2: Install dependencies

Open a terminal in this folder (Prachi_Website) and run:

```
npm install
```

## Step 3: Configure environment variables

Copy `.env.example` to a new file called `.env.local`:

```
copy .env.example .env.local
```

Edit `.env.local` and fill in:

### Email (Gmail recommended)
1. Use your Gmail address for `SMTP_USER`
2. For `SMTP_PASS`, you need a Gmail **App Password** (not your regular password):
   - Go to Google Account > Security > 2-Step Verification (enable it first)
   - Then go to Security > App passwords
   - Create a new app password and copy it into `SMTP_PASS`
3. Set `ADMIN_EMAIL` to the email where you want to receive booking notifications

### Stripe (payments)
1. Create an account at https://stripe.com
2. Go to Developers > API Keys
3. Copy your **test** keys into `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
4. For the webhook secret, see Step 6 below

### Admin password
Set `ADMIN_PASSWORD` to something secure. You use this to access `/admin`.

### Site URL
Set `NEXT_PUBLIC_SITE_URL=http://localhost:3000` for local development.
Change to your real domain when you deploy.

## Step 4: Run the development server

```
npm run dev
```

Open http://localhost:3000 in your browser.

## Step 5: Test the booking flow

1. Go to http://localhost:3000/book
2. Select a service, pick a date/time, fill in details
3. For the free discovery call: click "Request Booking" — you will be redirected to the success page
4. For paid services: you will be taken to Stripe Checkout (test mode)

**Note:** Emails will only send once you have configured your SMTP settings in `.env.local`.

## Step 6: Set up Stripe webhooks (for paid bookings)

When a client pays via Stripe, a webhook is needed to update the booking and notify you.

**For local testing**, use the Stripe CLI:
1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Run: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
3. Copy the webhook signing secret printed to your terminal into `STRIPE_WEBHOOK_SECRET`

**For production**, add the webhook in your Stripe dashboard:
- URL: `https://yourdomain.com/api/stripe/webhook`
- Event: `checkout.session.completed`

## Step 7: Admin dashboard

Go to http://localhost:3000/admin

Enter your `ADMIN_PASSWORD` to access it. You can:
- See all bookings (pending, confirmed, declined)
- Approve or decline bookings directly from the dashboard

When a booking comes in, you will also receive an email with one-click Approve and Decline buttons.

## Step 7b: Connect Google Calendar (live availability)

This step makes the booking page check your real Google Calendar before showing time slots.
Any personal appointment, meeting, or event you add to your calendar will automatically
hide that time slot from clients. Skip this step for now and come back to it after the
site is live — the booking page works fine without it, just showing all slots.

### One-time setup

**1. Create a Google Cloud project**
- Go to https://console.cloud.google.com
- Create a new project (e.g. "NourishWise")
- In the left menu go to "APIs and Services" > "Library"
- Search for "Google Calendar API" and click Enable

**2. Create a Service Account**
- Go to "APIs and Services" > "Credentials"
- Click "Create Credentials" > "Service Account"
- Give it a name (e.g. "nourishwise-calendar")
- Click through to finish — no special roles needed
- On the Service Accounts list, click your new account
- Go to the "Keys" tab > "Add Key" > "Create new key" > JSON
- A JSON file will download — keep this safe

**3. Share your Google Calendar with the service account**
- Open Google Calendar in your browser
- Click the three dots next to your main calendar > "Settings and sharing"
- Scroll to "Share with specific people or groups"
- Add the service account email (looks like `name@project.iam.gserviceaccount.com`)
- Give it "Make changes to events" permission (required — the site now writes events to your calendar when a booking is confirmed)
- Save

**4. Add credentials to your environment**

Open the downloaded JSON file and copy these two values into `.env.local`:

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=   (the "client_email" field)
GOOGLE_PRIVATE_KEY=             (the "private_key" field — keep all the \n characters)
GOOGLE_CALENDAR_ID=primary
```

In Vercel, add these same three variables under Settings > Environment Variables.

That is all. The booking page will now check your calendar in real time every time a
client selects a date.

---

## Step 8: Deploy to production

The easiest way to deploy is with Vercel (free tier available):

1. Push this folder to a GitHub repository
2. Go to https://vercel.com and import the repository
3. Add all your `.env.local` variables as environment variables in Vercel
4. Update `NEXT_PUBLIC_SITE_URL` to your live domain
5. Set up the Stripe webhook with your live domain URL

---

## File structure summary

```
src/
  app/
    page.tsx              — Home page (all sections)
    book/page.tsx         — Multi-step booking flow
    book/success/         — Post-booking confirmation
    blog/                 — Blog listing and individual posts
    admin/                — Booking management dashboard
    api/
      bookings/           — Create bookings
      approve/[token]/    — One-click approve (from email link)
      decline/[token]/    — One-click decline (from email link)
      stripe/checkout/    — Create Stripe Checkout session
      stripe/webhook/     — Handle Stripe payment confirmation
  components/             — All UI components
  data/content.ts         — Services, FAQs, blog posts (edit here)
  lib/
    bookings.ts           — Booking storage (JSON file)
    email.ts              — Email sending
    stripe.ts             — Stripe client
data/
  bookings.json           — Created automatically when first booking is made
```

## Customising content

- **Services, FAQs, blog posts**: edit `src/data/content.ts`
- **Colours**: edit `tailwind.config.ts`
- **Email templates**: edit `src/lib/email.ts`
- **Available time slots**: edit the `TIME_SLOTS` array in `src/app/book/page.tsx`
- **Available dates** (weekends off by default): edit `generateAvailableDates()` in the same file
