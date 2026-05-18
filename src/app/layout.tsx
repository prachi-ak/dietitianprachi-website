import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title:       'Dietitian Prachi | Prachi Acharekar, HCPC Registered Dietitian',
  description:
    'Personalised nutrition and lifestyle programmes with Prachi Acharekar, HCPC Registered Dietitian. Online worldwide and in-person in the UK.',
  openGraph: {
    title:       'Dietitian Prachi | Prachi Acharekar, HCPC Registered Dietitian',
    description: 'Evidence-based, deeply personalised nutrition care across four pillars: Balanced Nutrition, Quality Sleep, Adequate Exercise, and Emotional Well-being.',
    type:        'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased bg-white text-sage-900">{children}</body>
    </html>
  );
}
