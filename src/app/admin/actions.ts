'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function adminLogin(formData: FormData) {
  const password      = (formData.get('password') as string) ?? '';
  const adminPassword = process.env.ADMIN_PASSWORD || 'changeme123';

  if (password === adminPassword) {
    cookies().set('admin_auth', adminPassword, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge:   60 * 60 * 8, // 8 hours
      path:     '/',
    });
    redirect('/admin');
  }

  redirect('/admin?error=1');
}
