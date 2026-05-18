import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAllBookings } from '@/lib/bookings';
import AdminClient from './AdminClient';

export const dynamic = 'force-dynamic';

export default function AdminPage({
  searchParams,
}: {
  searchParams: { auth?: string };
}) {
  const adminPassword = process.env.ADMIN_PASSWORD || 'changeme123';
  const cookieStore   = cookies();
  const authCookie    = cookieStore.get('admin_auth');

  const isAuthenticated =
    authCookie?.value === adminPassword ||
    searchParams.auth === adminPassword;

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const bookings = getAllBookings();

  return <AdminClient bookings={bookings} />;
}

function AdminLogin() {
  return (
    <div className="min-h-screen bg-sage-50 flex items-center justify-center px-6">
      <div className="bg-white border border-sage-100 rounded-lg p-8 w-full max-w-sm">
        <p className="font-serif text-sage-800 text-xl mb-6 text-center">Admin Access</p>
        <form action="/admin" method="get">
          <label className="font-sans text-xs text-sage-500 uppercase tracking-widest block mb-1.5">
            Password
          </label>
          <input
            type="password"
            name="auth"
            className="w-full border border-sage-200 rounded px-4 py-2.5 text-sm font-sans text-sage-800 bg-white focus:outline-none focus:border-sage-400 mb-4"
          />
          <button type="submit" className="btn-primary w-full text-center text-sm py-2.5">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
